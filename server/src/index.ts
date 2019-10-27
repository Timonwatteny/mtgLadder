import express from "express";
import tournaments from "./api/tournaments";

const app = express();

app.use("/public", express.static(__dirname + "/../public/"));

app.use(express.json());

app.use("/api", tournaments)

app.use((req, res) => {
	res.redirect("/public")
});

app.listen(3001);

console.log("http://localhost:3001/");
