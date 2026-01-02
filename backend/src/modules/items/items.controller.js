import {
    getAllItems,
    createItem,
    updateItemById,
    deleteItemById,
} from "./items.service.js";

export async function getItemsHandler(req, res) {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createItemHandler(req, res) {
    const { name, quantity } = req.body;
    if (!name || quantity === undefined) {
        return res.status(400).json({ error: "Name and quantity are required" });
    }

    try {
        const item = await createItem({ name, quantity });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateItemHandler(req, res) {
    const { id } = req.params;
    const { name, quantity } = req.body;
    if (!name || quantity === undefined) {
        return res.status(400).json({ error: "Name and quantity are required" });
    }

    try {
        const updated = await updateItemById(id, { name, quantity });
        if (!updated) return res.status(404).json({ message: "Item not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteItemHandler(req, res) {
    const { id } = req.params;
    try {
        const deleted = await deleteItemById(id);
        if (!deleted) return res.status(404).json({ message: "Item not found" });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}