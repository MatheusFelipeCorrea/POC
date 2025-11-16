import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

// URL base da API
const API_URL = 'http://localhost:3001';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // 1. CARREGAMENTO INICIAL
    // Quando o app carrega, busca o carrinho da API
    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`);
                const data = await response.json();
                setCartItems(data.cartItems || []);
            } catch (error) {
                console.error("Falha ao carregar o carrinho:", error);
                setCartItems([]); // Começa vazio se a API falhar
            }
        };
        loadCart();
    }, []); // O '[]' garante que rode só uma vez

    // --- LÓGICA DE MANIPULAÇÃO ---

    // 2. ADICIONAR AO CARRINHO
    const addToCart = async (variant, productBaseName, quantity) => {
        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variant, productBaseName, quantity })
        });

        const data = await response.json();

        // Se a API retornar um erro (ex: "Limite excedido")
        if (!response.ok) {
            throw new Error(data.message); // Lança o erro
        }

        // Se deu certo, atualiza o estado local com a resposta da API
        setCartItems(data.cartItems);
    };

    // 3. ATUALIZAR QUANTIDADE
    const updateQuantity = async (variantId, newQuantity) => {
        const response = await fetch(`${API_URL}/cart/update/${variantId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newQuantity })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message); // Lança o erro
        }

        setCartItems(data.cartItems);
    };

    // 4. REMOVER DO CARRINHO
    const removeFromCart = async (variantId) => {
        const response = await fetch(`${API_URL}/cart/remove/${variantId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        setCartItems(data.cartItems);
    };

    // 5. CHECKOUT

    const checkout = async () => {
        const response = await fetch(`${API_URL}/checkout`, {
            method: 'POST'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        // Se deu certo, limpa o carrinho local e retorna a msg de sucesso
        setCartItems([]);
        return data.message; // Retorna "Compra concluída com sucesso!"
    };

    // --- CÁLCULOS  ---
    const totalItems = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    // --- VALOR EXPOSTO ---
    const contextValue = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout,
        totalItems,
        subtotal
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);