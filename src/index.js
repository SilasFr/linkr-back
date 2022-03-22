import express, { json } from "express";
import cors from "cors";
import dotenv, { config } from "dotenv";
app.use(config);

const app = express();
app.use(cors());
app.use(json());

app.listen(process.env.PORT, () => console.log("running on PORT 5000"));
