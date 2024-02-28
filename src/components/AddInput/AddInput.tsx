import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./AddInput.css";
import AddToDo from "./types";
import { addTodo } from "../../api";

const AddInput: React.FC<AddToDo> = ({ todos }) => {
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending, isIdle, isSuccess, isError } = useMutation({
    mutationFn: async (task: string) => {
      return await addTodo({
        task,
      });
    },
  });

  console.log(
    `Add Todo Mutation states: isIdle: ${isIdle}, isPending: ${isPending}, isSuccess: ${isSuccess}, isError: ${isError}`
  );

  const saveTodo = useCallback(() => {
    if (!todo) return;

    const isDuplicate = todos.some((item) => item.task === todo);
    if (isDuplicate) {
      setError("Task already exists");
      return;
    }

    mutate(todo, {
      onSuccess: (res) => {
        console.log("response ", res);
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        setTodo("");
        setError("");
      },
      onError: (err) => {
        console.log("error", err);
        setError(err.message);
      },
    });
  }, [todo, todos, mutate, queryClient]);

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
        <button
          className="add-btn"
          onClick={saveTodo}
          disabled={!todo || isPending}
        >
          {isPending ? "Saving..." : "Add"}
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
