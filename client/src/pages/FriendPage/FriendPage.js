import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

const FriendPage = () => {
  return (
    <>
      <Header />

      <div className='flex'>
        <Navbar />
        Друзі
      </div>
      
    </>
  );
};

export default FriendPage;
