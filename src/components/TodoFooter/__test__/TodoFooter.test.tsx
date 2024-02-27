import { render, screen } from "@testing-library/react";
import TodoFooter from "../TodoFooter";

describe("Footer", () => {
  test("should render correct number of incomplete tasks", () => {
    render(<TodoFooter numberOfIncompleteTasks={4} />);

    const footerElement = screen.getByText("4 tasks left");
    expect(footerElement).toBeInTheDocument();
  });

  test("should display 'task' when single incomplete task is in the list", () => {
    render(<TodoFooter numberOfIncompleteTasks={1} />);

    const footerElement = screen.getByText("1 task left");
    expect(footerElement).toBeInTheDocument();
  });

  test("should display 'tasks' when more than one incomplete tasks are in the list", () => {
    render(<TodoFooter numberOfIncompleteTasks={2} />);

    const footerElement = screen.getByText("2 tasks left");
    expect(footerElement).toBeInTheDocument();
  });
});
