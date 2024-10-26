import React from 'react';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";


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
