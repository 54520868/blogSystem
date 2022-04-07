$(function () {
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

    function sussTip(status, mes) {
        try {
            toast.success({
                title: status,
                message: mes,
                position: 'topRight'
            });
        }
        catch (err) {
            // console.log(err);
        }
    }

    function errTip(status, mes) {

        try {
            toast.error({
                title: status,
                message: mes,
                position: 'topRight'
            });
        }
        catch (err) {
            // console.log(err);
        }
    }

    function init() {
        let str;
        $.ajax({
            type: "GET",
            url: "/gainActive",
            dataType: "json",
            success: (data => {
                if (data.code === 404) {
                    errTip('失败', data.message)
                } else {
                    sussTip('成功', '文章数据获取成功')
                    data.data.forEach((item, index) => {
                        let { id, title, author, content, time } = item
                        str += `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${title}</td>
                                        <td>${author}</td>
                                        <td>${content}</td>
                                        <td>${time}</td>
                                        <td><font class="text-success">正常</font></td>
                                        <td>
                                        <div class="btn-group">
                                            <a class="btn btn-xs btn-default redact" data = ${id + 817}  href="#!" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                            <a class="btn btn-xs btn-default lookinlook" data = ${id + 817} ="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                                            <a class="btn btn-xs btn-default delData" data = ${id + 817}  href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
                                        </div>
                                        </td>
                                    </tr>
                                `
                    });
                    $('#tbodys').html(str)
                }
            })
        })
    }
    init()


    $('#myButtones').click(function () {
        init()
    })
    //删除
    $('#tbodys').on('click', '.delData', function (eve) {
        let eveElent = eve.target.parentNode;
        //获取到属性的值 进行转换
        let excape = eveElent.getAttribute('data') - 817;
        eveElent.onclick = function () {
            $.alert({
                title: '删除',
                content: '您确定要删除此用户吗？',
                buttons: {
                    confirm: {
                        text: '确认',
                        btnClass: 'btn-primary',
                        action: function () {
                            $.ajax({
                                type: 'post',
                                url: '/deleteAvtive',
                                dataType: 'json',
                                data: `id=${excape}`,
                                success: function (data) {
                                    if (data.code === '404') {
                                        errTip('失败', data.message)
                                    } else {
                                        sussTip('成功', data.message)
                                    }
                                }
                            })
                            $.alert('删除成功!');
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
    //编辑
    $('#tbodys').on('click', '.redact', function (ee) {

        let eveElent = ee.target.parentNode;
        //获取到属性的值 进行转换
        let excape = eveElent.getAttribute('data') - 817;
        eveElent.onclick = function () {
            $('#bbtn').click()
            $('#myModalLabel').html('编辑文章信息')
            $.ajax({
                type: 'post',
                url: '/getActiveOne',
                data: `id=${excape}`,
                dataType: 'json',
                success: (data => {
                    if (data.code === '404') {
                        errTip('失败', data.message)
                        return
                    } else {
                        sussTip('成功', data.message)
                        $('#recipient_username').val(data.data[0].title);
                        $('#recipient_email').val(data.data[0].author);
                        $('#recipient_iphone').val(data.data[0].content);
                        $('#recipient_deta').val(data.data[0].time);
                        $('#myButtons').click(()=>{
                            if ($('#recipient_username').val() == '' || $('#recipient_email').val() == '' || $('#recipient_iphone').val() == '') {
                                errTip('失败','编辑信息不能为空')
                            }else {
                                let datas = $('#newUserMessage').serialize()
                                $.ajax({
                                    type: 'post',
                                    url:`/putData`,
                                    data: `id=${excape}&${datas}`,
                                    dataType:'json',
                                    success: (data => {
                                        if (data.code === '404') {
                                            errTip('失败', data.message)
                                            return
                                        } else {
                                            sussTip('成功', data.message)
                                            setTimeout(() => {
                                                $('#btnClose').click();
                                                init();
                                            },2100)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            })
        }
    })

    //查看
    // $('#tbodys').on('click','.lookinlook', function (e) {
    //     let eveElent = e.target.parentNode;
    //     //获取到属性的值 进行转换
    //     let excape = eveElent.getAttribute('data') - 817;
    //     eveElent.onclick = function () {
    //         $('#bbtn').click()
    //         $('#myModalLabel').html('查看文章')
    //     }
    // })
})