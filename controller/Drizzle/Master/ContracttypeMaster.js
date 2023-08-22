const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalContracttype = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_contract_type_master tctm order by contract_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertContracttype = async (req,res) =>{
    const org = req.body.org;
    const contract_id = req.body.contract_id;
    const contract_type= req.body.contract_type;
    const contract_description = req.body.contract_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_contract_type_master (contract_id  ,contract_type ,contract_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${contract_id}','${contract_type}','${contract_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getContracttype = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_contract_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteContracttype = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_contract_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateContracttype = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const contract_type= req.body.contract_type;
    const contract_description = req.body.contract_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_contract_type_master set contract_type='${contract_type}',contract_description='${contract_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}
const getAllContracttype = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_contract_type_master WHERE status ='Active' order by contract_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }

}

module.exports = {totalContracttype,insertContracttype,getContracttype,deleteContracttype,updateContracttype,getAllContracttype}


