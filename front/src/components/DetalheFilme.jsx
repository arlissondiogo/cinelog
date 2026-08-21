import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { buscarFilme, atualizarFilme, removerFilme } from '../services/api';
import { urlValida } from '../services/validacao';
import PosterFilme from './PosterFilme';

function DetalheFilme({ usuarioLogado }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [nota, setNota] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataAssistida, setDataAssistida] = useState('');

  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [removendo, setRemovendo] = useState(false);

  useEffect(() => {
    if (!usuarioLogado) {
      navigate('/login');
      return;
    }
    setCarregando(true);
    setErro('');
    buscarFilme(id, usuarioLogado.token)
      .then((f) => {
        setFilme(f);
        setTitulo(f.titulo || '');
        setAno(f.ano ?? '');
        setGenero(f.genero || '');
        setNota(f.nota ?? '');
        setPosterUrl(f.posterUrl || '');
        setObservacoes(f.observacoes || '');
        setDataAssistida(f.dataAssistida || '');
      })
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [id, usuarioLogado, navigate]);

  async function handleSalvar() {
    setErro('');

    if (!urlValida(posterUrl)) {
      setErro('Informe uma URL válida para o pôster (começando com http:// ou https://).');
      return;
    }

    setSalvando(true);
    try {
      await atualizarFilme(id, usuarioLogado.token, {
        titulo,
        ano: ano ? Number(ano) : null,
        genero,
        nota: nota !== '' ? Number(nota) : null,
        observacoes,
        posterUrl,
        dataAssistida,
      });
      navigate('/home');
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleRemover() {
    setRemovendo(true);
    try {
      await removerFilme(id, usuarioLogado.token);
      navigate('/home');
    } catch (err) {
      setErro(err.message);
      setRemovendo(false);
      setModalAberto(false);
    }
  }

  if (!usuarioLogado) return null;
  if (carregando) return <p className="estado-carregamento">Carregando filme...</p>;
  if (erro && !filme) return <p className="estado-erro">{erro}</p>;
  if (!filme) return null;

  return (
    <div className="pagina-formulario">
      <Link to="/home" className="link-voltar">
        <ArrowLeft size={18} color="#FF8D28" strokeWidth={2} />
        Voltar
      </Link>

      <div className="pagina-detalhe" style={{ padding: 0 }}>
        <div>
          <PosterFilme url={posterUrl} className="detalhe-poster" iconSize={64} />
          <div className="form-grupo" style={{ marginTop: 16 }}>
            <label className="form-rotulo" htmlFor="posterUrl" style={{ fontSize: 12 }}>
              URL do pôster
            </label>
            <input
              id="posterUrl"
              className="form-campo"
              placeholder="https://..."
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />
          </div>
        </div>

        <div>
          <input
            className="detalhe-genero form-campo"
            style={{ border: 'none', padding: 0, background: 'transparent', marginBottom: 8, width: 'auto' }}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Gênero"
          />
          <input
            className="detalhe-titulo form-campo"
            style={{ border: 'none', padding: 0, background: 'transparent', fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, width: '100%' }}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
          />
          <div className="detalhe-meta-linha">
            <input
              className="detalhe-meta-campo"
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              placeholder="Ano"
            />
            <Star size={14} color="#E3A73E" fill="#E3A73E" strokeWidth={0} />
            <input
              className="detalhe-meta-campo detalhe-meta-campo--nota"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Nota"
            />
            <span className="detalhe-meta-rotulo">Assistido em</span>
            <input
              className="detalhe-meta-campo detalhe-meta-campo--data"
              type="date"
              value={dataAssistida}
              onChange={(e) => setDataAssistida(e.target.value)}
            />
          </div>

          <div className="detalhe-caixa">
            <textarea
              className="detalhe-textarea"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações sobre o filme..."
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <div className="detalhe-acoes">
            <button
              type="button"
              className="botao botao--principal"
              onClick={handleSalvar}
              disabled={salvando}
            >
              {salvando ? 'Salvando' : 'Salvar'}
            </button>
            <button
              type="button"
              className="botao botao--perigo"
              onClick={() => setModalAberto(true)}
              disabled={salvando}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-fundo">
          <div className="modal-caixa">
            <p className="modal-titulo">Remover "{filme.titulo}"?</p>
            <p className="modal-texto">
              Essa ação não pode ser desfeita. O filme será removido permanentemente do seu histórico.
            </p>
            <div className="modal-acoes">
              <button
                type="button"
                className="botao botao--principal"
                onClick={() => setModalAberto(false)}
                disabled={removendo}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="botao botao--perigo"
                onClick={handleRemover}
                disabled={removendo}
              >
                {removendo ? 'Removendo' : 'Remover'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalheFilme;
