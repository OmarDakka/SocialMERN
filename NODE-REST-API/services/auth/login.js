const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");

async function login(email, password ){
    const user = await User.findOne({
        email,
    });

    if (!user) throw new createHttpError.NotFound("User not found");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new createHttpError.Unauthorized("Wrong password");

    const token = jwt.sign(
        {userId: user._id, email: user.email, isAdmin: user.isAdmin},
        "=3N^:yGJav~~ZJ.M",
        {
            expiresIn: "2h",
        }
    );

    user.token = token;

    await user.save();

    return user;
}

module.exports = login;