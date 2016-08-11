function BaiDuYunPan(data){

	return new BaiDuYunPan.fn.init(data);
}

BaiDuYunPan.fn = BaiDuYunPan.prototype = {
	contructor:BaiDuYunPan,
	//初始化
	init:function (data){
		//新建文件夹
		this.createNewFile = document.querySelector('.createFolder');
		//数据库
		this.dataList = data;
		//文件树
		this.fileMethod = document.querySelector('.file_method');
		//文件显示区
		this.fileList = document.querySelector('.flie_list');
		//鼠标在文件上的右键菜单
		this.fileMenu = document.querySelector('.fileMenu');
		//鼠标在文件上的右键菜单对应的每个功能
		this.funLi = this.fileMenu.getElementsByTagName('li');
		//存储当前正在操作的id
		this.which;
		//忘了。。。
		this.x = 0;
		//新建文件夹控制
		this.creatFlag = false;
		//存放被选中的数据
		this.seleArr = [];
		//初始化数据变量，也就是当前层级的pId
		this.currentId = 0;
		//初始化方法
		this.showFileList( this.getCurElements(this.currentId) );
		//新建文件夹
		this.newFolder();
		//点选文件右键菜单
		this.conTextMenu();
	},
	//-------------------- 获取数据类 -----------------------
	//获取所有相同父级id的，也就是当前层级的所有元素
	getCurElements:function (pId){
		var data = [];
		this.dataList.forEach( function(e, i) {
			if(e.pId === pId){
				data.push(e);
			}
		});
		return data;
	},
	//-------------------------------------------------------
	//根据传入的id获取这个id的父级
	getParentId:function (Id){
		var n = 0;
		if(Id != 0){
			this.dataList.forEach( function(e, i) {
				if(e.id == Id){
					n = e.pId;
				}
			});
		}
		return n;
	},
	//-------------------------------------------------------
	//获取最大ID用来给添加的新数据使用
	getMaxId:function (){
		var maxId = this.dataList[0].id;
		this.dataList.forEach( function(e, i) {
			if(e.id > maxId){
				maxId = e.id;
			}
		});
		return maxId;
	},
	//-------------------------------------------------------
	//重命名数据库中的数据
	setCurName:function (id,value){
		this.dataList.forEach( function(e, i) {
			if(e.id == id){
				e.name = value;
			}
		});
	},
	repeatNameFun:function (value){
		var _this = this;
		_this.dataList.forEach( function(e, i) {
			if(e.pId == _this.currentId && e.name == value){
				alert('已存在此名称!');
				_this.onOff = false;
			}else {
				_this.onOff = true;
			}
		});
	},
	//-------------------------------------------------------
	//删除数据库中的某一个数据
	deleFile:function (id){
		this.dataList.forEach( function(e, i, a) {
			if(e.id == id){
				a.splice(i, 1);
			}
		});
	},
	//-------------------------------------------------------
	//根据传入当前文件夹的父级id获取当前
	//层级以及所有父层级直到最顶层的数据
	getCeilData:function (pId){
		var _this = this;
		var data = [];
		this.dataList.forEach( function(e, i) {
			if(e.id === pId){ //找到对应的id先push到数组里
				data.push(e);
				if(e.pId != 0){//如果当前找到的这个的pId不是最顶层的
					var pIds = _this.getCeilData(e.pId);//递归直到最顶层
					data = data.concat(pIds);
				}
			}
		});
		return data;
	},
	//-----------------------DOM操作类-------------------------
	//用来初始化和刷新所显示的数据
	showFileList:function (data){
		var _this = this;
		//每次改变内容先清空之前的内容
		this.fileList.innerHTML = '';
		//根据传入的data数据添加当前这一级文件夹要显示的
		data.forEach( function(e, i) {
			//判断data属性下面是否有type属性
			//来区分要创建的是文件夹还是文件
			_this.createFile(e);
		});
		//在生成文件的同时刷新当前层级的目录
		//只有文件夹会涉及到目录刷新的问题
		this.method( this.getCeilData(this.currentId) )
	},
	//-------------------------------------------------------
	//根据上面找到父层id函数创建路径栏
	method:function (data){
		var _this = this;
		var html = '<a id="rb" href="">返回上一级</a><span folderId="0">全部文件</span>';
		//判断传入的数据是否是空
		data.length && data.forEach( function(e, i, a) {
			html += ' | <span folderId="' + data[a.length - 1 -i].id + '">' + data[a.length - 1 -i].name + '</span>'
		});
		//写入要显示的数据
		this.fileMethod.innerHTML = html;
		//---------------
		//返回上级功能
		var returnBack = document.getElementById('rb');
		//判断是否有上一级，有责显示，否则隐藏
		data.length ? (returnBack.style.display = 'inline-block') : (returnBack.style.display = 'none');
		//点击上一级切换到上一级
		returnBack.onclick = function (){
			_this.currentId = _this.getParentId(_this.currentId);
			_this.showFileList(_this.getCurElements(_this.currentId));
			return false
		};
		//---------------
		//点击对应路径切换到当前层级
		this.fileMethod.onclick = function (e){
			var e = e || window.event;
			if(e.target.nodeName.toUpperCase() == 'SPAN'){
				if(_this.currentId == e.target.getAttribute('folderId')*1){
					alert('已经是当前目录了！')
					return;
				}else{
					_this.currentId = e.target.getAttribute('folderId')*1;
					_this.showFileList(_this.getCurElements(_this.currentId));
				}
			}
		};
	},
	//-------------------------------------------------------
	//创建文件
	createFile:function (data){
		var _this = this;
		//创建一个最外层div
		var fileWrap = document.createElement('div');
		//给最外层div添加设定好的class
		fileWrap.className = 'file';
		//添加一个自定义属性用来判断是否被选中
		fileWrap.selected = false;//默认是未被选中状态
		//给创建的这个文件夹添加对应数据中的Id
		fileWrap.Id = data.id;
		data.type&&(fileWrap.type = data.type); //需要注意的地方
		// 做标记 用来获取
		fileWrap.setAttribute('index',data.id);
		//-------------------------
		//创建文件夹图标
		var fileImg = document.createElement('div');
		//给文件夹图标添加对应的class
		var fileClass = 'fileImg' + ' ' + data.type;
		data.type ? fileImg.className = fileClass : fileImg.className = 'fileImg';
		// 做标记 用来获取
		fileImg.setAttribute('index',data.id);
		//--------------------------
		//创建选择框
		var fileSelect = document.createElement('div');
		//给选择框添加对应的class
		fileSelect.className = 'selected';
		// 做标记 用来获取
		fileSelect.index = data.id;
		fileSelect.setAttribute('index',data.id);
		//--------------------------
		//创建文件夹名字div
		var fileName = document.createElement('div');
		//给用来显示文件夹名字的div添加class
		fileName.className = 'fileName';
		// 做标记 用来获取
		fileName.setAttribute('index',data.id);
		//-------------------------
		//创建结构性a标签
		var aName = document.createElement('a');
		//写入数据中对应的name值
		aName.innerHTML = data.name;
		aName.title = data.name;
		// 做标记 用来获取
		aName.setAttribute('index',data.id);
		//重命名功能部分
		var reName = document.createElement('div');
		reName.className = 'reName';
		// 做标记 用来获取
		reName.setAttribute('index',data.id);
		var oText = document.createElement('input');
		oText.type = 'text';
		var spanSure = document.createElement('span');
		var spanCancel = document.createElement('span');
		reName.appendChild(oText);
		reName.appendChild(spanSure);
		reName.appendChild(spanCancel);
		//-------------------------
		//把创建的元素分别添加到divWrap中然后再添加到显示内容中
		fileImg.appendChild(fileSelect);
		fileName.appendChild(aName);
		fileName.appendChild(reName);
		fileWrap.appendChild(fileImg);
		fileWrap.appendChild(fileName);
		//插入父级列表中
		this.fileList.appendChild(fileWrap);
		//-------------------------
		//添加事件部分
		var _this = this;
		//-------------------------
		//选中效果
		fileSelect.onclick = function (e){
			_this.fileMenu.style.display = 'none';
		 	if(fileWrap.selected){
		 		this.innerHTML = '';
		 		(_this.seleArr.indexOf(this.index) != -1)&&(_this.seleArr.splice(_this.seleArr.indexOf(this.index),1));
		 		console.log(_this.seleArr)
		 	}else{
		 		this.innerHTML = '√';
		 		(_this.seleArr.indexOf(this.index) == -1)&&(_this.seleArr.push(this.index));
		 		console.log(_this.seleArr);
		 	}
		 	fileWrap.selected = !fileWrap.selected;
		 	e.cancelBubble = true;
		};
		//-------------------------
		//鼠标移入和移出的交互效果
		fileWrap.onmouseover = function (){
			//改变为选中状态的class
			this.type ? fileImg.className = fileClass + ' hover' : fileImg.className = 'fileImg hover';
			//让选择框显示
			fileSelect.style.display = 'block';
		};
		fileWrap.onmouseout = function (){
			//判断选择框是否被选中,如果没有被选中再移开的时候隐藏
			if(!fileWrap.selected){
				this.type ? fileImg.className = fileClass : fileImg.className = 'fileImg';
				fileSelect.style.display = 'none';
			}
		};
		//-------------------------
		//单击进入文件夹
		fileWrap.onclick = function (){
			if(this.type){
				return;
			}else{
				_this.fileMenu.style.display = 'none';
				_this.currentId = this.Id;
				_this.showFileList( _this.getCurElements(_this.currentId) );
			}
		};
		//-------------------------
		//双击打开文件
		fileWrap.ondblclick = function (){
			if(this.type){
				alert('打不开 ^_^!');
			}
		};
		//-------------------------
		//右击文件夹菜单
		fileWrap.oncontextmenu = function (e){
			var e = e || window.event;
			_this.which = this.Id;
			_this.fileTextMenu(e);
			return false;
		};
	},
	//-------------------------------------------------------
	//新建文件夹
	newFolder:function (){
		var _this = this;
		this.createNewFile.onclick = function (){
			//不能同时新建多个文件夹
			if(_this.creatFlag) return false;
			//关闭新建功能
			_this.creatFlag = true;
			//修改标记 为当前id
			_this.which = _this.getMaxId()+1;
			//创建新文件夹的数据
			var newData = {
				pId:_this.currentId,
				id:_this.which,
				name:'新建文件夹'
			}
			//创建文件夹
			_this.createFile(newData);
			//获取新建文件夹的标签
			var curFile = document.querySelector('.file[index="'+_this.which+'"]');
			var oldName = document.querySelector('.fileName a[index="'+_this.which+'"]');
			var setName = document.querySelector('.reName[index="'+_this.which+'"]');
			var setName = document.querySelector('.reName[index="'+_this.which+'"]');
			var oText = setName.getElementsByTagName('input')[0];
			var aSpan = setName.getElementsByTagName('span');

			oldName.style.display = 'none';
			setName.style.display = 'block';

			oText.value = oldName.innerHTML;
			oText.focus();
			oText.select();

			oText.onfocus = function (){
				this.select();
			};
			//阻止点击文本框冒泡
			oText.onclick = function (e){
				e.cancelBubble = true;
			};
			//确定
			var onOff = true;
			aSpan[0].onclick = function (e){
				//防命名冲突
				_this.dataList.forEach( function(e, i) {
					if(e.pId == _this.currentId && e.name == oText.value){
						alert('已存在此名称!');
						onOff = false;
					}else {
						onOff = true;
					}
				});
				oText.focus();
				oText.select();
				if(onOff){
					//修改当前名字
					oldName.innerHTML = oText.value;
					//隐藏修改文本框
					setName.style.display = 'none';
					//显示名字
					oldName.style.display = 'block';
					//修改对应title
					oldName.title = oText.value;
					//更新数据
					newData.name = oText.value;
					//存入数据库
					_this.dataList.push(newData);
					//恢复新建功能
					_this.creatFlag = false;
				}
				//阻止冒泡
				e.cancelBubble = true;
			};
			//取消
			aSpan[1].onclick = function (e){
				//新建的文件夹点X就移除
				curFile.parentNode.removeChild(curFile);
				//删除对应数据库的数据
				_this.deleFile(_this.which);
				//恢复新建功能
				_this.creatFlag = false;
				//阻止冒泡
				e.cancelBubble = true;
			};
			return false;
		}
	},
	//-------------------------------------------------------
	//文件夹右键菜单
	fileTextMenu:function (e){
		var _this = this;
		//让右键菜单显示
		this.fileMenu.style.display = 'block';
		//存一下鼠标坐标 用来判断边界检测
		var L = e.clientX;
		var T = e.clientY;
		if(L>document.documentElement.clientWidth - this.fileMenu.offsetWidth){
			L = e.clientX - this.fileMenu.offsetWidth;
		}
		if(T>document.documentElement.clientHeight - this.fileMenu.offsetHeight){
			T = document.documentElement.clientHeight - this.fileMenu.offsetHeight;
		}
		this.fileMenu.style.left = L + 'px';
		this.fileMenu.style.top = T + 'px';
		//-------------------------------
		var curFile = document.querySelector('.file[index="'+this.which+'"]');
		curFile.selected = true;
		var select = document.querySelector('.selected[index="'+this.which+'"]');
		select.innerHTML = '√';
		(_this.seleArr.indexOf(select.index) == -1)&&(_this.seleArr.push(select.index));
		console.log(_this.seleArr)
		var oldName = document.querySelector('.fileName a[index="'+this.which+'"]');
		var setName = document.querySelector('.reName[index="'+this.which+'"]');
		var oText = setName.getElementsByTagName('input')[0];
		var aSpan = setName.getElementsByTagName('span');
		//打开
		this.funLi[0].onclick = function (){
			if(curFile.type){
				_this.fileMenu.style.display = 'none';
				alert('打不开 ^_^!');
			}else{
				_this.currentId = _this.which;
				_this.showFileList( _this.getCurElements(_this.currentId) );
			}
		};
		//键盘O打开
		document.onkeyup = function (e){
			if(e.keyCode == 79){
				if(curFile.type){
					_this.fileMenu.style.display = 'none';
					alert('打不开 ^_^!');
				}else{
					_this.fileMenu.style.display = 'none';
					_this.currentId = _this.which;
					_this.showFileList( _this.getCurElements(_this.currentId) );
				}
			}
		};
		//重命名
		var onOff = true;
		this.funLi[4].onclick = function (){
			oldName.style.display = 'none';
			setName.style.display = 'block';
			oText.value = oldName.innerHTML;
			oText.focus();
			oText.select();
			//获得焦点时候全选文字
			oText.onfocus = function (){
				this.select();
			};
			//阻止点击文本框冒泡
			oText.onclick = function (e){
				e.cancelBubble = true;
			};
			//确定
			aSpan[0].onclick = function (e){
				//查看命名是否冲突
				_this.dataList.forEach( function(e, i) {
					if(e.pId == _this.currentId && e.name == oText.value){
						alert('已存在此名称!');
						onOff = false;
					}else {
						onOff = true;
					}
				});
				oText.focus();
				oText.select();
				if(onOff){
					//更新命名
					oldName.innerHTML = oText.value;
					//DOM切换
					setName.style.display = 'none';
					oldName.style.display = 'block';
					//别忘了修改对应title
					oldName.title = oText.value;
					//修改数据库中的名字数据
					_this.setCurName(_this.which,oText.value);
				}
				//阻止冒泡
				e.cancelBubble = true;
			};
			//取消
			aSpan[1].onclick = function (e){
				setName.style.display = 'none';
				oldName.style.display = 'block';
				e.cancelBubble = true;
			};
		};
		//删除
		this.funLi[5].onclick = function (){
			console.log(_this.seleArr);
			_this.dataList.forEach( function(e, i, a) {
				_this.seleArr.forEach( function(e, i) {
					
				});
			});
			//删除节点
			//curFile.parentNode.removeChild(curFile);
			//删除数据库中对应的数据
			//_this.deleFile(_this.which);
		};
	},
	//-------------------------------------------------------
	//document右键菜单
	conTextMenu:function (){
		var _this = this;
		document.onclick = function (e){
			_this.fileMenu.style.display = 'none';
		};
		document.oncontextmenu = function (e){
			return false;
		};
	}
}

BaiDuYunPan.fn.init.prototype = BaiDuYunPan.fn;

