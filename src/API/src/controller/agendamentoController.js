const knex = require('../database');

module.exports = {
    async agendar(req, res, next) {
        const {
            idCliente,
            idServico,
            idFuncionario,
            data,
            hora
        } = req.body;

        console.log(req)
        try {
            await knex('agendamentos').insert({
                cliente_idCliente: idCliente,
                servico_idServico: idServico,
                funcionario_idFuncionario: idFuncionario,
                data,
                hora,
                quantidadeServico: idServico == 3 ? 2 : 1
            });

            return res.status(201).send({
                message: 'Agendado',
            });
        } catch (error) {
            next(error);
        }
    },

    async ViewAgendamento(req, res, next) {
        try {
            const resposta = await knex('agendamentos')
                .select('agendamentos.*', 'servico.nomeServico', 'servico.Preco', 'funcionario.nomeFuncionario', 'cliente.nomeCliente')
                .join('servico', 'agendamentos.servico_idServico', '=', 'servico.idServico')
                .join('funcionario', 'agendamentos.funcionario_idFuncionario', '=', 'funcionario.idFuncionario')
                .join('cliente', 'agendamentos.cliente_idCliente', '=', 'cliente.idCliente' )

            return res.send({
                resposta,
            });
        } catch (error) {
            next(error);
        }
    },

    async horariosOcupados(req, res, next) {
        try {
            const horariosOcupados = await knex('agendamentos')
                .select(
                    'funcionario.idFuncionario',
                    'funcionario.nomeFuncionario',
                    'agendamentos.hora',
                    'agendamentos.data'
                )
                .join('funcionario', 'agendamentos.funcionario_idFuncionario', '=', 'funcionario.idFuncionario');

            return res.send({
                horariosOcupados,
            });
        } catch (error) {
            next(error);
        }
    },

    async deletarAgendamento(req, res, next) {
        const { id } = req.params;
        console.log

        try {
            // Verifique se o agendamento existe
            const agendamentoExiste = await knex('agendamentos')
                .where({ idAgendamentos: id })
                .first();

            if (!agendamentoExiste) {
                return res.status(404).send({
                    message: 'Agendamento não encontrado',
                });
            }

            // Deleta o agendamento
            await knex('agendamentos')
                .where({ idAgendamentos: id })
                .del();

            return res.status(200).send({
                message: 'Agendamento deletado com sucesso',
            });
        } catch (error) {
            console.log(req)
            next(error);
        }
    },
};
