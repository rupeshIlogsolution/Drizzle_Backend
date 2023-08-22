const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')



const TotalTicket = async (req, res) => {
    const org = req.body.org;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),ticket_date,105) as date from ${org}.dbo.tbl_ticket with (nolock) WHERE ticket_status = 'Closed' order by assign_ticket DESC`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}
const TotalHoldTicket = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),ticket_date,105) as date from ${org}.dbo.tbl_ticket with (nolock) WHERE ticket_status = 'Hold' order by assign_ticket DESC`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const OpenTotalTicket = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),ticket_date,105) as date from ${org}.dbo.tbl_ticket with (nolock) WHERE ticket_status = 'Open'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const InsertTicket = async (req, res) => {
    const org = "IPERISCOPE";
    const emp_id = req.body.emp_id;
    const emp_name = req.body.emp_name;
    const asset_type = req.body.asset_type;
    const asset_serial = req.body.asset_serial;
    const location = req.body.location;
    const assign_ticket = req.body.assign_ticket;
    const type_of_issue = req.body.type_of_issue;
    const email_id = req.body.email_id;
    const ticket_date = req.body.ticket_date;
    const ticket_status = req.body.ticket_status;
    const ticket_subject = req.body.ticket_subject;
    const priority = req.body.priority;
    const issue_discription = req.body.issue_discription;
    const remarks = req.body.remarks;
    const user_id = req.body.user_id;
    const AssetTag = req.body.AssetTag;
    const AssetCondition= req.body.AssetCondition;

    try {
        await sql.connect(sqlConfig)
        console.log("hloooo")
        const Ticket = await sql.query(`SELECT COUNT(sno) as count FROM ${org}.dbo.tbl_ticket with (nolock) `)
        let count = Ticket.recordset[0]["count"] +1 + ''

        let val = 'Ticket' + '-' + count.padStart(5, '0') ;
        // console.log(val)
        // return

        const result = await sql.query(`
        insert into ${org}.dbo.tbl_ticket(emp_id,emp_name,asset_type,asset_serial,location,assign_ticket,
            type_of_issue,email_id,ticket_date,ticket_status,ticket_subject,priority,issue_discription,remarks,
            status,add_user_name,add_system_name,add_ip_address,add_date_time,asset_tag,asset_condition)
            values ('${emp_id}','${emp_name}','${asset_type}','${asset_serial}','${location}','${val}','${type_of_issue}',
            '${email_id}','${ticket_date}','${ticket_status}','${ticket_subject}','${priority}','${issue_discription}','${remarks}',
            'Active','${user_id}','${os.hostname()}','${req.ip}',getdate(),'${AssetTag}','${AssetCondition}')`)
        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Data Added')
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}



const CountTickets = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT COUNT(sno) as count FROM ${org}.dbo.tbl_ticket with (nolock) `)
        if (result) {
            res.status(200).send(result.recordset)
        }
        else {
            res.send('Error')
        }
    }
    catch (err) {
        res.send(err)
    }
}


const DeleteTickets = async (req, res) => {
    const org = req.body.org;
    const status = req.body.status;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        await sql.query(`update ${org}.dbo.tbl_ticket set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch (err) {
        res.send(err)
    }
}


const getTickets = async (req, res) => {
    const org = req.body.org;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),ticket_date,121) as Joindate from ${org}.dbo.tbl_ticket  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


const UpdateTicket = async (req, res) => {
    const org = req.body.org;
    const emp_id = req.body.emp_id;
    const emp_name = req.body.emp_name;
    const asset_type = req.body.asset_type;
    const asset_serial = req.body.asset_serial;
    const location = req.body.location;
    const assign_ticket = req.body.assign_ticket;
    const type_of_issue = req.body.type_of_issue;
    const email_id = req.body.email_id;
    const ticket_date = req.body.ticket_date;
    const ticket_status = req.body.ticket_status;
    const ticket_subject = req.body.ticket_subject;
    const priority = req.body.priority;
    const issue_discription = req.body.issue_discription;
    const remarks = req.body.remarks;
    const user_id = req.body.user_id;
    const sno = req.body.sno;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`
update ${org}.dbo.tbl_ticket set emp_id='${emp_id}',emp_name='${emp_name}',asset_type='${asset_type}',asset_serial='${asset_serial}',
location='${location}',assign_ticket='${assign_ticket}',
type_of_issue='${type_of_issue}',
email_id='${email_id}',ticket_date='${ticket_date}',ticket_status='${ticket_status}',ticket_subject='${ticket_subject}',priority='${priority}',
issue_discription='${issue_discription}',remarks='${remarks}',
update_user_name='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno='${sno}'`)
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

module.exports = { TotalTicket, InsertTicket, CountTickets, DeleteTickets, getTickets, UpdateTicket,OpenTotalTicket,TotalHoldTicket }
