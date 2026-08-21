import { useState } from "react";
import { useNavigate, Link } from "react-router";

function Login({ usuarios, onLogin }) {
  const [token, setToken] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!token.trim()) {
      setErro("Informe seu token de acesso.");
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      const usuario = usuarios.find((u) => u.token === token.trim());
      if (!usuario) {
        setErro("Token inválido.");
        setCarregando(false);
        return;
      }
      onLogin(usuario);
      navigate("/home");
    }, 800);
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
