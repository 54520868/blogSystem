//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const query = require('./promises.js');
const { log } = require('console');
//格式化时间
let minte = moment().format('YYYY-MM-DD-HH:mm:ss')

//新增信息
exports.addCars = async (req, res) => {
    //获取到文件数据
    let file = req.file
    //解构前端的数据
    let { car_name, car_color, car_brand, car_intro } = req.body
    let oldName = file.filename
    let newName = file.originalname
    let oldSrc = path.join(__dirname, '/uploads', oldName) //当前目录的绝对路径并查到上传的二进制文件名称
    let newSrc = path.join(__dirname, '/uploads', newName) //拿到最终要上传的路径和文件的源名称
    let sp = newSrc.indexOf('.');
    let joint = newSrc.substring(sp, newSrc) + '_' + new Date().getTime();
    let joints = newSrc.substring(sp, newSrc.length)
    newSrc = joint + joints
    let cs = newSrc.indexOf('router');
    let css = newSrc.substring(cs - 1, newSrc.length);
    let newMysqlUrk = `http://101.43.15.245:7100${css}` 
    //本地路径存进数据库 \会被转义 需要改为双 \\ 
    let newss = newMysqlUrk.replace(/[\\]/g, '\\\\')
    css = css.replace(/[\\]/g, '\\\\')
    console.log(css);
    // //将旧的二进制文件拿到文件的全名并进行移动
    fs.renameSync(oldSrc, newSrc)
    const sql = `insert into cars (name,brand,color,intro,picPath,time,localimg) values('${car_name}','${car_brand}','${car_color}','${car_intro}','${newss}','${minte}','${css}')`
    try {
        let result = await query(sql)
        if (result.affectedRows) {
            return res.json({
                "code": 0
                , "msg": "增加信息成功"
            })
        } else {
            return res.json({
                "code": 1
                , "msg": "新增信息失败"
                ,
            })
        }
    }
    catch (err) {
        console.log(err);
        if(err) {
            return res.json({
                "code": 1
                , "msg": "新增信息失败"
                ,
            })
        }
    }

}

//查询信息
exports.getCar = async (req, res) => {
    const sql = `select a.*,b.brand as thisBrand from cars as a inner join car_brand as b on a.brand = b.id;`
    let result = await query(sql)
    res.json(result)
}

//获取查询信息
exports.getCars = async (req, res) => {
    let { search_cars } = req.query;
    const sql = `select * from cars where name like '%${search_cars}%'`
    try {
        let datas = await query(sql)
        if (!datas.length > 0) {
            res.json({
                code: 404,
                message: '当前无此品牌的车辆信息' 
            })
        } else {
            res.json(datas)
        }

    }
    catch (err) {
        console.log(err);
    }
}