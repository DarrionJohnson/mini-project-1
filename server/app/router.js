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

router.get("/limit/:number", async (req, res) => {
  const num = Number(req.params.number);
  const list = await collection.find({}).limit(num).toArray();
  res.json(list);
});

// Test id for look up
// 10096773 ||  10030955  ||  10009999
router.get("/find/:id", async (req, res) => {
  const find = await collection.findOne({ _id: req.params.id });
  res.send(find).toArray();
});

export default router;
