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
    layui.use(['toast', 'toast', 'jquery', 'layer', 'code', 'element', 'loading','tinymce','util'], function () {
        toast = layui.toast;
        layer = layui.layer;
        var $ = layui.jquery;
        loading = layui.loading;
        element = layui.element;
        layui.code();

        var tinymce = layui.tinymce
        var util = layui.util;
        
        layui.code();

        console.log( $('#sel'));

        //获取所有分类
        $.ajax({
            type: 'GET',
            url: '/getAllClassify',
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
                        let str2 = '';
                        newData.forEach(element => {
                            let id = element.cl_id
                            let name = element.cl_name
                            str += `
                                    <option value="${id}">${name}</option>
                                    `
                        });
                        $('.selectpicker').html(' <option value="0">请选择你的分类</option>' + str)
                    }
                        break;
                }
            }
        })

        var edit = tinymce.render({
            elem: "#edit",
            height: 400
        });

        util.event('lay-event', {
            getContent: function() {
                console.log(edit.getContent())
                layer.msg("展开控制台查看")
            }
        });

        $('.selectpicker').change(function () {
            console.log($(this).val())
        })

    });
    $('#newInfo').click(function () {
        $('#activeInfo').show();
    })
    $('#closeIssue').click(function () {
        $('#activeInfo').hide();
    })




    // $('.form-horizontal').on('submit', function () {
    //     if ($('#active_title').val() == '' || $('#active_author').val() == '' || $('#active_content').val() == '') {
    //         err('失败', "请填写信息之后在进行提交")
    //         return false
    //     }

    //     $.ajax({
    //         type: 'POST',
    //         url: '/addActive',
    //         dataType: 'json',
    //         data: $(this).serialize(),
    //         success: (data) => {
    //             switch (data.code) {
    //                 case 404: {
    //                     toast.success({
    //                         title: '失败',
    //                         message: data.message,
    //                         position: 'topRight'
    //                     });
    //                 }
    //                     break;
    //                 case 200: {
    //                     toast.success({
    //                         title: '成功',
    //                         message: data.message,
    //                         position: 'topRight'
    //                     });
    //                     setTimeout(() => {
    //                         $('#closeIssue').click();
    //                     }, 1500)
    //                 }
    //                     break;
    //             }
    //         }
    //     })
    // })




})