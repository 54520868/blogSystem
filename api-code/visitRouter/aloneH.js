const express = require(`express`);
const path = require(`path`);
const app = express();

//挂载登录的页面
app.get(`/login`, (req, res) => {
    res.sendFile(path.join(__dirname, `../views/login.html`))
})
//挂载index的页面
app.get(`/index`, (req, res) => {
    res.sendFile(path.join(__dirname, `../views/index.html`))
})

//挂载博客首页前台
app.get(`/blogIndex`, (req, res) => {
    res.sendFile(path.join(__dirname, `../views/blogIndex/blogIndex.html`))
})


//挂载错误的页面
app.get(`/error`, (req, res) => {
    res.sendFile(path.join(__dirname, `../views/error.html`))
})

module.exports = app