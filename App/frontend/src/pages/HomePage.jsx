import React, { useState, useEffect } from 'react';
// 1. Importar o hook de navegação
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

// ... (consts SMARTPHONE_BASENAMES e ESSENCIAIS_BASENAMES) ...
const SMARTPHONE_BASENAMES = [
    'iphone13',
    'Moto Edge',
    'GalaxyS22',
    'XiaomiRedmiA5'
];
const ESSENCIAIS_BASENAMES = [
    'Bis',
    'Cerealmatinal KitKat',
    'Trident',
    'Café Orfeu'
];


function HomePage() {
    // Estados dos produtos (já existentes)
    const [smartphones, setSmartphones] = useState([]);
    const [essenciais, setEssenciais] = useState([]);

    // --- LÓGICA DA BUSCA (NOVO) ---
    // 2. Adicionar o estado para o termo de busca
    const [searchQuery, setSearchQuery] = useState('');
    // 3. Inicializar o hook de navegação
    const navigate = useNavigate();
    // --- FIM DA LÓGICA DA BUSCA ---

    // useEffect (já existente)
    useEffect(() => {
        const loadProducts = async () => {
            const allProducts = await fetchProducts(); // Busca tudo

            // Filtra Smartphones
            setSmartphones(allProducts.filter(p =>
                SMARTPHONE_BASENAMES.includes(p.base_name)
            ));

            // Filtra Essenciais
            setEssenciais(allProducts.filter(p =>
                ESSENCIAIS_BASENAMES.includes(p.base_name)
            ));
        };

        loadProducts(); // Roda a função
    }, []); // O '[]' garante que rode só uma vez

    // 4. Adicionar a função de submit da busca
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        const query = searchQuery.trim();
        if (query) {
            // Navega para a mesma página de busca do Header
            navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className="homepage-container">
            {/* Seção 1: Carrossel */}
            <Carousel />

            {/* Seção 2: Conteúdo Principal */}
            <div className="main-products-content">

                {/* 5. Transformar a div em <form> e conectar a lógica */}
                <form onSubmit={handleSearchSubmit} className="search-bar-container">
                    <input
                        type="text"
                        placeholder="O que você está procurando?"
                        className="search-bar"
                        // 6. Conectar o input ao estado
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Se você tiver um botão de lupa aqui, ele funcionará automatic. */}
                </form>

                {/* Seção "Mais vendidos em Smartphones" */}
                <section className="product-section">
                    <h2 className="section-title">Mais vendidos em Smartphones</h2>
                    <div className="section-divider"></div>
                    <div className="product-grid">
                        {smartphones.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Seção "Essenciais" */}
                <section className="product-section">
                    <h2 className="section-title">Essenciais</h2>
                    <div className="section-divider"></div>
                    <div className="product-grid">
                        {essenciais.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HomePage;