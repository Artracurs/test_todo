import create from 'zustand';
import { Todo } from './interfaces';

// Определение типа для объекта задачи
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

// Интерфейс для состояния
interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
}

// Создание хранилища с типизацией
const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t._id !== id) })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  setTodos: (todos) => set({ todos }),
}));

export default useTodoStore;
