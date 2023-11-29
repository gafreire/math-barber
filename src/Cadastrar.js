import { useState } from 'react'
import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import desenho from './images/desenho.png'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2'


function Cadastrar() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://math-barber.onrender.com/cliente', values)
      const novoCliente = response.data;
      navigate('/login')
    } catch (error) {
      console.log(error)
      console.log(JSON.parse(error.request.response).error)
      if(error.response.data == 'E-mail já cadastrado') {
        Swal.fire({
          title: "Erro!",
          text: "E-mail já cadastrado!",
          icon: "error"
        });
      } else {
      Swal.fire({
        title: "Erro!",
        text: "Preencha todos os dados!",
        icon: "error"
      });}
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
              <button className='botao_entrar' onClick={handleEntrar}> Entrar </button>
              <a href="https://www.instagram.com/math_barber10/" target="_blank" rel="noopener noreferrer">
            <img src={logo_insta} className='logo_insta' /> </a>
            </div>

            <img src={logo_math} className='logo_math' />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form className='form_registro'>
              <div className='form_cadastro'>
                <p className='registro'>REGISTRO</p>

                <div className='formulario'>
                  <Field type="text" id="nomeCliente" name="nomeCliente" placeholder='Nome completo' />
                </div>
                <div className='formulario'>
                  <Field type="email" id="emailCliente" name="emailCliente" placeholder='Email' />
                </div>
                <div className='formulario'>
                  <Field type="password" id="senhaCliente" name="senhaCliente" placeholder='Digite sua senha' />
                </div>
              </div>
              <div className='rodape'>
                <div className='line'></div>
                
                  <button className='cadastrar' type='submit'>Cadastrar</button>
                  <p> Já possui conta?
                    <a onClick={handleEntrar} > Entrar</a></p>
                </div>

              
            </Form>
          </Formik>
        </div>
      </div>

    </>
  )
}

export default Cadastrar
