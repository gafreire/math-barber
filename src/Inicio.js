import './App.css'
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined, LogoutOutlined
} from '@ant-design/icons';

function Inicio() {
  const navigate = useNavigate();
  const location = useLocation();
  const nomeCliente = location.state.nome;
  const idCliente = location.state.id;

  const handleCadastrar = () => {
    navigate('/agendamentos', { 
      state: { 
        nome: nomeCliente, 
        id: idCliente
      } });
  };

  const handleAgendamento = () => {
    navigate('/CalendarioBarbearia', { 
      state: { 
        nome: nomeCliente, 
        id: idCliente
      } });
  }

  const handleSair = () => {
    navigate('/');
  }

  return (
    <>
    <div className='geral'>
        <div className='topo'>
            <div className='corpo'>
                <div className='botao_topo'>
                    <button className='botao_entrar' onClick={handleSair}>
                    <LogoutOutlined style={{ fontSize: '20px' }} />
                    </button>
                    <a href="https://www.instagram.com/math_barber10/" target="_blank" rel="noopener noreferrer">
                    <img src={logo_insta} className='logo_insta' /> </a>
                </div>
                
                <img src={logo_math} className='logo_inicial' />
            </div> 
            <div className='text2'>
                <p>Cabelo cortado é tudo que um homem precisa</p>
            </div>
            
            <div className='botao_acao'>
                <button className='cadastrar' onClick={handleAgendamento}>Agende seu horário</button>
                <button className='cadastrar' onClick={handleCadastrar}>Agendamentos</button>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Inicio
