process.env.DEBUG = "true";

import express from "express";
import cors from "cors";
import apiRouter from "./api/api";

const app = express();

if (process.env.DEBUG)
	console.log("debug environment");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use((req, res) => {
	res.status(404).send("");
})

app.listen(3001);

console.log("http://localhost:3001/");
