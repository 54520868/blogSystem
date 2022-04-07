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



        $('#Logout').click(function () {
            if (confirm('是否退出登录？')) {
                toast.success({
                    title: '成功',
                    message: '退出登录成功,正在返回',
                    position: 'topCenter'
                });
                setTimeout(function () {
                    location.href = 'login.html',
                        localStorage.removeItem('token')
                }, 1500)

            }
        })
    });






})