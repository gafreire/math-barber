import React, { useEffect, useState } from 'react';
import './App.css'; 
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';
import {
  HomeOutlined, UserOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2'

const CalendarioBarbearia = () => {
  const [funcionario, setFuncionario] = useState([]); // Estado para armazenar o funcionário selecionado
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState([])
  const [data, setData] = useState(''); // Estado para armazenar a data selecionada
  const [horario, setHorario] = useState(''); // Estado para armazenar o horário selecionado
  const [name, setName] = useState('');
  const location = useLocation();
  const [servico, setServico] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState('')
  const nomeCliente = location.state && location.state.nome;
  const idCliente = location.state && location.state.id;
  const [agendamentos, setAgendamentos] =  useState([])
  const [horariosOcupados, setHorariosOcupados] =  useState([])
  const [funcionarioSelecionadoClasse, setFuncionarioSelecionadoClasse] = useState('');
  const navigate = useNavigate();
  //const currentDate = new Date();

  // -------- <3 ----------------------
  const [ funcSelec, setFuncSelec] = useState(false)
  const [ dataSelec, setDataSelec] = useState(false)
  const [ horaSelec, setHoraSelec] = useState(false)


  useEffect(() => {

    const fetchData = async () => {
      console.log(nomeCliente)
      console.log(idCliente)
      const response = (await axios.get('https://math-barber.onrender.com/funcionario'))
      setFuncionario(response.data.options)

      const responseServico = (await axios.get('https://math-barber.onrender.com/servico'))
      setServico(responseServico.data.options)

      const agendamentos = await axios.get('https://math-barber.onrender.com/agendamento');
      setAgendamentos(agendamentos.data.resposta)

      const horariosOcupados = await axios.get('https://math-barber.onrender.com/horaOcupada');
      setHorariosOcupados(horariosOcupados.data.horariosOcupados)
      console.log(horariosOcupados.data.horariosOcupados)

      
    }

    fetchData() 
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const handleFuncionarioClick = (nome) => {
    setFuncionarioSelecionado(nome.value);
    setFuncionarioSelecionadoClasse('funcionario-selecionado');
    setFuncSelec(true)
    console.log(nome)
  };

  const handleHome = () => {
    navigate('/inicio', { 
      state: { 
        nome: nomeCliente, 
        id: idCliente
      } });
  }

  const handleDataChange = (e) => {
    setData(e.target.value);
    console.log(e.target.value)
    setDataSelec(true)
  };

  const handleHorarioChange = (e) => {
    setHorario(e.target.value);
    console.log(e.target.value)
    setHoraSelec(true)
  };

  const handleSelecionarServico = (e) => {
    setServicoSelecionado(e.target.value);
    console.log(e.target.value)
  };

  const generateHorarios = () => {
    const horarios = [];
  
    for (let hora = 9; hora <= 19; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
  
        // Exclui os horários entre 12:00 e 12:30
        var isHorarioValido = !(hora === 12 && minuto >= 0 && minuto <= 30);
  
        if (isHorarioValido) {
          // Adiciona o horário ao array
          horarios.push(horaFormatada);
        }
      }
    }
  
    if (isHorarioValido) {
      const selectedFunc = funcionarioSelecionado; // Substitua pelo valor real
      const selectedData = data;
  
      const horariosFiltrados = horariosOcupados
        .filter((agend) => agend.idFuncionario === selectedFunc);
      console.log(horariosFiltrados)
  
      const horariosFiltrados2 = horariosFiltrados
        .filter((agend) => agend.data === selectedData + 'T03:00:00.000Z');
      console.log(selectedData)
      console.log(horariosFiltrados2)
      // Remove os horários presentes em horariosFiltrados2 do array horarios
      horariosFiltrados2.forEach((agend) => {
        const horarioFormatado = agend.hora.slice(0, 5); // Remover os segundos
        const index = horarios.indexOf(horarioFormatado);
      
        if (index !== -1) {
          horarios.splice(index, 1);
        }
      });
    }
  
    return horarios;
  };
  
  const horariosDisponiveis = generateHorarios();
  
  

  const handleAgendamento = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data);
    selectedDate.setHours(0, 0, 0, 0);

    
  
    if (selectedDate < currentDate) {
      Swal.fire({
        title: "Erro!",
        text: "Você nao pode agendar em uma data passada!",
        icon: "error"
      });
      // Você pode exibir uma mensagem de erro para o usuário ou tomar outras ações necessárias.
    } else {
      if (!funcionarioSelecionado || !data || !horario || !servicoSelecionado) {
        Swal.fire({
          title: "Erro!",
          text: "Selecione todos os campos!",
          icon: "error"
        });
        return;
      } else {
        if (!funcionarioSelecionado || !data || !horario || !servicoSelecionado || servicoSelecionado === "") {
          alert("Por favor, preencha todos os campos antes de agendar.");
          return;
        } else {
          const response = await axios.post('https://math-barber.onrender.com/agendamento', {
            idCliente: idCliente.idCliente,
            idServico: servicoSelecionado,
            idFuncionario: funcionarioSelecionado,
            data: data,
            hora: horario
          });
          Swal.fire({
            title: "Sucesso!",
            text: "Horario marcado com sucesso!",
            icon: "success"
          });
          navigate('/inicio', { 
            state: { 
              nome: nomeCliente, 
              id: idCliente
            } });
        }
    }
      // Resto do código para lidar com a resposta da solicitação
    }
  };





  return (
    <>
      <div className='geral'>
        <div className='topo'>
          <div className='corpo'>
            <div className='botao_topo'>
              <button className='botao_entrar' onClick={handleHome}> 
              <HomeOutlined style={{ fontSize: '20px' }} />
              </button>
              <img src={logo_insta} className='logo_insta' />
            </div>
            <img src={logo_math} className='logo_math' />
          </div>
          <div className='tamanho'>
            <p className='titulos'>Selecione um funcionario</p>
            <div className="funcionarios-container">
              {funcionario.map((funcionarioItem) => (
                <div key={funcionarioItem.label} className={`funcionario`}>
                <button
                    className={`funcionario-button ${funcionarioItem.value === funcionarioSelecionado ? funcionarioSelecionadoClasse : ''}`}
                    onClick={() => handleFuncionarioClick(funcionarioItem)}
                  >
                    <UserOutlined style={{ fontSize: '50px' }} />
                  </button>
                  <div>{funcionarioItem.label}</div>
                </div>
              ))}
            </div>
            
            {funcSelec ? (
                <div>
                  <p className='titulos'>Selecione uma data:</p>
                  <div className='campo-dataHora'>
                    <input
                      type="date"
                      id="dataInput"
                      name="data"
                      value={data}
                      onChange={handleDataChange}
                      className="custom-date-select"
                      required
                    />
                  </div>
                </div>

                

              ) : null}

                {dataSelec ? (
                      <div>
                        <p className='titulos'>Selecione um horário:</p>
                        <div className='campo-dataHora'>
                          <select
                            id="horarioInput"
                            name="horario"
                            value={horario}
                            required
                            onChange={handleHorarioChange}
                            className="custom-date-select"
                          >
                            <option value="" disabled hidden>
                              Selecione um horário
                            </option>
                            {horariosDisponiveis.map((hora, index) => (
                              <option key={index} value={hora}>
                                {hora}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {horaSelec ? (
                      <div>
                        <p className='titulos'>Selecione um servico:</p>
                        <div className='campo-dataHora'>
                          <select
                            id="servicoInput"
                            name="servico"
                            value={servicoSelecionado}
                            onChange={handleSelecionarServico}
                            className="custom-date-select"
                            required
                          >
                          <option value="" disabled hidden>
                            Selecione um serviço
                          </option>
                            {
                              servico.map((servico) => (
                                <option value={servico.value}>
                                  {servico.label}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                    ) : null}

            
            

            
          </div>
        </div>
        <div className='rodape'>
          <div className='line'></div>
          <button className='cadastrar' onClick={handleAgendamento}>Realizar Agendamento</button>
        </div>

      </div>

    </>
  );

};
export default CalendarioBarbearia;

