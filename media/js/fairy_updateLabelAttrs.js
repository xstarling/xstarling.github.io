$(document).ready(function () { 
	//获取要替换的标签路径更换的列表
	var objJsonText = $("#updateLabelAttrs").val();
	var objArr = JSON.parse(objJsonText);
	
	if(Array.isArray(objArr))
	{	
		for(var i = 0;i < objArr.length;i++)
		{
			//读取要替换的标签类型
			var htmlTags = objArr[i].htmlTag.trim().split("|");
			//读取标签的新旧路径
			var oldValue = objArr[i].oldlabelsrc.trim();
			var newValue = objArr[i].newlabelsrc.trim();

			//若为空字符串，则结束加载
			if(isEmptyStr(oldValue) || isEmptyStr(newValue))
			{
				return ;
			}
			
			//如果匹配项是 * 则默认替换掉图片名称之前的所有的链接
			if(oldValue == "*")
			{
				//replaceURL(newValue);
				replaceAttrValue(htmlTags,newValue)
			}else
			{
				//findReplaceURL(oldpath,newpath);
				findReplaceAttrValue(htmlTags,oldValue,newValue)
			}
		
		}
	}
}); 


/** 查找替换字符串 **/
function findReplaceAttrValue(htmlTags,oldValue,newValue)
{
	
	//for循环替换html标签的属性值
	for(var it = 0;it < htmlTags.length;it++){
		var htmlTagStr = htmlTags[it];
		var htmlTagDict = htmlTagStr.split("="); //a=attr，进行拆分，a为标签，attr为属性
		var labelstr = "body " + htmlTagDict[0];
		var labels = $(labelstr)
		//如果标签找的到，则替换其中的属性值
		if(labels != undefined)
		{
			//属性应该由前端的提供
			for(var i=0;i<labels.length;i++){
				var label = $(labels.get(i));	//DOM元素转JQuery元素
				try {
					var propValue = label.prop(htmlTagDict[1]);	//获取属性值的内容			
					propValue = propValue.replace(oldValue,newValue);//替换属性值的内容
					label.prop(htmlTagDict[1],propValue);	//设置属性值
				} catch (error) {
					
				}

				try {
					var attrValue = label.attr(htmlTagDict[1]);	//获取特性值的内容
					attrValue = attrValue.replace(oldValue,newValue);	//替换特性值的内容					
					label.attr(htmlTagDict[1],attrValue);	//设置特性值
				} catch (error) {
					
				}				
			}
		}

	}

	//for循环替换图片的src的前缀
	// var imgs =$("body img");
	// if(imgs != undefined)
	// {
	// 	for(var i=0;i<imgs.length;i++){
	// 		var img = imgs.get(i);	//DOM元素转JQuery元素
	// 		var srcpath = img.src;
	// 		if(srcpath.includes(oldpath)){
	// 			srcpath = srcpath.replace(oldpath,newpath);
	// 			img.src = srcpath;
	// 		}
	// 	}
	// }

	// var images =$("body image");
	// if(images != undefined)
	// {
	// 	for(var i=0;i<images.length;i++){
	// 		var image = images.get(i);	//DOM元素转JQuery元素
	// 		var srcpath = image.src;
	// 		if(srcpath.includes(oldpath)){
	// 			srcpath = srcpath.replace(oldpath,newpath);
	// 			image.src = srcpath;
	// 		}
	// 	}
	// }
}

/** 替换属性值的全部内容 **/
function replaceAttrValue(htmlTags,newValue)
{
	//for循环替换html标签的属性值
	for(var it = 0;it < htmlTags.length;it++){
		var htmlTagStr = htmlTags[it];
		var htmlTagDict = htmlTagStr.split("="); //a=attr，进行拆分，a为标签，attr为属性
		var labelstr = "body " + htmlTagDict[0];
		var labels = $(labelstr)
		//如果标签找的到，则替换其中的属性值
		if(labels != undefined)
		{
			//属性应该由前端的提供
			for(var i=0;i<labels.length;i++){
				var label = $(labels.get(i));	//DOM元素转JQuery元素
				try {
					label.prop(htmlTagDict[1],newValue);	//替换属性值的内容
				} catch (error) {
				
				}
				try {
					label.attr(htmlTagDict[1],newValue);	//替换特性值的内容
				} catch (error) {
					
				}
			}
		}

	}

	// var imgs =$("body img");
	// if(imgs != undefined)
	// {
	// 	for(var i=0;i<imgs.length;i++){
	// 		var img = imgs.get(i);	//DOM元素转JQuery元素
	// 		var srcpath = img.src;
	// 		var imgnameArr = srcpath.split('/');//分割url
	// 		var imgname = imgnameArr[imgnameArr.length-1];//通过最后一个数组下标获取图片名
	// 		img.src = newpath + "/" + imgname;
	// 	}
	// }

	// var images =$("body image");
	// if(images != undefined)
	// {
	// 	for(var i=0;i<images.length;i++){
	// 		var image = images.get(i);	//DOM元素转JQuery元素
	// 		var srcpath = image.src;
	// 		var imgnameArr = srcpath.split('/');//分割url
	// 		var imgname = imgnameArr[imgnameArr.length-1];//通过最后一个数组下标获取图片名	
	// 		image.src = newpath + "/" + imgname;
	// 	}
	// }

}

/** 判断字符串是否为空 */
function isEmptyStr(s) {
	if (s == undefined || s == null || s == '') {
		return true
	}
	return false
}