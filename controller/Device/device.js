const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldevice = async (req, res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_devices `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const AddDevice = async (req,res) =>{
    const device_id = req.body.device_id;
    const device_name = req.body.device_name;
    const device_type = req.body.device_type;
    const device_group = req.body.device_group;
    const device_ip_address = req.body.device_ip_address;
    const device_host_master = req.body.device_host_master;
    const device_os = req.body.device_os;
    const services = req.body.services;
    const device_creation_date = req.body.device_creation_date;
    const device_reg_date = req.body.device_reg_date;
    const agent = req.body.agent
    const remark = req.body.remark;
    const username = req.body.username
    console.log(device_id,device_name,device_type,device_group,device_ip_address,device_host_master,device_os,services,device_creation_date,device_reg_date,agent,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_devices  
        (device_id,device_name,device_type ,device_group ,device_ip_address ,device_host_master,device_os ,services,device_creation_date ,device_reg_date,agent ,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
         values('${device_id}','${device_name}','${device_type}','${device_group}','${device_ip_address}','${device_host_master}','${device_os}','${services}','${device_creation_date}','${device_reg_date}','${agent}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")

    }
    catch(err){
        console.log(err)
    }
}

const getdevice  = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_devices tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updatedevice = async (req,res) => {
    const sno = req.body.sno
    const device_id = req.body.device_id;
    const device_name = req.body.device_name;
    const device_type = req.body.device_type;
    const device_group = req.body.device_group;
    const device_ip_address = req.body.device_ip_address;
    const device_host_master = req.body.device_host_master;
    const device_os = req.body.device_os;
    const services = req.body.services;
    const device_creation_date = req.body.device_creation_date;
    const device_reg_date = req.body.device_reg_date;
    const agent = req.body.agent
    const remark = req.body.remark;
    const username = req.body.username

    console.log(sno,device_id,device_name,device_type,device_group,device_ip_address,device_host_master,device_os,services,device_creation_date,device_reg_date,agent,remark,username)
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_devices set device_id='${device_id}',device_name='${device_name}',device_type='${device_type}',device_group='${device_group}',device_ip_address='${device_ip_address}',device_host_master='${device_host_master}',device_os='${device_os}',services='${services}',device_creation_date='${device_creation_date}',device_reg_date='${device_reg_date}',agent='${agent}', remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicestatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_devices set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }
}

const Activedevice = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_name from IPERISCOPE.dbo.tbl_devices where status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {totaldevice,AddDevice,getdevice,updatedevice,updatedevicestatus,Activedevice}
