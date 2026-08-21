import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
  async listarTodos(req, res, next) {
    try {
      const usuarios = usuarioService.listarTodos();
      res.json(usuarios);
    } catch (e) {
      next(e);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const usuario = usuarioService.buscarPorId(Number(req.params.id));
      res.json(usuario);
    } catch (e) {
      next(e);
    }
  },

  async criar(req, res, next) {
    try {
      const novo = usuarioService.criar(req.body);
      res.status(201).json(novo);
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const usuario = usuarioService.login(req.body);
      res.json(usuario);
    } catch (e) {
      next(e);
    }
  },
};
