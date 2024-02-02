import React, {useState} from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
        addTodo({
          task: value,
          dueDate: dueDate,
        });
        setValue('');
        setDueDate('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="TodoForm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todo-input"
          placeholder="What is the task today?"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="due-date-input"
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    );
  };
