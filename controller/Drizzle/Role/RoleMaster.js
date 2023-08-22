const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalRoles = async (req,res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_Roles_master `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertRoles = async (req,res) =>{
    const data = req.body


    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${data.data.org}.dbo.tbl_Roles_master
               (role_id,remark,asset,asset_view,asset_create,asset_edit,asset_delete,vendor_contract,vendor_contract_view,vendor_contract_create,vendor_contract_edit,vendor_contract_delete,ticket,ticket_view,ticket_create,ticket_edit,ticket_delete,master,master_view,master_create,master_edit,master_delete,transaction_details ,transaction_view,transaction_create,transaction_edit,transaction_delete,setting,setting_view,setting_create,setting_edit,setting_delete,reports,reports_view,reports_create,reports_edit,reports_delete,role)
        values('${data.data.role_id}','${data.data.remark}','${data.data.assetsfull}','${data.data.assetsview}','${data.data.assetscreate}','${data.data.assetsedit}','${data.data.assetsdeactive}','${data.data.vendContfull}','${data.data.vendContview}','${data.data.vendContcreate}','${data.data.vendContedit}','${data.data.vendContdeactive}','${data.data.ticketfull}','${data.data.ticketview}','${data.data.ticketcreate}','${data.data.ticketedit}','${data.data.ticketdeactive}','${data.data.masterfull}','${data.data.masterview}','${data.data.mastercreate}','${data.data.masteredit}','${data.data.masterdeactive}','${data.data.transactionfull}','${data.data.transactionview}','${data.data.transactioncreate}','${data.data.transactionedit}','${data.data.transactiondeactive}','${data.data.settingfull}','${data.data.settingview}','${data.data.settingcreate}','${data.data.settingedit}','${data.data.settingdeactive}','${data.data.reportsfull}','${data.data.reportsview}','${data.data.reportscreate}','${data.data.reportsedit}','${data.data.reportsedit}','${data.data.role}')`)
        console.log(result)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getRole = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_Roles_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const updateRole = async (req,res) =>{
    const data = req.body
    console.log(data)
   
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${data.data.org}.dbo.tbl_Roles_master set asset='${data.data.assetsfull}',asset_view='${data.data.assetsview}'
        ,asset_create ='${data.data.assetscreate}',asset_edit='${data.data.assetsedit}',asset_delete='${data.data.assetsdeactive}',vendor_contract='${data.data.vendContfull}',vendor_contract_view='${data.data.vendContview}',
        vendor_contract_create='${data.data.vendContcreate}',vendor_contract_edit='${data.data.vendContedit}',vendor_contract_delete='${data.data.vendContdeactive}',ticket='${data.data.ticketfull}',ticket_view='${data.data.ticketview}',
        ticket_create='${data.data.ticketcreate}',ticket_edit='${data.data.ticketedit}',ticket_delete='${data.data.ticketdeactive}',master='${data.data.masterfull}',master_view='${data.data.masterview}',master_create='${data.data.mastercreate}',master_edit='${data.data.masteredit}',
        master_delete='${data.data.masterdeactive}',transaction_details='${data.data.transactionfull}',transaction_view='${data.data.transactionview}',transaction_create='${data.data.transactioncreate}',transaction_edit='${data.data.transactionedit}',transaction_delete='${data.data.transactiondeactive}',
        setting='${data.data.settingfull}',setting_view='${data.data.settingview}',setting_create='${data.data.settingcreate}',setting_edit='${data.data.settingedit}',setting_delete='${data.data.settingdeactive}',reports='${data.data.reportsfull}',reports_view='${data.data.reportsview}',reports_create='${data.data.reportscreate}',reports_edit='${data.data.reportsedit}',reports_delete='${data.data.reportsdeactive}',
        remark='${data.data.remark}',role='${data.data.role}'
         where sno = ${data.data.sno}`)
         console.log(result)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}

module.exports ={totalRoles,insertRoles,getRole,updateRole}