//冒泡排序
function bubblingSort(arr){
	for(var i = 0; i < arr.length; i++){
		for(var j = 0;j < arr.length - i - 1; j++){
			if(arr[j] > arr[j + 1]){
				var tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
}
//随机验证码
function verificationCode(n){
	var arr = [];
	for(var i = 0; i < n;i++){
		var tmp = parseInt(Math.random() * 123);
		if(tmp >= 0 && tmp <= 9){
			arr.push(tmp);
		}else if(tmp >= 65 && tmp < 91 || tmp >= 97 && tmp < 123){
			arr.push(String.fromCharCode(tmp));
		}else{
			i--;
		}
	}
	arr = arr.join("");
	return arr;
}

//当前日期
function showTime(){
					
	var d = new Date()
	var year = d.getFullYear();
	var moth = d.getMonth() + 1;
	var data = d.getDate();
	var day = d.getDay();
					
	switch(day){
		case 0:
			 day = "天";
			break;
		case 1:
			 day = "一";
			break;
		case 2:
			 day = "二";
			break;
		case 3:
			 day = "三";
			break;
		case 4:
			 day = "四";
			break;
		case 5:
			 day =  "五";
			break;
		case 6:
			 day = "六";
			break;
		default :
			alert("error");
			break;
	}
	var hour = d.getHours();
	var minute =d.getMinutes();
	var second = d.getSeconds();
	return year + "年" + moth + "月" + data + "日  " + "星期" + day + " " + hour + ":" + minute + ":" + second
}

//获取当前有效样式
function getStyle(node,type) {
	 return node.currentStyle ? node.currentStyle[type] : getComputedStyle(node)[type];
}

//随机颜色
function randomColor(){
	return "rgba("+ parseInt(Math.random() * 226) + "," + parseInt(Math.random() * 226) + "," + parseInt(Math.random() * 226) + "1)"
}

//获取div节点
function $(div){
	return document.getElementById(div)
}

//拖拽
function drag(node){
	node.onmousedown = function(ev){
	var e = ev || window.event;
	var offsetX = e.clientX - node.offsetLeft;
	var offsetY = e.clientY - node.offsetTop;
	document.onmousemove = function(ev){
		var e = ev || window.event;
		node.style.left = e.clientX - offsetX + "px";
		node.style.top = e.clientY - offsetY + "px";
	}
	document.onmouseup = function(){
		document.onmousemove = null
	}
	}
}
//拖拽限制出界
function dragType(node){
	node.onmousedown = function(ev){				
	var e = ev || window.event;
	var offsetX = e.clientX - node.offsetLeft;
	var offsetY = e.clientY - node.offsetTop;
	document.onmousemove = function(ev){
		var e = ev || window.event;
		var l = e.clientX - offsetX;
		var window_width = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth
		if(l <= 0){
			l = 0
		}else if(l >= window_width - node.offsetWidth){
			l = window_width - node.offsetWidth
		}
		var t = e.clientY - offsetY;
		var window_height = document.documentElement.clientHeight || document.body.clientHeight;
		if(t <= 0){
			t = 0;
		}else if(t >= window_height - node.offsetHeight){
			t = window_height - node.offsetHeight
		}
		node.style.left = l + "px";
		node.style.top = t + "px";
		}
	}
	node.onmouseup = function(){
		document.onmousemove = null;
	}
}

//匀速运动
function line_startMove(node,{speed = 5,attr,iTarget,func}){
	clearInterval(node.time);
	node.time = setInterval(function(){
		var iCur = parseInt(getStyle(node,attr))
		if(iTarget > iCur){
			speed = Math.abs(speed)
		}else{
			speed = -Math.abs(speed)
		}
					
		if(Math.abs(iTarget - iCur) <= Math.abs(speed)){
			clearInterval(node.time);
			node.style[attr] = iTarget + "px";
		}else{
			node.style[attr] = iCur + speed + "px";
		}
	},30)
}


//获取cookie
	function setCookie(name,value,obj){
		var str = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if(obj.expires){
			str += ";expires=" + getDate(obj.expires);
		 }
		 if(obj.path){
			str += ";path=" + obj.path;
		 }
				 
		 document.cookie = str
		function getDate(n){
			var d = new Date();
			var day = d.getDate();
			d.setDate(day + n);
			return d;
		}
	}
	
	//删除cookie
	function removeCookie(name){
		var str = name + "=;expires=" + new Date(0);
		document.cookie = str;
	}
	
	//获取cookie
	function getCookie(name){
		var str = decodeURIComponent(document.cookie)
		var start = str.indexOf(name)
		var end = str.indexOf(";",start)
		start += name.length + 1;		
		if(end == -1){
			end = str.length
		}
		str = str.substring(start,end)
		return str;
	}