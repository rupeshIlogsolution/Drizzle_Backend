const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalPriorityMaster = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_priority_master tpm order by priority_type ASC`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertPriorityMaster = async (req,res) =>{
    const org = req.body.org;
    const priority_id = req.body.priority_id;
    const priority_type= req.body.priority_type;
    const priority_description = req.body.priority_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_priority_master (priority_id  ,priority_type  ,priority_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${priority_id}','${priority_type}','${priority_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getPriorityMaster  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_priority_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deletePriorityMaster  = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_priority_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updatePriorityMaster = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const priority_type= req.body.priority_type;
    const priority_description = req.body.priority_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_priority_master set priority_type='${priority_type}',priority_description='${priority_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}


const ActivePriority  = async (req,res) =>{
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  priority_id,priority_type from ${org}.dbo.tbl_priority_master tpm  with (nolock)  WHERE status ='Active' order by priority_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {totalPriorityMaster,insertPriorityMaster,getPriorityMaster,deletePriorityMaster,updatePriorityMaster,ActivePriority}


