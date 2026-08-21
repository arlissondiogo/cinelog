import { filmeModel } from "../models/filme.js";
import { usuarioService } from "./usuarioService.js";

export const filmeService = {
  listarPorToken(token) {
    const usuario = usuarioService.autenticarPorToken(token);
    return filmeModel.listarPorUsuario(usuario.id);
  },

  buscarPorId(id, token) {
    const usuario = usuarioService.autenticarPorToken(token);
    const filme = filmeModel.buscarPorId(id);

    if (!filme) {
      const err = new Error("Filme não encontrado");
      err.status = 404;
      throw err;
    }
    if (filme.usuarioId !== usuario.id) {
      const err = new Error("Esse filme não pertence a este usuário");
      err.status = 403;
      throw err;
    }
    return filme;
  },

  criar({ token, titulo, genero, ano, dataAssistida, nota, posterUrl, observacoes }) {
    const usuario = usuarioService.autenticarPorToken(token);

    if (!titulo || !titulo.trim()) {
      const err = new Error('Campo "título" é obrigatório');
      err.status = 400;
      throw err;
    }
    if (nota !== undefined && nota !== null && nota !== "" && (nota < 0 || nota > 10)) {
      const err = new Error("A nota deve estar entre 0 e 10");
      err.status = 400;
      throw err;
    }

    return filmeModel.inserir({
      titulo: titulo.trim(),
      genero,
      ano,
      dataAssistida,
      nota,
      posterUrl,
      observacoes,
      usuarioId: usuario.id,
    });
  },

  atualizar(id, { token, titulo, genero, ano, dataAssistida, nota, posterUrl, observacoes }) {
    const usuario = usuarioService.autenticarPorToken(token);
    const filme = filmeModel.buscarPorId(id);

    if (!filme) {
      const err = new Error("Filme não encontrado");
      err.status = 404;
      throw err;
    }
    if (filme.usuarioId !== usuario.id) {
      const err = new Error("Esse filme não pertence a este usuário");
      err.status = 403;
      throw err;
    }
    if (!titulo || !titulo.trim()) {
      const err = new Error('Campo "título" é obrigatório');
      err.status = 400;
      throw err;
    }
    if (nota !== undefined && nota !== null && nota !== "" && (nota < 0 || nota > 10)) {
      const err = new Error("A nota deve estar entre 0 e 10");
      err.status = 400;
      throw err;
    }

    return filmeModel.atualizar(id, {
      titulo: titulo.trim(),
      genero,
      ano,
      dataAssistida,
      nota,
      posterUrl,
      observacoes,
    });
  },

  remover(id, token) {
    const usuario = usuarioService.autenticarPorToken(token);
    const filme = filmeModel.buscarPorId(id);

    if (!filme) {
      const err = new Error("Filme não encontrado");
      err.status = 404;
      throw err;
    }
    if (filme.usuarioId !== usuario.id) {
      const err = new Error("Esse filme não pertence a este usuário");
      err.status = 403;
      throw err;
    }

    filmeModel.remover(id);
  },
};
