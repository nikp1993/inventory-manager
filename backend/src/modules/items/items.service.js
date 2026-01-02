import { query } from "../../config/db.js";

export async function getAllItems() {
    const { rows } = await query("SELECT * FROM items ORDER BY id");
    return rows;
}

export async function createItem({ name, quantity }) {
    const { rows } = await query(
        "INSERT INTO items (name, quantity) VALUES ($1, $2) RETURNING *",
        [name, quantity]
    );
    return rows[0];
}

export async function updateItemById(id, { name, quantity }) {
    const { rows } = await query(
        "UPDATE items SET name=$1, quantity=$2 WHERE id=$3 RETURNING *",
        [name, quantity, id]
    );
    return rows[0];
}

export async function deleteItemById(id) {
    const { rows } = await query(
        "DELETE FROM items WHERE id=$1 RETURNING id",
        [id]
    );
    return rows[0];
}