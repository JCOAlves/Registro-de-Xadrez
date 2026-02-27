import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import Notificacao from './Compornentes/Notificacao.jsx';
import BarraNavegacao from './Compornentes/BarraNavegacao.jsx';
import Inicial from "./Paginas/Inicial.jsx"
import Jogador from "./Paginas/Jogador.jsx"
import Partidas from "./Paginas/Partidas.jsx"
import Jogadas from "./Paginas/Jogadas.jsx"
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
      {exibiBarra ? (<BarraNavegacao setBarra={setBarra}>
        <a href="http://" className='nomeSessao'>Jogadores</a>
        <a href="http://" className='nomeSessao'>Partidas</a>
        <a href="http://" className='nomeSessao'>Jogadas</a>
        </BarraNavegacao>) : null}
      <Routes>
        <Route path='/' element={<Inicial />} />
        <Route path='/jogadores' element={<Jogador />} />
        <Route path='/jogadores/:id' element={<Jogador />} />
        <Route path='/jogadores/form' element={'Formulario de jogador'} />
        <Route path='/partidas' element={<Partidas />} />
        <Route path='/partidas/:id' element={<Partidas />} />
        <Route path='/partidas/form' element={'Formulario de partida'} />
        <Route path='/jogadas' element={<Jogadas />} />
        <Route path='/jogadas/:id' element={<Jogadas />} />
        <Route path='/partidas/:id/jogadas' element={'Jogadas de uma partida'} />
        <Route path='/partidas/:id/jogadas/:id' element={'Um jogada de uma partida'} />
        <Route path='/ERRO' element={<Erro>Página não encontrada</Erro>} />
        <Route path='*' element={<Navigate to={"/ERRO"} />} />
      </Routes>
    </>
  )
}

export default App
