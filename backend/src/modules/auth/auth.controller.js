import { registerUser, loginUser } from "./auth.service.js";

export async function register(req, res) {
    try {
        await registerUser(req.body);
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const token = await loginUser(req.body);
        res.json({ token });
    } catch {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
