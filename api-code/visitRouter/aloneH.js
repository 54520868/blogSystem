const express = require('express');
const path = require('path');
const app = express();

//挂载登录的页面
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})
//挂载index的页面
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

// //退出登录
// app.get('/quitLogin', (req, res) => {
//     //清除登录信息
//     req.session.destroy(function (err) {
//         if (err) {
//             throw err;
//         }
//     })
//     //打回登录页
//     res.redirect('/login')
// })

//挂载错误的页面
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/error.html'))
})

module.exports = app