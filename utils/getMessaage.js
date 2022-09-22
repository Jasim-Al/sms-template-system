const { default: mongoose } = require("mongoose");

const getKey = require("./getKey");
const Url = require("../models/url");
const checkURL = require("./checkURL");

async function returnMessage(message, queries, messageId) {
  delete queries.key;

  let newMessage = message.message.toString();

  for (const key in queries) {
    if (checkURL(queries[key])) {
      async function getMessaage() {
        const url = new Url({
          message: messageId,
          key: getKey(5),
          url: queries[key],
        });
        try {
          const sess = await mongoose.startSession();
          await sess.startTransaction();
          await url.save({ session: sess });
          await message.url.push(url);
          await message.save({ session: sess });
          await sess.commitTransaction();
        } catch (error) {
          throw new Error(error);
        }
        return await newMessage.replace(
          `$${key}$`,
          `http://localhost:5000/url/${url.key.toString()}`
        );
      }
      newMessage = await getMessaage();
    } else {
      newMessage = await newMessage.replace(`$${key}$`, queries[key]);
    }
  }
  return newMessage;
}

module.exports = returnMessage;
