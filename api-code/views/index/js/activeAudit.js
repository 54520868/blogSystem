$(function () {
    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var form;
    var loading;
    layui.use(['toast', 'jquery', 'layer', 'code', 'element', 'loading', 'tinymce', 'util', 'form', 'upload'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        form = layui.form;
        loading = layui.loading;
        element = layui.element;
        layui.code();
        var tinymce = layui.tinymce

        var table = layui.table;
        var laytpl = layui.laytpl;
        layui.code();

        var thisFile = function upPhoto(thisFile) {
            const file = thisFile.files[0]
            console.log(file);
            return file
        }

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
                        var str = `<div>  <img src="http://127.0.0.1:7100/router${d.activePhoto}" alt="" width="88" id="oldSrc" > </div>`;
                        return str;
                        // var str = ` <a class="example-image-link" href="http://127.0.0.1:7100/router${d.activePhoto}" data-lightbox="example-set" data-title="Click the right half of the image to move forward.">
                        //                 <img class="example-image" src="http://127.0.0.1:7100/router${d.activePhoto}" alt="" width='60%' />
                        //             </a>`
                        // return str;
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


        var E = window.wangEditor;
        const editor = new E(document.getElementById('edit'))
        editor.create()

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
                //初始化分类数据
                let str = '';
                $.get('/getClassify').then(function (res) {
                    let newData = res.data
                    if (res.code == 0) {
                        newData.forEach(element => {
                            let id = element.cl_id
                            let name = element.cl_name
                            str += `
                                    <option value="${id}">${name}</option>
                                    `
                        });
                        $('#selectpicker').html(` <option value="${data.relationActiveSort}">${data.cl_name}</option>` + str)
                        //动态添加数据之后，重新渲染下拉框
                        form.render('select');
                    }
                })

                $('#imgs').attr('src', `http://127.0.0.1:7100/router${data.activePhoto}`)

                $('#test1').click(function () {
                    $('#file').click()
                })
                editor.txt.append(data.content);
                //给表单赋值
                form.val("editForm", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    "article_title": data.title,
                    "article_author": data.author,
                    "article_time": data.time,
                    "article_issueUser": data.issueUser,
                    "activeStatus": data.activeStatus
                });

                $('#myButtons').click(function () {
                    const formData = new FormData($('#newUserMessage')[0]);
                    let editContent = editor.txt.html()
                    //追加富文本内容
                    formData.append('content', editContent);
                    //旧图
                    formData.append('oldSrc', data.activePhoto);
                    formData.append('id', data.id)
                    $.ajax({
                        type: 'POST',
                        url: '/updateArtitle',
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: 'json',
                        beforeSend: () => {
                            lightyear.loading('show');  // 显示
                        },
                        success: (data) => {
                            if (data.code === 200) {
                                setTimeout(function () {
                                    lightyear.loading('hide');
                                },1000)
                                toast.success({
                                    title: '成功',
                                    message: data.message,
                                    position: 'topRight'
                                });
                                $('#btnClose').click()
                                table.reload('test');
                                layer.msg('文章数据获取成功')
                            } else {
                                lightyear.loading('hide');
                                err('失败', data.message);
                            }
                        }
                    })
                })

            }
        });

        form.on('submit(formDemo)', function (data) {
            let datas = JSON.stringify(data.field);
            let newDatas = JSON.parse(datas)
            let { search_article_title } = newDatas
            table.reload('test',{
                where:{search_article_title}
            });
            return false;
        });

    });


})