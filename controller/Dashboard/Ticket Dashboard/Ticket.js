const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const Ticket_Summary = async (req, res) => {
    const org = req.body.org;
    const userid = req.body.userid
    try {
        await sql.connect(sqlConfig)
        const TotalTicket = await sql.query(`select count(assign_ticket) as totalticket  from ${org}.dbo.tbl_ticket `)
        const TotalTicketClose = await sql.query(`select count(assign_ticket) as totalticketclose from ${org}.dbo.tbl_ticket  where ticket_status = 'Closed' `)
        const TotalTicketOpen = await sql.query(`select count(assign_ticket) as totalticketopen from ${org}.dbo.tbl_ticket  where ticket_status = 'Open'`)
        const TotalTicketHold = await sql.query(`select count(assign_ticket) as totaltickethold from ${org}.dbo.tbl_ticket  where ticket_status = 'Hold'`)
        const MyTicket = await sql.query(`select count(assign_ticket) as myticket  from ${org}.dbo.tbl_ticket where add_user_name = '${userid}' `)
        const MyTicketClose = await sql.query(`select count(assign_ticket) as myticketclose  from ${org}.dbo.tbl_ticket  where ticket_status = 'Closed' and add_user_name = '${userid}' `)
        const MyTicketOpen = await sql.query(`select count(assign_ticket) as myticketopen  from ${org}.dbo.tbl_ticket where ticket_status = 'Open' and add_user_name = '${userid}'`)

        res.status(200).json({
            TotalTicket: TotalTicket.recordset[0],
            TotalTicketOpen: TotalTicketOpen.recordset[0],
            TotalTicketClose: TotalTicketClose.recordset[0],
            TotalTicketHold: TotalTicketHold.recordset[0],
            MyTicket: MyTicket.recordset[0],
            MyTicketClose: MyTicketClose.recordset[0],
            MyTicketOpen: MyTicketOpen.recordset[0]
        })
    }
    catch (err) {
        console.log(err)
    }
}

const Ticket_Priority = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const TotalLowPriorityClose = await sql.query(`select count(assign_ticket) as lowpriorityclose  from ${org}.dbo.tbl_ticket where priority = 'Low' and ticket_status = 'Closed'`)
        const TotalLowPriorityOpen = await sql.query(`select count(assign_ticket) as lowpriorityopen  from ${org}.dbo.tbl_ticket where priority = 'Low' and ticket_status = 'Open'`)
        const TotalNormalPriorityClose = await sql.query(`select count(assign_ticket) as normalpriorityclose  from ${org}.dbo.tbl_ticket where priority = 'Normal' and ticket_status = 'Closed'`)
        const TotalNormalPriorityOpen = await sql.query(`select count(assign_ticket) as normalpriorityopen  from ${org}.dbo.tbl_ticket where priority = 'Normal' and ticket_status = 'Open'`)
        const TotalUrgentPriorityClose = await sql.query(`select count(assign_ticket) as urgentpriorityclose  from ${org}.dbo.tbl_ticket where priority = 'Urgent' and ticket_status = 'Closed'`)
        const TotalUrgentPriorityOpen = await sql.query(`select count(assign_ticket) as urgentpriorityopen  from ${org}.dbo.tbl_ticket where priority = 'Urgent' and ticket_status = 'Open'`)

        res.status(200).json({
            TotalLowPriorityClose: TotalLowPriorityClose.recordset[0].lowpriorityclose,
            TotalLowPriorityOpen: TotalLowPriorityOpen.recordset[0].lowpriorityopen,
            TotalNormalPriorityClose: TotalNormalPriorityClose.recordset[0].normalpriorityclose,
            TotalNormalPriorityOpen: TotalNormalPriorityOpen.recordset[0].normalpriorityopen,
            TotalUrgentPriorityClose: TotalUrgentPriorityClose.recordset[0].urgentpriorityclose,
            TotalUrgentPriorityOpen: TotalUrgentPriorityOpen.recordset[0].urgentpriorityopen
        })
    }
    catch (err) {
        console.log(err)
    }
}

const Ticket_issue_type = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const HardwareTicketClose = await sql.query(`select count(assign_ticket) as hardwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Closed'`)
        const HardwareTicketopen = await sql.query(`select count(assign_ticket) as hardwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Open'`)
        const SoftwareTicketClose = await sql.query(`select count(assign_ticket) as softwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Closed'`)
        const SoftwareTicketOpen = await sql.query(`select count(assign_ticket) as softwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Open'`)
        const OtherTicketClose = await sql.query(`select count(assign_ticket) as otherticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Closed'`)
        const OtherTicketOpen = await sql.query(`select count(assign_ticket) as otherticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Open'`)
        const ServerTicketClose = await sql.query(`select count(assign_ticket) as serverticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Closed'`)
        const ServerTicketOpen = await sql.query(`select count(assign_ticket) as serverticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Open'`)
        const ConnectivityTicketClose = await sql.query(`select count(assign_ticket) as connectivityticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Closed'`)
        const ConnectivityTicketOpen = await sql.query(`select count(assign_ticket) as connectivityticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Open'`)
        const AllocationTicketClose = await sql.query(`select count(assign_ticket) as allocationticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Closed'`)
        const AllocationTicketOpen = await sql.query(`select count(assign_ticket) as allocationticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Open'`)
        const NewReqTicketClose = await sql.query(`select count(assign_ticket) as newreqticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed'`)
        const NewReqTicketOpen = await sql.query(`select count(assign_ticket) as newreqticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed'`)

        res.status(200).json({
            HardwareTicketClose: HardwareTicketClose.recordset[0].hardwareticketclose,
            HardwareTicketopen: HardwareTicketopen.recordset[0].hardwareticketopen,
            SoftwareTicketClose: SoftwareTicketClose.recordset[0].softwareticketclose,
            SoftwareTicketOpen: SoftwareTicketOpen.recordset[0].softwareticketopen,
            OtherTicketClose: OtherTicketClose.recordset[0].otherticketclose,
            OtherTicketOpen: OtherTicketOpen.recordset[0].otherticketopen,
            ServerTicketClose: ServerTicketClose.recordset[0].serverticketclose,
            ServerTicketOpen: ServerTicketOpen.recordset[0].serverticketopen,
            ConnectivityTicketClose: ConnectivityTicketClose.recordset[0].connectivityticketclose,
            ConnectivityTicketOpen: ConnectivityTicketOpen.recordset[0].connectivityticketopen,
            AllocationTicketClose: AllocationTicketClose.recordset[0].allocationticketclose,
            AllocationTicketOpen: AllocationTicketOpen.recordset[0].allocationticketopen,
            NewReqTicketClose: NewReqTicketClose.recordset[0].newreqticketclose,
            NewReqTicketOpen: NewReqTicketOpen.recordset[0].newreqticketopen,
        })
    }
    catch (err) {
        console.log(err)
    }

}

const Filter_Ticket_Summary_Count = async (req, res) => {
    const org = req.body.org;
    const type = req.body.type;
    const value = req.body.value;
    console.log(org, type, value)
    try {
        await sql.connect(sqlConfig)
        if (type == "emp_name") {
            let TotalTicket = await sql.query(`select count(assign_ticket) as totalticket  from ${org}.dbo.tbl_ticket where ${type} ='${value}'`)
            let TotalTicketClose = await sql.query(`select count(assign_ticket) as totalticketclose from ${org}.dbo.tbl_ticket  where ${type} ='${value}' and ticket_status = 'Closed'`)
            let TotalTicketOpen = await sql.query(`select count(assign_ticket) as totalticketopen from ${org}.dbo.tbl_ticket where ${type} ='${value}' and   ticket_status = 'Open'`)
            let TotalTicketHold = await sql.query(`select count(assign_ticket) as totaltickethold from ${org}.dbo.tbl_ticket where ${type} ='${value}' and   ticket_status = 'Hold'`)

            const HardwareTicketClose = await sql.query(`select count(assign_ticket) as hardwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const HardwareTicketopen = await sql.query(`select count(assign_ticket) as hardwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Open' and ${type} ='${value}'`)
            const SoftwareTicketClose = await sql.query(`select count(assign_ticket) as softwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const SoftwareTicketOpen = await sql.query(`select count(assign_ticket) as softwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Open' and ${type} ='${value}'`)
            const OtherTicketClose = await sql.query(`select count(assign_ticket) as otherticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const OtherTicketOpen = await sql.query(`select count(assign_ticket) as otherticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Open' and ${type} ='${value}'`)
            const ServerTicketClose = await sql.query(`select count(assign_ticket) as serverticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const ServerTicketOpen = await sql.query(`select count(assign_ticket) as serverticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Open' and ${type} ='${value}'`)
            const ConnectivityTicketClose = await sql.query(`select count(assign_ticket) as connectivityticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const ConnectivityTicketOpen = await sql.query(`select count(assign_ticket) as connectivityticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Open' and ${type} ='${value}'`)
            const AllocationTicketClose = await sql.query(`select count(assign_ticket) as allocationticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const AllocationTicketOpen = await sql.query(`select count(assign_ticket) as allocationticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Open' and ${type} ='${value}'`)
            const NewReqTicketClose = await sql.query(`select count(assign_ticket) as newreqticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const NewReqTicketOpen = await sql.query(`select count(assign_ticket) as newreqticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed' and ${type} ='${value}'`)
            res.status(200).json({
                TotalTicket: TotalTicket.recordset[0],
                TotalTicketOpen: TotalTicketOpen.recordset[0],
                TotalTicketClose: TotalTicketClose.recordset[0],
                TotalTicketHold: TotalTicketHold.recordset[0],
                HardwareTicketClose: HardwareTicketClose.recordset[0].hardwareticketclose,
                HardwareTicketopen: HardwareTicketopen.recordset[0].hardwareticketopen,
                SoftwareTicketClose: SoftwareTicketClose.recordset[0].softwareticketclose,
                SoftwareTicketOpen: SoftwareTicketOpen.recordset[0].softwareticketopen,
                OtherTicketClose: OtherTicketClose.recordset[0].otherticketclose,
                OtherTicketOpen: OtherTicketOpen.recordset[0].otherticketopen,
                ServerTicketClose: ServerTicketClose.recordset[0].serverticketclose,
                ServerTicketOpen: ServerTicketOpen.recordset[0].serverticketopen,
                ConnectivityTicketClose: ConnectivityTicketClose.recordset[0].connectivityticketclose,
                ConnectivityTicketOpen: ConnectivityTicketOpen.recordset[0].connectivityticketopen,
                AllocationTicketClose: AllocationTicketClose.recordset[0].allocationticketclose,
                AllocationTicketOpen: AllocationTicketOpen.recordset[0].allocationticketopen,
                NewReqTicketClose: NewReqTicketClose.recordset[0].newreqticketclose,
                NewReqTicketOpen: NewReqTicketOpen.recordset[0].newreqticketopen,
            })
        } else if (type == "location") {
            let TotalTicket = await sql.query(`select count(assign_ticket) as totalticket  from ${org}.dbo.tbl_ticket where ${type} ='${value}'`)
            let TotalTicketClose = await sql.query(`select count(assign_ticket) as totalticketclose from ${org}.dbo.tbl_ticket  where ${type} ='${value}' and ticket_status = 'Closed'`)
            let TotalTicketOpen = await sql.query(`select count(assign_ticket) as totalticketopen from ${org}.dbo.tbl_ticket where ${type} ='${value}' and   ticket_status = 'Open'`)
            let TotalTicketHold = await sql.query(`select count(assign_ticket) as totaltickethold from ${org}.dbo.tbl_ticket where ${type} ='${value}' and   ticket_status = 'Hold'`)

            const HardwareTicketClose = await sql.query(`select count(assign_ticket) as hardwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const HardwareTicketopen = await sql.query(`select count(assign_ticket) as hardwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Hardware' and ticket_status = 'Open' and ${type} ='${value}'`)
            const SoftwareTicketClose = await sql.query(`select count(assign_ticket) as softwareticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const SoftwareTicketOpen = await sql.query(`select count(assign_ticket) as softwareticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Software' and ticket_status = 'Open' and ${type} ='${value}'`)
            const OtherTicketClose = await sql.query(`select count(assign_ticket) as otherticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const OtherTicketOpen = await sql.query(`select count(assign_ticket) as otherticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Other' and ticket_status = 'Open' and ${type} ='${value}'`)
            const ServerTicketClose = await sql.query(`select count(assign_ticket) as serverticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const ServerTicketOpen = await sql.query(`select count(assign_ticket) as serverticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Server' and ticket_status = 'Open' and ${type} ='${value}'`)
            const ConnectivityTicketClose = await sql.query(`select count(assign_ticket) as connectivityticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const ConnectivityTicketOpen = await sql.query(`select count(assign_ticket) as connectivityticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Connectivity' and ticket_status = 'Open' and ${type} ='${value}'`)
            const AllocationTicketClose = await sql.query(`select count(assign_ticket) as allocationticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const AllocationTicketOpen = await sql.query(`select count(assign_ticket) as allocationticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'Allocation' and ticket_status = 'Open' and ${type} ='${value}'`)
            const NewReqTicketClose = await sql.query(`select count(assign_ticket) as newreqticketclose  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed' and ${type} ='${value}'`)
            const NewReqTicketOpen = await sql.query(`select count(assign_ticket) as newreqticketopen  from ${org}.dbo.tbl_ticket where type_of_issue = 'New Requirement' and ticket_status = 'Closed' and ${type} ='${value}'`)
            res.status(200).json({
                TotalTicket: TotalTicket.recordset[0],
                TotalTicketOpen: TotalTicketOpen.recordset[0],
                TotalTicketClose: TotalTicketClose.recordset[0],
                TotalTicketHold: TotalTicketHold.recordset[0],
                HardwareTicketClose: HardwareTicketClose.recordset[0].hardwareticketclose,
                HardwareTicketopen: HardwareTicketopen.recordset[0].hardwareticketopen,
                SoftwareTicketClose: SoftwareTicketClose.recordset[0].softwareticketclose,
                SoftwareTicketOpen: SoftwareTicketOpen.recordset[0].softwareticketopen,
                OtherTicketClose: OtherTicketClose.recordset[0].otherticketclose,
                OtherTicketOpen: OtherTicketOpen.recordset[0].otherticketopen,
                ServerTicketClose: ServerTicketClose.recordset[0].serverticketclose,
                ServerTicketOpen: ServerTicketOpen.recordset[0].serverticketopen,
                ConnectivityTicketClose: ConnectivityTicketClose.recordset[0].connectivityticketclose,
                ConnectivityTicketOpen: ConnectivityTicketOpen.recordset[0].connectivityticketopen,
                AllocationTicketClose: AllocationTicketClose.recordset[0].allocationticketclose,
                AllocationTicketOpen: AllocationTicketOpen.recordset[0].allocationticketopen,
                NewReqTicketClose: NewReqTicketClose.recordset[0].newreqticketclose,
                NewReqTicketOpen: NewReqTicketOpen.recordset[0].newreqticketopen,
            })
        }

    }
    catch (err) {
        console.log(err)
    }

}

const Filter_Ticket_Summary = async (req, res) => {
    const org = req.body.org;
    const statustype = req.body.statustype;
    const filterby = req.body.filterby;
    const value = req.body.value;
    console.log(org, statustype, filterby, value)
    try {
        await sql.connect(sqlConfig)
        if (!statustype) {
            const filterdata = await sql.query(`select *,convert(varchar(15),ticket_date,105) as date from ${org}.dbo.tbl_ticket with (nolock) WHERE ${filterby}='${value}' order by assign_ticket DESC`)
            res.status(200).json(filterdata.recordset)
        } else {
            const filterdata = await sql.query(`select *,convert(varchar(15),ticket_date,105) as date from ${org}.dbo.tbl_ticket with (nolock) WHERE ticket_status='${statustype}' and ${filterby}='${value}' order by assign_ticket DESC`)
            res.status(200).json(filterdata.recordset)
        }

    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { Ticket_Summary, Ticket_Priority, Ticket_issue_type, Filter_Ticket_Summary, Filter_Ticket_Summary_Count }