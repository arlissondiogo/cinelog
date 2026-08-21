import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { fazerLogin } from "../services/api";

function Login({ onLogin }) {
  const [token, setToken] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!token.trim()) {
      setErro("Informe seu token de acesso.");
      return;
    }

    setCarregando(true);
    try {
      const usuario = await fazerLogin(token.trim());
      onLogin({ ...usuario, token: token.trim() });
      navigate("/home");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <p className="marca">CINELOG</p>
      <h1 className="titulo">ENTRAR</h1>
      <p className="subtitulo">Acesse com o token gerado no seu cadastro.</p>

      <form onSubmit={handleSubmit}>
        <label className="rotulo rotulo--negrito" htmlFor="token">
          Token de acesso
        </label>
        <input
          id="token"
          className="campo"
          placeholder="clg_xxxxxxxxxxxxx"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={carregando}
        />

        {erro && <p className="erro">{erro}</p>}

        <button
          type="submit"
          className="botao botao--principal"
          disabled={carregando}
        >
          {carregando ? "Entrando" : "Entrar"}
        </button>
      </form>

      <p className="rodape">
        Não tem conta? <Link to="/cadastro">Cadastre-se!</Link>
      </p>
    </div>
  );
}

export default Login;
