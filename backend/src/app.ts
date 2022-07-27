import express, { Express, Request, Response } from "express";

const app: Express = express();

app.listen(3001, () => {
  console.log("Server running http://localhost:3001");
});

app.get("/api", (_req: Request, res: Response) => {
  res.json({
    message: "TS ok!",
  });
});
