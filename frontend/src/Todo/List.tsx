import { useEffect, useState } from 'react';
import { getAllTodos, updateTodo } from '../store/api';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';
import s from './List.module.scss';
import StatusIcon from './StatusIcon';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
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
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    const openUpdateModal = (todo: Todo) => {
        setCurrentTodo(todo);
        setUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
        setCurrentTodo(null);
    };

    useEffect(() => {
        let isMounted = true;
        getAllTodos().then((data: Todo[]) => {
            if (isMounted) {
                setTodos(data);
            }
        }).catch(error => {
            console.error("Failed to fetch todos:", error);
        });

        const savedVisibility = sessionStorage.getItem('visibleDescriptions');
        if (savedVisibility) {
            setVisibleDescriptions(JSON.parse(savedVisibility));
        }

        return () => {
            isMounted = false;
        };
    }, [setTodos]);

    const toggleDescriptionVisibility = (id: string) => {
        const newVisibility = {
            ...visibleDescriptions,
            [id]: !visibleDescriptions[id]
        };
        setVisibleDescriptions(newVisibility);
        sessionStorage.setItem('visibleDescriptions', JSON.stringify(newVisibility));
    };

    const list = todos.map((item: Todo) => {
        const isDescriptionVisible = visibleDescriptions[item._id] ?? false;

        return (
            item.status === 'completed' ? <></> : <div key={item._id} id={item._id} className={s.container}>

                <StatusIcon status={item.status} />
                <div onClick={() => toggleDescriptionVisibility(item._id)} className={s.title} style={item.status === 'completed' ? { textDecoration: 'line-through' } : {}}>
                    {item.title}
                </div>
                <div className={s.remove_edit}>
                    {/* <SubjectOutlinedIcon /> */}
                    <DrawOutlinedIcon style={{ zIndex: '300' }} onClick={() => openUpdateModal(todo)} />
                    <RemoveButton id={item._id} />
                </div>
                <div className={s.listBtn} onClick={() => toggleDescriptionVisibility(item._id)}>
                </div>
                {isDescriptionVisible && (
                    <div className={s.description}>{item.description}</div>
                )}
            </div>
        )
    })

    return (
        <div className={s.main}>
            {currentTodo && (
                <UpdateTaskModal
                    todo={currentTodo}
                    onClose={closeUpdateModal}
                />
            )}
            <div className={s.create_new}>
                <CreateTaskButton onClick={onOpenCreateModal} />
            </div>
            {list}
            <div className={s.create_new}>
                <CreateTaskButton onClick={onOpenCreateModal} />
            </div>
        </div>
    );
}