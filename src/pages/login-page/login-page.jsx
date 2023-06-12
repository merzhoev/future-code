import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $api } from 'services/api';
import { isAuth } from 'services/useAuth';
import logo from 'assets/images/newLogo.svg';
import loginImg from 'assets/images/loginImg.png';
import './login-page.scss';

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    $api
      .login(login, pass)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          navigate('/');
        }
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (isAuth()) {
      navigate('/');
    }
  }, []);

  return (
    <div className="main">
      <div className="auth">
        <img src={logo} alt="logo" />
        <div className="auth__form">
          <input
            value={login}
            onChange={(change) => setLogin(change.target.value)}
            type="email"
            id="login"
            placeholder="Логин"
          />
          <input
            value={pass}
            onChange={(change) => setPass(change.target.value)}
            type="password"
            id="pass"
            placeholder="Пароль"
          />
          {error ? (
            <label className="error" htmlFor="error">
              Неверный логин или пароль
            </label>
          ) : (
            ''
          )}

          <button onClick={() => handleLogin()} className="auth__button">
            {' '}
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}
