const { application } = require("express");
const express = require("express");
const { findById } = require("../models/student");
const router = express.Router();
const Student = require("../models/student");

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
	const stud = req.body;
	console.log(stud, "stud");
	const studs = [new Student(stud)];
	console.log(studs, "studs");
	try {
		const result = await Student.insertMany(studs);
		console.log(result, "result");
		// res.status(201).send(result);
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

router.post("/login", async (req, res) => {
	try {
		const { email, password: pass } = req.body;
		const creds = await Student.find({ email, password: pass });
		console.log("***************************");
		console.log(creds);
		res.render("funcollege", {
			loginSuccess: "Logged in Successfully",
			user: creds[0].fname,
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
