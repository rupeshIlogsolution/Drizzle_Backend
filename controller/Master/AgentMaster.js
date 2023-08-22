const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totalagent = async (req, res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_agent_master order by sno desc`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const addagent = async (req,res) => {
    const agentid = req.body.agentid;
    const agent_name = req.body.agent_name;
    const agent_email = req.body.agent_email;
    const agent_phone = req.body.agent_phone
    const remark = req.body.remark;
    const username = req.body.username
    console.log(agentid,agent_name,agent_email,agent_phone,remark,username)
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_agent_master  (id,agent_name ,agent_email ,agent_phone ,remark,add_date_time,add_user_name,add_system_name,add_ip_address,status)
        values('${agentid}','${agent_name}','${agent_email}','${agent_phone}','${remark}',getdate(),'${username}','${os.hostname()}','${req.ip}','Active')`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getagent  = async (req,res) =>{
    const sno = req.body.sno;
    console.log(sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_agent_master tdt where sno = ${sno}`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const updateagent = async (req,res) => {
    const sno = req.body.sno
    const agentid = req.body.agentid;
    const agent_name = req.body.agent_name;
    const agent_email = req.body.agent_email;
    const agent_phone = req.body.agent_phone
    const remark = req.body.remark;
    const username = req.body.username
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_agent_master set id='${agentid}',agent_name='${agent_name}',agent_email='${agent_email}',agent_phone='${agent_phone}',remark='${remark}',update_date_time = getdate(),update_user_name ='${username}',
        update_system_name ='${os.hostname()}',update_ip_address='${req.ip}' where sno =${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateagentstatus = async (req,res)=>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_agent_master set status='${status}' where sno =${sno}`)
        res.status(200).send("Updated")

    }
    catch(err){
        console.log(err)
    }
}

const Activeagent = async (req, res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select agent_name from IPERISCOPE.dbo.tbl_agent_master where status='Active'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totalagent,addagent,getagent,updateagent,updateagentstatus,Activeagent}