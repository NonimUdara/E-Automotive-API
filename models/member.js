const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
	age: { type: String, required: true },
	height: { type: String, required: true },
	weight: { type: String, required: true },
	payment_status: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("member", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Full Name"),
		email: Joi.string().email().required().label("Email"),
		address: Joi.string().required().label("Address"),
		age: Joi.string().required().label("Age"),
		height: Joi.string().required().label("Height"),
		weight: Joi.string().required().label("Weight"),
		payment_status: Joi.string().required().label("Payment Status"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
