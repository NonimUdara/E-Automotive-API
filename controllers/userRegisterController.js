const router = require("express").Router();
const { User, validate } = require("../models/userAuth");
const Image = require("../models/image");
const bcrypt = require("bcrypt");
const nodeMailer = require('nodemailer');



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
		const image = {title: 'Test', image: "kkhbdwckhnkcnwkukhbkcuwbkb"}

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });

		var email = "";
		var name = req.body.name;

		const html = `
		    <h1>Hello ${name}</h1>
			<h4>Welcome to E-Automotive Family.</h4>
			<p>Happy buying and selling!</p>
		`;

		email = req.body.email;

		//console.log(email);

		const transporter = nodeMailer.createTransport({
			service:'gmail',
			auth:{
				user:'nonimudara234@gmail.com',
				pass:'mbrzcvaxduurhwrn'
			}
		});
	
		const info = await transporter.sendMail({
			from:'nonimudara234@gmail.com',
			to:email,
			subject: 'Registration Process Success!',
			html:html,
		})

		//console.log("Message sent: "+info.messageId);

	} 
	// catch(e){
	// 	console.log(e);
	// };
	catch (e) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;