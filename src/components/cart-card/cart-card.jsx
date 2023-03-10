import React from 'react';
import trashIcon from 'assets/images/trash.svg';
import coinIcon from 'assets/images/coin.svg';
import { useDispatch } from 'react-redux';
import { cartActions } from 'store/slices/cartSlice';

export function CartCard({ id, title, image, totalPrice, amount }) {
  const dispatch = useDispatch();
  const isMinusButtonDisabled = amount === 1;

  function handleRemoveClick() {
    dispatch(cartActions.removeProduct(id));
  }

  function handlePlusClick() {
    dispatch(cartActions.plusProduct(id));
  }

  function handleMinusClick() {
    dispatch(cartActions.minusProduct(id));
  }

  return (
    <>
      <div className="cart-card">
        <div className="cart-card__inner">
          <img className="cart-card__image" src={image} alt="card" />
          <h3 className="cart-card__title">{title}</h3>
          <div className="cart-card__buttons">
            <button
              disabled={isMinusButtonDisabled}
              onClick={handleMinusClick}
              className="cart-card__button">
              -
            </button>
            <span className="cart-card__amount">{amount}</span>
            <button onClick={handlePlusClick} className="cart-card__button">
              +
            </button>
          </div>
          <span
            style={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}
            className="cart-card__price">
            {totalPrice} <img className="coin-m" src={coinIcon} alt="coin" />
          </span>
          <button onClick={handleRemoveClick} className="cart-card__detail">
            <img src={trashIcon} alt="cart" />
          </button>
        </div>
      </div>
    </>
  );
}
