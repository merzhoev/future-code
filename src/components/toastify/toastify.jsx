import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastify.scss';

export function Toastify(props) {
  return <ToastContainer {...props} />;
}
