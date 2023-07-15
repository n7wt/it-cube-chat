import React, { useState } from "react";

const PasswordRecoveryForm = ({ onCancel }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // логика восстановления пароля

    console.log("Email:", email);
    // ...
  };

  return (
    <div className="password-recovery-form-container">
      <h2 className="password-recovery-form-title">Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <div className="password-recovery-form-field">
          <label htmlFor="recovery-email" className="password-recovery-form-label">
            Email
          </label>
          <input
            type="email"
            id="recovery-email"
            value={email}
            onChange={handleEmailChange}
            className="password-recovery-form-input"
            required
          />
        </div>
        <div className="password-recovery-form-buttons">
          <button type="submit" className="password-recovery-form-button">
            Восстановить
          </button>
          <button type="button" onClick={onCancel} className="password-recovery-form-button cancel">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecoveryForm;
