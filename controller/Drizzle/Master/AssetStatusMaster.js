const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalAssetStatus = async (req,res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_asset_status_master order by asset_status ASC`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertAssetStatus = async (req,res) =>{
    const org = req.body.org;
    const asset_status_id = req.body.asset_status_id;
    const asset_status= req.body.asset_status;
    const asset_status_description = req.body.asset_status_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_asset_status_master (asset_status_id  ,asset_status  ,asset_status_description ,status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${asset_status_id}','${asset_status}','${asset_status_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getAssetStatus = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_asset_status_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteAssetStatus = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_asset_status_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateAssetStatus = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const asset_status= req.body.asset_status;
    const asset_status_description = req.body.asset_status_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_asset_status_master set asset_status='${asset_status}',asset_status_description='${asset_status_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}


const ActiveAssetesStatus = async (req,res) =>{
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_asset_status_master tasm with (nolock)  WHERE status ='Active' order by asset_status ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}





module.exports = {totalAssetStatus,insertAssetStatus,getAssetStatus,deleteAssetStatus,updateAssetStatus,ActiveAssetesStatus}