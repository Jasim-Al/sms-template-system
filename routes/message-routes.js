const express = require("express");
const { check } = require("express-validator");

const messageController = require("../controllers/message-controller");

const router = express.Router();

router.post("/", messageController.createMessage);
router.get("/create/:mid", messageController.createNewMessage);
router.get("/:mid", messageController.getMessageById);
router.patch("/:mid", messageController.updateMessage);
router.delete("/:mid", messageController.deleteMessage);

module.exports = router;
