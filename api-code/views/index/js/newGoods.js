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

    let file = document.getElementById('file');
    let status = false
    $('#putImg').click(function () {
        $('#file').click();
        //监听file的上传状态
        $('#file').on('change', function () {
            let files = file.files[0]
            let formdata = new FormData();
            formdata.append('file', files)
            $('#putImg').html('上传成功')
            let imgs = document.getElementById('imgs')
            $.ajax({
                type: 'post',
                url: '/uploadImg',
                // 告诉jQuery不要去处理发送的数据，用于对data参数进行序列化处理 这里必须false
                processData: false,
                // 告诉jQuery不要去设置Content-Type请求头
                contentType: false, //必须
                data: formdata,
                dataType: 'json',
                success: (data => {
                    status = true
                    imgs.src = `http://localhost:7100/router${data.newUrl}`
                }),
    
            })
        })
    })


    $('.form-horizontal').on('submit', function () {
        if ($('#goods_name').val() == '' || $('#goods_price').val() == '' || $('#goods_stock').val() == ''  || $('#goods_price').val() == '') {
            err('失败', "请填写信息之后在进行提交")
            return false
        }else if(!status){
            err('失败', "请上传图片")
            return false
        }
        let imgval = $('#imgs').attr('src')
        let forms = $('.form-horizontal').serialize()
        $.ajax({
            type: 'POST',
            url: '/newGoods',
            dataType: 'json',
            data: `imgval=${imgval}&${forms}`,
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
                        }, 2000)
                    }
                        break;
                }
            }
        })
    })

   


})