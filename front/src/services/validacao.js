export function urlValida(valor) {
  if (!valor || !valor.trim()) return true;
  try {
    const url = new URL(valor.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
