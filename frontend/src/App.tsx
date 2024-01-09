import s from './App.module.scss'
import Completed from './Todo/Completed'
import List from './Todo/List'
import Nav from './Todo/Nav/Nav'
import {  Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
      <div className={s.root}>
        <div className={s.container}>
          <Nav />
          <Routes>
            <Route path="/tasks" element={<List />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/inprogress" element={<div>In Progress</div>} />
            <Route path="/pending" element={<div>Pending</div>} />
          </Routes>
        </div>
      </div>
  );
}

export default App
