
/* http请求类 get / post */

var client = {};

client.quest = function (option, callback) {
    var url = option.url;
    var method = option.method;
    var data = option.data;
    var timeout = option.timeout || 0;

    var xhr = new XMLHttpRequest();
    (timeout > 0) && (xhr.timeout = timeout);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
            var result = xhr.responseText;
            try {result = JSON.parse(xhr.responseText);} catch (e) {}
                callback && callback(null, result);
            } else {
                callback && callback('status: ' + xhr.status);
            }
        }
    }.bind(this);

    xhr.ontimeout = function () {
        callback && callback('timeout');
        console.log('%c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
    };

	var params = [];
	for (var key in data){
		params.push(key + '=' + data[key]);
	}
	var postData = params.join('&');
    if (method == 'post') {
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xhr.send(postData);
    }
    else if (method == 'get') {
    	xhr.open(method, url + '?' + postData, true);
		xhr.send(null);
    }
};

client.get = function (url, callback) {
    var option = url.url ? url : { url: url };
    option.method = 'get';
    this.quest(option, callback);
};

client.post = function (option, callback) {
    option.method = 'post';
    this.quest(option, callback);
};

/*
使用如下：

<script type="text/javascript">
        function getNoParameter(){
            client.get({url:'http://localhost:8080/ipa/list_json'},function(err,result){
                if (!err) {
                    for(var b in result){
                        alert(">> "+result[b].ipaBundleId+" ipaOrApk:"+result[b].ipaOrApk);
                    }
                }
                else {
                    alert("请求失败："+err.message);
                }
            });
        }
        function getWithParameter(){
            var d = {'ipaBundleId':'com.anody.easyhome','ipaOrApk':1};
            client.get({url:'http://localhost:8080/ipa/app_json',data:d},function(err,result){
                if (!err) {
                     alert(">> "+result.datas.ipaDisplayName);
                }
                else {
                    alert("请求失败："+err.message);
                }
            });
        }
        function postClick(){
            var d = {'ipaBundleId':'com.soffice.TronkerEnterprise','ipaOrApk':0};
            client.post({url:'http://localhost:8080/ipa/delete_json',data:d},function(err,result){
                if (!err) {
                    alert(">> "+result.message);
                }
                else {
                    alert("请求失败："+err.message);
                }
            });
        }
    </script>
*/