// Importa o 'supertest' (para fazer chamadas de API)
const request = require('supertest');
// Importa o 'app' do seu server.js (agora é seguro importar)
const app = require('../server');
// Importa o banco de dados para podermos limpá-lo
const db = require('../database/connection.js');

// --- Bloco de "Setup" ---
// Isso roda ANTES de cada teste ("it")
beforeEach(async () => {
    // É ESSENCIAL limpar a tabela do carrinho antes de cada teste
    // para garantir que um teste não afete o outro.
    await db('cart_items').truncate();
});

// --- Bloco de "Teardown" ---
// Isso roda DEPOIS de todos os testes
afterAll(async () => {
    // Fecha a conexão com o banco de dados
    await db.destroy();
});


// --- Conjunto de Testes da API ---
describe('API Endpoints', () => {

    // Teste 1: Verifica o endpoint GET /products
    it('deve retornar a lista de produtos em GET /products', async () => {
        // 'request(app)' "finge" que o servidor está rodando
        const response = await request(app)
            .get('/products') // Faz a chamada
            .expect('Content-Type', /json/) // Espera que a resposta seja JSON
            .expect(200); // Espera um status 200 (OK)

        // Verifica se a resposta é um array (lista de produtos)
        expect(Array.isArray(response.body)).toBeTruthy();
        // Verifica se o array não está vazio (assumindo que há produtos)
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Teste 2: Verifica o endpoint GET /cart (agora limpo)
    it('deve retornar um carrinho vazio em GET /cart', async () => {
        // (O 'beforeEach' já limpou o banco de dados para nós)

        const response = await request(app)
            .get('/cart')
            .expect('Content-Type', /json/)
            .expect(200);

        // Verifica a estrutura do carrinho vazio
        expect(response.body.cartItems).toEqual([]);
        expect(response.body.totalItems).toBe(0);
        expect(response.body.subtotal).toBe(0);
    });

});