const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const _ = require("lodash");
const {
  signupSchema,
  loginSchema,
  profileSchema,
} = require("../schemas/user.schema");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 255 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 255 },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  lastLogin: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

// /^(?=.*[\w])(?=.*[\W])[\w\W]{6}$/ For Password
userSchema.methods.generateJWT = function () {
  // { expiresIn: '1h' }
  const token = JWT.sign(
    _.omit(this._doc, ["password", "__v"]),
    process.env.SECRET_KEY
  );
  return token;
};

const signupValidate = (data) =>
  signupSchema.validate(data, { abortEarly: false });

const loginValidate = (data) =>
  loginSchema.validate(data, { abortEarly: false });

const profileValidate = (data) =>
  profileSchema.validate(data, { abortEarly: false });

const User = new mongoose.model("User", userSchema);

module.exports = { User, profileValidate, signupValidate, loginValidate };
