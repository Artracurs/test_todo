import React, { useEffect, useState } from 'react';
import { getAllTodos, updateTodo } from '../store/api';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';
import s from './List.module.scss';
import StatusIcon from './StatusIcon';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import RemoveButton from './Func_Icons/RemoveButton';
import CreateTaskButton from './Func_Icons/CreateTaskButton';
import UpdateTaskModal from './UpdateTaskModal';

type Props = {
  onOpenCreateModal: () => void;
}

export default function List({ onOpenCreateModal }: Props) {
  const { todos, setTodos } = useTodoStore((state) => ({
    todos: state.todos,
    setTodos: state.setTodos
  }));

  const [visibleDescriptions, setVisibleDescriptions] = useState<{ [key: string]: boolean }>({});
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos.sort((a, b) => getTodoStatusPriority(a.status) - getTodoStatusPriority(b.status)));
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTodo(id, { status: newStatus });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const getTodoStatusPriority = (status) => {
    switch (status) {
      case 'in progress':
        return 1;
      case 'pending':
        return 2;
      case 'completed':
        return 3;
      default:
        return 4;
    }
  };

  const toggleDescriptionVisibility = (id: string) => {
    const newVisibility = {
      ...visibleDescriptions,
      [id]: !visibleDescriptions[id]
    };
    setVisibleDescriptions(newVisibility);
  };

  const list = todos.map((item: Todo) => {
    const isDescriptionVisible = visibleDescriptions[item._id] ?? false;
  
    return (
      <div key={item._id} id={item._id} className={s.container}>
        <StatusIcon 
          id={item._id} 
          status={item.status} 
          onClick={(id, newStatus) => handleStatusChange(id, newStatus)} 
        />
        <div onClick={() => toggleDescriptionVisibility(item._id)} className={s.title}>
          {item.status === 'completed' ? 
            <span style={{ textDecoration: 'line-through' }}>{item.title}</span> : 
            <span>{item.title}</span>}
        </div>
        <div className={s.remove_edit}>
          <DrawOutlinedIcon style={{ zIndex: '300' }} onClick={() => setCurrentTodo(item)} />
          <RemoveButton id={item._id} />
        </div>
        {isDescriptionVisible && (
          <div className={s.description} style={item.status === 'completed' ? { textDecoration: 'line-through' } : null}>
            {item.description}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={s.main}>
      {currentTodo && (
        <UpdateTaskModal
          todo={currentTodo}
          onClose={() => setCurrentTodo(null)}
        />
      )}
      {list}
      <div className={s.create_new}>
        <CreateTaskButton onClick={onOpenCreateModal} />
      </div>
    </div>
  );
}
