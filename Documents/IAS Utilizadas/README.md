## Relatório de Aplicação de Ferramentas de IA no Projeto POC E-commerce

Este documento detalha o uso estratégico de ferramentas de Inteligência Artificial como assistentes de desenvolvimento e design durante o ciclo de vida da Prova de Conceito (POC) do sistema de e-commerce.

### 1. IAs Utilizadas

O desenvolvimento contou com o suporte de duas principais plataformas de IA:

* **Gemini (Google):** Utilizada como assistente de programação, depuração e arquitetura de software.
* **Adobe Firefly:** Utilizada para a geração de ativos visuais (design gráfico).

---

### 2. Detalhamento de Uso: Gemini

A IA generativa Gemini foi empregada para otimizar o fluxo de trabalho de desenvolvimento, validar a lógica de negócios e garantir a qualidade do código.

#### 2.1 Organização de Pastas e Arquitetura
A IA foi consultada para definir e validar uma estrutura de pastas modular e escalável, garantindo a correta separação de responsabilidades (SoC) entre o backend (Node.js) e o frontend (React).

* **Prompt de Exemplo:** "Estou criando um projeto full-stack com React (Vite) e Node.js (Express). Qual é a estrutura de pastas padrão da indústria para organizar `components`, `pages`, `context` no frontend, e `routes`, `controllers`, `database` no backend?"

#### 2.2 Implementação e Configuração de Testes
A IA forneceu auxílio à implementação e configuração necessária para implementar testes unitários e de integração em ambas as plataformas, utilizando as bibliotecas adequadas (Jest/Supertest no backend e Vitest/RTL no frontend).

* **Prompt de Exemplo:** "Preciso testar meu backend em Node.js. Como configuro o Jest e o Supertest para testar meus endpoints de API? Meu `server.js` precisa ser modificado para não iniciar o servidor durante os testes?"

#### 2.3 Gerenciamento de Requisitos e Tarefas
A IA foi utilizada como uma ferramenta de gerenciamento de projeto para rastrear o progresso. O modelo analisou a lista de requisitos da POC e gerou listas de verificação (checklists) detalhadas do que estava concluído versus pendente.

* **Prompt de Exemplo:** "Com base nesta lista de requisitos (Requisitos elicitados por mim com ajuda do documento do Case) e no código que desenvolvemos, me diga o que já fizemos e o que ainda falta implementar no projeto?"


#### 2.4 Suporte Geral ao Desenvolvimento (Depuração)
A IA atuou como uma assistente de programação "pair programming", ajudando a identificar e corrigir erros de sintaxe (ex: tags JSX mal fechadas), lógica de programação (ex: `async/await` incorreto, lógica de `useEffect` no React) e erros de CSS (ex: `flexbox` quebrando o layout).

* **Prompt de Exemplo:** "Meu `CartContext` não está atualizando o estado corretamente após a chamada da API, o que está errado neste código? [código colado]"

---

### 3. Detalhamento de Uso: Adobe Firefly

A IA generativa Adobe Firefly foi utilizada para a criação de ativos visuais (banners) para o carrossel da página inicial, garantindo uma aparência profissional para a POC.

#### 3.1 Geração de Banners Promocionais

* **Prompt Utilizado:**
  > "Crie 3 banners promocionais distintos. Cada banner deve apresentar um produto específico com um fundo limpo (branco ou azul).
  >
  > **Banner 1:** Samsung Galaxy S22. Destaque o telefone com um design moderno e minimalista. Foco na promoção.
  >
  > **Banner 2:** Motorola Moto G05. Apresente o smartphone com um design clean e um apelo promocional.
  >
  > **Banner 3:** Café Orfeu. Mostre a embalagem do café Orfeu de forma sofisticada e convidativa. Foco na promoção."