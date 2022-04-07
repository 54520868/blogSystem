$(function () {
    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var form;
    var loading;
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading', 'form'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        form = layui.form;
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
            url: "/getUserinfo",
            dataType: "json",
            success: (data => {
                if (data.code === 404) {
                    errTip('失败', data.message)
                } else {
                    sussTip('成功', '用户数据获取成功')
                    data.data.forEach((item, index) => {
                        let { id, username, email, iphone, minte, is_state } = item
                        str += `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${username}</td>
                                        <td>${email}</td>
                                        <td>${iphone}</td>
                                        <td>${minte}</td>
                                        <td><font class="text-success state" data_is=${is_state} >正常</font></td>
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
                //获取用户状态
                $('.state').each(function (v, h) {
                    let index = h.getAttribute('data_is')
                    if (index == 1) {
                        $(h).addClass('text-error').removeClass('text-success').text('封禁');
                    }
                })

            })
        })

    }
    init()


    $('#myButtones').click(function () {
        init()
    })

    layui.use(['layer', 'form', 'area', 'element', 'code'], function () {
        var layer = layui.layer,
            form = layui.form,
            area = layui.area;

        layui.code();

        var form = layui.form;
        form.on('submit(formDemo)', function (data) {
            let datas = JSON.stringify(data.field);
            let newDatas = JSON.parse(datas)
            let { search_user } = newDatas
            let str;
            $.ajax({
                type: 'get',
                url: '/getUser',
                dataType: 'json',
                data: `search_user=${search_user}`,
                beforeSend: () => {
                    loading.Load(4, "");
                    loading.loadRemove(1300);
                },
                success: function (data) {
                    if (data.code === 404) {
                        setTimeout(function () {
                            $('#tbodys').html('')
                            errTip('失败', data.message)
                        },1500)
                    } else {
                        setTimeout(function () {
                            sussTip('成功', `查询成功,共查询到${data.length}个用户`)
                        },1500)
                        data.forEach((element, index) => {
                            let { id, username, email, iphone, minte, is_state } = element
                            str += `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${username}</td>
                                            <td>${email}</td>
                                            <td>${iphone}</td>
                                            <td>${minte}</td>
                                            <td><font class="text-success state" data_is=${is_state} >正常</font></td>
                                            <td>
                                            <div class="btn-group">
                                                <a class="btn btn-xs btn-default redact" data = ${id + 817}  href="#!" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                                <a class="btn btn-xs btn-default lookinlook" data = ${id + 817} ="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                                                <a class="btn btn-xs btn-default delData" data = ${id + 817}  href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
                                            </div>
                                            </td>
                                        </tr>`
                            $('#tbodys').html(str)
                        });
                    }
                    //获取用户状态
                    $('.state').each(function (v, h) {
                        let index = h.getAttribute('data_is')
                        if (index == 1) {
                            $(h).addClass('text-error').removeClass('text-success').text('封禁');
                        }
                    })

                }
            })
            return false;
        });
    });

    //删除
    // $('#tbodys').on('click', '.delData', function (eve) {
    //     let eveElent = eve.target.parentNode;
    //     //获取到属性的值 进行转换
    //     let excape = eveElent.getAttribute('data') - 817;
    //     eveElent.onclick = function () {
    //         $.alert({
    //             title: '删除',
    //             content: '您确定要删除此用户吗？',
    //             buttons: {
    //                 confirm: {
    //                     text: '确认',
    //                     btnClass: 'btn-primary',
    //                     action: function () {
    //                         $.ajax({
    //                             type: 'post',
    //                             url: '/deleteAvtive',
    //                             dataType: 'json',
    //                             data: `id = ${ excape } `,
    //                             success: function (data) {
    //                                 if (data.code === '404') {
    //                                     errTip('失败', data.message)
    //                                 } else {
    //                                     sussTip('成功', data.message)
    //                                 }
    //                             }
    //                         })
    //                         $.alert('删除成功!');
    //                         //删除之后初始化数据
    //                         setTimeout(function () {
    //                             init();
    //                         }, 1500)
    //                     }
    //                 },
    //                 cancel: {
    //                     text: '取消',
    //                     action: function () {
    //                     }
    //                 }
    //             }
    //         });
    //     }
    // })
    // //编辑
    // $('#tbodys').on('click', '.redact', function (ee) {

    //     let eveElent = ee.target.parentNode;
    //     //获取到属性的值 进行转换
    //     let excape = eveElent.getAttribute('data') - 817;
    //     eveElent.onclick = function () {
    //         $('#bbtn').click()
    //         $('#myModalLabel').html('编辑文章信息')
    //         $.ajax({
    //             type: 'post',
    //             url: '/getActiveOne',
    //             data: `id = ${ excape } `,
    //             dataType: 'json',
    //             success: (data => {
    //                 if (data.code === '404') {
    //                     errTip('失败', data.message)
    //                     return
    //                 } else {
    //                     sussTip('成功', data.message)
    //                     $('#recipient_username').val(data.data[0].title);
    //                     $('#recipient_email').val(data.data[0].author);
    //                     $('#recipient_iphone').val(data.data[0].content);
    //                     $('#recipient_deta').val(data.data[0].time);
    //                     $('#myButtons').click(()=>{
    //                         if ($('#recipient_username').val() == '' || $('#recipient_email').val() == '' || $('#recipient_iphone').val() == '') {
    //                             errTip('失败','编辑信息不能为空')
    //                         }else {
    //                             let datas = $('#newUserMessage').serialize()
    //                             $.ajax({
    //                                 type: 'post',
    //                                 url:`/ putData`,
    //                                 data: `id = ${ excape }& ${ datas } `,
    //                                 dataType:'json',
    //                                 success: (data => {
    //                                     if (data.code === '404') {
    //                                         errTip('失败', data.message)
    //                                         return
    //                                     } else {
    //                                         sussTip('成功', data.message)
    //                                         setTimeout(() => {
    //                                             $('#btnClose').click();
    //                                             init();
    //                                         },2100)
    //                                     }
    //                                 })
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         })
    //     }
    // })

})