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
    $('#newInfo').click(function () {
        $('#activeInfo').show();
    })
    $('#closeIssue').click(function () {
        $('#activeInfo').hide();
    })

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


    $('.form-horizontal').on('submit', function () {
        if ($('#active_title').val() == '' || $('#active_author').val() == '' || $('#active_content').val() == '') {
            err('失败', "请填写信息之后在进行提交")
            return false
        }

        $.ajax({
            type: 'POST',
            url: '/addActive',
            dataType: 'json',
            data: $(this).serialize(),
            success: (data) => {
                switch (data.code) {
                    case 404: {
                        toast.success({
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
                            $('#closeIssue').click();
                        }, 1500)
                    }
                        break;
                }
            }
        })
    })




})