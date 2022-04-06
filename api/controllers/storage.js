const mysql = require('mysql2')


const db =  mysql.createConnection({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'password',
    database:process.env.DATABASE || 'HMU_ROBOTICS_CLUB',
});

db.connect(function(err){
    if(err) throw err;
})

exports.get_by_id = async(req,res,next)=>{
    const {item_id} = req.params
    let sql = `SELECT * FROM item WHERE id = '${item_id}'`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result[0]);
        if(result.length == 0){
            res.status(409).json("Invalid input")
        }
        else{
            item = result[0]
            res.status(200).json({
                Message:"Item found",
                Item:result[0]
            })
        }
    })
}


exports.get_by_name = async(req,res,next)=>{
    const {itemName} = req.params
    let sql = `SELECT * FROM item WHERE name = ${itemName}`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
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

exports.add_new_item = async(req,res,next)=>{
    let sql = `SELECT * FROM item WHERE code = '${req.body.code}'`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
            res.status(409).json("Invalid input")
        }
        else{
            sql = `INSERT INTO item(name,image,category_id,description,code,status) VALUES ('${req.body.name}','${req.body.image}',${req.body.category},${req.body.description},'${req.body.code}',1)`
            try{
                
                db.query(sql,(err,result)=>{
                    if(err) throw err;
                    console.log(result)
                    res.status(200).json({
                        message : "Item added to db"
                    })
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

exports.get_all = async(req,res,next)=>{
    let sql = `SELECT * FROM item `
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result[0]);
        if(result.length == 0){
            res.status(409).json("Invalid input")
        }
        else{
            let itemArray =[];
            for(let i=0;i<result.length;i++){
                itemArray.push(result[i])
            }
            res.status(200).json({
                Message:"Item found",
                Items:itemArray
            })
        }
    })
}
