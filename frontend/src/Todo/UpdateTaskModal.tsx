import React, { useState, useEffect } from 'react';
import s from './Modals/CreateTaskModal.module.scss'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';

type Props = {
  todo: Todo; // Добавляем объект todo для предзаполнения формы
  onClose: () => void;
};

const UpdateTaskModal: React.FC<Props> = ({ todo, onClose }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description || '');
  const updateTodoInStore = useTodoStore((state) => state.updateTodoInStore);

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
    <div className={s.container}>
      <div className={s.modal}>
        <h2 className={s.header}>UPDATE TASK</h2>
        <div>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            maxRows={10}
            multiline
            className={s.el}
            label="Description"
            variant="standard"
          />
        </div>
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
  );
};

export default UpdateTaskModal;
