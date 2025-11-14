import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
// Importamos os DOIS tipos de popup
import Notification from '../components/Notification';
import AlertModal from '../components/AlertModal'; // <-- PRECISAMOS DO MODAL AQUI

// ... (formatPrice) ...
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
};

function ProductDetailsPage() {
    const { id } = useParams();
    const { addToCart } = useCart(); // Pegamos o novo addToCart (async)

    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Estados para os popups
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null); // Para erros (ex: Limite)
    const [isAdding, setIsAdding] = useState(false); // Para desabilitar o botão

    // ... (useEffect loadProduct) ...
    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchProductById(id);
            setProduct(data);
            if (data && data.variants.length > 0) {
                setSelectedVariant(data.variants[0]);
            }
        };
        loadProduct();
    }, [id]);

    // 1. ATUALIZA O 'handleAddToCart' PARA SER ASYNC E USAR TRY/CATCH
    const handleAddToCart = async () => {
        setIsAdding(true); // Desabilita o botão
        setToast(null);
        setModal(null);

        try {
            // Tenta chamar a API
            await addToCart(selectedVariant, product.base_name, quantity);

            // SUCESSO: Mostra o toast verde
            setToast({ message: "Produto adicionado ao carrinho!", type: "success" });
            setTimeout(() => setToast(null), 3000);

        } catch (error) {
            // ERRO (ex: "Limite Excedido"): Mostra o modal de aviso
            setModal({
                message: error.message, // "Limite de itens Excedido..."
                type: "warning"
            });
        } finally {
            setIsAdding(false); // Reabilita o botão
        }
    };

    // ... (if !product) ...
    if (!product || !selectedVariant) {
        return <div className="details-page-container">Carregando...</div>;
    }
    // ... (quantityOptions) ...
    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="details-page-container">
            {/* 2. RENDERIZA OS DOIS POPUPS */}
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

            {/* ... (Botão Voltar) ... */}
            <Link to="/" className="back-button">
                &larr; Voltar
            </Link>

            <div className="details-content">
                {/* ... (details-left) ... */}
                <div className="details-left">
                    <div className="details-image-container">
                        <img
                            src={selectedVariant.image}
                            alt={selectedVariant.name}
                            className="details-image"
                        />
                    </div>
                    <div className="details-description">
                        <h3>O que o pacote inclui:</h3>
                        <p>{product.description}</p>
                    </div>
                </div>

                {/* ... (details-right) ... */}
                <div className="details-right">
                    <div className="buy-box">
                        {/* ... */}
                        <h1 className="buy-box__title">{product.base_name} - {selectedVariant.name}</h1>
                        <span className="buy-box__price">{formatPrice(selectedVariant.price)}</span>
                        <span className="buy-box__stock">Em estoque</span>

                        <hr className="buy-box__divider" />

                        {/* ... (Selects) ... */}
                        <label htmlFor="quantity" className="buy-box__label">Quantidade:</label>
                        <select
                            id="quantity"
                            className="buy-box__select"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                            {quantityOptions.map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>

                        <label htmlFor="variant" className="buy-box__label">{product.variant_type}:</label>
                        <select
                            id="variant"
                            className="buy-box__select"
                            value={selectedVariant.id}
                            onChange={(e) => {
                                const newVariantId = Number(e.target.value);
                                const newVariant = product.variants.find(v => v.id === newVariantId);
                                setSelectedVariant(newVariant);
                            }}
                        >
                            {product.variants.map(variant => (
                                <option key={variant.id} value={variant.id}>
                                    {variant.name}
                                </option>
                            ))}
                        </select>

                        {/* ... (Address) ... */}
                        <div className="buy-box__address">
                            <span>Irá ser entregue em:</span>
                            <p>Rua das Primaveras, 123, Jardim das Flores, Vila Nova, SP, 12345-678</p>
                        </div>

                        {/* 3. BOTÃO ATUALIZADO (desabilitado enquanto carrega) */}
                        <button
                            className="buy-box__add-btn"
                            onClick={handleAddToCart}
                            disabled={isAdding} // Desabilita
                        >
                            {isAdding ? "Adicionando..." : "Adicionar ao Carrinho"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;