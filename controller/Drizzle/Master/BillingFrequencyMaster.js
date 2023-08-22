const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalBillingFrequency = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_billing_freq_master tbfm order by billing_freq ASC`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertBillingFrequency = async (req,res) =>{
    const org = req.body.org;
    const billing_freq_id = req.body.billing_freq_id;
    const billing_freq= req.body.billing_freq;
    const billing_freq_description = req.body.billing_freq_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_billing_freq_master (billing_freq_id  ,billing_freq  ,billing_freq_description ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${billing_freq_id}','${billing_freq}','${billing_freq_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getBillingFrequency  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_billing_freq_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteBillingFrequency   = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_billing_freq_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateBillingFrequency  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const billing_freq= req.body.billing_freq;
    const billing_freq_description = req.body.billing_freq_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_billing_freq_master set billing_freq='${billing_freq}',billing_freq_description='${billing_freq_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}


const ActiveBillingFreq   = async (req,res) =>{
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select sno,billing_freq_id,billing_freq from ${org}.dbo.tbl_billing_freq_master tbfm   with (nolock)  WHERE status ='Active' order by billing_freq ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {totalBillingFrequency,insertBillingFrequency,getBillingFrequency,deleteBillingFrequency,updateBillingFrequency,ActiveBillingFreq}


