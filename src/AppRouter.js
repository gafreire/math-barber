// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cadastrar from './Cadastrar';
import App from './App';
import Login from './Login';
import Inicio from './Inicio';
import MarcarServico from "./MarcarServico";
import CalendarioBarbearia from './CalendarioBarbearia';
import Agendamentos from './Agendamentos';
import Edicoes from './Edicoes';

function AppRouter() {
  return (
    <Routes>
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/" element={<App />} />
      <Route path="/login" element= {<Login />} />
      <Route path="/inicio" element= {<Inicio />} />
      <Route path="/agendamentos" element= {<Agendamentos />} />
      <Route path="/CalendarioBarbearia" element= {<CalendarioBarbearia />} />
      <Route path="/edicoes" element={<Edicoes />} />
    </Routes>
  );
}

export default AppRouter;

