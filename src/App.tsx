import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import "./App.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = "all" | "completed" | "active";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTodos([{ id: Date.now(), text: newTask, completed: false }, ...todos]);
      setNewTask("");
    }
  };

  const toggleCompletion = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: Filter
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <Button
        variant="contained"
        fullWidth
        style={{ marginTop: "1rem" }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        style={{ marginTop: "1rem" }}
        fullWidth
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
      </ToggleButtonGroup>

      <List style={{ marginTop: "1rem" }}>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
            <ListItemText
              primary={todo.text}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
