//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const express = require('express');
const app = express();

const routerUserinfo = require('../router/userinfo.js')
//获取所有用户
app.get('/getUserinfo',routerUserinfo.getUserinfo)

//查询用户
app.get('/getUser',routerUserinfo.getUser)

//更新用户头像
app.post('/updateUserPhoto',routerUserinfo.updateUserPhoto)

//更新用户信息
app.post('/updateUserinfo',routerUserinfo.updateUserinfo)

//dddAh
app.post('/getInfo',routerUserinfo.getInfo)

module.exports = app