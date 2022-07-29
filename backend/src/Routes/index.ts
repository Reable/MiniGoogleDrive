import express, { Request, Response, Router } from "express";
import { Users } from "../Entity/Users.entity";

const router: Router = express.Router();

router
  .route("/api/users")
  .get(async (_req: Request, _res: Response) => {
    const user = Users.find();
    _res.json({ user });
  })
  .post(async (req: Request, res: Response) => {
    const newUser: Users = req.body;
    const user = await Users.create(newUser);
    res.end(user);
  });

export default router;
