/**
 * Created by ws on 2016/7/28.
 */
/*
 * ���ã�
 *
 * 	mTween(obj, {left:10,top:20,opacity:0.8}, duration, fx, callback)
 *
 * �ڶ����������ü�ֵ�Ե���ʽ��ֵû�е�λ��opacity��ֵΪ0-1
 *
 */


function mTween(obj, attrs, duration, fx, callback) {

    clearInterval(obj.timer);

    var startTime = new Date().getTime();
    //var b = parseFloat(getComputedStyle(obj)[attr]);
    //var c = target - b;

    //��ΪҪ�˶�������ԣ����Ҷ�����Ե���ʼ�ͽ�����ֵ����һ��������b�ĺ�c��ֵ�Ͳ��ܹ��ã�����Ҫ�������Ե����ԵĲ�ͬ���ֱ�ȥ���b��c��ֵ��ͬʱ���ֵҲҪ�������涨ʱѭ����ͬ���ԵĹ����У��ܷ���ľ����ҵ�
    //���ԣ����ǿ��Զ���һ������Ȼ����ݲ�ͬ�����Դ�Ų�ͬ��b��c
    var j = {};
    //����attrs��Ȼ����������ֵ�����ɲ�ͬ��b��c
    for (var attr in attrs) {
        j[attr] = {}
        j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        j[attr].c = attrs[attr] - j[attr].b;
    }

    //console.dir(j);
    //
    //return;


    var d = duration;

    obj.timer = setInterval(function() {

        var t = new Date().getTime() - startTime;

        if ( t >= d ) {
            t = d;
        }

        //���ݴ�����������ԣ�ͨ�������ķ�ʽ������Ҫ�˶������Զ�����һ��
        for (var attr in attrs) {
            var b = j[attr].b;
            var c = j[attr].c;
            var value = Tween[fx](t, b, c, d);

            if ( attr == 'opacity' ) {
                obj.style[attr] = value;
            } else {
                obj.style[attr] = value + 'px';
            }
        }

        if ( t == d ) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }

        }

    }, 16);
}

/*
 * t : time �ѹ�ʱ��
 * b : begin ��ʼֵ
 * c : count �ܵ��˶�ֵ
 * d : duration ����ʱ��
 * */

//Tween.linear();

var Tween = {
    linear: function (t, b, c, d){  //����
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //��������
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //��������
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //���ټ�������
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //�Ӽ�������
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //����������
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //�Ӽ��ټ���������
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //����˥�����ߣ��������룩
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //������ǿ���ߣ�����������
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //���˼��٣����˽��룩
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //�����ľ���
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //������񣨵��򽥳���
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}