import reportWebVitals from './reportWebVitals';
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter (ou outra variante) aqui.
import AppRouter from './AppRouter'; // O seu componente de roteamento.

ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
