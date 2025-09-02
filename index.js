require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");

const app = express();
const db = process.env.DB;
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
})

mongoose
 .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log(`Connected to DB...`));

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
