$(function () {
    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var form;
    var loading;
    layui.use(['toast', 'jquery', 'layer', 'code', 'element', 'loading', 'form', 'table', 'laytpl'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        form = layui.form;
        loading = layui.loading;
        element = layui.element;
        var table = layui.table;
        var laytpl = layui.laytpl;
        layui.code();

        table.render({
            elem: '#test'
            , url: '/getUserinfo'
            , cols: [[
                , {
                    field: 'id', title: '编号', fixed: 'left', templet: function (d) {
                        return d.LAY_INDEX
                    }
                }
                , { field: 'username', title: '用户名', }
                , { field: 'email', title: '邮箱', }
                , { field: 'iphone', title: '手机号', }
                , { field: 'minte', title: '用户注册时间', }
                , {
                    field: 'is_state', title: '状态', templet: function (d) {
                        var str = '';
                        if (d.is_state == 0) {
                            str = '<span style="color:green">正常</span>';
                        } else {
                            str = '<span style="color:red">禁用</span>';
                        }
                        return str;
                    }
                }
                , { fixed: 'right', title: '操作', toolbar: '#barDemo', }
            ]]
            , page: {
                limit: 10,
            },
        });

        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            //console.log(obj)
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                layer.prompt({
                    formType: 2
                    , value: data.email
                }, function (value, index) {
                    obj.update({
                        email: value
                    });
                    layer.close(index);
                });
            }
        });

        $('#myButtones').click(function () {
            table.reload('test');
        })

        //监听行工具事件
        // table.on('tool(test)', function (obj) {
        //     var data = obj.data;
        //     if (obj.event === 'del') {
        //         layer.confirm('是否删除当前文章数据？', function (index) {
        //             $.ajax({
        //                 type: 'POST',
        //                 url: '/deleteAvtive',
        //                 data: {
        //                     id: data.id
        //                 },
        //                 success: function (res) {
        //                     if (res.code == 200) {
        //                         layer.close(layer.index)
        //                         sussTip('成功', res.message);
        //                         table.reload('test');
        //                     } else {
        //                         errTip('失败', res.message);
        //                     }
        //                 }
        //             })
        //         });
        //     } else if (obj.event === 'edit') {
        //         $('#bbtn').click()
        //         //初始化分类数据
        //         let str = '';
        //         $.get('/getClassify').then(function (res) {
        //             let newData = res.data
        //             if (res.code == 0) {
        //                 newData.forEach(element => {
        //                     let id = element.cl_id
        //                     let name = element.cl_name
        //                     str += `
        //                                     <option value="${id}">${name}</option>
        //                                     `
        //                 });
        //                 $('#selectpicker').html(` <option value="${data.relationActiveSort}">${data.cl_name}</option>` + str)
        //                 //动态添加数据之后，重新渲染下拉框
        //                 form.render('select');
        //             }
        //         })

        //         $('#imgs').attr('src', `http://127.0.0.1:7100/router${data.activePhoto}`)

        //         $('#test1').click(function () {
        //             $('#file').click()
        //         })
        //         editor.txt.append(data.content);
        //         //给表单赋值
        //         form.val("editForm", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        //             "article_title": data.title,
        //             "article_author": data.author,
        //             "article_time": data.time,
        //             "article_issueUser": data.issueUser,
        //             "activeStatus": data.activeStatus
        //         });

        //         $('#myButtons').click(function () {
        //             const formData = new FormData($('#newUserMessage')[0]);
        //             let editContent = editor.txt.html()
        //             //追加富文本内容
        //             formData.append('content', editContent);
        //             //旧图
        //             formData.append('oldSrc', data.activePhoto);
        //             formData.append('id', data.id)
        //             $.ajax({
        //                 type: 'POST',
        //                 url: '/updateArtitle',
        //                 data: formData,
        //                 contentType: false,
        //                 processData: false,
        //                 dataType: 'json',
        //                 beforeSend: () => {
        //                     lightyear.loading('show');  // 显示
        //                 },
        //                 success: (data) => {
        //                     if (data.code === 200) {
        //                         setTimeout(function () {
        //                             lightyear.loading('hide');
        //                         }, 1000)
        //                         toast.success({
        //                             title: '成功',
        //                             message: data.message,
        //                             position: 'topRight'
        //                         });
        //                         $('#btnClose').click()
        //                         table.reload('test');
        //                         layer.msg('文章数据获取成功')
        //                     } else {
        //                         lightyear.loading('hide');
        //                         err('失败', data.message);
        //                     }
        //                 }
        //             })
        //         })

        //     }
        // });

        form.on('submit(formDemo)', function (data) {
            let datas = JSON.stringify(data.field);
            let newDatas = JSON.parse(datas)
            let { search_user } = newDatas
            table.reload('test', {
                where: { search_user }
            });
            return false;
        });

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
        }
    }



    // layui.use(['layer', 'form', 'area', 'element', 'code'], function () {
    //     var layer = layui.layer,
    //         form = layui.form,
    //         area = layui.area;

    //     layui.code();

    //     var form = layui.form;
    //     form.on('submit(formDemo)', function (data) {
    //         let datas = JSON.stringify(data.field);
    //         let newDatas = JSON.parse(datas)
    //         let { search_user } = newDatas
    //         let str;
    //         $.ajax({
    //             type: 'get',
    //             url: '/getUser',
    //             dataType: 'json',
    //             data: `search_user=${search_user}`,
    //             beforeSend: () => {
    //                 loading.Load(4, "");
    //                 loading.loadRemove(1300);
    //             },
    //             success: function (data) {
    //                 if (data.code === 404) {
    //                     setTimeout(function () {
    //                         $('#tbodys').html('')
    //                         errTip('失败', data.message)
    //                     }, 1500)
    //                 } else {
    //                     setTimeout(function () {
    //                         sussTip('成功', `查询成功,共查询到${data.length}个用户`)
    //                     }, 1500)
    //                     data.forEach((element, index) => {
    //                         let { id, username, email, iphone, minte, is_state } = element
    //                         str += `
    //                                     <tr>
    //                                         <td>${index + 1}</td>
    //                                         <td>${username}</td>
    //                                         <td>${email}</td>
    //                                         <td>${iphone}</td>
    //                                         <td>${minte}</td>
    //                                         <td><font class="text-success state" data_is=${is_state} >正常</font></td>
    //                                         <td>
    //                                         <div class="btn-group">
    //                                             <a class="btn btn-xs btn-default redact" data = ${id + 817}  href="#!" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
    //                                             <a class="btn btn-xs btn-default lookinlook" data = ${id + 817} ="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
    //                                             <a class="btn btn-xs btn-default delData" data = ${id + 817}  href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
    //                                         </div>
    //                                         </td>
    //                                     </tr>`
    //                         $('#tbodys').html(str)
    //                     });
    //                 }
    //                 //获取用户状态
    //                 $('.state').each(function (v, h) {
    //                     let index = h.getAttribute('data_is')
    //                     if (index == 1) {
    //                         $(h).addClass('text-error').removeClass('text-success').text('封禁');
    //                     }
    //                 })

    //             }
    //         })
    //         return false;
    //     });
    // });

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