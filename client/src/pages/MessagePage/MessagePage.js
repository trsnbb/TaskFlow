import React from 'react';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";


const MessagePage = () => {
  return (
    <>
      <Header />

      <div className='flex'>
        <Navbar />
        Повідомлення
      </div>
      
    </>
  );
};

export default MessagePage;
