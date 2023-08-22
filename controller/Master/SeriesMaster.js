const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totalseries = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_id_series `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const addseries = async (req,res) => {
    const type_id = req.body.type_id;
    const services_id = req.body.services_id;
    const task_id = req.body.task_id;
    const agent_id = req.body.agent_id;
    const group_id  = req.body.group_id;
    const os_id = req.body.os_id;
    const comp_id = req.body.comp_id;
    const device_id = req.body.device_id;
    const taskandcomp_id = req.body.taskandcomp_id;
    const username = req.body.username;
    console.log(type_id,services_id,task_id,agent_id,group_id,os_id,comp_id,device_id,taskandcomp_id,username)
    try{
        await sql.connect(sqlConfig)
        const result1 = await sql.query(`update IPERISCOPE.dbo.tbl_id_series set status ='Deactive' where status ='Active'`)
        const result = await sql.query(`INSERT into IPERISCOPE.dbo.tbl_id_series (type_id,services_id,task_id,agent_id,group_id,os_id,comp_id,
            device_id,taskandcomp_id,add_date_time,add_user_name,add_system_name,add_ip_address,status)
            values('${type_id}','${services_id}','${task_id}','${agent_id}','${group_id}','${os_id}','${comp_id}','${device_id}','${taskandcomp_id}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getseries = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_id_series tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updateseries = async (req,res) => {
    const sno = req.body.sno;
    const type_id = req.body.type_id;
    const services_id = req.body.services_id;
    const task_id = req.body.task_id;
    const agent_id = req.body.agent_id;
    const group_id  = req.body.group_id;
    const os_id = req.body.os_id;
    const comp_id = req.body.comp_id;
    const device_id = req.body.device_id;
    const taskandcomp_id = req.body.taskandcomp_id;
    const username = req.body.username;
    console.log(sno,type_id,services_id,task_id,agent_id,group_id,os_id,comp_id,device_id,taskandcomp_id,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_id_series set type_id='${type_id}',services_id ='${services_id}',task_id='${task_id}',agent_id='${agent_id}',group_id='${group_id}',os_id='${os_id}',comp_id='${comp_id}',device_id='${device_id}',taskandcomp_id='${taskandcomp_id}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatestatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result1 = await sql.query(`update IPERISCOPE.dbo.tbl_id_series set status ='Deactive' where status ='Active'`);
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_id_series set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }
}

const Activeseriesmaster = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_id_series where status='Active' `)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totalseries,addseries,getseries,updateseries,updatestatus,Activeseriesmaster}