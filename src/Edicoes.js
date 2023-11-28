import { useState, useEffect } from 'react'
import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import desenho from './images/desenho.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

function Edicoes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agendamento, nome, id } = location.state;
  
  useEffect(() => {
    console.log('Informações recebidas na página de Edições:');
    console.log('Agendamento:', agendamento);
    console.log('Nome:', nome);
    console.log('ID:', id);
  }, [agendamento, nome, id]);

  const handleCadastrar = () => {
    navigate('/');
  };

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const response = await axios.post('https://math-barber.onrender.com/cliente', values)
      const novoCliente = response.data;
      navigate('/login')
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
              <button className='botao_entrar' onClick={handleEntrar}> Entrar </button>
              <img src={logo_insta} className='logo_insta' />
            </div>

            <img src={logo_math} className='logo_math' />
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form className='form_registro'>
              <div className='form_cadastro'>
                <p className='registro'>Edite seu agendament</p>

                <div className='formulario'>
                  <Field type="text" id="nomeCliente" name="nomeCliente" placeholder='Nome completo' defaultValue={nome.nomeCliente} />
                </div>
                <div className='formulario'>
                  <Field type="email" id="emailCliente" name="emailCliente" placeholder='Email' defaultValue={nome.nomeCliente} />
                </div>
                <div className='formulario'>
                  <Field type="password" id="senhaCliente" name="senhaCliente" placeholder='Digite sua senha' />
                </div>
              </div>
              <div className='rodape'>
                <div className='line'></div>
                
                  <button className='cadastrar' type='submit'>Cadastrar</button>
                  <button className='cadastrar' >Cancelar</button>
                </div>

              
            </Form>
          </Formik>
        </div>
      </div>

    </>
  )
}

export default Edicoes

