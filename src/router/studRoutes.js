const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
	res.render("app");
});

router.get("/index", (req, res) => {
	res.render("index");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/test", async (req, res) => {
	try {
		const stud = req.body;
		const studs = new Student(stud);
		const result = await studs.save();
		res.status(201).render("app", { successReg: "Registered " });
	} catch (error) {
		console.log(error.message);
		res.status(400).send(error);
	}
});

router.get("/test/:id", async (req, res) => {
	try {
		const _id = req.params.id;
		const data = await Student.findById(_id);
		if (data === null) {
			throw new Error("No Data Found");
		}
		res.send(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.patch("/test/:id", async (req, res) => {
	try {
		const _id = req.params.id;
		const stud = req.body;
		console.log(stud);
		const data = await Student.findByIdAndUpdate(_id, stud);
		console.log(data);
		res.send(data);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.delete("/test/:id", async (req, res) => {
	try {
		const _id = req.params.id;
		const data = await Student.findByIdAndDelete(_id);
		console.log(data, "deleted...");
		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

const createToken = async () => {
	const token = jwt.sign({ idd: "shikhar" }, `shikhar`);
	console.log(token);
};

createToken();
router.post("/login", async (req, res) => {
	try {
		const { email, password: pass } = req.body;
		const creds = await Student.findOne({ email });
		const passMatch = await bcrypt.compare(pass, creds.password);
		if (creds !== null) {
			if (passMatch && email === creds.email) {
				res.status(201).render("funcollege", {
					loginSuccess: "Logged in Successfully",
					user: creds.fname,
				});
			} else {
				res.render("login", { loginerror: "Invalid email or password" });
			}
		} else {
			res.render("login", { loginerror: "Invalid email or password" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

module.exports = router;
