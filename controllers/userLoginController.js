const router = require("express").Router();
const { User } = require("../models/userAuth");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		console.log("user", user);
		if (!user)
			return res.status(401).send({ message: "Invalid Email" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
			return res.status(401).send({ message: "Password is incorrect" });
		} else {
			const token = user.generateAuthToken();
			const userDataRes = {
				userId: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				image: user.image,
				hasCart: user.hasCart
			}
			res.status(200).send({
				data:
				{
					token: token,
					userData: userDataRes
				}, 
				message: "Logged in successfully"
			});
		}
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
