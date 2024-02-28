import React from "react";
import { useQuery } from "@tanstack/react-query";

import AddInput from "../AddInput/AddInput";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import { fetchTodoList } from "../../api";

const Todo: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetchTodoList();
      console.log(`Query response: ${JSON.stringify(res.data)}`);
      return res.data;
    },
  });

  return (
    <div className="todo container">
      <Header title="Todo" />
      {isLoading && <h4>Loading...</h4>}
      {error && <h4>Error: {(error as Error).message}</h4>}
      <AddInput todos={data?.todos || []} />
      <TodoList todos={data?.todos || []} />
    </div>
  );
};

export default Todo;
