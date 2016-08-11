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
			var xhr = new XMLHttpRequest();
			
			xhr.open("get","js/datalist.js",true)
			xhr.onload = function(){
				
				
				console.log(JSON.parse(xhr.responseText))
				var json = JSON.parse(xhr.responseText);
				if(b >= json.list[0].src.length){
					b = json.list[0].src.length;
				}
				console.log(b,json.list[0].src.length-1)
				if(json.code){
					bBtn = true;
				}
				for(var i=0;i<json.list.length;i++){
					var list = json.list[i];
					
					for(var j=a;j<b;j++){
						
						var oLi = document.createElement("li");
						oLi.innerHTML = '<a href=""><img src="'+list.src[j]+'" alt="" /></a>';
						aUl[i].appendChild(oLi);
					}
				}
				if(b >= json.list[0].src.length){
					window.onscroll = null;
				}
				a = b;
				b +=3;
			}
			xhr.send()
		}
	}
	
}
