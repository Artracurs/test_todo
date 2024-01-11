import React, { useState, useEffect } from 'react';
import s from './CreateTaskModal.module.scss'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useTodoStore from '../../store/store';
import { Todo } from '../../store/interfaces';
import { ThemeProvider, createTheme } from '@mui/material';
import { createTodo } from '../../store/api';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#000',
      default: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#555',
    },
  },
});

type Props = {
  todo: Todo;
  onClose: () => void;
};

const UpdateTaskModal: React.FC<Props> = ({ todo, onClose }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description || '');
  const updateTodoInStore = useTodoStore((state) => state.updateTodoInStore);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [useDarkTheme, setUseDarkTheme] = useState(true);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      const newTodo = await createTodo({ title, description, completed: false });
      addTodo(newTodo);
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error while creating todo:', error);
    }
  };

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || '');
  }, [todo]);

  const handleUpdate = async () => {
    try {
      await updateTodoInStore(todo._id, { title, description });
      onClose(); 
    } catch (error) {
      console.error('Error while updating todo:', error);
    }
  };

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <div className={s.container}>
        <div className={s.modal}>
          <h2 className={s.header}>UPDATE TASK</h2>
          <div>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              maxRows={2}
              multiline
              className={s.el}
              label="Title"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              maxRows={10}
              multiline
              className={s.el}
              label="Description"
              variant="standard"
              style={{ margin: '10px 0 0 0' }}
            />
          </div>
          <p style={{ color: 'gray', fontSize: '0.8em' }}>Use Ctrl+Enter for creating Task</p>
          <div className={s.button}>
            <Button onClick={onClose} className={s.el} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleUpdate} className={s.el} variant="contained">
              Update
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UpdateTaskModal;