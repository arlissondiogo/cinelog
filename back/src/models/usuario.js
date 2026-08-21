import { db } from "../db.js";
import { randomBytes } from "crypto";

function paraApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function gerarToken() {
  return `clg_${randomBytes(6).toString("hex")}`;
}

export const usuarioModel = {
  listarTodos() {
    return db
      .prepare("SELECT * FROM usuarios ORDER BY nome ASC")
      .all()
      .map(paraApi);
  },

  buscarPorId(id) {
    const row = db
      .prepare("SELECT * FROM usuarios WHERE id = ?")
      .get(Number(id));
    return paraApi(row);
  },

  buscarPorEmail(email) {
    const row = db
      .prepare("SELECT * FROM usuarios WHERE email = ?")
      .get(email);
    return paraApi(row);
  },

  buscarPorToken(token) {
    const row = db
      .prepare("SELECT * FROM usuarios WHERE token = ?")
      .get(token);
    return paraApi(row);
  },

  inserir({ nome, email }) {
    const token = gerarToken();

    const r = db
      .prepare("INSERT INTO usuarios (nome, email, token) VALUES (?, ?, ?)")
      .run(nome, email, token);

    return {
      ...this.buscarPorId(r.lastInsertRowid),
      token,
    };
  },
};
