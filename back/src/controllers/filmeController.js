import { filmeService } from "../services/filmeService.js";

export const filmeController = {
  async listarTodos(req, res, next) {
    try {
      const token = req.query.token;
      const filmes = filmeService.listarPorToken(token);
      res.json(filmes);
    } catch (e) {
      next(e);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const token = req.query.token;
      const filme = filmeService.buscarPorId(Number(req.params.id), token);
      res.json(filme);
    } catch (e) {
      next(e);
    }
  },

  async criar(req, res, next) {
    try {
      const novo = filmeService.criar(req.body);
      res.status(201).json(novo);
    } catch (e) {
      next(e);
    }
  },

  async atualizar(req, res, next) {
    try {
      const atualizado = filmeService.atualizar(Number(req.params.id), req.body);
      res.json(atualizado);
    } catch (e) {
      next(e);
    }
  },

  async remover(req, res, next) {
    try {
      const { token } = req.body;
      filmeService.remover(Number(req.params.id), token);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  },
};
