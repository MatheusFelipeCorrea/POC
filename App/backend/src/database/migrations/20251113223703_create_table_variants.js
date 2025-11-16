/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('variants', (table) => {
        table.increments('id').primary();


        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE');

        table.string('name').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.string('image');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('variants');
};
