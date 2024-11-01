import React from 'react';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";


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
