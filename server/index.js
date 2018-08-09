const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  port = 3001,
  app = express(),
  session = require("express-session"),
  massive = require("massive");
require("dotenv").config();
const path = require("path");

console.log(path.join(__dirname + "/../build"));
app.use("/", express.static(path.join(__dirname + "/../build")));
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.use(
  session({
    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED
  })
);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  const db = req.app.get("db");
  db.get_todos()
    .then(todos => {
      return res.send(todos);
    })
    .catch(console.log);
});
app.post("/api/todos", (req, res) => {
  const db = req.app.get("db");
  console.log(req.body.todo);
  db.post_todos(req.body.todo)
    .then(todos => {
      return res.send(todos);
    })
    .catch(console.log);
});
app.delete("/api/todos/:id", (req, res) => {
  const db = req.app.get("db");
  db.remove_todo(req.params.id)
    .then(todos => {
      return res.send(todos);
    })
    .catch(console.log);
});

app.listen(port, function() {
  console.log("Server listening on port", port);
});
