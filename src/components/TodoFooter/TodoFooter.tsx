import React from "react";
import "./TodoFooter.css";
import IFooter from "./types";

const TodoFooter: React.FC<IFooter> = ({ numberOfIncompleteTasks }) => {
  return (
    <div className="todo-footer">
      {numberOfIncompleteTasks}{" "}
      {numberOfIncompleteTasks === 1 ? "task" : "tasks"} left
    </div>
  );
};

export default TodoFooter;
