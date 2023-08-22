const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldevicetype = async (req,res) =>{
    console.log('njdk')
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_type tdt order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const adddevicetype = async (req,res) => {
    const devicetypeid = req.body.devicetypeid;
    const device_type = req.body.device_type;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(devicetypeid,device_type,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_type where device_type='${device_type}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_device_type  (id,device_type,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${devicetypeid}','${device_type}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
        }else{
            res.send("Already")
        }
    }
    catch(err){
        console.log(err)
    }
}

const getdevicetype = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_type tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicetype = async (req,res) => {
    const sno = req.body.sno;
    const devicetypeid = req.body.devicetypeid;
    const device_type = req.body.device_type;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,devicetypeid,device_type,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_type set id='${devicetypeid}',device_type ='${device_type}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
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
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_type set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const Activedevicetype = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_type from IPERISCOPE.dbo.tbl_device_type where status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}



module.exports = {totaldevicetype,adddevicetype,getdevicetype,updatedevicetype,updatestatus,Activedevicetype}