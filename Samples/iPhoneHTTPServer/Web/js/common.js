(function (doc, win) {
    // 分辨率Resolution适配
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
       // alert("clientWidth:"+clientWidth);
        docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
    };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    
    // 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
    (function(){
        //return;
        var dpr = scale =1;
        var devicePixelRatio = win.devicePixelRatio;
        
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2){
            dpr = 2;
        } else {
            dpr = 1;
        }
        
        scale = 1 / dpr;
     //  alert("devicePixelRatio:"+devicePixelRatio);
       var userAgent = navigator.userAgent;
      // alert("userAgent:"+userAgent);
           
        // 
        var metaEl = "";
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        //metaEl.setAttribute('content', 'initial-scale=' + 1 + ', maximum-scale=' + 10 + ', minimum-scale=' + 0.01 + ', user-scalable=yes');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    })();

    //更换繁体
  //  setTimeout(originChangeLanguage1, 100);
  //  function originChangeLanguage1 (language){
	 //   	var lang=common.getLanguage();
	 //   	var language;
	 //    if(lang.toLowerCase() == "zh-tw"|| lang.toLowerCase() == "zh-hk" ){
		//   	language='/css/simei_tw.ttf';
		// }else{
		// 	language='/css/simei.ttf';
		// }
		// var newStyle = document.createElement('style');
		// newStyle.appendChild(document.createTextNode("\
		// 	@font-face {\
	 //    	font-family: '汉仪细圆简';\
	 //    	src: url('"+language+"');\
	 //    	font-weight:normal;\
  //       	font-style:normal;\
		// 	}\
		// "));
		// document.head.appendChild(newStyle);
  //  }
    

        
})(document, window);



//-------------------------error 提示 aftername 上一个元素  errmess提示语
var errPrompt = function(aftName,errmess){
	$(aftName).empty().html(errmess); 
}



// 封装一些可复用的方法
var common = {};

common.dectectBroswer=function(){
	var userAgent = navigator.userAgent,
            result = '';

        if(userAgent.match(/Chrome/i)) {
            result = 'Chrome';
        } else if(userAgent.match(/Firefox/i)) {
            result = 'Firefox';
        } else if(userAgent.match(/Mobile\/[0-9A-z]{6,10} Safari/i)) {
            result = 'Mobile Safari';
        } else if(userAgent.match(/Android/i)) {
            result = 'Android';
        } else if(userAgent.match(/ucweb/i)) {
            result = 'UCWeb';
        } else if(userAgent.match(/MQQBrowser/i)) {
            result = 'QQBrowser';
        } else if(userAgent.match(/Windows Phone/i)) {
            result = 'Windows Phone';
        } else {
            result = 'Other';
        }

        return result;
}

common.dectectAppLink=function(){
	var userAgent = navigator.userAgent,
            appLink = '';
		var whichChannel = getUrlParams(window.location.href, 'channelid') || Webapp.getCookie('channelid');
		if(userAgent.match(/iPhone|iPad/i)) {
			if(userAgent.indexOf("MicroMessenger")>-1){
                
            } 
        } else if(userAgent.match(/Android/i)) {
			
        } 
		else {
            
        }

        return appLink;
}

common.getTime=function(){
	var date = new Date();
	var month = '';
	var day = '';

	if((date.getMonth()+1)<10) {
		month = '0'+(date.getMonth()+1).toString();
	} else {
		month = (date.getMonth()+1).toString();
	}

	if(date.getDate() < 10) {
		day = '0' + date.getDate().toString();
	} else {
		day = date.getDate().toString();
	}

	date = date.getFullYear() + '-' + month + '-' + day;

	return date;

}

common.checkNull=function(value){
	if(value == '' || value == null) {
			return false;
		} else {
			return true;
		}
}


common.checkUndefined=function(value){
	 if(typeof(value) == "undefined"){
		return false;
	 }else{
	 	return true;
	 }
}

common.checkNullAndUndef= function(value){
	 if(value == '' || value == null || typeof(value) == "undefined" || value== "undefined"){
		return false;
	 }else{
	 	return true;
	 }

}

common.checkPassword=function(value){
	var reg = /^[a-zA-Z0-9]*$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true
	}
}

common.checkRegisName=function(value){
	var reg = /^([a-zA-Z])([a-zA-Z0-9_-]){3,19}$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true;
	}
}

common.checkLoginName=function(value){
	var reg = /^(13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9})|([a-zA-Z0-9_-]|[\u4e00-\u9fa5a]){2,16}$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true;
	}
}

common.checkPw=function(value){
	var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true;
	}
}

common.checkPhone=function(value){
	var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9}$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true
	}
}

common.checkCode=function(value){
	var reg = /^[0-9a-zA-Z]{4}|[0-9]{6}$/;
	if(reg.exec(value) == null) {
		return false;
	} else {
		return true
	}
}

common.checkCardId=function(value){
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;	
	if(reg.exec(value) == null){
		return false;	
	}
	else{
		return true;	
	}
}

common.checkEmail=function(value){
	var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if(reg.exec(value) == null){
		return false;	
	}
	else{
		return true;	
	}
}

//空格判断
common.checkSpace=function(value){
	var reg = /\s/;
	if(reg.exec(value) == null){
		return false;		
	}
	else{
		return true;	
	}
}
//QQpanduan
common.checkqq=function(value){
	var reg = /^[1-9]\d{4,14}$/;
	if(reg.exec(value) == null){
		return false;		
	}
	else{
		return true;	
	}
}

common.checkNumber=function(value){
	var reg = /^[0-9]*$/;
	if(reg.exec(value) == null){
		return false;	
	}
	else{
		return true;	
	}
}

//判断字符串以什么开头
common.stringStart=function(value){
	var reg=value.substring(0,7);
	var start=value.charAt(0);
	if(reg=="http://" || start!="/" ){
		return false;	
	}
	else{
		return true;	
	}
}
common.checkEmoji=function(value){
	var reg = /^\:[a-z0-9_]+\:$/;
	if(reg.exec(value) == null){
		return false;	
	}
	else{
		return true;	
	}
}

common.myGetScript = function(url, id, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            callback();
            script.onload = script.onreadystatechange = null;
            //head.removeChild(script);
        }
    };
    head.appendChild(script);
}

//获取手机设置的语言
common.getLanguage = function(){
	var type=navigator.appName;
	var lang;
	if (type=="Netscape"){
		lang = navigator.language;
	}
	else{
		lang = navigator.userLanguage;
	}
	return lang;
}



//---系统判定
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};    

 

var baseTool = {};
//进度加载事件
baseTool.shadeLoad = function(){
	$("body").append('<div class="shade_load" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,.8) url(/img/loading.gif) no-repeat 50% 50%;background-size:80px 80px;"></div>');
}

//一个按钮的弹出框
baseTool.popup = function(popCont, userFunc){
	//解除关于确定按钮的所有绑定事件		
	$('.confirm').off("tap");
	if($('.mask').length>0 && $('.popup').length>0){
		$(".mask,.popup").show();
		$('.popupTextBox span').html(popCont);
	}
	else{
		$("body").append('<div class="mask"></div><div class="popup"><div class="popupTextBox"><span>'+popCont+'</span></div><div class="btnBox"><button class="btn-noBg confirm">确定</button></div></div>');
		// $(".popup").css("margin-top",-$('.popup').outerHeight() /2);
		$(".popup").css("margin-top","-1.5rem");
		$(".mask,.popup").show();
	}
	
	$(".confirm").on("touchend", null, userFunc,  function(event){
		event.preventDefault();
		if(event.data){
			userFunc();
		}
		$(".mask,.popup").remove();
		//$(this).trigger("click");
	});
	// $(".confirm").on("click",null, userFunc, function(event){
	// 	if(event.data){
	// 		userFunc();
	// 	}
	// 	$(".mask,.popup").remove();
	// });
}

//一个按钮的弹出框
baseTool.popupNoButton = function(popCont){
	//解除关于确定按钮的所有绑定事件		
	$('.close_button').off("tap");
	if($('.mask').length>0 && $('.popup').length>0){
		$(".mask,.popup").show();
		$('.popupTextBox span').html(popCont);
	}
	else{
		$("body").append('<div class="mask"></div><div class="popup"><img class="close_button" src="/img/cha@2x.png" style="float:right;width:0.16rem;"><div class="popupTextBox"><span><img src="/img/loading3.gif"/>'+popCont+'</span></div></div>');
		// $(".popup").css("margin-top",-$('.popup').outerHeight() /2);
		$(".popup").css("margin-top","-1rem");
		$(".popup").css("padding","0");
		$(".popupTextBox").css("padding","0.24rem");
		$(".mask,.popup").show();
	}
	$(".close_button").on("tap", function(e){
		e.preventDefault();
		$(".mask,.popup").remove();
	})
}


baseTool.showPopup = function(popCont,btn_content){
	$('.confirm').off("tap");
	if($('.mask').length>0 && $('.popup').length>0){
		$(".mask,.popup").show();
	}
	else{
		$("body").append('<div class="mask"></div><div class="popup"><div class="popupTextBox"><span>'+popCont+'</span></div><div class="btnBox"><button class="btn-noBg confirm">'+btn_content+'</button></div></div>');
		//$(".popup").css("margin-top",-$('.popup').outerHeight() / 2);
		$(".popup").css("margin-top","-1rem");
		$(".mask,.popup").show();
	}
	
	$(".confirm").on("tap",function(){
		$(".mask,.popup").remove();
	});
}

//模仿active
baseTool.actMo = function(classN,classS){
	 $(classN).live("mousedown",function() {
        $(this).addClass(classS);
     });
	$(classN).live("mouseup",function() {
         $(this).removeClass(classS);
     });
}


// 获取url参数 - REFFER->rapidborrowing-stock.js
baseTool.getUrlParams = function(url, n) {
	var hrefstr, pos, parastr, para, tempstr;
    hrefstr = url;
    pos = hrefstr.indexOf("?");
    parastr = hrefstr.substring(pos + 1);
    para = parastr.split("&");
    tempstr = "";
    for (var i = 0; i < para.length; i++) {
        tempstr = para[i];
        pos = tempstr.indexOf("=");
        if (tempstr.substring(0, pos).toLowerCase() == n.toLowerCase()) {
            return decodeURIComponent(tempstr.substring(pos + 1));
        }
    }
    return null;
}
/* 
 * 获取URL参数
 * 使用方法：UrlRequest();
 * 结果：返回一个对象，用键值对方式获取参数具体的值，例如 var project = UrlRequest().project;
 * 
 * */
baseTool.UrlRequest = function() { 
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
}


//去除逗号 
baseTool.delDou = function(douValue) { 		
	douValue = douValue.replace(/,/g,'');
	return parseFloat(douValue);
}

//-----逗号分隔
baseTool.fixMoneyFormat = function(_) {
    var _ = _ && "undefined" != _ && 0 != _ ? Number(_).toFixed(2) : "0.00";
    return _ = _.toString(), _ = _.split("").reverse().join("").replace(/(\d{3})/g, "$1,").split("").reverse().join(""), _.length > 0 && "," == _.charAt(0) && (_ = _.substr(1)), _ = _.replace(".,", ".")
}



var thirdPath = {};
//----返回第三方原生 回退键
thirdPath.goBack = function() {
	var pathname = location.pathname;
	var length=pathname.lastIndexOf('/')+1;
	var lastLength=pathname.indexOf('?');
	var href = "";
	if(lastLength==-1){
		href=pathname.substring(length);
	}else{
		href=pathname.substring(length,lastLength);
	}
	
    if(href == "subject_stick.html"){    
        try{
            //关闭评论输入框但不关闭页面（分享专用）
  		    Share.originDiscussViewHiddenTopicIdShare(false);
	        //android关闭原生窗口
			Share.finishAndroid();
		}catch(ex){
	    	console.info("缺少原生对象%o");
	    } 
    }
    if(href == "circle_secondary_pages.html"){    
        try{
	        //android关闭原生窗口
			Share.finishAndroid();
		}catch(ex){
	    	console.info("缺少原生对象%o");
	    } 
    } 

   
    var location_href=window.location.href.substring(window.location.href.lastIndexOf('/')+1);

    if(location_href=="reast_implants_8.html" || location_href=="reast_implants_9.html" || location_href=="reast_implants_10.html" || location_href=="reast_implants_11.html" || location_href=="reast_implants_12.html" || location_href=="reast_implants_13.html"||
    	location_href=="reast_implants_tw_8.html" || location_href=="reast_implants_tw_9.html" || location_href=="reast_implants_tw_10.html" || location_href=="reast_implants_tw_11.html" || location_href=="reast_implants_tw_12.html" || location_href=="reast_implants_tw_13.html"){
    	gfurox.setVarLocalStorage("moreProblem", "right");
    }else if(location_href=="reast_implants_1.html" || location_href=="reast_implants_2.html" || location_href=="reast_implants_3.html" || location_href=="reast_implants_4.html" || location_href=="reast_implants_5.html" || location_href=="reast_implants_6.html"|| location_href=="reast_implants_7.html"||
    	location_href=="reast_implants_tw_1.html" || location_href=="reast_implants_tw_2.html" || location_href=="reast_implants_tw_3.html" || location_href=="reast_implants_tw_4.html" || location_href=="reast_implants_tw_5.html" || location_href=="reast_implants_tw_6.html"|| location_href=="reast_implants_tw_7.html"){
    	gfurox.setVarLocalStorage("moreProblem", "left");
    }
	window.history.back(-1);
}


//进入页面（ios、Android专用）
thirdPath.pageReady1=function(currentUrl){
	 var href;
	var length=currentUrl.lastIndexOf('/')+1;
	var lastLength=currentUrl.indexOf('?');
	if(lastLength==-1){
		href=currentUrl.substring(length);
	}else{
		href=currentUrl.substring(length,lastLength);
	}
     

    if(href=="dynamic.html" || href=="circle_homepage.html" || href=="mymenu.html"){
	    	//显示第三方元素（动态，智能，圈子，我的）
	    	Share.originTabBarHidden(true);
	       //隐藏第三方评论回复键盘
	       Share.originDiscussViewHiddenTopicId(false,"");
	 
    }else if (href=="subject_stick.html") {
    	//关闭第三方元素（动态，智能，圈子，我的）
	    Share.originTabBarHidden(false);
    }else if(href=="personal_dynamic.html"){
    	//隐藏第三方评论回复键盘
	    Share.originDiscussViewHiddenTopicIdShare(false);
	    //关闭第三方元素（动态，智能，圈子，我的）
    	Share.originTabBarHidden(false);
    }
    else{
    	//关闭第三方元素（动态，智能，圈子，我的）
    	Share.originTabBarHidden(false);    
    }
}


var doDiffInIosAndroid = {};

doDiffInIosAndroid = {
	cssDiff:function(){
		if(browser.versions.android == true){
			$(".ifra").addClass("titleAndroid");
			$(".title_bottom").addClass("dynamicAndroid");
		}
	}
};


//话题内容解析原生表情
function replace_face(textview){
		var replace="";
		//textview="哈哈，test[晕][晕][发怒][发怒][愉快][愉快]";
		if(common.checkNullAndUndef(textview)){
		replace = textview.replace(/\[呲牙]/g,"<img src='/img/face/sm01.png'/>")
						.replace(/\[憨笑]/g,"<img src='/img/face/sm02.png'/>")
		            	.replace(/\[害羞]/g, "<img src='/img/face/sm03.png'/>")
		           	    .replace(/\[晕]/g, "<img src='/img/face/sm04.png'/>")
						.replace(/\[流泪]/g, "<img src='/img/face/sm05.png'/>")
                        .replace(/\[饿]/g, "<img src='/img/face/sm06.png'/>")
                        .replace(/\[疯了]/g, "<img src='/img/face/sm07.png'/>")
                        .replace(/\[无语]/g, "<img src='/img/face/sm08.png'/>")
                        .replace(/\[愉快]/g, "<img src='/img/face/sm09.png'/>")
                        .replace(/\[发怒]/g, "<img src='/img/face/sm10.png'/>")
                        .replace(/\[尴尬]/g, "<img src='/img/face/sm11.png'/>")
                        .replace(/\[微笑]/g, "<img src='/img/face/sm12.png'/>")
                    	.replace(/\[困了]/g, "<img src='/img/face/sm13.png'/>")
                    	.replace(/\[钱]/g, "<img src='/img/face/sm14.png'/>")
                    	.replace(/\[偷笑]/g, "<img src='/img/face/sm15.png'/>")
                    	.replace(/\[酷]/g, "<img src='/img/face/sm16.png'/>")
                    	.replace(/\[衰]/g, "<img src='/img/face/sm17.png'/>")
                    	.replace(/\[惊讶]/g, "<img src='/img/face/sm18.png'/>")
                    	.replace(/\[指责]/g, "<img src='/img/face/sm19.png'/>")
                    	.replace(/\[鄙视]/g, "<img src='/img/face/sm20.png'/>")
                    	.replace(/\[抠鼻]/g, "<img src='/img/face/sm21.png'/>")
                    	.replace(/\[色]/g, "<img src='/img/face/sm22.png'/>")
                    	.replace(/\[鼓掌]/g, "<img src='/img/face/sm23.png'/>")
                    	.replace(/\[伤心]/g, "<img src='/img/face/sm24.png'/>")
                    	.replace(/\[思考]/g, "<img src='/img/face/sm25.png'/>")
                    	.replace(/\[恶心]/g, "<img src='/img/face/sm26.png'/>")
                    	.replace(/\[快乐]/g, "<img src='/img/face/sm27.png'/>")
                    	.replace(/\[萌萌哒]/g, "<img src='/img/face/sm28.png'/>")
                    	.replace(/\[白眼]/g, "<img src='/img/face/sm29.png'/>")
                    	.replace(/\[瞧不起]/g, "<img src='/img/face/sm30.png'/>")
                    	.replace(/\[看不惯]/g, "<img src='/img/face/sm31.png'/>")
                    	.replace(/\[嘘]/g, "<img src='/img/face/sm32.png'/>")
                    	.replace(/\[认错]/g, "<img src='/img/face/sm33.png'/>")
                    	.replace(/\[哈欠]/g, "<img src='/img/face/sm34.png'/>")
                    	.replace(/\[压力]/g, "<img src='/img/face/sm35.png'/>")
                    	.replace(/\[疑问]/g, "<img src='/img/face/sm36.png'/>")
                    	.replace(/\[没问题]/g, "<img src='/img/face/sm37.png'/>")
                    	.replace(/\[羞羞]/g, "<img src='/img/face/sm38.png'/>")
                    	.replace(/\[快哭了]/g, "<img src='/img/face/sm39.png'/>")
                    	.replace(/\[再见]/g, "<img src='/img/face/sm40.png'/>")
                    	.replace(/\[囧]/g, "<img src='/img/face/sm41.png'/>")
                    	.replace(/\[强]/g, "<img src='/img/face/sm42.png'/>")
                    	.replace(/\[弱]/g, "<img src='/img/face/sm43.png'/>")
                    	.replace(/\[给力]/g, "<img src='/img/face/sm44.png'/>")
                    	.replace(/\[云]/g, "<img src='/img/face/sm45.png'/>")
                    	.replace(/\[朋友]/g, "<img src='/img/face/sm46.png'/>")
                    	.replace(/\[V5]/g, "<img src='/img/face/sm47.png'/>")
                    	.replace(/\[相机]/g, "<img src='/img/face/sm48.png'/>")
                    	.replace(/\[小车]/g, "<img src='/img/face/sm49.png'/>")
                    	.replace(/\[飞机]/g, "<img src='/img/face/sm50.png'/>")
                    	.replace(/\[求爱]/g, "<img src='/img/face/sm51.png'/>")
                    	.replace(/\[奥特曼]/g, "<img src='/img/face/sm52.png'/>")
                    	.replace(/\[兔子]/g, "<img src='/img/face/sm53.png'/>")
                    	.replace(/\[熊猫]/g, "<img src='/img/face/sm54.png'/>")
                    	.replace(/\[NO]/g, "<img src='/img/face/sm55.png'/>")
                    	.replace(/\[OK]/g, "<img src='/img/face/sm56.png'/>")
                    	.replace(/\[大拇指]/g, "<img src='/img/face/sm57.png'/>")
                    	.replace(/\[勾引]/g, "<img src='/img/face/sm58.png'/>")
                    	.replace(/\[胜利]/g, "<img src='/img/face/sm59.png'/>")
                    	.replace(/\[爱你]/g, "<img src='/img/face/sm60.png'/>")
                    	.replace(/\[拳头]/g, "<img src='/img/face/sm61.png'/>")
                    	.replace(/\[差劲]/g, "<img src='/img/face/sm62.png'/>")
                    	.replace(/\[友好]/g, "<img src='/img/face/sm63.png'/>")
                    	.replace(/\[玫瑰花]/g, "<img src='/img/face/sm64.png'/>")
                    	.replace(/\[爱心]/g, "<img src='/img/face/sm65.png'/>")
                    	.replace(/\[心碎]/g, "<img src='/img/face/sm66.png'/>")
                    	.replace(/\[猪]/g, "<img src='/img/face/sm67.png'/>")
                    	.replace(/\[咖啡]/g, "<img src='/img/face/sm68.png'/>")
                    	.replace(/\[麦克风]/g, "<img src='/img/face/sm69.png'/>")
                    	.replace(/\[晚安]/g, "<img src='/img/face/sm70.png'/>")
                    	.replace(/\[太阳]/g, "<img src='/img/face/sm71.png'/>")
                    	.replace(/\[干一杯]/g, "<img src='/img/face/sm72.png'/>")
                    	.replace(/\[萌]/g, "<img src='/img/face/sm73.png'/>")
                    	.replace(/\[礼物]/g, "<img src='/img/face/sm74.png'/>")
                    	.replace(/\[互粉]/g, "<img src='/img/face/sm75.png'/>")
                    	.replace(/\[时间]/g, "<img src='/img/face/sm76.png'/>")
                    	.replace(/\[自行车]/g, "<img src='/img/face/sm77.png'/>")
                    	.replace(/\[生日蛋糕]/g, "<img src='/img/face/sm78.png'/>")
                    	.replace(/\[围巾]/g, "<img src='/img/face/sm79.png'/>")
                    	.replace(/\[手套]/g, "<img src='/img/face/sm80.png'/>")
                    	.replace(/\[雪花]/g, "<img src='/img/face/sm81.png'/>")
                    	.replace(/\[雪人]/g, "<img src='/img/face/sm82.png'/>")
                    	.replace(/\[帽子]/g, "<img src='/img/face/sm83.png'/>")
                    	.replace(/\[树叶]/g, "<img src='/img/face/sm84.png'/>")
                    	.replace(/\[足球]/g, "<img src='/img/face/sm85.png'/>");
		}
        return replace;
	}