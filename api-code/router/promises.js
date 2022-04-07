//导入数据库
const db = require('../DB/db.js')
function query(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql,(err,data) => {
            if (err) {
                reject(err)
            } 
            resolve(data)
        })
    })
}

module.exports = query