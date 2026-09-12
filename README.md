# Sistema de Registro de Partidas de Xadrez
Sistema de regitro de partidas de xadrez com o objetivo de registrar partidas de xadrez e dados como jogadores, número de vitorias e derrotas dos jogadores e jogadas de partidas. 

## Linguagens e ferramentas
O projeto foi desenvolvido em **JavaScript**, tanto no *Backend* quanto no *Frontend*. A aplicação utilizou um banco de dados
**MySQL** para armazenamento dos dados e frameworks para a criação da *API*, como o **Sequelize** e o **Express**.

[![Backend tools](https://skillicons.dev/icons?i=mysql,sequelize,express,js)](https://skillicons.dev)

Já para o *Frontend*, ele foi construir com a ferramenta *Build* **Vite** e a biblioteca **React**, além de utilizar **Tailwind CSS** e **Lucide Icons** para estilização.

[![Frontend tools](https://skillicons.dev/icons?i=vite,react,js,tailwind)](https://skillicons.dev)
    
## Arquivos do projeto
- **Backend**:
  - `Config/`: Pasta de arquivos com as configurações do servidor e do banco de dados.
  - `Models/`: Pasta com os modelos Sequelize das tabelas do banco.
  - `Controller/`: Pasta com as funções CRUD das requisições HTTP.
  - `Router/`: Pasta com as rotas de requisição ao servidor.
  - `App.js`: Arquivo principal com a aplicação do servidor do projeto.

- **Frontend**:
  - `Hooks/`: Pasta com as funções de JavaScript.
  - `Components/`: Pasta com os Components JSX usado na página.
  - `Pages/`: Pasta com as páginas da aplicação.
  - `Styles/`: Pasta com as folhas de estilo da aplicação.
  - `App.jsx`: Arquivo principal da aplicação Frontend.
  - `main.jsx`: Arquivo JSX que cria a raiz da React no HTML.
  - `index.html`: Arquivo HTML da aplicação.
 
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
