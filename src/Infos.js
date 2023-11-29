import { useState } from 'react'
import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import desenho from '../public/images/desenho.png'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

function Infos() {
  const navigate = useNavigate();

  const handleCadastrar = () => {
    navigate('/ ');
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://math-barber.onrender.com/cliente', values)
      const novoCliente = response.data;
    } catch (error) {

    }
  }

  const handleEntrar = () => {
    navigate('/login')
  }


  const initialValues = {
    nomeCliente: '',
    senhaCliente: '',
    emailCliente: '',
  }

  return (
    <>
      <div className='geral'>
        <div className='topo'>
          <div className='corpo'>
            <div className='botao_topo'>
              <button className='botao_entrar'> Entrar </button>
              <img src={logo_insta} className='logo_insta' />
            </div>

            <img src={logo_math} className='logo_math' />
          </div>
          
        </div>
      </div>

    </>
  )
}

export default Infos
