import { useEffect, useState } from 'react';
import './App.css';
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import { useLocation, useNavigate } from 'react-router-dom';
import desenho from './images/desenho.png';
import { Card } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined, HomeOutlined, EditOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'

function Agendamentos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState([]);
  const [responseServico, setResponseServico] = useState([]);
  const [dataFormatada, setDataFormatada] = useState([])
  const nomeCliente = location.state.nome.nomeCliente;
  const nomeClienteNovo = location.state.nome; 
  const idCliente = location.state.id;


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://math-barber.onrender.com/agendamento');
      const responseServico = await axios.get('https://math-barber.onrender.com/servico');
      setResponse(response.data.resposta);
      setResponseServico(response.data.resposta)
    };


    fetchData()
      .catch(console.error);
  }, []);

  function formatarDataBR(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Lembrando que os meses em JavaScript começam em 0
    const ano = dataObj.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }

  const handleAgendar = () => {
    navigate('/CalendarioBarbearia', { 
      state: { 
        nome: nomeClienteNovo, 
        id: idCliente
      } });
  };

  const handleInicio = () => {
    navigate('/inicio', { 
      state: { 
        nome: nomeClienteNovo, 
        id: idCliente
      } });
  };
  
  const handleDeletar = async (idAgendamentos) => {
    try {
      // Faça uma requisição para deletar o agendamento com base no ID
      await axios.post(`https://math-barber.onrender.com/agendamento/${idAgendamentos}`);
      Swal.fire({
        title: "Sucesso!",
        text: "Agendamento cancelado com sucesso!",
        icon: "success"
      });
      // Atualize o estado para refletir a deleção
      setResponse(response.filter(item => item.idAgendamentos !== idAgendamentos));
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
    }
  };

  const handleEditar = async (idAgendamentos) => {
    try {
      // Aqui você pode obter o agendamento específico com base no ID, se necessário
      const agendamentoSelecionado = response.find(item => item.idAgendamentos === idAgendamentos);
  
      // Navegue para a página de edições e envie as informações do agendamento
      navigate('/edicoes', { 
        state: { 
          agendamento: agendamentoSelecionado,
          nome: nomeClienteNovo, 
          id: idCliente
        } 
      });
    } catch (error) {
      console.error('Erro ao editar agendamento:', error);
    }
  };
  

  return (
    <div className='geral'>
      <div className='topo'>
        <div className='corpo'>
          <div className='botao_topo'>
            <button className='botao_entrar' onClick={handleInicio}> <HomeOutlined style={{ fontSize: '20px' }} /> </button>
            <a href="https://www.instagram.com/math_barber10/" target="_blank" rel="noopener noreferrer">
            <img src={logo_insta} className='logo_insta' /> </a>
          </div>

          <img src={logo_math} className='logo_math' />
        </div>
        <div className='card'>
        {response.filter(item => item.nomeCliente === nomeCliente).length > 0 ? (
          response.map((item, index) => (
            item.nomeCliente === nomeCliente && (
              <Card
                key={index}
                title={`Agendamento com ${item.nomeFuncionario} `}
                bordered={false}
                style={{ width: 300, background: '#BD00FF', color: 'white' }}
                extra={<div>
                  <button className='botao_deletar' onClick={() => handleDeletar(item.idAgendamentos)}>
                    <DeleteOutlined style={{ fontSize: '20px' }} />
                  </button>
                  
                </div> }
              >
                <p>Data: {formatarDataBR(item.data)}</p>
                <p>Hora: {item.hora}</p>
                <p>Serviço: {item.nomeServico}</p>
                <p>Funcionário: {item.nomeFuncionario}</p>
                <p>Preço: {item.Preco}</p>
                {/* Adicione mais informações do objeto conforme necessário */}
              </Card>
            )
          ))
        ) : (
          <div className='rodape'>
            <p className='texto'>Você não possui nenhum agendamento! Realize agora!</p>
            <br></br>
            <button className='cadastrar' onClick={handleAgendar}>Agendar horário</button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Agendamentos;
