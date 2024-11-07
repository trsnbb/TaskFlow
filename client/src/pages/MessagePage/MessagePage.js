import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Message from "../../components/Message/Message";

const MessagePage = () => {
  return (
    <>
      <Header />
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div className="main-content">
        <Message />
      </div>
    </>
  );
};

export default MessagePage;
