import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";


const TaskPage = () => {
  return (
    <>
      <Header />

      <div className='flex'>
        <Navbar />
        Завдання
      </div>
    </>
  );
};

export default TaskPage;
