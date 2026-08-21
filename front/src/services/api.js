const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function tratarResposta(resp) {
  if (resp.status === 204) return null;
  const corpo = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(corpo.erro || 'Ocorreu um erro. Tente novamente.');
  }
  return corpo;
}

export async function cadastrarUsuario({ nome, email }) {
  const resp = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email }),
  });
  return tratarResposta(resp);
}

export async function fazerLogin(token) {
  const resp = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return tratarResposta(resp);
}

export async function listarFilmes(token) {
  const resp = await fetch(`${API_URL}/filmes?token=${encodeURIComponent(token)}`);
  return tratarResposta(resp);
}

export async function buscarFilme(id, token) {
  const resp = await fetch(`${API_URL}/filmes/${id}?token=${encodeURIComponent(token)}`);
  return tratarResposta(resp);
}

export async function criarFilme(token, dados) {
  const resp = await fetch(`${API_URL}/filmes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, ...dados }),
  });
  return tratarResposta(resp);
}

export async function atualizarFilme(id, token, dados) {
  const resp = await fetch(`${API_URL}/filmes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, ...dados }),
  });
  return tratarResposta(resp);
}

export async function removerFilme(id, token) {
  const resp = await fetch(`${API_URL}/filmes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return tratarResposta(resp);
}
