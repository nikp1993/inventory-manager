import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import itemRoutes from "./modules/items/items.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.sendStatus(200));

app.use("/", authRoutes);
app.use("/items", itemRoutes);

export default app;
