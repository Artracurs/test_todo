import { useEffect, useState } from 'react';
import { getAllTodos } from '../store/api';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';
import s from './List.module.scss';
import StatusIcon from './StatusIcon';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

import RemoveButton from './Func_Icons/RemoveButton';
import CreateTask from './Func_Icons/CreateTask';

type Props = {}

export default function List({ }: Props) {
    const { todos, setTodos } = useTodoStore((state) => ({
        todos: state.todos,
        setTodos: state.setTodos
    }));

    const [visibleDescriptions, setVisibleDescriptions] = useState<{ [key: string]: boolean }>({});

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
                    <DrawOutlinedIcon />
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
         
            <div className={s.create_new}>
                <CreateTask />
            </div>
            {list}
            <div className={s.create_new}>
                <CreateTask />
            </div>
        </div>
    );
}