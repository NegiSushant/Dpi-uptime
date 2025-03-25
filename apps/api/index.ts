import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.post("/api/v1/websites", authMiddleware, async (req, res) => {
  const userId = req.userId!;
  const { url } = req.body;
  const data = await prismaClient.website.create({
    data: {
      userId,
      url,
    },
  });
  res.json({
    id: data.id,
  });
});

app.get("/api/v1/website/states", authMiddleware, async (req, res) => {
  const websiteId = req.query.websiteId! as unknown as string;
  const userId = req.userId;

  const data = prismaClient.website.findFirst({
    where: {
      id: websiteId,
      userId,
    },
    include: {
      ticks: true,
    },
  });
  res.json(data);
});

app.put("/api/v1/websites", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const website = prismaClient.website.findMany({
    where: {
      userId,
      disabled: false,
    },
  });
  res.json({ website });
});

app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
  const websitId = req.body.websiteId;
  const userId = req.userId;

  await prismaClient.website.update({
    where: {
      id: websitId,
      userId,
    },
    data: {
      disabled: true,
    },
  });

  res.json({
    message: "Deleted website successfully!",
  });
});
app.listen(3000);
