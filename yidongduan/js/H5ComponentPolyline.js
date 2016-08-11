/*
 * 折线图组件开发
 * 自适应部分待优化
 * 开发时间：2016.7.28
 */

function H5ComponentPolyline(cfg) {
    return H5ComponentPolyline.fn.init(cfg);
}

H5ComponentPolyline.fn = H5ComponentPolyline.prototype = {
    constructor: H5ComponentPolyline,
    init: function(cfg) {
        this.cfg = cfg || {};
        this.component = new H5ComponentBase(cfg);

        //初始化背景层的大小
        var W,H, X = $('html').get(0).getBoundingClientRect().width;

        W = X;
        H = W/2;

        this.fs = W/30;
        this.fd = W/25;
        this.step = 10;

        //绘制背景层
        var canvasBg = document.createElement('canvas');

        canvasBg.width = W;
        canvasBg.height = H;

        this.component.append(canvasBg);

        var cxtBg = canvasBg.getContext('2d');

        this.drawBg(cxtBg, this.cfg.data, W, H);

        //绘制数据层
        var canvasData = document.createElement('canvas');

        canvasData.width = W;
        canvasData.height = H;

        this.component.append(canvasData);

        var cxtData = canvasData.getContext('2d');

        //初始化动画
        var _this = this;
        this.component.on('onLoad', function() {
            //  饼图生长动画
            var s = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    s += 0.01;
                    _this.drawData(s, cxtData, _this.cfg.data, W, H);
                }, 500 + 10 * i)
            }
        });
        this.component.on('onLeave', function() {
            //  饼图退场动画
            var s = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    s -= 0.01;
                    _this.drawData(s, cxtData, _this.cfg.data, W, H);
                }, 500 + 10 * i)
            }

        });

        return this.component;
    },
    drawBg: function(cxt, data, W, H) {
    	var _this = this;

        cxt.strokeStyle = '#000';

        //绘制背景表格横线
        for (var i = 0; i < this.step + 1; i++) {
            (i == 0) || (i == this.step) ? (cxt.lineWidth = 3) : (cxt.lineWidth = 2);
            cxt.beginPath();
            cxt.lineTo(W*0.1, H*0.1 + H*0.8/this.step*i);
            cxt.lineTo(W*0.9, H*0.1 + H*0.8/this.step*i);
            cxt.stroke();
        }

        //绘制背景表格竖线

        cxt.lineWidth = 2;
        cxt.linCap = 'square'

        data.forEach(function(e, i, a) {
            cxt.beginPath();
            cxt.lineTo(W*0.1 + (W*0.8/(a.length - 1))*i, H*0.1);
            cxt.lineTo(W*0.1 + (W*0.8/(a.length - 1))*i, H*0.9);
            cxt.stroke();
        });

        data.forEach(function(e, i, a) {
            var x = W*0.1 + (W*0.8/(a.length - 1))*i;
            var y = H*0.9;
            //绘制文字
            cxt.beginPath();
            cxt.fillStyle = '#1D1D1D';
            cxt.font = 'normal '+_this.fs+'px Arial';;
            cxt.textAlign = 'center'
            cxt.textBaseline = 'top'
            cxt.fillText(e[0], x, y + H*0.02);
            cxt.fill();
        });
    },
    drawData: function(per, cxt, data, W, H) {
    	var _this = this;
        cxt.clearRect(0, 0, W, H);
        //绘制点
        cxt.fillStyle = '#f88';
        data.forEach(function(e, i, a) {
            var x = W*0.1 + (W*0.8/(a.length - 1))*i;;
            var y = H*0.1 + H*0.8*(1 - e[1] * per);

            cxt.beginPath();
            cxt.arc(x, y, 5, 0, 2 * Math.PI);
            cxt.fill();
        });
        //绘制文字
        data.forEach(function(e, i, a) {
            var x = W*0.1 + (W*0.8/(a.length - 1))*i;
            var y = H*0.1 + H*0.8*(1 - e[1] * per);
            cxt.beginPath();
            cxt.fillStyle = 'rgba(199,83,255,' + per + ')';
            cxt.font = 'normal ' + _this.fd * per + 'px Arial';;
            cxt.textAlign = 'center'
            cxt.textBaseline = 'bottom'
            cxt.fillText((e[1] * 100 + '%'), x-2, y-4);
            cxt.fill();
        });

        //绘制线
        cxt.beginPath();
        cxt.strokeStyle = '#f88';
        cxt.linWidth = 1;

        data.forEach(function(e, i, a) {
            var x = W*0.1 + (W*0.8/(a.length - 1))*i;
            var y = H*0.1 + H*0.8*(1 - e[1] * per);
            cxt.lineTo(x, y);
        });

        cxt.stroke();

        //填充阴影
        cxt.fillStyle = 'rgba(252,122,122,.2)';
        cxt.lineTo(W*0.9, H*0.9);
        cxt.lineTo(W*0.1, H*0.9);

        cxt.closePath();
        cxt.fill();
    }
};

H5ComponentPolyline.fn.init.prototype = H5ComponentPolyline.fn;
