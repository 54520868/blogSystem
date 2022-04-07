$(function () {
    $('#userinfo').hide();
    $('#newInfo').click(function () {
        $('#userinfo').show();
    })
    $('#closes').click(function () {
        $('#userinfo').hide();
    })
    function titleMessages(id, message,time) {
        var $btn = $(id).button('loading');
        function yanshi() {
            setTimeout(function () {
                $btn.button("reset")
            }, 3e3)
        }
        async function foo() {
            await yanshi()
            setTimeout(function () {
                lightyear.notify(message, 'success', 2000, 'mdi mdi-emoticon-happy', 'top', 'center');
            }, time)
        }
        foo()
    }
    //初始化用户数据
    async function init() {
        let data = await $.ajax({
            type: "GET",
            url: "http://localhost:8000/userData",
            dataType: "json",
        })
        let str = ''
            data.forEach((item, index) => {
                let { user_username, user_email, user_iphone, user_deta, id } = item
                str += ` <tr>
                            <td>${index + 1}</td>
                            <td>${user_username}</td>
                            <td>${user_email}</td>
                            <td>${user_iphone}</td>
                            <td>${user_deta}</td>
                            <td><font class="text-success">正常</font></td>
                            <td>
                            <div class="btn-group">
                                <a class="btn btn-xs btn-default redact" data = ${id + 817}  href="#!" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                <a class="btn btn-xs btn-default" href="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                                <a class="btn btn-xs btn-default delData" data = ${id + 817}  href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
                            </div>
                            </td>
                        </tr>`
            });
            $('#tbodys').html(str)
    }
    //页面初始化
    init();
    function ajaxData(types, excape) {
        $.ajax({
            type: types,
            url: `http://localhost:8000/userData/${excape}`,
        })
    }
    $('#myButtones').click(()=> {
        titleMessages('#myButtones','用户数据更新完毕',2200)
        init();
    })

    //用户编辑 事件委托
    $('#tbodys').on('click', '.redact', function (e) {
        //获取事件对象父元素
        let evParent = e.target.parentNode
        //获取到属性的值 进行转换
        let excape = evParent.getAttribute('data') - 817;
        evParent.onclick = function () {
            $('#bbtn').click();
            $.ajax({
                type: "GET",
                url:   `http://localhost:8000/userData/${excape}`,
                dataType: "json",
            }).then(data => {
                $('#recipient_username').val(data.user_username);
                $('#recipient_email').val(data.user_email);
                $('#recipient_iphone').val(data.user_iphone);
                $('#recipient_deta').val(data.user_deta);
                $('#myButtons').click(()=>{
                    if ($('#recipient_username').val() == '' || $('#recipient_email').val() == '' || $('#recipient_iphone').val() == '') {
                        alert('编辑信息不能为空')
                    }else {
                        titleMessages('#myButtons','用户信息更新成功',2000)
                        $.ajax({
                            type: 'put',
                            url:`http://localhost:8000/userData/${excape}`,
                            data:$('#newUserMessage').serialize(),
                        })
                        setTimeout(() => {
                            $('#btnClose').click();
                            init();
                        },2100)

                    }
                })
            })
        }
    })

    //删除用户 事件委托
    $('#tbodys').on('click', '.delData', function (e) {
        //获取事件对象父元素
        let evParent = e.target.parentNode
        //获取到属性的值 进行转换
        let excape = evParent.getAttribute('data') - 817;
        evParent.onclick = function () {
            $.alert({
                title: '删除',
                content: '您确定要删除此用户吗？',
                buttons: {
                    confirm: {
                        text: '确认',
                        btnClass: 'btn-primary',
                        action: function () {
                            $.alert('删除成功!');
                            ajaxData('delete', excape)
                            //删除之后初始化数据
                            setTimeout(function () {
                                init();
                            }, 1500)
                        }
                    },
                    cancel: {
                        text: '取消',
                        action: function () {
                        }
                    }
                }
            });
        }
    })

    //新增数据
    $('.form-inline').on('submit', (e) => {
        //  阻止form表单的默认提交行为
        e.preventDefault();
        //获取数据 序列化表单
        // console.log($('.form-inline').serialize());
        //格式化时间
        let minte = moment().format('YYYY-MM-DD-HH:mm:ss')
        if ($('#example-if-email').val() == '' || $('#example-if-password').val() == '' || $('#example-if-iphone').val() == '') {
            alert('请填写信息之后在提交')
        } else {
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/userData',
                data: $('.form-inline').serialize() + minte,
                success: function (data) {
                    titleMessages('#myButton','添加成功',3000),
                        setTimeout(function () {
                            init();
                            $('#userinfo').hide();
                        }, 3000)

                }
            })
        }
    })

    //查询用户
    
})