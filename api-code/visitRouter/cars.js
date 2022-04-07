//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const express = require('express');

const multer = require('multer')
const upload = multer({ dest: 'router/uploads/' })
const app = express();

const cars = require('../router/cars.js')
//查询信息
app.get('/getCar',cars.getCar)

//新增信息
app.post('/addCars',upload.single('file'),cars.addCars)

//查询车辆信息
app.get('/getCars',cars.getCars)



module.exports = app