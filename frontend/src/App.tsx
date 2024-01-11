import { useState } from 'react';
import s from './App.module.scss'
import Completed from './Todo/Completed/Completed'
import List from './Todo/List'
import CreateTaskModal from './Todo/Modals/CreateTaskModal';
import Nav from './Todo/Nav/Nav'
import { Routes, Route, Link } from 'react-router-dom';
import Pending from './Todo/Pending/Pending';
import InProgress from './Todo/InProgress/InProgress';
// import EditTaskModal from './Todo/Modals/EditTaskModal';
import Home from './Todo/Home/Home';
import UpdateTaskModal from './Todo/Modals/UpdateTaskModal';

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTaskToEdit, setCurrentTaskToEdit] = useState(null);

  const handleOpenEditModal = (task) => {
    setCurrentTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentTaskToEdit(null);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isCreateModalOpen && !isEditModalOpen && <Nav />}
        {isCreateModalOpen && <CreateTaskModal onClose={handleCloseCreateModal} />}
        {isEditModalOpen && currentTaskToEdit && 
        
        <UpdateTaskModal todo={currentTaskToEdit} onClose={handleCloseEditModal} />
        
        }

        {/* {isEditModalOpen && currentTaskToEdit && <EditTaskModal todo={currentTaskToEdit} onClose={handleCloseEditModal} />} */}

  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<List onOpenCreateModal={handleOpenCreateModal} onOpenEditModal={handleOpenEditModal} />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/inprogress" element={<InProgress />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;