import express from "express";
import { authMiddleware } from "./middleware";

const app = express();

app.post("/api/v1/websites", authMiddleware, async (req, res) => {});

app.get("/api/v1/website/states", authMiddleware, (req, res) => {
  const userId = req.userId;
});

app.put("/api/v1/websites", authMiddleware, (req, res) => {});

app.delete("/api/v1/website/", authMiddleware, (req, res) => {});
app.listen(3000);
