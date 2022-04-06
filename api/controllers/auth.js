const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require("../app")
const mysql = require("mysql");
const { use } = require('../app');

const db = mysql.createConnection({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'password',
    database:process.env.database || 'HMU_ROBOTICS'
});

exports.user_signup = async(req,res,next) =>{
    //search for already existing user
    console.log(req.body)
    const sameUserSearch = await db.query(`SELECT * FROM Users WHERE email = ${req.body.email}`)
    if(sameUserSearch != 0){
        res.status(409).json("Invalid input")
    }
    // creating new user
    else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                res.status(500).json({
                    error:err
                })
            }
            else{
                let sql = `INSERT INTO Users (email,password) VALUES (${req.body.email} , ${hash} , ${req.body.first_name},${req.body.last_name},${req.body.discord_id},${req.body.role_id})`
                try{
                    app.db.query(sql,(err,result)=>{
                        if(err) throw err
                        console.log("Success")
                    })
                    res.status(200).json({
                        message:"User created"
                    })
                }
                catch(err){
                    console.log(err)
                    res.status(500).json({
                        error:err
                    })
                }
            }
        })
    }
}

exports.user_login = async(req,res,next) =>{
    try{
    console.log(req.body)
    let sqlQ = `SELECT * FROM Users where email = '${req.body.email}'`
    const tryuser = await db.query(sqlQ)
    if(use.length == 0){
        return res.status(401).json({
            message:"Auth failed"
        })
    }
    const user = await db.query(sqlQ)
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err){
            return res.status(405).json({
                message:"Auth failed"
            })
        }
        if(result){
            const token = jwt.sign({
                email:user.email,
                userId:user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"1h"
            })
            return res.status(200).json({
                message:"Auth successful",
                token:token
            })
        }
    })
}
catch(err){
    console.log(err)
    res.status(500).json({
        error:err
    })
}
}