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

    ;

    function init() {
        let str;
        $.ajax({
            type: "GET",
            url: "/getGoods",
            dataType: "json",
            success: (data => {
                if (data.code === 404) {
                    errTip('失败', data.message)
                } else {
                    sussTip('成功', '商品数据获取成功,当前所获取的商品为未删除的商品')
                    data.data.forEach((item, index) => {
                        let { id, title, price, stock, intro, is_sale, goodPhoto, add_time } = item
                        intro.substring(0, 40) + '......'
                        str += `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${title}</td>
                                    <td>${price}</td>
                                    <td>${stock}</td>
                                    <td width="35%" >${intro}</td>
                                    <td class="lookImg" >
                                    <img src="${goodPhoto}" alt="" width="88" id="oldSrc" >
                                    </td>
                                    <td>${add_time}</td>
                                    <td><font class="text-success state" data_is="${is_sale}">正常</font></td>
                                    <td>
                                    <div class="btn-group">
                                        <a class="btn btn-xs btn-default redact" data = ${id + 817}  href="#!" title="编辑" data-toggle="tooltip"><i class="mdi mdi-pencil"></i></a>
                                        <a class="btn btn-xs btn-default lookinlook" data = ${id + 817} ="#!" title="查看" data-toggle="tooltip"><i class="mdi mdi-eye"></i></a>
                                        <a class="btn btn-xs btn-default delData" data = ${id + 817}  href="#!" title="删除" data-toggle="tooltip"><i class="mdi mdi-window-close"></i></a>
                                    </div>
                                    </td>
                             </tr>
                                `
                    });
                    $('#tbodys').html(str)
                    //获取商品状态
                    $('.state').each(function (v, h) {
                        let index = h.getAttribute('data_is')
                        if (index == 1) {
                            $(h).addClass('text-error').removeClass('text-success').text('下架');
                        }
                    })
                }
            })
        })
    }
    init()


    $('#myButtones').click(function () {
        init()
    })
    // //删除
    $('#tbodys').on('click', '.delData', function (eve) {
        let eveElent = eve.target.parentNode;
        //获取到属性的值 进行转换
        let excape = eveElent.getAttribute('data') - 817;
        eveElent.onclick = function () {
            $.alert({
                title: '删除',
                content: '您确定要删除此商品吗？',
                buttons: {
                    confirm: {
                        text: '确认',
                        btnClass: 'btn-primary',
                        action: function () {
                            $.ajax({
                                type: 'post',
                                url: '/detGoods',
                                dataType: 'json',
                                data: `id=${excape}`,
                                success: function (data) {
                                    if (data.code === '404') {
                                        errTip('失败', data.message)
                                    } else {
                                        sussTip('成功', data.message)
                                    }
                                }
                            })
                            $.alert('删除成功!');
                            //删除之后初始化数据
                            setTimeout(function () {
                                init();
                            }, 1500)
                        }
                    },
                    cancel: {
                        text: '取消',
                        action: function () {
                        }
                    }
                }
            });
        }
    })

    // //编辑
    $('#tbodys').on('click', '.redact', function (ee) {
        let eveElent = ee.target.parentNode;
        //获取到属性的值 进行转换
        let excape = eveElent.getAttribute('data') - 817;
        eveElent.onclick = function () {
            $('#bbtn').click()
            let oldSrc = document.getElementById('oldSrc').src;
            $.ajax({
                type: 'post',
                url: '/getCurveGood',
                data: `id=${excape}`,
                dataType: 'json',
                success: (data => {
                    let result = data.result;
                    let [results] = result;
                    if (data.code === '404') {
                        errTip('失败', data.message)
                        return
                    } else {
                        sussTip('成功', data.message)
                        $('#goods_name').val(results.title);
                        $('#goods_price').val(results.price);
                        $('#goods_stock').val(results.stock);
                        $('#goods_intro').val(results.intro);
                        $('#goods_date').val(results.add_time);
                        document.getElementById('goods_img').src = results.goodPhoto;
                        $('#myButtons').click(() => {
                            if ($('#goods_name').val() == '' || $('#goods_price').val() == '' || $('#goods_stock').val() == '' || $('#goods_intro').val() == '') {
                                errTip('失败', '编辑信息不能为空')
                            } else {
                                let datas = $('#newUserMessage').serialize()
                                let goods_imgSrc = document.getElementById('goods_img').src
                                if(oldSrc == goods_imgSrc) {
                                    console.log('相同');
                                }else {
                                    console.log('不同');
                                }
                                $.ajax({
                                    type: 'post',
                                    url: `/putGoods`,
                                    data: `id=${excape}&${datas}`,
                                    dataType: 'json',
                                    success: (data => {
                                        if (data.code === '404') {
                                            errTip('失败', data.message)
                                            return
                                        } else {
                                            sussTip('成功', data.message)
                                            setTimeout(() => {
                                                $('#btnClose').click();
                                                init();
                                            }, 2100)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            })
        }
    })

    //查看商品图片
    $('#tbodys').on('click', '.lookImg', function (e) {
        let eveElent = e.target;
        let imgUrl = eveElent.src
        $('#big').click();
        document.getElementById('lookBig').src = imgUrl
    })
})