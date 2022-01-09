const postgres = require('pg')

const postPool = new postgres.Pool({
    host: 'localhost',
    port: '',
    user: 'postgres',
    password: '',
    database: 'agenda-petshop'
})



module.exports = postPool