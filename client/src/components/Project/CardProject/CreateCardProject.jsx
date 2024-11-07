import React, { useEffect, useState } from "react";
import "./card-project.css";
import ColorPicker, { getRandomColor } from "./ColorPicker";
import axios from "./../../../axios";

export const ModalCreateProject = ({ isOpen, onClose }) => {
  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("block_modal")) {
      onClose();
    }
  };
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    color: getRandomColor(),
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color) => {
    setCreateData((prev) => ({ ...prev, color }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/project", createData);
      setError("");
      onClose();
    } catch (error) {
      console.error("Create error:", error);
      setError("Помилка при створенні проєкту");
    }
  };
  useEffect(() => {
    if (isOpen) document.body.classList.add("no-scroll");
    else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [[isOpen]]);
  if (!isOpen) return null;

  return (
    <div className='block_modal' onClick={handleBackgroundClick}>
      <div className='form_new_project'>
        <h2>Новий проєкт</h2>
        <form onSubmit={handleCreateSubmit}>
          <input
            type='text'
            placeholder='Назва проекту'
            name='name'
            value={createData.name}
            onChange={handleChange}
          />
          <textarea
            placeholder='Опис проєкту'
            name='description'
            id='description_area'
            value={createData.description}
            onChange={handleChange}
          ></textarea>
          <ColorPicker
            color={createData.color || getRandomColor()}
            onColorChange={handleColorChange}
          />
          <button type='submit'>Зберегти проект</button>
        </form>
        <span onClick={onClose}>&times;</span>
      </div>
    </div>
  );
};

const CreateCardProject = () => {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={openModal} className='container_card'>
        <div className='circle_add_project'>+</div>
        <span style={{ fontSize: "22px" }}>Додайте новий проєкт</span>
      </div>
      <ModalCreateProject isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CreateCardProject;
