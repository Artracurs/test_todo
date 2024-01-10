import React, { useState } from 'react';
import s from './CreateTaskModal.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useTodoStore from '../../store/store'; // Укажите правильный путь
import { createTodo } from '../../store/api'; // Укажите правильный путь
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      secondary: '#fff',
    },
  },
});

type Props = {
  onClose: () => void; // Функция для закрытия модального окна
};

const CreateTaskModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const addTodo = useTodoStore((state) => state.addTodo);
  const [useDarkTheme, setUseDarkTheme] = useState(true);

  const handleCreate = async () => {
    try {
      const newTodo = await createTodo({ title, description, completed: false });
      addTodo(newTodo);
      // Очистка формы после создания задачи
      setTitle('');
      setDescription('');
      onClose(); // Закрыть модальное окно после создания задачи
    } catch (error) {
      console.error('Error while creating todo:', error);
    }
  };

  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>

    <div className={s.container}>
      <div className={s.modal}>
        <h2 className={s.header}>CREATE TASK</h2>
        <div>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxRows={2}
            multiline
            className={s.el}
            id="title-input"
            label="Title"
            variant="standard"
          />
        </div>
        <div>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxRows={10}
            multiline
            className={s.el}
            id="description-input"
            label="Description"
            variant="standard"
          />
        </div>
        <div className={s.button}>
          <Button onClick={onClose} className={s.el} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleCreate} className={s.el} variant="contained">
            Create
          </Button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default CreateTaskModal;
