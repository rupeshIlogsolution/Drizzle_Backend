const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const ReferanceNumber = async(req,res) =>{
    const org = req.body.org
    try{
        await sql.connect(sqlConfig)
        const ReferanceNo = await sql.query(`select count(vendor_contract_id) as data from IPERISCOPE.dbo.tbl_vendor_contract_master where reference_no is not null`)
        res.send(ReferanceNo.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const RecurringVendor = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try{
        await sql.connect(sqlConfig)
        const Recurring = await sql.query(`select vendor,location,major_category,sub_category,customer_account_no,reference_no,help_desk_no,billling_freq from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock) where type_of_contract = 'Recurring' order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock) where type_of_contract = 'Recurring'`)
        res.send({data:Recurring.recordset,TotalData:countData.recordset})
    }
    catch(err){
        console.log(err)
  
    }
}

const TotalVendorContract = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try{
        await sql.connect(sqlConfig)
        const Recurring = await sql.query(`select vendor,location,major_category,sub_category,customer_account_no,reference_no,help_desk_no,billling_freq from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock)  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock)`)
        res.send({data:Recurring.recordset,TotalData:countData.recordset})
    }
    catch(err){
        console.log(err)
    }
}

const ExportTotalVendorContract = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try{
        await sql.connect(sqlConfig)
        const Recurring = await sql.query(`select vendor,location,major_category,sub_category,customer_account_no,reference_no,help_desk_no,billling_freq from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock)  order by sno ASC`)
        // const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock)`)
        res.send({data:Recurring.recordset})
    }
    catch(err){
        console.log(err)
    }
}

const RecurringFrequency = async(req,res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const MonthlyFreq = await sql.query(`select count(*) as Monthly from IPERISCOPE.dbo.tbl_vendor_contract_master where billling_freq='Monthly'`)
        const QuaterlyFreq = await sql.query(`select count(*) as Quaterly from IPERISCOPE.dbo.tbl_vendor_contract_master where billling_freq='Quarterly'`)
        const AnnualyFreq = await sql.query(`select count(*) as Annually from IPERISCOPE.dbo.tbl_vendor_contract_master where billling_freq='Annually'`)
        const InvoiceReceived = await sql.query(`select count(*) as InvoiceRecived from IPERISCOPE.dbo.tbl_vendor_contract_master`)

        res.status(200).json({
            "Monthly":MonthlyFreq.recordset[0].Monthly,
            "Quaterly":QuaterlyFreq.recordset[0].Quaterly,
            "Annualy":AnnualyFreq.recordset[0].Annually,
            "InvoiceReceived":InvoiceReceived.recordset[0].InvoiceRecived,
        })
    }
    catch(err){
        console.log(err)
    }
}

const FilterVendorContract = async(req,res) =>{
    const org = req.body.org;
    const type = req.body.type;
    const value = req.body.value;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try{
        await sql.connect(sqlConfig)
        const Recurring = await sql.query(`select vendor,location,major_category,sub_category,customer_account_no,reference_no,help_desk_no,billling_freq from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock) where ${type}='${value}' order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_contract_master with (nolock) where ${type}='${value}'`)
        res.send({data:Recurring.recordset,TotalData:countData.recordset})

    }
    catch(err){
        console.log(err)
  
    }
}

module.exports={ReferanceNumber,RecurringVendor,RecurringFrequency,TotalVendorContract,FilterVendorContract,ExportTotalVendorContract}