# Sistema de Registro de Partidas de Xadrez
O objetivo do sistema é registrar uma partidade de xadrez, registrando dados como jogadores, jogadas e partidas. O sistema utiliza o microframework web **Flask** Python.

## Comandos Flask:
- ``` python -m venv .venv ``` --> Criação do ambiente virtual Python, onde o Flask vai ser instalado, para impedir conflitos com outro projetos Flask.
- ``` .venv\Scripts\activate ``` --> Ativação do ambiente vitual.
- ``` pip install Flask ``` --> Instalação do Flask.
- ``` pip show Flask ``` --> Exibição dos dados da versão do Flask, para ver se a instação foi bem sucedida.
- ``` python app.py ``` ou ``` flask run ``` --> Execução da aplicação Flask.
> ``` npm start run ``` --> Comando NPM do package.json, que faz o projeto exercutar.

## Arquivos do projeto:
- **Objetos:** Subpasta com os objetos da aplicação.
  - **objeto_partida:** Subpasta com o objeto Partida.
  - **objeto_jogador:** Subpasta com o objeto Jogador.
  - **objeto_jogada:** Subpasta com o objeto Jogada.

- **Funcoes:** Subpasta com as funções dos objetos.
  - **funcoes_partida:** Arquivo javascript com as funções CRUD relacionadas a partida.
  - **funcoes_jogador:** Arquivo javascript com as funções CRUD relacionadas a jogador.
  - **funcoes_jogada:** Arquivo javascript com as funções CRUD relacionadas a jogada.

- **Scripts:** Subpasta com os scripts das páginas HTML.
  - **script_cadastro:** Script responsavel pela validação e cadastro de jogadores.
  - **script_partida:** Script responsavel pela validação e cadastro das partidas de xadrez e jogadas.

- **templates**: subpasta com os templates HTML da aplicação.
- **static**: Subpasta com os arquivos JS, CSS e imagens.

- **.gitignore**: Arquivo responsavel pela ignoração de arquivos não desejados no commit do Git.
- **app.py:** Arquivo Pytho com as rotas e diretrizes principais da aplicação.
- **package.json** Arquivo JSON com as diretrizes do projeto e responsavel pela importação e exportação de modulos JS.
