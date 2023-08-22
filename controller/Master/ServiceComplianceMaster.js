const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totalservicecompliance = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_service_compliance order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const addservicecompliance = async (req,res) => {
    const servicecomplianceid = req.body.servicecomplianceid;
    const device_service = req.body.device_service;
    const services_compliance = req.body.services_compliance
    const remark = req.body.remark;
    const username = req.body.username
    console.log(servicecomplianceid,device_service,services_compliance,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_service_compliance where services_compliance='${services_compliance}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_service_compliance (id,device_services,services_compliance,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${servicecomplianceid}','${device_service}','${services_compliance}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
    }else {
        res.send("Already")
    }
    }
    catch(err){
        console.log(err)
    }
}

const getservicecompliance  = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_service_compliance tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updateservicecompliance = async (req,res) => {
    const sno = req.body.sno;
    const servicecomplianceid = req.body.servicecomplianceid;
    const device_service = req.body.device_service;
    const services_compliance = req.body.services_compliance
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,servicecomplianceid,device_service,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_service_compliance set id='${servicecomplianceid}',device_services ='${device_service}',services_compliance='${services_compliance}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateservicecompliancestatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_service_compliance set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const activeservicecompliance = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select services_compliance from IPERISCOPE.dbo.tbl_service_compliance where status='Active'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}



module.exports={totalservicecompliance,addservicecompliance,getservicecompliance,updateservicecompliance,updateservicecompliancestatus,activeservicecompliance}