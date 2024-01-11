// import React, { useState } from 'react';
// import s from './CreateTaskModal.module.scss';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useTodoStore from '../../store/store';
// import { updateTodo } from '../../store/api';

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     background: {
//       paper: '#000',
//       default: '#000',
//     },
//     text: {
//       primary: '#fff',
//       secondary: '#555',
//     },
//   },
// });

// type Props = {
//   todo: any; // Используйте правильный тип для 'todo', например Todo из интерфейсов
//   onClose: () => void;
// };

// const EditTaskModal: React.FC<Props> = ({ todo, onClose }) => {
//   const [title, setTitle] = useState<string>(todo.title);
//   const [description, setDescription] = useState<string>(todo.description);
//   const updateTodoInStore = useTodoStore((state) => state.updateTodoInStore);
//   const [useDarkTheme, setUseDarkTheme] = useState(true);

//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.ctrlKey && event.key === 'Enter') {
//       handleUpdate();
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedTodo = await updateTodo(todo._id, { title, description });
//       updateTodoInStore(updatedTodo);
//       onClose();
//     } catch (error) {
//       console.error('Error while updating todo:', error);
//     }
//   };

//   return (
//     <из theme={useDarkTheme ? darkTheme : lightTheme}>
//       <div className={s.container}>
//         <div className={s.modal}>
//           <h2 className={s.header}>EDIT TASK</h2>
//           <div>
//             <TextField
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onKeyDown={handleKeyDown}
//               maxRows={2}
//               multiline
//               className={s.el}
//               id="title-input"
//               label="Title"
//               variant="standard"
//             />
//           </div>
//           <div>
//             <TextField
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               onKeyDown={handleKeyDown}
//               maxRows={10}
//               multiline
//               className={s.el}
//               id="description-input"
//               label="Description"
//               variant="standard"
//               style={{ margin: '10px 0 0 0' }}
//             />
//           </div>
//           <p style={{ color: 'gray', fontSize: '0.8em' }}>Use Ctrl+Enter to update Task</p>
//           <div className={s.button}>
//             <Button onClick={onClose} className={s.el} variant="outlined" color="error">
//               Cancel
//             </Button>
//             <Button onClick={handleUpdate} className={s.el} variant="contained">
//               Update
//             </Button>
//           </div>
//         </div>
//       </div>
//     </и>
//   );
// };

// export default EditTaskModal;