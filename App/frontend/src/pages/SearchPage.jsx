import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { fetchProducts } from '../services/api.js';


import ProductCard from '../components/ProductCard';
import Notification from '../components/Notification';

function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const loadSearch = async () => {
            if (!query) {
                setSearchResults([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setNotification(null);

            const allProducts = await fetchProducts();

            // Buscando por 'base_name'
            const filtered = allProducts.filter(product =>
                product.base_name &&
                product.base_name.toLowerCase().includes(query.toLowerCase())
            );

            setSearchResults(filtered);
            setIsLoading(false);

            // Ativa a notificação
            if (filtered.length === 0) {
                setNotification({
                    message: "Produto Não encontrado",
                    type: "error"
                });
            }
        };

        loadSearch();
    }, [query]);

    return (
        <div className="search-page-container">
            {/* Renderiza a Notificação (se ela existir) */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <h1 className="search-title">
                {isLoading ? `Buscando por "${query}"...` : `Resultados para "${query}":`}
            </h1>

            {/* Renderiza os produtos (se > 0) */}
            {!isLoading && searchResults.length > 0 && (
                <div className="product-grid">
                    {searchResults.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* 3. BOTÃO "VOLTAR" */}
            {/* Aparece se não estiver carregando E não tiver resultados */}
            {!isLoading && searchResults.length === 0 && (
                <div className="search-empty-fallback" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Link to="/" className="cart-summary__continue-btn">
                        Voltar para a loja
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SearchPage;
