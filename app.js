const express = require("express");
const mongoose = require("mongoose");

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

app.get("/", (req, res, next) => {
  res.render("show/index");
});

app.get("/users/login", (req, res, next) => {
  res.render("login/login");
});

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
