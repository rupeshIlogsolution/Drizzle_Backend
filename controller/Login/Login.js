const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const jwt = require("jsonwebtoken")


const UserLogin = async (req,res) =>{
    const userid = req.body.userid;
    const password = req.body.password;
    console.log(userid,password)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_iperiscope_login with (nolock) where user_id = '${userid}' and user_password = '${password}' `)
        const data = await sql.query(`select * from IPERISCOPE.dbo.tbl_employee_master where user_id = '${userid}'`)
        if(result.recordset.length>0){
            const token =jwt.sign({userid,password},'08be12b1193279994c8278770b3e6776d9ddc2c7d013f6d60713309ae6e3d12377739ba6db6852434ac905e85ccdf215b1229186f96692fdb2b1d68cd572d429',{ expiresIn: 5 * 24 * 60 * 60 })
            res.status(200).send({
                status: "Success",
                token: token,
                name: result.recordset[0].user_name,
                user_id: result.recordset[0].user_id,
                user_password: result.recordset[0].user_password,
                database:result.recordset[0].DBname,
                permission :result.recordset[0].permission,
                employee_id:data.recordset[0].employee_id
            })
            console.log({   
            status: "Success",
            token: token,
            name: result.recordset[0].user_name,
            user_id: result.recordset[0].user_id,
            user_password: result.recordset[0].user_password,
            database:result.recordset[0].DBname,
            employee_id:data.recordset[0].employee_id,
            permission :result.recordset[0].permission})
        }


        else{
            res.send({
                status: "Fail"
            })
        }
    }
    catch (err){
        res.send(err)
    }
}
async function ChangePassword(req,res){
    const user_id = req.body.user_id;
    const password = req.body.password;
    const CurrentPassword = req.body.CurrentPassword;
    console.log(`select * from IPERISCOPE.dbo.tbl_iperiscope_login with (nolock) where user_id = '${user_id}' and user_password = '${CurrentPassword}' `)
    try{
        await sql.connect(sqlConfig)
        const checkpass = await sql.query(`select * from IPERISCOPE.dbo.tbl_iperiscope_login with (nolock) where user_id = '${user_id}' and user_password = '${CurrentPassword}' `)
        console.log(checkpass)
        if (checkpass.rowsAffected[0] === 0) {
            res.send('Incorrect Current Password')
        }
        else {
            const UserChange = await sql.query(`update IPERISCOPE.dbo.tbl_iperiscope_login set user_password='${password}' where user_id ='${user_id}' and user_password='${CurrentPassword}'`)
            res.send('Password Changed')
        }
    }
    catch (err){
        res.send(err)
    }
}

const insertUserLogin = async (req,res) =>{
    const user_name = req.body.user_name;
    const user_id = req.body.user_id;
    const user_password = req.body.user_password;
    const DBname = req.body.DBname;


    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_iperiscope_login  (user_name  ,user_id  ,user_password ,permission,DBname)
        values('${user_name}','${user_id}','${user_password}','notallow','${DBname}')`)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

module.exports = {UserLogin,ChangePassword,insertUserLogin}
