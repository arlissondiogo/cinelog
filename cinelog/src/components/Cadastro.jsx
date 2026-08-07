import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { gerarToken } from "../data/usuarios";

function Cadastro({ usuarios, onCadastrar }) {
  const [etapa, setEtapa] = useState("form");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [token, setToken] = useState("");
  const [tokenConfirmado, setTokenConfirmado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!nome.trim() || !email.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (usuarios.some((u) => u.email === email)) {
      setErro("Este e-mail já está cadastrado.");
      return;
    }

    const novoToken = gerarToken();
    onCadastrar({ nome, email, token: novoToken });
    setToken(novoToken);
    setEtapa("token");
  }

  function handleCopiar() {
    navigator.clipboard.writeText(token);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function handleContinuar() {
    if (!tokenConfirmado) return;
    navigate("/login");
  }

  return (
    <div className={`card ${etapa === "token" ? "card--expandida" : ""}`}>
      <p className="marca">CINELOG</p>
      <h1 className="titulo">CRIAR CONTA</h1>
      <p className="subtitulo">
        Cadastre-se para começar a organizar seus filmes assistidos.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="rotulo" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          className="campo"
          placeholder="Como podemos te chamar?"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={etapa === "token"}
        />

        <label className="rotulo" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="campo"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={etapa === "token"}
        />

        {erro && <p className="erro">{erro}</p>}

        {etapa === "form" && (
          <button type="submit" className="botao botao--principal">
            Cadastrar
          </button>
        )}
      </form>

      {etapa === "token" && (
        <div className="secao-token">
          <p className="token-titulo">Seu token de acesso:</p>
          <p className="token-aviso">
            Guarde este token — ele é a única forma de acessar sua conta depois.
          </p>

          <div className="token-caixa">
            <span className="token-valor">{token}</span>
            <button
              type="button"
              className="botao-copiar"
              onClick={handleCopiar}
            >
              {copiado ? "COPIADO" : "COPIAR"}
            </button>
          </div>

          <label className="confirmacao">
            <input
              type="checkbox"
              checked={tokenConfirmado}
              onChange={(e) => setTokenConfirmado(e.target.checked)}
            />
            Copiei meu token e sei que não poderei vê-lo novamente
          </label>

          <button
            type="button"
            className="botao botao--principal"
            disabled={!tokenConfirmado}
            onClick={handleContinuar}
          >
            Continuar
          </button>
        </div>
      )}

      <p className="rodape">
        Já tem conta? <Link to="/login">Fazer login!</Link>
      </p>
    </div>
  );
}

export default Cadastro;
