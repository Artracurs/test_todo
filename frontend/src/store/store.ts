import { create } from 'zustand';
// import { Todo } from './interfaces';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  status?: 'pending' | 'in progress' | 'completed'
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  updateTodoInStore: (todo: Todo) => void;
}

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
  updateTodoInStore: async (id: string, updatedTodo: Partial<Todo>) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, ...updated } : todo
        ),
      }));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  },
}));

export default useTodoStore;
