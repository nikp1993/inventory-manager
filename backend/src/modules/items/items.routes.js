import { Router } from "express";
import {
    getItemsHandler,
    createItemHandler,
    updateItemHandler,
    deleteItemHandler,
} from "./items.controller.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getItemsHandler);
router.post("/", authenticateToken, createItemHandler);
router.put("/:id", authenticateToken, updateItemHandler);
router.delete("/:id", authenticateToken, deleteItemHandler);

export default router;