// App/backend/src/database/connection.js
const knex = require('knex');
const config = require('./knexfile'); // Importa nosso knexfile

// Estamos usando apenas a configuração 'development'
const connection = knex(config.development);

module.exports = connection;