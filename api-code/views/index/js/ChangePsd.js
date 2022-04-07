$(function () {
    let user = localStorage.getItem('user');
    let reg = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/
    //加载弹窗组件
    var toast;  
    var layer;
    var element;
    var loading;
    layui.use(['toast', 'form', 'jquery', 'layer', 'code', 'element', 'loading', 'step'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        form = layui.form,
            step = layui.step;
        layui.code();

        step.render({
            elem: '#stepForm',
            filter: 'stepForm',
            width: '100%',
            stepWidth: '600px',
            height: '500px',
            stepItems: [{
                title: '填写旧密码'
            }, {
                title: '确认新密码'
            }, {
                title: '完成'
            }]
        });
        form.on('submit(formStep)', function (data) {
            let val = $('#oldPass').val();
            $.ajax({
                type: 'POST',
                url: '/verifyPass',
                dataType: 'json',
                data: `user=${user}&oldVal=${val}`,
                beforeSend: () => {
                    loading.Load(4, "");
                    loading.loadRemove(1300);
                },
                success: (data => {
                    switch (data.code) {
                        case 404: {
                            setTimeout(function () {
                                toast.error({
                                    title: '失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }, 1000)
                        }
                            break;
                        case 402: {
                            setTimeout(function () {
                                toast.error({
                                    title: '失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }, 1000)
                        }
                            break;
                        case 400: {
                            setTimeout(function () {
                                toast.error({
                                    title: '失败',
                                    message: data.message,
                                    position: 'topRight'
                                });
                                $('#oldPass').focus().val('')
                            }, 400)
                        }
                            break;
                        case 200: {
                            toast.success({
                                title: '成功',
                                message: data.message,
                                position: 'topRight'
                            });
                            setTimeout(function () {
                                step.next('#stepForm');
                            }, 1500)
                        }
                            break;
                    }
                })
            })
            return false;
           
        });

        form.on('submit(formStep2)', function (data) {
            if(!(reg.test($('#newPass1').val())) && !(reg.test($('#newPass2').val()))) {
                toast.error({
                    title: '失败',
                    message: '密码必须由字母开头,8位数组成,请查正后重新输入',
                    position: 'topRight'
                });
            }else if(!($('#newPass1').val() === $('#newPass2').val() )) {
                toast.error({
                    title: '失败',
                    message: '重复密码错误,请重新输入',
                    position: 'topRight'
                });
            }else {
                let passVal = $('#newPass1').val()
                $.ajax({
                    type: 'POST',
                    url:'/updataPass',
                    dataType: 'json',
                    data:`user=${user}&passVal=${passVal}`,
                    beforeSend: () => {
                        loading.Load(4, "");
                        loading.loadRemove(1500);
                    },
                    success: function(data) {
                        switch (data.code) {
                            case 404: {
                                setTimeout(function () {
                                    toast.error({
                                        title: '失败',
                                        message: data.message,
                                        position: 'topRight'
                                    });
                                }, 1000)
                            }
                                break;
                            case 401: {
                                setTimeout(function () {
                                    toast.error({
                                        title: '失败',
                                        message: data.message,
                                        position: 'topRight'
                                    });
                                }, 1000)
                            }
                                break;
                            case 200: {
                                toast.success({
                                    title: '成功',
                                    message: data.message,
                                    position: 'topRight'
                                });
                                setTimeout(function () {
                                    step.next('#stepForm');
                                }, 1500)
                            }
                                break;
                        }
                    }
                    
                })               
            }
            return false;
        });

        $('.pre').click(function () {
            step.pre('#stepForm');
            return false;
        });

        $('.next').click(function () {
            step.next('#stepForm');
            return false;
        });

        $('#rtIndex').click(function () {
            top.location.href = '/index.html';
        });
        
    });



})