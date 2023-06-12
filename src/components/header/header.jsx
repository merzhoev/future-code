import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoIcon from 'assets/images/logo.svg';
import cartIcon from 'assets/images/cart.svg';
import userIcon from 'assets/images/user.svg';
import orderIcon from 'assets/images/order.svg';
import coinIcon from 'assets/images/coin.svg';
import { Modal } from 'components/modal';
import { Cart } from 'components/cart';
import { AddCard } from 'components/add-card';
import './header.scss';
import { notify } from 'components/toastify';
import { ModalAuth } from 'components/modal-auth';

export function Header() {
  const [isCartModalShown, setIsCartModalShown] = useState(false);
  const [isAddCardModalShown, setIsAddCardModalShown] = useState(false);
  const [isModalAuthShown, setIsModalAuthShown] = useState(false);
  const user = useSelector((state) => state.user.data);

  const onModalAuthShown = () => {
    setIsModalAuthShown(true);
    // notify(
    //   <p>
    //     <span onClick={() => console.log('hello')}>Авторизуйтесь</span>, чтобы у вас был доступ к
    //     этому функционалу
    //   </p>,
    //   'failed',
    // );
  };

  return (
    <header className="header">
      <div className="header__inner ">
        <ModalAuth isShown={isModalAuthShown} onClose={() => setIsModalAuthShown(false)} />
        <Link to="/">
          <img className="header__logo" src={logoIcon} alt="logo" />
        </Link>
        <div className="header__details">
          {user !== null && (
            <span
              style={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}
              className="header__detail">
              {user?.money ?? 0}
              <img className="coin-l" src={coinIcon} alt="coin" />
            </span>
          )}
          {/* <span className="header__detail">{user?.money ?? 0} Х</span> */}
          <button
            onClick={user ? () => setIsCartModalShown(true) : onModalAuthShown}
            className="header__detail header__detail--button">
            <img src={cartIcon} alt="cart" />
          </button>
          {user === null ? (
            <button onClick={onModalAuthShown} className="header__detail header__detail--button">
              <img src={userIcon} alt="user" />
            </button>
          ) : (
            <Link to="/profile">
              <button className="header__detail header__detail--button">
                <img src={userIcon} alt="user" />
              </button>
            </Link>
          )}
          {user !== null && user.is_admin && (
            <>
              <button
                onClick={() => setIsAddCardModalShown(true)}
                className="header__detail header__detail--button header__detail--add-btn">
                +
              </button>
              <Link to="/orders">
                <button className="header__detail header__detail--button">
                  <img width={22} src={orderIcon} alt="order" />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Modal onClose={() => setIsCartModalShown(false)} isShown={isCartModalShown}>
        <Cart />
      </Modal>
      <Modal onClose={() => setIsAddCardModalShown(false)} isShown={isAddCardModalShown}>
        <AddCard />
      </Modal>
    </header>
  );
}
