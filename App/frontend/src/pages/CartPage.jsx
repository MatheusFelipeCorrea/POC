import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Notification from '../components/Notification';
import AlertModal from '../components/AlertModal';

// ... (formatPrice) ...
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
};

function CartPage() {
    // 1. PEGA AS FUNÇÕES ASYNC DO CONTEXTO
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        checkout,
        totalItems,
        subtotal
    } = useCart();

    // 2. Estados para os DOIS tipos de popup
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null);

    // 3. useEffect para o "Carrinho Vazio"
    useEffect(() => {
        // Se o carrinho ficar vazio
        if (cartItems.length === 0 && !toast) {
            setToast({
                message: "Seu carrinho está vazio",
                type: "warning"
            });
        }
        // Se houver itens
        else if (cartItems.length > 0 && toast && toast.type === 'warning') {
            setToast(null);
        }
    }, [cartItems.length, toast]);


    // --- 4. FUNÇÕES ASYNC PARA CHAMAR OS POPUPS ---

    const handleRemoveItem = async (id) => {
        try {
            await removeFromCart(id);
            setToast({ message: "Item removido com sucesso", type: "success" });
            setTimeout(() => setToast(null), 3000);
        } catch (error) {
            setModal({ message: error.message, type: "warning" });
        }
    };

    const handleUpdateItem = async (item, newQuantity) => {
        try {
            await updateQuantity(item.id, newQuantity);
            // Sucesso
        } catch (error) {
            // ERRO (ex: "Limite Excedido")
            setModal({ message: error.message, type: "warning" });
        }
    };

    const handleCheckout = async () => {
        try {
            // A função de checkout da API retorna a msg de sucesso
            const successMessage = await checkout();

            // SUCESSO: Mostra o modal verde
            setModal({ message: successMessage, type: "success" });
            setToast(null); // Limpa o "carrinho vazio"

        } catch (error) {
            // ERRO (ex: "API de checkout falhou")
            setModal({ message: error.message, type: "warning" });
        }
    };

    return (
        <div className="cart-page-container">
            {/* 5. Renderiza os dois popups */}
            {toast && (
                <Notification
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            {modal && (
                <AlertModal
                    message={modal.message}
                    type={modal.type}
                    onClose={() => setModal(null)}
                />
            )}

            <h1 className="cart-title">Meu Carrinho</h1>
            <div className="cart-layout">

                {/* Coluna da Esquerda: Lista de Itens */}
                <div className="cart-items-list">
                    {/* Botão "Voltar" (só com carrinho vazio) */}
                    {cartItems.length === 0 && (
                        <div className="cart-empty-fallback">
                            <Link to="/" className="cart-summary__continue-btn">
                                Voltar para a loja
                            </Link>
                        </div>
                    )}

                    {/* Itens do carrinho (só com carrinho > 0) */}
                    {cartItems.length > 0 && (
                        <>
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    {/* ... (imagem, details, etc.) ... */}
                                    <img src={item.image} alt={item.name} className="cart-item__image" />
                                    <div className="cart-item__details">
                                        <h2 className="cart-item__title">{item.baseName}</h2>
                                        <p className="cart-item__stock">Em estoque</p>
                                        <p className="cart-item__variant">{item.baseName.includes('Trident') ? 'Sabor' : 'Cor'}: {item.name}</p>

                                        <div className="cart-item__actions">
                                            {/* 6. Botões para as funções */}
                                            <div className="cart-item__quantity">
                                                <button onClick={() => handleUpdateItem(item, item.quantity - 1)}>-</button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button onClick={() => handleUpdateItem(item, item.quantity + 1)}>+</button>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="cart-item__remove-btn"
                                            >
                                                Excluir Produto
                                            </button>
                                        </div>
                                    </div>
                                    <span className="cart-item__price">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            {/* ... (Subtotal) ... */}
                            <div className="cart-subtotal-bottom">
                                Subtotal ({totalItems} {totalItems === 1 ? 'produto' : 'produtos'}): <strong>{formatPrice(subtotal)}</strong>
                            </div>
                        </>
                    )}
                </div>

                {/* Coluna da Direita: Sumário */}
                {cartItems.length > 0 && (
                    <div className="cart-summary">
                        {/* ... (título, preço, endereço) ... */}
                        <h3 className="cart-summary__title">
                            Subtotal ({totalItems} {totalItems === 1 ? 'produto' : 'produtos'}):
                        </h3>
                        <span className="cart-summary__price">{formatPrice(subtotal)}</span>

                        <div className="cart-summary__address">
                            <span>Irá ser entregue em:</span>
                            <p>Rua das Primaveras, 123, Jardim das Flores, Vila Nova, SP, 12345-678</p>
                        </div>

                        {/* 7. Botão "Fechar Pedido" usa a função */}
                        <button className="cart-summary__checkout-btn" onClick={handleCheckout}>
                            Fechar Pedido
                        </button>
                        <Link to="/" className="cart-summary__continue-btn">
                            Continuar comprando
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;