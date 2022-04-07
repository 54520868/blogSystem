//导入数据库
const db = require('../DB/db.js')
const moment = require('moment');
// const session = require('express-session');
//导入jwt
let jwt = require('jsonwebtoken');
//导入验证的秘钥
let Retail = require('../Retail.js')
const query = require('./promises.js')
//导入bcryptjs 密码加密包
const bcrypt = require("bcryptjs")
//格式化时间
let minte = moment().format('YYYY-MM-DD-HH:mm:ss')
//用户注册处理函数
exports.regUser = (req, res) => {
    //获取前端传回的数据
    let { regUserNames, regPasswords, ConfirmPass, regEmails, regIphones } = req.body;
    //调用 bcryptjshanh sycn加密
    //对密码进行加密赋值
    let brypt = bcrypt.hashSync(regPasswords, 15).toString()
    regPasswords = brypt;
    const sql = `select * from aaaaa where username='${regUserNames}'`
    db.query(sql, (err, data) => {
        //有错误则直接执行错误
        if (err) {
            console.error(err);
            return
        }
        //如果查询到了 则即当前用户名存在
        if (data.length > 0) {
            res.json({
                code: 404,
                message: '当前用户名已存在,请更换用户名后重试'
            })
        } else {
            res.json({
                code: 200,
                message: '恭喜您,注册成功'
            })
            //定义sql插入语句
            const successSql = `insert into aaaaa (username,password,email,iphone,minte) values ('${regUserNames}','${regPasswords}','${regEmails}','${regIphones}','${minte}');`
            db.query(successSql, (err, result) => {
                //有错误则直接执行错误
                if (err) {
                    console.error(err);
                    return
                } else {
                    console.log(`用户注册成功`);
                }
            })
        }
    })
}
//用户登录处理函数
exports.regLogin = (req, res) => {
    let state;
    //获取前端传回的数据
    let { loginData, inputState } = req.body
    //查询是否有当前此用户
    const sql = `select * from aaaaa where username='${loginData}'`;
    db.query(sql, (err, data) => {
        var [is_state] = data;
        if(is_state) {
            var { is_state } = is_state
        }
       
        //报错则直接终止
        if (err) {
            res.json({
                code: 404,
                message: '网络繁忙,请稍后在试'
            })
            return false
        }
        //判断是否有当前用户
        if (!data.length > 0) {
            res.json({
                code: 500,
                message: '账号或密码输入错误,请重试'
            })
            return false
        }

        //判断当前用户状态
        if (is_state == 1) {
            state = true;
        } else {
            state = false;
        }


        // 对数据进行加密传输
        const datas = { loginData }
        let token = jwt.sign(datas,Retail.jwtSecretKey, { expiresIn: Retail.expiresIn })
        const userResult = bcrypt.compareSync(inputState, data[0].password)
        if (!userResult) {
            res.json({
                code: 500,
                message: '账号或密码输入错误,请重试'
            })
            return false
        } else if (state) {
            res.json({
                code: 403,
                message: '该账号已被封禁,请联系网站人员或重新注册'
            })
            return false
        } else {
            // req.session.user = loginData;
            res.json({
                code: 200,
                message: '登录成功',
                token: `${token}`
            })
        }

    })
}

//校验token权限
exports.getInfo = (req, res) => {
    try {
        let { tok } = req.query;
        let obj = jwt.verify(tok, Retail.jwtSecretKey);
        let { loginData } = obj
        res.json({
            code: 200,
            user: loginData
        })
    }
    catch (err) {
        if (err) {
            res.json({
                code: 401,
                message: "验证权限失败,请重新登录"
            })
        }
        return
    }
}


//校验密码
exports.verifyPass = async (req, res) => {
    let { user, oldVal } = req.body
    if (user) {
        const sql = `select * from  aaaaa where username='${user}'`
        await query(sql).then(data => {
            let [datas] = data;
            let pass = datas.password
            if (data.length > 0) {
                const userResult = bcrypt.compareSync(oldVal, pass)
                if(!userResult) {
                    return res.json({
                        code: 400,
                        message: '验证旧密码失败,请重新输入'
                    })
                }else {
                    return res.json({
                        code: 200,
                        message: '恭喜您,验证成功'
                    })
                }
            } else {
                return res.json({
                    code: 402,
                    message: '获取用户数据失败,无法验证账户,请重新登录后在修改'
                })
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        //没找到则直接结束当前任务，返回错误
        return res.json({
            code: 404,  
            message: "验证失败,请稍后在试或重新登录"
        })
    }
}

//修改密码
exports.updataPass = async  (req, res) => {
    let {passVal,user} = req.body;
    if (user) {
        //对密码进行加密
        let brypt = bcrypt.hashSync(passVal, 15).toString()
        //更新数据
        const sql = `update aaaaa set password='${brypt}' where username='${user}'`
        await query(sql).then(data => {
            if(data.affectedRows) {
                return res.json({
                    code: 200,  
                    message: "修改密码成功"
                })
            } else {
                
                return res.json({
                    code: 401,  
                    message: "网络繁忙,修改密码失败,请稍后在试"
                })
            }
        }).catch(err=> {
            console.log(err);
        })
        
    } else {
        //没找到则直接结束当前任务，返回错误
        return res.json({
            code: 404,  
            message: "验证失败,请稍后在试或重新登录"
        })
    }
}
