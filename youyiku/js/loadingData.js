function initData(data){
if(data.worksData.length>0){
	//生成"案例展示"里面的每一个item项
	var navWrap =  "";
	var navclass = "";
	data.worksData.forEach(function(value,key){
		if(key == data.worksData.length-1){
			classname = "wrapItem noMargin";
		}else{
			classname = "wrapItem";
		}
		navWrap += '<div class="'+classname+'">\n'+
					'<div class="searchIcon">\n'+
					'<img src="img/wizoom.png" alt="" />\n'+
					'</div>\n'+
					'<div class="picBox">\n'+
					'<div class="readMore">\n'+
					'<span>READ MORE</span>\n'+
					'<span class="witnum">.00</span>\n'+
					'</div>\n'+
					'<div class="pic">\n'+
					'<div>\n'+
					'<a href="javascript:;">\n'+
					'<img src="'+value.workPic+'" alt="" />\n'+
					'</a>\n'+
					'</div>\n'+
					'</div>\n'+
					'</div>\n'+
					'<div class="discript">\n'+
					'<a href="javascript:;" class="title">'+value.workName+'</a>\n'+
					'<p>\n'+
					'<span>Date:'+value.workDate+'</span>\n'+
					'<span>所属行业：<a href="javascript:;">'+value.workType+'</a></span>\n'+
					'</p>\n'+
					'</div>\n'+
					'</div>';
	})
	var wrap1 = document.getElementById("wrap1")
	wrap1.innerHTML += navWrap;
}
//"关于我们"里面的具体描述
if(datas.companyInfo.aboutUs){
	var aboutUsDetailLeft = document.querySelector(".aboutUsDetail .left")
	aboutUsDetailLeft.innerHTML = datas.companyInfo.aboutUs;
}
//可拖拽的窗口数据
if(datas.newsData.length){
	var dragWindow = "";
	var dragclass = "";
	datas.newsData.forEach(function(value,key){
		
		if(key==0){
			dragclass = "content1 contentAct";
		}else{
			dragclass = "content1";
		}
		dragWindow += '<div class="'+dragclass+'">\n'+
					'<div class="title">'+value.title+'</div>\n'+
					'<div class="produce">\n'+
					'<div class="producePic">\n'+
					'<img src='+value.img+' alt="" />\n'+
					'</div>\n'+
					'<div class="produceText">\n'+
					'<p>'+value.description+'</p>\n'+
					'</div>\n'+
					'<div class="produceWebsit">\n'+
					'<span>网址</span>\n'+
					'<a href="">'+value.link+'</a>\n'+
					'</div>\n'+
					'</div>\n'+
					'</div>';
	})
	var besideContent = document.getElementsByClassName("besideContent")[0];
	besideContent.innerHTML += dragWindow;
}

//生成自动录播的图片
if(datas.wrapbox.length){
	var strWrap = "";
	for(var i=0;i<data.wrapbox.length;i++){
		strWrap += '<a href="javascript:;"><img src="'+datas.wrapbox[i].pic+'" alt="'+datas.wrapbox[i].title+'" /></a>'
	}
	var wrapBox = document.getElementsByClassName("wrapBox")[0];
	wrapBox.innerHTML = strWrap;
}
//联系我们
	if(datas.companyInfo){
		var company = datas.companyInfo;
		var qq = company.qq.split("/");
		var str = '<p><span>'+company.companyName+'</span><br><br>公司地点：'+company.companyAddress+'<br>邮政编码：'+company.postcode+'<br>办公电话：'+company.tel+'<br>手机：'+company.phone+'<br>QQ：<a href="tencent://message/?uin='+qq[0]+'&Site=uelike&Menu=yes">'+qq[0]+'</a> / <a href="tencent://message/?uin='+qq[1]+'&Site=uelike&Menu=yes">'+qq[1]+'</a><br>E-mail：'+company.email+'<br>UEhtml设计交流平台：<a target="_blank" href="'+company.website+'">'+company.website+'</a></p>';
		var officeDetail = document.querySelector(".officeDetail")
		officeDetail.innerHTML += str;
	}
}