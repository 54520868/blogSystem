const express = require('express');
const path = require('path');
const fs = require('fs');
// const session = require('express-session');
const app = express();
const post = 7100;
//导入数据库
const db = require('./DB/db.js')
//挂载渲染页面文件
app.use(express.static(path.join(__dirname, 'views')))

//挂载上传的文件
app.use('/router', express.static('router'))

//渲染body数据
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// // session配置项
// const sessionInitialize = {
//     name: "session_name", //session的名称 
//     secret: '2123423@#$%%', //加密的秘钥,
//     //cookie 配置项
//     cookie: {
//         path: '/',  //存放路径
//         secure: false,  // 
//         maxAge: 60000 * 4320,  //设置失效时间 失效时间为3天 3天免登录
//     }
// }
// //session初始化
// app.use(session(sessionInitialize))

// // 设置访问权限
// app.use((req, res, next) => {
//     // //获取当前访问的路由
//     let visitUrl = req.path.toLowerCase()
//     //当前路不需要验证权限
//     let noVisit = ['/login', '/login/', '/error', '/error/']
//     // //如为登录页面则不需要校验权限
//     if (noVisit.includes(visitUrl)) {
//         next()
//     } else {
//         if (req.session.user) {
//             next()
//         } else {
//             res.redirect('/error')
//             return
//         }
//     }
// })


//挂载的网页
const aloneH = require('./visitRouter/aloneH.js')
//单独给模块设置请求头 使其与内部相隔离
app.use(aloneH)


//挂载主页内部的网页
const eidv = require('./visitRouter/eidv.js')
//单独给模块设置请求头 使其与内部相隔离
app.use('/index', eidv)


//导入用户模块
const user = require('../api-code/visitRouter/user.js')
app.use(user)

//导入文章模块
const active = require('../api-code/visitRouter/avtive.js')
app.use(active)

//导入用户信息处理模块
const users = require('../api-code/visitRouter/userinfo.js')
app.use(users)

//导入商品处理模块
const goods = require('../api-code/visitRouter/goods.js')
app.use(goods)

//导入汽车信息管理模块
const cars = require('../api-code/visitRouter/cars.js')
app.use(cars)




app.listen(post, () => {
    console.log(`Port The port number is:${post}`);
})