/*
 *  散点图组件对象
 */

function H5ComponentPoint(cfg) {
    return H5ComponentPoint.fn.init(cfg);
}

H5ComponentPoint.fn = H5ComponentPoint.prototype = {
    construtor: H5ComponentPoint,
    init: function(cfg) {
        var component = H5ComponentBase(cfg);
        //由于cfg中的data的第一项是基准数据，所以对其进行初始化
        var base = cfg.data[0][1];
        $.each(cfg.data, function(index, item) {
                var point = $('<div class="point">');

                var subname = $('<div class="subname">' + item[0] + '</div>');
                var ratio = $('<div class="ratio">' + (item[1] * 100) + '%</div>');

                subname.append(ratio);
                point.append(subname);

                var per = item[1] / base * 100 + '%';

                point.width(per).height(per);

                var fs = item[1] / base;

                point.css('fontSize', 1.4 * fs + 'rem');

                if (item[2]) {
                    point.css('background-color', item[2]);
                }
                if (item[3] !== undefined && item[4] !== undefined) {
                    //point.css('left', item[3]).css('top', item[4]);
                    //暂存元素的left，top
                    point.data('left', item[3]).data('top', item[4]);
                }
                //设置层级让靠后的数据层级最低,其实只需要让第一个层级最高即可
                //默认让所有元素居中
                point.css({
                    zIndex: 100 - index,
                    left: 0,
                    top: 0,
                    transition: 'all 1s ' + index * .5 + 's'
                })
                component.append(point);
            })
            //给每个散点图添加onLoad和onLeave事件
        component.on('onLoad', function() {
            //console.log($(this))
            $(this).find('.point').each(function(index, el) {
                //console.log($(this).data())
                $(this).css('left', $(this).data().left).css('top', $(this).data().top)
            });
        });
        component.on('onLeave', function() {
            $(this).find('.point').css('left', 0).css('top', 0);
        });

        component.find('.point').on('touchstart', function() {
            component.find('.point').removeClass('point_focus');
            $(this).addClass('point_focus');
            return false;
        }).eq(0).addClass('point_focus');

        return component;
    }
};

H5ComponentPoint.fn.init.prototype = H5ComponentPoint.fn;