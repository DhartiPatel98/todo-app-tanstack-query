import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import TodoFooter from "../TodoFooter/TodoFooter";
import ICommonToDoProps from "../AddInput/types";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete-icon.svg";
import { ReactComponent as RestoreIcon } from "../../assets/icons/restore.svg";

import "./TodoList.css";
import { deleteOrRestoreTodo } from "../../api";

const TodoList: React.FC<ICommonToDoProps> = ({ todos }) => {
  const calcNumberOfIncompletedTasks = useCallback(() => {
    return todos.filter((todo) => !todo.deleted).length;
  }, [todos]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteOrRestoreTodo(id);
    },
  });

  const handleAction = useCallback(
    (id: string) => {
      if (isPending) {
        return;
      }
      mutate(id, {
        onSuccess: (res) => {
          console.log("response ", res);
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (err) => {
          console.log("error", err);
        },
      });
    },
    [mutate, isPending, queryClient]
  );

  return (
    <div className="todolist-container">
      <ul className="todos-container">
        {todos.map((todo) => (
          <li
            className={`todo-item ${todo.deleted ? "todo-item-completed" : ""}`}
            key={todo.id}
            id={todo.id}
          >
            <div>{todo.task}</div>
            {todo.deleted ? (
              <RestoreIcon
                width={20}
                height={20}
                onClick={() => {
                  handleAction(todo.id);
                }}
                aria-label={`restore-todo-${todo.id}`}
                role="button"
              />
            ) : (
              <DeleteIcon
                width={20}
                height={20}
                onClick={() => {
                  handleAction(todo.id);
                }}
                aria-label={`delete-todo-${todo.id}`}
                role="button"
              />
            )}
          </li>
        ))}
      </ul>
      <div>
        <TodoFooter numberOfIncompleteTasks={calcNumberOfIncompletedTasks()} />
      </div>
    </div>
  );
};

export default TodoList;
