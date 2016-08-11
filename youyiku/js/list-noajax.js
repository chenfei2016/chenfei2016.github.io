function posTop(obj){
	var top = 0;
	
	while(obj){
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return top;
}
var bBtn = true;
var aUl = document.getElementsByTagName("ul");
var a = 0;
var b = 3;
window.onscroll = function(){
	var viewHeight = document.documentElement.clientHeight;
	var scrollY = document.documentElement.scrollTop||document.body.scrollTop;
	for(var i=0;i<aUl.length;i++){
		var aLi = aUl[i].getElementsByTagName("li");
		var lastLi = aLi[aLi.length-1];
		if(posTop(lastLi)<viewHeight+scrollY && bBtn){
			bBtn = false;
//				setTimeout(function(){
					if(b >= data.list[0].src.length){
						b = data.list[0].src.length;
					}
					console.log(b,data.list[0].src.length-1)
					if(data.code){
						bBtn = true;
					}
					for(var i=0;i<data.list.length;i++){
						var list = data.list[i];
						
						for(var j=a;j<b;j++){
							
							var oLi = document.createElement("li");
							oLi.innerHTML = '<a href=""><img src="'+list.smallsrc[j]+'" width = "230" alt="" /></a>';
							load(oLi,list.src[j]);

							
							function load(ele,src){
								setTimeout(function(){
								var a1 = new Image();
								a1.src = src;
								console.log(a1)
								a1.onload = function(){
									console.log(ele)
									ele.querySelector("img").src = src;
								}
								},1000)
								
							}
							aUl[i].appendChild(oLi);
						}
					}
					if(b >= data.list[0].src.length){
						window.onscroll = null;
					}
					a = b;
					b +=3;
//				},1000)
		}
		
	}
	
}
