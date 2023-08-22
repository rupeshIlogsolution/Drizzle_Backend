const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalServiceGroup = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_service_group_master order by service_group_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const insertServiceGroup = async (req,res) =>{
    const org = req.body.org;
    const service_group_id = req.body.service_group_id;
    const service_group_type= req.body.service_group_type;
    const service_group_description = req.body.service_group_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_service_group_master (service_group_id ,service_group_type  ,service_group_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${service_group_id}','${service_group_type}','${service_group_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err);
    }
}

const getServiceGroup = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_service_group_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const deleteServiceGroup = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_service_group_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err);
    }
}

const updateServiceGroup = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const service_group_type= req.body.service_group_type;
    const service_group_description = req.body.service_group_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_service_group_master set service_group_type='${service_group_type}',service_group_description='${service_group_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err);
    }
}

module.exports = {totalServiceGroup,insertServiceGroup,getServiceGroup,deleteServiceGroup,updateServiceGroup}
