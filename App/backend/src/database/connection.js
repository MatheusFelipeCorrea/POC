const knex = require('knex');
const config = require('./knexfile'); // Importa o knexfile

// Usando apenas a configuração 'development'
const connection = knex(config.development);

module.exports = connection;