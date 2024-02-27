import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  //   Test #1: Using getByText
  test("Header should render the exact text passed from component", () => {
    const title = "TODO";
    render(<Header title={title} />);

    const h1Element = screen.getByText(title, {
      exact: true,
    });

    expect(h1Element).toBeInTheDocument();
  });

  //   Test #2: Using getByTitle
  //   test("Header should render the exact text passed from component", () => {
  //     render(<Header title="TODO" />);

  //     const h1Element = screen.getByTitle("Header");

  //     expect(h1Element).toBeInTheDocument();
  //   });
});
