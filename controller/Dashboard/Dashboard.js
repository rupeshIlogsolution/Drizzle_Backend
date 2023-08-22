const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const dashboard_details = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const assets = await sql.query(`select count(asset_type) as asset from ${org}.dbo.tbl_new_assets `)
        const vendor = await sql.query(`select count(vendor_code) as Vendor_code from ${org}.dbo.tbl_vendor_code_master `)
        const invoice = await sql.query(`select count(vendor) as vendor  from ${org}.dbo.tbl_vendor_invoice tvi `)
        const ticket = await sql.query(`select count(emp_id) as ticket from ${org}.dbo.tbl_ticket `)
        res.status(200).json({
            Assets: assets.recordset[0],
            Vendor: vendor.recordset[0],
            Ticket: ticket.recordset[0],
            Invoice: invoice.recordset[0]
        })
    }
    catch (err) {
        console.log(err)
    }
}

const dashboard_procedure = async (req, res) => {
    const type = req.body.type;
    try {
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();
        const result = await pool.request()
            .input('type', type)
            .execute('IPERISCOPE.dbo.Drizzleproc')
        res.send(result.recordsets)

    }
    catch (err) {
        res.send(err)
    }

}

const dashboard_location_name = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const location = await sql.query(`select count(new_asset_type_id) as asset,location as location_code from IPERISCOPE.dbo.tbl_new_assets as t1 left join IPERISCOPE.dbo.tbl_location_master as t2 on t1.location = t2.location_name GROUP  by location ORDER by asset DESC`)
        res.send(location.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

const dashboard_software = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const software = await sql.query(`select ISNULL(COUNT(software), 0) AS software,software_name from IPERISCOPE.dbo.tbl_software_master as ts left join IPERISCOPE.dbo.tbl_asset_subtable as te on ts.software_name = te.software  GROUP by software_name `)
        res.send(software.recordset)
    }
    catch (err) {
        console.log(err)
    }

}

const dashboard_manufacture = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const manufactures = await sql.query(`select count(manufacturer_id) as value,manufacturer_name as name from IPERISCOPE.dbo.tbl_manufacturer_master as tm left join IPERISCOPE.dbo.tbl_new_assets as t2 on tm.manufacturer_name  = manufacture GROUP by manufacturer_name order by value DESC `)
        let data = manufactures.recordset
        data.sort((r1, r2) => r2.value - r1.value)
        data = data.filter((data, id) => id < 5)
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

}

const dashboard_asset_data = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const manufactures = await sql.query(`select  location, (select count(asset_type) as Total from  IPERISCOPE.dbo.tbl_new_assets with(nolock) where asset_type='DESKTOP'  and location=at.location) AS Desktop ,
        (select count(asset_type) as Total from  IPERISCOPE.dbo.tbl_new_assets with(nolock) where asset_type='Laptop' and location=at.location) AS Laptop ,
        (select count(asset_type) as Total from  IPERISCOPE.dbo.tbl_new_assets with(nolock) where asset_type='Printer'  and location=at.location) AS Printer
        from IPERISCOPE.dbo.tbl_new_assets at with(nolock)  where isnull(location,'')<>''  group by location`)
        let data = manufactures.recordset
      
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = {dashboard_details,dashboard_procedure,dashboard_location_name,dashboard_software,dashboard_manufacture,dashboard_asset_data}
