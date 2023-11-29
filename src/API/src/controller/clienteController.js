const knex = require('../database')
const yup = require('yup')
const validacaoSchema = yup.object().shape({
    emailCliente: yup.string().required("Campo obrigatório"),
    senhaCliente: yup.string().required("Campo obrigatório"),
    nomeCliente: yup.string().required("Campo obrigatório"),
 })

module.exports = {
    async create(req, res, next) {
        const{
            nomeCliente,
            emailCliente,
            senhaCliente,
        } = req.body

        try {
            await validacaoSchema.validate(req.body, { abortEarly:false})
            
            await knex('cliente').insert({
                nomeCliente,
                emailCliente,
                senhaCliente,
            })
            return res.status(201).send({
                message: "Cliente criado"
            })

        } catch(error) {
            if (error instanceof Yup.ValidationError)
                return res.status(400).json({ error: error.errors })
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