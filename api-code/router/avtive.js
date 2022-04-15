//导入数据库
const db = require('../DB/db.js')
const fs = require('fs')
const path = require('path')
const moment = require('moment');
//获取formdata传输过来的数据
const formidable = require("formidable");
const query = require('./promises.js')
//格式化时间
let minte = moment().format('YYYY-MM-DD-HH:mm:ss')


//删除文章的处理函数
exports.regDeActive = (req, res) => {
    let { id } = req.body;
    const sql = `update active set is_del = 1 where id=${id}`;
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


//获取所有分类数据
exports.getAllClassify = async (req, res) => {
    let { page, limit } = req.query
    //查询当前数据总和
    const sql1 = `select count(cl_id) as con from classify`
    let result1 = await query(sql1)
    let count = result1[0].con
    //查询当前页数据
    let offset = (page - 1) * limit
    const sql = `select * from classify where cl_isDel != 1 limit ${offset},${limit}`
    try {
        await query(sql).then(data => {
            return res.json({
                data,
                count,
                code: 0,
                message: '分类数据获取成功'
            })
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 404,
        })
    }
}

//获取未分页的所有分类
exports.getClassify = async (req, res) => {
    const sql = `select * from classify where cl_isDel != 1`
    let result = await query(sql)
    if (result.length > 0) {
        return res.json({
            code: 0,
            message: '获取分类成功',
            data: result
        })
    } else {
        return res.json({
            code: 404,
            message: '获取分类失败'
        })
    }
}
//更改分类的数据
exports.updateClassify = (req, res) => {
    let { cl_id, cl_name, cl_Notes } = req.body;
    //查询当前分类名称是否存在
    const sql1 = `select * from classify where cl_name='${cl_name}'`
    db.query(sql1, (err, data) => {
        if (err) return res.json({
            code: 404,
            message: '更新分类失败'
        })
        if (data.length > 0) {
            return res.json({
                code: 1,
                message: '分类名称已存在'
            })
        } else {
            const sql = `update classify set cl_name='${cl_name}',cl_Notes='${cl_Notes}' where cl_id=${cl_id}`
            db.query(sql, (err, data) => {
                if (err) return res.json({
                    code: 404,
                    message: '更新分类失败'
                })
                res.json({
                    code: 0,
                    message: '更新分类成功'
                })
            })
        }
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
exports.addClassify = async (req, res) => {
    let { cl_name, cl_Notes } = req.body;
    //修改的分类是否相同
    const sql1 = `select * from classify where cl_name='${cl_name}'`
    let result = await query(sql1)
    if (!result.length > 0) {
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
    } else {
        return res.json({
            code: 401,
            message: '分类已存在'
        })
    }
}


var oldFile;
//上传图片接口
exports.newPhoto = (req, res) => {
    try {
        let files = req.file
        let oldName = files.filename
        let newName = files.originalname
        let str = newName.indexOf('.')
        let sub = newName.substring(str, newName.length)
        let newUrl = oldName + sub
        let oldSrc = path.join(__dirname, '/uploads', oldName) //当前目录的绝对路径并查到上传的二进制文件名称
        let newSrc = path.join(__dirname, '/uploads', newUrl) //拿到最终要上传的路径和文件的源名称
        oldFile = '/uploads/' + newUrl
        console.log(oldFile);
        fs.renameSync(oldSrc, newSrc)
        return res.json({
            code: 200,
            message: '更新头像成功,全局头像将在稍后生效',
            url: oldFile
        })
    } catch (err) {
        return res.json({
            code: 404,
            message: '更新头像失败，请稍后重试',
        })
    }

}

//获取添加文章的数据
exports.addActive = async (req, res) => {
    let { datas, content, user } = req.body
    let { active_title, active_author, file, selx } = datas
    const sql = `insert into active (title,author,content,time,activePhoto,relationActiveSort,issueUser) values('${active_title}','${active_author}','${content}','${minte}','${oldFile}',${selx},'${user}')`
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


//获取所有文章数据
exports.getAllActives = async (req, res) => {
    let { page, limit, search_article_title } = req.query
    //查询当前数据总和
    let sql1 = `select count(id) as con from active where 1 `
    if (search_article_title) {
        sql1 += ` and title like '%${search_article_title}%'`
    }
    let result1 = await query(sql1)
    let count = result1[0].con
    //查询当前页数据
    let offset = (page - 1) * limit
    let  sql = `select a.*,b.cl_name from active as  a inner join classify as b  on a.relationActiveSort = b.cl_id where 1 and  is_del !=1 `

    if(search_article_title) {
        sql += ` and title like '%${search_article_title}%'`
    }

    sql += `order by a.id desc limit ${offset},${limit}`
    try {
        await query(sql).then(data => {
            return res.json({
                data,
                count,
                code: 0,
                message: '文章数据获取成功'
            })
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 404,
            message: '文章数据获取失败'
        })
    }
}

//编辑文章
exports.updateArtitle = async (req, res) => {
    let { article_title, article_author, article_classify, activeStatus, content, oldSrc, id } = req.body;
    var oldFile;
    var sql = ''
    let oldSrcs = oldSrc
    if (req.file) {
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
        fs.unlinkSync(path.join(__dirname, oldSrcs))
        sql = `update active set title='${article_title}',author='${article_author}',activeStatus='${activeStatus}',content='${content}',activePhoto='${oldFile}',relationActiveSort='${article_classify}' where id=${id}`
    } else {
        sql = `update active set title='${article_title}',author='${article_author}',activeStatus='${activeStatus}',content='${content}',relationActiveSort='${article_classify}' where id=${id}`
    }

    try {
        let result = await query(sql)
        if (result.affectedRows) {
            return res.json({
                code: 200,
                message: '编辑成功'
            })
        } else {
            return res.json({
                code: 404,
                message: '编辑失败'
            })
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 404,
            message: '编辑失败'
        })
    }
}


//获取所有审核通过的文章数据
exports.getAllActivesPass = async (req, res) => {
    const sql =  `select a.*,b.cl_name from active as  a inner join classify as b  on a.relationActiveSort = b.cl_id where 1 and  is_del !=1 and activeStatus = 1`
    try {
        let result = await query(sql)
        if (result.length) {
            return res.json({
                data: result,
                code: 0,
                message: '文章数据获取成功'
            })
        } else {
            return res.json({
                code: 404,
                message: '文章数据获取失败'
            })
        }
        
    } catch (err) {
        console.log(err);
    }
}