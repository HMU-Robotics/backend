const sql = require('sql')


exports.get_by_name = async(req,res,next)=>{
    const {name} = req.params;
    // const item = await //query
    if(item.length === 0){
        res.status(404).json({"error":"nothing found"})
    }
    else{
        res.status(200).json(item)
    }
    console.log(name,item)
}
