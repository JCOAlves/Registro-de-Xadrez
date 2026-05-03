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
    ID_usuario int NOT NULL,
    FOREIGN KEY (ID_usuario) REFERENCES Usuario(ID_usuario)
);

CREATE TABLE Evento(
	ID_evento int PRIMARY KEY AUTO_INCREMENT,
    nomeEvento varchar(120) NOT NULL UNIQUE,
    descricaoEvento text NOT NULL,
    localEvento varchar(120) NOT NULL,
    modalidadeEvento ENUM('Individual', 'Equipes', 'Individual e Equipes') NOT NULL,
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
    horaFim time NOT NULL,
    timeBranco int NOT NULL,
    FOREIGN KEY (timeBranco) REFERENCES Jogador(ID_jogador),
    timePreto int NOT NULL,
    FOREIGN KEY (timePreto) REFERENCES Jogador(ID_jogador),
    vencedor ENUM('timePreto', 'timeBranco', 'Empate', 'Não definido') DEFAULT 'Não definido',
    ID_evento int NOT NULL,
    FOREIGN KEY (ID_evento) REFERENCES Evento(ID_evento)
);

CREATE TABLE Jogada(
	ID_jogada int PRIMARY KEY AUTO_INCREMENT,
    timeJogada ENUM('Time Branco', 'Time Preto') NOT NULL,
    pecaJogada ENUM('Peão', 'Cavalo', 'Bispo', 'Torre', 'Rei', 'Rainha') NOT NULL,
    casaJogada varchar(2) NOT NULL,
    pecaEliminada ENUM('Peão', 'Cavalo', 'Bispo', 'Torre', 'Rei', 'Rainha', 'Nenhuma') DEFAULT 'Nenhuma',
    horaJogada time DEFAULT (CURRENT_TIME),
    ID_partida int NOT NULL,
    FOREIGN KEY (ID_partida) REFERENCES Partida(ID_partida)
);

CREATE TABLE Jogadores_Evento(
	ID_relacionamento INT PRIMARY KEY AUTO_INCREMENT,
    ID_jogador int NOT NULL,
    FOREIGN KEY (ID_jogador) REFERENCES Jogador(ID_jogador),
    ID_evento int NOT NULL,
    FOREIGN KEY (ID_evento) REFERENCES Evento(ID_evento),
    dataInscricao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEvento int DEFAULT 0
);

CREATE TABLE Equipe(
	ID_equipe int PRIMARY KEY AUTO_INCREMENT,
    nomeEquipe varchar(120) UNIQUE,
    dataCriacao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEquipe int DEFAULT 0,
    LiderEquipe int NOT NULL,
    FOREIGN KEY (LiderEquipe) REFERENCES Jogador(ID_jogador)
);

CREATE TABLE Equipe_jogador(
	ID_relacionamento int PRIMARY KEY AUTO_INCREMENT,
    ID_equipe int NOT NULL,
    FOREIGN KEY (ID_equipe) REFERENCES Equipe(ID_equipe),
    ID_jogador int NOT NULL,
    FOREIGN KEY (ID_jogador) REFERENCES Jogador(ID_jogador)
);

CREATE TABLE Equipes_Evento(
	ID_relacionamento int PRIMARY KEY AUTO_INCREMENT,
    ID_equipe int NOT NULL,
    FOREIGN KEY (ID_equipe) REFERENCES Equipe(ID_equipe),
    ID_jogador int NOT NULL,
    FOREIGN KEY (ID_jogador) REFERENCES Jogador(ID_jogador),
    dataInscricao datetime DEFAULT CURRENT_TIMESTAMP,
    pontuacaoEvento int DEFAULT 0
);