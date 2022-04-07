const db = require('../DB/db.js')
const moment = require('moment');
const express = require('express');
const app = express();

//导入文章模块
const active = require("../router/avtive.js")

//挂载处理文章的路由函数
app.post('/addActive',active.regAddActive)
//挂载删除文章的路由函数
app.post('/deleteAvtive',active.regDeActive)
//挂载获取单条文章数据的路由函数
app.post('/getActiveOne',active.getOneDate)
//挂载更新文章的路由函数
app.post('/putData',active.regPutActive)
//挂载获取所有文章的路由函数
app.get('/gainActive',active.getNewActive)

module.exports = app;