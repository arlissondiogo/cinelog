import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { criarFilme } from '../services/api';
import { urlValida } from '../services/validacao';
import PosterFilme from './PosterFilme';

function AdicionarFilme({ usuarioLogado }) {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [dataAssistida, setDataAssistida] = useState('');
  const [nota, setNota] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!titulo.trim()) {
      setErro('Informe o título do filme.');
      return;
    }
    if (!urlValida(posterUrl)) {
      setErro('Informe uma URL válida para o pôster (começando com http:// ou https://).');
      return;
    }

    setCarregando(true);
    try {
      await criarFilme(usuarioLogado.token, {
        titulo,
        ano: ano ? Number(ano) : null,
        genero,
        dataAssistida,
        nota: nota !== '' ? Number(nota) : null,
        posterUrl,
        observacoes,
      });
      navigate('/home');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-formulario">
      <Link to="/home" className="link-voltar">
        <ArrowLeft size={18} color="#FF8D28" strokeWidth={2} />
        Voltar para a lista
      </Link>

      <h1 className="form-titulo">ADICIONAR FILME</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-grade">
          <div className="form-grupo form-grupo--completo">
            <label className="form-rotulo" htmlFor="titulo">Título</label>
            <input
              id="titulo"
              className="form-campo"
              placeholder="Ex: Superman"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="form-grupo">
            <label className="form-rotulo" htmlFor="ano">Ano de lançamento</label>
            <input
              id="ano"
              className="form-campo"
              placeholder="2025"
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="form-grupo">
            <label className="form-rotulo" htmlFor="genero">Gênero</label>
            <input
              id="genero"
              className="form-campo"
              placeholder="Ação"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="form-grupo">
            <label className="form-rotulo" htmlFor="nota">Nota (0–10)</label>
            <input
              id="nota"
              className="form-campo"
              placeholder="10"
              type="number"
              min="0"
              max="10"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="form-grupo">
            <label className="form-rotulo" htmlFor="dataAssistida">Data assistida</label>
            <input
              id="dataAssistida"
              className="form-campo"
              type="date"
              value={dataAssistida}
              onChange={(e) => setDataAssistida(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="form-grupo form-grupo--completo">
            <label className="form-rotulo" htmlFor="posterUrl">URL do pôster</label>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <input
                id="posterUrl"
                className="form-campo"
                style={{ flex: 1 }}
                placeholder="https://..."
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                disabled={carregando}
              />
              {posterUrl.trim() && urlValida(posterUrl) && (
                <PosterFilme
                  url={posterUrl}
                  className="filme-poster"
                  iconSize={28}
                  style={{ width: 60 }}
                />
              )}
            </div>
          </div>

          <div className="form-grupo form-grupo--completo">
            <label className="form-rotulo" htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              className="form-campo"
              placeholder="O que você achou do filme?"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              disabled={carregando}
            />
          </div>
        </div>

        {erro && <p className="erro">{erro}</p>}

        <div className="form-acoes">
          <button
            type="button"
            className="botao botao--cancelar"
            onClick={() => navigate('/home')}
            disabled={carregando}
          >
            Cancelar
          </button>
          <button type="submit" className="botao botao--principal" disabled={carregando}>
            {carregando ? 'Salvando' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdicionarFilme;
