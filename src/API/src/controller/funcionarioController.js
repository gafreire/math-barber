const knex = require('../database');

module.exports = {
    async funcionario(req, res, next) {
        try {
            const nomeFuncionario = await knex('funcionario').select('nomeFuncionario')
            const idFuncionario = await knex('funcionario').select('idFuncionario')

            const options = []
            for(let i = 0; i <nomeFuncionario.length; i++) {
                options.push({
                    label: nomeFuncionario[i].nomeFuncionario,
                    value: idFuncionario[i].idFuncionario
                })
            }
            return res.status(200).json({
                options
            });
        } catch (error) {
            next(error);
        }
    }

   
};
