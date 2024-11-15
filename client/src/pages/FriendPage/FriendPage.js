import React from 'react';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Friends from '../../components/Friends/Friends';

const FriendPage = () => {
  return (
    <>
       <Header />
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div className="main-content">
        <Friends/>
      </div>
      
    </>
  );
};

export default FriendPage;
