import { useState } from 'react';
import { Formik, Form, Field } from 'formik'; // Importar Formik e Field
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo_math from './images/logo_math.png';
import logo_insta from './images/logo_insta.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleCadastrar = () => {
    navigate('/cadastrar');
  };

  const handleInicio = () => {
    navigate('/inicio');
  };

  const initialValues = {
    emailCliente: '',
    senhaCliente: '',
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(values) {
    try {
      const response = await axios.post('https://math-barber.onrender.com/login', values);
      console.log(response)
      if (response.status == 200) {
        navigate('/inicio', { 
          state: { 
            nome: response.data.nome, 
            id: response.data.id
          } });
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="geral">
      <div className="topo">
        <div className="corpo">
          <div className="botao_topo">
            <button className="botao_entrar" onClick={handleCadastrar}>
              Registrar
            </button>
            <img src={logo_insta} className="logo_insta" alt="Instagram" />
          </div>
          
          <img src={logo_math} className="logo_math" alt="Logo Math" />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className='form_registro'>
            <div className="form_cadastro">
              <p className="registro">LOGIN</p>

              <div className="formulario">
                <Field
                  type="email"
                  id="emailCliente"
                  name="emailCliente"
                  placeholder="Email"
                />
              </div>
              <div className="formulario">
                <Field
                  type="password"
                  id="senhaCliente"
                  name="senhaCliente"
                  placeholder="Senha"
                />
              </div>
            </div>
            
            <div className="rodape">
            <div className="line"></div>
              <button className="cadastrar" type="submit">
                Entrar
              </button>
              <p>
                Ainda não possui conta?
                <a onClick={handleCadastrar}>Registre-se</a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
