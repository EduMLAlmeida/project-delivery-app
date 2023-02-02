import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';

function Manager() {
  const [managerName, setManagerName] = useState('');
  const [conflicted, setConflicted] = useState(false);
  const [token, setToken] = useState('');

  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const getManagerFromStorage = () => {
    const userData = localStorage.getItem('user');
    const userDataObj = JSON.parse(userData);
    setManagerName(userDataObj.name);
    setToken(userDataObj.token);
  };

  const validateEmail = () => {
    const { email } = register;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = () => {
    const { password } = register;
    const NUM = 6;
    const teste = password.length >= NUM;
    return teste;
  };

  const validateName = () => {
    const { username } = register;
    const NUM = 12;
    const teste = username.length >= NUM;
    return teste;
  };

  const handleChange = ({ id, value }) => {
    setRegister((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const clickRegister = async () => {
    const { username, email, password, role } = register;
    const options = {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    };

    const conflictedTest = 409;
    const createdTest = 201;

    try {
      const response = await fetch('http://localhost:3001/admin', options);

      if (response.status === conflictedTest) {
        setConflicted(true);
      }
      if (response.status === createdTest) {
        setConflicted(false);
        setRegister({
          username: '',
          email: '',
          password: '',
          role: 'seller',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getManagerFromStorage();
  }, []);

  return (
    <div>
      <Navbar
        username={ managerName }
      />
      <label>
        Nome:
        <input
          id="username"
          type="text"
          data-testid="admin_manage__input-name"
          placeholder="Enter your name"
          onChange={ (event) => handleChange(event.target) }
        />
      </label>
      <label>
        Email:
        <input
          id="email"
          type="email"
          data-testid="admin_manage__input-email"
          placeholder="Enter your email"
          onChange={ (event) => handleChange(event.target) }
        />
      </label>
      <label>
        Senha:
        <input
          id="password"
          type="password"
          data-testid="admin_manage__input-password"
          placeholder="Enter your password"
          onChange={ (event) => handleChange(event.target) }
        />
      </label>
      <label>
        Tipo:
        <select
          type="select"
          data-testid="admin_manage__select-role"
          id="role"
          onChange={ (event) => handleChange(event.target) }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ !(validateEmail() && validatePassword() && validateName()) }
        onClick={ () => clickRegister() }
      >
        Cadastrar
      </button>
      {
        conflicted
          ? <p data-testid="admin_manage__element-invalid-register"> Usuário existe </p>
          : null
      }
    </div>
  );
}

export default Manager;
