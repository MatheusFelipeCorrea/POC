# Instruções de Execução do Projeto Mercado Digital (POC)

Este guia detalha os passos necessários para configurar e rodar o projeto de prova de conceito (POC), incluindo o servidor backend (Node.js) e o cliente frontend (React).

## 1. Pré-requisitos

- **Node.js**: Versão 16.x ou superior.
- **NPM/Yarn**: Gerenciador de pacotes.

## 2. Estrutura do Projeto

O projeto é dividido em duas pastas principais:

| Pasta | Conteúdo | Porta de Execução |
|-------|----------|-------------------|
| `backend/` | Servidor Node.js, Express, Knex (SQLite) | 3001 |
| `frontend/` | Aplicação React | 5173 (ou similar) |

## 3. Configuração Inicial e Instalação

Abra o terminal na raiz do projeto (`App/` ou `TesteDTI/`) e execute os comandos abaixo, um por vez, para instalar as dependências:

### 3.1. Instalar dependências do Backend:

```bash
cd App/backend
npm install
```

### 3.2. Instalar dependências do Frontend:

```bash
cd App/frontend
npm install
```

*Volte para a pasta raiz do projeto.*

## 4. Inicialização do Banco de Dados (SQLite)

O backend utiliza o Knex para gerenciar o banco de dados persistente (SQLite). É necessário rodar a migration para criar a tabela `cart_items`.

### 4.1. Acesse a pasta src do Backend:

```bash
cd App/backend/src
```

### 4.2. Rode a Migration:

```bash
npx knex migrate:latest --knexfile ./database/knexfile.js
```

**Resultado esperado**: Você verá uma mensagem indicando que a tabela cart_items foi criada (ex: `Batch 1 run: 1 migrations`).

## 5. Execução do Projeto

Para que o sistema funcione corretamente, o Backend e o Frontend devem estar rodando **simultaneamente**.

**Recomendação**: Use dois terminais separados.

### 5.1. Terminal 1: Iniciar o Backend

1. Se você não estiver na pasta `App/backend/src`, navegue até ela:

```bash
 cd App/backend/src
```

2. **Iniciar o Servidor:**

```bash
node server.js
```

**Resultado esperado**: Servidor backend rodando na porta 3001.

### 5.2. Terminal 2: Iniciar o Frontend

1. Navegue para a pasta `App/frontend`:

```bash
cd App/frontend
```

2. **Iniciar o Cliente React:**

```bash
npm run dev
```

**Resultado esperado**: A aplicação será aberta no navegador (geralmente em `http://localhost:5173/`).

## 6. Roteiro de Teste (Validação dos Requisitos)

Para validar todos os requisitos e a comunicação entre frontend/backend/DB, siga este roteiro:

### 6.1. Persistência e Validação (Backend)

1. **Adicionar Item:** Adicione qualquer produto ao carrinho.

2. **Teste de Limite (Validação Backend):** Tente aumentar a quantidade do item para 11.
    - **Esperado:** O modal amarelo "Limite de itens Excedido (Limite máximo = 10)" deve aparecer.

3. **Teste de Persistência:**
    - **Pare o Servidor Backend** (Terminal 1) com `Ctrl + C`
    - **Inicie o Servidor Backend novamente** (`node server.js`)
    - **Recarregue a página do Frontend** (F5)
    - **Esperado:** O item que você adicionou deve continuar no carrinho, provando que ele foi salvo no banco de dados SQLite.

### 6.2. Funcionalidades e Feedback (Frontend)

1. **Feedback Adicionar:** Na página de detalhes, clique em "Adicionar ao Carrinho".
    - **Esperado:** Toast verde "Produto adicionado ao carrinho!" aparece e some.

2. **Feedback Remover:** Na página do carrinho, remova o item.
    - **Esperado:** Toast verde "Item removido com sucesso" aparece e o item some.

3. **Feedback Carrinho Vazio:** Recarregue a página do carrinho (F5).
    - **Esperado:** Toast amarelo "Seu carrinho está vazio" aparece, junto com o botão "Voltar para a loja".

4. **Checkout:** Adicione um item e clique em "Fechar Pedido".
    - **Esperado:** Modal verde "Compra concluída com sucesso!" aparece e o carrinho é limpo no banco de dados.

### 6.3. Responsividade

1. Redimensione a janela do navegador para o tamanho de um celular ou tablet.
    - **Esperado:** O layout do Header, Página de Detalhes e Página do Carrinho deve se empilhar verticalmente (colunas viram linhas), adaptando-se à tela menor.

---

Espero que esta formatação em Markdown seja útil! O arquivo mantém toda a informação original mas com melhor organização e legibilidade. 😊
