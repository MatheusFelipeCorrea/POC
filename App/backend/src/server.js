// Importa o Express e o Cors
const express = require('express');
const cors = require('cors');
const path = require('path'); // <--- 1. ESSA LINHA FALTAVA (necessária para servir arquivos)

// ... (imports do express e cors)
const routes = require('./routes/routes.js'); // <--- 1. IMPORTE AS ROTAS

const app = express();
const PORT = 3001;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Servir Arquivos Estáticos (IMAGENS) ---
// Esta é a linha que corrige o "Cannot GET /images"
// Ela diz ao Express para transformar a pasta "public" em um servidor de arquivos
app.use(express.static(path.join(__dirname, '..', 'public'))); // <--- 2. ESSA LINHA FALTAVA

// --- Rotas ---
app.use(routes); // <--- 2. DIGA AO EXPRESS PARA USAR AS ROTAS

// Rota de teste (pode até apagar se quiser)
app.get('/', (req, res) => {
    res.send('Servidor backend está rodando!');
});

// --- Inicia o Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});