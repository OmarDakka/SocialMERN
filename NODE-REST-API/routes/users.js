const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { verifyToken, isSameUserOrAdmin } = require("../middlewares");

//update user
router.put("/:id", verifyToken, isSameUserOrAdmin, async (req, res) => {
  const { params, body } = req;

  try {
    let updatedUser = await User.findByIdAndUpdate(params.id, {
      $set: body,
    });
    updatedUser = await User.findById(params.id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete user
router.delete("/:id", verifyToken, isSameUserOrAdmin, async (req, res) => {
  const { params } = req;
  try {
    const user = await User.findByIdAndDelete(params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(500);
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendsList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendsList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendsList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", verifyToken, async (req, res) => {
  if (req.user._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user._id);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.user._id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed!");
      } else {
        res.status(403).json("You already follow this user!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself!");
  }
});

//unfollow a user
router.put("/:id/unfollow", verifyToken, async (req, res) => {
  if (req.user._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user._id);
      if (user.followers.includes(req.user._id)) {
        await user.updateOne({ $pull: { followers: req.user._id } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself!");
  }
});

module.exports = router;
