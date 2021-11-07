require("../db/conn");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const studSchema = mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	roll: {
		type: Number,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		validate(val) {
			if (!validator.isEmail(val)) {
				throw new Error("Enter valid Email");
			}
		},
		unique: true,
	},
	password: {
		type: String,
	},
});

studSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const passHash = await bcrypt.hash(this.password, 10);
		this.password = passHash;
		console.log(this.password);
	}
	next();
});

const Student = mongoose.model("Cstudent", studSchema);

module.exports = Student;
