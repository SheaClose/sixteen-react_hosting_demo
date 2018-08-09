const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  port = 3001,
  app = express(),
  session = require("express-session"),
  massive = require("massive"),
  path = require("path");
require("dotenv").config();

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

// console.log(path.join());

app.use(cors());
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname + "/../build")));

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

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/../build/index.html"))
);

app.listen(port, function() {
  console.log("Server listening on port", port);
});
