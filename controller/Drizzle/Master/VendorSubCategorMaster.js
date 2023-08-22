const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorSubCategory = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_sub_category_master tvscm order by vendor_sub_category ASC  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertVendorSubCategory = async (req,res) =>{
    const org = req.body.org;
    const vendor_sub_category_id = req.body.vendor_sub_category_id;
    const vendor_category= req.body.vendor_category;
    const vendor_sub_category = req.body.vendor_sub_category;
    const vendor_sub_category_description = req.body.vendor_sub_category_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_vendor_sub_category_master (vendor_sub_category_id ,vendor_category ,vendor_sub_category  ,vendor_sub_category_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${vendor_sub_category_id}','${vendor_category}','${vendor_sub_category}','${vendor_sub_category_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getVendorSubCategory  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_sub_category_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteVendorSubCategory   = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_sub_category_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateVendorSubCategory  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const vendor_category= req.body.vendor_category;
    const vendor_sub_category = req.body.vendor_sub_category;
    const vendor_sub_category_description = req.body.vendor_sub_category_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_sub_category_master set vendor_category='${vendor_category}',vendor_sub_category='${vendor_sub_category}',vendor_sub_category_description='${vendor_sub_category_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}
const getVendorSubCategoryby = async (req,res) =>{
    const org = req.body.org;
    const vendor_category = req.body.vendor_category

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_sub_category_master where vendor_category = '${vendor_category}' order by vendor_sub_category ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }

}

module.exports = {totalVendorSubCategory,insertVendorSubCategory,getVendorSubCategory,deleteVendorSubCategory,updateVendorSubCategory,getVendorSubCategoryby}


