import { useEffect, useState } from 'react';
import useTodoStore from '../../store/store';
import { Todo } from '../../store/interfaces';
import s from './Completed.module.scss';
import StatusIcon from '../StatusIcon';
import RemoveButton from '../Func_Icons/RemoveButton';

export default function Completed() {
    const { todos } = useTodoStore((state) => ({
        todos: state.todos
    }));

    const [visibleDescriptions, setVisibleDescriptions] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const savedVisibility = sessionStorage.getItem('visibleDescriptions');
        if (savedVisibility) {
            setVisibleDescriptions(JSON.parse(savedVisibility));
        }
    }, []);

    const toggleDescriptionVisibility = (id: string) => {
        const newVisibility = {
            ...visibleDescriptions,
            [id]: !visibleDescriptions[id]
        };
        setVisibleDescriptions(newVisibility);
        sessionStorage.setItem('visibleDescriptions', JSON.stringify(newVisibility));
    };

    const completedTasksList = todos.filter(todo => todo.status === 'completed').map((item: Todo) => {
        const isDescriptionVisible = visibleDescriptions[item._id] ?? false;

        return (
            <div key={item._id} id={item._id} className={s.container}>
                <StatusIcon status={item.status} />
                <div onClick={() => toggleDescriptionVisibility(item._id)} className={s.title} style={{ textDecoration: 'line-through' }}>
                    {item.title}
                </div>
                <div className={s.remove_edit}>
                    <RemoveButton id={item._id} />
                </div>
                {isDescriptionVisible && (
                    <div className={s.description}>{item.description}</div>
                )}
            </div>
        );
    });

    return (
        <div className={s.main}>
            {completedTasksList}
        </div>
    );
}
