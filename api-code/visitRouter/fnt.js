const express = require(`express`);
const app = express();


//导入分配到前台的路由

const fnt = require(`../router/fnt.js`);

app.get(`/allArticle`, fnt.allArticle);

//获取当前选择分类的文章
app.get(`/getArticleDetails`, fnt.getArticleDetails);

app.get(`/thisArtice`, fnt.thisArtice);

module.exports = app;