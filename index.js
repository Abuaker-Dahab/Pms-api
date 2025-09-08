require("dotenv").config();
const path = require("path");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express")
const mongoose = require("mongoose")
const auth =require("./routes/auth")
const users = require("./routes/users")
const teams = require("./routes/teams") 
const tasks = require("./routes/tasks") 
const projects = require("./routes/projects")
const error = require("./middleware/error")

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
// require('./middleware/logging')();

// INFO: if we behind a proxy
app.set("trust proxy", 1);
// INFO: use it to limit number of reqest
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(cors());
// app.use(xss());
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.send("Hello world....");
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/teams", teams);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/projects", projects);
app.use(error);

const db = process.env.DB;
mongoose
  .connect(db)
  .then(() => console.log(`Connected to DB...`));

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
