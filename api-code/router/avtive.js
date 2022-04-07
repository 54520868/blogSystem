//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
//格式化时间
let minte = moment().format('YYYY-MM-DD-HH:mm:ss')

//添加文章的处理函数
exports.regAddActive = (req, res) => {
    let { active_title, active_author, active_content } = req.body
    //插入新文章
    const sql = `insert into active (title,author,content,time) values ('${active_title}','${active_author}','${active_content}','${minte}')`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '发布文章失败'
        })

        if (data) return res.json({
            code: 200,
            message: '发布文章成功'
        })
    })
}
//获取所有文章的处理函数
exports.getNewActive = (req, res) => {
    const sql = `select * from active`
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '获取文章数据失败'
        })
        res.json({
            code: 200,
            data
        })
    })

}
//删除文章的处理函数
exports.regDeActive = (req, res) => {
    let { id } = req.body;
    const sql = `delete from active where id=${id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '删除文章失败'
        })
        res.json({
            code: 200,
            message: '删除文章成功'
        })
    })
}

//获取单条数据
exports.getOneDate = (req, res) => {
    let { id } = req.body;
    const sql = `select * from active where id=${id};`
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '获取当前文章数据失败'
        })
        res.json({
            code: 200,
            message: '获取当前文章成功',
            data,
        })
    })
}

//更新文章的处理函数
exports.regPutActive = (req, res) => {
    let { id ,user_username,user_email,user_iphone,user_deta} = req.body;
    const sql = `update active set title='${user_username}',author='${user_email}',content='${user_iphone}',time='${user_deta}' where id=${id}`;
    db.query(sql, (err, data) => {
        if(err) return res.json({
            code: 404,
            message: '更新文章失败'
        })
        res.json({
            code: 200,
            message: '更新文章成功'
        })
    })  
}