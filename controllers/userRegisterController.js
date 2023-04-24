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
		console.log("...req.body", req.body);
		const image = { title: 'Test', image: "kkhbdwckhnkcnwkukhbkcuwbkb" }

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });

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

		console.log("Message sent: " + info.messageId);

		const vonage = new Vonage({
			apiKey: '08fa6d15',
			apiSecret: 'jMD3DqJvz6t7kx9u'
		});

		const from = "E-Automotive";
		const to = '94' + phone + '';
		const text = 'Hello \n\n\n\n';

		const pmessage = await vonage.sms.send({ to, from, text })
        
		//console.log('Message sent successfully'); console.log(info.resp)

		// async function sendSMS() {
		// 	await vonage.sms.send({ to, from, text })
		// 		.then(resp => { console.log('Message sent successfully'); console.log(resp); })
		// 		.catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
		// }

		// sendSMS();

	}

	catch (e) {
		res.status(500).send({ message: "Internal Server Error" });
	}

});

module.exports = router;