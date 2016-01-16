window.onload = function(){

	var LaF = {
		classExt : "external",
		classLi : "toggle",
		classInit : "set",
		classOn : "on",
		classOff : "off",
		classId : "myDHTML"
	}

	if (!document.getElementsByTagName) return false;

	var str = '<p class="' + LaF.classInit + '" id="' +
		LaF.classId + '"> This is my clickable DHTML ' +
		'box which changes size and shape. Try it! ' +
		'Click more than once! (Fun, right?)</p>';
	document.getElementsByTagName("body")[0].innerHTML += str;

	var ul = document.getElementById("myUL");
	if (ul){
		ul.innerHTML += '<li><span class="' + LaF.classLi +'"> Do you like DHTML?</span></li>';
		var myLi = getElementsByClassNameLF("span",LaF.classLi);
		if(myLi.length >0){
			myLi[0].onmouseover = function(){
				var sp = document.getElementById(LaF.classId);
				sp.className = LaF.classOff;
			}
		}
	}

	var box = document.getElementById(LaF.classId);
	if(box) {
		box.onclick = function(){
			box.className = (box.className == LaF.classOn)? 
			LaF.classOff : LaF.classOn;
		}
	}

	var linksExt = getElementsByClassNameLF("a","external");
	if(linksExt.length > 0){
		for (var i = 0; i < linksExt.length; i++) {
			linksExt[i].onclick = function(){
				window.open(this.href,"ourExternals");
				return false;
			}
		};
	}
}

function getElementsByClassNameLF(tagName,aClass){
	var z = [];
	if (!document.getElementsByTagName) return z;
	var x = document.getElementsByTagName(tagName);
	for(var i=0 ; i < x.length ; i++){
		if(x[i].className == aClass) z.push(x[i]);
	}
	return z;
}