const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require("../app")
const mysql = require("mysql2")
const bluebird  = require('bluebird')


  const db =  mysql.createConnection({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'password',
    database:process.env.DATABASE || 'HMU_ROBOTICS_CLUB',
    Promise: bluebird
});

db.connect(function(err){
    if(err) throw err;
})


exports.user_signup = async(req,res,next) =>{
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
            res.status(409).json("Invalid input")
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error:err
                    })
                } 
                sql = `INSERT INTO user (email,password,first_name,last_name,discord_id,role_id) VALUES ('${req.body.email}' ,'${hash}' , '${req.body.first_name}','${req.body.last_name}','${req.body.discord_id}',${req.body.role_id})`
                try{
                
                    db.query(sql,(err,result)=>{
                        if(err) throw err;
                        console.log(result)
                        res.status(200).json({
                            message : "User created"
                        })
                    })
                }
                catch(err){
                    console.log(err)
                    res.status(500).json({
                        error:err
                    })
                }
            })

            
            
            
        }
    })
}

exports.user_login = async(req,res,next) =>{
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}'`
    db.query(sql,(err,user)=>{
        if(err) throw err;
        console.log(user);
        if(user.length == 0){
            res.status(409).json("Invalid input")
        }else{
            bcrypt.compare(req.body.password , user[0].password , (err,result)=>{
                if(err){
                    return res.status(405).json({
                        message:"Auth failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email:user[0].email,
                        userId:user[0].id,
                        roles:user[0].role_id,
                    },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn:"1h"
                        }
                    )
                    return res.status(200).json({
                        message:"Auth successful",
                        token:token
                    })
                }
            })
        }

    })
}