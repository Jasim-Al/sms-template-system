const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const messageRoutes = require("./routes/message-routes");
const urlRoutes = require("./routes/url-routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.render("show/index");
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/url", urlRoutes);

app.get("*", (req, res, next) => {
  res.send("404, Not found").status(404);
});

mongoose
  .connect(
    "mongodb+srv://jasim:Itzmejay01@cluster0.btxb48k.mongodb.net/sms?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("SERVER IS UP 😁😁😁😎");
    });
  })
  .catch((error) => {
    console.log(error);
    throw new Error(error);
  });
