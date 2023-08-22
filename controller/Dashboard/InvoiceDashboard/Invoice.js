const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const Invoice_Outstanding = async (req, res) => {
    const org = req.body.org;
    const data = []
    try {
        await sql.connect(sqlConfig)
        const Vendor = await sql.query(`select count(vendor) as TotalVendor from IPERISCOPE.dbo.tbl_vendor_invoice WHERE invoice_status ='true'`)
        const OutstandingAmount = await sql.query(`select SUM(convert(float,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'`)
        const OutstandingVendor = await sql.query(`select SUM(convert(float,invoice_amt) ) as total,vendor,Count(invoice_no) as countinvoice from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true' GROUP by vendor`)

        res.status(200).json({
            Vendor: Vendor.recordset[0],
            OutstandingAmount: OutstandingAmount.recordset[0].total,
            OutstandingVendor: OutstandingVendor.recordset,
        })
    }
    catch (err) {
        res.send(err)
    }
}

const TotalOutstanding = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select *,convert(varchar(15),invoice_date,105) as date,convert(varchar(15),payment_date,105) as Payment_date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const VendorInvoice = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage;
    const vendorname = req.body.vendorname;
    try {
        await sql.connect(sqlConfig)
        if (vendorname == 'all') {
            var Outstanding = await sql.query(`select inv.*,convert(varchar(15),inv.invoice_date,105) as date ,cont.company  from IPERISCOPE.dbo.tbl_vendor_invoice as inv left Join IPERISCOPE.dbo.tbl_vendor_contract_master as cont on inv.reference_no=cont.reference_no where inv.invoice_status ='true' order by inv.sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
            var countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' `)
        }
        else {
            var Outstanding = await sql.query(`select inv.*,convert(varchar(15),inv.invoice_date,105) as date ,cont.company  from IPERISCOPE.dbo.tbl_vendor_invoice as inv left Join IPERISCOPE.dbo.tbl_vendor_contract_master as cont on inv.reference_no=cont.reference_no where inv.invoice_status ='true' and inv.vendor Like '${vendorname}%' order by inv.sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
            var countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' and vendor Like '${vendorname}%'`)
        }
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const ExportOutstandingInvoiceData = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select vendor,invoice_no,account_no,invoice_amt,convert(varchar(15),invoice_date,105) as invoice_date,convert(varchar(15),invoice_duedate,105) as invoice_duedate,convert(varchar(15),invoice_subdate,105) as invoice_subdate,remark,printer_counter,uploadInvoice  from ${org}.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true'  order by sno ASC `)
        // const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' `)
        res.send({ data: Outstanding.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const PaidInvoice = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select *,convert(varchar(15),payment_date,105) as Payment_date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const FilterInvoice = async (req, res) => {
    const org = req.body.org;
    const values = req.body.value;
    const value = values.trim();
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select *,convert(varchar(15),invoice_date,105) as date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where ( vendor LIKE '%${value}%' or invoice_no LIKE '%${value}%' or reference_no LIKE '%${value}%' or invoice_amt LIKE '%${value}%')  order by sno DESC  OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where  (vendor LIKE '%${value}%' or invoice_no LIKE '%${value}%' or reference_no LIKE '%${value}%' or invoice_amt LIKE '%${value}%')  `)
        const PaidInv = await sql.query(`select *,convert(varchar(15),payment_date,105) as Payment_date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and (vendor LIKE '%${value}%' or invoice_no LIKE '%${value}%' or reference_no LIKE '%${value}%' or invoice_amt LIKE '%${value}%' )  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const Paiddata = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and (vendor LIKE '%${value}%' or invoice_no LIKE '%${value}%' or reference_no LIKE '%${value}%' or invoice_amt LIKE '%${value}%' )  `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset, PaidInv: PaidInv.recordset, Paiddata: Paiddata.recordset })
    }
    catch (err) {
        res.send(err)
    }
}

const Recurring_Pending_Invoice = async (req, res) => {
    const { org, billling_freq } = req.body;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentdate = `${year}-${month}-${day}`
    
    switch(billling_freq){
        case('Monthly'):{
            month = date.getMonth() + 1;
            break;
        }
        case('Quarterly'):{
            month = date.getMonth() - 1;
            break;
        }
        case('6 Months'):{
            month = date.getMonth() - 4;
            break;
        }
        case('Annually'):{
            month = date.getMonth() + 2;
            year = date.getFullYear()-1;
            break;
        }
        
    }
    let startdate = `${year}-${month}-01`
    console.log(billling_freq,startdate)

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from IPERISCOPE.dbo.tbl_vendor_contract_master where 
        reference_no  in (select  reference_no from IPERISCOPE.dbo.tbl_vendor_invoice tvi where  convert(date,invoice_date) between '${startdate}' and '${currentdate}') 
        and type_of_contract = 'Recurring' and billling_freq='${billling_freq}'`)

        const pendingresult = await sql.query(`SELECT * from IPERISCOPE.dbo.tbl_vendor_contract_master where 
        reference_no not in (select  reference_no from IPERISCOPE.dbo.tbl_vendor_invoice tvi where  convert(date,invoice_date) between '${startdate}' and '${currentdate}') 
        and type_of_contract = 'Recurring' and billling_freq='${billling_freq}'`)
        res.status(200).json({
            result: result.recordset,
            pendingresult: pendingresult.recordset
        }
        )
    }
    catch (err) {
        res.send(err)
    }
}

const Outstanding_Invoice_filter = async (req, res) => {
    const org = req.body.org;
    const type = req.body.type;
    const value = req.body.value
    try {
        await sql.connect(sqlConfig)
        if (type == 'Vendor') {
            const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master tvcm  where vendor_name = '${value}'`)
            res.send(result.recordset)
        } else if (type == 'Invoice') {
            const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice where invoice_no ='${value}'`)
            res.send(result.recordset)
        } else {
            const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_contract_master where reference_no ='${value}'`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = { Invoice_Outstanding, TotalOutstanding, VendorInvoice, PaidInvoice, FilterInvoice, Recurring_Pending_Invoice, Outstanding_Invoice_filter, ExportOutstandingInvoiceData }
