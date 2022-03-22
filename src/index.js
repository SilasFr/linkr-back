import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(json());

app.listen(5000, () => console.log("running on PORT 5000"));
