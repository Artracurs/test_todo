import { useState, useEffect } from 'react';
import useTodoStore from '../../store/store'; 
import { Todo } from '../../store/interfaces'; 
import s from './Pending.module.scss'; 
import StatusIcon from '../StatusIcon';
import RemoveButton from '../Func_Icons/RemoveButton';

type Props = {}

export default function Pending({}: Props) {
    const { todos } = useTodoStore(state => ({ todos: state.todos }));
    const pendingTasks = todos.filter(todo => todo.status === 'pending');

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

    return (
        <div className={s.main}>
            {pendingTasks.map((item: Todo) => {
                const isDescriptionVisible = visibleDescriptions[item._id] ?? false;

                return (
                    <div key={item._id} id={item._id} className={s.container}>
                        <StatusIcon status={item.status} />
                        <div onClick={() => toggleDescriptionVisibility(item._id)} className={s.title}>
                            {item.title}
                        </div>
                        <div className={s.remove_edit}>
                            <RemoveButton id={item._id} />
                        </div>
                        {!isDescriptionVisible && (
                            <div className={s.description}>{item.description}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
