# API - Mercado Digital (POC)

Esta é a documentação para a API do backend da Prova de Conceito (POC) do Mercado Digital, construída em Node.js com Express e SQLite (via Knex).

## Informações Gerais

* **URL Base:** `http://localhost:3001`
* **Autenticação:** Nenhuma. Esta API é pública para os propósitos da POC.
* **Formato dos Dados:** Todas as requisições (`POST`/`PUT`) devem enviar `Content-Type: application/json` e todos os dados no corpo devem ser JSON. Todas as respostas da API são em JSON.

---

## Estrutura dos Dados

### Objeto de Carrinho (Retorno da API)

Quando o carrinho é retornado com sucesso (em `GET`, `POST`, `PUT`, `DELETE`), ele segue esta estrutura:

```
{
  "cartItems": [
    {
      "id": 1,
      "baseName": "iphone13",
      "name": "Preto-Meia-noite",
      "price": 5000.00,
      "image": "/images/iphone13.jpg",
      "quantity": 2
    }
  ],
  "totalItems": 2,
  "subtotal": 10000.00
}
```
### Objeto de Erro
Quando uma requisição falha (erros 4xx ou 5xx), a API retorna:

```
{
  "message": "Mensagem de erro descritiva aqui"
}
```

## Endpoints de Produtos

Estes endpoints são usados para listar os produtos do catálogo.

### 1. `GET /products`

* **Propósito:** Lista todos os produtos disponíveis no banco de dados.
* **Corpo da Requisição:** Nenhum.
* **Resposta de Sucesso (200):** Retorna um array de objetos de produto.

```
[
  { "id": 1, "base_name": "...", ... },
  { "id": 2, "base_name": "...", ... }
]
```

### 2. `GET /products/:id`
* **Propósito:** Retorna um produto específico com todas as suas variantes.

* **Parâmetros:** 

* * **:id (string):** O id (ou base_name) do produto a ser buscado.

* **Corpo da Requisição:** Nenhum.

* **Resposta de Sucesso (200):** Retorna um único objeto de produto com um array variants.

```

{
  "id": 1,
  "base_name": "iphone13",
  "description": "O novo iPhone...",
  "variants": [
    { "id": 1, "name": "Preto", ... },
    { "id": 2, "name": "Azul", ... }
  ]
}
```

## Endpoints do Carrinho
Estes endpoints gerenciam o estado do carrinho de compras, que é persistido no banco de dados SQLite (cart_items).

### 1. `GET /cart`
   * **Propósito:** Busca o estado atual completo do carrinho (itens, total, subtotal).

* **Corpo da Requisição:** Nenhum.

**Resposta de Sucesso (200):** Retorna o Objeto de Carrinho.

### 2. `POST /cart/add`
   * **Propósito:**  Adiciona um item ao carrinho. Se o item já existir, atualiza sua quantidade. Valida o limite máximo de 10 unidades.

**Corpo da Requisição (JSON):**


```
{
"variant": {
"id": 1,
"name": "Preto-Meia-noite",
"price": 5000.00,
"image": "/images/iphone13.jpg"
},
"productBaseName": "iphone13",
"quantity": 1
}

```

* **Resposta de Sucesso (200):** Retorna o Objeto de Carrinho atualizado.

* **Resposta de Erro (400):**
```
{
"message": "Limite de itens Excedido (Limite máximo = 10)"
}
```

### 3. `PUT /cart/update/:id`
   * **Propósito:** Altera a quantidade de um item específico no carrinho. Valida o limite (máx 10, mín 1). Se a quantidade for < 1, o item é removido.

**Parâmetros:**

`:id (number): O ID da variante do item no carrinho.`

Corpo da Requisição (JSON):
```
{
"newQuantity": 3
}
```

* **Resposta de Sucesso (200):** Retorna o Objeto de Carrinho atualizado.

* **Resposta de Erro (400):**

```
{
"message": "Limite de itens Excedido (Limite máximo = 10)"
}
```

### 4. `DELETE /cart/remove/:id`
   * **Propósito:** Remove um item específico do carrinho, independentemente da quantidade.

**Parâmetros**

`:id (number): O ID da variante do item a ser removido.`

* **Corpo da Requisição:** Nenhum.

* **Resposta de Sucesso (200):** Retorna o Objeto de Carrinho atualizado.

## Endpoint de Checkout (Simulado)
### 1. `POST /checkout`
   * **Propósito:** Simula a finalização de uma compra. Limpa todos os itens do carrinho no banco de dados (TRUNCATE cart_items).

* **Corpo da Requisição:** Nenhum.

* **Resposta de Sucesso (200):** Retorna uma mensagem de sucesso.


```
{
"message": "Compra concluída com sucesso!"
}
```
* **Resposta de Erro (500):**

```
{
"message": "Erro ao finalizar compra."
}
```