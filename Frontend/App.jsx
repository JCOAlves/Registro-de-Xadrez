import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import RequisicaoHTTP from "./Hook/RequisicaoHTTP.js";
import './style/App.css';

// Compornentes da aplicação
import Notificacao from './Compornentes/Notificacao.jsx';
import BarraNavegacao from './Compornentes/BarraNavegacao.jsx';
import Sobriposicao from './Compornentes/Sobriposicao.jsx';
import Footer from './Compornentes/Footer.jsx';
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
  const [mensagem, setMensagem] = useState(null);
  const [exibiBarra, setBarra] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => { setMensagem(null) }, 3000);
  }, [mensagem]);

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
          setUsuario({});
          setLogado(false);
        }
        
      } catch (error) {
        setMensagem("Erro na verificação de logado de usuário no sistema");
        console.error("Erro na verificação de logado de usuário no sistema: ", error.message || error);
      }
    }

    ConfirmLogin();

  }, []);

  return (<>
      {usuario ? usuario.nomeUsuario : null}
      {mensagem ? <Notificacao>{mensagem}</Notificacao> : null}
      {exibiBarra ? <BarraNavegacao/> : null}
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/login' element={<Login setMensagem={setMensagem} setLogado={setLogado}/>} />
        <Route path='/cadastroUsuario' element={<CadastroUsuario/>}/>
        <Route path='/usuarios/:id' element={<Perfil setMensagem={setMensagem}/>} />
        <Route path='/jogadores' element={<Jogadores setMensagem={setMensagem}/>} />
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
      <Footer/>
    </>);
};

export default App
