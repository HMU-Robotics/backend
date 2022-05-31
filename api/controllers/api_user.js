const mysql = require("mysql2")



const db =  mysql.createPool({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'password',
    database:process.env.DATABASE || 'HMU_ROBOTICS_CLUB',
});



exports.find_user = async(req,res,next)=>{
    const {id} = req.params
    db.execute('SELECT * from `user` WHERE `id` = ?',[id],(err,result)=>{
        if(err) throw err
        console.log(result)
        if(result.length == 0){
            res.status(409).json("Invalid input")

        }
        else{
            res.status(200).json({
                message:"Item found",
                Item:result[0]
            })
        }
    })
}


exports.find_all_users = async(req,res,next)=>{
    let sql = `SELECT * from user`
    db.execute('SELECT * from `user`',(err,result)=>{
        if(err) throw err
        console.log(result)
        if(result.length == 0){
            res.status(409).json("Invalid input")
        }
        else{
            res.status(200).json({
                Message:"Item found",
                User: result
            })
        }
    })
}