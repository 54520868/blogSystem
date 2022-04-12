//导入数据库
// const req = require('express/lib/request')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../DB/db.js')
const query = require('./promises.js')
//获取所有用户
exports.getUserinfo = async (req, res) => {
    let { page, limit } = req.query
    //查询当前数据总和
    const sql1 = `select count(id) as con from aaaaa`
    let result1 = await query(sql1)
    let count = result1[0].con
    //查询当前页数据
    let offset = (page - 1) * limit
    const sql = `select id,username,email,iphone,minte,is_state  from aaaaa  limit ${offset},${limit}`
    try {
        await query(sql).then(data => {
            return res.json({
                data,
                count,
                code: 0,
                message: '用户数据获取成功'
            })
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 404,
        })
    }
}

//获取查询的用户
exports.getUser = async (req, res) => {
    let { search_user } = req.query;
    const sql = `select id,username,email,iphone,minte,is_state from aaaaa where username like '%${search_user}%'`
    try {
        let datas = await query(sql)
        if (!datas.length > 0) {
            res.json({
                code: 404,
                message: '当前无此用户'
            })
        } else {
            res.json(datas)
        }

    }
    catch (err) {
        console.log(err);
    }
}

//更新用户头像
exports.updateUserPhoto = async (req, res) => {
    let { photo, id } = req.body
    const sql = `update usercomfig set headPhoto='${photo}' where id=${id}`
    const sql2 = `select * from usercomfig where id=${id}`
    let results = await query(sql2)
    res.cookie('userThisComfig', JSON.stringify(results[0]), {})
    let result = await query(sql)
    if (result.affectedRows) {
        return res.json({
            code: 200,
        })
    } else {
        return res.json({
            code: 404,
        })
    }
}

//更新用户信息
exports.updateUserinfo = async (req, res) => {
    let { id, datas: { names, nickname, email, iphone, sex, about } } = req.body
    const sql = `update usercomfig set username='${names}',nickname='${nickname}',sex='${sex}',introduction='${about}',userEmail='${email}',userIPhone='${iphone}' where id=${id} `
    let result = await query(sql)
    if (result.affectedRows) {
        return res.json({
            code: 200,
            message: "个人信息更新成功"
        })
    } else {
        return res.json({
            code: 404,
            message: "个人信息更新失败"
        })
    }
}

//获取用户信息
exports.getInfo = async (req, res) => {
    let { id } = req.body
    const sql = `select * from usercomfig where id=${id}`
    let result = await query(sql)
    res.cookie('userThisComfig', JSON.stringify(result[0]), {})
    if (result.length > 0) {
        return res.json({
            code: 200,
        })
    } else {
        return res.json({
            code: 404,
            message: '查询失败'
        })
    }
}