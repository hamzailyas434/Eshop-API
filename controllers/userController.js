const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const addUser = await User.create(req.body);

    const token = jwt.sign({ id: addUser._id }, "process.env.JWT_SECRET", {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "Success",
      // Token is here
      token,
      data: {
        addUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      // return next(new AppError("Please provide email and password!", 400));
      const err = new Error(`Please provide email and password`);
      res.status(400).json({
        status: "Fail",
        message: err.message,
      });
    }
    // 2) check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
      // const err = new Error(`Incorrect mail or password`);
      res.status(401).json({
        status: "Fail",
        message: `Incorrect mail or password`,
      });
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // 1) If email and password Exist
//     if (!email || !password) {
//       const err = new Error(`Please provide email and password`);
//       res.status(400).json({
//         status: "Fail",
//         message: err.message,
//       });
//     }
//     // 2) Check if user exists && password is correct
//     const user = await User.findOne({ email }).select("+password");
//     if (!User || !(await user.correctPassword(password, user.password))) {
//       const err = new Error(`Incorrect email or password`);
//       res.status(400).json({
//         status: "Fail",
//         message: err.message,
//       });
//     }
//     // 3) if everything is okay then send token to client
//     const token = "";
//     res.status(200).json({
//       status: "Success",
//       token,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "Fail",
//       message: err.message,
//     });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const userList = await User.find();
    res.status(200).json({
      status: "Success",
      results: userList.length,
      data: {
        userList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    const err = new Error(`Can't find User`);
    if (!user) {
      res.status(404).json({
        status: "fail",
        data: {
          message: err.message,
        },
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// exports.updateCategory = async (req, res) => {
//   try {
//     const updateCategory = await user.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         // runValidators: true,
//       }
//     );
//     res.status(200).json({
//       status: "success",
//       data: {
//         updateCategory,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: "Invalid Data Not Updated!",
//     });
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   try {
//     const category = await user.findByIdAndRemove(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: {
//         category,
//         message: "Category is deleted",
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: "Invalid Data !",
//     });
//   }
// };
