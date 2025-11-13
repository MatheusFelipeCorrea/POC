const connection = require('../database/connection'); // Importa a conexão

module.exports = {
    // Função para listar os produtos
    async index(req, res) {
        try {
            // Usa o Knex para selecionar tudo (*) da tabela 'products'
            const products = await connection('products').select('*');

            // Retorna os produtos como resposta JSON
            return res.status(200).json(products);

        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
            return res.status(500).json({ message: "Erro interno ao buscar produtos." });
        }
    }
};