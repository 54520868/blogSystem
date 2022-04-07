$(function () {
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

    //加载弹窗组件
    var toast;
    var layer;
    var element;
    var loading;
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading', 'upload', 'form'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        var form = layui.form
        var upload = layui.upload;
        layui.code();


        function aaa() {
            return new Promise(function (resolve, reject) {
                // let bs = ;
                resolve(document.getElementById('imgs').getAttribute('src'))
            })
        }

        var uploadInst = upload.render({
            elem: '#test1' //绑定元素
            , url: '/addCars' //上传接口
            , accept: 'images' //允许上传的文件类型
            , auto: false //选择文件后不自动上传
            , bindAction: '#add'
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
            , data: {
                car_name: function () {
                    return $('#car_name').val()
                },
                car_color: function () {
                    return $('#car_color').val()
                },
                car_brand: function () {
                    return $('#selects').find('option:selected').val()
                },
                car_intro: function () {
                    return $('#car_intro').val()
                }
            } //可选项。额外的参数，如：{id: 123, abc: 'xxx'}
            , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                // console.log(obj);
                loading.Load(4, "");
                loading.loadRemove(1300);

            }
            , done: function (res) {
                //上传完毕回调
                if (res.code === 0) {
                    toast.success({
                        title: '成功',
                        message: res.msg,
                        position: 'topRight'
                    });
                    setTimeout(function () {
                        //刷新当前页面
                        window.location.reload(); 
                    },1000)
                }
            }
            , error: function () {
                //请求异常回调
            }
        });


    });



})