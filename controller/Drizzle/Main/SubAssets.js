const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const InsertAssetsSoftware = async (req, res) => {
    const org = req.body.org;
    const asset_id = req.body.asset_id;
    const asset_tag = req.body.asset_tag;
    const software = req.body.software;
    console.log(org,asset_id,asset_tag,software)


    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${org}.dbo.tbl_asset_subtable (asset_id,asset_tag,software) values('${asset_id}','${asset_tag}','${software}')`)
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

const GetNewAssetsSoftware = async (req, res) => {
    const asset_id = req.body.asset_id;
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *  from ${org}.dbo.tbl_asset_subtable  where asset_id='${asset_id}'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports={InsertAssetsSoftware,GetNewAssetsSoftware}