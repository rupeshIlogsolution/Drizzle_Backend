const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaloperatingsystem = async (req,res)=>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_operating_system order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const addoperatingsystemmaster = async (req,res) => {
    const operatingsystemid = req.body.operatingsystemid;
    const operatingsystem = req.body.operatingsystem;
    const remark = req.body.remark;
    const username = req.body.username
    console.log('OperatingSystem',operatingsystemid,operatingsystem,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_operating_system where operating_system='${operatingsystem}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_operating_system  (id,operating_system,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${operatingsystemid}','${operatingsystem}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
        }else {
            res.send("Already")
        }
    }
    catch(err){
        console.log(err)
    }
}

const getoperatingsystem = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_operating_system tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updateoperatingsystem = async (req,res) => {
    const sno = req.body.sno;
    const operatingsystemid = req.body.operatingsystemid;
    const operatingsystem = req.body.operatingsystem;
    const remark = req.body.remark;
    const username = req.body.username
    console.log('Operating',sno,operatingsystemid,operatingsystem,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_operating_system set id='${operatingsystemid}',operating_system ='${operatingsystem}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateoperatingstatusstatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_operating_system set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const activeoperatingsystem = async (req,res)=>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select operating_system from IPERISCOPE.dbo.tbl_operating_system where status='Active'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totaloperatingsystem,addoperatingsystemmaster,getoperatingsystem,updateoperatingsystem,updateoperatingstatusstatus,activeoperatingsystem}