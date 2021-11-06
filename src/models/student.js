require("../db/conn");
const mongoose = require("mongoose");
const validator = require("validator");

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

const Student = mongoose.model("Cstudent", studSchema);

module.exports = Student;
