// App/backend/src/routes/index.js
const express = require('express');

// O caminho para o controller agora é '../controllers'
const ProductController = require('../controllers/ProductController');

const routes = express.Router();

// Rota para listar produtos
routes.get('/products', ProductController.index);

// (Futuramente, outras rotas do carrinho virão aqui)

module.exports = routes;