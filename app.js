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

 app.post('/schedule',(req,res) =>{
     
  var s1 =req.body.doctor_id;
  var s2 = req.body.date.value;
  var s3 = req.body.day;
  var s4 = req.body.sTime;
  var s5 = req.body.eTime;
  var s6 = req.body.avg;
  var s7 = "Active";
 
  client.query('INSERT INTO doctor_schedule_table(doctor_id,doctor_schedule_date,doctor_schedule_day,doctor_schedule_start_time,doctor_schedule_end_time,average_consulting_time,doctor_schedule_status) VALUES ($1,$2,$3,$4,$5,$6,$7)', [s1,s2,s3,s4,s5,s6,s7],(err,Result)=>
  {   
    if(err)
    {
      res.send({ success: false, message: err.detail, error: err });
    }

      if(Result.rowCount > 0)
      {
        res.send({ success: true, message: "Schedule added successFully!" })
      }
  })
 })

 app.post('/get_source',(req,res) =>{
   
 client.query(`SELECT * FROM doctor_schedule_table WHERE doctor_id = ${req.body.id}`, (err,Result)=>{
    if(err)
        console.log(err)
    res.send(Result.rows)
 })
 })
 app.get('/get_list',(req,res) =>{
  
  let array=[];
  client.query(`SELECT * FROM doctor_schedule_table`, (err,Result)=>{
    if(err)
        console.log(err)
      
    for(let i =0;i<Result.rows.length;i++)
    {
      
      array[i] = {
        'appointment_date' : Result.rows[i].doctor_schedule_date,
        'appointment_day': Result.rows[i].doctor_schedule_day,
        'avail_time': Result.rows[i].average_consulting_time,
        'doctor_schedule_id':Result.rows[i].doctor_schedule_id,
        'doctor_id':Result.rows[i].doctor_id,
        'doctor_schedule_start_time':Result.rows[i].doctor_schedule_start_time
      }
    }
    
    let len = Result.rows.length;
    let j=0;
    for(let i =0;i<Result.rows.length;i++)
    { 
     
      let id = Result.rows[i].doctor_id;
      client.query(`SELECT * FROM doctor_table WHERE doctor_id = ${id}`, (err,Result)=>{
        
        j++; 
        if(err)
        console.log(err)
        
  
        array[i]['doctor_name'] = Result.rows[0].doctor_name;
        array[i]['doctor_degree'] = Result.rows[0].doctor_degree;
        array[i]['doctor_expert_in'] = Result.rows[0].doctor_expert_in;
      
         
        if(j == len)
        {
          res.send(array);
        }     
      }) 
    }
  })
})
 
app.post('/book',(req,res) =>{
 
var s1 =req.body.doctor_id;
var s2 = req.body.patient_id;
var s3 = req.body.doctor_schedule_id;
var s4 = req.body.txt;
var s5 = req.body.doctor_schedule_start_time;
var s6 = req.body.status;
var s7 = req.body.patient_come_into_hospital;
var s8 = req.body.doctor_comment;

 client.query('INSERT INTO appointment_table(doctor_id,patient_id,doctor_schedule_id,reason_for_appointment,appointment_time,status,patient_come_into_hospital,doctor_comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [s1,s2,s3,s4,s5,s6,s7,s8],(err,Result)=>
 {  
    
    if(err)
    {
      res.send({ success: false, message: err.detail, error: err });
    }

      if(Result.rowCount > 0)
      {
        res.send({ success: true, message: "Schedule added successFully!" })
      }
 })
})


app.post('/appointmentDetails',(req,res) =>{
 
client.query(`SELECT * FROM appointment_table WHERE patient_id = ${req.body.id}`, (err,Result)=>{
   if(err)
       console.log(err)
     
      res.send(Result.rows);
    //  console.log(array);
    
})
})

app.post('/patientInfo',(req,res) =>{
  
  client.query(`SELECT * FROM patient_table WHERE patient_id = ${req.body.id}`, (err,Result)=>{
    if(err)
    console.log(err)

    res.send({ success: true,data:Result.rows});
  })
// var s1 =req.body.doctor_id;
// var s2 = req.body.date.value;
// var s3 = req.body.day;
// var s4 = req.body.sTime;
// var s5 = req.body.eTime;
// var s6 = req.body.avg;
// var s7 = "Active";

// client.query('INSERT INTO doctor_schedule_table(doctor_id,doctor_schedule_date,doctor_schedule_day,doctor_schedule_start_time,doctor_schedule_end_time,average_consulting_time,doctor_schedule_status) VALUES ($1,$2,$3,$4,$5,$6,$7)', [s1,s2,s3,s4,s5,s6,s7],(err,Result)=>
// {   
// if(err)
// {
//   res.send({ success: false, message: err.detail, error: err });
// }

//   if(Result.rowCount > 0)
//   {
//     res.send({ success: true, message: "Schedule added successFully!" })
//   }
// })
})

app.post('/get_doctor',(req,res) =>{
      let d_id;
      let array=[];
      let j=0;
      let len = req.body.length;
    for(let i =0;i<req.body.length;i++)
    {
       
        d_id = req.body[i].id;
        client.query(`SELECT * FROM doctor_table WHERE doctor_id = ${d_id}`, (err,Result)=>{
          j++;
          if(err)
             console.log(err)
          array[i] = Result.rows[0];
         
          if(len ==j)
          {
            res.send(array);
          }
         
        })   
    } 
})
app.post('/get_doctor_schedule',(req,res) =>{
  let d_id;
  let array=[];
  let j=0;
  let len = req.body.length;
for(let i =0;i<req.body.length;i++)
{
   
    d_id = req.body[i].id;
    client.query(`SELECT * FROM doctor_schedule_table WHERE doctor_schedule_id = ${d_id}`, (err,Result)=>{
      j++;
      if(err)
         console.log(err)
      array[i] = Result.rows[0];
     
      if(len ==j)
      {
        res.send(array);
      }
     
    })   
} 
})

app.post('/appointment_list',(req,res) =>{
 
  client.query(`SELECT * FROM appointment_table WHERE doctor_id = ${req.body.id}`, (err,Result)=>{
    if(err)
        console.log(err)
      
        res.send(Result.rows);
      //  console.log(array);
      
  })
})
app.post('/get_patient',(req,res) =>{
  let d_id;
  let array=[];
  let j=0;
  let len = req.body.length;
    for(let i =0;i<req.body.length;i++)
    {
        d_id = req.body[i].id;
        client.query(`SELECT * FROM patient_table WHERE patient_id = ${d_id}`, (err,Result)=>{
          j++;
          if(err)
            console.log(err)
          array[i] = Result.rows[0];
        
          if(len ==j)
          {
            res.send(array);
          }
        
        })   
    } 
})

app.post('/get_schedule',(req,res) =>{
  let d_id;
  let array=[];
  let j=0;
  let len = req.body.length;
  for(let i =0;i<req.body.length;i++)
  {
    
      d_id = req.body[i].id;
      client.query(`SELECT * FROM doctor_schedule_table WHERE doctor_schedule_id = ${d_id}`, (err,Result)=>{
        j++;
        if(err)
          console.log(err)
        array[i] = Result.rows[0];
      
        if(len ==j)
        {
          res.send(array);
        }
      
      })   
  } 
})

app.get('/get_all',(req,res)=>{
  client.query(`SELECT * FROM appointment_table`, (err,Result)=>{
    if(err)
    console.log(err)
    res.send(Result.rows)
  })
})


app.post('/update',(req,res)=>{
 
  let patient;
  let status ;
  if(req.body.select == "Yes")
  {
    status ="In process";
    patient ='Yes';
  } 
  else{
    status ="Booked"
    patient = 'No';
  }
  
  client.query(`UPDATE  appointment_table SET patient_come_into_hospital = '${patient}' WHERE appointment_id = ${req.body.a_id}`, (err,Result)=>{
    if(err)
     res.send({ success: false, message: "Error" })
    // res.send(Result.rows)
    res.send({ success: true, message: "Updated successFully!" })
   })
})

app.post('/update_status',(req,res)=>{
 
  client.query(`UPDATE  appointment_table SET status = '${req.body.status}' WHERE appointment_id = ${req.body.a_id}`, (err,Result)=>{
    if(err)
    res.send({ success: false, message: "Errror!" })
  

    res.send({ success: true, message: "Updated successFully!" })

 
  })
})
app.post('/update_comment',(req,res)=>{
 
  
  client.query(`UPDATE  appointment_table SET doctor_comment = '${req.body.select}' WHERE appointment_id = ${req.body.a_id}`, (err,Result)=>{
    if(err)
    res.send({ success: false, message: "Error!" })
  
    res.send({ success: true, message: "Updated successFully!" })
  })
})


 app.use('/v1/auth', appRouter.authRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

