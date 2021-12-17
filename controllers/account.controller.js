const { User, profileValidate } = require("../models/user.model");
const bcrypt = require("bcrypt");

class AccountController {
  static get(req, res) {
    res.send(req.user);
  }

  static async update(req, res) {
    let updatedUser;
    let { firstName, lastName, email, password, newPassword } = req.body;

    const userId = req.user._id;

    try {
      updatedUser = await profileValidate({
        firstName,
        lastName,
        email,
        password,
        newPassword,
      });
    } catch ({ errors }) {
      return res.status(400).send({
        status: 0,
        message: errors[0],
      });
    }

    let user = await User.findOne({ _id: userId }, { email: 1, password: 1 });
    if (!user)
      return res.status(404).send({
        status: 0,
        message: "לא נמצא משתמש",
      });

    if (password && newPassword && password !== newPassword) {
      const checkPass = await bcrypt.compare(password, user.password);

      if (!checkPass) {
        return res.status(400).send({
          status: 0,
          message: "הסיסמה הנוכחית אינה נכונה",
        });
      }

      updatedUser.password = await bcrypt.hash(newPassword, 10);
    } else {
      delete updatedUser.password;
      delete updatedUser.newPassword;
    }

    if (email && user.email !== email) {
      let emailExist = await User.findOne({ email });
      if (emailExist && emailExist._id != userId) {
        return res.status(400).send({
          status: 0,
          message: "הדוא“ל שהוזן כבר בשימוש, אנא בחר דוא“ל אחר ",
        });
      }
    }

    try {
      user = await User.findOneAndUpdate({ _id: userId }, updatedUser, {
        projection: {
          password: 0,
        },
        returnOriginal: false, // return the updated user
      });

      req.user = user;

      return res.send({
        status: 1,
        message: "User updated successfully",
        data: user,
      });
    } catch ({ errors }) {
      return res.status(400).send({
        status: 0,
        message: errors[0],
      });
    }
  }

  static async delete(req, res) {
    try {
      await User.deleteOne({ _id: req.user._id });
      res.send("User deleted successfully");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = AccountController;
