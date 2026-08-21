import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Home from './components/Home';
import { usuariosIniciais } from './data/usuarios';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  function cadastrar(novo) {
    const proximoId = Math.max(0, ...usuarios.map((u) => u.id)) + 1;
    setUsuarios([...usuarios, { id: proximoId, ...novo }]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route
          path="/cadastro"
          element={
            <div className="pagina">
              <Cadastro usuarios={usuarios} onCadastrar={cadastrar} />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="pagina">
              <Login usuarios={usuarios} onLogin={setUsuarioLogado} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
