import express from "express";
import cors from "cors";
import routerProduct from "./src/routers/products.js";
import { PORT } from "./src/config/env.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: "5mb" }));

app.use("/api/v2", routerProduct);

app.listen(PORT, () => {
  console.log("Server is Running");
});
