import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from 'store/slices/cartSlice';
import { ReactComponent as DotsIcon } from 'assets/images/vertical-dots.svg';
import classNames from 'classnames';
import { useOutsideClick } from 'hooks/use-outside-click';
import { $api } from 'services/api';
import { notify } from 'components/toastify';
import coinIcon from 'assets/images/coin.svg';

import './product-card.scss';

export function ProductCard({ id, image, title, price, in_stock }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const isAdmin = user !== null && user.is_admin;
  const cartProducts = useSelector((state) => state.cart.items);
  const isCartAdded = cartProducts.some((card) => card.id === id);
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  function handleRemoveClick() {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      $api
        .editProduct(id, false)
        .then(() => notify('Товар удален', 'success'))
        .catch(() => notify('Произошла ошибка', 'failed'));
    }
  }

  const handleAddClick = () => {
    if (in_stock <= 0) {
      notify('Товара нет на складе', 'failed');
      return;
    }

    const cartProducts = {
      id,
      title,
      image,
      amount: 1,
      price,
      totalPrice: price,
    };
    dispatch(cartActions.setProducts(cartProducts));
  };

  const optionsRef = useOutsideClick(() => {
    setIsOptionsShown(false);
  });

  return (
    <div key={id} className="products-card">
      {isAdmin && (
        <div ref={optionsRef} className="products-card__options">
          <button
            onClick={() => setIsOptionsShown((is) => !is)}
            className="products-card__options-btn">
            <DotsIcon className="products-card__options-btn-icon" />
          </button>
          <ul
            className={classNames('products-card__options-list', {
              'products-card__options-list--open': isOptionsShown,
            })}>
            <li onClick={() => handleRemoveClick()} className="products-card__options-item">
              Удалить
            </li>
          </ul>
        </div>
      )}
      <img className="products-card__image" src={image} alt="card" />
      <div className="products-card__title-container">
        <h3 className="products-card__title">{title}</h3>
        <span
          style={{ display: 'flex', columnGap: '5px', alignItems: 'center' }}
          className="products-card__price">
          {price} <img className="coin-m" src={coinIcon} alt="coin" />
        </span>
      </div>
      {isAdmin && (
        <div className="products-card__title-container">
          <h3 className="products-card__title">Количество на складе</h3>
          <span className="products-card__price">{in_stock} шт.</span>
        </div>
      )}
      <div className="products-card__details">
        <button
          disabled={isCartAdded}
          onClick={() => handleAddClick()}
          className={
            isCartAdded
              ? 'products-card__detail products-card__detail--added'
              : 'products-card__detail'
          }>
          {isCartAdded ? 'Добавлено' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}
