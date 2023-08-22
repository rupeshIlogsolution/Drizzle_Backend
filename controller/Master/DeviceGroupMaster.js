const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totaldevicegroup = async (req,res)=>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_group tdt order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const adddevicegroup = async (req,res) => {
    const devicegroupid = req.body.devicegroupid;
    const device_group = req.body.device_group;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(devicegroupid,device_group,remark,username)
    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_group where device_group='${device_group}'`)
        if (!duplicate.recordset.length) {
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_device_group  (id,device_group ,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${devicegroupid}','${device_group}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
        } else {
            res.send("Already")
        }
    }
    
    catch(err){
        console.log(err)
    }
}

const getdevicegroup = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_device_group tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updatedevicegroup = async (req,res) => {
    const sno = req.body.sno;
    const devicegroupid = req.body.devicegroupid;
    const device_group = req.body.device_group;
    const remark = req.body.remark;
    const username = req.body.username
    console.log(sno,devicegroupid,device_group,remark,username)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_group set id='${devicegroupid}',device_group ='${device_group}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updategroupstatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_device_group set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }

}

const activedevicegroup = async (req,res)=>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select device_group from IPERISCOPE.dbo.tbl_device_group where status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totaldevicegroup,adddevicegroup,getdevicegroup,updatedevicegroup,updategroupstatus,activedevicegroup} 