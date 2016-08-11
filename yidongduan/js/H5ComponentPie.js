/*
	饼图组件开发
    完美自适应
    开发时间：2016.8.3
*/

function H5ComponentPie(cfg) {
    return new H5ComponentPie.fn.init(cfg);
}

H5ComponentPie.fn = H5ComponentPie.prototype = {
    constructor: H5ComponentPie,
    init: function(cfg) {
        this.cfg = cfg || {};
        this.cfg.type = this.cfg.type || 'pie';

        var _this = this;

        this.component = H5ComponentBase(this.cfg);

        //初始化背景层的大小
        var W = $('html').get(0).getBoundingClientRect().width;

        this.w = W - 50;
        this.r = (this.w / 2) * 2 / 3.5;
        this.fs = this.w/32;
        this.fd = this.w/36;
        this.x = this.w/28;
        this.y = this.w/32;

        //绘制背景图层
        var canvasBg = document.createElement('canvas');
        canvasBg.width = canvasBg.height = this.w;
        this.component.append(canvasBg);
        var cxtBg = canvasBg.getContext('2d');

        this.drawBg(cxtBg, this.w, this.r);

        //绘制数据层
        var canvasData = document.createElement('canvas');
        canvasData.width = canvasData.height = this.w;
        this.component.append(canvasData);
        var cxtData = canvasData.getContext('2d');
        $(canvasData).css('opacity',0);

        this.drawData(cxtData, this.w, this.r);

        //动画层
        var canvasMast = document.createElement('canvas');
        canvasMast.width = canvasMast.height = this.w;
        this.component.append(canvasMast);
        var cxtMast = canvasMast.getContext('2d');

        this.drawMast(cxtMast, this.w, this.r, 0);

        //动画
        this.component.on('onLoad', function() {
            var x = 0;
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    x += 0.01;
                    _this.drawMast(cxtMast, _this.w, _this.r, x);
                    $(canvasData).css('opacity',x*x);
                }, 300 + i * 15);
            }
        });
        this.component.on('onLeave', function() {
            var x = 1;
            for (var i = 0; i < 100; i++) {
                setTimeout(function() {
                    x -= 0.01;
                    _this.drawMast(cxtMast, _this.w, _this.r, x);
                    $(canvasData).css('opacity',x*x);
                }, 300 + i * 15);
            }
        });

        return this.component;
    },
    drawBg: function(cxt, w, r) {
        cxt.beginPath();
        cxt.fillStyle = 'rgba(244,225,244,0.2)';
        cxt.moveTo(w / 2, w / 2);
        cxt.arc(w / 2, w / 2, r, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI);
        cxt.fill();
    },
    drawData: function(cxt, w, r) {
        var _this = this;
        var start = 1.5 * Math.PI;
        //绘制数据块
        this.cfg.data.forEach(function(e, i) {
            var end = start + 2 * Math.PI * _this.cfg.data[i][1];
            cxt.beginPath();
            cxt.fillStyle = _this.cfg.data[i][2];
            cxt.moveTo(w / 2, w / 2);
            cxt.arc(w / 2, w / 2, r, start, end);
            cxt.fill();
            start = end;
        });
        //绘制说明线
        var dataTemp = 0;
        this.cfg.data.forEach(function(e, i) {
            var angle = 2 * Math.PI * (dataTemp += e[1]) - Math.PI / 2 - 2 * Math.PI * e[1] / 2;
            var x = w / 2 + r * Math.cos(angle);
            var y = w / 2 + r * Math.sin(angle);
            cxt.beginPath();
            cxt.lineWidth = 4;
            cxt.strokeStyle = cxt.fillStyle = e[2];
            cxt.moveTo(x, y);
            x < w / 2 ? x -= _this.x : x += _this.x;
            y < w / 2 ? y -= _this.x : y += _this.x;
            cxt.lineTo(x, y);
            x < w / 2 ? x -= _this.x : x += _this.x;
            cxt.lineTo(x, y);
            cxt.font = 'normal '+_this.fs+'px Arial';
            cxt.textAlign = 'center';
            cxt.textBaseline = 'bottom'
            x < w / 2 ? x -= _this.y : x += _this.y;
            cxt.fillText(e[0], x, y - 4);
            cxt.textBaseline = 'top';
            cxt.font = 'normal '+_this.fd+'px Arial';
            cxt.fillText((e[1] * 100 + '%'), x, y + 4);
            cxt.stroke();
        });
    },
    drawMast: function(cxt, w, r, per) {
        cxt.clearRect(0, 0, w, w);
        cxt.beginPath();
        cxt.fillStyle = '#FFD21F';
        cxt.moveTo(w / 2, w / 2);
        if (per <= 0) {
            cxt.arc(w / 2, w / 2, r, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI);
        } else {
            cxt.arc(w / 2, w / 2, r, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * per, true);
        }
        cxt.fill();
    }
};

H5ComponentPie.fn.init.prototype = H5ComponentPie.fn;
