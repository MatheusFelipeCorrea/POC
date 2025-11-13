/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// App/backend/src/database/seeds/complex_products_variants.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Usamos uma transação para garantir que tudo seja inserido corretamente
  return knex.transaction(async (trx) => {
    // 1. Limpa as tabelas (Filho primeiro, depois Pai)
    await trx('variants').del();
    await trx('products').del();

    // 2. Insere os Produtos "Pai" e pega os IDs

    // -- Celulares --
    const [iphoneId] = await trx('products')
        .insert({
          base_name: 'iPhone 13',
          description: 'O chip A15 Bionic e a câmera dupla mais avançada. Um salto gigante em bateria.',
          variant_type: 'Cor',
        })
        .returning('id'); // Pega o ID do produto inserido

    const [motoEdgeId] = await trx('products')
        .insert({
          base_name: 'Moto Edge',
          description: 'Performance de ponta, design ultrafino e câmeras de alta resolução.',
          variant_type: 'Cor',
        })
        .returning('id');

    const [s22Id] = await trx('products')
        .insert({
          base_name: 'Galaxy S22',
          description: 'O poder da noite nas suas mãos. Câmeras com Nightography e desempenho épico.',
          variant_type: 'Cor',
        })
        .returning('id');

    const [xiaomiId] = await trx('products')
        .insert({
          base_name: 'Xiaomi Redmi A5',
          description: 'Bateria de longa duração e tela imersiva para o seu dia a dia.',
          variant_type: 'Cor',
        })
        .returning('id');

    // -- Comidas --
    const [bisId] = await trx('products')
        .insert({
          base_name: 'Bis',
          description: 'A combinação perfeita de wafer crocante e chocolate Lacta.',
          variant_type: 'Sabor',
        })
        .returning('id');

    const [kitkatCerealId] = await trx('products')
        .insert({
          base_name: 'Cereal Matinal KitKat',
          description: 'Pedaços crocantes com o sabor inconfundível do chocolate KitKat.',
          variant_type: 'Tamanho', // Mesmo sendo um, ele precisa de uma variante
        })
        .returning('id');

    const [tridentId] = await trx('products')
        .insert({
          base_name: 'Trident',
          description: 'Chiclete sem açúcar com sabor refrescante que dura.',
          variant_type: 'Sabor',
        })
        .returning('id');

    const [cafeId] = await trx('products')
        .insert({
          base_name: 'Café Orfeu',
          description: 'Cafés especiais premiados, 100% Arábica. Uma experiência única.',
          variant_type: 'Tipo',
        })
        .returning('id');

    // 3. Insere as Variantes "Filho" usando os IDs dos "Pais"
    // (Eu mesmo gerei preços e caminhos de imagem, você PODE e DEVE alterar os caminhos)

    await trx('variants').insert([
      // -- iPhone 13 (use o ID do 'iphoneId') --
      { product_id: iphoneId.id, name: 'Estelar', price: 4299.00, image: 'iPhone 13/Estelar.jpg' },
      { product_id: iphoneId.id, name: 'Meia Noite', price: 4299.00, image: 'iPhone 13/Meia Noite.jpg' },

      // -- Moto Edge (use o ID do 'motoEdgeId') --
      { product_id: motoEdgeId.id, name: 'Cinza', price: 2199.00, image: 'Edge 60 Fusion 5G/Cinza.jpg' },
      { product_id: motoEdgeId.id, name: 'Mocha', price: 2199.00, image: 'Edge 60 Fusion 5G/Mocha.jpg' },
      { product_id: motoEdgeId.id, name: 'Rosa', price: 2199.00, image: 'Edge 60 Fusion 5G/Rosa.jpg' },

      // -- S22 (use o ID do 's22Id') --
      { product_id: s22Id.id, name: 'Branco', price: 3499.00, image: 'Galaxy S22/branco.jpg' },
      { product_id: s22Id.id, name: 'Preto', price: 3499.00, image: 'Galaxy S22/preto.jpg' },
      { product_id: s22Id.id, name: 'Violeta', price: 3499.00, image: 'Galaxy S22/Violeta.jpg' },

      // -- Xiaomi (use o ID do 'xiaomiId') --
      { product_id: xiaomiId.id, name: 'Azul', price: 1099.00, image: 'Xiaomi Redmi A5/Azul.jpg' },
      { product_id: xiaomiId.id, name: 'Dourado', price: 1099.00, image: 'Xiaomi Redmi A5/Dourado.jpg' },
      { product_id: xiaomiId.id, name: 'Preto', price: 1099.00, image: 'Xiaomi Redmi A5/Preto.jpg' },

      // -- Bis (use o ID do 'bisId') --
      { product_id: bisId.id, name: 'Branco', price: 6.99, image: 'Bis/Bis Branco.jpg' },
      { product_id: bisId.id, name: 'Original', price: 6.99, image: 'Bis/Bis Original.jpg' },

      // -- Cereal KitKat (use o ID do 'kitkatCerealId') --
      { product_id: kitkatCerealId.id, name: '200g', price: 24.90, image: 'Cereal Matinal/Kitkat.jpg' },

      // -- Trident (use o ID do 'tridentId') --
      { product_id: tridentId.id, name: 'Menta Intensa', price: 5.50, image: 'Trident/Menta intensa.jpg' },
      { product_id: tridentId.id, name: 'Menta Verde', price: 5.50, image: 'Trident/Menta Verde.jpg' },
      { product_id: tridentId.id, name: 'Menta', price: 5.50, image: 'Trident/Menta.jpg' },
      { product_id: tridentId.id, name: 'Morango', price: 5.50, image: 'Trident/Morango.jpg' },

      // -- Café Orfeu (use o ID do 'cafeId') --
      { product_id: cafeId.id, name: 'Acauã', price: 39.90, image: 'Café ORFEU/Acauã.jpg' },
      { product_id: cafeId.id, name: 'Arara', price: 39.90, image: 'Café ORFEU/Arara.jpg' },
      { product_id: cafeId.id, name: 'Bourbon Amarelo', price: 42.90, image: 'Café ORFEU/Bourbon Amarelo.jpg' },
      { product_id: cafeId.id, name: 'Catucaí', price: 39.90, image: 'Café ORFEU/Catucaí.jpg' },
      { product_id: cafeId.id, name: 'Clássico', price: 35.90, image: 'Café ORFEU/Clássico.jpg' },
      { product_id: cafeId.id, name: 'Descafeinado', price: 41.90, image: 'Café ORFEU/Descafeinado.jpg' },
      { product_id: cafeId.id, name: 'Japy', price: 39.90, image: 'Café ORFEU/Japy.jpg' },
      { product_id: cafeId.id, name: 'Orgânico', price: 45.90, image: 'Café ORFEU/Orgânico.jpg' },
    ]);
  });
};
