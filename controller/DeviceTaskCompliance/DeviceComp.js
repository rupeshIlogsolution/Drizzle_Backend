const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldevicetask = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.devices_comp `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}
const adddevicetask = async (req,res) => {
    const devicename = req.body.devicename;
    const services = req.body.services;
    const add_compliance = req.body.add_compliance;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(devicename,services,add_compliance,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.devices_comp  (device_name,services,add_compliance,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${devicename}','${services}','${add_compliance}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','No')`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}
const getdevicetask  = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.devices_comp tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const getdevicetaskcompliancebyname  = async (req,res) =>{
    const name = req.body.name;
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.devices_comp tdt where device_name='${name}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicetask = async (req,res) => {
    const sno = req.body.sno;
    const devicename = req.body.devicename;
    const services = req.body.services;
    const add_compliance = req.body.add_compliance;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,devicename,services,add_compliance,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.devices_comp set device_name ='${devicename}',services='${services}',add_compliance='${add_compliance}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicecompstatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.devices_comp set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }
}



module.exports={totaldevicetask,adddevicetask,getdevicetask,updatedevicetask,updatedevicecompstatus,getdevicetaskcompliancebyname}
