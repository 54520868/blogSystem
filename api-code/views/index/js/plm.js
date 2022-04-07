$(function () {
    $('#item1').click(function () {
        console.log(1111);
        $('.active').css({ 'transform': 'translateX(1px)' })
        $(this).addClass('prich');
        $('#item2').removeClass('prich')

    })
    $('#item2').click(function () {
        console.log(1111);
        $('.active').css({ 'transform': 'translateX(81px)' })
        $(this).addClass('prich')
        $('#item1').removeClass('prich')
    })


    layui.use(['layer', 'form', 'area', 'element', 'code'], function() {
        var layer = layui.layer,
            form = layui.form,
            area = layui.area;

        layui.code();
        let newdate = new Date().getTime();
        $('#userH').val(`用户昵称${newdate}`)
        let user = localStorage.getItem('user')
        $('#user').val(user)
        var form = layui.form;
        form.on('submit(formDemo)', function (data) {
            let datas = JSON.stringify(data.field);
            console.log(JSON.parse(datas));
            return false;
        });
        area.render({
            elem: '#area-picker',
            change: function(res) {
                //选择结果
            }
        });
        
    });

})