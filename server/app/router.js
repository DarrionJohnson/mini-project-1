import Router from "express";
import config from "./config.js";
import client from "./loader.js";

const router = new Router();

const collection = client
  .db(config.db.name)
  .collection(config.db.collectionName);

// Routes for current-listings
// Limit Check
// Standard Outcomes Check
// Max-Price Check
// ID Check
// Query Check

router.get("/", async (req, res) => {
  const queries = Object.keys(req.query);
  const values = Object.values(req.query);

  console.log(`Here are the Request parameters: ${queries[0]}; ${values[0]}`);

  if (queries[0] === "limit") {
    const num = Number(values);

    console.log(`limit the number of sets in the array to ${num}.`);

    if (num >= 1) {
      const display = await collection.find({}).limit(num).toArray();

      res.send(display);
    } else {
      res.send(
        "Please Enter a valid number; higher than 0; for the limit amount."
      );
    }
  } else if (queries[0] === undefined) {
    console.log("No queries were preformed.");

    const display = await collection.find({}).limit(100).toArray();
    res.send(display);
  } else if (queries[0] === "max-price") {
    const num = Number(values);
    const query = { $lte: num };

    console.log(
      `Query for all: listing with a ${queries[0]} of ${num} was preformed.`
    );
    if (num >= 1) {
      const display = await collection
        .find({ price: query })
        .limit(100)
        .toArray();

      console.log(queries, values[0]);
      res.send(display);
    } else {
      res.send(
        "Please Enter a valid number; higher than 0; for the limit amount."
      );
    }
  } else if (Number(values)) {
    const num = Number(values);

    console.log(`Query for all: ${num} ${queries[0]} Was preformed.`);

    const display = await collection
      .find({ [queries[0]]: num })
      .limit(100)
      .toArray();

    console.log(queries, values[0]);
    res.send(display);
  } else {
    console.log(`Query for: ${queries[0]}; Was preformed.`);

    const display = await collection
      .find({ [queries[0]]: { $regex: values[0], $options: "i" } })
      .limit(100)
      .toArray();

    console.log(queries, values[0]);
    res.send(display);
  }
});

// Test id for look up
// 10096773 ||  10030955  ||  10009999 ||  10051164
router.get("/:id", async (req, res) => {
  const find = await collection.findOne({ _id: req.params.id });
  res.send(find).toArray();

router.get("/reviews/:id", async (req, res) => {
  const find = await collection.findOne({ _id: req.params.id });
  res.send(find).toArray();
});

// router.get("/limit/:number", async (req, res) => {
//   const num = Number(req.params.number);
//   const list = await collection.find({}).limit(num).toArray();
//   res.json(list);
// });

// Test id for look up
// 10096773 ||  10030955  ||  10009999
// router.get("/find/:id", async (req, res) => {
//   const find = await collection.findOne({ _id: req.params.id });
//   res.send(find).toArray();
// });

// router.get("/find", async (req, res) => {
//   const queries = Object.keys(req.query);
//   const values = Object.values(req.query);
//   console.log(queries, values);

//   const search = await collection
//     .find({ [queries[0]]: { $regex: values[0], $options: "i" } })
//     .toArray();

//   res.json(search).toArray();
// });

export default router;
