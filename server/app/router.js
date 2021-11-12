import Router from "express";
import config from "./config.js";
import client from "./loader.js";

const router = new Router();

const collection = client
  .db(config.db.name)
  .collection(config.db.collectionName);

router.get("/", async (_, res) => {
  const display = await collection.find({}).limit(20).toArray();
  res.send(display);
});

router.get("/limit/:number", async (req, res) => {
  const num = Number(req.params.number);
  const list = await collection.find({}).limit(num).toArray();
  res.json(list);
});

// Test id for look up
// 10096773 ||  10030955  ||  10009999
// router.get("/find/:id", async (req, res) => {
//   const find = await collection.findOne({ _id: req.params.id });
//   res.send(find).toArray();
// });

router.get("/find", async (req, res) => {
  const queries = Object.keys(req.query);
  const values = Object.values(req.query);
  console.log(queries, values);

  const search = await collection
    .find({ [queries[0]]: { $regex: values[0], $options: "i" } })
    .toArray();

  res.json(search).toArray();
});

export default router;
