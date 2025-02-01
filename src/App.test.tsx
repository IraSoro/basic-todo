import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  test("Initial tasks should be displayed correctly", async () => {
    const result = render(<App />);

    const tasks = result.queryAllByText(/Task .*/);
    const checkboxes = result.container.querySelectorAll("input[type='checkbox']");

    expect(tasks.length).toBe(3);
    expect(checkboxes.length).toBe(3);

    expect(tasks[0].parentElement).not.toHaveStyle("text-decoration: line-through");
    expect(checkboxes[0]).not.toBeChecked();

    expect(tasks[1].parentElement).toHaveStyle("text-decoration: line-through");
    expect(checkboxes[1]).toBeChecked();

    expect(tasks[2].parentElement).not.toHaveStyle("text-decoration: line-through");
    expect(checkboxes[2]).not.toBeChecked();
  });
  
  test("Completed tasks should be displayed and filtered correctly", () => {
    const result = render(<App />);

    fireEvent.click(screen.getByText("Completed"));

    const tasks = result.queryAllByText(/Task .*/);
    const checkboxes = result.container.querySelectorAll("input[type='checkbox']");
    expect(tasks.length).toBe(1);
    expect(checkboxes.length).toBe(1);

    expect(tasks[0].parentElement).toHaveStyle("text-decoration: line-through");
    expect(checkboxes[0]).toBeChecked();
  });

  test("Active tasks should be displayed and filtered correctly", () => {
    const result = render(<App />);

    fireEvent.click(screen.getByText("Active"));

    const tasks = result.queryAllByText(/Task .*/);
    const checkboxes = result.container.querySelectorAll("input[type='checkbox']");
    expect(tasks.length).toBe(2);
    expect(checkboxes.length).toBe(2);

    expect(tasks[0].parentElement).not.toHaveStyle("text-decoration: line-through");
    expect(checkboxes[0]).not.toBeChecked();

    expect(tasks[0].parentElement).not.toHaveStyle("text-decoration: line-through");
    expect(checkboxes[0]).not.toBeChecked();
  });

  test("Add a new task in the list", () => {
    const result = render(<App />);

    const newTaskName = "Test task";
    fireEvent.change(screen.getByLabelText("New Task"), { target: { value: newTaskName }});
    fireEvent.click(screen.getByText("Add Task"));

    const tasks = result.queryAllByText(/Test task.*/);
    const checkboxes = result.container.querySelectorAll("input[type='checkbox']");
    expect(tasks.length).toEqual(1);
    expect(checkboxes.length).toBe(4);

    expect(tasks[0].parentElement).not.toHaveStyle("text-decoration: line-through");
    expect(checkboxes[3]).not.toBeChecked();
  });

  test("If user click on checkbox then task should be visible in the list of completed tasks", () => {
    const result = render(<App />);

    const newTaskName = "Test task";
    fireEvent.change(screen.getByLabelText("New Task"), { target: { value: newTaskName }});
    fireEvent.click(screen.getByText("Add Task"));

    let checkboxes = result.container.querySelectorAll("input[type='checkbox']");
    expect(checkboxes.length).toBe(4);

    fireEvent.click(checkboxes[3]);
    fireEvent.click(screen.getByText("Completed"));

    checkboxes = result.container.querySelectorAll("input[type='checkbox']");
    expect(checkboxes.length).toBe(2);
  });
});
