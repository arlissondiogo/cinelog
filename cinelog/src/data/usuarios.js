export const usuariosIniciais = [
  { id: 1, nome: "Ana Silva", email: "ana@uepb.br", token: "clg_ana001silva" },
];

export function gerarToken() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let sufixo = "";
  for (let i = 0; i < 10; i++) {
    sufixo += chars[Math.floor(Math.random() * chars.length)];
  }
  return `clg_${sufixo}`;
}
