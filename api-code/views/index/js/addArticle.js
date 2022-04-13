$(function () {
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

    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var loading;
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading', 'tinymce', 'util', 'form', 'upload'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        var form = layui.form;
        var upload = layui.upload;
        layui.code();

        var tinymce = layui.tinymce
        var util = layui.util;

        layui.code();


        //获取所有分类
        $.ajax({
            type: 'GET',
            url: '/getClassify',
            dataType: 'json',
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
                    case 0: {
                        let newData = data.data
                        let str = '';
                        newData.forEach(element => {
                            let id = element.cl_id
                            let name = element.cl_name
                            str += `
                                    <option value="${id}">${name}</option>
                                    `
                        });
                        $('#selectpicker').html(' <option value="0">请选择你的分类</option>' + str)
                        //动态添加数据之后，重新渲染下拉框
                        form.render('select');
                    }
                        break;
                }
            }
        })

        //加载富文本编辑器
        var edit = tinymce.render({
            elem: "#edit",
            height: 400
        });



        var uploadInst = upload.render({
            elem: '#test1' //绑定元素
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
                    document.getElementById('imgs').src = result;
                    obj.resetFile(index, file, file.name); //重命名文件名，layui 2.3.0 开始新增
                });
            }
        });



        //监听提交
        form.on('submit(demo1)', function (data) {
            //判断当前编辑器的内容是否为空，是的话则提示用户
            if (edit.getContent() === '') {
                err('失败', '请输入文章内容');
                return false;
            }

            // // //判断当前是否有选择分类
            if ($('.layui-select-title>input').val() === '请选择你的分类') {
                err('失败', '请选择分类');
                return false;
            }
            // //判断封面状态
            if($('#imgs').attr('src') === '') {
                err('失败', '请选择文章封面');
                return false;
            }

            //将数据全部上传到后台
            let userComfig = JSON.parse(localStorage.getItem('userComfig'))
            $.ajax({
                type: 'POST',
                url: '/addActives',
                data: {
                    user:userComfig.username,
                    datas: data.field,
                    content: edit.getContent()
                },
                beforeSend: () => {
                    lightyear.loading('show');  // 显示
                },
                dataType: 'json',
                success: (data) => {
                    if (data.code === 200) {
                        toast.success({
                            title: '成功',
                            message: data.message,
                            position: 'topRight'
                        });
                        lightyear.loading('hide'); 
                        toast.question({
                            title: '检测到文章添加成功',
                            message: '正在重载此网页',
                            position: 'topRight'
                        });
                        setTimeout(function() {
                            top.location.href = '/index/AddTheArticle'
                        },3000)
                    } else {
                        lightyear.loading('hide');  
                        err('失败', data.message);
                    }
                }
            })
            return false;
        });
    });
    $('#newInfo').click(function () {
        $('#activeInfo').show();
    })
    $('#closeIssue').click(function () {
        $('#activeInfo').hide();
    })
})