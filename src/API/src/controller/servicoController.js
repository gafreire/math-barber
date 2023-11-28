const knex = require('../database');

module.exports = {
    async servico(req, res, next) {
        try {
            const nomeServico = await knex('servico').select('nomeServico')
            const idServico = await knex('servico').select('idServico')

            const options = []
            for(let i = 0; i <nomeServico.length; i++) {
                options.push({
                    label: nomeServico[i].nomeServico,
                    value: idServico[i].idServico
                })
            }

            return res.status(200).json({
                options: options
            });
        } catch (error) {
            next(error);
        }
    }

   
};
