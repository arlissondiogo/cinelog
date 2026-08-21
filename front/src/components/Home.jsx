import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Film, Search, User } from 'lucide-react';
import { listarFilmes } from '../services/api';
import PosterFilme from './PosterFilme';

function Home({ usuarioLogado, onSair }) {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado) {
      navigate('/login');
      return;
    }

    setCarregando(true);
    setErro('');
    listarFilmes(usuarioLogado.token)
      .then(setFilmes)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [usuarioLogado, navigate]);

  if (!usuarioLogado) return null;

  const filmesFiltrados = filmes.filter((f) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return (
      f.titulo?.toLowerCase().includes(termo) ||
      f.genero?.toLowerCase().includes(termo)
    );
  });

  function formatarData(data) {
    if (!data) return null;
    const [ano, mes, dia] = data.split('-');
    if (!ano || !mes || !dia) return data;
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="app-shell">
      <header className="topo">
        <div className="marca-topo">
          <Film size={26} color="#FF8D28" strokeWidth={2} />
          <span>CINELOG</span>
        </div>

        <label className="busca">
          <Search size={16} color="#FFFFFF" strokeWidth={2} />
          <input
            type="text"
            placeholder="Buscar por título ou gênero..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
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
        <Link to="/adicionar" className="botao botao--principal botao--compacto">
          Adicionar Filme
        </Link>
      </div>

      {carregando && <p className="estado-carregamento">Carregando seus filmes...</p>}

      {!carregando && erro && <p className="estado-erro">{erro}</p>}

      {!carregando && !erro && filmes.length === 0 && (
        <main className="vazio">
          <Film size={48} color="#E3A73E" strokeWidth={1.5} />
          <h2 className="vazio-titulo">Você ainda não adicionou nenhum filme</h2>
          <p className="vazio-texto">
            Comece registrando o último filme que você assistiu.
          </p>
          <Link to="/adicionar" className="botao botao--principal">
            + Adicionar primeiro filme
          </Link>
        </main>
      )}

      {!carregando && !erro && filmes.length > 0 && (
        <main className="grade-filmes">
          {filmesFiltrados.map((filme) => (
            <div className="filme-item" key={filme.id}>
              <PosterFilme url={filme.posterUrl} className="filme-poster" />
              <p className="filme-titulo">{filme.titulo}</p>
              {filme.dataAssistida && (
                <p className="filme-meta">Assistido em: {formatarData(filme.dataAssistida)}</p>
              )}
              {filme.nota != null && <p className="filme-nota">★ {filme.nota}/10</p>}
              <Link to={`/filme/${filme.id}`} className="filme-detalhes-link">
                Detalhes
              </Link>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default Home;
