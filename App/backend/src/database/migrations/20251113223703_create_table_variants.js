/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('variants', (table) => {
        table.increments('id').primary();

        // Chave Estrangeira: "Qual produto 'Pai' esse 'Filho' pertence?"
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE'); // Se apagar o 'Pai', apaga o 'Filho'

        table.string('name').notNullable(); // ex: 'Estelar', 'Menta', 'Branco'
        table.decimal('price', 10, 2).notNullable();
        table.string('image'); // ex: 'iphones/estelar.jpg'
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('variants');
};
