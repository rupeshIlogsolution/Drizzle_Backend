const sql = require('mssql')
const sqlConfig = require('../../Database/Config')

const ColumnsReport =  async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select COLUMN_NAME from ${org}.INFORMATION_SCHEMA.COLUMNS  where  TABLE_NAME = '${table}' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const TableReports = async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    const columns = req.body.columns;
    console.log(org,table,columns)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select ${columns} from ${org}.dbo.${table}`)
        res.send(result.recordset)

    }
    catch(err){
        console.log(err)

    }
}

const GraphReport = async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    const columns = req.body.columns;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select COUNT(${columns}) as value,${columns} as name from ${org}.dbo.${table} group by ${columns} `)
        res.send(result.recordset)
        console.log(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}


const AssetReport = async(req,res) =>{
    const location = req.body.location;
    const vendor = req.body.vendor;
    console.log(location,vendor)
    try{
        await sql.connect(sqlConfig)
        let result
        let dataCount
        if(!location && vendor.length>0){
            result = await sql.query(`select company,location,new_asset_type_id,asset_type,serial_no,asset_status,purchase_type,vendor,rent_per_month,purchases_price,asset_assign  From IPERISCOPE.dbo.tbl_new_assets where vendor_code='${vendor}'`)
            dataCount = await sql.query(`select sum(cast(rent_per_month AS INT)) AS [rent_per_month],sum(cast(purchases_price AS INT)) AS purchases_price,
            (select COUNT(asset_type)   From IPERISCOPE.dbo.tbl_new_assets where asset_type='Desktop' and vendor_code='${vendor}') as Desktop,(select COUNT(asset_type)
            From IPERISCOPE.dbo.tbl_new_assets where asset_type='Laptop'  and vendor_code='${vendor}' ) as Latptop  From IPERISCOPE.dbo.tbl_new_assets
            where vendor_code='${vendor}'`)        }
        else if (!vendor && location.length>0){
            result = await sql.query(`select company,location,new_asset_type_id,asset_type,serial_no,asset_status,purchase_type,vendor,rent_per_month,purchases_price,asset_assign  From IPERISCOPE.dbo.tbl_new_assets where location='${location}' `)
            dataCount = await sql.query(` select sum(cast(rent_per_month AS INT)) AS [rent_per_month],sum(cast(purchases_price AS INT)) AS purchases_price,
            (select COUNT(asset_type)   From IPERISCOPE.dbo.tbl_new_assets where asset_type='Desktop' and location='${location}') as Desktop,(select COUNT(asset_type)
            From IPERISCOPE.dbo.tbl_new_assets where asset_type='Laptop'  and location='${location}' ) as Latptop  From IPERISCOPE.dbo.tbl_new_assets
            where location='${location}' `) }
        else{
            result = await sql.query(`select company,location,new_asset_type_id,asset_type,serial_no,asset_status,purchase_type,vendor,rent_per_month,purchases_price,asset_assign  From IPERISCOPE.dbo.tbl_new_assets where location='${location}' and vendor_code='${vendor}'`)
            dataCount = await sql.query(`select sum(cast(rent_per_month AS INT)) AS [rent_per_month],sum(cast(purchases_price AS INT)) AS purchases_price,
            (select COUNT(asset_type)   From IPERISCOPE.dbo.tbl_new_assets where asset_type='Desktop' and vendor_code='${vendor}' and location='${location}') as Desktop,(select COUNT(asset_type)
            From IPERISCOPE.dbo.tbl_new_assets where asset_type='Laptop'  and vendor_code='${vendor}' and location='${location}' ) as Latptop  From IPERISCOPE.dbo.tbl_new_assets
            where vendor_code='${vendor}' and location='${location}'`)
        }
        res.send({
            'Data':result.recordset,
        'Count':dataCount.recordset[0]
    })
    }
    catch(err){
        console.log(err)
    }
}

module.exports={ColumnsReport,TableReports,GraphReport,AssetReport}
