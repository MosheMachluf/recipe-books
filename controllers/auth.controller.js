const { User, signupValidate, loginValidate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");

class UsersController {
  static async login(req, res) {
    let user;

    try {
      user = await loginValidate(req.body);
    } catch ({ errors }) {
      return res.status(400).send(errors[0]);
    }

    const checkEmail = await User.findOne({ email: user.email });
    if (!checkEmail)
      return res
        .status(401)
        .send({ success: 0, message: "אימייל או סיסמה שגויים" });

    const checkPass = await bcrypt.compare(user.password, checkEmail.password);
    if (!checkPass)
      return res
        .status(401)
        .send({ success: 0, message: "אימייל או סיסמה שגויים" });

    checkEmail.lastLogin = new Date();
    checkEmail.save();

    delete checkEmail.password;

    res.status(200).json({
      message: "Logged successfully",
      userId: checkEmail._id,
      user: checkEmail,
      token: checkEmail.generateJWT(),
    });
  }

  static async signup(req, res) {
    let user;

    try {
      user = await signupValidate(req.body);
    } catch ({ errors }) {
      return res.status(400).send({ success: 0, message: errors[0] });
    }

    const checkEmail = await User.findOne({ email: user.email });
    if (checkEmail) return res.status(400).send("אימייל קיים במערכת");

    user.password = await bcrypt.hash(user.password, 10);

    try {
      user = new User(user);
      await user.save();
      // return the new user without the password
      // return res.send(_.omit(user._doc, ["password", "updatedAt"]));
      let token = user.generateJWT();
      return res.json({
        success: 1,
        message: "User created successfully.",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: 0,
        message: error.message || "Something went wrong",
      });
    }
  }
}

module.exports = UsersController;
