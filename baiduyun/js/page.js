//头部菜单控制
(function (){
	//获取 网盘 标签
	var oDiv = document.querySelector('.activeA');
	//获取背景箭头
	var oSpan = document.querySelector('.activeSpan');
	//获取隐藏导航
	var list = document.querySelector('.list');
	//获取隐藏导航的所有子菜单
	var aSpan = document.querySelectorAll('.list a span:nth-of-type(1)');
	//鼠标移入显示子菜单
	oDiv.addEventListener('mouseover', function (e){
		this.className = 'activeA ac';
		oSpan.style.background = 'url(img/frame-icon.png) no-repeat -90px -57px';
		list.style.display = 'block';
	});
	//鼠标移出隐藏子菜单
	oDiv.addEventListener('mouseout', function (e){
		this.className = 'activeA';
		oSpan.style.background = '';
		list.style.display = 'none';
	});
	//子菜单背景图设置
	for (var i = 0,len=aSpan.length; i < len; i++) {
		aSpan[i].style.backgroundPosition = -i*35 + 'px ' + 0;
	}
})();
//右侧头部 新建和上传
(function (){
	//上传文件夹
	var updata = document.querySelector('.updatas');
	var uptype = document.querySelector('.uptype');
	updata.addEventListener('mouseover', function (){
		uptype.style.display = 'block';
	});
	updata.addEventListener('mouseout', function (){
		uptype.style.display = 'none';
	});
	//新建文件夹
	var createFolder = document.querySelector('.createFolder');
	var oSpan = document.querySelector('.createFolder span');
	createFolder.addEventListener('mouseover', function (){
		oSpan.style.backgroundPosition = '-178px 0';
	});
	createFolder.addEventListener('mouseout', function (){
		oSpan.style.backgroundPosition = '-148px 0';
	});
})();
