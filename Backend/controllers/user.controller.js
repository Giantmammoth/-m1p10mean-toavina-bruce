const bcrypt = require('bcrypt');
const Joi = require("joi");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, validate } = require('../models/user.model');
const Token = require('../models/token.model')
const sendMail = require('../middleware/sendmail')


exports.getUser = async (req, res, next) => {
	await User.find({}).then(response => {
		res.status(200).send(response);
	}).catch(e => {
		console.log("there are some error in request : ", e)
	})
}

exports.delete = async (req, res, next) => {
	await User.findOneAndRemove({
		email: req.body.email
	}).then((removed) => {
		res.status(200).send("Removed success:", removed);
	}).catch(e => {
		console.log("Error request : ", e)
	})
}


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

exports.verifyAuth = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });

		if (!user) return res.status(400).send({ message: "Invalid id" });

		const token = await Token.findOne({
			userId: user._id,
		});

		if (!token) return res.status(400).send({ message: "Invalid token" });

		await User.updateOne({ _id: user._id }, { $set: { isVerify: true } });
		await token.remove();

		var message = "Votre compte a été vérifier, vous pouvez connecter désormais !";
		await sendMail(user.email, "Validation du compte", message);

		res.status(200).send({ message: "Compte verifier avec succès" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

exports.login = async (req, res, next) => {
	const validate = (data) => {
		const schema = Joi.object({
			email: Joi.string().email().required().label("Email"),
			password: Joi.string().required().label("Password"),
		});
		return schema.validate(data);
	};
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Mots de passe ou Email invalide" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Mots de passe ou Email invalide" });

		if (!user.isVerify) {
			return res.status(401).send({ message: "Un Email de vérification vous a été envoyer, veuiller vérifier s'il vous plait" });
		}

		const token = user.generateAuthToken();

		if (user.isRA) {
			res.status(200).send({ data: token, identification: "adminResponsableAtelier", message: "Connexion reussi !" });
		} else if (user.isRF) {
			res.status(200).send({ data: token, identification: "adminResponsableFinancier", message: "Connexion reussi !" });
		} else {
			res.status(200).send({ data: token, identification: "customer", message: "Connexion reussi !" });
		}




	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}; 