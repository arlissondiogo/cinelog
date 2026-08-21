import { Router } from "express";
import { filmeController } from "../controllers/filmeController.js";

const router = Router();

router.get("/", filmeController.listarTodos);
router.get("/:id", filmeController.buscarPorId);
router.post("/", filmeController.criar);
router.put("/:id", filmeController.atualizar);
router.delete("/:id", filmeController.remover);

export default router;
