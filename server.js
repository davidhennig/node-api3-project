const express = require("express");

const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use("/api/users", userRouter);

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} ${Date.now()}`);

  next();
}

module.exports = server;
