module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Hello World'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Voce esta na rota POST')
    })

}