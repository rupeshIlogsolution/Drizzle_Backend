const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldeviceservices = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_services order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const adddeviceservice = async (req,res) => {
    const deviceserviceid = req.body.deviceserviceid;
    const device_service = req.body.device_service;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(deviceserviceid,device_service,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_services where device_services='${device_service}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_device_services  (id,device_services,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${deviceserviceid}','${device_service}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
        }else {
            res.send("Already")
        }
    }
    catch(err){
        console.log(err)
    }
}

const getdeviceservice = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_services tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updatedeviceservice = async (req,res) => {
    const sno = req.body.sno;
    const deviceserviceid = req.body.deviceserviceid;
    const device_service = req.body.device_service;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,deviceserviceid,device_service,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_services set id='${deviceserviceid}',device_services ='${device_service}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatedeviceservicestatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_services set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const ActiveDeviceService = async (req,res)=>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_services from IPERISCOPE.dbo.tbl_device_services tdt where status='Active'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {totaldeviceservices,adddeviceservice,getdeviceservice,updatedeviceservice,updatedeviceservicestatus,ActiveDeviceService}