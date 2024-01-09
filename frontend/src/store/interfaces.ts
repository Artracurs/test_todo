export interface Todo {
    _id: string;
    title: string;
    description?: string;
    status?: 'pending' | 'in progress' | 'completed';
  }
  