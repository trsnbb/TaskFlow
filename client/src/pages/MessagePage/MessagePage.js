import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";


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
