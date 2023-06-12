import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { useDispatch } from 'react-redux';
import { getUser } from 'store/slices/userSlice';
import { getOrders } from 'store/slices/ordersSlice';

export function AuthLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUser());
      dispatch(getOrders());
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
