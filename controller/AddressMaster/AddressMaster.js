const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const totalcountry = async (req, res) => {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_country_master with (nolock) ORDER BY country_name  ASC`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const totalstate = async (req, res) => {
    const country_id = req.body.country_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_state_master with (nolock) where country_id='${country_id}' ORDER BY state_name  ASC`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const totalcity = async (req, res) => {
    const state_id = req.body.state_id;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_city_master with (nolock) where state_id='${state_id}' ORDER BY city_name  ASC`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


// // const UploadCountry= async(req,res)=>{
// //     const datas= req.body.datas
  

// //     try {
// //         await sql.connect(sqlConfig)
// //         datas.map(async(item)=>{
// //             const result = await sql.query(` insert into IPERISCOPE.dbo.tbl_country_master(country_id,country_name,country_code)
// //             values ('${item.country_id}','${item.country_name}','${item.country_code}')`)
// //             console.log(item)
// //         })
       
// //         res.send(result.recordset)
// //     }
// //     catch (err) {
// //         res.send(err)
// //     }

// // }


// // const UploadState= async(req,res)=>{
// //     const datas= req.body.datas
// //     console.log(datas.length)
// //     let count= 0;
// //     try {
// //         await sql.connect(sqlConfig)
// //         let result='';
// //         datas.map(async(item)=>{
// //              result = await sql.query(` insert into IPERISCOPE.dbo.tbl_state_master(country_id,state_id,state_name,state_code)
// //             values ('${item.country_id}','${item.state_id}','${item.state_name}','${item.state_code}')`)
// //             console.log(item)
// //             count=count+1
// //             console.log(count)
// //         })
// //        console.log('Count',count)
// //        console.log(result)
// //         res.send(result.recordset)
// //     }
// //     catch (err) {
// //         res.send(err)
// //     }

// // }


// const UploadCity= async(req,res)=>{
//     const datas= req.body.datas
//     console.log(datas)
//     let count= 0;
//     try {
//         await sql.connect(sqlConfig)
//         let result='';
//         datas.map(async(item)=>{
//              result = await sql.query(` insert into IPERISCOPE.dbo.tbl_city_master(country_id,state_id,city_id,city_name)
//             values ('${item.country_id}','${item.state_id}','${item.id}','${item.name}')`)
//             console.log(item)
//             count=count+1
//             console.log(count)
//         })
//     //    console.log('Count',count)
//     //    console.log(result)
//         // res.send(result.recordset)
//     }
//     catch (err) {
//         res.send(err)
//     }

// }
module.exports = { totalcountry, totalstate,totalcity }