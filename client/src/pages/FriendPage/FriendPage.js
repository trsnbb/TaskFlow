import React from 'react';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

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
