const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalAssetType = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_asset_type_master  order by asset_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertAssetType = async (req,res) =>{
    const org = req.body.org;
    const asset_type_id = req.body.asset_type_id;
    const asset_type= req.body.asset_type;
    const asset_description = req.body.asset_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const duplicate = await sql.query(`select * from ${org}.dbo.tbl_asset_type_master where asset_type='${asset_type}'`)
        if (duplicate.recordset.length > 0) {
            res.send("Already")
        }else{
        const result = await sql.query(`insert into ${org}.dbo.tbl_asset_type_master (asset_type_id ,asset_type ,asset_description,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${asset_type_id}','${asset_type}','${asset_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
        }
    }
    catch(err){
        res.send(err)
    }
}

const getAssetType = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_asset_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteAssetType = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_asset_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateAssetType = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const asset_type= req.body.asset_type;
    const asset_description = req.body.asset_description;
    const user_id = req.body.user_id;
   
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_asset_type_master set asset_type='${asset_type}',asset_description='${asset_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}

const ActiveAssetesType = async (req,res) =>{
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  sno,asset_type_id,asset_type from ${org}.dbo.tbl_asset_type_master tatm  WHERE status ='Active' order by asset_type ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = {totalAssetType,insertAssetType,getAssetType,deleteAssetType,updateAssetType,ActiveAssetesType}
