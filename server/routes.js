const { Router } = require("express");
const { getTodos, addTodo, deleteOrRestoreTodo } = require("./service");

const router = Router();

router.get("/todos", getTodos);

router.post("/todo", addTodo);

router.patch("/todo/:id", (req, res) => {
  setTimeout(() => {
    deleteOrRestoreTodo(req, res);
  }, 3000);
});

module.exports = router;
