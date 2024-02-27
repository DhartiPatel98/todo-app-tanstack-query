import axios from "axios";

import { API_URL } from "./helper/constant";
import IToDo from "./components/Todo/types";

export const fetchTodoList = async () => {
    return await axios.get(`${API_URL}/todos`);
}

export const addTodo = async (todo: Pick<IToDo, 'task'>) => {
    return await axios.post(`${API_URL}/todo`, todo);
}

export const deleteOrRestoreTodo = async (id: string) => {
    return await axios.patch(`${API_URL}/todo/${id}`);
}