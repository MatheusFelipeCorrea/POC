// Importa o Express e o Cors
const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/routes.js'); // Importa as rotas

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

// --- Servir Arquivos Estáticos (IMAGENS) ---
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Rotas ---
app.use(routes); // Diz ao express para usar as rotas

// Rota de teste (pode até apagar se quiser)
app.get('/', (req, res) => {
    res.send('Servidor backend está rodando!');
});



// --- PARA OS TESTES ---

// 1. Inicia o Servidor (com a condição de que, o servidor deve ser iniciado por terminal, isolando essa inicialização do teste)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor backend rodando na porta ${PORT}`);
    });
}

// 2. EXPORTA O APP
// Exporta o 'app' para que os testes possam importá-lo
module.exports = app;