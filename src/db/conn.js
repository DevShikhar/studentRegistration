const mongoose = require("mongoose");

(async function () {
	try {
		const connect = await mongoose.connect("mongodb://localhost:27017/college");
		console.log("DB connected");
	} catch (error) {
		console.error(error.message);
	}
})();
