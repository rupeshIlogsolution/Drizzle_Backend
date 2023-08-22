const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')


const getdevicetaskbyname  = async (req,res) =>{
    const name = req.body.name;
    console.log('hit')
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select distinct sno as sno, device_name as device_name,services as services ,task as task, task_frequency as task_frequency,convert(varchar(15),completion_date,105) as completion_date, remark  as remark,status as status from IPERISCOPE.dbo.device_task where device_name='${name}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const adddevicetaskes = async (req,res) => {
    const devicename = req.body.devicename;
    const services = req.body.services;
    const task = req.body.task;
    const completion_date = req.body.completion_date;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(devicename,services,task,completion_date,remark,username)
    try{
        await sql.connect(sqlConfig)

        const frequency = await sql.query(`select device_tasks_frequency from IPERISCOPE.dbo.tbl_device_tasks tdt where device_tasks='${task}'`)
        if(frequency.recordset[0].device_tasks_frequency){}

        const result = await sql.query(`insert into IPERISCOPE.dbo.device_task (device_name,services ,task ,task_frequency ,completion_date,remark,
         add_date_time,add_user_name,add_system_name,add_ip_address,status)
          values ('${devicename}','${services}','${task}','${frequency.recordset[0].device_tasks_frequency}','${completion_date}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','no')`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const Getdevicetaskes  = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select distinct device_name as device_name,services as services ,task as task, task_frequency as task_frequency,convert(varchar(15),completion_date,23) as completion_date, remark  as remark from IPERISCOPE.dbo.device_task tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicetaskes = async (req,res) => {
    const sno = req.body.sno;
    const devicename = req.body.devicename;
    const services = req.body.services;
    const task = req.body.task;
    const task_frequency = req.body.task_frequency;
    const completion_date = req.body.completion_date;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,devicename,services,task,task_frequency,completion_date,remark,username)
    try{
        await sql.connect(sqlConfig)


        const result = await sql.query(`update IPERISCOPE.dbo.device_task set device_name ='${devicename}',services='${services}',task='${task}',task_frequency='${task_frequency}',completion_date='${completion_date}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicetaskastatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.device_task set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getdevicetaskbyname,adddevicetaskes,Getdevicetaskes,updatedevicetaskes,updatedevicetaskastatus}
