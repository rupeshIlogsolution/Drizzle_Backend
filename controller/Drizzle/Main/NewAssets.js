const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const TotalNewAssets = async (req, res) => {
    const org = req.body.org;
    const type = req.body.type;
      try {
        await sql.connect(sqlConfig)
        if(type.length>0){
            console.log(`hlo`)

            const result = await sql.query(`select sno,vendor,asset_tag,asset_name,serial_no,purchase_type,asset_type,asset_assign,location,asset_status,convert(varchar(15),purchase_date,121) as Assetdate from IPERISCOPE.dbo.tbl_new_assets with (nolock) where location = '${type}' order by asset_type ASC`)
            res.status(200).send(result.recordset)
        }else{
            console.log(`select vendor,asset_tag,asset_name,serial_no,purchase_type,asset_type,asset_assign,location,asset_status,convert(varchar(15),purchase_date,121) as Assetdate from ${org}.dbo.tbl_new_assets with (nolock) order by asset_type ASC`)
            const result = await sql.query(`select sno,vendor,asset_tag,asset_name,serial_no,purchase_type,asset_type,asset_assign,location,asset_status,convert(varchar(15),purchase_date,121) as Assetdate from ${org}.dbo.tbl_new_assets with (nolock) order by asset_type ASC `)
            res.status(200).send(result.recordset)
        } 
    }
    catch (err) {
        res.send(err)
    }
}

const InsertNewAssets = async (req, res) => {
    const org = req.body.org;
    const new_asset_type_id = req.body.new_asset_type_id;
    const asset_type = req.body.asset_type;
    const asset_tag = req.body.asset_tag;
    const serial_no = req.body.serial_no;
    const location = req.body.location;
    const manufacture = req.body.manufacture;
    const software = req.body.software;
    const model = req.body.model;
    const asset_status = req.body.asset_status;
    const description = req.body.description;
    const purchase_type = req.body.purchase_type;
    const purchase_date = req.body.purchase_date;
    const company = req.body.company;
    const vendor = req.body.vendor;
    const invoice_no = req.body.invoice_no;
    const rent_per_month = req.body.rent_per_month;
    const purchases_price = req.body.purchases_price;
    const latest_inventory = req.body.latest_inventory;
    const asset_name = req.body.asset_name;
    const asset_assign = req.body.asset_assign;
    const asset_assign_empid = req.body.asset_assign_empid;
    const remarks = req.body.remarks;
    const userid = req.body.userid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_new_assets (new_asset_type_id,asset_type,asset_tag,serial_no,location,manufacture,
            software,model,asset_status,description,purchase_type,purchase_date,company,vendor,invoice_no,
            rent_per_month,purchases_price,latest_inventory,asset_name,asset_assign,asset_assign_empid,remarks,add_user_name,
            add_system_name,add_ip_address,add_date_time,status,new_assets_uuid)
            values ('${new_asset_type_id}','${asset_type}','${asset_tag}','${serial_no}','${location}','${manufacture}','','${model}',
            '${asset_status}','${description}','${purchase_type}','${purchase_date}','${company}','${vendor}','${invoice_no}','${rent_per_month}',
            '${purchases_price}','${latest_inventory}','${asset_name}','${asset_assign}','${asset_assign_empid}','${remarks}','${userid}',
            '${os.hostname()}','${req.ip}',getDate(),'Active','')`)
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Data Added')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}

const DeleteNewAssets = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        await sql.query(`update ${org}.dbo.tbl_new_assets set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch (err) {
        res.send(err)
    }
}

const GetNewAssets = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),purchase_date,121) as Assetdate,convert(varchar(15),latest_inventory,121) as latest_inventorynew from ${org}.dbo.tbl_new_assets  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const CountNewAssets = async (req, res) => {
    const asset_type = req.body.asset_type;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT COUNT(sno) as count FROM ${org}.dbo.tbl_new_assets WHERE asset_type='${asset_type}'`)
        if (result.rowsAffected[0] > 0) {
            res.status(200).send(result.recordset[0])
        }
        else {
            res.send('Error')
        }

    }
    catch (err) {
        res.send(err)
    }
}


const GetNewAssetAssign = async (req, res) => {
    const asset_assign_empid = req.body.asset_assign_empid;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select asset_type,serial_no,manufacture from ${org}.dbo.tbl_new_assets with (nolock) where asset_assign_empid= '${asset_assign_empid}'`)
        if (result) {
            res.status(200).send(result.recordset)
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}


const UpdateNewAssets = async (req, res) => {
    const org = req.body.org;
    const asset_type = req.body.asset_type;
    const asset_tag = req.body.assetetag;
    const serial_no = req.body.serialno;
    const location = req.body.location;
    const manufacture = req.body.manufacture;
    const software = req.body.software;
    const model = req.body.model;
    const asset_status = req.body.assetstatus;
    const description = req.body.description;
    const purchase_type = req.body.purchase_type;
    const purchase_date = req.body.purchasesdate;
    const company = req.body.company;
    const vendor = req.body.vendor;
    const invoice_no = req.body.invoiceno;
    const rent_per_month = req.body.rentpermonth;
    const purchases_price = req.body.purchaseprice;
    const latest_inventory = req.body.latestinventory;
    const asset_name = req.body.assetname;
    const asset_assign = req.body.assetassign;
    const asset_assign_empid = req.body.asset_assign_empid;
    const remarks = req.body.remark;
    const userid = req.body.userid;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`
        update ${org}.dbo.tbl_new_assets set 
        asset_type='${asset_type}',asset_tag='${asset_tag}',serial_no='${serial_no}',location='${location}',manufacture='${manufacture}',
             software='${software}',model='${model}',asset_status='${asset_status}',description='${description}',purchase_type='${purchase_type}',
                purchase_date='${purchase_date}',company='${company}',vendor='${vendor}',invoice_no='${invoice_no}',
             rent_per_month='${rent_per_month}',purchases_price='${purchases_price}',latest_inventory='${latest_inventory}',asset_name='${asset_name}',
                asset_assign='${asset_assign}',asset_assign_empid='${asset_assign_empid}',remarks='${remarks}',update_user_name='${userid}',
                update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getDate() where sno='${sno}'`)

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Data Updated')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}



module.exports = { TotalNewAssets, InsertNewAssets, DeleteNewAssets, GetNewAssets, CountNewAssets, GetNewAssetAssign, UpdateNewAssets }
