import React, { useState } from 'react';
import axios from 'axios';

export const EditTodoForm = ({ editTodo, task }) => {
  const [taskValue, setTaskValue] = useState(task.task);
  const [dueDateValue, setDueDateValue] = useState(task.dueDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8081/api/todos/${task.id}`, {
        task: taskValue,
        dueDate: dueDateValue,
      });
      editTodo(response.data, task.id);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <input
        type="date"
        value={dueDateValue}
        onChange={(e) => setDueDateValue(e.target.value)}
        className="due-date-input"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
