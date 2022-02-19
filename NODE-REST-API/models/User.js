const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const relationshipTypes = Object.freeze({
  SINGLE: 1,
  MARRIED: 2,
  COMPLICATED: 3,
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [
        relationshipTypes.SINGLE,
        relationshipTypes.MARRIED,
        relationshipTypes.COMPLICATED,
        
      ],
    },
    token : {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next){
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  //generate salt
  bcrypt.genSalt(10,function(err,salt){
    if (err) return next(err);

    //hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      //override the cleartext password with the hashed one
      user.password = hash;
      next();
    })
  }) 
}) 



module.exports = mongoose.model("User", UserSchema);
