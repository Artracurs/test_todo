// TodoItem.tsx
import React from 'react';
import { deleteTodo } from '../store/api'; // Importing from the file where you've defined your API functions
import useTodoStore from '../store/store'; // Importing your store

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    completed: boolean;
  };
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { removeTodo } = useTodoStore();

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      removeTodo(todo._id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.title}</span>
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
