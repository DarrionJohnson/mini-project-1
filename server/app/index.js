// Entry point for the application
import express, { json } from "express";
import config from "./config.js";
import router from "./router.js";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World from mini-project");
});

app.use(express.json());

app.use("/current-listings", router);

app.listen(config.port, () => {
  console.log(`Server 🏃🏾‍♂️ at: http://localhost:${config.port}`);
});
