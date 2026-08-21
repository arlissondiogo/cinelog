import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Home from './components/Home';
import AdicionarFilme from './components/AdicionarFilme';
import DetalheFilme from './components/DetalheFilme';
import './App.css';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route
          path="/cadastro"
          element={
            <div className="pagina">
              <Cadastro />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="pagina">
              <Login onLogin={setUsuarioLogado} />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <Home
              usuarioLogado={usuarioLogado}
              onSair={() => setUsuarioLogado(null)}
            />
          }
        />
        <Route
          path="/adicionar"
          element={<AdicionarFilme usuarioLogado={usuarioLogado} />}
        />
        <Route
          path="/filme/:id"
          element={<DetalheFilme usuarioLogado={usuarioLogado} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
