const postgres = require('pg')

const postPool = new postgres.Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '12345',
    database: 'agenda-petshop'
})



module.exports = postPool