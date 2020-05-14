'use strict';

var http = null;
var title = "王牌消消乐";
var desc = "为了领张电影票  我居然把这游戏玩完了！";
var link = 'http://www.gamedo.net/movie/JJ/';
var imgUrl = 'http://www.gamedo.net/movie/JJ/res/res/icon.jpg';
//中奖有效日期
var startMonth = 9;
var startDay = 25;
var startHour = 12;
var endDay = 30;
var endMonth = 10;
var endHour = 12;

var isCanChouJiang=false;
var isFenxiang = false;
//服务器接口
var serverurl="https://www.gamedo.net/";
//获取微信认证接口
var weixin=serverurl+"wechatjj.action";
//游戏名次接口
var scoreRank=serverurl+"scorelottery.action";
//判断是否中奖接口
var zhongJiang=serverurl+"checklottery.action";
//提交中奖用户信息接口
var zhongJiangUser=serverurl+"commitlottery.action";
//微信公众号URL
var wxUrl = "http://url.cn/2CxiseP";
//未中奖URL
var faileUrl = "http://mp.weixin.qq.com/s?__biz=MzA5NzU1MDU1Ng==&mid=502767698&idx=1&sn=c6cf0a93a64d05ca24d84a7cd359af0e";
//中奖URL
var winUrl = "http://mp.weixin.qq.com/s?__biz=MzA5NzU1MDU1Ng==&mid=502767700&idx=1&sn=5b2d4ae20ce745e0836609c4eb82e8e6";

var bg=null;
var click=null;


function playMusic()
{
	
	bg = document.getElementById("bg");
	bg.play();
	bg.pause();
	bg.play();
	
	
	click = document.getElementById("click");
	click.play();
	click.pause();


}


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}



if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	http = new XMLHttpRequest();
} else {
	// code for IE6, IE5
	http = new ActiveXObject("Microsoft.XMLHTTP");
}

function shareConfig(title, desc, link, imgUrl) {
	if(!window.wx) return;

	// 分享给朋友
	wx.onMenuShareAppMessage({
		title: title,
		desc: desc,
		link: link,
		imgUrl: imgUrl,
		success: function(res) {
			if(isCanChouJiang)
			{goShareScene();}
		},
		fail: function(res) {
		}
	});

	// 分享到朋友圈
	wx.onMenuShareTimeline({
		title: desc,
		desc: desc,
		link: link,
		imgUrl: imgUrl,
		success: function(res) {
			if(isCanChouJiang)
			{goShareScene();}
		},
		fail: function(res) {
		}
	});

	// 分享到QQ
	wx.onMenuShareQQ({
		title: title,
		desc: desc,
		link: link,
		imgUrl: imgUrl,
		success: function(res) {
			if(isCanChouJiang)
			{goShareScene();}
		},
		fail: function(res) {
		}
	});

	// 分享到微博
	wx.onMenuShareWeibo({
		title: title,
		desc: desc,
		link: link,
		imgUrl: imgUrl,
		success: function(res) {
			if(isCanChouJiang)
			{goShareScene();}
		},
		fail: function(res) {
		}
	});
}

function wxInit() {
	if (http.readyState == 4 && http.status == 200) {
		var d = http.responseText;
		var obj = JSON.parse(d);

		wx.config({
			debug: false,
			appId: 'wx8923c424f092e0af',
			timestamp: obj.timestamp,
			nonceStr: obj.nonceStr,
			signature: obj.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo'
			]
		});

		wx.ready(function() {
			playMusic();

			shareConfig(title, desc, link, imgUrl);


		});
	}
}

window.onload = function() {
	if (!http) {
		alert('您的浏览器不支持AJAX！');
		return;
	}
	var url = "http://www.gamedo.net:8889/get_sign?game_url=" + encodeURIComponent(location.href).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	http.open("GET", url, true);
	http.onreadystatechange = wxInit;
	http.send();

};
