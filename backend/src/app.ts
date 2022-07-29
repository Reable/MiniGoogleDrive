import bodyParser from "body-parser";
import express, { Express } from "express";
import "./config";
import Router from "./Routes";

const app: Express = express();

app.use(bodyParser.json());

app.use(Router);

app.listen(3001, () => {
  console.log("Server running http://localhost:3001");
});
