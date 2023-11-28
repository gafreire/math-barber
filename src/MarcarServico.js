import { useState } from 'react'
import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import { useNavigate } from 'react-router-dom';
import CalendarioBarbearia from './CalendarioBarbearia';
import {
  UserOutlined
} from '@ant-design/icons';

function MarcarServico() {
  const navigate = useNavigate();

  const handleCadastrar = () => {
    navigate('/');
  };

  const handleInicio = () => {
    navigate('/inicio');
  };

  const [funcionario, setFuncionario] = useState(''); // Estado para armazenar o funcionário selecionado
  const [data, setData] = useState(''); // Estado para armazenar a data selecionada
  const [horario, setHorario] = useState(''); // Estado para armazenar o horário selecionado

  const handleFuncionarioClick = (nome) => {
    setFuncionario(nome);
  };

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleHorarioChange = (e) => {
    setHorario(e.target.value);
  };

  const generateHorarios = () => {
    const horarios = [];
    for (let hora = 9; hora <= 19; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        if (!(hora === 13 && minuto === 0) && !(hora === 19 && minuto !== 0)) {
          const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
          horarios.push(horaFormatada);
        }
      }
    }
    return horarios;
  };

  const funcionarios = [
    { nome: 'Gui'},
    { nome: 'Fe' },
    { nome: 'Math'},
  ];

  const horariosDisponiveis = generateHorarios();

  return (
    <>
    <div className='geral'>
        <div className='topo'>
            <div className='corpo'>
                <div className='botao_topo'>
                    <button className='botao_entrar' onClick={handleInicio}> Entrar </button>
                    <img src={logo_insta} className='logo_insta'/>
                </div>
                <img src={logo_math} className='logo_math' />
            </div> 
            <div className='form_cadastro'>
                <CalendarioBarbearia />
            </div>  
        </div>
        <div className='rodape'>
            <div className='line'></div>
                <button className='cadastrar' onClick={handleCadastrar}>Realizar Agendamento</button>
            </div>
        </div>
      
    </>
  )
}

export default MarcarServico
