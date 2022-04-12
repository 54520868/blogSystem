$(function () {
    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var loading;
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading', 'table'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        table = layui.table;
        layui.code();
    });

    function err(status, mes) {
        try {
            toast.error({
                title: status,
                message: mes,
                position: 'topRight'
            });
        }
        catch (err) {
            console.log(err);
        }
    }


    $('#myButtones').click(function () {
        $('#bbtn').click()

    })


    $('#myButtons').on('click', function () {
        if ($('#cl_name').val() == '' || $('#cl_Notes').val() == '') {
            err('失败', "请填写信息之后在进行提交")
            return
        }

        $.ajax({
            type: 'POST',
            url: '/addClassify',
            dataType: 'json',
            data: $('#newUserMessage').serialize(),
            success: (data) => {
                switch (data.code) {
                    case 404: {
                        toast.error({
                            title: '失败',
                            message: data.message,
                            position: 'topRight'
                        });
                    }
                        break;
                    case 401: {
                        toast.error({
                            title: '失败',
                            message: data.message,
                            position: 'topRight'
                        });
                    }
                        break;
                    case 200: {
                        toast.success({
                            title: '成功',
                            message: data.message,
                            position: 'topRight'
                        });
                        setTimeout(() => {
                            $('#btnClose').click();
                            //重新加载数据表格
                            table.reload('test', {
                                url: '/getAllClassify'
                                , where: {} //设定异步数据接口的额外参数
                            });
                        }, 1000
                        )
                    }
                        break;
                }
            }
        })

    })




})