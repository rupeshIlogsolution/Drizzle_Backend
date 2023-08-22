const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorCode = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master order by vendor_name ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertVendorCode = async (req,res) =>{
    const org = req.body.org;
    const vendor_code_id = req.body.vendor_code_id;
    const vendor_code= req.body.vendor_code;
    const vendor_name = req.body.vendor_name;
    const company_email = req.body.comp_email;
    const company_website= req.body.comp_website;
    const company_gst = req.body.comp_gst;
    const company_phone = req.body.comp_phone;
    const company_country_id = req.body.company_country_id;
    const company_country = req.body.comp_country;
    const company_state_id = req.body.comp_state_id;
    const company_state = req.body.comp_state;
    const company_city = req.body.comp_city;
    const company_pin_code = req.body.comp_pincode;
    const company_address_line1 = req.body.comp_addr1;
    const company_address_line2 = req.body.comp_addr2;
    const venodr_portal = req.body.vendor_portal;
    const contact_person_name = req.body.contact_person;
    const contact_person_phone = req.body.contact_no;
    const contact_person_email = req.body.contact_email;
    const user_id = req.body.user_id;
   
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_vendor_code_master (vendor_code_id,vendor_code,vendor_name,company_email,company_website,
            company_gst,company_phone,company_country_id,company_country,company_state_id,company_state,company_city,company_pin_code,company_address_line1,
            company_address_line2,venodr_portal,contact_person_name,contact_person_phone,contact_person_email,add_user_name,
            add_system_name,add_ip_address,add_date_time,status)
            values('${vendor_code_id}','${vendor_code}','${vendor_name}','${company_email}','${company_website}','${company_gst}','${company_phone}','${company_country_id}',
            '${company_country}','${company_state_id}','${company_state}','${company_city}','${company_pin_code}','${company_address_line1}','${company_address_line2}',
            '${venodr_portal}','${contact_person_name}','${contact_person_phone}','${contact_person_email}','${user_id}','${os.hostname()}',
            '${req.ip}',getDate(),'Active')`)
            
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getVendorCode  = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const deleteVendorCode   = async (req,res) =>{
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_code_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        res.send(err)
    }
}

const updateVendorCode = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
    const vendor_code= req.body.vendor_code;
    const vendor_name = req.body.vendor_name;
    const company_address_line1 = req.body.comp_addr1;
    const company_address_line2 = req.body.comp_addr2;
    const company_city = req.body.comp_city;
    const comp_state_id= req.body.comp_state_id;
    const company_state = req.body.comp_state;
    const company_pin_code = req.body.comp_pincode;
    const company_gst = req.body.comp_gst;
    const company_website= req.body.comp_website;
    const company_email = req.body.comp_email;
    const venodr_portal = req.body.vendor_portal;
    const comp_phone = req.body.comp_phone;
    const comp_country_id=req.body.comp_country_id;
    const comp_country = req.body.comp_country;
    const contact_person = req.body.contact_person;
    const contact_no  = req.body.contact_no;
    const contact_email  = req.body.contact_email;
    const user_id = req.body.user_id;
 
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_code_master set 
        vendor_code='${vendor_code}',vendor_name='${vendor_name}',company_email='${company_email}',company_website='${company_website}',
            company_gst='${company_gst}',company_phone='${comp_phone}',company_country_id='${comp_country_id}',company_country='${comp_country}',
            company_state_id='${comp_state_id}',company_state='${company_state}',company_city='${company_city}',company_pin_code='${company_pin_code}',
            company_address_line1='${company_address_line1}',
        company_address_line2='${company_address_line2}',venodr_portal='${venodr_portal}',contact_person_name='${contact_person}',contact_person_phone='${contact_no}',contact_person_email='${contact_email}',
        update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}

const GetAllVendor = async (req,res) =>{
    const org = req.body.org;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master WHERE status ='Active' order by vendor_name ASC `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const GetVendorDetails = async (req,res) =>{
    const org = req.body.org;
    const vendor_name = req.body.vendor_name
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master WHERE vendor_name = '${vendor_name}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

module.exports = {totalVendorCode,insertVendorCode,getVendorCode,deleteVendorCode,updateVendorCode,GetAllVendor,GetVendorDetails}


