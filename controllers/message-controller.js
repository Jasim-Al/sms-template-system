const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const User = require("../models/user");
const Message = require("../models/message");
const getMessaage = require("../utils/getMessaage");

const createMessage = async (req, res, next) => {
  const { title, message } = req.body;
  const apiKey = req.query.key;

  let user;
  try {
    user = await User.findOne({ apiKey });
  } catch (error) {
    console.log(error);
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the user.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!user) {
    res
      .json({
        errorMessage: "check credentials, Could'nt find the user.",
        status: "error",
      })
      .status(404);
    return next(new Error("Something Went Wrong."));
  }

  const createdMessage = new Message({
    title,
    message,
    creator: user.id,
  });

  try {
    const sess = await mongoose.startSession();
    await sess.startTransaction();
    await createdMessage.save({ session: sess });
    await user.messages.push(createdMessage);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    res
      .json({
        errorMessage: "Something went wrong, Could'nt Create the Message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  const regex = /\$(.*?)\$/gi;

  const variables = message.match(regex);

  let url =
    "http://localhost:5000/api/messages/create/" +
    createdMessage.toObject()._id +
    "?";

  variables.forEach((variable) => {
    const text = variable.split("$")[1];
    url = url + text + "={" + text + "}&";
  });

  url = url.slice(0, -1) + "&key=" + apiKey;

  res
    .json({
      message: createdMessage.toObject({ getters: true }),
      successMessage: "Message created successfully",
      url,
      status: "created",
    })
    .status(201);
};

const createNewMessage = async (req, res, next) => {
  const messageId = req.params.mid;

  const queries = req.query;

  const apiKey = req.query.key;

  let user;
  try {
    user = await User.findOne({ apiKey });
  } catch (error) {
    console.log(error);
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the user.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!user) {
    res
      .json({
        errorMessage: "check credentials, Could'nt find the user.",
        status: "error",
      })
      .status(404);
    return next(new Error("Something Went Wrong."));
  }

  let message;

  try {
    message = await Message.findById(messageId);
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!message) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(404);
    return next(new Error("Not found"));
  }

  if (message.creator.toString() !== user.id) {
    res
      .json({
        errorMessage: "This message is not assosiated with yours",
        status: "error",
      })
      .status(403);
    return next(new Error("Invalid user"));
  }

  try {
    getMessaage(message, queries, messageId).then(async (newMessage) => {
      res.json({ message: newMessage, status: "success" }).status(200);
    });
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt create the Message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }
};

const getMessageById = async (req, res, next) => {
  const messageId = req.params.mid;

  const apiKey = req.query.key;

  let user;
  try {
    user = await User.findOne({ apiKey });
  } catch (error) {
    console.log(error);
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the user.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!user) {
    res
      .json({
        errorMessage: "check credentials, Could'nt find the user.",
        status: "error",
      })
      .status(404);
    return next(new Error("Something Went Wrong."));
  }

  let message;

  try {
    message = await Message.findById(messageId);
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!message) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(404);
    return next(new Error("Not found"));
  }

  if (message.creator.toString() !== user.id) {
    res
      .json({
        errorMessage: "This message is not assosiated with yours",
        status: "error",
      })
      .status(403);
    return next(new Error("Invalid user"));
  }

  res.json({ message: message.toObject(), status: "success" }).status(200);
};

const updateMessage = async (req, res, next) => {
  const messageId = req.params.mid;
  const messageNew = req.body.message;

  const apiKey = req.query.key;

  let user;
  try {
    user = await User.findOne({ apiKey });
  } catch (error) {
    console.log(error);
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the user.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!user) {
    res
      .json({
        errorMessage: "check credentials, Could'nt find the user.",
        status: "error",
      })
      .status(404);
    return next(new Error("Something Went Wrong."));
  }
  let message;

  try {
    message = await Message.findById(messageId);
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!message) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(404);
    return next(new Error("Not found"));
  }

  if (message.creator.toString() !== user.id) {
    res
      .json({
        errorMessage: "This message is not assosiated with yours",
        status: "error",
      })
      .status(403);
    return next(new Error("Invalid user"));
  }

  message.message = messageNew;

  const regex = /\$(.*?)\$/gi;

  const variables = messageNew.match(regex);

  let url =
    "http://localhost:5000/api/messages/create/" + message.toObject()._id + "?";

  variables.forEach((variable) => {
    const text = variable.split("$")[1];
    url = url + text + "={" + text + "}&";
  });

  url = url.slice(0, -1) + "&key=" + apiKey;

  try {
    await message.save();
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt update the message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  res.json({ message: message.toObject(), url, status: "success" }).status(200);
};

const deleteMessage = async (req, res, next) => {
  const messageId = req.params.mid;
  const apiKey = req.query.key;

  let message;

  try {
    message = await Message.findById(messageId).populate("creator");
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt delete the message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!message) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the Message.",
        status: "error",
      })
      .status(404);
    return next(new Error("Not found"));
  }

  if (message.creator.apiKey !== apiKey) {
    res
      .json({
        errorMessage: "This message is not assosiated with yours",
        status: "error",
      })
      .status(403);
    return next(new Error("Invalid user"));
  }

  try {
    const sess = await mongoose.startSession();
    await sess.startTransaction();
    await message.remove({ session: sess });
    await message.creator.messages.pull(message);
    await message.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt delete the message.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }
  res
    .status(200)
    .json({ message: "Deleted message.", status: "success" })
    .status(200);
};

exports.getMessageById = getMessageById;
exports.createMessage = createMessage;
exports.createNewMessage = createNewMessage;
exports.updateMessage = updateMessage;
exports.deleteMessage = deleteMessage;
