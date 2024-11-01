import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";


const SettingsPage = () => {
  return (
    <>
      <Header />

      <div className='flex'>
        <Navbar />
        Налаштування
      </div>
    </>
  );
};

export default SettingsPage;
