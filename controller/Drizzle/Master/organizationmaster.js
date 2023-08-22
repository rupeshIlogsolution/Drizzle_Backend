const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalOrganization= async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_organization_master tom`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertOrganization = async (req,res) =>{
    const company_id = req.body.company_id;
    const company_name= req.body.company_name;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website = req.body.company_website;
    const company_email = req.body.company_email;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_organization_master (company_id,company_name,company_address_line1,company_address_line2,company_city,company_state,comapany_pin_code,company_gst,company_website,company_email,Status,add_username,add_system_name,add_ip,add_date_time)
        values('${company_id}','${company_name}','${company_address_line1}','${company_address_line2}','${company_city}','${company_state}',${company_pin_code},'${company_gst}','${company_website}','${company_email}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getOrganization= async (req,res) =>{
    const sno = req.body.sno;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_organization_master tom where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteOrganization= async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_organization_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateOrganization = async (req,res) =>{
    const sno = req.body.sno;
    const company_name= req.body.company_name;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website = req.body.company_website;
    const company_email = req.body.company_email;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_organization_master set company_name='${company_name}',company_address_line1='${company_address_line1}',company_address_line2='${company_address_line2}',company_city='${company_city}',company_state='${company_state}',comapany_pin_code=${company_pin_code}
        ,company_gst='${company_gst}',company_website='${company_website}',company_email='${company_email}',update_username='${user_id}',update_system_name='${os.hostname}',update_system_ip='${req.ip}',update_date_time=getdate()	where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totalOrganization,insertOrganization,getOrganization,deleteOrganization,updateOrganization}