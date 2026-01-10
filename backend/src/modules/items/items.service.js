import { query } from "../../config/db.js";

export async function getAllItems(userId) {
    const { rows } = await query(
        "SELECT id, itemName AS name, quantity, createdBy FROM items WHERE createdBy=$1 ORDER BY id",
        [userId]
    );
    return rows;
}

export async function getItemById(id) {
    const { rows } = await query(
        "SELECT id, itemName AS name, quantity, createdBy AS createdby FROM items WHERE id=$1",
        [id]
    );
    return rows[0];
}

export async function createItem({ name, quantity, createdBy }) {
    const { rows } = await query(
        "INSERT INTO items (itemName, quantity, createdBy) VALUES ($1, $2, $3) RETURNING id, itemName AS name, quantity, createdBy",
        [name, quantity, createdBy]
    );
    return rows[0];
}

export async function updateItemById(id, { name, quantity }, userId) {
    const { rows } = await query(
        "UPDATE items SET itemName=$1, quantity=$2 WHERE id=$3 AND createdBy=$4 RETURNING id, itemName AS name, quantity, createdBy",
        [name, quantity, id, userId]
    );
    return rows[0];
}

export async function deleteItemById(id, userId) {
    const { rows } = await query(
        "DELETE FROM items WHERE id=$1 AND createdBy=$2 RETURNING id",
        [id, userId]
    );
    return rows[0];
}