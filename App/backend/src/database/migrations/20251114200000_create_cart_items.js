/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // Esta função CRIA a tabela 'cart_items'
    return knex.schema.createTable('cart_items', (table) => {
        table.integer('id').primary(); // O ID da variante
        table.string('baseName');
        table.string('name');
        table.decimal('price');
        table.string('image');
        table.integer('quantity').defaultTo(1);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // Esta função DELETA a tabela
    return knex.schema.dropTable('cart_items');
};