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

        $('form[name=edit-form]').submit(function () {
            var web_site_title = $('input[name=web_site_title]').val();
            if (web_site_title == '') {
                errTip('失败', '请填写信息之后在进行提交')
                return false;
            }else {
                var ds = form.val('example');
                $.ajax({
                    type: 'POST',
                    url: '/updataWebConfig',
                    dataType: 'json',
                    data: ds,
                    beforeSend: () => {
                        loading.Load(4, "");
                        loading.loadRemove(1000);
                    },
                    success: (datas) => {
                        setTimeout(function () {
                            if (datas.code == 200) {
                                sussTip('成功', datas.message)
                                localStorage.setItem('webComfig',datas.data)
                                toast.question({
                                    title: '检测到网站配置更新',
                                    message: '当前配置已经更新,正在重载网站首页',
                                    position: 'topRight'
                                });
                                setTimeout(function() {
                                    top.location.href = '/index'
                                }, 2100);
                            } else {
                                errTip('失败', datas.message)
                                return
                            }
                        },800)
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


});