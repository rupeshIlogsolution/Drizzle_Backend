const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldevicetask = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_tasks order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const adddevicetask = async (req,res) => {
    const devicetaskid = req.body.devicetaskid;
    const device_tasks = req.body.device_tasks;
    const device_tasks_frequency = req.body.device_tasks_frequency;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(devicetaskid,device_tasks,device_tasks_frequency,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_tasks where device_tasks='${device_tasks}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_device_tasks  
        (id,device_tasks,device_tasks_frequency,remark ,add_date_time,add_user_name,add_system_name,add_ip_address,status)
  values('${devicetaskid}','${device_tasks}','${device_tasks_frequency}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
    }else {
        res.send("Already")
    }
    }
    catch(err){
        console.log(err)
    }
}
const getdevicetask = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_tasks  where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}
const updatedevicetask = async (req,res) => {
    const sno = req.body.sno;
    const devicetaskid = req.body.devicetaskid;
    const device_tasks = req.body.device_tasks;
    const device_tasks_frequency = req.body.device_tasks_frequency;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,devicetaskid,device_tasks,device_tasks_frequency,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_tasks set id='${devicetaskid}',device_tasks ='${device_tasks}',device_tasks_frequency='${device_tasks_frequency}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
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
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_tasks set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const Activedevicetask = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_tasks,device_tasks_frequency from IPERISCOPE.dbo.tbl_device_tasks where status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const getdevicetaskfrequency = async (req,res) =>{
    const task = req.body.task;
    console.log(task)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_tasks_frequency from IPERISCOPE.dbo.tbl_device_tasks tdt where device_tasks='${task}'`)
        res.status(200).send(result.recordset[0].device_tasks_frequency)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totaldevicetask,adddevicetask,getdevicetask,updatedevicetask,updatestatus,Activedevicetask,getdevicetaskfrequency}