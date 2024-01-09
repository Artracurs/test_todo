// TodoList.tsx
import React, { useEffect } from 'react';
import { getAllTodos } from '../store/api';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';
import './TodoList.css'; // Убедитесь, что стили импортированы
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  // Использование типизированного хука Zustand для работы со списком задач
  const { todos, setTodos } = useTodoStore((state) => ({
    todos: state.todos,
    setTodos: state.setTodos
  }));

  // Получение списка задач при монтировании компонента
  useEffect(() => {
    let isMounted = true;
    getAllTodos().then((data: Todo[]) => {
      if (isMounted) {
        setTodos(data);
      }
    }).catch(error => {
      console.error("Failed to fetch todos:", error);
    });

    // Функция очистки для сброса флага isMounted при размонтировании компонента
    return () => {
      isMounted = false;
    };
  }, [setTodos]);

  return (
    <div className="todo-list-container">
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo: Todo) => (
            <li key={todo._id} className={`todo-item ${todo.status}`}>
              {todo.title}
              {/* Здесь могут быть добавлены дополнительные элементы, такие как описание и статус */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-todos">No todos found</p>
      )}
      <TodoItem />
    </div>
  );
};

export default TodoList;
