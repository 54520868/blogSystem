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

module.exports = app