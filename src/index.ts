import express from "express";
import tournaments from "./api/tournaments";

const app = express();

app.use("/public", express.static(__dirname + "/../src/public/"));

app.use(express.json());

app.use("/api", tournaments)

app.use((req, res) => {
	res.redirect("/public")
});

app.listen(3000);
