var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const rankingRouter = require("./routes/ranking");
const sortRouter = require("./routes/sort");
const searchRouter = require("./routes/search");
const likeRouter = require("./routes/like");
const detailRouter = require("./routes/detail");
const reviewRouter = require("./routes/review");
const imageRouter = require("./routes/image");
const nicknameRouter = require("./routes/nickname");
const cors=require("cors");


var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ranking", rankingRouter);
app.use("/sort", sortRouter);
app.use("/search", searchRouter);
app.use("/like", likeRouter);
app.use("/detail", detailRouter);
app.use("/review", reviewRouter);
app.use("/image",imageRouter);
app.use("/nickname",nicknameRouter);


//mongodb연결을위해 비밀번호 가림
const dotenv = require("dotenv");
dotenv.config();

//mongodb 연결
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connecting"))
  .catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals);
});

module.exports = app;
