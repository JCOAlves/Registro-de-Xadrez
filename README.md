# Sistema de Registro de Partidas de Xadrez
Sistema de regitro de partidas de xadrez com o objetivo de registrar partidas de xadrez e dados como jogadores, número de vitorias e derrotas dos jogadores e jogadas de partidas. 

## Linguagens e ferramentas
O projeto é desenvolvido em **JavaScript**, tanto no *Backend* quanto no *Frontend*, além de utilizar frameworks e ferramentas.
- **Backend**:
  - Express JS
  - Sequelize
  - MySQL
  - CORS
  - Session
  - JWT
  
- **Frontend**:
  - Vite
  - React JS
  - Tailwind CSS
  
    
## Arquivos do projeto
- **Backend**:
  - `App.js`: Arquivo principal com a aplicação do servidor do projeto.
  - `Config/`: Pasta de arquivos com as configurações do servidor e do banco de dados.
  - `Models/`: Pasta com os modelos Sequelize das tabelas do banco.
  - `Controller/`: Pasta com as funções CRUD das requisições HTTP.
  - `Router/`: Pasta com as rotas de requisição ao servidor.
- **Frontend**:
  - `index.html`: Arquivo HTML da aplicação.
  - `main.jsx`: Arquivo JSX que cria a raiz da React no HTML.
  - `App.jsx`: Arquivo principal da aplicação Frontend.
  - `Compornentes/`: Pasta com os compornentes JSX usado na página.
  - `Paginas/`: Pasta com as páginas da aplicação.
  - `style/`: Pasta com as folhas de estilo da aplicação.
  - `FuncoesJS/`: Pasta com as funções de JavaScript.
 
## Como rodar a aplicação
- **Backend**:
  1. Entre na pasta *Backend*:
     ```bash
     cd Backend
     ```
  2. Instale as depebdências da pasta:
     ```bash
     npm install
     ```
  3. Execute o comando:
     ```bash
     npm run dev
     ```
- **Frontend**:
  1. Entre na pasta *Frontend*:
     ```bash
     cd Frontend
     ```
  2. Instale as dependências da pasta:
     ```bash
     npm install
     ```
  3. Execute o comando:
     ```bash
     npm run dev
     ```
