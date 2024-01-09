import React, { useEffect } from 'react';
import { getAllTodos } from '../store/api';
import useTodoStore from '../store/store';
import { Todo } from '../store/interfaces';
import s from './List.module.scss';
import StatusIcon from './StatusIcon';


type Props = {}

export default function List({ }: Props) {
    const { todos, setTodos } = useTodoStore((state) => ({
        todos: state.todos,
        setTodos: state.setTodos
    }));

    useEffect(() => {
        let isMounted = true;
        getAllTodos().then((data: Todo[]) => {
            if (isMounted) {
                setTodos(data);
            }
        }).catch(error => {
            console.error("Failed to fetch todos:", error);
        });

        // Функция очистки для сброса флага isMounted при размонтировании компонента
        return () => {
            isMounted = false;
        };
    }, [setTodos]);

    const list = todos.map((item: Todo) => {

        return <div key={item._id} id={item._id} className={s.container}>
            <StatusIcon status={item.status} />
            <div className={s.title} style={ item.status === 'completed' ? { textDecoration: 'line-through'} : {}}>
                {item.title}
            </div>
           <div className={s.description}>
            { item.status === 'completed' ? <></> : <>{item.description}</> }
           </div>
 
        </div>
    })

    return (
        <div>
            {list}
        </div>
    );
}