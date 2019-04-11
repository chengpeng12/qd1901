$(function(){
	var oSpan = $(".goods_bottom .samll_pic span")
	var oImg = $(".goods_bottom .big_pic img")
	$(".goods_bottom .samll_pic").mouseenter(function(){
		oSpan.css("display","block")
		$(".goods_bottom .big_pic").css("display","block")
	
	})
	$(".goods_bottom .samll_pic").mouseleave(function(){
		oSpan.css("display","none")
		$(".goods_bottom .big_pic").css("display","none")
	
	})
		
		$(".goods_bottom .samll_pic").mousemove(function(ev){
			var l = ev.clientX - 112 - $(".goods_bottom .samll_pic").offset().left;
			if(l < 0){
				l = 0;
			}else if(l > $(".goods_bottom .samll_pic").width() - $(".goods_bottom .samll_pic span").width()){
				l = $(".goods_bottom .samll_pic").width() - $(".goods_bottom .samll_pic span").width();
			}
			var t = ev.pageY - 112 - $(".goods_bottom .samll_pic").offset().top;
			if(t < 0){
				t = 0
			}else if(t > $(".goods_bottom .samll_pic").height() - $(".goods_bottom .samll_pic span").height()){
				t = $(".goods_bottom .samll_pic").height() - $(".goods_bottom .samll_pic span").height()
			}
			oSpan.css("left",l)
			oSpan.css("top",t)
			oImg.css("left",-l * 2)
			oImg.css("top",-t * 2)
		})
		
		var Goods_cookieStr = $.cookie("Goods_details")
		var arr = JSON.parse(Goods_cookieStr)
		
		$(".content_box .goods_bottom .samll_pic img").attr("src",arr.img)
		$(".content_box .goods_bottom .big_pic img").attr("src",arr.img)
		$(".content_box .goods_bottom .txt .title h2").html(arr.title)
		$(".content_box .goods_bottom .money h2").html(arr.money)


		//购物车操作
		car()
		count()
		//点击购物车记录当前商品信息
		$(".goods_list1").on("click",".goods_car",function(){
			ball(this)
			//记住当前点击id
			var id = this.id;
			//判断有没有购物车cookie记录
			var isYes = $.cookie("goods") == null? true : false;
			
			if(isYes){
				//如果没有，添加一条数据（当前的id，物品数量设成1）
				$.cookie("goods",`[{id:${id},num:1}]`,{
					path:"/"
				})
				count()
			}else{
				//如果有之前有cookie记录 判断有没有当前点击的这一条记录				
				var cookieStr = $.cookie("goods");
				//将cookie字符串解析为数组
				var arr = eval(cookieStr)
				//假设没有这条记录
				var isYes = false;
				//通过循环判断数组里的id是否和当前所点击的id相同
				for(var i = 0;i < arr.length;i++){
					if(arr[i].id == id){
						//如果有相同的id 将isyes设成true
						isYes = true;
						//并将数量加1
						arr[i].num++;						
					}
				}
				if(!isYes){
					//如果没有 新增一条数据
					arr.push({id:id,num:1})
					
				}
				
				//将数组转为json格式的字符串 并存入cookie
				$.cookie("goods",JSON.stringify(arr),{
					path:"/"
				})
				count()
			}
			
			//为购物车添加商品
			$.ajax({
				url:"../json/shopping.json",
				success:function(data){
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr)
					$(".car_center").html("")
					var sum = 0;
					for(var i = 0;i < arr.length;i++){
						for(var j = 0; j < data.length;j++){
							for(var k = 0;k < data[j].goods.length;k++){
								var money = data[j].goods[k].money
								money = money.substring(1,money.length)
								money = parseFloat(arr[i].num) *  parseFloat(money);
								sum += money;					
				
								car()
							}
						}
						
					}
					$(".car_bottom .sum_money").html("￥" + parseFloat(sum))
				},
				error:function(error){
					alert(error)
				}
			})
		})
		
		function car(){
			$(".car_center").html("")
			if($.cookie("goods")){
				$.ajax({
				url:"../json/shopping.json",
				success:function(data){
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr)
					$(".car_center").html("")
					var sum = 0;
					for(var i = 0;i < arr.length;i++){
						for(var j = 0; j < data.length;j++){
							for(var k = 0;k < data[j].goods.length;k++){
								if(data[j].goods[k].id == arr[i].id){
									var money = data[j].goods[k].money
									money = money.substring(1,money.length)
									money = arr[i].num * money									
									sum += money;										
									$(`
										<li class="goods">
											<div class="goods_img">
												<img src="${data[j].goods[k].img}" alt="" />
											</div>
											<div class="goods_txt">
												<div class="txt">${data[j].goods[k].txt[0]}</div>
												<div class="unit_price">
													<span class="money">${data[j].goods[k].money}</span>
													x
													<span class="txt_num">${arr[i].num}</span>
												</div>
												<div class="sum">
													<button id="${arr[i].id}" class="add">+</button>
													<span class="num">${arr[i].num}</span>
													<button id="${arr[i].id}" class="minus">-</button>
												</div>
											</div>
											<div class="goods_money">￥${money}</div>
											<button id="${arr[i].id}" class="remove_goods">X</button>
										</li>	
									`).appendTo(".car_center")
								}
							}
						}
						
					}
					$(".car_bottom .sum_money").html("￥"+sum)
				},
				error:function(error){
					alert(error)
				}
			})
			}else{
				$(".car_center").html("")
			}
			
				
		}
		
		//计算商品数量
		function count(){
			if($.cookie("goods")){
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				var sum = 0;
				for(var i = 0; i < arr.length;i++){
					sum += arr[i].num
				}
				$(".car_bottom .count .num span").html(sum);
				$(".right_shopping_left .shopping_car span").html(sum)
			}else{
				$(".car_bottom .count .num span").html("0");
				$(".right_shopping_left .shopping_car span").html("0")
			}
				
		}
		
		//计算总价格
		function sum_money(){
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr)
			//计算所有商品的总价格
			var count = $(".car_center .goods");
			var sum_money = 0;
			for(var i = 0; i <　count.length;i++){
				var one_money = $(".car_center .goods").eq(i).find(".goods_money").text()				
				one_money = one_money.substring(1,one_money.length)				
				sum_money += Number(one_money)
			}
			$(".car_bottom .sum_money").html("￥"+sum_money)
			
		}
		//购物车加减
		$(".car_center").on("click",".goods .goods_txt .sum button",function(){
			var id = this.id;
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr)
			if(this.innerHTML == "+"){
				for(var i = 0;i < arr.length;i++){
					if(arr[i].id == id){
						arr[i].num++;
						$(this).siblings(".num").html(arr[i].num);
						$(this).parents(".sum").siblings(".unit_price").find(".txt_num").html(arr[i].num);	
					}
				}
			}else{
				for(var i = 0;i < arr.length;i++){
					if(arr[i].id == id){
						arr[i].num--;
						if(arr[i].num < 1){
							
							arr[i].num = 1;
							alert("已经是最后一件了")
						}
						$(this).siblings(".num").html(arr[i].num);
						$(this).parents(".sum").siblings(".unit_price").find(".txt_num").html(arr[i].num);
					}
				}
			}	
			//计算单个商品的总价格
			//获取当前元素节点的父节点 的兄弟节点
			var node = $(this).parents(".sum").siblings(".unit_price");
			//获取父节点中的兄弟节点下的money节点和txt_num节点
			var money = node.find(".money").html()
			var num = node.find(".txt_num").html()
			money = money.substring(1,money.length)
			//计算总价格
			var sum = money * num;
			//改变它的文本
			$(this).parents(".goods_txt").siblings(".goods_money").html("￥" + sum)
		
			$.cookie("goods",JSON.stringify(arr),{
				path:"/"
			})
			count()
			sum_money()
			
		})
		
		//删除购物车
		$(".car_center").on("click",".goods .remove_goods",function(){
			var id = this.id;
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr);
			for(var i = 0;i < arr.length;i++){
				if(arr[i].id == id){
					arr.splice(i,1)
				}
				$(this).parents(".goods").remove()
			}
			$.cookie("goods",JSON.stringify(arr),{
				path:"/"
			})
			count()
			sum_money()
		})
		//抛物线
		function ball(node){
				var x = $(".right_shopping_left .shopping_car span").offset().left - $(node).offset().left;
				var y = $(".right_shopping_left .shopping_car span").offset().top - $(node).offset().top;
				$("#ball").css("display","block")
				$("#ball").css("left",node.offsetLeft).css("top",node.offsetTop)
				var parabola = new Parabola({
					el:$("#ball"),
					offset:[x,y],
					duration:500,
					curvatrue:0.001,
					callback:function(){
						$("#ball").css("display","none")
					},
					autostart:true
				})	
			}
		
		//查看购物车
		$(".right_shopping_right .car_bottom .look_car button").click(function(){
			window.open("../html/order.html")
		})
		
})

//右侧购物车
$(function(){
	var isYes = false;
	$(".right_shopping .shopping_car").click(function(){
		if(!isYes){
			$(".right_shopping").stop().animate({right:0},300,function(){
				isYes = true;
			})
			
		}
		if(isYes){
			$(".right_shopping").stop().animate({right:-260},300,function(){
				isYes = false;
			})
			
		}
	})
})
