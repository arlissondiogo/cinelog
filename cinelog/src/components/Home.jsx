import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Film, Search, User } from 'lucide-react';

function Home({ usuarioLogado, onSair }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado) navigate('/login');
  }, [usuarioLogado, navigate]);

  if (!usuarioLogado) return null;

  return (
    <div className="app-shell">
      <header className="topo">
        <div className="marca-topo">
          <Film size={26} color="#FF8D28" strokeWidth={2} />
          <span>CINELOG</span>
        </div>

        <label className="busca">
          <Search size={16} color="#FFFFFF" strokeWidth={2} />
          <input type="text" placeholder="Buscar por título ou gênero..." />
        </label>

        <button
          type="button"
          className="botao-usuario"
          onClick={onSair}
          title={`Sair (${usuarioLogado.nome})`}
        >
          <User size={26} color="#FF8D28" strokeWidth={2} />
        </button>
      </header>

      <div className="topo-divisor" />

      <div className="acoes-topo">
        <button type="button" className="botao botao--principal botao--compacto">
          Adicionar Filme
        </button>
      </div>

      <main className="vazio">
        <Film size={48} color="#E3A73E" strokeWidth={1.5} />
        <h2 className="vazio-titulo">Você ainda não adicionou nenhum filme</h2>
        <p className="vazio-texto">
          Comece registrando o último filme que você assistiu.
        </p>
        <button type="button" className="botao botao--principal">
          + Adicionar primeiro filme
        </button>
      </main>
    </div>
  );
}

export default Home;
