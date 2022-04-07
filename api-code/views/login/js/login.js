$(function () {
    //初始化验证码
    var verifyCode = new GVerify({
        id: "picyzm",
        type: "blend"
    });
    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var loading;
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        layui.code();
    });
    //表单切换
    $('#loginFormRegisterBtn').click(function () {
        $('#loginForm').hide();
        $('#title').html('注册')
        $('#registerForm').show()
    })
    $('#loginBtn').click(function () {
        $('#registerForm').hide();
        $('#title').html('登录')
        $('#loginForm').show()
    })
    //小眼睛
    function minEye(id, inp, state) {
        $(id).click(function () {
            if ($(inp).attr('type') == 'password') {
                $(inp).attr('type', 'text')
                $(state).removeClass('icon-yanjing_xianshi')
                $(state).addClass('icon-yanjing_yincang')
            } else {
                $(inp).attr('type', 'password')
                $(state).addClass('icon-yanjing_xianshi')
                $(state).removeClass('icon-yanjing_yincang')
            }
        })
    }
    minEye('#eye', '#inputState', '#eyeState')
    minEye('#eye1', '.inputState1', '#eyeState1')
    minEye('#eye2', '.inputState1', '#eyeState2')
    let auditResult;
    let loginResult;
    //注册正则判断
    function ifFormData() {
        //用户名正则
        let usernames = /^[a-z][a-zA-z0-9]{7}/
        let usernameVal = $("#regUserName").val().toString();
        //密码正则
        let passwords = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,}$/
        let passwordVal = $("#regPassword").val().toString();
        let ConfirmPassval = $("#ConfirmPass").val().toString();
        //邮箱正则
        let emails = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-zA-Z0-9]{3,8})?$/
        let emailVal = $('#regEmail').val().toString()
        //手机号正则
        let iphones = /^1[0-9]{10}$/
        let iphoneVal = $("#regIphone").val().toString()
        if ($('#regUserName').val() === "" && $('#regPassword').val() === "" && $('#ConfirmPass').val() === "" && $('#regEmail').val() === "" && $('#regIphone').val() === "") {
            // layer.msg("您还未输入任何信息 ，不可验证")
            toast.error({
                title: '错误',
                message: `您还未输入任何信息,请填写信息之后在提交`,
                position: 'topRight'
            });
            $('#regUserName').focus();
            auditResult = false;
            return false;
        }
        //判断各个输入框是否符合要求
        if (!usernames.test(usernameVal)) {
            toast.error({
                title: '错误',
                message: `您输入的用户名格式不正确,请输入以字母开头最少8位数的用户名`,
                position: 'topRight'
            });
            auditResult = false;
        } else if (!passwords.test(passwordVal)) {
            toast.error({
                title: '错误',
                message: `您输入的密码格式不正确,密码必须包含大小写并且有特殊字符最少8位数组成`,
                position: 'topRight'
            });
            auditResult = false;
        } else if (ConfirmPassval === '') {
            toast.error({
                title: '错误',
                message: `请确认你的重复密码`,
                position: 'topRight'
            });
            auditResult = false;
        } else if (!passwordVal == ConfirmPassval) {
            toast.error({
                title: '错误',
                message: `重复密码输入不正确，请重新输入`,
                position: 'topRight'
            });
            auditResult = false;
        } else if (!emails.test(emailVal)) {
            toast.error({
                title: '错误',
                message: `您输入的邮箱格式不正确,请重新输入`,
                position: 'topRight'
            });
            auditResult = false;
        } else if (!iphones.test(iphoneVal)) {
            toast.error({
                title: '错误',
                message: `您输入的手机号码格式不正确,请查正后重新输入`,
                position: 'topRight'
            });
        } else {
            auditResult = true;
        }
    }
    //登录判断
    function ifLoginData() {
        if ($('#loginData').val() === "") {
            toast.error({
                title: '错误',
                message: `请您先填写用户名之后在进行登录`,
                position: 'topRight'
            });
            $('#loginData').focus();
            loginResult = false;
            return false;
        } else if ($('#inputState').val() === "") {
            toast.error({
                title: '错误',
                message: `请您先填写密码之后在进行登录`,
                position: 'topRight'
            });
            $('#inputState').focus();
            loginResult = false;
        } else if ($('#code_input').val() === "") {
            toast.error({
                title: '错误',
                message: `请您先填写验证码之后在进行登录`,
                position: 'topRight'
            });
            $('#code_input').focus();
            loginResult = false;
        } else {
            loginResult = true;
        }
    }
    //监听注册表单的提交事件
    $('#registerForm').on('submit', (e) => {
        //  阻止form表单的默认提交行为
        e.preventDefault();
        //执行数据校验
        ifFormData();
        if (auditResult) {
            $.ajax({
                type: 'post',
                url: '/register',
                dataType: 'json',
                //快速获取表单信息,将数据传回后台
                data: $('#registerForm').serialize(),
                beforeSend: function () {
                    loading.Load(5, "");
                    loading.loadRemove(2000);
                },
                success: function (res) {
                    if (res.code == 200) {
                        setTimeout(function () {
                            toast.success({
                                title: '成功',
                                message: res.message,
                                position: 'topRight'
                            });
                        }, 0)
                        setTimeout(function () {
                            $('#loginBtn').click()
                        }, 1000)
                    } else if (res.code == 404) {
                        toast.error({
                            title: '失败',
                            message: res.message,
                            position: 'topRight'
                        });
                    } else {
                        toast.question({
                            title: '未知错误',
                            message: '注册失败,网络繁忙,请稍后在试',
                            position: 'topRight'
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }

    })
    //监听登录表单的提交事件
    $('#loginForm').on('submit', (e) => {
        //  阻止form表单的默认提交行为
        e.preventDefault();
        //登录校验
        ifLoginData();
        if (loginResult) {
            //判断当前验证码是否正确
            if (!verifyCode.validate($('#code_input').val())) {
                toast.error({
                    title: '登录失败',
                    message: `验证码错误,请重试`,
                    position: 'topRight'
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: "/login",
                    data: $('#loginForm').serialize(),
                    dataType: "json",
                    beforeSend: function () {
                        loading.Load(5, "");
                        loading.loadRemove(2000);
                    },
                    success: (data => {
                        switch (data.code) {
                            case 404: {
                                toast.error({
                                    title: '登录失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }
                                break;
                            case 403: {
                                toast.question({
                                    title: '登录失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }
                                break;
                            case 500: {
                                toast.error({
                                    title: '登录失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }
                                break;
                            case 200: {
                                setTimeout(function () {
                                    toast.success({
                                        title: '成功',
                                        message: data.message,
                                        position: 'topRight'
                                    });
                                    setTimeout(function () {
                                        localStorage.setItem('token', data.token),
                                            location.href = '/index'
                                    }, 700)
                                }, 0)
                            }
                                break;
                        }
                    })
                })
            }
        }

    })

})

