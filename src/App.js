import { useState } from 'react'
import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import { useNavigate } from 'react-router-dom';
import desenho from './images/desenho.png';

function Login() {
  const navigate = useNavigate();

  const handleCadastrar = () => {
    navigate('/cadastrar');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
    <div className='geral'>
    <div className='topo'>
      <div className='corpo'>
        <div className='botao_topo'>
            <button className='botao_entrar' onClick={handleLogin}> Entrar </button>
            <a href="https://www.instagram.com/math_barber10/" target="_blank" rel="noopener noreferrer">
            <img src={logo_insta} className='logo_insta' /> </a>
        </div>
        
        <img src={logo_math} className='logo_math' />
      </div> 
      <div className='desenho'>
        <img src={desenho} />
      </div>  
      
    </div>
      <div className='rodape'>
        <div className='line'></div>
        <p className='texto'>Cabelo cortado é tudo que um homem precisa</p>
        <button className='cadastrar' onClick={handleCadastrar}>Cadastrar</button>
      </div>
    
    </div>
      
    </>
  )
}

export default Login
