import React, { useState } from "react";
import "./ModalAndButton.css";
import auth_photo from "./../../img/auth_photo.png";
import axios from "./../../axios";
import { useAuth } from "./../../AuthContext";
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
  const { isAuthenticated, login } = useAuth();
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };
  if (!isOpen) return null;
  const handleChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.emailOrUserName || !loginData.password) {
      setError("Будь ласка, заповніть всі поля для входу");
      return;
    }
    try {
      await login(loginData);
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        if (Array.isArray(error.response.data.errors)) {
          setError(error.response.data.errors.map((err) => err.msg).join(", "));
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Сталася помилка під час входу");
        }
      } else {
        setError("Сталася помилка під час входу");
      }
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }
    try {
      const response = await axios.post("/register", registerData);
      await login({
        emailOrUserName: registerData.email,
        password: registerData.password,
      });
      setError("");
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        if (Array.isArray(error.response.data.errors)) {
          setError(error.response.data.errors.map((err) => err.msg).join(", "));
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Сталася помилка під час реєстрації");
        }
      } else {
        setError("Сталася помилка під час реєстрації");
      }
    }
  };
  return (
    <div className='modal-overlay' onClick={onClose}>
      {" "}
      <div
        className={`modal-content ${isRegistering ? "move-left" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        <span className='close-btn' onClick={onClose}>
          {" "}
          &times;{" "}
        </span>{" "}
        {isRegistering ? (
          <div className='register-form'>
            {" "}
            <h2>Реєстрація</h2>{" "}
            <form onSubmit={handleRegisterSubmit}>
              {" "}
              <input
                className='input_reg'
                type='text'
                name='fullName'
                placeholder="Ім'я та прізвище"
                value={registerData.fullName}
                onChange={(e) => handleChange(e, setRegisterData)}
              />{" "}
              <input
                className='input_reg'
                type='email'
                name='email'
                placeholder='E-mail'
                value={registerData.email}
                onChange={(e) => handleChange(e, setRegisterData)}
              />{" "}
              <input
                className='input_reg'
                type='text'
                name='userName'
                placeholder='Нікнейм'
                value={registerData.userName}
                onChange={(e) => handleChange(e, setRegisterData)}
              />{" "}
              <input
                className='input_reg'
                type='password'
                name='password'
                placeholder='Пароль'
                value={registerData.password}
                onChange={(e) => handleChange(e, setRegisterData)}
              />{" "}
              <input
                type='password'
                name='confirmPassword'
                placeholder='Повторіть пароль'
                value={registerData.confirmPassword}
                onChange={(e) => handleChange(e, setRegisterData)}
              />{" "}
              <button type='submit'>Реєстрація</button>{" "}
            </form>{" "}
            <p>
              {" "}
              Вже є аккаунт?{" "}
              <a href='#' onClick={toggleForm}>
                Увійдіть
              </a>
            </p>
          </div>
        ) : (
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
              {error && <p className='error_message'>{error}</p>}

              <button type='submit'>Ввійти</button>
            </form>
            <p>
              Ще немає аккаунта?
              <a href='#' onClick={toggleForm}>
                Зареєструйтеся
              </a>
            </p>
          </div>
        )}
        <div className='image_section'>
          <img src={auth_photo} alt='Картинка' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
