import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import Notificacao from './Compornentes/Notificacao.jsx';
import BarraNavegacao from './Compornentes/BarraNavegacao.jsx';
import Footer from './Compornentes/Footer.jsx';
import Inicial from "./Paginas/Inicial.jsx"
import { Jogadores, Jogador } from "./Paginas/Jogadores.jsx"
import { Partidas, Partida } from "./Paginas/Partidas.jsx"
import Jogada from "./Paginas/Jogadas.jsx"
import RegistraPartida from './Paginas/RegistraPartidas.jsx';
import FormJogador from './Compornentes/FormJogador.jsx';
import Erro from "./Paginas/Erro.jsx"
import './style/App.css'

function App() {
  const [mensagem, setMensagem] = useState(null);
  const [exibiBarra, setBarra] = useState(true);

  useEffect(() => {
    setTimeout(() => { setMensagem(null) }, 3000);
  }, [mensagem]);

  return (
    <>
      {mensagem ? <Notificacao>{mensagem}</Notificacao> : null}
      {exibiBarra ? (<BarraNavegacao setBarra={setBarra}></BarraNavegacao>) : null}
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/jogadores' element={<Jogadores setMensagem={setMensagem}/>} />
        <Route path='/jogadores/:id' element={<Jogador setMensagem={setMensagem}/>} />
        <Route path='/jogadores/form' element={<FormJogador setMensagem={setMensagem}/>} />
        <Route path='/partidas' element={<Partidas setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id' element={<Partida  setMensagem={setMensagem}/>} />
        <Route path='/partidas/registrar' element={<RegistraPartida setMensagem={setMensagem}/>} />
        <Route path='/jogadas/:id' element={<Jogada setMensagem={setMensagem}/>} />
        <Route path='/partidas/:id/jogadas' element={'Jogadas de uma partida'} />
        <Route path='/partidas/:id/jogadas/:id' element={'Um jogada de uma partida'} />
        <Route path='/ERRO' element={<Erro>Página não encontrada</Erro>} />
        <Route path='*' element={<Navigate to={"/ERRO"} />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
