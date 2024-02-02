import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {

  return (
    <div className={`Todo ${task.completed ? 'completed' : 'incompleted'}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="todo-checkbox"
      />
     <div>
      <p>{task.task}</p>
      {task.dueDate && <p>Due Date: {task.dueDate}</p>}
     </div>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          title="Edit"
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          title="Delete"
        />
      </div>
    </div>
  );
};
