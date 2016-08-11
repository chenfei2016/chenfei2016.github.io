/*
	用于开发柱图组件
*/

function H5ComponentBar (cfg) {
	return new H5ComponentBar.fn.init(cfg);
}

H5ComponentBar.fn = H5ComponentBar.prototype = {
	constructor:H5ComponentBar,
	init:function (cfg) {
		this.cfg = cfg || {};
		this.cfg.type = this.cfg.type || 'bar';
		var _this = this;
		this.component = H5ComponentBase(this.cfg);
		this.component.addClass('clear');
		$.each(this.cfg.data,function(i, e) {
			var line = $('<div class="line"></div>');
			var name = $('<div class="name"></div>');
			var wrap = $('<div class="wrap"></div>');
			var ratio = $('<div class="ratio"></div>');
			var move = $('<div class="move"></div>');
			var per = $('<div class="per"></div>');

			var width = (e[1]*100 >= 100) ? (e[1]*100).toFixed(0) + '%' :(e[1]*100).toFixed(1) + '%';
			//项目名称
			name.text(e[0]);
			//百分比运动层
			e[2] && move.css('backgroundColor',e[2]);
			//百分比大小层
			ratio.css('width',parseInt(width)*0.75 + '%');
			//百分比数值层
			per.text(width).css('color',e[2]).css('left',width);
			//插入节点
			wrap.append(ratio).append(per);
			ratio.append(move);
			line.append(name).append(wrap);
			_this.component.append(line);
		});


		return this.component; 
	}
};

H5ComponentBar.fn.init.prototype = H5ComponentBar.fn;