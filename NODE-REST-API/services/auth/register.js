const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function register({username, password, email }) {
    //create new user
    const newUser = new User({
        username,
        email,
        password,
    });
    //save user and response
    const user = await newUser.save();

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

module.exports = register;