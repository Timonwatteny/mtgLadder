import express from "express";

const app = express();

app.use("/public", express.static(__dirname + "/../src/public/"));

app.use((req, res) => {
	res.redirect("/public")
});

app.listen(3000);
