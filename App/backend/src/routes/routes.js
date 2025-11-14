const express = require('express');
const ProductController = require('../controllers/ProductController');
// 1. IMPORTA A CONEXÃO DO BANCO DE DADOS
// Este é o caminho CORRETO
const db = require('../database/connection.js');

const routes = express.Router();

// --- ROTAS DE PRODUTO (Sem alteração) ---
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

// ===========================================
// --- LÓGICA DO CARRINHO (Agora com DB) ---
// ===========================================

// Função helper para calcular totais (agora recebe os itens)
const calculateCart = (cartItems) => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { cartItems, totalItems, subtotal };
};

// 1. GET /cart - Busca o carrinho atual do DB
routes.get('/cart', async (req, res) => {
    try {
        const cartItems = await db('cart_items').select('*');
        res.status(200).json(calculateCart(cartItems));
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar carrinho." });
    }
});

// 2. POST /cart/add - Adiciona um item ao DB
routes.post('/cart/add', async (req, res) => {
    try {
        const { variant, productBaseName, quantity } = req.body;

        const existingItem = await db('cart_items').where('id', variant.id).first();

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > 10) {
                return res.status(400).json({
                    message: "Limite de itens Excedido (Limite máximo = 10)"
                });
            }
            // Atualiza a quantidade do item existente
            await db('cart_items').where('id', variant.id).update({ quantity: newQuantity });
        } else {
            if (quantity > 10) {
                return res.status(400).json({
                    message: "Limite de itens Excedido (Limite máximo = 10)"
                });
            }
            // Insere o novo item
            await db('cart_items').insert({
                id: variant.id,
                baseName: productBaseName,
                name: variant.name,
                price: variant.price,
                image: variant.image,
                quantity: quantity
            });
        }

        // Retorna o carrinho atualizado
        const cartItems = await db('cart_items').select('*');
        res.status(200).json(calculateCart(cartItems));
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar item." });
    }
});

// 3. PUT /cart/update/:id - Altera a quantidade no DB
routes.put('/cart/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { newQuantity } = req.body;

        if (newQuantity > 10) {
            return res.status(400).json({
                message: "Limite de itens Excedido (Limite máximo = 10)"
            });
        }

        if (newQuantity < 1) {
            // Remove o item se a quantidade for menor que 1
            await db('cart_items').where('id', Number(id)).del();
        } else {
            // Atualiza a quantidade
            await db('cart_items').where('id', Number(id)).update({ quantity: newQuantity });
        }

        const cartItems = await db('cart_items').select('*');
        res.status(200).json(calculateCart(cartItems));
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar item." });
    }
});

// 4. DELETE /cart/remove/:id - Remove um item do DB
routes.delete('/cart/remove/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db('cart_items').where('id', Number(id)).del();

        const cartItems = await db('cart_items').select('*');
        res.status(200).json(calculateCart(cartItems));
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover item." });
    }
});

// 5. POST /checkout - Limpa a tabela do carrinho no DB
routes.post('/checkout', async (req, res) => {
    try {
        // .truncate() é o comando SQL para "deletar todas as linhas"
        await db('cart_items').truncate();

        res.status(200).json({
            message: 'Compra concluída com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao finalizar compra." });
    }
});
// ===========================================

module.exports = routes;