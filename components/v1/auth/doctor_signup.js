// const Doctor_table = require('../../../models/doctor_table');
// const SECRET_KEY = "secretkey23456";
// const jwt = require('jsonwebtoken');
const client = require('../../../config/db.config')
const { Client, Pool } = require('pg');
module.exports = async (req, res, next) => {
        
   
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
        console.log(err);
      }
       console.log(Result);
    })
     // res.send("POST Request Called")

    
};
