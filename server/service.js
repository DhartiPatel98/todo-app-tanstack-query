const axios = require("./axios");
const { v4: uuid } = require("uuid");

const getTodos = async (_, res) => {
  try {
    const todoList = await axios.get("/todos");
    res.status(200).json({
      todos: todoList.data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = {
      id: uuid(),
      task: req.body.task,
      deleted: false,
    };
    const addedTodo = await axios.post(`/todos`, todo);
    res.status(200).json({
      todo: addedTodo.data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteOrRestoreTodo = async (req, res) => {
  try {
    const todoList = await axios.get(`/todos`);

    const todo = (todoList.data || []).find(
      (item) => item.id === req.params.id
    );
    if (todo) {
      const result = await axios.patch(`/todos/${req.params.id}`, {
        deleted: !todo.deleted,
      });

      res.status(200).json({
        todo: result.data,
      });
      return;
    }

    throw new Error("Todo not found");
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteOrRestoreTodo,
};
