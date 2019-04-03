//当滚动高度到达轮播图时，显示头部浮动框
$(function(){
	$(document).scroll(function(){
		if($(document).scrollTop() >= $(".carousel_box2").offset().top){
			$(".header_float_box").stop().animate({top:0},200)
		}else{
			$(".header_float_box").stop().animate({top:-80},200)
		}
	})
})
//头部浮动 商品文字列表
$(function(){
	$.ajax({
		url:"json/goods_list.json",
		success:function(data){
			var arr = data;
			for(var i = 0;i < arr.length;i++){
				//通过循环创建商品列表
				var list_name = $(`<li class="list_name"></li>`);
				var iconfont = $(`<span class="iconfont">${arr[i].iconfont}</span>`);
				iconfont.appendTo(list_name)
				for(var j = 0;j < arr[i].title.length;j++){
					var carousel_name = $(`<a class="carousel_name" href="#">${arr[i].title[j]}</a>`)
					carousel_name.appendTo(list_name);
				}
				$(list_name).appendTo(".carousel_list1 .carousel_list_left1")
				
				
				//通过循环创建商品列表页
				var content_left = $(`<ul class="content_left"></ul>`);
				for(var k = 0;k < arr[i].content.font.length;k++){
					//通过循环创建商品列表页所需节点
					var oLi = $(`<li></li>`);

					//通过循环创建商品列表也所有标题
					var oH2 = $(`<h2>${arr[i].content.font[k].title}</h2>`);
					var content = $(`<div class="content"></div>`);
					
					oH2.appendTo(oLi);
					for(var m = 0; m < arr[i].content.font[k].text.length;m++){
						var otext = $(`<a href="#">${arr[i].content.font[k].text[m]}</a>`);
						otext.appendTo(content);
					}	
					oLi.appendTo(content_left)
					content.appendTo(oLi);
					
				}
				
				//创建右侧图片
				var content_right = $(`<div class="content_right"></div>`);
				for(var n = 0; n < arr[i].content.img.length;n++){
						var oImg= $(`<img src="${arr[i].content.img[n]}"></img>`);
						oImg.appendTo(content_right);
					}
				
				
				content_right.appendTo(content_left)
				$(content_left).appendTo(".carousel_list1 .carousel_list_center1")
				
			}	
		},
		error:function(error){
			alert(error)
		}
	})
})
//头部浮动导航栏选项卡
$(function(){
	/*鼠标移入菜单按钮显示列表*/
	$(".header_float_box .i1").on("mouseenter",function(){
		$(".header_float_box .carousel_list1").css("display","block")
	})
	/*鼠标移出隐藏列表*/

	$(".header_float_box .carousel_list1").on("mouseleave",function(){
		$(".header_float_box .carousel_list1").css("display","none")
	})
	
	
	$(".carousel_list_left1").on("mouseenter",".list_name",function(){
		$(".carousel_list_center1").css("display","block")
		var inow = $(this).index();
		$(".carousel_list_center1 ul").css("display","none")
		$(".carousel_list_center1 ul").eq(inow).css("display","block")
	})
	$(".header_float_box .carousel_list").on("mouseleave",function(){
		$(".carousel_list_center1").css("display","none")
	})
})



//轮播图
$(function(){
	var inow = 0;
	var time = null;
	var osize = $(".carousel_box .carousel li").size() - 1;
	//页面加载后执行自动播放
	start()
	//鼠标经过按钮时将其class样式改变
	$(".carousel_box .carousel .carousel_nav span").mousemove(function(){
		//鼠标移入按钮时停止自动播放
		clearInterval(time)
		inow = $(this).index();
		$(".carousel_box .carousel .carousel_nav span").attr("class","")
		$(".carousel_box .carousel .carousel_nav span").eq(inow).attr("class","active")
		$(".carousel_box .carousel li").stop().animate({opacity:0},1000)
		$(".carousel_box .carousel li").eq(inow).stop().animate({opacity:1},1000)
	});
	
	$(".carousel_box .carousel .carousel_nav span").mouseout(function(){
		start()
	})
	//通过计时器 自动播放轮播图
	function start(){
		clearInterval(time);
		time = setInterval(function(){
			inow++;
			$(".carousel_box .carousel .carousel_nav span").attr("class","")
			$(".carousel_box .carousel .carousel_nav span").eq(inow).attr("class","active")
			$(".carousel_box .carousel li").stop().animate({opacity:0},1000)
			$(".carousel_box .carousel li").eq(inow).stop().animate({opacity:1},1000,function(){
				if(inow == osize){
					inow = 0;
					$(".carousel_box .carousel .carousel_nav span").eq(inow).attr("class","active")
					$(".carousel_box .carousel li").eq(inow).stop().animate({opacity:1},1000)
				}
			})
		},2000)	
	}	
})


//轮播处商品信息
$(function(){
	$.ajax({
		url:"json/goods_list.json",
		success:function(data){
			var arr = data;
			for(var i = 0;i < arr.length;i++){
				//通过循环创建商品列表
				var list_name = $(`<li class="list_name"></li>`);
				var iconfont = $(`<span class="iconfont">${arr[i].iconfont}</span>`);
				iconfont.appendTo(list_name)
				for(var j = 0;j < arr[i].title.length;j++){
					var carousel_name = $(`<a class="carousel_name" href="#">${arr[i].title[j]}</a>`)
					carousel_name.appendTo(list_name);
				}
				$(list_name).appendTo(".carousel_list2 .carousel_list_left2")
				
				
				//通过循环创建商品列表页
				var content_left = $(`<ul class="content_left"></ul>`);
				for(var k = 0;k < arr[i].content.font.length;k++){
					//通过循环创建商品列表页所需节点
					var oLi = $(`<li></li>`);

					//通过循环创建商品列表也所有标题
					var oH2 = $(`<h2>${arr[i].content.font[k].title}</h2>`);
					var content = $(`<div class="content"></div>`);
					
					oH2.appendTo(oLi);
					for(var m = 0; m < arr[i].content.font[k].text.length;m++){
						var otext = $(`<a href="#">${arr[i].content.font[k].text[m]}</a>`);
						otext.appendTo(content);
					}	
					oLi.appendTo(content_left)
					content.appendTo(oLi);
					
				}
				
				//创建右侧图片
				var content_right = $(`<div class="content_right"></div>`);
				for(var n = 0; n < arr[i].content.img.length;n++){
						var oImg= $(`<img src="${arr[i].content.img[n]}"></img>`);
						oImg.appendTo(content_right);
					}
				
				
				content_right.appendTo(content_left)
				$(content_left).appendTo(".carousel_list2 .carousel_list_center2")
				
			}	
		},
		error:function(error){
			alert(error)
		}
	})
})
//商品文字列表选项卡

$(function(){
	$(".carousel_list_left2").on("mouseenter",".list_name",function(){
		$(".carousel_list_center2").css("display","block")
		var inow = $(this).index();
		
		$(".carousel_list_center2 ul").css("display","none")
		$(".carousel_list_center2 ul").eq(inow).css("display","block")
		/*alert(inow)*/
	})
	$(".carousel_list2").on("mouseleave",function(){
		$(".carousel_list_center2").css("display","none")
	})
})

//商品区1
$(function(){
	//加载商品
	$.ajax({
		url:"json/goods.json",
		success:function(data){
			var arr = data;
			$(`<img src="${arr[0].l_img}" alt="" />`).appendTo(".goods_box1 .goods_left");
			
			//列表右侧
			for(var i = 0;i < arr[0].r_img.length;i++){
				var str = `
						<div>
							<img src="${arr[0].r_img[i].img}" alt="" />
						</div>
						<span class="txt">${arr[0].r_img[i].txt}</span>
						<span class="money">￥${arr[0].r_img[i].money}</span>
						<span class="newMoney">${arr[0].r_img[i].newMoney}</span>
					`;
					var oLi = $("<li></li>");
					$(oLi).html(str);
					$(oLi).appendTo(".goods_box1 .goods_right ul")
			}
			
		},
		error:function(error){
			alert(error)
		}
	})
	
	//添加轮播图效果
	$(".goods_box1 .right_start").on("click",function(){
		var width = -$(".goods_right ul").width() / 2;
		 $(".goods_box1 .goods_right ul").stop().animate({left:width},800)
		 $(".goods_box1 .right_start").css("display","none");
		 $(".goods_box1 .left_start").css("display","block")
	})
	
	$(".goods_box1 .left_start").on("click",function(){
		var width = -$(".goods_right ul").width() / 2;
		 $(".goods_right ul").stop().animate({left:0},800)
		 $(".goods_box1 .right_start").css("display","block");
		 $(".goods_box1 .left_start").css("display","none")
	})
})

//商品区2
$(function(){
	//插入数据
	$.ajax({
		url:"../json/goods.json",
		success:function(data){
			var arr = data;
			//做v额轮播图
			for(var i = 0; i < arr[1].l_img.length; i++){
				$(`<li><a href="#"><img src="${arr[1].l_img[i].img}" alt="" /></a></li>`).appendTo(".goods_box2 .slideshow")
			}
			
			for(var j = 0; j < arr[1].r_img.length;j++){
				$(`<li><a href=""></a><img src="${arr[1].r_img[j].img}" alt="" /></li>`).appendTo(".goods_box2 .goods_right")
			}
			//轮播图
			slideshow(".goods_box2")
		}
	})
	
})

//商品区3
$(function(){
	//插入数据
	$.ajax({
		url:"../json/goods.json",
		success:function(data){
			var arr = data;
			//左侧轮播图
			for(var i = 0; i < arr[2].l_img.length; i++){
				$(`<li><a href="#"><img src="${arr[2].l_img[i].img}" alt="" /></a></li>`).appendTo(".goods_box3 .slideshow")
			}
			
			for(var j = 0; j < arr[2].r_img.length;j++){
				$(`<li><a href=""></a><img src="${arr[2].r_img[j].img}" alt="" /></li>`).appendTo(".goods_box3 .goods_right")
			}
			//轮播图
			slideshow(".goods_box3")
		}
	})
	
})

//商品区4
$(function(){
	//插入数据
	$.ajax({
		url:"../json/goods.json",
		success:function(data){
			var arr = data;
			//左侧轮播图
			for(var i = 0; i < arr[3].l_img.length; i++){
				$(`<li><a href="#"><img src="${arr[3].l_img[i].img}" alt="" /></a></li>`).appendTo(".goods_box4 .slideshow")
			}
			
			for(var j = 0; j < arr[3].r_img.length;j++){
				$(`<li><a href=""></a><img src="${arr[3].r_img[j].img}" alt="" /></li>`).appendTo(".goods_box4 .goods_right")
			}
			//轮播图
			slideshow(".goods_box4")
		}
	})
	
})

//商品区5
$(function(){
	//插入数据
	$.ajax({
		url:"../json/goods.json",
		success:function(data){
			var arr = data;
			//左侧轮播图
			for(var i = 0; i < arr[4].l_img.length; i++){
				$(`<li><a href="#"><img src="${arr[4].l_img[i].img}" alt="" /></a></li>`).appendTo(".goods_box5 .slideshow")
			}
			
			for(var j = 0; j < arr[4].r_img.length;j++){
				$(`<li><a href=""></a><img src="${arr[4].r_img[j].img}" alt="" /></li>`).appendTo(".goods_box5 .goods_right")
			}
			//轮播图
			slideshow(".goods_box5")
		}
	})
	
})

//商品区6
$(function(){
	//插入数据
	$.ajax({
		url:"../json/goods.json",
		success:function(data){
			var arr = data;
			//左侧轮播图
			for(var i = 0; i < arr[5].l_img.length; i++){
				$(`<li><a href="#"><img src="${arr[5].l_img[i].img}" alt="" /></a></li>`).appendTo(".goods_box6 .slideshow")
			}
			
			for(var j = 0; j < arr[5].r_img.length;j++){
				$(`<li><a href=""></a><img src="${arr[5].r_img[j].img}" alt="" /></li>`).appendTo(".goods_box6 .goods_right")
			}
			//轮播图
			slideshow(".goods_box6")
		}
	})
	
})
//轮播图函数
function slideshow(node){
		var totalSize = $(node +" .goods_left .slideshow li").size();
		var totalWidth = $(node + " .goods_left .slideshow li").width();
		$(node +" .goods_left .slideshow").css("width",totalSize * totalWidth)
		//通过循环添加轮播图按钮
		for(var i = 0; i < totalSize - 1;i++){
			$(`<li><span></span></li>`).appendTo(node +" .slideshowBtn")
		}
		//按钮的位置
		$(node +" .slideshowBtn").css({
			left:($(node +" .goods_left").width() - $(node +" .slideshowBtn").width()) / 2
		})
	
	//鼠标滑过计算下标
	var inow = 0;
	var time = null;
	start()
	$(node +" .slideshowBtn").on("mouseenter","li",function(){
		clearInterval(time)
		inow = $(this).index();
		//初始将所有按钮样式设成无
		$(node +" .slideshowBtn li").find("span").css("width",0)
		//将鼠标滑过的按钮宽度设为40px
		$(node +" .slideshowBtn li").eq(inow).find("span").css("width",40)
		//将宽度切换到鼠标滑过的下标 * 图片的个数
		$(node +" .slideshow").stop().animate({
			left:-$(node +" .slideshow li").width() * inow
		},500)
	})
	
	//鼠标滑过ul停止播放轮播图
	$(node +" .slideshow li").on("mouseenter",function(){
		clearInterval(time)
		$(node +" .slideshowBtn li").eq(inow).find("span").css("width",40)
	})
	//鼠标移出ul恢复播放
	$(node +" .slideshow li").on("mouseleave",function(){
		start()
	})
	
	$(node +" .slideshowBtn").on("mouseleave",function(){
		start()
	})
	function start(){
		clearInterval(time)
		time = setInterval(function(){
			inow++;
			$(node +" .slideshowBtn li").find("span").css("width",0)
			//将鼠标滑过的按钮宽度设为40px
			$(node +" .slideshowBtn li").eq(inow).find("span").stop().animate({width:40},3100,function(){
				$(node +" .slideshowBtn li").find("span").css("width",0)
				
			})
		
			$(node +" .slideshow").stop().animate({
					left: -$(node +" .slideshow li").width() * inow
			},500,function(){
					if(inow >= totalSize - 1){
						inow = 0;
						$(node +" .slideshowBtn li").eq(inow).find("span").stop().animate({width:40},1800,function(){
							$(node +" .slideshowBtn li").find("span").css("width",0)
							
						})
						$(node +" .slideshow").css("left",0)
					}
				})
		},3000)
	}
	
	}