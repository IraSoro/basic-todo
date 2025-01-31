import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

describe("Todo App", () => {
  test("renders the app with initial tasks", () => {
    render(<App />);
    expect(screen.getByLabelText(/new task/i)).toBeInTheDocument();
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/task 3/i)).toBeInTheDocument();
  });

  test("filters tasks", () => {
    render(<App />);
    const allButton = screen.getByText(/all/i);
    const completedButton = screen.getByText(/completed/i);
    const activeButton = screen.getByText(/active/i);

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/task 3/i)).toBeInTheDocument();

    fireEvent.click(completedButton);
    expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/task 3/i)).not.toBeInTheDocument();

    fireEvent.click(activeButton);
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/task 2/i)).not.toBeInTheDocument();
    expect(screen.getByText(/task 3/i)).toBeInTheDocument();
  });
});
