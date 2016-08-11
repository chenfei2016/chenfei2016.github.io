/**
 * Created by ws on 2016/7/18.
 */
    window.onload=function() {
        //头部的导航图标的滑动
        var lis = document.querySelectorAll("#list li");
        var navActive = document.getElementById('navActive');
        var left = navActive.offsetLeft;
        var content=document.getElementById('content');
        var bigDiv=content.querySelector('#content>div');
        var divs=content.querySelectorAll('#content>div>div');
        var H=divs[0].offsetHeight;
        for (var i = 0; i < lis.length; i++) {
            lis[i].index=i;
            lis[i].onmouseover = function () {
                mTween(navActive, {'left': this.offsetLeft}, 200, 'linear');
            };
            lis[i].onmouseout = function () {
                mTween(navActive, {'left': left}, 300, 'linear');
            };
            lis[i].onclick=function(){
               var h=-this.index*H;
                var top1=window.pageYOffset;
                top1=h;
                mTween(bigDiv, {'top':h}, 1000, 'linear');
            }
        }
        //滚动条  06-06


        //第一部分轮播图
        var list1 = document.querySelector('#list1 ul');
        var sliderSpans = document.querySelectorAll('#slider span');
        var lis2 = list1.getElementsByTagName('li');
        var l=lis2[0].offsetWidth;
        list1.style.width=l*lis2.length+'px';
        sliderSpans[0].onclick = function () {
            mTween(list1,{"left":-l},600,'linear',function(){
                list1.appendChild(lis2[0]);
                list1.style.left=0;
            });
        };
        sliderSpans[1].onclick = function () {
            list1.insertBefore(lis2[lis2.length-1],lis2[0]);
            list1.style.left = -l+'px';
            mTween(list1,{"left":0},600,'linear');
        };


    };










