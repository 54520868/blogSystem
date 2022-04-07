//导入数据库
// const req = require('express/lib/request')
const db = require('../DB/db.js')
const query = require('./promises.js')
//获取所有用户
exports.getUserinfo = async (req, res) => {
    const sql = `select id,username,email,iphone,minte,is_state from aaaaa`
    let result = await query(sql).then(data => {
        return res.json({
            code: 200,
            data
        })
    }).catch((err) => {
        return res.json({
            code: 404,
            message: '获取用户数据失败'
        })
    })
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