// Importa 'path' para resolver caminhos
const path = require('path');

module.exports = {
    // Configuração para o ambiente de desenvolvimento
    development: {
        client: 'sqlite3',
        connection: {
            //Nome e o local do arquivo do banco de dados
            filename: path.resolve(__dirname, 'database.db')
        },
        // Habilita o uso de chaves estrangeiras no SQLite
        pool: {
            afterCreate: (conn, cb) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            }
        },
        // Localizar arquivos de 'migration'
        migrations: {
            directory: path.resolve(__dirname, 'migrations')
        },
        // Configuração para o SQLite não dar erros
        useNullAsDefault: true,
    }
};