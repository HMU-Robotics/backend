const express = require("express")
const morgan = require('morgan')
const cookieParser = require("cookie-parser");
const mysql = require('mysql2')
const api_auth = require("./routes/api_auth")
const api_storage = require("./routes/api_storage")
const api_users = require("./routes/api_user")
<<<<<<< Updated upstream
const cors = require("cors")
const ejs = require('ejs');
=======
const helmet = require("helmet")
>>>>>>> Stashed changes


const db = mysql.createConnection({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || '',
    database:process.env.DATABASE || 'HMU_ROBOTICS_CLUB'
});


db.connect((err)=>{
    if(err) throw err;
    console.log("Database ready...")
})


const app = express()

<<<<<<< Updated upstream
app.use(cors());
=======
app.use(helmet());
app.disable('x-powered-by')
>>>>>>> Stashed changes
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Oring, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods',"PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
})

app.use('/api/auth',api_auth)
app.use('/api/storage',api_storage)
app.use('/api/members',api_users)


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


