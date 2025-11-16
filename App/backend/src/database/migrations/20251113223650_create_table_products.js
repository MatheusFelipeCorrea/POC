/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('base_name').notNullable();
        table.text('description');
        table.string('variant_type').notNullable().defaultTo('Estilo');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
