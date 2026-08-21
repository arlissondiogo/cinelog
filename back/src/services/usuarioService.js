import { usuarioModel } from "../models/usuario.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const usuarioService = {
  listarTodos() {
    return usuarioModel.listarTodos();
  },

  buscarPorId(id) {
    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }
    return usuario;
  },

  criar({ nome, email }) {
    if (!nome || !nome.trim()) {
      const err = new Error('Campo "nome" é obrigatório');
      err.status = 400;
      throw err;
    }
    if (nome.trim().length < 2) {
      const err = new Error("O nome deve ter pelo menos 2 caracteres");
      err.status = 400;
      throw err;
    }
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      const err = new Error("Informe um e-mail válido");
      err.status = 400;
      throw err;
    }
    if (usuarioModel.buscarPorEmail(email.trim())) {
      const err = new Error("Este e-mail já está cadastrado");
      err.status = 409;
      throw err;
    }

    return usuarioModel.inserir({ nome: nome.trim(), email: email.trim() });
  },

  login({ token }) {
    if (!token || !token.trim()) {
      const err = new Error("Informe seu token de acesso");
      err.status = 400;
      throw err;
    }

    const usuario = usuarioModel.buscarPorToken(token.trim());
    if (!usuario) {
      const err = new Error("Token inválido");
      err.status = 401;
      throw err;
    }

    return usuario;
  },

  autenticarPorToken(token) {
    if (!token) {
      const err = new Error("Token é obrigatório");
      err.status = 400;
      throw err;
    }
    const usuario = usuarioModel.buscarPorToken(token);
    if (!usuario) {
      const err = new Error("Token inválido");
      err.status = 401;
      throw err;
    }
    return usuario;
  },
};
