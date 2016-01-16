/**
/* http://javaking75.blog.me/220474203930
/* date format 함수  : Date 내장 객체에 fromat함수 추가
*
* 예)
*   2014년 01년 30일  오후 01시 45분 02초
*   new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초");
*   2014-01-30
* 	new Date().format("yyyy-MM-dd");
*   2014
* 	new Date().format("yyyy");
*/
Date.prototype.format =  function(f){
	if(!this.valueOf()) return "";
    
    var weekName = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var d = this;
    
    return f.replace(/(yyyy|yy|MM|dd|E|HH|hh|mm|ss|a\/p)/gi, function($1){
    	switch($1){
    		case "yyyy" : return d.getFullYear();
    		case "yy" : return (d.getFullYear() % 1000).zf(2);
    		case "MM" : return (d.getMonth()+1).zf(2);
    		case "dd" : return d.getDate().zf(2);
    		case "E" : return weekName[d.getDay()];
    		case "HH" : return d.getHours().zf(2);
    		case "hh" : return ((h=d.getHours() % 12) ? h: 12).zf(2);
    		case "mm" : return d.getMinutes().zf(2);
    		case "ss" : return d.getSeconds().zf(2);
    		case "a/p" : return d.getHours() < 12 ? "오전" : "오후";
    		default : return $1;
    	}
    
    });
};

/** 
* 특정 문자로 자리 채움(왼쪽)
* => 오른쪽 정렬후 왼쪽 빈 공백에 특정 문자열로 채움.
*
*@param c- 특정문자
*@param l- 전체 자리수
*/
String.prototype.lpad =  function(c, l){
	var len = l - this.length;
	var s = '', i=0;
	while(i++ < len) { s += c;}
	return s + this;
};

/** 
* 지정한 자릿ㅅ수의 빈공백 만큼 0으로 채움
*/

String.prototype.zf =function(len){return this.lpad("0", len);};
Number.prototype.zf =  function(len){return this.toString().zf(len);};

/**
* Data객체에 지정되어 있는 날짜에서 파라미터로 전달된 날짜까지 몇일이  남아있는지 계산하여
* 리턴해 준다.
* 함수 내부에서 월 값을 -1로 계산하므로, 파라미터는 1~12 사이의 값을 전달
* @params y - 년도
* @params m - 월
* @params d - 일
*/

Date.prototype.getDday = function(y,m,d){
	//파라미터로 받은 날짜로 새로운 Date객체를 생성
	//월은 정상적인 날짜값을 받은 경우, Javascript의 객체에 전달할 때는 "-1"  처리해 줘야 한다.
	var dday = new Date(y, m-1, d)
	//두 날짜간의 차이를 구한다.
	var cnt = dday.getTime()-this.getTime();
	//남은 날짜는 1시간이라도 1일로 계산하여야 함므로, 연산결과를 올림
	var  n = Math.ceil(cnt/(24 * 60 * 60 * 1000));
	console.log(" dday= "+ dday +" cnt= "+ cnt +" n= "+ n );
	return n;
};

/** 
* Date 객체에 저장되어 있는 날짜의 요일 이름을 리턴
*/
Date.prototype.getDayName = function(){
	return this.format("E");
}

/** 
* Date 객체에 저장되어 있는 날짜를 "yyyy-MM-dd HH:mm:ss"형식으로 리턴
*/
Date.prototype.getDateTime = function(){
	return this.format("yyyy-MM-dd HH:mm:ss");
}

/** 
* Date 객체에 저장되어 있는 날짜를 "yyyyMMddHHmmss"형식으로 리턴
*/
Date.prototype.toString = function(){
	return this.format("yyyyMMddHHmmss");
}
/** 
* 날짜 계산기.
* @params op - 두 번째 파라미터는 계산할 단위값이다.
* y(년도 계산), m(월 계산), d(날짜 계산), h(시간 계산), mi(분 계산), s(초 계산)
* @params value -  계산을 위한 값으로서 양수, 음수 모두 허용
*/
Date.prototype.add= function(op, value){
	switch(op){
		case "y" :
		this.setFullYear(this.getFullYear() + value);
		break;
		case "m" :
		this.setMonth(this.getMonth() + value);
		break;
		case "d" :
		this.setDate(this.getDate() + value);
		break;
		case "h" :
		this.setHours(this.getHours() + value);
		break;
		case "mi" :
		this.setMinutes(this.getMinutes() + value);
		break;
		case "s" :
		this.setSeconds(this.getSeconds() + value);
		break;

	}
};

/** 
* 날짜 계산에 의하여 변경된 값을 시스템의 오늘 날짜로 재설정
*/
Date.prototype.goCurDate = function(op, value){
	var _tmp = new Date();
	this.setTime(_tmp.getTime());
}