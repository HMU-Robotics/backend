const mysql = require('mysql2')


const db =  mysql.createPool({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "HMU",
    password:process.env.DB_PASSWORD || 'password',
    database:process.env.DATABASE || 'HMU_ROBOTICS_CLUB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


exports.get_by_id = async(req,res,next)=>{
    const {item_id} = req.params
    db.execute('SELECT * FROM `item` WHERE `id` = ?',[item_id],(err,result)=>{
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
    console.log(itemName)
    db.execute('SELECT * FROM `item` WHERE `name` = ?',[itemName],(err,result)=>{
        if(err) throw err;
        console.log(result[0]);
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
    db.execute('SELECT * FROM `item` WHERE `code` = ?',[req.body.code],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
            res.status(409).json("Invalid input")
        }
        db.execute('SELECT * FROM `category` where `name` = ?',[req.body.name],(err,result)=>{
            if(err) throw err;
            console.log(result);
            if(result.length == 0){
                res.status(409).json("Invalid input")
            }
            else{
                try{
                    categoryid = result[0].id
                    console.log(categoryid)
                    db.execute('INSERT INTO `item`(name,image,category_id,description,code,status) VALUES(?,?,?,?,?,?)',[req.body.name,req.body.image,categoryid,req.body.description,req.body.code,req.body.status],(err,result)=>{
                        if(!result) throw err;
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
    })
}

exports.get_all = async(req,res,next)=>{ 
    db.execute('SELECT * FROM `item`',(err,result)=>{
        if(!result) throw err
        console.log(result)
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

exports.newCategory = async(req,res,next)=>{
    db.execute('select * from category where `name` = ? ',[req.body.name],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length !=0){
            res.status(409).json("Invalid input")
        }
        else{
            try{
                db.execute('INSERT INTO `category`(name) VALUES(?)',[req.body.name],(err,result)=>{
                    if(err) throw err;
                    console.log(result)
                    res.status(200).json({
                        message:"Category added"
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
