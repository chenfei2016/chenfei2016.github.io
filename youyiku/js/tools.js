//"案例展示"自定义滚动条的面向对象过程
function scrollBar(target){
	
}
scrollBar.prototype.drag = function(ele,target,dir,scrollBar,color){
	ele.style.backgroundColor = color.scrollBarColor;
	ele.parentNode.style.backgroundColor = color.scrollTotalColor;
	var perOutWidth = parseInt(getComputedStyle(target.children[0]).marginLeft)+parseInt(getComputedStyle(target.children[0]).marginRight)+target.children[0].offsetWidth
//为了做到让目标的宽度正好等于内容的宽度，所以计算每一个小内容的宽度，然后乘小内容的个数
	target.style.width = (perOutWidth)*target.children.length-parseInt(getComputedStyle(target.children[0]).marginRight)+"px";
	if(dir == "x"){//如果是x轴方向的滚动条
		ele.style.width = (ele.parentNode.offsetWidth*ele.parentNode.offsetWidth/target.offsetWidth)+"px";
		//以上位滚动条的宽度是根据可视区占了内容长度的多少判断出来的
		var TarMaxLeft =  target.offsetWidth - target.parentNode.offsetWidth;
		//以上为内容区可移动的最大距离
		var scrollBarMaxLeft = ele.parentNode.offsetWidth-ele.offsetWidth;
		ele.onmousedown=function(ev){//对滚动条进行拖拽动作
			var _this = this;
			var e = ev || event;
			var disX = e.clientX - ele.offsetLeft;
			ele.style.backgroundColor = color.scrollBarHoverColor;
			document.onmousemove = function(ev){
				var e = ev || event;
				var Left = e.clientX - disX;
				Left = Left<0?0:Left;
				Left = Left>scrollBarMaxLeft?scrollBarMaxLeft:Left;
				ele.style.left = Left + "px";
				var scale = Left/scrollBarMaxLeft;
				target.style.left = -scale*TarMaxLeft + "px";
				//根据滚动条移动的位置让内容区域随着呈现比例变化
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				ele.style.backgroundColor = color.scrollBarColor;
			}
			return false;
		}
		ele.parentNode.onclick = function(ev){
			var e = ev || event;
			if(e.clientX>ele.getBoundingClientRect().right){
				//当点击滚动条右侧的区域，让内容移动一屏的距离，并且滚动条随着内容的滚动距离进行计算
				var targrtMaxDis =(-target.offsetLeft+target.parentNode.offsetWidth);
				//每点击一次让当前的滚动条的left值加上可视区的宽度
				targrtMaxDis = targrtMaxDis>TarMaxLeft?TarMaxLeft:targrtMaxDis;
				//处理边界操作
				move(target,"left",-targrtMaxDis,500);
				move(ele,"left",targrtMaxDis/target.offsetWidth*ele.parentNode.offsetWidth,500)
			}
			if(e.clientX<ele.getBoundingClientRect().left){
				var targrtMinDis =(-target.offsetLeft-target.parentNode.offsetWidth);
				targrtMinDis = targrtMinDis<0?0:targrtMinDis;
				move(target,"left",-targrtMinDis,500);
				move(ele,"left",targrtMinDis/target.offsetWidth*ele.parentNode.offsetWidth,500)
			}
		}
		function move(obj,attr,target,duration,callback){//封装一个运动函数
			var b = parseFloat(getComputedStyle(obj)[attr]);//得到该属性最开始的值
			var c = target - b;//目标位置-初始值
			var d = duration;//运动过程需要的时间
			var now = new Date().getTime();//获取运动一开始的时间
			obj[attr] = setInterval(function(){
				var t = new Date().getTime() - now;//当前时间-一开始运动的时间
				var value = b + c / d * t; 
				obj.style[attr] = value+"px"; //定时器执行一遍后的运动距离
				if(t >= d){//时间差比总时间还要大的时候
					clearInterval(obj[attr]);//清除定时器
					obj.style[attr] = target+"px";
					callback&&callback();
				}
			},30)
		}
	}
}
//可拖拽窗口的面向对象过程
function Drag(classname){
	this.box = document.getElementsByClassName(classname)[0];
	this.disX = 0;
	this.disY = 0;
}
Drag.prototype.init = function(){
	var This = this;
	this.box.onmousedown = function(ev){
		var e = ev||event;
		This.down(e);
		document.onmousemove = function(ev){
			var e = ev||event;
			This.move(e);
		}
		document.onmouseup = function(){
			This.up();
		}
		return false;
	}
}
Drag.prototype.down = function(e){
	this.disX = e.clientX - this.box.offsetLeft; 
	this.disY = e.clientY - this.box.offsetTop;
}
Drag.prototype.move = function(e){
	this.box.style.left = e.clientX - this.disX +"px";
	this.box.style.top = e.clientY - this.disY +"px";
}
Drag.prototype.up = function(){
	document.onmousemove = document.onmouseup = null;
}