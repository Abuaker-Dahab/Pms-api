require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const auth =require("./routes/auth")
const users = require("./routes/users")
const tasks = require("./routes/tasks")
const projects = require("./routes/projects")

const app = express();
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/projects", projects);

const db = process.env.DB;
mongoose
.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log(`Connected to DB...`));

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
