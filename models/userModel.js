const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: false,
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});
//  Create Virtual for Id by default it create id like this (_id) now this virtual create another id field like this (id) remove the _ symbol.
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
// Enable VIrtual
userSchema.set("toJSON", {
  virtuals: true,
});

// Encryption add Between getting the data and adding in the database
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //  Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the confirm password at this time we have the password in hash form
  this.passwordConfirm = undefined;
  //  call next()
  next();
});

// Instant Methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
