const router = require("express").Router();
const { User, validate } = require("../models/userAuth");
const Image = require("../models/image");
const bcrypt = require("bcrypt");
const nodeMailer = require('nodemailer');
const { Vonage } = require('@vonage/server-sdk');

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		//console.log("...req.body", req.body);

		const userCreatioRes = await new User({ ...req.body, password: hashPassword, hasCart: false }).save();
		//console.log("userCreatioRes: ", userCreatioRes);
		res.status(201).send({ 
			userData: userCreatioRes,
			message: "User created successfully" 
		});

		var email = req.body.email;
		var phone = req.body.phone;
		var name = req.body.name;

		const html =
			`<h1>Hello ${name}.</h1>
			<h4>Welcome to E-Automotive Family.</h4>
			<p>Happy buying and selling!</p>`
			;

		//console.log(email);

		const transporter = nodeMailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'nonimudara234@gmail.com',
				pass: 'mbrzcvaxduurhwrn'
			}
		});

		const info = await transporter.sendMail({
			from: 'nonimudara234@gmail.com',
			to: email,
			subject: 'Registration Process Success!',
			html: html,
		})

		//console.log("Message sent: " + info.messageId);

		// const vonage = new Vonage({
		// 	apiKey: 'ebc907db',
		// 	apiSecret: 'vdck8lUqvKxqoKso'
		// });

		// const from = "E-Automotive";
		// const to = '94' + phone + '';
		// const text = 
		// 'Hello '+name+'.\nWelcome to E-Automotive Family.\nHappy buying and selling!\n\n\n\n'
		// ;

		// const pmessage = await vonage.sms.send({ to, from, text })

	}

	catch (e) {
		res.status(500).send({ message: "Internal Server Error" });
	}

});

module.exports = router;