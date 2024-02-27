import TODO from "../Todo/types";

interface ICommonToDoProps {
    setTodos: (todos: TODO[]) => void,
    todos: Array<TODO>
}

export default ICommonToDoProps;