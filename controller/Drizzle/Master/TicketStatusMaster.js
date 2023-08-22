const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalTicketStatus = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_ticket_status_master ttsm  order by ticket_status ASC`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const insertTicketStatus = async (req,res) =>{
    const org = req.body.org;
    const ticket_id = req.body.ticket_id;
    const ticket_status= req.body.ticket_status;
    const ticket_description = req.body.ticket_description;
    const user_id = req.body.user_id;
    console.log(org,ticket_id)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_ticket_status_master (ticket_id  ,ticket_status  ,ticket_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${ticket_id}','${ticket_status}','${ticket_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err);
    }
}

const getTicketStatus  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_ticket_status_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const deleteTicketStatus   = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_ticket_status_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err);
    }
}

const updateTicketStatus  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const ticket_status= req.body.ticket_status;
    const ticket_description = req.body.ticket_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_ticket_status_master set ticket_status='${ticket_status}',ticket_description='${ticket_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err);
    }
}


const ActiveTicketStatus   = async (req,res) =>{
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  ticket_id,ticket_status from ${org}.dbo.tbl_ticket_status_master ttsm  with (nolock)  WHERE status ='Active' order by ticket_status ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = {totalTicketStatus,insertTicketStatus,getTicketStatus,deleteTicketStatus,updateTicketStatus,ActiveTicketStatus}


