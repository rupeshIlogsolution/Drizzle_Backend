const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");

const VendorContractEmail = async(req,res)=>{
  const message = req.body.message;
    subject = `New vendor contract (${message.referance_no}) for (${message.vendor_name}) is created.`
    var html = await ejs.renderFile(path.join(__dirname, `./Vendorcontracttemplate/vendorcontract.ejs`),message)

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `support@awlindia.com`, // list of receivers
      cc:['support@ilogsolution.com'],
      subject: subject, // Subject line
      html: html, // html body
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  } 
}

const EmployeeCreateEmail = async(req,res)=>{
  const message = req.body.message;
    subject = `New Employee (${message.employee_name}) is created.`
    var html = await ejs.renderFile(path.join(__dirname, `./Employeetemplate/employee.ejs`),message)

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `support@awlindia.com`, // list of receivers
      cc:['support@ilogsolution.com'],
      subject: subject, // Subject line
      html: html, // html body
     
    })
    res.send(info)
  }
  catch(err){
    console.log(err);
  } 
}

const VendorCreateEmail = async(req,res)=>{
  const message = req.body.message;
    subject = `New vendor (${message.vendor_name}) is created.`
    var html = await ejs.renderFile(path.join(__dirname, `./VendorCreatetemplate/vendor.ejs`),message)

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `support@awlindia.com`, // list of receivers
      cc:['support@ilogsolution.com'],
      subject: subject, // Subject line
      html: html, // html body
     
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  } 
}

const VendorPaymentEmail = async(req,res)=>{
  const message = req.body.message;
  
    subject = `Payment Update - (${message.invoice_number} by ${message.vendor_name} for ${message.referance_no})`
    var html = await ejs.renderFile(path.join(__dirname, `./vendorpaytemplate/vendorpayment.ejs`),message)

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `${message.mailid}`, // list of receivers
      cc:['support@awlindia.com','support@ilogsolution.com','finance@awlindia.com'],
      subject: subject, // Subject line
      html: html, // html body
     
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  } 
}

const InvoiceEmail = async(req,res)=>{
  const message = req.body.message;
    subject = `New Invoice Updated - (${message.invoiceno} by ${message.vendorname} for ${message.reference_no})`
    var html = await ejs.renderFile(path.join(__dirname, `./Invoicetemplate/newInvoice.ejs`),message)

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `finance@awlindia.com`, // list of receivers
      cc:['support@awlindia.com','support@ilogsolution.com'],
      subject: subject, // Subject line
      html: html, // html body
    })
    res.send(info)
  }
  catch(err){
    console.log(err);
  } 
}

const AssetEmail = async(req,res)=>{
  const message = req.body.message;
  if(message.type == 'Add'){
    subject = `IT Asset (${message.Serial_No}) assigned to ${message.Name}`
    var html = await ejs.renderFile(path.join(__dirname, `./Assettemplate/newasset.ejs`),message)
  }else{
    subject = `IT Asset (${message.Serial_No}) updated by IT Department`
    var html = await ejs.renderFile(path.join(__dirname, `./Assettemplate/updateasset.ejs`),message)
  }

  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `${message.mailid}`, // list of receivers
      cc:['support@awlindia.com','support@ilogsolution.com'],
      subject: subject, // Subject line
      html: html, // html body     
    })
    res.send(info)
  }
  catch(err){
    console.log(err);
  }
  
}

const Email = async(req,res)=>{
  const message = req.body.message;
  if(message.TicketStatus == "Open"){
    subject = `New support request received via ${message.TicketNumber} (${message.subject})`
     var html = await ejs.renderFile(path.join(__dirname, `./templates/Open.ejs`),message)
  }else if(message.TicketStatus == "Closed"){
    subject = `Issue resolved for Ticket number ${message.TicketNumber} (${message.subject})`
    var html = await ejs.renderFile(path.join(__dirname, `./templates/Close.ejs`),message)
  }else{
    subject = `Support request status changed to ${message.TicketStatus} for Ticket number ${message.TicketNumber} (${message.subject})`
    var html = await ejs.renderFile(path.join(__dirname, `./templates/Hold.ejs`),message)
  }
 
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `${message.mail}`, // list of receivers
      cc:['support@ilogsolution.com','support@awlindia.com'],
      subject: subject, // Subject line
      html: html, // html body
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  }
  
}


module.exports = {Email,AssetEmail,InvoiceEmail,VendorPaymentEmail,VendorCreateEmail,EmployeeCreateEmail,VendorContractEmail}
