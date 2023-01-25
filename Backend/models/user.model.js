const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerify: { type: Boolean, default: false },
  isRA: { type: Boolean, default: false },
  isRF: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, name: this.name, isRA: this.isRA, isRF: this.isRF}, process.env.JWTPRIVATEKEY);
	return token;
};

userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		cin : Joi.string().required().label("CIN"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		
	});
	return schema.validate(data);
};

module.exports = {User, validate};