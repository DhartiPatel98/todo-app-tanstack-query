import React, { useState } from "react";
import { v4 } from "uuid";
import "./AddInput.css";
import AddToDo from "./types";
import TODO from "../Todo/types";

const AddInput: React.FC<AddToDo> = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState("");

  const addTodo = () => {
    if (!todo) return;

    const isDuplicate = todos.some((item) => item.task === todo);
    if (isDuplicate) {
      setError("Task already exists");
      return;
    }

    const updatedTodos: TODO[] = [
      ...todos,
      {
        id: v4(),
        task: todo,
        completed: false,
      },
    ];
    setTodos(updatedTodos);
    setTodo("");
    setError("");
  };

  return (
    <>
      <div className="input-container">
        <div className="input-field">
          <input
            className="input"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
              if (!e.target.value) {
                setError("");
              }
            }}
            placeholder="Add a new task here..."
            id="task-input"
          />
        </div>
        <button className="add-btn" onClick={addTodo} disabled={!todo}>
          Add
        </button>
      </div>
      {error && (
        <div className="error" id="todo-error">
          {error}
        </div>
      )}
    </>
  );
};

export default AddInput;
