const { Router } = require("express");
const { getTodos, addTodo, deleteOrRestoreTodo } = require("./service");

const router = Router();

router.get("/todos", getTodos);

router.post("/todo", addTodo);

router.patch("/todo/:id", deleteOrRestoreTodo);

module.exports = router;
