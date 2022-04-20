const multer = require(`multer`)
const upload = multer({ dest: `router/uploads/` })
const express = require(`express`);
const app = express();

//导入文章模块
const active = require(`../router/avtive.js`)

//挂载删除文章的路由函数
app.post(`/deleteAvtive`,active.regDeActive)


//获取所有分类 --- 分页数据
app.get(`/getAllClassify`,active.getAllClassify)

//获取所有的分类 --不分页
app.get(`/getClassify`,active.getClassify)

//更改分类的数据
app.post(`/updateClassify`,active.updateClassify)
//删除分类
app.post(`/deleteClassify`,active.deleteClassify)
//新增分类
app.post(`/addClassify`,active.addClassify)
//新增文章信息
app.post(`/newPhoto`,upload.single(`file`),active.newPhoto)

//添加文章
app.post(`/addActives`,active.addActive)
//获取所有文章数据
app.get(`/getAllActives`,active.getAllActives)
//编辑文章数据
app.post(`/updateArtitle`,upload.single(`file`),active.updateArtitle)

//获取所有审核通过的文章
app.get(`/getAllActivesPass`,active.getAllActivesPass)

module.exports = app;