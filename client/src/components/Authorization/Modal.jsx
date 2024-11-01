import React, { useState } from "react";
import "./ModalAndButton.css";
import auth_photo from "./../../img/auth_photo.png";

const Modal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrUserName: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  if (!isOpen) return null;

  const handleChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    console.log("Register Data:", registerData);
    setError("");
    onClose();
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className={`modal-content ${isRegistering ? "move-left" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className='close-btn' onClick={onClose}>
          &times;
        </span>
        <div className='login-form'>
          <h2>Вхід</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              className='input_name'
              type='text'
              name='emailOrUserName'
              placeholder='Нікнейм/e-mail'
              value={loginData.emailOrUserName}
              onChange={(e) => handleChange(e, setLoginData)}
            />
            <input
              type='password'
              name='password'
              placeholder='Пароль'
              value={loginData.password}
              onChange={(e) => handleChange(e, setLoginData)}
            />
            <a href='#' className='forgot_password'>
              забули пароль?
            </a>
            <button type='submit'>Ввійти</button>
          </form>
          <p>
            Ще немає аккаунта?
            <a href='#' onClick={toggleForm}>
              Зареєструйтеся
            </a>
          </p>
        </div>

        <div className='image_section'>
          <img src={auth_photo} alt='Картинка' />
        </div>

        <div className='register-form'>
          <h2>Реєстрація</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input
              className='input_reg'
              type='text'
              name='fullName'
              placeholder="Ім'я та прізвище"
              value={registerData.fullName}
              onChange={(e) => handleChange(e, setRegisterData)}
            />
            <input
              className='input_reg'
              type='email'
              name='email'
              placeholder='E-mail'
              value={registerData.email}
              onChange={(e) => handleChange(e, setRegisterData)}
            />
            <input
              className='input_reg'
              type='text'
              name='userName'
              placeholder='Нікнейм'
              value={registerData.userName}
              onChange={(e) => handleChange(e, setRegisterData)}
            />
            <input
              className='input_reg'
              type='password'
              name='password'
              placeholder='Пароль'
              value={registerData.password}
              onChange={(e) => handleChange(e, setRegisterData)}
            />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Повторіть пароль'
              value={registerData.confirmPassword}
              onChange={(e) => handleChange(e, setRegisterData)}
            />
            {error && <p className='error-message'>{error}</p>}
            <button type='submit'>Реєстрація</button>
          </form>
          <p>
            Вже є аккаунт?
            <a href='#' onClick={toggleForm}>
              Увійдіть
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
