const API_BASE_URL = 'http://localhost:3002/todos/';
import { Todo } from './interfaces';

// Определение интерфейса для объекта задачи
interface Todo {
  _id: string;
  title: string;
  description?: string;
  status?: 'pending' | 'in progress' | 'completed';
}

// GET ALL TASKS
const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Error fetching todos');
    }
    return await response.json();
  } catch (error) {
    console.error('There was an error fetching the todos', error);
    throw error;
  }
};

// CREATE NEW TASK
const createTodo = async (todo: Omit<Todo, '_id'>): Promise<Todo> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Error creating todo');
  }
  return await response.json();
}

// UPDATE TASK BY ID
const updateTodo = async (id: string, todo: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Error updating todo');
  }
  return await response.json();
}

const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error deleting todo');
    }
    // Optionally, you can return some data here if your API sends back a response
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };
