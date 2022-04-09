const express = require('express');
const path = require('path');
const app = express();

//挂载用户信息的页面
app.get('/lyear_main', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/lyear_main.html'))
})


//挂载用户信息的页面
app.get('/userInfo', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/userInfo.html'))
})


//挂载文章信息的页面
app.get('/AddTheArticle', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/AddTheArticle.html'))
})

//文章审核中心
app.get('/activeAudit',(req,res) => {
    res.sendFile(path.join(__dirname, '../views/index/activeAudit.html'))
})

app.get('/systemComfig', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/systemComfig.html'))
})
//挂载修改密码的页面
app.get('/ChangePsd', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/ChangePsd.html'))
})

//挂载文章分类的页面
app.get('/classify', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/classify.html'))
})


//挂载个人信息的页面
app.get('/PIM', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/PIM.html'))
})

//挂载所有文章的页面
app.get('/lyear_pages_doc', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/lyear_pages_doc.html'))
})


module.exports = app