# 🎬 CineLog

Aplicação para registrar e organizar os filmes que você assistiu: título, ano, gênero, nota, data assistida, pôster e observações.

O projeto é dividido em duas partes:

- **`cinelog/`** — frontend em React + Vite
- **`cinelog-backend/`** — API em Node.js (Express) com banco SQLite embutido

---

## 🧱 Stack

| Camada   | Tecnologias                                               |
| -------- | --------------------------------------------------------- |
| Frontend | React 19, Vite, React Router, lucide-react                |
| Backend  | Node.js, Express 5, `node:sqlite` (nativo do Node)        |
| Banco    | SQLite (arquivo local `banco.db`, criado automaticamente) |

---

## ✅ Pré-requisitos

- **Node.js 22.13+ ou 23.4+** (o backend usa o módulo nativo `node:sqlite`, que só funciona sem flag extra a partir dessas versões). Confira com:
  ```bash
  node --version
  ```
- npm (vem junto com o Node)

---

## 🚀 Como rodar

### 1. Backend

```bash
cd cinelog-backend
npm install
npm run dev
```

A API sobe em **http://localhost:3000**. Na primeira execução ela cria sozinha o arquivo `banco.db` e as tabelas necessárias — não precisa configurar banco de dados manualmente.

> `npm run dev` usa `node --watch`, então o servidor reinicia sozinho a cada alteração de arquivo.

### 2. Frontend

Em outro terminal:

```bash
cd cinelog
npm install
npm run dev
```

O app abre em **http://localhost:5173** (padrão do Vite).

O frontend já vem configurado para falar com a API em `http://localhost:3000` através da variável de ambiente no arquivo `.env`:

```
VITE_API_URL=http://localhost:3000
```

Se o backend estiver rodando em outro endereço/porta, é só alterar essa variável.

---

## 📖 Como usar

1. Acesse `/cadastro`, informe nome e e-mail.
2. A API gera um **token de acesso** — guarde-o, ele é a única forma de entrar na conta depois (não tem senha).
3. Faça login em `/login` com o token.
4. Adicione, edite e remova filmes na tela principal.

---

## 🔌 Rotas da API

| Método | Rota                 | Descrição                                           |
| ------ | -------------------- | --------------------------------------------------- |
| POST   | `/usuarios`          | Cria um usuário (`nome`, `email`) e retorna o token |
| POST   | `/login`             | Autentica com `token`                               |
| GET    | `/filmes?token=`     | Lista os filmes do usuário                          |
| GET    | `/filmes/:id?token=` | Detalhe de um filme                                 |
| POST   | `/filmes`            | Cria um filme (`token` + dados do filme)            |
| PUT    | `/filmes/:id`        | Atualiza um filme (`token` + dados do filme)        |
| DELETE | `/filmes/:id`        | Remove um filme (`token` no corpo da requisição)    |

Todas as rotas de filme exigem o `token` do usuário dono do registro; tentar acessar/editar filme de outro usuário retorna `403`.

---

## 🛠️ Problemas comuns

**`Cannot find module '.../src/db.js'`**
Algum arquivo se perdeu ao extrair ou mover o zip do backend. Extraia o `.zip` original de novo sem renomear pastas antes de abrir.

**`No such built-in module: node:sqlite`**
Sua versão do Node é antiga demais. Atualize para 22.13+ ou 23.4+.

**Erro 400 ao cadastrar usuário**
Confira a mensagem em `erro` na resposta (DevTools → Network → `usuarios` → Response). Normalmente é nome com menos de 2 caracteres, e-mail em formato inválido, ou e-mail já cadastrado.

**Fontes (Bebas Neue / Work Sans / DM Sans) não aparecem**
As fontes são carregadas via pacotes `@fontsource` locais (não dependem de internet). Se ainda assim não aparecerem, rode `npm install` de novo no frontend para garantir que os pacotes de fonte foram baixados.
