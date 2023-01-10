const bcrypt = require('bcrypt');
const Joi = require("joi");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {User, validate} = require('../models/user.model');
const Token = require('../models/token.model')
const sendMail = require ('../middleware/sendmail')


exports.signup = async (req, res, next) => {

    try {
		console.log(req.body)
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendMail(user.email, "Email de vérification", url);
		console.log("success")
		res
			.status(201)
			.send({ message: "Un Email vous été envoyer pour verifier votre compte" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};