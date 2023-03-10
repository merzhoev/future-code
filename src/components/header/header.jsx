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

export function Header() {
  const [isCartModalShown, setIsCartModalShown] = useState(false);
  const [isAddCardModalShown, setIsAddCardModalShown] = useState(false);
  const user = useSelector((state) => state.user.data);

  return (
    <header className="header">
      <div className="header__inner ">
        <Link to="/">
          <img className="header__logo" src={logoIcon} alt="logo" />
        </Link>
        <div className="header__details">
          <span
            style={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}
            className="header__detail">
            {user?.money ?? 0}
            <img className="coin-l" src={coinIcon} alt="coin" />
          </span>
          {/* <span className="header__detail">{user?.money ?? 0} Х</span> */}
          <button
            onClick={() => setIsCartModalShown(true)}
            className="header__detail header__detail--button">
            <img src={cartIcon} alt="cart" />
          </button>
          <Link to="/profile">
            <button className="header__detail header__detail--button">
              <img src={userIcon} alt="user" />
            </button>
          </Link>
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
