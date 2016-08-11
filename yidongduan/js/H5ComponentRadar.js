/*
 * 用于开发雷达图组件
 */

function H5ComponentRadar(cfg) {
    return new H5ComponentRadar.fn.init(cfg);
}

H5ComponentRadar.fn = H5ComponentRadar.prototype = {
    constructor: H5ComponentRadar,
    init: function(cfg) {
        var _this = this;
        this.cfg = cfg || {};
        //创建基本图文组件容器
        this.component = new H5ComponentBase(this.cfg);
        //创建数据背景层canvas标签
        var canvasBg = document.createElement('canvas');
        //设置层级
        $(canvasBg).css('z-index', 1);
        //初始化背景层的大小
        var W = $('html').get(0).getBoundingClientRect().width;

        // if (vieWidth < 640) {
        //     vieWidth = 300;
        // } else if (vieWidth >= 640 && vieWidth < 750) {
        //     vieWidth = 640;
        // } else if (vieWidth >= 750 && vieWidth < 960) {
        //     vieWidth = 750;
        // } else {
        //     vieWidth = 960;
        // }
        this.fs = W / 30;

        var R = canvasBg.width = canvasBg.height = W;
        //添加到DOM结构
        this.component.append(canvasBg);
        //定义一些绘制数据
        var x = (R * 2 / 3) / 2;
        //获取绘图上下文环境
        var cxt = canvasBg.getContext('2d');
        var color = ['skyblue', '#fff'];

        //绘制背景初始化
        for (var i = 0; i < 10; i++) {
            cxt.fillStyle = color[i % color.length];
            this.drawBg(cxt, this.cfg.data, x - (x / 10) * i, R / 2, 13);
        }
        //绘制伞骨初始化
        this.drawLine(cxt, this.cfg.data, x, R / 2, 13, '#e0e0e0', '#000');

        //-------------------------------------------------------
        //绘制数据层
        var canvasData = document.createElement('canvas');

        canvasData.width = canvasData.height = R;

        $(canvasData).css('z-index', 2);

        this.component.append(canvasData);

        var cxtData = canvasData.getContext('2d');

        //初始化动画
        this.component.on('onLoad', function() {
            //  生长动画
            var s = 0;
            // var timerLoad = setInterval(function() {

            //     s >= 1 ? (s = 1) && clearInterval(timerLoad) : (s += 0.01);

            //     _this.drawData(s, cxtData, _this.cfg.data, x, R / 2, 30, '#f00', '#f88');

            // }, 13)
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    s += 0.01
                    _this.drawData(s, cxtData, _this.cfg.data, x, R / 2, 13, '#f00', '#f88');
                }, 500 + i * 10)
            }
        });
        this.component.on('onLeave', function() {
            //  退场动画
            var s = 1;
            // var timerLeave = setInterval(function() {

            //     s >= 0 ? (s -= 0.01) : (s = 0.01) && clearInterval(timerLeave);

            //     _this.drawData(s, cxtData, _this.cfg.data, x, R / 2, 30, '#f00', '#f88');

            // }, 13)
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    s -= 0.01
                    _this.drawData(s, cxtData, _this.cfg.data, x, R / 2, 13, '#f00', '#f88');
                }, 500 + i * 10)
            }

        });


        return this.component;
    },
    //绘制背景
    drawBg: function(cxt, data, r, center, rot) {
        cxt.beginPath();
        data.forEach(function(e, i, a) {
            var x = Math.cos(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r + center;
            var y = -Math.sin(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r + center;
            cxt.lineTo(x, y);
        });
        cxt.closePath();
        cxt.fill();
    },
    //绘制伞骨
    drawLine: function(cxt, data, r, center, rot, color, fontColor) {
        var _this = this;
        data.forEach(function(e, i, a) {
            //获得绘制坐标
            var x = Math.cos(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r + center;
            var y = -Math.sin(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r + center;

            //绘制线条
            cxt.beginPath();
            cxt.strokeStyle = color;
            cxt.linWidth = 2;
            cxt.lineTo(center, center)
            cxt.lineTo(x, y)
            cxt.stroke();

            //写入数据名称
            cxt.beginPath();
            cxt.fillStyle = fontColor;
            cxt.font = 'bold ' + _this.fs + 'px arial';;
            x < center - 10 ? cxt.textAlign = 'right' : (x > center - 10 && x < center + 10) ? cxt.textAlign = 'center' : cxt.textAlign = 'left';
            y < center ? cxt.textBaseline = 'bottom' : cxt.textBaseline = 'top';
            cxt.fillText(data[i][0], x, y);
        });
    },
    //绘制数据的线和点
    drawData: function(per, cxt, data, r, center, rot, lineColor, cirColr) {
        cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
        //绘制线
        cxt.beginPath();
        cxt.strokeStyle = lineColor;
        cxt.lineWidth = 2.5;
        data.forEach(function(e, i, a) {
            var x = Math.cos(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r * per * e[1] + center;
            var y = -Math.sin(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r * per * e[1] + center
            cxt.lineTo(x, y);
        });
        cxt.closePath();
        cxt.stroke();
        //绘制圆
        //cxt.fillStyle = cirColr;
        cxt.fillStyle = cirColr;
        data.forEach(function(e, i, a) {
            cxt.beginPath();
            var x = Math.cos(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r * per * e[1] + center;
            var y = -Math.sin(((Math.PI / 2) / a.length + 360 * i / a.length - rot) / 180 * Math.PI) * r * per * e[1] + center;
            cxt.arc(x, y, 7, 0, 2 * Math.PI);
            cxt.closePath();
            cxt.fill();
        });
    }
};

H5ComponentRadar.fn.init.prototype = H5ComponentRadar.fn;