const knex = require('../database')
module.exports = {
    async create(req, res, next) {
        const{
            nomeCliente,
            emailCliente,
            senhaCliente,
        } = req.body

        try {
            await knex('cliente').insert({
                nomeCliente,
                emailCliente,
                senhaCliente,
            })
            return res.status(201).send({
                message: "Cliente criado"
            })

        } catch(error) {
            next(error)
        }
    },

    async View(req, res, next) {
        try {

            const resposta = await knex('cliente').select('*')
            return res.send({
                resposta
            })

        } catch(error) {
            next(error)
        }
    }
}