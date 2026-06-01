import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import RequisicaoHTTP from "./Hook/RequisicaoHTTP.js";
import './style/App.css';

// Compornentes da aplicação
import Notificacao from './Compornentes/Notificacao.jsx';
import ValidacaoAcesso from './Compornentes/ValidacaoAcesso.jsx';
import Sobriposicao from './Compornentes/Sobriposicao.jsx';
import FormJogador from './Compornentes/FormJogador.jsx';

// Páginas da aplicação
import Login from './Paginas/Login.jsx';
import CadastroUsuario from './Paginas/CadastroUsuario.jsx';
import Inicial from "./Paginas/Inicial.jsx";
import Jogadores from "./Paginas/Jogadores.jsx";
import Perfil from "./Paginas/Perfil.jsx";
import { Partidas, Partida } from "./Paginas/Partidas.jsx"
import Jogada from "./Paginas/Jogadas.jsx"
import RegistraPartida from './Paginas/RegistraPartidas.jsx';
import Erro from "./Paginas/Erro.jsx"


function App() {
  const [mensagem, setMensagem] = useState("");
  const [exibiBarra, setBarra] = useState(false);
  const [styleBarra, setStyleBarra] = useState({ display: "none", width: "0px" });
  const [usuario, setUsuario] = useState(null);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  // Gerencia notificação
  useEffect(() => {
    setTimeout(() => { setMensagem("") }, 3000);
  }, [mensagem]);

  // Gerencia barra lateral
  useEffect(() => {
    if(exibiBarra){
      setStyleBarra({ display: "flex", width: "100px" });
      return;

    } else{
      setStyleBarra({ display: "none", width: "0px" });
      return;
    }

  }, [exibiBarra]);

  useEffect(() => {
    async function ConfirmLogin() {
      try {
        const Requisicao = new RequisicaoHTTP("/confirmLogin", { verificacaoLogado: true });
        const Resposta = await Requisicao.POST();
        const { sucesso, mensagem, erro, dados } = Resposta;
        if(sucesso){
          setUsuario(dados);
          setLogado(true);

        } else{
          setUsuario(null);
          setLogado(false);
        }
        
      } catch (error) {
        setMensagem("Erro na verificação de logado de usuário no sistema");
        console.error("Erro na verificação de logado de usuário no sistema: ", error.message || error);
      }
    }

    ConfirmLogin();

  }, [logado]);

  return (<>
      {mensagem ? <Notificacao>{mensagem}</Notificacao> : null}
      <nav style={styleBarra}>
        <Link to={"/perfil"}>Perfil</Link>
        <Link to={"/jogadores"}>Jogadores</Link>
        <Link to={"/equipes"}>Equipes</Link>
        <Link to={"/eventos"}>Eventos</Link>
        <Link to={"/logout"}>Logout</Link>

        {usuario.tipoUsuario === "Administrador" ? <>
          <Link to={"/novaPartida"}>Cadastrar Partida</Link>
          <Link to={"/novoEvento"}>Cadastrar Evento</Link>
        </> : <>
          <Link to={"/novaEquipe"}>Cadastrar Equipe</Link>
        </>}
      </nav>
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/login' element={<Login setMensagem={setMensagem} setLogado={setLogado}/>} />
        <Route path='/cadastroUsuario' element={<CadastroUsuario setMensagem={setMensagem}/>}/>
        <Route path='/perfil' element={<ValidacaoAcesso logado={logado} usuario={usuario}><Perfil setMensagem={setMensagem} dadosUsuario={usuario}/></ValidacaoAcesso>}/>
        <Route path='/usuarios/:id' element={<Perfil setMensagem={setMensagem}/>} />
        <Route path='/jogadores' element={<ValidacaoAcesso logado={logado} usuario={usuario}><Jogadores setMensagem={setMensagem}/></ValidacaoAcesso>} />
        <Route path='/equipes' element={"Equipes"}/>
        <Route path='/equipes/:id' element={"Equipe por ID"}/>
        <Route path='/novaEquipe' element={"Nova equipe"}/>
        <Route path='/eventos' element={"Eventos"}/>
        <Route path='/eventos/:id' element={"Evento por ID"}/>
        <Route path='/novoEvento' element={"Novo evento"}/>
        <Route path='/partidas' element={<Partidas setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id' element={<Partida  setMensagem={setMensagem}/>} />
        <Route path='/novaPartida' element={<RegistraPartida setMensagem={setMensagem}/>} />
        <Route path='/ERRO' element={<Erro>Página não encontrada ou não existente</Erro>} />
        <Route path='/NEGADO' element={<Erro>Você não possui permissão para acessar essa página</Erro>} />
        <Route path='*' element={<Navigate to={"/ERRO"} />} />
      </Routes>
      <footer><em>Roda pé</em></footer>
    </>);
};

export default App
