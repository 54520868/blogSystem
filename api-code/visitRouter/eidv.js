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

//挂载用户信息的页面
app.get('/addCard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/addCard.html'))
})

//挂载文章信息的页面
app.get('/AddTheArticle', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/AddTheArticle.html'))
})

//挂载车辆信息的页面
app.get('/carsInfo', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/carsInfo.html'))
})

//挂载修改密码的页面
app.get('/ChangePsd', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/ChangePsd.html'))
})

//挂载商品信息的页面
app.get('/goodsInfo', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/goodsInfo.html'))
})

//挂载新增商品的页面
app.get('/newGoods', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index/newGoods.html'))
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