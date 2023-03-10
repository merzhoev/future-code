import Order from "components/order/order";
import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import "./order-page.scss";

export function OrderPage() {
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="orders container">
      <div className="orders__title-container">
        <h1>Заказы</h1>
        {/* <input type="checkbox" /> */}
      </div>
      <div className="orders__list">
          {orders.map((order, index) =>(
            <Order {...order} key={index}/>
          ))}
      </div>
    </div>
  );
}
