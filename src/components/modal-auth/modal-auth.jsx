import { Modal } from 'components/modal';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from 'store/slices/userSlice';
import { getOrders } from 'store/slices/ordersSlice';
import logo from 'assets/images/newLogo.svg';

import './modal-auth.scss';
import { $api } from 'services/api';

export function ModalAuth(props) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    $api
      .login(login, pass)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          dispatch(getUser());
          dispatch(getOrders());
          setError(false);
          props.onClose();
        }
      })
      .catch(() => setError(true));
  };

  return (
    <Modal {...props}>
      <div className="login-form">
        <div className="login-form__container">
          <img src={logo} alt="logo" />
          <form onSubmit={onFormSubmit}>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              placeholder="Логин"
              className="login-form__input"
            />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="text"
              placeholder="Пароль"
              className="login-form__input"
            />
            <button className="login-form__button">войти</button>
            {error && (
              <label style={{ textAlign: 'center' }} className="error" htmlFor="error">
                Неверный логин или пароль
              </label>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
}
