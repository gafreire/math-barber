const knex = require('../database');

module.exports = {
    async login(req, res, next) {
        const { emailCliente, senhaCliente } = req.body;

        try {
            const cliente = await knex('cliente')
                .where('emailCliente', emailCliente)
                .where('senhaCliente', senhaCliente)
                .first();

            if (!cliente) {
                return res.status(401).json({
                    message: 'Credenciais inválidas',
                });
            }

            const nomeCliente = await knex('cliente').select('nomeCliente').where('emailCliente', emailCliente)
            .where('senhaCliente', senhaCliente).first()
            const idCliente = await knex('cliente').select('idCliente').where('emailCliente', emailCliente)
            .where('senhaCliente', senhaCliente).first()

            return res.status(200).json({
                message: 'Login bem-sucedido',
                nome: nomeCliente,
                id: idCliente
            });
        } catch (error) {
            next(error);
        }
    }

   
};

