/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // A função UP cria a tabela 'products'
    return knex.schema.createTable('products', (table) => {
        // Coluna 1: ID (Chave primária)
        // .increments() cria um ID numérico que auto-incrementa
        table.increments('id').primary();

        // Coluna 2: Nome
        // .notNullable() significa que não pode ser vazio
        table.string('name').notNullable();

        // Coluna 3: Descrição
        table.string('description'); // Pode ser nulo

        // Coluna 4: Preço
        // .decimal(10, 2) é bom para dinheiro (ex: 12345678.99)
        table.decimal('price', 10, 2).notNullable();

        // Coluna 5: Imagem (opcional)
        // Armazenamos apenas o nome/URL da imagem
        table.string('image');

        // Opcional: Adiciona colunas 'created_at' e 'updated_at'
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // A função DOWN apaga a tabela se precisarmos reverter
    return knex.schema.dropTable('products');
};