const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorContract = async (req, res) => {
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_contract_master tvcm `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
       res.send(err)
    }
}

const insertVendorContract = async (req, res) => {
    const org = req.body.org;
    const vendor_contract_id = req.body.vendor_contract_id;
    const vendor = req.body.vendor;
    const type_of_contract = req.body.type_of_contract;
    const major_category = req.body.major_category;
    const sub_category = req.body.sub_category;
    const location = req.body.location;
    const company = req.body.company;
    const customer_account_no = req.body.customer_account_no;
    const reference_no = req.body.reference_no;
    const contact_plain_details = req.body.contact_plain_details;
    const rate_per_month = req.body.rate_per_month;
    const contract_start_date = req.body.contract_start_date;
    const invoice_generation_date = req.body.invoice_generation_date;
    const billing_freq = req.body.billing_freq;
    const payee_name = req.body.payee_name;
    const tds = req.body.tds;
    const link_id_no = req.body.link_id_no;
    const help_desk_no = req.body.help_desk_no;
    const userid = req.body.userid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_vendor_contract_master
     (vendor_contract_id,vendor,type_of_contract,major_category,sub_category,
     location,company,customer_account_no,reference_no,contatct_plain_details,rate_per_month,
     contract_start_date,invoice_generation_date,billling_freq,payee_name,tds,link_id_no,help_desk_no,
     add_user_name,add_system_name,add_ip_address,add_date_time,status,vendor_contract_uuid)
     values ('${vendor_contract_id}','${vendor}',
     '${type_of_contract}','${major_category}','${sub_category}','${location}','${company}','${customer_account_no}','${reference_no}',
     '${contact_plain_details}','${rate_per_month}','${contract_start_date}','${invoice_generation_date}',
        '${billing_freq}','${payee_name}','${tds}','${link_id_no}','${help_desk_no}','${userid}',
        '${os.hostname()}','${req.ip}',getDate(),'Active','')`)
        
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Added')
        }
        else {
            res.send('Error')
        }

    }
    catch (err) {
        res.send(err)
    }
}

const getVendorContract = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_contract_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const deleteVendorContract = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_contract_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch (err) {
       res.send(err)
    }
}

const updateVendorContract = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    const vendor = req.body.vendor;
    const type_of_contract = req.body.type_of_contract;
    const major_category = req.body.major_category;
    const sub_category = req.body.sub_category;
    const location = req.body.location;
    const company = req.body.company;
    const customer_account_no = req.body.customer_account_no;
    const reference_no = req.body.reference_no;
    const contact_plain_details = req.body.contact_plain_details;
    const rate_per_month = req.body.rate_per_month;
    const contract_start_date = req.body.contract_start_date;
    const invoice_generation_date = req.body.invoice_generation_date;
    const billing_freq = req.body.billing_freq;
    const payee_name = req.body.payee_name;
    const tds = req.body.tds;
    const link_id_no = req.body.link_id_no;
    const help_desk_no = req.body.help_desk_no;
    const userid = req.body.userid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_contract_master set vendor='${vendor}',type_of_contract='${type_of_contract}',major_category='${major_category}',
        sub_category='${sub_category}',location='${location}',company='${company}',customer_account_no='${customer_account_no}',reference_no='${reference_no}',
        contatct_plain_details='${contact_plain_details}',rate_per_month='${rate_per_month}',
        contract_start_date='${contract_start_date}',invoice_generation_date='${invoice_generation_date}',billling_freq='${billing_freq}',
        payee_name='${payee_name}',tds='${tds}',link_id_no='${link_id_no}',help_desk_no='${help_desk_no}',
        update_user_name='${userid}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getDate() WHERE  sno ='${sno}'`)

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Updated')
        }
        else {
            res.send('Error')
        }

    }
    catch (err) {
        res.send(err)
    }
}


const ActiveVendorContract = async (req, res) => {
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  *  from 
        ${org}.dbo.tbl_vendor_contract_master tvcm   with (nolock)  WHERE status ='Active' order by vendor ASC `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const VendorContractDetail = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  vendor_contract_id,vendor,reference_no,customer_account_no  from 
        ${org}.dbo.tbl_vendor_contract_master tvcm with (nolock) WHERE sno ='${sno}' `)
        res.status(200).send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}

const VendorContractonChange = async (req, res) => {
    const org = req.body.org;
    let value = req.body.value;
    let data = value.trim()

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_contract_master where vendor LIKE '%${data}%' or customer_account_no LIKE '%${data}%' or reference_no LIKE '%${data}%'  AND status='Active' `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
       res.send(err)
    }
}



module.exports = { totalVendorContract, insertVendorContract, getVendorContract, deleteVendorContract, updateVendorContract, ActiveVendorContract, VendorContractDetail,VendorContractonChange }


