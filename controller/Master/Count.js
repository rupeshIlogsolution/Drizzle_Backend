const sql = require('mssql')
const sqlConfig = require('../../Database/Config')

const totalcount = async (req,res)=>{
    const table = req.body.table;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select count(sno) as count from IPERISCOPE.dbo.${table}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totalcount}