import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../../config/db.js";
import { JWT_SECRET } from "../../config/env.js";

export async function registerUser({ firstName, lastName, email, password }) {
    const hashedPassword = await hash(password, 10);

    await query(
        `INSERT INTO users (first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4)`,
        [firstName, lastName, email, hashedPassword]
    );
}

export async function loginUser({ email, password }) {
    const { rows } = await query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = rows[0];
    if (!user) throw new Error("Invalid credentials");

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "1h" });
}
