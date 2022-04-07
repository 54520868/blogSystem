//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const query = require('./promises.js');
const { log } = require('console');
//格式化时间
let minte = moment().format('YYYY-MM-DD-HH:mm:ss')

//上传图片文件到服务端
exports.uploadImg = (req, res) => {
    let file = req.file
    let oldName = file.filename
    let newName = file.originalname
    let newUrl = `/uploads/${newName}`
    let oldSrc = path.join(__dirname, '/uploads', oldName) //当前目录的绝对路径并查到上传的二进制文件名称
    let newSrc = path.join(__dirname, '/uploads', newName) //拿到最终要上传的路径和文件的源名称
    // //将旧的二进制文件拿到文件的全名并进行移动
    fs.renameSync(oldSrc, newSrc)
    res.json({
        message: "上传成功",
        file,
        newUrl
    })
}

//新增商品
exports.newGoods = async (req, res) => {
    let { imgval, goods_name, goods_price, goods_stock, goods_intro } = req.body;
    const sql = `insert into goods (title,price,stock,intro,goodPhoto,add_time) values ('${goods_name}','${goods_price}','${goods_stock}','${goods_intro}','${imgval}','${minte}')`;
    await query(sql).then(data => {
        return res.json({
            code: 200,
            message: '新增商品成功',
        })
    }).catch(err => {
        return res.json({
            code: 404,
            message: '新增商品失败'
        })
    })
}

//获取未删除的商品商品
exports.getGoods = async (req, res) => {
    const sql = `SELECT * FROM goods where is_delect != 1`
    await query(sql).then(data => {
        return res.json({
            code: 200,
            message: '获取商品数据成功',
            data
        })
    }).catch(err => {
        return res.json({
            code: 404,
            message: '获取商品数据失败'
        })
    })
}
//删除商品
exports.detGoods = async (req, res) => {
    let { id } = req.body
    const sql = `update goods set is_delect=1 where id=${id}`
    const sqlTo = `select * from goods where id=${id}`
    await query(sql).then(data => {
        return res.json({
            code: 200,
            message: '删除商品成功',
        })
    }).catch(err => {
        return res.json({
            code: 404,
            message: '删除商品失败'
        })
    })

    await query(sqlTo).then(data => {
        let {goodPhoto} = data[0]
        let str = goodPhoto.indexOf("router");
        let result = goodPhoto.substring(str+6,str.length);
        let newUrl = path.join(__dirname,result)
        fs.unlinkSync(newUrl)
    }).catch(err => {
        console.log(err);
    })
}

//获取当前所选择的商品
exports.getCurveGood = async (req, res) => {
    let { id } = req.body
    const sql = `select * from goods where id = ${id}`
    await query(sql).then(result => {
        return res.json({
            code: 200,
            message: '获取当前商品数据成功',
            result
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            code: 404,
            message: '获取当前商品数据失败'
        })
    })
}

//更新当前商品
exports.putGoods = async (req, res) => {
    let { id, goods_name, goods_price, goods_stock, goods_intro } = req.body;
    const sql = `update goods set title='${goods_name}',price='${goods_price}',stock='${goods_stock}',intro='${goods_intro}' where id=${id}`;
    await query(sql).then(data => {
        res.json({
            code: 200,
            message: '更新商品成功'
        })
    }).catch(err => {
        return res.json({
            code: 404,
            message: '更新商品失败'
        })
    })
}