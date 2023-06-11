$(document).ready(function () { 
	//读取图片路径
	var oldpath = $("#oldimagepath").val();
	var newpath = $("#newimagepath").val();

	//若为空字符串，则结束加载
	if(isEmptyStr(oldpath) || isEmptyStr(newpath)){
		return ;
	}

	//for循环替换图片的src的前缀
	var imgs =$("body img");
	for(var i=0;i<imgs.length;i++){
		var img = imgs.get(i);	//DOM元素转JQuery元素
        var srcpath = img.src;
		if(srcpath.includes(oldpath)){
			srcpath = srcpath.replace(oldpath,newpath);
			img.src = srcpath;
		}
	}

	var images =$("body image");
	for(var i=0;i<images.length;i++){
		var image = images.get(i);	//DOM元素转JQuery元素
        var srcpath = image.src;
		if(srcpath.includes(oldpath)){
			srcpath = srcpath.replace(oldpath,newpath);
			image.src = srcpath;
		}
	}

}); 

/** 判断字符串是否为空 */
function isEmptyStr(s) {
	if (s == undefined || s == null || s == '') {
		return true
	}
	return false
}
