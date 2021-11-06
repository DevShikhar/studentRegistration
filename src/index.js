const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const router = require("./router/studRoutes");
const port = process.env.PORT || 8000;
const publicpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../template");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(express.static(publicpath));

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(path.join(__dirname, "../template/partials"));

app.listen(port, () => {
	console.log(`server running at ${port}`);
});
