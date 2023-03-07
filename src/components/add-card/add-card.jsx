import React from 'react';
import { useSelector } from 'react-redux';
import { $api } from 'services/api';
import './add-card.scss';

export function AddCard() {
  const categories = useSelector((state) => state.category.items);

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { category } = Object.fromEntries(formData);

    $api
      .createProduct(formData)
      .then(({ data }) => {
        $api.addProductCategory({ product_id: data.product.id, category_id: +category });
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.reset();
  }

  return (
    <form onSubmit={onSubmit} className="add-card">
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
      </div>
    </form>
  );
}
