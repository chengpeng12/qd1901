$(function(){
	$(".VerificationCode_prompt").css("display","block")
	//用户名
	$(".username_prompt").css("color","red")
	$(".username").focus(function(){
		$(".username_prompt").css("display","block")
	})
	
	$(".username").blur(function(){
		var str = $(".username").val()
		if(/\d/.test(str[0])){
			$(".username_prompt").html("首位不能是数字")
		}else if(str.length < 8 || str.length > 16){
			$(".username_prompt").html("用户名的长度不能小于8或者大于16位")
		}else if(/\W+/.test(str)){
			$(".username_prompt").html("用户名只能以数字字母下划线组成")
		}else{
			$(".username_prompt").html("恭喜，可以注册")
			$(".username_prompt").css("color","green")
		}
	})
	
	//密码
	$(".password_prompt").css("color","red")
	

	$(".password").focus(function(){
		$(".password_prompt").css("display","block")
		$(".intensity").css("display","block")
	})
	$(".password").blur(function(){
		var str = $(".password").val()
		str = str.replace(/" "/g,"")
		$(".password").val(str)
		if(str.length < 6 || str.length > 18){
			$(".password_prompt").html("长度6~18位")
		}else{
			$(".password_prompt").html("密码安全")
			$(".password_prompt").css("color","green")
		}		
	})
	
	$(".password").keyup(function(){
		var str = $(".password").val()
		str = str.replace(/" "/g,"")
		$(".password").val(str)
		if(/^\d+$/.test(str) || /^[a-z]+$/.test(str) || /^[A-Z]+$/.test(str)){
			$(".intensity div").css("background","grey")
			$(".intensity div").eq(0).css("background","lightcoral")
		}else if(/\d/.test(str) && /[a-z]/.test(str) && /[A-Z]/.test(str)){
			$(".intensity div").css("background","grey")
			$(".intensity div").eq(2).css("background","green")
		}else if(str = ""){
			$(".intensity div").css("background","grey")
			$(".password_prompt").html("请输入密码")
		}else{
			$(".intensity div").css("background","grey")
			$(".intensity div").eq(1).css("background","yellow")
		}
	})
	
	//确认密码
	$(".newPassword").blur(function(){
		$(".newPasswoed_prompt").css("color","red")
		$(".newPasswoed_prompt").css("display","block")
		if($(".password").val() == ""){
			$(".newPasswoed_prompt").html("密码不能为空")
		}else if($(".password").val() == $(".newPassword").val()){
			$(".newPasswoed_prompt").html("密码正确")
			$(".newPasswoed_prompt").css("color","green")
		}else{
			$(".newPasswoed_prompt").html("两次密码不一致")
		}
	})
	
	//手机号
	$(".phone").blur(function(){
		$(".phone_prompt").css("display","block");
		$(".phone_prompt").css("color","red");
		if(/^(13|15|17|18)\d{9}$/.test($(".phone").val())){
			$(".phone_prompt").html("手机号格式正确")
			$(".phone_prompt").css("color","green");
		}else(
			$(".phone_prompt").html("手机号格式错误")
		)
	})
	
	//验证码
	//随机数字
	$(".VerificationCode_prompt").click(function(){
		$(".code").html(randomNum(4))
	})
	//判断验证码是否正确
	$(".VerificationCode").blur(function(){
		$(".code_prompt").css("display","block")
		if($(".VerificationCode").val() == $(".code").html()){
			$(".code_prompt").html("验证码正确")
			$(".code_prompt").css("color","green")
		}else{
			$(".code_prompt").html("验证码错误")
			$(".code_prompt").css("color","red")
		}
	})
	
	//短信验证码
	//获取短信验证码
	var str = 0;
	$(".sms_code").click(function(){
		str = randomNum(5)
		alert(str)
	})
	
	//判断
	$(".sms").blur(function(){
		$(".sms_prompt").css("display","block")
		if($(".sms").val() == str){
			$(".sms_prompt").html("短信验证成功")
			$(".sms_prompt").css("color","green")
		}else if($(".sms").val() == ""){
			$(".sms_prompt").html("请输入验证码")
			$(".sms_prompt").css("color","red")
		}else{
			$(".sms_prompt").html("验证码错误")
			$(".sms_prompt").css("color","red")
		}
	})
	
	//验证邮箱
	$(".email").blur(function(){
		var str = $(".email").val()
		$(".email_pormpt").css("display","block")
		if(/^\w+@\w{2,4}\.\w{2,4}$/.test(str)){
			$(".email_pormpt").html("邮箱验证成功")
			$(".email_pormpt").css("color","green")
		}else{
			$(".email_pormpt").html("邮箱格式错误")
			$(".email_pormpt").css("color","red")
		}
	})
	
	//点击注册
	$(".registered").click(function(){
		/*if($(".username_prompt").html() != "恭喜，可以注册" || $(".password_prompt").html() != "密码安全" || $(".newPasswoed_prompt").html() != "密码正确" || $(".phone_prompt").html() != "手机号格式正确" || $(".code_prompt").html() != "验证码正确" || $(".email_pormpt").html() != "邮箱验证成功"){
			alert("请检查填写信息是否正确")
		}else{*/
			var str = getStr(".registerde_bottom"); 
			
			$.ajax({
				type:"POST",
				url:"../php/registered.php",
				data:str,
				success:function(data){					
					alert(data)
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					alert("错误" + errorThrown)
				}
			})
			
		/*}*/
	})
	
})
	
function getStr(node){
	var str = "";
	for(var i = 0;i < $(node + " input").size();i++){
		str += $(node + " input").eq(i).attr("name") + "=" + $(node + " input").eq(i).val() + "&"
	}
	return str
}
	
function randomNum(n){
	var arr = [];
	for(var i = 0; i < n;i++){
		var str = parseInt(Math.random() * 10)
		arr.push(str)
	}
	var num = arr.join("")
	return num;
}
