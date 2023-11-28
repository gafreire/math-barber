const express = require('express');
const routes = express.Router();
const clienteController = require('../API/src/controller/clienteController');
const loginController = require('./src/controller/loginController');
const funcionarioController = require('./src/controller/funcionarioController');
const agendamentoController = require('./src/controller/agendamentoController');
const servicoController = require('./src/controller/servicoController');

routes.post('/cliente', clienteController.create)
routes.get('/cliente', clienteController.View)
routes.post('/login', loginController.login)
routes.get('/funcionario', funcionarioController.funcionario)
routes.get('/servico', servicoController.servico)
routes.post('/agendamento', agendamentoController.agendar)
routes.get('/agendamento', agendamentoController.ViewAgendamento)
routes.get('/horaOcupada', agendamentoController.horariosOcupados)
routes.post('/agendamento/:id', agendamentoController.deletarAgendamento);

module.exports = routes