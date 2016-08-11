/*
 * 本项目核心文件,装逼于无形之中
 * 用于链式添加页面和每个页面对应的组件
 */
function H5() {
    return new H5.fn.init();
}

H5.fn = H5.prototype = {
    constructor: H5,
    init: function() {
        //创建最外层页面的父容器,并且默认隐藏（目的：加载全部资源后显示）
        this.ele = $('<div class="h5">').hide();
        //直接添加给body
        $('body').append(this.ele);
        //用来存储已经创建好的页面(用来获取组件的父级)
        this.page = [];

        return this;
    },
    //创建一个页
    addPage: function(name) {
        //创建一个页面的父级
        var page = $('<div class="h5_page section">');
        //如果传入name则添加对应的class用于页面控制
        name && page.addClass('h5_page_' + name);
        //添加到最外层父级
        this.ele.append(page);
        //存储到数组容器
        this.page.push(page);
        //每次添加页面自动添加脚注动画
        if (typeof this.whenAddPage === 'function') {
            this.whenAddPage();
        }
        //返回当前对象
        return this;
    },
    //创建一个组件
    addComponent: function(cfg) {
        var cfg = cfg || {};
        cfg.name = cfg.name || 'Fq';
        cfg.type = cfg.type || 'base';

        var component,
            page = this.page.slice(-1)[0];

        switch (cfg.type) {
            case 'base':
                component = H5ComponentBase(cfg);
                page.append(component);
                break;
            case 'point':
                component = H5ComponentPoint(cfg);
                page.append(component);
                break;
            case 'polyline':
                component = H5ComponentPolyline(cfg);
                page.append(component);
                break;
            case 'radar':
                component = H5ComponentRadar(cfg);
                page.append(component);
                break;
            case 'pie':
                component = H5ComponentPie(cfg);
                page.append(component);
                break;
            case 'bar':
                component = H5ComponentBar(cfg);
                page.append(component);
                break;
            default:

                break;
        }

        return this;
    },
    loaded: function(Images, firstPage) {
        console.log(firstPage)
        var _this = this;
        if (this._images === undefined) {
            this._images = Images.length || 0;
            this.loadNum = 0;
            Images.forEach(function(e, i) {
                //加载了图片数量次的onload事件第二次不再进入if
                var img = new Image();
                img.src = e;
                img.onload = function() {
                    _this.loaded('',firstPage);
                };
            });
            $('#rate').text('0%');
            return this;
        } else {
            this.loadNum++;
            $('#rate').text(((this.loadNum / this._images) * 100 >> 0) + '%');
            if (this.loadNum < this._images) {
                return this;
            }
        }
        //全部加载完成后执行最后一个元素的loaded
        this.ele.show();
        this.ele.fullpage({
            onLeave: function() {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function() {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        //需要显示后 才能使用 moveTo
        console.log(firstPage)
        if (firstPage) {
            $.fn.fullpage.moveTo(firstPage);
        }
    }
}

H5.fn.init.prototype = H5.fn;
