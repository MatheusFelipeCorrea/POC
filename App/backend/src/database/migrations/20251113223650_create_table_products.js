/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('base_name').notNullable();
        table.text('description'); // text é melhor para descrições longas
        table.string('variant_type').notNullable().defaultTo('Estilo'); // ex: 'Cor', 'Sabor'
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
