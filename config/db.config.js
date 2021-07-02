const { Client, Pool } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'doctor_appointment'
  })
  client.connect()

  module.exports.client = client;