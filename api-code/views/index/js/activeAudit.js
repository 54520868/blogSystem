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


        table.render({
            elem: '#test'
            , url: '/getAllActives'
            , cols: [[
                , {
                    field: 'id', title: '编号', fixed: 'left', templet: function (d) {
                        return d.LAY_INDEX
                    }
                }
                , { field: 'title', title: '文章标题', }
                , { field: 'author', title: '文章作者', }
                , {
                    field: '', title: '文章详情', templet: function (d) {
                        var str = `<div> <button  data-keys='${d.id}' class="btn btn-xs btn-primary" style='font-size:12px!important' >查看文章详情</button>  </div>`;
                        return str;
                    }
                }
                , {
                    field: 'activePhoto', title: '文章封面', templet: function (d) {
                        var str = `<div> <img src="http://127.0.0.1:7100/router${d.activePhoto}" alt="" width="88" id="oldSrc" > </div>`;
                        return str;
                    }
                }
                , { field: 'time', title: '发布文章时间', }
                , { field: 'cl_name', title: '文章所属的分类', }
                , { field: 'issueUser', title: '文章的发布用户', }
                , {
                    field: 'activeStatus', title: '当前文章状态', templet: function (d) {
                        var str = '';
                        if (d.activeStatus == 0) {
                            str = '<span style="color:red">审核失败</span>';
                        } else if (d.activeStatus == 1) {
                            str = '<span style="color:green">审核成功</span>';
                        } else {
                            str = '<span style="color:#33cabb">待审核</span>';
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
        $('#myButtones').click(function () {
            table.reload('test');
            layer.msg('更新文章数据成功')
        })


        //监听行工具事件
        table.on('tool(test)', function (obj) {
            var data = obj.data;
            if (obj.event === 'del') {
                layer.confirm('是否删除当前文章数据？', function (index) {
                    $.ajax({
                        type: 'POST',
                        url: '/deleteAvtive',
                        data: {
                            id: data.id
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                layer.close(layer.index)
                                sussTip('成功', res.message);
                                table.reload('test');
                            } else {
                                errTip('失败', res.message);
                            }
                        }
                    })
                });
            } else if (obj.event === 'edit') {
                $('#bbtn').click()
            }
        });

    });





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
                        }, 1500)
                    } else {
                        setTimeout(function () {
                            sussTip('成功', `查询成功,共查询到${data.length}个用户`)
                        }, 1500)
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

})