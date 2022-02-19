const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { register } = require("../services/auth");
//REGISTER
router.post("/register", async (req, res) => {
  const { body } = req;
  const { username, password, email } = body;
  
  try {
      const user = await register({username, password, email});
      
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("User not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
