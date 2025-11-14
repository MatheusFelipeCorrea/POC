import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para o botão "Ver mais"

// Função helper para formatar o preço para R$
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);
};

function ProductCard({ product }) {
    // Pega a primeira variante (ex: Cor "Estelar") para exibir a imagem e o preço
    const [selectedVariant] = useState(product.variants[0]);

    // Se o produto não tiver variantes (segurança)
    if (!selectedVariant) {
        return null;
    }

    return (
        <div className="product-card">
            {/* Parte 1: Topo Branco com Imagem */}
            <div className="product-card__image-container">
                <img
                    src={selectedVariant.image} // A URL já vem da API
                    alt={product.base_name}
                    className="product-card__image"
                />
            </div>

            {/* Parte 2: Base Azul com Conteúdo */}
            <div className="product-card__content">
                <h3 className="product-card__title">{product.base_name}</h3>
                <p className="product-card__price">{formatPrice(selectedVariant.price)}</p>

                {/* O botão "Ver mais" é um Link para a página de detalhes */}
                <Link to={`/product/${product.id}`} className="product-card__view-more-btn">
                    Ver mais
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;