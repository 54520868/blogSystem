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

        //进来即获取数据
        function init() {
            //初始化后台配置
            $.ajax({
                type: 'GET',
                url: '/getWebConfig',
                dataType: 'json',
                success: (datas) => {
                    if (datas.code == 200) {
                        let item = datas.data[0]
                        $('#demo1').attr('src', `http://127.0.0.1:7100/router${item.logoImg}`)
                        $('#demo1').attr('data-src', item.logoImg)

                        //获取开关的状态并 转化为布尔值
                        let a = item.openStatus
                        var flag = a === "false" ? false : true;
                        //给表单重新赋值
                        form.val('example', {
                            'web_site_title': item.webTiltle
                            , "open": flag
                        });
                        sussTip('成功', datas.message)
                    } else {
                        errTip('失败', datas.message)
                        return
                    }
                }
            })
        }

        //初始化
        init()

        $('#test1').click(function () {
            $('#file').click()
        })

        $('#aev').click(function () {
            let formData = new FormData($('.layui-form')[0]);
            var web_site_title = $('input[name=web_site_title]').val();
            let oldWebPhoto = $('#demo1').attr('data-src')
            formData.append('oldWebPhoto', oldWebPhoto)
            if (web_site_title == '') {
                errTip('失败', '请填写信息之后在进行提交')
                return false;
            } else {
                var ds = form.val('example');
                console.log(ds);
                $.ajax({
                    type: 'POST',
                    url: '/updataWebConfig',
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    processData: false,
                    beforeSend: () => {
                        lightyear.loading('show');  // 显示
                    },
                    success: (datas) => {
                        console.log(datas);
                        if (datas.code == 200) {
                            sussTip('成功', datas.message)
                            toast.question({
                                title: '检测到网站配置更新',
                                message: '当前配置已经更新,正在重载当前页',
                                position: 'topRight'
                            });
                            lightyear.loading('hide');  // 显示
                            setTimeout(function () {
                                top.location.href = '/index'
                            }, 2100);
                        } else {
                            lightyear.loading('hide');  // 显示
                            errTip('失败', datas.message)
                            return
                        }
                    }
                })
            }
            return true;
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


});