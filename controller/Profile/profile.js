const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const getUserdetails  = async (req,res) =>{
    const org = req.body.org;
    const user_id = req.body.user_id;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_employee_master where user_id='${user_id}'`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}


const updateUserdetails = async (req,res) =>{
    const org = req.body.org;
    // const sno = req.body.sno;
    const employee_name= req.body.employee_name;
    const location = req.body.location;
    const employee_email = req.body.employee_email;
    const employee_number = req.body.employee_number;
    const company = req.body.company;
    const user_id = req.body.user_id;
    console.log(`update ${org}.dbo.tbl_employee_master set employee_name='${employee_name}',location='${location}',employee_email='${employee_email}',employee_number= ${employee_number},company='${company}'
    ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where user_id = ${user_id}`)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_employee_master set employee_name='${employee_name}',location='${location}',employee_email='${employee_email}',employee_number= ${employee_number},company='${company}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where user_id = '${user_id}'`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {getUserdetails,updateUserdetails}