// Define a URL base da nossa API do backend
const API_BASE_URL = 'http://localhost:3001';

/**
 * Busca a lista de produtos da nossa API backend.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de produtos.
 */
export const fetchProducts = async () => {
    try {
        // Faz a chamada GET para o endpoint /products
        const response = await fetch(`${API_BASE_URL}/products`);

        // Se a resposta não for 'OK' (ex: erro 500), joga um erro
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Converte a resposta para JSON e a retorna
        const data = await response.json();
        return data;

    } catch (error) {
        // Captura qualquer erro (de rede ou o que jogamos)
        console.error("Falha ao buscar produtos:", error);
        // Retorna um array vazio em caso de erro para o frontend não quebrar
        return [];
    }
};

// No futuro, você pode adicionar mais funções aqui:
// export const addToCart = async (productId) => { ... }