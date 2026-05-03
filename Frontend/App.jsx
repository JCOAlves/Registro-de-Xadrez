import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Notificacao from './Compornentes/Notificacao.jsx';
import BarraNavegacao from './Compornentes/BarraNavegacao.jsx';
import Footer from './Compornentes/Footer.jsx';
import Login from './Paginas/Login.jsx';
import Inicial from "./Paginas/Inicial.jsx";
import { Jogadores, Jogador } from "./Paginas/Jogadores.jsx"
import { Partidas, Partida } from "./Paginas/Partidas.jsx"
import Jogada from "./Paginas/Jogadas.jsx"
import RegistraPartida from './Paginas/RegistraPartidas.jsx';
import FormJogador from './Compornentes/FormJogador.jsx';
import Erro from "./Paginas/Erro.jsx"
import RequisicaoHTTP from "./Hook/RequisicaoHTTP.js";
import './style/App.css'

function App() {
  const [mensagem, setMensagem] = useState(null);
  const [exibiBarra, setBarra] = useState(true);
  const [usuario, setUsuario] = useState({});
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => { setMensagem(null) }, 3000);
  }, [mensagem]);

  // Requisição não altorizada: Token ausente ou expirado
  useEffect(() => {
    async function ConfirmLogin() {
      try {
        const Requisicao = new RequisicaoHTTP("/confirmLogin", { verificacaoLogado: true });
        const Resposta = await Requisicao.POST();
        const { sucesso, mensagem, erro } = Resposta;
        const ID_usuario = sessionStorage.getItem("ID_usuario");
        if(sucesso && ID_usuario){
          const Token = sessionStorage.getItem('JWT');
          const Base64 = Token.split('.')[1];
          const Decodificado = JSON.parse(atob(Base64));
          setUsuario(Decodificado);
          setMensagem(mensagem);
          setLogado(true);

        } else{
          setUsuario({});
          setMensagem(mensagem);
          setLogado(false);
          navigate("/login");
        }
        
      } catch (error) {
        setMensagem("Erro na verificação de logado de usuário no sistema");
        console.error("Erro na verificação de logado de usuário no sistema: ", error.message || error);
      }
    }

    ConfirmLogin();

  }, [logado]);

  return (
    <>
      {mensagem ? <Notificacao>{mensagem}</Notificacao> : null}
      {exibiBarra ? <BarraNavegacao/> : null}
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/login' element={<Login setMensagem={setMensagem} setLogado={setLogado}/>} />
        <Route path='/jogadores' element={<Jogadores setMensagem={setMensagem}/>} />
        <Route path='/jogadores/:id' element={<Jogador setMensagem={setMensagem}/>} />
        <Route path='/jogadores/form' element={<main><FormJogador setMensagem={setMensagem}/></main>} />
        <Route path='/partidas' element={<Partidas setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id' element={<Partida  setMensagem={setMensagem}/>} />
        <Route path='/partidas/registrar' element={<RegistraPartida setMensagem={setMensagem}/>} />
        <Route path='/jogadas/:id' element={<Jogada setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id/jogadas' element={'Jogadas de uma partida'} />
        <Route path='/partidas/:id/jogadas/:id' element={'Um jogada de uma partida'} />
        <Route path='/ERRO' element={<Erro>Página não encontrada</Erro>} />
        <Route path='/NEGADO' element={<Erro>Você não possui permissão para acessar essa página</Erro>} />
        <Route path='*' element={<Navigate to={"/ERRO"} />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
