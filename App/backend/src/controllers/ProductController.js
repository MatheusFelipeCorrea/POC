// App/backend/src/controllers/ProductController.js
const connection = require('../database/connection'); // Importa a conexão

// Define a URL base para as imagens (para não repetir)
const IMAGE_BASE_URL = 'http://localhost:3001/images/';

module.exports = {
    /**
     * Busca todos os produtos "Pai" e aninha suas "Variantes" (Filhos)
     */
    async index(req, res) {
        try {
            // 1. Busca todos os produtos "Pai" da tabela 'products'
            const baseProducts = await connection('products').select('*');

            // 2. Usamos Promise.all para fazer buscas paralelas
            // Para cada produto "Pai", vamos buscar seus "Filhos" (variantes)
            const productsWithVariants = await Promise.all(
                baseProducts.map(async (product) => {

                    // 3. Busca as variantes que pertencem a este product.id
                    const rawVariants = await connection('variants')
                        .where('product_id', product.id)
                        .select('*');

                    // 4. Monta a URL completa da imagem para cada variante
                    const variants = rawVariants.map(variant => {
                        return {
                            ...variant,
                            // Monta a URL final, ex: http://.../images/iphones/estelar.jpg
                            image: `${IMAGE_BASE_URL}${variant.image}`
                        }
                    });

                    // 5. Retorna o produto "Pai" com o array de variantes aninhado
                    return {
                        ...product, // id, base_name, description, variant_type
                        variants: variants // array de variantes filhas
                    };
                })
            );

            // 6. Retorna a lista completa de produtos já agrupados
            return res.status(200).json(productsWithVariants);

        } catch (err) {
            console.error("Erro ao buscar produtos com variantes:", err);
            return res.status(500).json({ message: "Erro interno ao buscar produtos." });
        }
    }
};