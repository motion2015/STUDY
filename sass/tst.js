<script type="text/javascript">	

	var latitude;
	var longitude;
	var check = true;
	var clickCheck = true;
	var subcategoryId = "CT20108005>";
	var countryCd = "cn";
	var state="";
	var city="";

	$(document).ready(function() {
		
		//$(".wtbForm form").submit(function(e){
		//	e.preventDefault();
		//	return false;
		//})
		
		//bindAction();
		
		if(navigator.geolocation) { // FireFox/HTML5 GeoLocation
			navigator.geolocation.getCurrentPosition( function(position) {
				// GPS 좌표 셋팅
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
			});
		} else if (google && google.gears) { // Google Gears GeoLocation 
			var geloc = google.gears.factory.create('beta.geolocation');
			geloc.getPermission();
			geloc.getCurrentPosition(
				function(position) {
					// GPS 좌표 셋팅
					$("#latitude").val(position.coords.latitude);
					$("#longitude").val(position.coords.longitude);	
				},
				function(err){ }
			);
		}
		
		if(subcategoryId != ""){
			//realsubcateCheck = true;
			call_area();
		}
	
	});


	function chechLoadMore(){
		var totalNum = parseInt($("#totalNum").val());
		var currNum = parseInt($("#currNum").val());
		var strLoadMore = '@ 加载更多';
		
		if( totalNum - currNum >= 0){
			if(totalNum - currNum >= 5){
				if(strLoadMore.indexOf("@") > -1){
					strLoadMore = strLoadMore.replace("@", "5");
				}else{
					strLoadMore = "5 " + strLoadMore
				}
				$("#loadMore").text(strLoadMore);
				$("#startNum").val(currNum + 1);
			}else{
				if(strLoadMore.indexOf("@") > -1){
					strLoadMore = strLoadMore.replace("@", totalNum - currNum);
				}else{
					strLoadMore = totalNum - currNum + " " + strLoadMore
				}
				$("#startNum").val(totalNum);
				$("#loadMore").text(strLoadMore);
			}
		}else{
			$("#loadMoreBtn").hide();
		}
	}
	
	function showList(startNum, loadingCnt){
		var index = 0
		for(var i = startNum; i < startNum + loadingCnt; i++){
			$('li.loadmore-item').eq(i).show();
			index= index + 1;
		}
		$("#currNum").val(parseInt(startNum) +parseInt(index));
	}
	
	
	function changeResultMsg(){
		
		var str = '符合的店面信息共有@家';
		
		if(str.indexOf("@") > -1){
			str = str.replace("@", $("#totalNum").val());
		}
		
		if(str.indexOf("@") > -1){
			str = str.replace("@", "");
		}	
		
		if(str.indexOf("@") > -1){
			
			var strLocation = "";
			if("" != $("#city").val() && $("#city").val() != null){
				strLocation = "'<strong>" + $("#city").val() + "</strong>'";
			}else{
				strLocation = "'<strong>" + "当前位置" + "</strong>'";
			}
			
			str = str.replace("@", strLocation);
		}
		
		$("#resultMsg").html(str);
	}
	
	
	
	
	function fncGetCityList(oSelect){
		state = oSelect.value;
		if(oSelect.value == null || oSelect.value == ""){
			$('#city').children().remove().end().append('<option selected value="">选择城市</option>') ;
		}else{
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data:{'highLevelCode':oSelect.value,'state':oSelect.value},
				url:"/cn/product/retrieveCityList.lgajax",
				//async:false,
				success: function(data, textStatus, xhr){
					//document.comboSearch.city.removeall();
					$('#city').children().remove().end().append('<option selected value="">选择城市</option>') ;
					var cityList = data.value;
					for(i=0; i<cityList.length; i++){
						var optColor=document.createElement("OPTION");
						optColor.text=cityList[i];
					    optColor.value=cityList[i];
					    document.all.city.add(optColor);
					}
		
				}
			});
		}
	}
	
	
	function fncCategoryList(oSelect){
		var highLevelCode = oSelect.value;
		
		//alert("test");
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data:{'highLevelCode':highLevelCode,'type':'general','onload':'N'},
			url:"/cn/product/retrieveCnCategoryList.lgajax",
			//async:false,
			success: function(data, textStatus, xhr){
				if(highLevelCode == null || highLevelCode == ""){
					$('#subcategory').children().remove().end().append('<option selected value="">全部</option>') ;
				}else{
					$('#subcategory').children().remove().end().append('<option selected value="">选择</option>') ;
				}
				
				var categoryList = data.value;
				var categoryIdList = data.code;
				for(i=0; i<categoryList.length; i++){
					var optColor=document.createElement("OPTION");
					optColor.text=categoryList[i];
				    optColor.value=categoryIdList[i];
				    document.all.subcategory.add(optColor);
				}	
			}
		});

	}
	
	
	function fncRealCategoryList(oSelect){
		var highLevelCode = oSelect.value;
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data:{'highLevelCode':highLevelCode,'type':'general','onload':'N'},
			url:"/cn/product/retrieveCnCategoryList.lgajax",
			//async:false,
			success: function(data, textStatus, xhr){
				if(highLevelCode == null || highLevelCode == ""){
					$('#realSubcategory').children().remove().end().append('<option selected value="">全部</option>') ;
				}else{
					$('#realSubcategory').children().remove().end().append('<option selected value="">选择</option>') ;
				}
				
				var categoryList = data.value;
				var categoryIdList = data.code;
				for(i=0; i<categoryList.length; i++){
					var optColor=document.createElement("OPTION");
					optColor.text=categoryList[i];
					optColor.value=categoryIdList[i];
					document.all.realSubcategory.add(optColor);
				}
			}
		});

	}

	function fncRealCategoryList2(oSelect){
		var highLevelCode = oSelect;
		var subCode = $('#realSubcategory option:selected').val();
		if(subCode == null || subCode == ""){
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data:{'highLevelCode':highLevelCode,'type':'general','onload':'N'},
				url:"/cn/product/retrieveCnCategoryList.lgajax",
				//async:false,
				success: function(data, textStatus, xhr){
					if(highLevelCode == null || highLevelCode == ""){
						$('#realSubcategory').children().remove().end().append('<option selected value="">全部</option>') ;
					}else{
						$('#realSubcategory').children().remove().end().append('<option selected value="">选择</option>') ;
					}
					
					var categoryList = data.value;
					var categoryIdList = data.code;
					for(i=0; i<categoryList.length; i++){
						var optColor=document.createElement("OPTION");
						optColor.text=categoryList[i];
						optColor.value=categoryIdList[i];
						document.all.realSubcategory.add(optColor);
					}
				}
			});
		}
	}

	function call_area() {
		
		if($('#realCategory option:selected').val() != ''){
			
			$('#startNum').val("1");
			$('#currNum').val("0");
			$('#totalNum').val("0");
			
			// 검색결과 
			$("#resultDiv").show();
			
			/*
			fncRealCategoryList2($('#realCategory option:selected').val());
			latitude = 31.2012008;
			longitude = 121.6961607;
			fncWhereToBuyKmList();
			*/
			
			
			fncRealCategoryList2($('#realCategory option:selected').val());
			
			
			//navigator.geolocation.getCurrentPosition(foundLoc,errorCallback,locationOption);
			
			latitude = $("#latitude").val(); //현재 위도
			longitude = $("#longitude").val(); // 현재 경도
			//alert(latitude + "//" + longitude);
			fncWhereToBuyKmList();
		}
	}
	
	
	function fncAjax(){		
		if(!$(".wtbForm .invalid").length){
			
			$('#startNum').val("1");
			$('#currNum').val("0");
			$('#totalNum').val("0");
			
			// 검색결과 
			$("#resultDiv").show();
			
			//$('div.error .default-error-comboSearch').css({display:'none'});
			//$('div.error .default-error-comboSearch-subcategory').css({display:'none'});
	
			//var formName = document.comboSearch;
			
			var startNum = $('#startNum').val();
			var searchLat = $("#latitude").val();
			var searchLng = $("#longitude").val();
			
			var state = $("#state").val();
			var cityValue = $("#city").val(); 
			var category = $("#category").val();
			var subcategory = $("#subcategory").val();
			
			//if( cityValue == "" || cityValue == null){
			//	$('div.error .default-error-comboSearch').css({display:'block'});
			//	return;
			//} 
			
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data:{'startNum':$('#startNum').val(),'pageNum':$('#pageNum').val(),'city':cityValue,'category':category,'subcategory':subcategory,'state':state},
				url:"/cn/product/retrieveCnDistributors.lgajax",
				//async:false,
				success: function(data, textStatus, xhr){
					if("CT20108021" == category){
						$("div[id='search_result_area']").css("display",'none');
					}else{
						$("div[id='search_result_area']").css("display",'');
					}
					fnCnList(data);
				//SMG-6184 Start
				}, error: function (h) {
					var errMessage = h.responseText;
					if (errMessage.indexOf("contains invalid character.") != -1) {
						alert("Value of the field [subject] contains invalid character. Remove special character");
						return;
					}
				}
				//SMG-6184 End
			});
		}
	}
	
	
	function fnCnList(json){
		var list = "";
		var startNum = $('#startNum').val();
		var loadingCnt = $("#response").attr("loading-cnt");
		
		if( json.distributorId != undefined){
			
			$("#totalNum").val(json.totalCount[0]);
			historyCheck = historyCheck -1;
			
			//if(json.startNum  != undefined && json.pageFlage[0] != "1"){
			//	htmlStr = $('#mylglogin9').html();
			//}
		

			//$('#dataCount').html(json.totalCount[0]);
			
			var page = json.totalCount[0];
			
			list	+=	"<ul class=\"dataset\">";
			
			for(var inx=0; inx < json.distributorId.length; inx++){
				
				// LGECN-1186 brandShopImg 추가
				//LGECN-1755 start
				var brandShopImg = (json.brandShopFlag[inx] == 'Y') ? "<img src=\"/cn/images/logos/brand-logo.png\" alt=\"\" width=\"45\" height=\"25\" style=\"vertical-align:middle;\" />": "" ;
				//LGECN-1755 end
				var listNum = inx + 1;
				var distributorName = json.distributorName[inx];
				var distributorId = json.distributorId[inx];
				var address = "";
				var addressLine4Info = (json["addressLine4Info"][inx] ==null) ? '' : " "+json["addressLine4Info"][inx];
				if(json.stateCode[inx]==json.cityName[inx]){
					address = json.stateCode[inx]+addressLine4Info+" "+json.addressLine1Info[inx];
				}else{
					address = json.stateCode[inx]+" "+json.cityName[inx]+addressLine4Info+" "+json.addressLine1Info[inx];
				}
				var tmpPhone = (json["phone1No"][inx] ==null) ? '' : json["phone1No"][inx];	
				var latitude =json.latitudeValue[inx];
				var longitude =json.longitudeValue[inx];
				var mapName = distributorName.replace("(", "");
				mapName = mapName.replace(")", "");
				
				var tele = "Telephone:&nbsp;"
				
				if (tmpPhone.length == 10) {
					tmpPhone = "1-" + tmpPhone.substring(0,3) + "-" + tmpPhone.substring(3, 6) + "-" + tmpPhone.substring(6, 10);
				} else if (tmpPhone.length == 11) {
					tmpPhone = "1-" + tmpPhone.substring(1,4) + ") " + tmpPhone.substring(4, 7) + "-" + tmpPhone.substring(7, 11);
				} else {
					tmpPhone = tmpPhone;
				}
				
				if (tmpPhone.length > 0) {
					tele + tmpPhone;
				}
				
				var phone = tmpPhone;
				
				var params = distributorId+"\",\""+distributorName+"\",\""+address+"\",\""+phone+"\",\""+latitude+"\",\""+longitude;
				
				var mapUrl = "http://maps.google.com/maps?q=" + latitude + "," + longitude + "+('" + mapName + "')&iwloc=near&hl=zh&z=18&&output=embed";
				//var params = encodeURIComponent(address)+"\',\'"+encodeURIComponent(city)+"\',\'"+historyCheck+"\',\'"+encodeURIComponent(name)+"\',\'"+latitude+"\',\'"+longitude
				
				list	+=	"<li class=\"loadmore-item\" data-index=\"" + listNum + "\" style=\"display:none\">";
				list	+=	"	<dl>";
				list	+=	"		<dt>" + brandShopImg + " " + distributorName +"</dt>"; // LGECN-1186 brandShopFlag 추가
				list	+=	"		<dd>";
				list	+=	"			<p id=\"address\">" + address + "</p>";
				
				if(phone != null && phone!= ""){
					list	+=	"			<p id=\"phone\">&#9742; " + phone + "</p>";
				}
				
				list	+=	"			<div class=\"btn_wrap\">";
				
				if(phone != null && phone!= ""){
					list	+=	"				<a type=\"button\" class=\"btns btn_white\" href=\"tel:" + phone + "\"><img src=\"/lg3-common-v3/img/icon_call_us.png\" alt=\"\" /> 联系我们</a>";
				}
				
				list	+=	"				<a type=\"button\" class=\"btns btn_white\" target=\"_blank\" href=\"" + mapUrl + "\"><img src=\"/lg3-common-v3/img/icon_see_map.png\" alt=\"\" /> 查看地图</a>";
				list	+=	"			</div>";
				list	+=	"		</dd>";
				list	+=	"	</dl>";
				list	+=	"</li>";			
			}	// end for
			
			list	+=	"<li><div class=\"btn_wrap_m loadmore_btn\" id=\"loadMoreBtn\" style=\"display:none\" ><a href=\"#\" class=\"btn_more btns_s btntext\"><span class=\"cnt\" id=\"loadMore\">0</span><i></i></a></div></li>";
			list	+=	"</ul>";
			
		}else{
			// 조회 항목이 없을경우
		}
		
		$("#response").html(list);
		// 최초 10개 항목 출력(시작값, 출력갯수)
		showList(startNum - 1, loadingCnt);
		
		// load more
		if(json.totalCount[0] > loadingCnt){
			$("#loadMoreBtn").show();
			chechLoadMore();
		}
		
		$("#loadMoreBtn").click(function(e){
			e.preventDefault();
			showList(parseInt($("#currNum").val()), parseInt($("#response").attr("loading-more-cnt")));
			chechLoadMore();
		});
		
		// 검색결과
		changeResultMsg();
		
		//bindAction();
	}
	
	
	
	function foundLoc(position){
		$('#startNum').val("1");
		$('#currNum').val("0");
		$('#totalNum').val("0");
		latitude = position.coords.latitude; //현재 위도
		longitude = position.coords.longitude; // 현재 경도
		//alert(latitude + "//" + longitude);
		fncWhereToBuyKmList();
	}
	
	function fncWhereToBuyKmList(){
		
		if($('#realCategory option:selected').val() == ''){
			//$('div.error .default-error-real-category').css({display:'block'});
		}else if($('#realSubcategory option:selected').val() == ''){
			//$('div.error .default-error-real-subcategory').css({display:'block'});
		}else{
			if(clickCheck){
				var realcategoryId = $('#realSubcategory option:selected').val();
				//clickCheck = false;
				//	$('div.error .default-error-real-category').css({display:'none'});
				//$('div.error .default-error-real-subcategory').css({display:'none'});
				$.ajax({
					type: 'POST',
					dataType: 'json',
					data:{'latitude':latitude,'longitude':longitude,'searchKm': $('#searchKm').val(),'pageNum':$('#pageNum').val(),'buyCategory':$('#realSubcategory option:selected').val(),'startNum':$('#startNum').val(),'localeCode':countryCd},
					url:"/cn/product/retrieveDistributorCategoryKm.lgajax",
					//async:false,
					success: function(data, textStatus, xhr){
						fnCnList(data);
					//SMG-6184 Start
					}, error: function (h) {
						var errMessage = h.responseText;
						if (errMessage.indexOf("contains invalid character.") != -1) {
							alert("Value of the field [subject] contains invalid character. Remove special character");
							return;
						}
					}
					//SMG-6184 End
				});
			}
		}
	}
</script>
