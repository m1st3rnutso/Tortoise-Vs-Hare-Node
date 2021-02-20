const express = require('express')
const app = express()
const port = 3001

const accountModel = require ("./accountModel")

app.use(express.json())
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
    next()
})

app.post('/loginAttempt', (request, response) => {
    accountModel.getAccount(request.body)
    .then(pgresponse => {
        response.status(200).send(pgresponse);
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error);
    })
})

app.post('/createAccountAttempt', (request, response) => {
    accountModel.createAccount(request.body)
    .then(pgresponse => {
        response.status(201).send(pgresponse);
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log("listening on port", port)
})