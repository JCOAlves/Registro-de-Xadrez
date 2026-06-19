import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import RequisicaoHTTP from "./Hook/RequisicaoHTTP.js";
import './style/App.css';

// Compornentes da aplicação
import Notificacao from './Compornentes/Notificacao.jsx';
import ValidacaoAcesso from './Compornentes/ValidacaoAcesso.jsx';
import BarraLateral from './Compornentes/BarraLateral.jsx';
import Sobriposicao from './Compornentes/Sobriposicao.jsx';

// Páginas da aplicação
import Login from './Paginas/Login.jsx';
import CadastroUsuario from './Paginas/CadastroUsuario.jsx';
import Inicial from "./Paginas/Inicial.jsx";
import Mural from "./Paginas/Mural.jsx";
import Perfil from "./Paginas/Perfil.jsx";
import Evento from './Paginas/Evento.jsx';
import Equipe from "./Paginas/Equipe.jsx";
import { Partidas, Partida } from "./Paginas/Partidas.jsx"
import Jogada from "./Paginas/Jogadas.jsx"
import RegistraPartida from './Paginas/RegistraPartidas.jsx';
import RegistraEvento from './Paginas/RegistraEventos.jsx';
import RegistraEquipe from "./Paginas/RegistraEquipe.jsx";
import Erro from "./Paginas/Erro.jsx";


function App() {
  const [mensagem, setMensagem] = useState("");
  const [exibiBarra, setExibi] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Gerencia notificação
  useEffect(() => {
    if(mensagem) setTimeout(() => { setMensagem("") }, 3000);
  }, [mensagem]);

  
  // Restrigir as páginas
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
      
      } finally{
        setCarregando(false);
      }
    }

    ConfirmLogin();
    
  }, []);

  if(carregando) return; // <-- Adicionar uma imagem ou icone de carregando

  return (<>
      {mensagem ? <Notificacao>{mensagem}</Notificacao> : null}
      {location.pathname != "/" && location.pathname != "/login" && location.pathname != "/logout" ? <BarraLateral tipoUsuario={usuario?.tipoUsuario}/> : null}
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/login' element={<Login setMensagem={setMensagem} setLogado={setLogado} setUsuario={setUsuario}/>} />
        <Route path='/cadastroUsuario' element={<CadastroUsuario setMensagem={setMensagem} setLogado={setLogado}/>}/>
        <Route path='/perfil' element={!usuario ? <Navigate to={"/login"}/> : <Perfil setMensagem={setMensagem} ID_usuario={usuario?.ID_usuario}/>}/>
        <Route path='/usuarios/:id' element={!usuario ? <Navigate to={"/login"}/> : <Perfil setMensagem={setMensagem}/>} />
        <Route path='/mural' element={<Mural setMensagem={setMensagem}/>} />
        <Route path='/jogadores' element={<Navigate to={"/mural?tipoDados=Jogadores"}/>}/>
        <Route path='/equipes' element={<Navigate to={"/mural?tipoDados=Equipes"}/>}/>
        <Route path='/equipes/:id' element={<Equipe setMensagem={setMensagem}/>}/>
        <Route path='/novaEquipe' element={<RegistraEquipe setMensagem={setMensagem} ID_jogador={usuario?.ID_jogador}/>}/>
        <Route path='/eventos' element={<Navigate to={"/mural?tipoDados=Eventos"}/>}/>
        <Route path='/eventos/:id' element={<Evento setMensagem={setMensagem}/>}/>
        <Route path='/novoEvento' element={<RegistraEvento setMensagem={setMensagem}/>}/>
        <Route path='/partidas' element={<Partidas setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id' element={<Partida  setMensagem={setMensagem}/>} />
        <Route path='/novaPartida' element={<RegistraPartida setMensagem={setMensagem}/>} />
        <Route path='/ERRO' element={<Erro>Página não encontrada ou não existente</Erro>} />
        <Route path='/NEGADO' element={<Erro>Você não possui permissão para acessar essa página</Erro>} />
        <Route path='*' element={<Navigate to={"/ERRO"} />} />
      </Routes>
      <footer className={`${location.pathname != "/" && location.pathname != "/login" && location.pathname != "/logout" ? "sm:ml-[60px]" : ""} border-[1px_0px] p-5`}><em>Roda pé</em></footer>
    </>);
};

export default App
