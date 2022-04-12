$(function () {
    $('#item1').click(function () {
        $('.active').css({ 'transform': 'translateX(1px)' })
        $(this).addClass('prich');
        $('#item2').removeClass('prich')

    })
    $('#item2').click(function () {
        $('.active').css({ 'transform': 'translateX(81px)' })
        $(this).addClass('prich')
        $('#item1').removeClass('prich')
    })

    if ($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip({
            "container": 'body',
        });
    }


    layui.use(['toast', 'area', 'jquery', 'layer', 'code', 'element', 'loading', 'tinymce', 'util', 'form', 'upload'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        var form = layui.form;
        var upload = layui.upload;
        var tinymce = layui.tinymce
        var util = layui.util;
        var area = layui.area;

        layui.code();

        let thisUser = JSON.parse(localStorage.getItem('userComfig'))
        thisUser.nickname ? $('#nikou').html(thisUser.nickname) : $('#nikou').html(thisUser.username)
        !thisUser.introduction ? $('#instor').html('这家伙很懒，什么都没有写...') : $('#instor').html(thisUser.introduction)
        //表单重新赋值
        form.val('example', {
            'email': thisUser.userEmail,
            "iphone": thisUser.userIPhone,
            'nickname': thisUser.nickname ? thisUser.nickname : thisUser.username,
            'sex': thisUser.sex,
            'names': thisUser.username,
            'about': thisUser.introduction ? thisUser.introduction : ''
        })

        var uploadInst = upload.render({
            elem: '#thisPhoto' //绑定元素
            , url: '/newPhoto' //上传接口
            , accept: 'images' //允许上传的文件类型
            , choose: function (obj) {
                //将每次选择的文件追加到文件队列
                var files = obj.pushFile();

                //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function (index, file, result) {
                    // console.log(index); //得到文件索引
                    // console.log(file); //得到文件对象
                    // console.log(result); //得到文件base64编码，比如图片
                    document.getElementById('thisImg').src = result;
                    obj.resetFile(index, file, file.name); //重命名文件名，layui 2.3.0 开始新增
                });
            }
            , done: function (res) {
                if (res.code == 200) {
                    $.ajax({
                        type: 'POST',
                        url: '/updateUserPhoto',
                        data: {
                            photo: res.url,
                            id: thisUser.id
                        },
                        success: function (data) {
                            if (data.code == 200) {
                                layer.msg('头像更新成功');
                                //载入用户配置信息
                                let userComfig = Cookies.get('userThisComfig')
                                localStorage.setItem('userComfig', userComfig)
                                setTimeout(function () {
                                    top.location.href = '/index'
                                }, 2000)
                            } else {
                                layer.msg('头像更新失败');
                            }
                        }
                    })
                } else {
                    layer.msg(res.message);
                }
            }
        });


        let defaultSrc = `images/aaa.jpg`
        let src = `http://127.0.0.1:7100/router${thisUser.headPhoto}`

        function IfUserPhoto(On, src, defaultSrc) {
            if (On === 1) {
                $('#thisImg').attr('src', src)
            } else {
                $('#thisImg').attr('src', defaultSrc)
            }
        }

        //用户默认头像像
        thisUser.headPhoto ? IfUserPhoto(1, src, defaultSrc) : IfUserPhoto(0, src, defaultSrc)


        form.on('submit(formDemo)', function (data) {
            var datas = form.val('example');
            $.ajax({
                type: 'POST',
                url: '/updateUserinfo',
                data: {
                    id: thisUser.id,
                    datas
                },
                success: function (data) {
                    if (data.code == 404) {
                        layer.msg(data.message);
                    } else {
                        layer.msg(data.message);
                        //载入用户配置信息
                        $.ajax({
                            type: 'POST',
                            url: '/getInfo',
                            data: {
                                id: thisUser.id
                            },
                            success: function (data) {
                                if (data.code == 200) {
                                    let userComfig = Cookies.get('userThisComfig')
                                    localStorage.setItem('userComfig', userComfig)
                                    setTimeout(function () {
                                        location.href = '/index/pim'
                                    }, 2000)
                                } else {
                                    layer.msg(data.message);
                                }
                            }
                        })

                    }
                }


            });

            area.render({
                elem: '#area-picker',
                change: function (res) {
                    //选择结果
                }
            });
            return false;
        });


    })
})