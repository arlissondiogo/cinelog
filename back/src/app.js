import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.js";
import filmesRouter from "./routes/filmes.js";
import { usuarioController } from "./controllers/usuarioController.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use("/usuarios", usuariosRouter);
app.use("/filmes", filmesRouter);
app.post("/login", usuarioController.login);

app.get("/", (req, res) => {
  res.json({
    api: "CineLog API",
    versao: "1.0.0",
    rotas: ["/usuarios", "/login", "/filmes"],
  });
});

app.use(errorHandler);

export default app;
