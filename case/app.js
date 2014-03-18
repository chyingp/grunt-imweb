var App = (function(){

	var jsUrl = uri('out.js'); // 用例：资源定位，js-js
	var cssUrl = uri('out.css');	// 用例：资源定位，js-css
	var imglUrl = uri('out.img');  // 用例：资源定位，js-img
	var htmlUrl = uri('out.html');  // 用例：资源定位，js-其他？？

	var jsCtn = __inline('out.js');  // 用例：资源内联，js-js
	var cssCtn = __inline('out.css');  // 用例：资源内联，js-css
	var imgCtn = __inline('out.img');  // 用例：资源内联，js-img
	var htmlCtn = __inline('out.html');  // 用例：资源内联，js-html

	var exports = {
		init: function(){},
		show: function(){},
		hide: function(){},
		destroy: function(){}
	};
})();