var express = require('express');
const { port } = require('./config/config');
const pg = require('pg')
let appRouter = require("./routes/v1");
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
 
const { Client, Pool } = require('pg');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded(
  {
    extended:true
  }
));

const client = new Client({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'doctor_appointment'
})
client.connect()

// app.post('/signup')
app.post('/signup', (req, res) => {
  console.log("yes I'm here")
  console.log(req.body)
  var s1 =req.body.email;
  var s2 = req.body.password;
  var s3 = req.body.name;
  var s4 = req.body.phone;
  var s5 = req.body.address;
  var s6 = req.body.dob;
  var s7 = req.body.degree;
  var s8 = req.body.expert_in;
  var s9 ="Active";
  var s10 = new Date();
  client.query('INSERT INTO doctor_table(email_address,password,doctor_name,doctor_phone_no,doctor_address,doctor_date_of_birth,doctor_degree,doctor_expert_in,doctor_status,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10],(err,Result)=>
  {   
    if(err)
    {
      res.send({ success: false, message: err.detail, error: err });
    }

      if(Result.rowCount > 0)
      {
        res.send({ success: true, message: "Sucessfully Registered" })
      }
  })
 })


 app.post('/patientSignup', (req, res) => {
  console.log("yes I'm here")
  console.log(req.body)
  var s1 =req.body.email;
  var s2 = req.body.password;
  var s3 = req.body.fname;
  var s4 = req.body.lname;
  var s5 = req.body.phone;
  var s6 = req.body.address;
  var s7 = req.body.dob;
  var s8 = req.body.sex;
  var s9 = new Date();
  client.query('INSERT INTO patient_table(email_address,password,patient_first_name,patient_last_name,patient_phone_no,patient_address,patient_date_of_birth,patient_gender,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [s1,s2,s3,s4,s5,s6,s7,s8,s9],(err,Result)=>
  {   
    if(err)
    {
      res.send({ success: false, message: err.detail, error: err });
    }

      if(Result.rowCount > 0)
      {
        res.send({ success: true, message: "Sucessfully Registered" })
      }
  })
 })
 
  app.post('/login', (req, res) => {
  console.log("yes I'm here")
  console.log(req.body)
  var s1 = req.body.username;
  var s2 = req.body.password;
  client.query('SELECT * FROM patient_table WHERE email_address=$1 AND password=$2', [s1, s2], (err, Result) => {
          
            if(Result.rowCount > 0)
             {
               res.send({ success: true, message: "Login Sucessfully", data : Result.rows, role : 'patient' })
             }
             else{
              client.query('SELECT * FROM doctor_table WHERE email_address=$1 AND password=$2', [s1, s2], (err, Result) => {
        
                if(Result.rowCount > 0)
                {
                  res.send({ success: true, message: "Login Sucessfully", data : Result.rows, role : 'doctor' })
                }  
                else{
                  client.query('SELECT * FROM admin_table WHERE admin_email_address=$1 AND admin_password=$2', [s1, s2], (err, Result) => {
                    if(Result.rowCount > 0)
                    {
                      res.send({ success: true, message: "Login Sucessfully", data : Result.rows, role : 'admin' })
                    } 
                  })
                }                           
              })
             }
                  
  })
  
  // client.query('INSERT INTO patient_table(email_address,password,patient_first_name,patient_last_name,patient_phone_no,patient_address,patient_date_of_birth,patient_gender,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [s1,s2,s3,s4,s5,s6,s7,s8,s9],(err,Result)=>
  // {   
  //   if(err)
  //   {
  //     res.send({ success: false, message: err.detail, error: err });
  //   }

  //     if(Result.rowCount > 0)
  //     {
  //       res.send({ success: true, message: "Sucessfully Registered" })
  //     }
  // })
 })


 
 app.use('/v1/auth', appRouter.authRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

