const express = require("express");
const { register, login } = require("../services/auth");

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const { body } = req;
  const { username, password, email } = body;

  try {
    const user = await register({ username, password, email });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  try {
      const user = await login(email,password);
    
      res.status(200).json(user);
  } catch (err) {
      next(err);
  }
});

module.exports = router;
