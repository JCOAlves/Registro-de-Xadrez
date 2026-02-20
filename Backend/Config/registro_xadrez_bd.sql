-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20-Fev-2026 às 16:28
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `registro_xadrez_bd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogadas`
--

CREATE TABLE `jogadas` (
  `ID_jogada` int(11) NOT NULL,
  `timeJogada` enum('Branco','Preto') NOT NULL,
  `pecaJogada` enum('Peão','Cavalo','Torre','Bispo','Rainha','Rei') NOT NULL,
  `casaJogada` varchar(2) NOT NULL,
  `pecaEliminada` enum('Peão','Cavalo','Torre','Bispo','Rainha','Rei','Nenhuma') DEFAULT 'Nenhuma'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogadores`
--

CREATE TABLE `jogadores` (
  `ID_jogador` int(11) NOT NULL,
  `nomeJogador` varchar(100) NOT NULL,
  `nomeUsuario` varchar(14) NOT NULL,
  `dataNascimento` date NOT NULL,
  `generoJogador` enum('Masculino','Feminino','Não-binario','Não informado') DEFAULT 'Não informado',
  `numeroPartidas` int(11) DEFAULT 0,
  `numeroVitorias` int(11) DEFAULT 0,
  `numeroDerrotas` int(11) DEFAULT 0,
  `numeroEmpates` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `partidas`
--

CREATE TABLE `partidas` (
  `ID_partida` int(11) NOT NULL,
  `dataPartida` date DEFAULT curdate(),
  `horaInicio` time DEFAULT curtime(),
  `horaFinal` time NOT NULL,
  `pecasBrancas` int(11) NOT NULL,
  `pecasPretas` int(11) NOT NULL,
  `vencedor` enum('Peças Brancas','Peças Pretas','Empate','Sem vencedores') DEFAULT 'Sem vencedores'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `partida_jogada`
--

CREATE TABLE `partida_jogada` (
  `ID_relaciomento` int(11) NOT NULL,
  `Partida` int(11) NOT NULL,
  `Jogada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `jogadas`
--
ALTER TABLE `jogadas`
  ADD PRIMARY KEY (`ID_jogada`);

--
-- Índices para tabela `jogadores`
--
ALTER TABLE `jogadores`
  ADD PRIMARY KEY (`ID_jogador`),
  ADD UNIQUE KEY `nomeUsuario` (`nomeUsuario`);

--
-- Índices para tabela `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`ID_partida`),
  ADD KEY `pecasBrancas` (`pecasBrancas`),
  ADD KEY `pecasPretas` (`pecasPretas`);

--
-- Índices para tabela `partida_jogada`
--
ALTER TABLE `partida_jogada`
  ADD PRIMARY KEY (`ID_relaciomento`),
  ADD KEY `Partida` (`Partida`),
  ADD KEY `Jogada` (`Jogada`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `jogadas`
--
ALTER TABLE `jogadas`
  MODIFY `ID_jogada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `jogadores`
--
ALTER TABLE `jogadores`
  MODIFY `ID_jogador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `partidas`
--
ALTER TABLE `partidas`
  MODIFY `ID_partida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `partida_jogada`
--
ALTER TABLE `partida_jogada`
  MODIFY `ID_relaciomento` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `partidas`
--
ALTER TABLE `partidas`
  ADD CONSTRAINT `partidas_ibfk_1` FOREIGN KEY (`pecasBrancas`) REFERENCES `jogadores` (`ID_jogador`),
  ADD CONSTRAINT `partidas_ibfk_2` FOREIGN KEY (`pecasPretas`) REFERENCES `jogadores` (`ID_jogador`);

--
-- Limitadores para a tabela `partida_jogada`
--
ALTER TABLE `partida_jogada`
  ADD CONSTRAINT `partida_jogada_ibfk_1` FOREIGN KEY (`Partida`) REFERENCES `partidas` (`ID_partida`),
  ADD CONSTRAINT `partida_jogada_ibfk_2` FOREIGN KEY (`Jogada`) REFERENCES `jogadas` (`ID_jogada`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
