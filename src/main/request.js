function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    createXHR = function() {
      return new XMLHttpRequest();
    };
  } else {
    createXHR = function() {
      throw new Error("没有可用的xhr，不考虑pc兼容性，自行捕捉异常降级处理");
    };
  }
  return createXHR();
}

function request(opts) {
  var url = opts.url,
    method = "GET",
    timeout = opts.timeout || 10000;
  var xhr = createXHR();
	var promise = new Promise((rs,rj)=>{
		xhr.onreadystatechange = function() {
			var data = null;
			if (xhr.readyState === 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					rs({content:xhr.responseText});
				} else {
					rj("请求失败 ： ,http状态码："+xhr.status+'  xhr.readyState:'+xhr.readyState);
				}
			}
		}
		if (timeout) {
			xhr.timeout = timeout;
			xhr.ontimeout = function(e) {
				if (xhr.readyState < 4) {
					xhr.abort();
					rj('请求超时');
				}
			};
		}
	})

  xhr.open(method, url);
	xhr.send(null);
	return promise;
}

export default request;
