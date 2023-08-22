const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalPurchasetype = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_type_master tptm order by purchase_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertPurchasetype = async (req,res) =>{
    const org = req.body.org;
    const purchase_id = req.body.purchase_id;
    const purchase_type= req.body.purchase_type;
    const purchase_description = req.body.purchase_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_purchase_type_master (purchase_id  ,purchase_type ,purchase_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${purchase_id}','${purchase_type}','${purchase_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getPurchasetype = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deletePurchasetype = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_purchase_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updatePurchasetype = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const purchase_type= req.body.purchase_type;
    const purchase_description = req.body.purchase_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_purchase_type_master set purchase_type='${purchase_type}',purchase_description='${purchase_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}

const ActivePurchasetype = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_purchase_type_master with (nolock) WHERE status ='Active' order by purchase_type ASC  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}


module.exports = {totalPurchasetype,insertPurchasetype,getPurchasetype,deletePurchasetype,updatePurchasetype,ActivePurchasetype}


