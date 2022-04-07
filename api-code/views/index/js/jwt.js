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

        //校验权限
        let tok = localStorage.getItem('token');
        function user() {
            $.ajax({
                type: 'get',
                url: '/getInfo',
                data: `tok=${tok}`,
                dataType: 'json',
                success: function (data) {
                    if (data.code === 401) {
                        toast.error({
                            title: '登录失败',
                            message: data.message,
                            position: 'topCenter'
                        });
                        setTimeout(function () {
                            location.href = '/login.html'
                        }, 2000)
                        return
                    } else {
                        let { user } = data;
                        localStorage.setItem('user', user)
                        let users = localStorage.getItem('user')
                        toast.success({
                            title: '登录成功',
                            message: `欢迎您回来,${users}`,
                            position: 'topCenter'
                        });
                    }
                },
            })
        }
        user()
    })
})