import Router from "express";
import config from "./config.js";
import client from "./loader.js";

const router = new Router();
const collection = client
  .db(config.db.name)
  .collection(config.db.collectionName);

router.get("/", (_, res) => {
  res.send("Localhost:3000/current-listings router Test");
});

export default router;
