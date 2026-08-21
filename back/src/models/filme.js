import { db } from "../db.js";

function paraApi(row) {
  if (!row) return null;
  return {
    id: row.id,
    titulo: row.titulo,
    genero: row.genero,
    ano: row.ano,
    dataAssistida: row.data_assistida,
    nota: row.nota,
    posterUrl: row.poster_url,
    observacoes: row.observacoes,
    usuarioId: row.usuario_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const filmeModel = {
  listarPorUsuario(usuarioId) {
    return db
      .prepare(
        "SELECT * FROM filmes WHERE usuario_id = ? ORDER BY created_at DESC",
      )
      .all(Number(usuarioId))
      .map(paraApi);
  },

  buscarPorId(id) {
    const row = db.prepare("SELECT * FROM filmes WHERE id = ?").get(Number(id));
    return paraApi(row);
  },

  inserir({ titulo, genero, ano, dataAssistida, nota, posterUrl, observacoes, usuarioId }) {
    const r = db
      .prepare(
        `INSERT INTO filmes (titulo, genero, ano, data_assistida, nota, poster_url, observacoes, usuario_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        titulo,
        genero ?? null,
        ano ?? null,
        dataAssistida ?? null,
        nota ?? null,
        posterUrl ?? null,
        observacoes ?? null,
        Number(usuarioId),
      );
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, { titulo, genero, ano, dataAssistida, nota, posterUrl, observacoes }) {
    db.prepare(
      `UPDATE filmes SET
         titulo = ?, genero = ?, ano = ?, data_assistida = ?, nota = ?,
         poster_url = ?, observacoes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    ).run(
      titulo,
      genero ?? null,
      ano ?? null,
      dataAssistida ?? null,
      nota ?? null,
      posterUrl ?? null,
      observacoes ?? null,
      Number(id),
    );
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare("DELETE FROM filmes WHERE id = ?").run(Number(id));
    return r.changes > 0;
  },
};
