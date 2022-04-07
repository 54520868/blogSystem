//导入mysql
const mysql = require('mysql');
//调用方法 创建数据库
const db = mysql.createConnection({
    host: "101.43.15.245",
    user: "blog",
    password: "m3RkyPM3tyTjMLe6",
    database: "54520868",
    multipleStatements: true, // 支持执行多条 sql 语句
    useConnectionPooling: true
})

//监听数据库是否链接成功
// db.connect(function (err) {
//     // 当数据库信息错误时 连接不成功，则会抛出错误
//     if (err) {
//         console.error("数据库连接失败，请重试");
//     } else {
//         // 如没有抛出错误，则代表连接成功
//         console.log("数据库连接成功！");
//     }
// })


//将数据库共享出去使用
module.exports = db