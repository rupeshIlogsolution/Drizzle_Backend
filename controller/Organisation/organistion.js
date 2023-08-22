const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const AddOrganisation = async (req,res) =>{
    const org_id = req.body.org_id;
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_city = req.body.org_city;
    const org_currency = req.body.org_currency;
    const org_gst = req.body.org_gst;
    const org_logo = req.body.org_logo;

    console.log(org_id,org_name,org_country,org_state,org_city,org_currency,org_gst,org_logo)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_Organisation (org_id,org_name,org_country,org_state,org_city,org_currency,org_gst,org_logo)
        values('${org_id}','${org_name}','${org_country}','${org_state}','${org_city}','${org_currency}','${org_gst}','${org_logo}')`)
        res.status(200).send("Added")

    }
    catch(err){
        console.log(err)
    }
}

const getOrganisation = async (req,res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select to2 .*, c.country_name,s.state_name  from IPERISCOPE.dbo.tbl_Organisation as to2 left JOIN IPERISCOPE.dbo.tbl_country_master  as c ON to2.org_country =c.country_id left JOIN IPERISCOPE.dbo.tbl_state_master  as s ON to2 .org_state  = s.state_id   where org_name = '${org}'`)
        res.status(200).send(result.recordset[0])

    }
    catch(err){
        console.log(err)
    }
}

const updateOrganizationDetails = async (req,res) => {
    const org = req.body.org;
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_city = req.body.org_city;
    const org_currency = req.body.org_currency;
    console.log(`update IPERISCOPE.dbo.tbl_Organisation set org_name='${org_name}', org_country='${org_country}',org_state='${org_state}',org_city='${org_city}',org_currency='${org_currency}' where org_name =${org}`)
    console.log(org,org_name,org_country,org_state,org_city,org_currency)
 

  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_Organisation set org_name='${org_name}', org_country='${org_country}',org_state='${org_state}',org_city='${org_city}',org_currency='${org_currency}' where org_name = '${org}'`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports={AddOrganisation,getOrganisation,updateOrganizationDetails}