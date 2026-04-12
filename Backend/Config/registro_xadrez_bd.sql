-- Criação do banco de dados
CREATE DATABASE registro_xadrez_bd;

USE registro_xadrez_bd;

-- Criação das tabelas no banco
CREATE TABLE Usuario(
    ID_usuario int PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario varchar(100) NOT NULL,
    emailUsuario varchar(50) NOT NULL,
    senhaUsuario text NOT NULL,
    tipoUsuario ENUM('Jogador', 'Administrador') NOT NULL
);

CREATE TABLE Jogador(
	ID_jogador int PRIMARY KEY AUTO_INCREMENT,
    nicknameJogador varchar(20) UNIQUE,
    pontuacaoJogador int DEFAULT 0,
    Usuario int NOT NULL,
    FOREIGN KEY (Usuario) REFERENCES Usuario(ID_usuario)
);

CREATE TABLE Evento(
	ID_evento int PRIMARY KEY AUTO_INCREMENT,
    nomeEvento varchar(120) NOT NULL UNIQUE,
    descricaoEvento text NOT NULL,
    localEvento varchar(120) NOT NULL,
    dataInicio date NOT NULL,
    dataFim date NOT NULL,
    horaInicio time NOT NULL,
    horaFim time NOT NULL,
    data_inicioInscricao datetime NOT NULL, 
    data_fimInscricao datetime NOT NULL
);

CREATE TABLE Partida(
	ID_partida int PRIMARY KEY AUTO_INCREMENT,
    dataPartida date DEFAULT (CURRENT_DATE),
    horaInicio time DEFAULT (CURRENT_TIME),
    horaFim time DEFAULT (CURRENT_TIME),
    timeBranco int NOT NULL,
    FOREIGN KEY (timeBranco) REFERENCES Jogador(ID_jogador),
    timePreto int NOT NULL,
    FOREIGN KEY (timePreto) REFERENCES Jogador(ID_jogador),
    vencedor ENUM('timePreto', 'timeBranco', 'Empate', 'Não definido') DEFAULT 'Não definido',
    Evento int NOT NULL,
    FOREIGN KEY (Evento) REFERENCES Evento(ID_evento)
);

CREATE TABLE Jogada(
	ID_jogada int PRIMARY KEY AUTO_INCREMENT,
    pecaJogada ENUM('Peão', 'Cavalo', 'Bispo', 'Torre', 'Rei', 'Rainha') NOT NULL,
    casaJogada varchar(2) NOT NULL,
    pecaEliminada ENUM('Peão', 'Cavalo', 'Bispo', 'Torre', 'Rei', 'Rainha', 'Nenhuma') DEFAULT 'Nenhuma',
    horaJogada time DEFAULT (CURRENT_TIME),
    Partida int NOT NULL,
    FOREIGN KEY (Partida) REFERENCES Partida(ID_partida)
);

CREATE TABLE Jogadores_Evento(
	ID_relacionamento INT PRIMARY KEY AUTO_INCREMENT,
    Jogador int NOT NULL,
    FOREIGN KEY (Jogador) REFERENCES Jogador(ID_jogador),
    Evento int NOT NULL,
    FOREIGN KEY (Evento) REFERENCES Evento(ID_evento),
    dataInscricao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEvento int DEFAULT 0
);

CREATE TABLE Equipe(
	ID_equipe int PRIMARY KEY AUTO_INCREMENT,
    nomeEquipe varchar(120) UNIQUE,
    dataCriacao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEquipe int DEFAULT 0
);

CREATE TABLE Equipe_jogador(
	ID_relacionamento int PRIMARY KEY AUTO_INCREMENT,
    Equipe int NOT NULL,
    FOREIGN KEY (Equipe) REFERENCES Equipe(ID_equipe),
    Jogador int NOT NULL,
    FOREIGN KEY (Jogador) REFERENCES Jogador(ID_jogador)
);

CREATE TABLE Equipes_Evento(
	ID_relacionamento int PRIMARY KEY AUTO_INCREMENT,
    Equipe int NOT NULL,
    FOREIGN KEY (Equipe) REFERENCES Equipe(ID_equipe),
    Jogador int NOT NULL,
    FOREIGN KEY (Jogador) REFERENCES Jogador(ID_jogador),
    dataInscricao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEvento int DEFAULT 0
);