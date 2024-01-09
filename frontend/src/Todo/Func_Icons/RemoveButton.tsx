import React from 'react';
import useTodoStore from '../../store/store'; // Предполагается, что это путь к вашему хуку Zustand
import { deleteTodo } from '../../store/api'; // Укажите правильный путь к функции deleteTodo
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
  id: string;
};

const RemoveButton: React.FC<Props> = ({ id }) => {
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const handleRemove = async () => {    
    try {
      await deleteTodo(id);
      removeTodo(id);
      console.log(`Todo with id ${id} was successfully deleted`);
    } catch (error) {
      console.error('Error while deleting todo:', error);
    }
  };

  return (
    
<DeleteForeverOutlinedIcon onClick={handleRemove}/>
  );
};

export default RemoveButton;
