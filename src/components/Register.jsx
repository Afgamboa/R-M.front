import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import { register } from "./js/Login";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const history = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Debe ingresar un correo electrónico.";
    }
    if (!password) {
      errors.password = "Debe ingresar una contraseña.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Debe confirmar la contraseña.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
    if (!name) {
      errors.name = "Debe ingresar un nombre.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const res = await register(name, email, password);
    if (res.status === 200) {
      history("/home");
    }else {
      setErrors(res);
      setTimeout(() => {
        setErrors(null);
      }, 2000);
    }
  };

  return (
    <div className="register-container">
      <h2 className="website-title">Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingrese su contraseña"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Ingrese su contraseña de nuevo"
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Ingrese su nombre completo"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Registrarse
        </button>
        {errors.submit && (
          <div className="alert alert-danger mt-3">{errors.submit}</div>
        )}
      </form>
    </div>
  );
};

export default Register;