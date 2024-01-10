import { useState } from 'react';
import s from './App.module.scss'
import Completed from './Todo/Completed'
import List from './Todo/List'
import CreateTaskModal from './Todo/Modals/CreateTaskModal';
import Nav from './Todo/Nav/Nav'
import {  Routes, Route, Link } from 'react-router-dom';
import CreateTaskButton from './Todo/Func_Icons/CreateTaskButton';
import Pending from './Todo/Pending';
import InProgress from './Todo/InProgress';

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
       
        
        {!isCreateModalOpen &&  <Nav />}
      {isCreateModalOpen && <CreateTaskModal onClose={handleCloseCreateModal}/>}
        <Routes>

          <Route path="/tasks" element={<List onOpenCreateModal={handleOpenCreateModal}/>} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/inprogress" element={<InProgress />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;