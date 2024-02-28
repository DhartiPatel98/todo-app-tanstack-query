import React, { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import TodoFooter from "../TodoFooter/TodoFooter";
import ICommonToDoProps from "../AddInput/types";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete-icon.svg";
import { ReactComponent as RestoreIcon } from "../../assets/icons/restore.svg";

import "./TodoList.css";
import { deleteOrRestoreTodo } from "../../api";
import IToDo from "../Todo/types";

interface TodoQueryData {
  todos: Array<IToDo>;
}

const TodoList: React.FC<ICommonToDoProps> = ({ todos }) => {
  const calcNumberOfIncompletedTasks = useCallback(() => {
    return todos.filter((todo) => !todo.deleted).length;
  }, [todos]);

  const queryClient = useQueryClient();

  // ------------------ Normal mutation example --------------
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (todo: IToDo) => {
  //     return await deleteOrRestoreTodo(todo.id);
  //   },
  // });

  // const handleAction = useCallback(
  //   (todo: IToDo) => {
  //     if (isPending) {
  //       return;
  //     }
  //     mutate(todo, {
  //       onSuccess: (res) => {
  //         console.log("response ", res);
  //         queryClient.invalidateQueries({ queryKey: ["todos"] });
  //       },
  //       // If the mutation fails,
  //       onError: (err) => {
  //         console.log("error", err);
  //       },
  //     });
  //   },
  //   [mutate, isPending, queryClient]
  // );

  // ------------ Optimistic updates ------------
  const { mutate, isPending } = useMutation({
    mutationFn: async (todo: IToDo) => {
      return await deleteOrRestoreTodo(todo.id);
    },
    onMutate: async (todo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([
        "todos",
      ]) as TodoQueryData;
      console.log("previous todo ", previousTodos);

      // Optimistically update to the new value
      const index = previousTodos?.todos?.findIndex(
        (item) => item.id === todo.id
      );
      console.log("index ", index, " ", previousTodos);
      if (index !== -1 && previousTodos?.todos) {
        const newTodoList = [...(previousTodos?.todos || [])];
        newTodoList[index] = {
          ...todo,
          deleted: !todo.deleted,
        };
        console.log("*** optimistic todo: ", newTodoList);
        queryClient.setQueryData(["todos"], {
          ...previousTodos,
          todos: newTodoList,
        });

        // Return a context object with the snapshotted value
        return { previousTodos };
      }
    },
  });

  const handleAction = useCallback(
    (todo: IToDo) => {
      if (isPending) {
        return;
      }
      mutate(todo, {
        onSuccess: (res) => {
          console.log("response ", res);
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
          console.log("error", err, " previous todo: ", context?.previousTodos);
          queryClient.setQueryData(["todos"], context?.previousTodos || []);
        },
        // Always refetch after error or success:
        // onSettled: () => {
        //   queryClient.invalidateQueries({ queryKey: ["todos"] });
        // },
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
                  handleAction(todo);
                }}
                aria-label={`restore-todo-${todo.id}`}
                role="button"
              />
            ) : (
              <DeleteIcon
                width={20}
                height={20}
                onClick={() => {
                  handleAction(todo);
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
