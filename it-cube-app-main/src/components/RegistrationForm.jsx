import React, { useState } from "react";
import "./RegistrationForm.css";
import Modal from "./Modal";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import { sendNewCode } from "../../../it-cude-server/controllers/nodemailer.controller"



const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailCheckPassword, setemailCheckPassword] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setModalContent({
        type: "error",
        message: "Пароли не совпадают. Повторите попытку",
      });
      return;
    }
    if (!/^[\w_]+$/.test(username)) {
      setModalContent({
        type: "error",
        message: "Недопустимый символ в логине",
      });
      return;
    }
    await setemailCheckPassword(
      Math.random().toString().split(".")[1].substr(0, 8)
    );
    // логика для отправки данных на сервер
    await axios.post("http://localhost:5000/rest-api/regUser", {
      user_login: username,
      user_mail: email,
      user_password: password,
      password_from_email: emailCheckPassword,
    });

    setShowConfirmModal(true); 
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleResendCode = () => {
    const handleResendCode = async () => {
      try {
        await sendNewCode(username, email, emailCheckPassword); // отправка нового кода на почту
        setemailCheckPassword(
          Math.random().toString().split(".")[1].substr(0, 8)
        );
        setModalContent(null);
        setShowConfirmModal(true);
      } catch (error) {
        setModalContent({
          type: "error",
          message: "Произошла ошибка при отправке кода. Попробуйте еще раз.",
        });
      }
    };
    
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="registration-form-field">
          <label htmlFor="username" className="registration-form-label">
            Логин
          </label>
          <input
            type="text"
            id="username"
            maxLength={255}
            minLength={3}
            value={username}
            onChange={handleUsernameChange}
            className="registration-form-input"
            required
          />
        </div>
        <div className="registration-form-field">
          <label htmlFor="email" className="registration-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="registration-form-input"
            required
          />
        </div>
        <div className="registration-form-field">
          <label htmlFor="password" className="registration-form-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            maxLength={255}
            minLength={7}
            value={password}
            onChange={handlePasswordChange}
            className="registration-form-input"
            required
          />
        </div>
        <div className="registration-form-field">
          <label htmlFor="confirmPassword" className="registration-form-label">
            Повторите пароль
          </label>
          <input
            type="password"
            id="confirmPassword"
            maxLength={255}
            minLength={7}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="registration-form-input"
            required
          />
        </div>
        <button type="submit" className="registration-form-button">
          Зарегистрироваться
        </button>
      </form>
      {modalContent && (
        <Modal
          type={modalContent.type}
          message={modalContent.message}
          onClose={() => setModalContent(null)}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal email={email} onClose={handleCloseModal} onResendCode={handleResendCode} />
      )}
    </div>
  );
};

export default RegistrationForm;
