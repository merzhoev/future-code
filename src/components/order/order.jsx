import React from "react";
import "./order.scss";

export default function Order({ products, user }) {
  //   products.forEach(
  //     (product) => (product.image = `https://store.kod06.ru${product.image}`)
  //   );
  return (
    <div className="orderContainer order">
      <div className="order__user">
        <h3 className="order__title">{user.full_name}</h3>
        <h3> "{user.team_name}"</h3>
      </div>
      <ul className="order__products">
        {products.map((product) => (
          <li key={product.id} className="order__product">
            <div className="order__info" >
              <img
                className="order__img"
                src={`https://store.kod06.ru${product.image}`}
                alt="product-img"
              />
              <h4>{product.title}</h4>
            </div>
            <div>
                <h4>Кол-во {product.amount}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
