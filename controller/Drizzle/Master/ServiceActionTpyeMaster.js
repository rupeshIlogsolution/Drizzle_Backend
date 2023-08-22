const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalServiceAction = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_service_action_type_master order by service_action_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const insertServiceAction = async (req,res) =>{
    const org = req.body.org;
    const service_action_id = req.body.service_action_id;
    const service_action_type= req.body.service_action_type;
    const service_action_type_description = req.body.service_action_type_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_service_action_type_master (service_action_id ,service_action_type  ,service_action_type_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${service_action_id}','${service_action_type}','${service_action_type_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err);
    }
}

const getServiceAction = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_service_action_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const deleteServiceAction = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_service_action_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err);
    }
}

const updateServiceAction = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const service_action_type= req.body.service_action_type;
    const service_action_type_description = req.body.service_action_type_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_service_action_type_master set service_action_type='${service_action_type}',service_action_type_description='${service_action_type_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err);
    }
}

module.exports = {totalServiceAction,insertServiceAction,getServiceAction,deleteServiceAction,updateServiceAction}
