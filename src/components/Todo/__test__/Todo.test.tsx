import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import Todo from "../Todo";

const queryById = queryByAttribute.bind(null, "id");

function addToDo(todos: Array<string>) {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", {
    name: /Add/i,
  });

  todos.forEach((todo) => {
    fireEvent.change(inputElement, { target: { value: todo } });
    fireEvent.click(buttonElement);
  });
}

describe("Add TODO", () => {
  // Test #1: User should be able to add a new task and it should be present in the list
  test("should add a new task", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    const taskElement = screen.getByText("Task 1");
    expect(taskElement).toBeInTheDocument();
  });

  // Test #2: Multiple ToDos should be present in the list when added
  test("should render multiple items", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1", "Task 2", "Task 3"];
    addToDo(task);

    const taskElement = screen.queryAllByText(/Task/);
    expect(taskElement.length).toBe(3);
  });

  // Test #3: ToDo should be in incompleted state initially
  test("should be in incomplete state", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    const taskElement = screen.getByText("Task 1");
    expect(taskElement).not.toHaveClass("todo-item-completed");
  });

  // !TO-DO: getById always returns null
  // Test #4: ToDo should be in completed state when deleted
  test("should be in complete state", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    // Find the task list container
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(1);

    const todo = listItems[0];
    // const deleteElement = queryById(
    //   todo,
    //   `delete-todo-${todo.id}`
    // ) as HTMLButtonElement;
    // expect(deleteElement).not.toBeNull();

    const deleteElement = screen.getByRole("button", {
      name: `delete-todo-${todo.id}`,
    });
    fireEvent.click(deleteElement);
    expect(todo).toHaveClass("todo-item-completed");
  });

  // Test #5: ToDo should be in incomplete state when restored
  test("should be in incomplete state when restored", () => {
    render(<Todo />);
    const task: Array<string> = ["Task 1"];
    addToDo(task);

    // Find the task list container
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(1);

    const todo = listItems[0];

    const deleteElement = screen.getByRole("button", {
      name: `delete-todo-${todo.id}`,
    });
    fireEvent.click(deleteElement);

    const restoreElement = screen.getByRole("button", {
      name: `restore-todo-${todo.id}`,
    });
    fireEvent.click(restoreElement);

    expect(todo).not.toHaveClass("todo-item-completed");
  });
});
