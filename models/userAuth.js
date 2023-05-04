const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const imageSchema = require('./image');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	image: { type: String, required: true },
	hasCart: { type: Boolean, required: true }
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
		phone: Joi.string().required().label("phone"),
		password: passwordComplexity().required().label("Password"),
		image: Joi.any().label("Image")
	});
	return schema.validate(data);
};

module.exports = { User, validate };
