/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // 1. Deleta TODOS os produtos existentes
  await knex('products').del();

  // 2. Insere os novos produtos (incluindo seu exemplo)
  await knex('products').insert([
    {
      id: 1,
      name: 'Telefone X - Preto',
      description: 'O mais novo Telefone X, agora na cor preta.',
      price: 999.90,
      image: 'telefone_preto.jpg' // Apenas o nome do arquivo
    },
    {
      id: 2,
      name: 'Telefone X - Verde',
      description: 'O mais novo Telefone X, agora na cor verde.',
      price: 999.90,
      image: 'telefone_verde.jpg'
    },
    {
      id: 3,
      name: 'Fone de Ouvido Y',
      description: 'Fone de ouvido sem fio com cancelamento de ruído.',
      price: 249.50,
      image: 'fone_y.jpg'
    },
    {
      id: 4,
      name: 'Carregador Rápido Z',
      description: 'Carregador de 30W com porta USB-C.',
      price: 89.00,
      image: 'carregador_z.jpg'
    }
  ]);
};