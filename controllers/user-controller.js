const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    error = "Invalid inputs passed, please check your data.";
    res.json({ error }).redirect("/users/signup");
    next(new Error(err));
  }

  const { email, password } = req.body;

  const createdUser = new User({
    apiKey: uuidv4(),

    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    res
      .json({
        message: "Something went wrong, Could'nt Create the User.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  const user = {
    ...createdUser.toObject({ getters: true }),
  };

  delete user.password;

  res
    .json({
      user,
      message: "User created successfully",
      status: "created",
    })
    .status(201);
};

exports.signup = signup;
