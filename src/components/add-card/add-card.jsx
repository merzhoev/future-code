import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { $api } from 'services/api';
import './add-card.scss';

export function AddCard() {
  const [productAddedStatus, setProductAddedStatus] = useState('idle');
  const categories = useSelector((state) => state.category.items);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { category } = Object.fromEntries(formData);

    setProductAddedStatus('idle');

    $api
      .createProduct(formData)
      .then(({ data }) =>
        $api.addProductCategory({ product_id: data.product.id, category_id: +category }),
      )
      .then(() => {
        setProductAddedStatus('success');
      })
      .catch((err) => {
        setProductAddedStatus('failed');
        console.log(err);
      });

    e.target.reset();
  }

  function onFocusForm() {
    setProductAddedStatus('idle');
  }

  return (
    <form onFocus={onFocusForm} onSubmit={onSubmit} className="add-card">
      <div className="add-card__inner">
        <div className="add-card__field-container">
          <label htmlFor="title">Название</label>
          <input
            className="add-card__input"
            id="title"
            name="title"
            type="text"
            placeholder="Введите название..."
          />
        </div>
        <div className="add-card__field-container">
          <label htmlFor="price">Цена</label>
          <input
            className="add-card__input"
            id="price"
            name="price"
            type="text"
            placeholder="Введите цену..."
          />
        </div>
        <div className="add-card__field-container">
          <label htmlFor="category">Категория</label>
          <select className="add-card__select" id="category" name="category">
            <option value="null">Все</option>
            {categories.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="add-card__field-container">
          <label htmlFor="image">Фотография</label>
          <input className="add-card__input" id="image" name="image" type="file" />
        </div>
        <button type="submit" className="add-card__button">
          Добавить товар
        </button>
        <div className="add-card__field-container">
          {productAddedStatus === 'success' && <p className="add-card__success">Товар добавлен!</p>}
          {productAddedStatus === 'failed' && <p className="add-card__failed">Произошла ошибка!</p>}
        </div>
      </div>
    </form>
  );
}
