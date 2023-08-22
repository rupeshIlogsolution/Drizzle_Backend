const sql = require("mssql");
const sqlConfig = require("../../../Database/Config");
const os = require("os");

const totalIssueType = async (req, res) => {
  const org = req.body.org;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(
      `select * from ${org}.dbo.tbl_issue_master tim order by issue_type ASC`)
    res.status(200).send(result.recordset);
  } catch (err) {
    res.send(err);
  }
};

const insertIssueType = async (req, res) => {
  const org = req.body.org;
  const issue_id = req.body.issue_id;
  const issue_type = req.body.issue_type;
  const issue_description = req.body.issue_description;
  const user_id = req.body.user_id;

  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query(`insert into ${org}.dbo.tbl_issue_master (issue_id  ,issue_type ,issue_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${issue_id}','${issue_type}','${issue_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`);
    res.status(200).send("Added");
  } catch (err) {
    res.send(err);
  }
};

const getIssueType = async (req, res) => {
  const org = req.body.org;
  const sno = req.body.sno;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(
      `select * from ${org}.dbo.tbl_issue_master  where sno='${sno}'`
    );
    res.status(200).send(result.recordset);
  } catch (err) {
    res.send(err);
  }
};

const deleteIssueType = async (req, res) => {
  const org = req.body.org;
  const status = req.body.status;
  const sno = req.body.sno;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(
      `update ${org}.dbo.tbl_issue_master set status='${status}' where sno =${sno}`
    );
    res.status(200).send("updated");
  } catch (err) {
    res.send(err);
  }
};

const updateIssueType = async (req, res) => {
  const org = req.body.org;

  const sno = req.body.sno;
  const issue_type = req.body.issue_type;
  const issue_description = req.body.issue_description;
  const user_id = req.body.user_id;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`update ${org}.dbo.tbl_issue_master set issue_type='${issue_type}',issue_description='${issue_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`);
    res.status(200).send("Updated");
  } catch (err) {
    res.send(err);
  }
};

const ActiveIssue = async (req, res) => {
  const org = req.body.org;

  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(`SELECT  issue_id,issue_type from ${org}.dbo.tbl_issue_master tim with (nolock)  WHERE status ='Active' order by issue_type ASC `);
    res.status(200).send(result.recordset);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  totalIssueType,
  insertIssueType,
  getIssueType,
  deleteIssueType,
  updateIssueType,
  ActiveIssue,
};
