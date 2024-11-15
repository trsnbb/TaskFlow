import React, { useState } from 'react';
import Modal from './Modal';
import './ModalAndButton.css';


const Button = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="open_modal">
        Авторизація
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Button;
