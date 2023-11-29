const express = require('express');
const app = express();
const routes = require('../routes')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(cors())
app.use(routes)
app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})

app.use((error, rec, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
    
})
app.listen(process.env.PORT || 3001, () => console.log('Server in running'))
