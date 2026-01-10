import { registerUser, loginUser } from "./auth.service.js";

export async function register(req, res) {
    try {
        await registerUser(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(409).json({ error: "User already exists" });
    }
}

export async function login(req, res) {
    try {
        const token = await loginUser(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
