import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    // Fetch todos from the backend on component mount
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post("http://localhost:8081/api/todos", todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/todos/${id}/complete`);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (updatedTodo, id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/todos/${id}`, updatedTodo);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data, isEditing: !todo.isEditing } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDateFilterChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    // Reset date filters when the default option is selected
    if (selectedOption === "default") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const sortedAndFilteredTodos = todos
    .filter((todo) => {
      if (!startDate || !endDate) {
        return true;
      }
      const dueDate = new Date(todo.dueDate);
      return dueDate >= startDate && dueDate <= endDate;
    })
    .map((todo) =>
      todo.isEditing ? (
        <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
      ) : (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      )
    );

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="sort-by-label"> Sort By: </p>
        <select onChange={handleSortChange} className="select">
          <option value="default">Default</option>
          <option value="dueDate">Due Date</option>
        </select>
        {sortBy === "dueDate" && (
          <DatePicker
            selected={startDate}
            onChange={handleDateFilterChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        )}
      </div>
      <TodoForm addTodo={addTodo} />
      {sortedAndFilteredTodos}
    </div>
  );
};
