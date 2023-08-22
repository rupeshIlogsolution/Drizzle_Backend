const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const InsertVendorInvoice = async (req, res) => {
    const org = req.body.org;
    const data = req.body.data;
    const userid = req.body.userid;
    let successcount = 0;
    try {
        await sql.connect(sqlConfig)
        for (let i = 0; i < data.length; i++) {
            const result = await sql.query(`insert into ${org}.dbo.tbl_vendor_invoice(vendor,account_no,invoice_no,invoice_amt,invoice_date,
                invoice_duedate,invoice_subdate,remark,reference_no,printer_counter,invoice_status,add_user_name,add_system_name,
                add_ip_address,add_date_time,status,vend_inv_uuid,uploadInvoice)
                values ('${data[i].vendor}','${data[i].accountno}','${data[i].invno}',${data[i].invamt},'${data[i].invdate}',
                '${data[i].invduedate}','${data[i].invsubdate}',
                '${data[i].remark}','${data[i].refno}','${data[i].printercount}','true','${userid}','${os.hostname()}','${req.ip}',getDate(),'Active','','${data[i].filedata}')`)

            if (result.rowsAffected > 0) {
                successcount = successcount + 1
            }
            else {
                res.send('Error')
                return false;
            }
        }
        if (successcount > 0) res.status(200).send('Data Added')
    }
    catch (err) {
        res.send(err)
    }
}

const PendingVendorInvoice = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
                const result = await sql.query(`select  *,convert(varchar(15),invoice_date,105) as date from ${org}.dbo.tbl_vendor_invoice  WHERE invoice_status ='true' ORDER BY sno DESC  `)

        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const GetVendorInvoice = async (req, res) => {
    const sno = req.body.sno;
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),invoice_date,121) as Invoicedat,convert(varchar(15),invoice_subdate,121) as InvoiceSubdate,
        convert(varchar(15),invoice_duedate,121) as InvoiceDuedate
        from ${org}.dbo.tbl_vendor_invoice  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateVendorInvoice = async (req, res) => {
    const org = req.body.org;
    const data = req.body.data;
    const userid = req.body.userid;
    let successcount = 0;
    try {
        await sql.connect(sqlConfig)
        for (let i = 0; i < data.length; i++) {
            const result = await sql.query(`UPDATE ${org}.dbo.tbl_vendor_invoice set invoice_status='false',payment_detail='${data[i].paymentDetail}',payment_amt='${data[i].PaymentAmt}',
            payment_date='${data[i].Paymentdate}',payment_remark='${data[i].Remark}',update_user_name='${userid}',update_system_name ='${os.hostname()}',
            update_ip_address ='${req.ip}',update_date_time=GETDATE(),uploadpayment='${data[i].filedata}',approved_payment_amt='${data[i].ApprovedAmt}'
            where sno='${data[i].sno}'`)

            if (result.rowsAffected > 0) {
                successcount = successcount + 1
            }
            else {
                res.send('Error')
                return false;
            }
        }
        if (successcount > 0) res.status(200).send('Data Updated')
    }
    catch (err) {
        res.send(err)
    }
}

const UpdatePendingVendorInvoice = async (req, res) => {
    const org = req.body.org;
    const vendor = req.body.vendor;
    const account_no = req.body.accountno;
    const invoice_no = req.body.invno;
    const invoice_amt = req.body.invamt;
    const invoice_date = req.body.invdate;
    const invoice_duedate = req.body.invduedate;
    const invoice_subdate = req.body.invsubdate;
    const reference_no = req.body.refno;
    const remark = req.body.remark;
    const printer_counter = req.body.printercount;
    const sno = req.body.sno;
    const filedata = req.body.filedata;
    const ApprovedAmt = req.body.ApprovedAmt;

    try {
        await sql.connect(sqlConfig)

        const result = await sql.query(`UPDATE ${org}.dbo.tbl_vendor_invoice set 
            vendor='${vendor}',account_no='${account_no}',invoice_no='${invoice_no}',invoice_amt='${invoice_amt}',invoice_date='${invoice_date}',
                invoice_duedate='${invoice_duedate}',invoice_subdate='${invoice_subdate}',remark='${remark}',reference_no='${reference_no}',
                printer_counter='${printer_counter}',uploadInvoice='${filedata}',approved_payment_amt='${ApprovedAmt}' where sno='${sno}'`)
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

const TotalVendorPayment = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  *,convert(varchar(15),payment_date,105) as date from ${org}.dbo.tbl_vendor_invoice  WHERE invoice_status ='false' ORDER BY sno DESC  `)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


const GetVendorPayment = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),payment_date,121) as PaymentDate from ${org}.dbo.tbl_vendor_invoice  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const UpdateVendorPayment = async (req, res) => {
    const org = req.body.org;
    const paymentdetail = req.body.paymentdetail;
    const paymentamt = req.body.paymentamt;
    const paymentdate = req.body.paymentdate;
    const remark = req.body.remark;
    const sno = req.body.sno;
    const filedata = req.body.filedata;
    const ApprovedAmt = req.body.ApprovedAmt;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`UPDATE ${org}.dbo.tbl_vendor_invoice set payment_detail='${paymentdetail}',payment_amt='${paymentamt}',
        payment_date='${paymentdate}',payment_remark='${remark}',uploadpayment='${filedata}',approved_payment_amt='${ApprovedAmt}' where sno='${sno}' `)
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

const UploadDocument = async (req, res) => {
    const org = req.body.org;
    const type = req.body.type;
    const document = req.body.document;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_vendor_invoice set ${type}='${document}' where sno=${sno}`)
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
const VendorInvoiceonChange = async (req, res) => {
    const org = req.body.org;
    let value = req.body.value;
    let data = value.trim()
    try {
        await sql.connect(sqlConfig)
         const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_invoice where (invoice_no LIKE '%${value}%' or reference_no LIKE '%${value}%' or account_no LIKE '%${value}%') AND invoice_status='true'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}



module.exports = { InsertVendorInvoice, PendingVendorInvoice, UpdateVendorInvoice, GetVendorInvoice, UpdatePendingVendorInvoice, UpdatePendingVendorInvoice, TotalVendorPayment, GetVendorPayment, UpdateVendorPayment,UploadDocument,VendorInvoiceonChange }
     
