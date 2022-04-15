$(function () {
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
    //加载弹窗组件
    var toast;
    var layer;
    var element;
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

        table.render({
            elem: '#test'
            , url: '/getAllActivesPass'
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

    })
})