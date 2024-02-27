import {
  fireEvent,
  render,
  screen,
  queryByAttribute,
  configure,
} from "@testing-library/react";
import AddInput from "../AddInput";
import IToDo from "../../Todo/types";

const mockedSetTodoFn = jest.fn();

// Using custom query
const queryById = queryByAttribute.bind(null, "id");

const changeInputValue = (value: string): HTMLInputElement => {
  const inputElement = screen.getByPlaceholderText(
    /Add a new task here.../i
  ) as HTMLInputElement;
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, {
    target: {
      value,
    },
  });
  return inputElement;
};

const addTodo = (): HTMLButtonElement => {
  const buttonElement = screen.getByRole("button", {
    name: /add/i,
  }) as HTMLButtonElement;
  fireEvent.click(buttonElement);
  return buttonElement;
};

const mockedTaskArray: Array<IToDo> = [
  {
    id: "1234",
    task: "Task 1",
    completed: false,
  },
];

describe("Add Input", () => {
  beforeAll(() => {
    configure({ testIdAttribute: "id" });
  });

  // Test #1: should render input element - using placeholder
  test("should render input element", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  // Test #2: user should be able to enter value - using placeholder
  test("should be able to enter value", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const value = "Task 1";
    const inputElement = changeInputValue(value);
    expect(inputElement.value).toBe(value);
  });

  // Test #4: submit function should be disabled when there is no input - using placeholder
  test("should disable the button when no value is present", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    changeInputValue("");
    const buttonElement = addTodo();
    expect(buttonElement.disabled).toBe(true);
  });

  // Test #4: submit function should be called when button is clicked - using placeholder
  test("should be called only once", () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodoFn} />);
    const value = "Task 1";
    changeInputValue(value);

    addTodo();

    expect(mockedSetTodoFn).toBeCalledTimes(1);
  });

  // Test #5: user should be able to submit a new task - using custom query
  test("should have empty input when add button is cliked", () => {
    const { container } = render(
      <AddInput todos={[]} setTodos={mockedSetTodoFn} />
    );

    const value = "Task 1";
    const inputElement = changeInputValue(value);

    addTodo();
    expect(inputElement.value).toBe("");
    const errorContainer = queryById(container, "todo-error");
    expect(errorContainer).toBeNull();
  });

  // Test #6: there should be an error message when duplicate task is added
  test("should display an error message for duplicate task", () => {
    render(<AddInput todos={mockedTaskArray} setTodos={mockedSetTodoFn} />);
    const value = "Task 1";
    // Add "Task 1"
    changeInputValue(value);
    addTodo();

    const errorContainer = screen.getByTestId("todo-error");
    expect(errorContainer).toBeInTheDocument();
  });

  // Test #7: The error message should be cleared when the input is cleared
  test("should clear the error message when input value is cleared", () => {
    render(<AddInput todos={mockedTaskArray} setTodos={mockedSetTodoFn} />);

    changeInputValue("Task 1");
    addTodo();

    changeInputValue("");

    const errorContainer = screen.queryByTestId("todo-error");
    expect(errorContainer).toBeNull();
  });
});
