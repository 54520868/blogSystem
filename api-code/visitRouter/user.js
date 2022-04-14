//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
const express = require('express');
const app = express();

//导入用户登录注册的模块
const user = require("../router/user.js")

//挂载用户注册的路由
app.post('/register',user.regUser)
//挂载用户注册的路由
app.post('/login',user.regLogin)
//校验密码
app.post('/verifyPass',user.verifyPass)
//校验权限
app.get('/getInfo',user.getInfo)
//网站配置
app.get('/getWebConfig',user.getWebConfig)
//更新网站配置
app.post('/updataWebConfig',user.updataWebConfig)
//修改密码
app.post('/updataPass',user.updataPass)

//可视化
app.get('/getVisual',user.getVisual)
module.exports = app;