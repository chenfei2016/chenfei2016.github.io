/*
 * 基本图文组件
 */

var H5ComponentBase = function(cfg) {
    //无new化操作
    return new H5ComponentBase.fn.init(cfg);
}

H5ComponentBase.fn = H5ComponentBase.prototype = {
    constructor: H5ComponentBase,
    init: function(cfg) {
        this.cfg = cfg || {};
        this.cfg.name = this.cfg.name || 'Fq';
        this.cfg.type = this.cfg.type || 'base';
        this.id = ('h5_c_' + Math.random()).replace('.', '');
        this.clsType = 'h5_component_' + this.cfg.type;
        this.clsName = 'h5_component_name_' + this.cfg.name;
        //创建组件同时添加class和调试用id
        this.component = $('<div class="h5_component"></div>');
        this.component.addClass(this.clsType).addClass(this.clsName).attr('id', this.id);

        //给组件添加属性和方法
        this.cfg.text && this.component.text(this.cfg.text);
        this.cfg.width && this.component.width(this.cfg.width);
        this.cfg.height && this.component.height(this.cfg.height);
        //如果不局限于宽高，那么可以直接设置CSS样式
        this.cfg.css && this.component.css(this.cfg.css);
        //判断是否居中;
        if (this.cfg.center === true && this.cfg.width !== undefined) {
            this.component.css('left', 0).css('right', 0).css('margin', 'auto');
        }
        //判断是否有事件
        if(typeof this.cfg.onTouch === 'function'){
            this.component.on('click',this.cfg.onTouch);
        }

        //给组件添加自定义事件(载入和载出)
        var _this = this;
        var timerLoad = null;
        var timerLeave = null;
        this.component.on('onLoad', function() {
            var $this = $(this);
            clearTimeout(timerLeave);
            timerLoad = setTimeout(function() {
                $this.addClass(_this.clsType + '_load').removeClass(_this.clsType + '_leave');
                _this.cfg.animateIn && $this.animate(_this.cfg.animateIn);
            }, _this.cfg.loadTime || 0);
            return false;
        });
        this.component.on('onLeave', function() {
            var $this = $(this);
            clearTimeout(timerLoad);
            timerLeave = setTimeout(function() {
                $this.addClass(_this.clsType + '_leave').removeClass(_this.clsType + '_load');
                _this.cfg.animateOut && $this.animate(_this.cfg.animateOut);
            }, _this.cfg.leaveTime || 0);
            return false;
        });
        //返回当前组件
        return this.component;
    }
}

H5ComponentBase.fn.init.prototype = H5ComponentBase.fn;