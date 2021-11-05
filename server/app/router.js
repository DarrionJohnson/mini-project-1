import Router from "express";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Localhost:3000/api router Test");
});

export default router;
