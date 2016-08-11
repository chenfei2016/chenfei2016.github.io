//初始化数据
initData(datas);
bindEvent();


function bindEvent(){
	/*导航处下面的绿色的横线滑动效果
	绿色横线随着鼠标的移动而移动，鼠标如果离开导航（未点击），则绿色的横线回到“网站首页”，
	当鼠标点击过后离开导航，则绿色的横线回到点击时的位置*/
	$(".nav li").on("mouseover",function(){
		$(".bottomLine").stop().animate({left:190+$(this).index()*87},300)
	})
	$(".nav").on("mouseout",function(){
		if(lineOnoff){
			$(".bottomLine").stop().animate({left:190},500)
		}else{
			$(".bottomLine").stop().animate({left:190+clickNUm*87},500)
		}
	})
	//当点击每一个导航的内容的时候拖拽窗口和轮播窗口消失，导航的选项卡从可视区的下方出现
	var laseIndex = 0;
	var lineOnoff = true;
	var clickNUm = 0;
	$(".nav").find("li").on("click",function(){
		window.location.hash = "#page="+$(this).index();
		lineOnoff = false;
		clickNUm = $(this).index();
		$(".rightBeside").fadeOut(300);
		$(".slide").fadeOut(300);
		if($(this).index()==0){
			$(".rightBeside").fadeIn(500);
			$(".slide").fadeIn(500);
		}
		if(laseIndex!=$(this).index()){
			$("#indexContent").children("div").animate({top:0},500)
		}
		$("#indexContent").children("div").eq($(this).index()).animate({top:-533},500)
		laseIndex = $(this).index();
		return false;
	})
	//当点击全部案例的时候
	$("#caseShow .bottomMes").find("li").eq(1).find("a").attr("href","listno.html").attr("target","mainFrame")
	//点击导航每个选项卡的关闭按钮的时候，选项卡从下方消失
	$(".close").find("a").on("click",function(){
		$(this).closest(".contentSame").stop().animate({top:0},500);
		$(".rightBeside").fadeIn(500);
		$(".slide").fadeIn(500);
	})
	//当点击后下角的自动轮播窗口的"左"箭头的时候，图片向左滚动，同时处理连续点击滚动很多图片的问题，改为连续点击只滚动一张图片
	var Width=$("#wrap a").last().width();
	var num=0;
	$(".arrowLeft").on("click",function(){
		var w=parseFloat($("#wrap").position().left);
		var TEST=w%Width;
		if(TEST&&w!=0){
			return false;
		}
		num--;
		if(num==-1){
			$("#wrap a").last().css("left",-$("#wrap a").length*Width);	
			$("#wrap").stop().animate({"left":Width},500,function(){
				$("#wrap").css("left",-($("#wrap a").length-1)*Width)
				$("#wrap a").last().css("left",0)
			})
			num=$("#wrap a").length-1;
		}else{
			$("#wrap").stop().animate({"left":-num*Width},500)
		}
	})
	//当点击后下角的自动轮播窗口的"右"箭头的时候，图片向右滚动，同时处理连续点击滚动很多图片的问题，改为连续点击只滚动一张图片
	$(".arrowRight").on("click",function(){
		rightAuto();
	})
	var timer = null;
	//让图片自动播放，开启定时器
	clearInterval(timer);
	timer = setInterval(rightAuto,2000)
	function rightAuto(){
		var w=parseFloat($("#wrap").position().left);
		var TEST=w%Width;
		if(TEST&&w!=0){
			return false;
		}
		num++;
		if(num==$("#wrap a").length){
			$("#wrap a").first().css("left",$("#wrap a").length*Width)
			$("#wrap").stop().animate({"left":-Width*num},500,function(){
				$("#wrap").css("left",0)
				$("#wrap a").first().css("left",0)
			})
			num=0;
		}else{
			$("#wrap").stop().animate({"left":-num*Width},500)
		}
	}
	
	var onoff = true;
	//右边的可拖拽的窗口一直在页面可视区的右侧
	$(".rightBeside").css("left",$(window).width()-$(".rightBeside").width())
	window.onresize = function(){
		$(".rightBeside").css("left",$(window).width()-$(".rightBeside").width())
	}
	//点击可拖拽窗口的加号的时候，窗口展开并且显示在可视区的居中位置，"+"变成"-"，点击减号的时候窗口回到页面原来位置
	$(".extendSign").on("click",function(){
		if(onoff){
			var centerLeft = ($(window).width()-$(".rightBeside").width())/2;
			var centerTop = ($(window).height()-500)/2;
			$(".rightBeside").stop().animate({height:500,left:centerLeft,top:centerTop},1000,function(){
				$(".extendSign").css("background","url(img/newsclose.png) no-repeat")
			})
			onoff=false;
		}else{
			$(".rightBeside").stop().animate({height:67,left:$(window).width()-$(".rightBeside").width(),top:30},1000,function(){
				$(".extendSign").css("background","url(img/newsopen.png) no-repeat")
			})
			onoff=true;
		}
	})
	//可拖拽窗口的实现
	var d1 = new Drag("rightBeside");
	d1.init();
	//可拖拽窗口里面的小选项卡的实现
	$(".changeDot").find("li").on("click",function(){
		$(".changeDot li").find("a").removeClass("act")
		$(this).find("a").addClass("act")
		$(".besideContent").find(".content1").removeClass("contentAct")
		$(".besideContent").find(".content1").eq($(this).index()).addClass("contentAct")
	})
	//"案例展示"自定义滚动条
	var scrollBar1 = new scrollBar();
	scrollBar1.drag($("#scrollbox").get(0),$("#wrap1").get(0),"x",true,{
		scrollTotalColor:"#e1e1e1",
		scrollBarColor:"#8a8a8a",
		scrollBarHoverColor:"#99c228"
	});
	//"案例展示"里面每一个项目的鼠标移入效果和鼠标移出效果
	$(".wrapItem").on("mouseover",function(){
		$(this).find(".searchIcon").stop().animate({top:52},300);
		$(this).find(".readMore").stop().animate({"bottom":9},300);
	})
	$(".wrapItem").on("mouseout",function(){
		$(".searchIcon").stop().animate({top:-52},300)
		$(this).find(".readMore").stop().animate({"bottom":-32},300);
	})
	//点击"服务内容"里面的选项卡选项出现相应的内容
	$("#serviceContent").find("li").on("click",function(){
		$("#serviceContent").find("li").removeClass("bottomMesAct")
		$(this).addClass("bottomMesAct")
		$(".serverDetail div").removeClass("datailAct")
		$(".serverDetail").find("div").eq($(this).index()).addClass("datailAct")
	})
	//"联系我们"的input改变点击时候的样式
	$("#contactUs").find("input").on("click",function(){
		$("#contactUs").find("input").css("background-color","")
		$(this).css("background-color","rgb(153,194,40)")
		$(this).css("color","#fff")
	})
	$("#contactUs").find("input").on("blur",function(){
		$(this).css("color","rgb(138, 138, 138)")
	})
	$("#contactUs").find("textarea").on("input",function(){
		$(this).val("")
	})
	//鼠标移动的时候三个背景图会有位置上的变化，从而构成视觉差
	var startX = 0;
	var startY = 0;
	document.onmouseenter = function(ev){
		var e = ev||event;
		startX = e.clientX;
		startY = e.clientY;
	}
	var initPosBg1Left = $(".bg-1").offset().left;
	var initPosBg1Top = $(".bg-1").offset().top;
	var initPosBg2Left = $(".bg-2").offset().left;
	var initPosBg2Top = $(".bg-2").offset().top;
	var initPosBg3Left = $(".bg-3").offset().left;
	var initPosBg3Top = $(".bg-3").offset().top;
	window.onmousemove = function(ev){
		var e = ev||event;
		$(".bg-1").css("left",initPosBg1Left+(e.clientX-startX)/20);
		$(".bg-1").css("top",initPosBg1Top+(e.clientY-startY)/20);
		$(".bg-2").css("left",initPosBg2Left+(e.clientX-startX)/50);
		$(".bg-2").css("top",initPosBg2Top+(e.clientY-startY)/50);
		$(".bg-3").css("left",initPosBg3Left+(e.clientX-startX)/50);
		$(".bg-3").css("top",initPosBg3Top+(e.clientY-startY)/50);
	}
	//点击全部案例的时候跳转页面
	console.log(window.location.hash)
	if(window.location.hash=="#page=4"){
		$("#indexContent").children("div").eq(4).animate({top:-533},500)
		$(".rightBeside").fadeOut(300);
		$(".slide").fadeOut(300);
	}
	if(window.location.hash=="#page=3"){
		$("#indexContent").children("div").eq(3).animate({top:-533},500)
		$(".rightBeside").fadeOut(300);
		$(".slide").fadeOut(300);
	}
}
