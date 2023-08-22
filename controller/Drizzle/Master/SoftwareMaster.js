const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalSoftware = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_software_master tsm order by software_name ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const insertSoftware = async (req,res) =>{
    const org = req.body.org;
    const software_id = req.body.software_id;
    const software_name= req.body.software_name;
    const software_description = req.body.software_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_software_master (software_id  ,software_name  ,software_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${software_id}','${software_name}','${software_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        console.log(result);

        res.status(200).send("Added")
    }
    catch(err){
        res.send(err);
    }
}

const getSoftware = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_software_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err);
    }
}

const deleteSoftware = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_software_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err);
    }
}

const updateSoftware = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const software_name= req.body.software_name;
    const software_description = req.body.software_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_software_master set software_name='${software_name}',software_description='${software_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err);
    }
}


const ActiveSoftware = async (req,res) =>{
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_software_master tsm  with (nolock)  WHERE status ='Active' order by software_name ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}




module.exports={totalSoftware,insertSoftware,getSoftware,deleteSoftware,updateSoftware,ActiveSoftware}
