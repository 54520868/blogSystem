const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
// const session = require('express-session');
//导入环境变量
require('dotenv').config()
//导入解析token的中间件
const expressJWT = require('express-jwt')
//导入秘钥
const Retail = require('./Retail.js')
const app = express();
const port = 7100;
//导入数据库
const db = require('./DB/db.js')
//挂载渲染页面文件
app.use(express.static(path.join(__dirname, 'views')))

//挂载上传的文件
app.use('/router', express.static('router'))

//渲染body数据
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())
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

//设置jwt的鉴权的验证规则 并且设置需要验证的路径
// app.use(expressJWT({ secret: Retail.jwtSecretKey, algorithms: ['HS256'] }).unless({path:['/login','/login/','/error','/error/','/getInfo']}))

const fnt = require('./visitRouter/fnt.js')
app.use(fnt)

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


//捕获认证失败
// app.use(function (err, req, res, next) {
//     console.log(err);
//     //UnauthorizedError token错误对象
//     console.log(err.name);
//     if (err.name === 'UnauthorizedError') { 
//         //返回错误页面
//         // let errors = `
//         //                 <script  type="text/javascript">
//         //                     console.log('认证失败')
//         //                     top.location.href = 'http://localhost:7100/error.html'
//         //                 </script>
//         //             `                         
//         // res.send(errors)
//         res.send('认证失败')
//         return
//     } else {
//         next()
//     }
// }

app.listen(port, () => {
    console.log(`Port The port number is:${port}`);
})