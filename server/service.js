const axios = require("./axios");

const getTodos = async (_, res) => {
  try {
    const todoList = await axios.get("/todos");
    res.status(200).json({
      todos: todoList.data,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  getTodos,
};
