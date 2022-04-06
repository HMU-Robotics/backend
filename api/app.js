const express = require("express")
const morgan = require('morgan')
const mysql = require('mysql')
const authRoutes = require("./routes/auth")

const db = mysql.createConnection({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'jimlion321321',
    database:process.env.database || 'HMU_ROBOTICS'
});

db.connect((err)=>{
    if(err) throw err;
    console.log("Database ready...")
})

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Oring, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods',"PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
})

app.use('/auth',authRoutes)


app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.json({
        error:{
            message : error.message
        }
    })
})

module.exports = app


