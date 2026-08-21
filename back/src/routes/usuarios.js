import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = Router();

router.get("/", usuarioController.listarTodos);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);

export default router;
