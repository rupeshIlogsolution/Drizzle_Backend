const express = require('express');
const app  = express();
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const schedule = require('node-schedule')
const path = require("path");
const XLSX = require("xlsx");
const nodemailer = require('nodemailer');

const port = 2008;

const job = schedule.scheduleJob(' 0 20 18 * * 0-7 ', async function (req, res) {
  var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var startday = year + "-" + month + "-" + '01';
    var endday = year + "-" + month + "-" + day;
   
  try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_ticket where add_user_name = 'yuvraj01' and ticket_date BETWEEN '${startday}' and '${endday}'`)
    const Outstanding_Report = await sql.query(`SELECT vendor as Vendor,convert(varchar(15),invoice_date,121) as Invoice_Date,invoice_no as Invoice_no,
    invoice_amt,account_no as Account_Number,printer_counter as Reading,remark as Remarks,
    uploadInvoice as File_url,case when uploadInvoice ='' then 'N'
    else 'Y' end as Uploaded
    from IPERISCOPE.dbo.tbl_vendor_invoice tvi WHERE invoice_status='true'`)

    const AssetReport = await sql.query(`select asset_type as Device_Type,manufacture as Manufacturer,model as Model,serial_no as Serial_Number,
    asset_tag as Asset_Tag,asset_status as Status,company as Company,convert(varchar(15),purchase_date,121) as Date_of_Purchase ,
    vendor as Vendor,purchase_type as Asset_Type,location as Location,asset_name as Asset_Name,
    asset_assign as User_Name,asset_assign_empid as User_id
    from IPERISCOPE.dbo.tbl_new_assets
    `)

    const TicketSummary = await sql.query(`select * from IPERISCOPE.dbo.tbl_ticket `)

    const RecurringInvoice = await sql.query(`SELECT vendor as Vendor,customer_account_no as Account_number,reference_no as Reference,rate_per_month as Recurring_Amount,location as Location,
    billling_freq as Frequency, invoice_generation_date as Invoice_date
    from IPERISCOPE.dbo.tbl_vendor_contract_master where
    reference_no not in (select reference_no from IPERISCOPE.dbo.tbl_vendor_invoice tvi where invoice_status='true' )
    and type_of_contract = 'Recurring'`)

    ExcelRecurring(RecurringInvoice.recordset)
    ExcelTicket(TicketSummary.recordset)
    ExcelAssetdata(AssetReport.recordset)
    ExcelOutstandingdata(Outstanding_Report.recordset)
    ExcelConvertdata(result.recordset)
  }
  catch (err) {
    console.log(err)
}})

const workSheetRecurringColumnName =[
  "Vendor",
  "Account_number",
  "Reference ",
  "Recurring_Amount:",
  "Location",
  "Frequency",
  "Invoice_date",
];
const workSheetRecurringName = 'Recurring Invoice'
const Recurringfilepath =  './recurring.xlsx'

function ExcelRecurring(dataList){
  const data = dataList.map(user=>{
    return [user.Vendor,user.Account_number,user.Reference,user.Recurring_Amount,user.Location,user.Frequency,user.Invoice_date
      ]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetRecurringColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetRecurringName);
  XLSX.writeFile(workBook,path.resolve(Recurringfilepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    RecurringEmail()
  }
  return true;
}

const RecurringEmail = async(req,res)=>{
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: `swishlohan420@gmail.com`, // list of receivers
      cc:['rupeshlkr93@gmail.com'],
      subject: 'Report', // Subject line
      html: "<b>This is Daily Report</b>", // html body
      attachments:[
        {
        filename:'recurring.xlsx',
        path: './recurring.xlsx'
        }

      ]
    })
    // res.send(info)
    console.log("Send")

  }
  catch(err){
    console.log(err);
  }
  
}

const workSheetTicketColumnName =[
  "ASSIGN_TICKET",
  "TICKET_DATE",
  "TICKET_STATUS ",
  "EMP_NAME",
  "TYPE_OF_ISSUE",
  "TICKET_SUBJECT",
  "PRIORITY",
  "ASSET_TYPE",
  "ADD_USER_NAME",
  "ASSET_TAG"
 
];
const workSheetTicketName = 'Ticket Summary'
const Ticketfilepath =  './ticket.xlsx'

function ExcelTicket(dataList){
  const data = dataList.map(user=>{
    return [user.assign_ticket,user.ticket_date,user.ticket_status,user.emp_name,user.type_of_issue,user.ticket_subject,user.priority,user.asset_type,user.add_user_name,
            user.asset_tag]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetTicketColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetTicketName);
  XLSX.writeFile(workBook,path.resolve(Ticketfilepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    TicketEmail()
  }
  return true;
}

const TicketEmail = async(req,res)=>{
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: `swishlohan420@gmail.com`, // list of receivers
      cc:['rupeshlkr93@gmail.com'],
      subject: 'Report', // Subject line
      html: "<b>This is Daily Report</b>", // html body
      attachments:[
        {
        filename:'ticket.xlsx',
        path: './ticket.xlsx'
        }

      ]
    })
    // res.send(info)
    console.log("Send")

  }
  catch(err){
    console.log(err);
  }
  
}

const workSheetAssetColumnName =[
  "Device_Type",
  "Manufacturer",
  "Model ",
  "Serial_Number",
  "Asset_Tag",
  "Status",
  "Company",
  "Date_of_Purchase",
  "Vendor",
  "Asset_Type",
  "Location",
  "Asset_Name",
  "User_Name",
  "User_id"
];
const workSheetAssetName = 'Asset'
const Assetfilepath =  './asset.xlsx'

function ExcelAssetdata(dataList){
  const data = dataList.map(user=>{
    return [user.Device_Type,user.Manufacturer,user.Model,user.Serial_Number,user.Asset_Tag,user.Status,user.Company,user.Date_of_Purchase,user.Vendor,
            user.Asset_Type,user.Location,user.Asset_Name,user.User_Name,user.User_id]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetAssetColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetAssetName);
  XLSX.writeFile(workBook,path.resolve(Assetfilepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    AssetEmail()
  }
  return true;
}


const AssetEmail = async(req,res)=>{
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: `swishlohan420@gmail.com`, // list of receivers
      cc:['rupeshlkr93@gmail.com'],
      subject: 'Report', // Subject line
      html: "<b>This is Daily Report</b>", // html body
      attachments:[
        {
        filename:'asset.xlsx',
        path: './asset.xlsx'
        }

      ]
    })
    // res.send(info)
    console.log("Send")

  }
  catch(err){
    console.log(err);
  }
  
}

const workSheetOutstandingColumnName =[
  "Vendor",
  "Invoice_Date",
  "Invoice_no ",
  "invoice_amt",
  "Account_Number",
  "Reading",
  "Remarks",
  "File_url",
  "Uploaded:"
];
const workSheetOutstandingName = 'Outstanding'
const Outstandingfilepath =  './outstanding.xlsx'

function ExcelOutstandingdata(dataList){
  const data = dataList.map(user=>{
    return [user.Vendor,user.Invoice_Date,user.Invoice_no,user.invoice_amt,user.Account_Number,user.Reading,user.Remarks,user.File_url,user.Uploaded]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetOutstandingColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetOutstandingName);
  XLSX.writeFile(workBook,path.resolve(Outstandingfilepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    OutstandingEmail()
  }
  return true;
}

const OutstandingEmail = async(req,res)=>{
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: `swishlohan420@gmail.com`, // list of receivers
      cc:['rupeshlkr93@gmail.com'],

      subject: 'Report', // Subject line
      html: "<b>This is Daily Report</b>", // html body
      attachments:[
        {
        filename:'outstanding.xlsx',
        path: './outstanding.xlsx'
        }

      ]
    })
    // res.send(info)
    console.log("Send")

  }
  catch(err){
    console.log(err);
  }
  
}

const workSheetColumnName =[
  "Employee Name",
  "Asset Type",
  "Email ",
  "Status"
];
const workSheetName = 'Tickets'
const filepath =  './data.xlsx'

function ExcelConvertdata(dataList){
  const data = dataList.map(user=>{
    return [user.emp_name,user.asset_type,user.email_id,user.ticket_status]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetName);
  XLSX.writeFile(workBook,path.resolve(filepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    Email()
  }
  return true;
}

const Email = async(req,res)=>{
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: `swishlohan420@gmail.com`, // list of receivers
      cc:['rupeshlkr93@gmail.com'],
      subject: 'Report', // Subject line
      html: "<b>This is Daily Report</b>", // html body
      attachments:[
        {
        filename:'data.xlsx',
        path: './data.xlsx'
        }

      ]
    })
    // res.send(info)
    console.log("Send")

  }
  catch(err){
    console.log(err);
  }
  
}


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function(req,res){
  console.log('diwi')
    res.send('Hello')
})
app.get('/test',(req,res)=>{
  console.log('test')
  res.send('test Done')
})
app.use('/api',router)

app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
