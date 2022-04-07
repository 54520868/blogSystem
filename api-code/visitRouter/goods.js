//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const express = require('express');

const multer = require('multer')
const upload = multer({ dest: 'router/uploads/' })
const app = express();

const goods = require('../router/goods.js');

//挂载上传文件路由
app.post('/uploadImg',upload.single('file'),goods.uploadImg)

//挂载新增商品路由
app.post('/newGoods',goods.newGoods)

//获取所有商品路由
app.get('/getGoods',goods.getGoods)

//删除商品
app.post('/detGoods',goods.detGoods)

//获取当前所选择的商品
app.post('/getCurveGood',goods.getCurveGood)

//更新商品
app.post('/putGoods',goods.putGoods)

module.exports = app