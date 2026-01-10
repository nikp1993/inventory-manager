import {
    getAllItems,
    getItemById,
    createItem,
    updateItemById,
    deleteItemById,
} from "./items.service.js";

export async function getItemsHandler(req, res) {
    try {
        const items = await getAllItems(req.user.id);
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
        const item = await createItem({ name, quantity, createdBy: req.user.id });
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
        const item = await getItemById(id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // ownership check (item.createdby is lower-cased in the select alias)
        if (item.createdby !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        const updated = await updateItemById(id, { name, quantity }, req.user.id);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteItemHandler(req, res) {
    const { id } = req.params;
    try {
        const item = await getItemById(id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.createdby !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        await deleteItemById(id, req.user.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}