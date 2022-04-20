//导入数据库
const db = require('../DB/db.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment');
//获取formdata传输过来的数据
const formidable = require("formidable");
const query = require('./promises.js')


//获取所有审核通过的文章
exports.allArticle = async (req, res) => {
    //接收参数
    let { page = 1, limit = 2 } = req.query
    let offset = (page - 1) * limit
    const sql = `select a.*,b.cl_name from active a left join classify b on a.relationActiveSort = b.cl_id where 1 and is_del != 1 and activeStatus = 1  order by a.id desc limit ${offset},${limit}`
    let result = await query(sql)
    return res.json({
        code: 200,
        data: result,
        message: '获取文章成功'
    })
}

//获取传回来的文章详情
exports.getArticleDetails = async (req, res) => {
    let {id} = req.query
    const sql = `select a.*,b.cl_name from active a left join classify b on a.relationActiveSort = b.cl_id where a.relationActiveSort = ${id} and is_del != 1 and activeStatus = 1`
    let result = await query(sql)
    return res.json({
        code: 200,
        data: result || [],
    })
}

//当前文章详情
exports.thisArtice = async (req, res) => {
    var a = 2
    let { id } = req.query
    const sql = `select a.*,b.cl_name from active a left join classify b on a.relationActiveSort = b.cl_id where a.id = ${id} and is_del != 1 and activeStatus = 1`
    let result = await query(sql)
    console.log(result);
    res.json(result[0] || [])
}
