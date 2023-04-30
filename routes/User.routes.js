const express = require("express");

const userRouter = express.Router();

const { UserModel } = require("../model/User.model");

var jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      const user = new UserModel({ email, pass: hash, name, age });
      await user.save();
      res.status(200).send({ msg: "New User has been registered" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      // Load hash from your password DB.
      bcrypt.compare(pass, user.pass, (err, result) => {
        // result == true
        if (result) {
          var token = jwt.sign(
            { authorID: user._id, author: user.name },
            "masai"
          );
          res.status(200).send({ msg: "Login Successful", token });
        } else {
          res.status(200).send({ msg: "Wrong Credential" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
