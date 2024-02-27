const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  // Fetch TODOs
});

app.post("/todos", (req, res) => {
  const todo = req.body;

  const newTodo = { id: uuidv4(), text: todo.text };
  console.log(newTodo);
  // Create a TODO

  res.send("Todo is added to the database");
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  // Delete a TODO

  res.send("Todo is deleted");
});

app.listen(port, () => console.log(`The app is listening on a port ${port}!`));
