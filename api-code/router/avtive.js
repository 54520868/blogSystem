//导入数据库
const db = require('../DB/db.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment');
const query = require('./promises.js')
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
    let { id, user_username, user_email, user_iphone, user_deta } = req.body;
    const sql = `update active set title='${user_username}',author='${user_email}',content='${user_iphone}',time='${user_deta}' where id=${id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '更新文章失败'
        })
        res.json({
            code: 200,
            message: '更新文章成功'
        })
    })
}

//获取所有分类数据
exports.getAllClassify = (req, res) => {
    const sql = `select * from classify where cl_isDel != 1`
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '获取分类数据失败'
        })
        res.json({
            code: 0,
            data
        })
    })
}

//更改分类的数据
exports.updateClassify = (req, res) => {
    let { cl_id, cl_name, cl_Notes } = req.body;
    const sql = `update classify set cl_name='${cl_name}',cl_Notes = '${cl_Notes}' where cl_id=${cl_id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '更新分类失败'
        })
        res.json({
            code: 200,
            message: '更新分类成功'
        })
    })
}

//删除分类
exports.deleteClassify = (req, res) => {
    let { id } = req.body;
    const sql = `update classify set cl_isDel = 1 where cl_id=${id}`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '删除分类失败'
        })
        res.json({
            code: 200,
            message: '删除分类成功'
        })
    })
}

//添加分类
exports.addClassify = (req, res) => {
    let { cl_name, cl_Notes } = req.body;
    const sql = `insert into classify (cl_name,cl_Notes,cl_addTime) values ('${cl_name}','${cl_Notes}','${minte}')`;
    db.query(sql, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '添加分类失败'
        })
        res.json({
            code: 200,
            message: '添加分类成功'
        })
    })
}


var oldFile;
//上传图片接口
exports.newPhoto = (req, res) => {
    let files = req.file
    let oldName = files.filename
    let newName = files.originalname
    let str = newName.indexOf('.')
    let sub = newName.substring(str, newName.length)
    let newUrl = oldName + sub
    let oldSrc = path.join(__dirname, '/uploads', oldName) //当前目录的绝对路径并查到上传的二进制文件名称
    let newSrc = path.join(__dirname, '/uploads', newUrl) //拿到最终要上传的路径和文件的源名称
    oldFile = '/uploads/' + newUrl
    fs.renameSync(oldSrc, newSrc)
}

//获取添加文章的数据
exports.addActive = async (req, res) => {
    let { datas, content, } = req.body
    let { active_title, active_author, file, selx } = datas
    const sql = `insert into active (title,author,content,time,activePhoto,relationActiveSort) values('${active_title}','${active_author}','${content}','${minte}','${oldFile}',${selx})`
    let result = await query(sql)
    if (result.affectedRows) {
        return res.json({
            code: 200,
            message: '添加成功'
        })
    } else {
        return res.json({
            code: 200,
            message: '添加失败,请稍后在试'
        })
    }
}