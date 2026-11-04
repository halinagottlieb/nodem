var currentBack = 0;
var back_titles = ["","Museum of History of Polish Jews, W. Kryński",
"Museum of King Jan III’s Palace at Wilanów, W. Holnicki",
"Museum of History of Polish Jews, W. Kryński",
"The Fryderyk Chopin Museum",
"Museum of King Jan III’s Palace at Wilanów, W. Holnicki",
"Museum of History of Polish Jews, W. Kryński",
"The Fryderyk Chopin Museum",
"Museum of History of Polish Jews, W. Kryński",
"Museum of King Jan III’s Palace at Wilanów, W. Holnicki",
"Museum of History of Polish Jews, W. Kryński",
"Museum of King Jan III’s Palace at Wilanów, W. Holnicki",
"Museum of History of Polish Jews, W. Kryński",
"Museum of King Jan III’s Palace at Wilanów, W. Holnicki",
"Museum of History of Polish Jews, W. Kryński",
"The Royal Castle in Warsaw",
"Museum of History of Polish Jews, W. Kryński",
"Museum of History of Polish Jews, W. Kryński",
"Zachęta – National Gallery of Art"];
$(document).ready(function(){
	//get data
	var firstLvl =  $(".menu").children();
	var present = $($(firstLvl[0]).children("ul")[0]).html();
	var past = $($(firstLvl[1]).children("ul")[0]).html();
	
	//set data
	var container = $(".menu-conferences-container");
	var btn1 = "<div class='tab-selector' onclick='openMenu(1)'><img src='wp-content/themes/leftside/images/btn-menu.png' alt='menu' /> present</div> ";
	var btn2 = "<div class='tab-selector' onclick='openMenu(2)'>past <img src='wp-content/themes/leftside/images/btn-menu.png' alt='menu' /></div> ";
	var cnt1 = "<div class='tab-content' id='tab-1'><ul class='menu'>"+ present +"</ul></div>";
	var cnt2 = "<div class='tab-content' id='tab-2' style='display:none;'><ul class='menu'>"+ past +"</ul></div>";
	var preparedData = btn1 + btn2 + cnt1 + cnt2;
	
	$(container).html(preparedData);
	setTimeout(function(){ setSizing(); }, 100);
	$(".widget_nav_menu").addClass("menu_hidden");
	//changeBackground(false);
	
	//setTimeout(function() {
		if( getCookie("cMenu") != "" ) { openMenu(getCookie("cMenu")); openMenu(getCookie("cMenu")); }
	//}, 100);
});

$(window).resize(function(){ setSizing(); });
$(window).scroll(function(){ if($(window).width()<750){ hideLogo(); } });

function setSizing(){
	//set sizing
	var contentWidth = $(window).width()-380;
	var hWindow = $(window).height();
	
	if(hWindow<760){
		$(".side-btn").addClass("small-side");
		$($(".side-btn").get(1)).addClass("second-pos");
		$($(".side-btn").get(2)).addClass("third-pos");
	}
	else {
		$(".side-btn").removeClass("small-side");
		$($(".side-btn").get(1)).removeClass("second-pos");
		$($(".side-btn").get(2)).removeClass("third-pos");
	}
	
	if($(window).width()>=960) {
		$("#header-image").css("width", contentWidth + "px");
		$("#content").css("width", (contentWidth-40) + "px");
		$("#content_title").css("width", (contentWidth-20) + "px");
		$("#header").css("margin-top", "80px");
	 	$("#content_title").css("margin-top", "90px");
	}
	
	else if($(window).width()>=750) { 
	 	$("#header-image").css("width", (contentWidth+100) + "px");
		$("#content").css("width", (contentWidth-40+100) + "px");
		$("#content_title").css("width", (contentWidth-20+100) + "px");
		$("#header").css("margin-top", "80px");
	 	$("#content_title").css("margin-top", "90px");
	 }
	 else {
	 	var marginTop = $(".header_long").height();
	 	$("#header").css("margin-top", (marginTop-20)+"px");
	 	$("#content_title").css("margin-top", (marginTop+40) + "px");
		$("#content_title").css("width", "100%");
		$("#header-image").css("width", "100%");
		$("#content").css("width", "100%");
	 }
}

function selectImage(no){
	var multiplier = no-1;
	var imageHeight = $("#header-image .image-element").height() * (-1);
	var images =  $("#header-image .image-element");
	$("#header-image .image-element").css("-webkit-transform","translate3d(0px,"+(multiplier*imageHeight)+"px,0px)");
	$("#header-image .image-element").css("-moz-transform","translate3d(0px,"+(multiplier*imageHeight)+"px,0px)");
	$("#header-image .image-element").css("transform","translate3d(0px,"+(multiplier*imageHeight)+"px,0px)");
	
	$("#header-image ul .active").removeClass("active");
	$($("#header-image ul li").get(multiplier)).addClass("active");
	
}

function openMenu(menuId){
	setCookie("cMenu", menuId, 360);

	if(menuId==1) { $("#tab-1").css("display","block"); $("#tab-2").css("display","none"); }
	if(menuId==2) { $("#tab-2").css("display","block"); $("#tab-1").css("display","none"); }

	if($(window).width()<750){
		if( $(".widget_nav_menu").hasClass("menu_hidden") ) $(".widget_nav_menu").removeClass("menu_hidden");
		else $(".widget_nav_menu").addClass("menu_hidden");
	}
	setCookie("cMenu", menuId, 360);
}

function hideLogo(){
	var pageOverflow = $(window).scrollTop();
	var hLogo = $("#logo").height() * (-1) - 10;
	if(pageOverflow>100) {
		$(".header_long").css("top", hLogo+"px");
		$("#header").css("top", "-150px");
	}
	else {
		$(".header_long").css("top", "10px");
		$("#header").css("top", "10px");
	}
}
function changeBackground(change){
	

	if(getCookie("backgroundNo") != "") currentBack = getCookie("backgroundNo");
	else currentBack = 0;
	
	if(change) currentBack++;
	if(change) setCookie("backgroundNo", currentBack, 360);
	
	var fileName1 = "";
	var localBack = currentBack%18 + 1;
	$(".picture-title").html(back_titles[localBack]);
	if(localBack<10) fileName1 = "tlo0"+localBack+".jpg";
	else fileName1 = "tlo"+localBack+".jpg";
	
	currentBack++;
	localBack = currentBack%18 + 1;
	
	var fileName2 = "";
	if(localBack<10) fileName2 = "tlo0"+localBack+".jpg";
	else fileName2 = "tlo"+localBack+".jpg";
	
	$("body").css("background-image","url(wp-content/themes/leftside/images/bcks/"+ fileName1 +"), url(wp-content/themes/leftside/images/bcks/"+ fileName2 +")");
	$("#currentBack").attr("src", "wp-content/themes/leftside/images/bcks/"+fileName1);
	
	$("#currentBack").load(function() { setThemeColor(); });
}

function setThemeColor(){
	if($(window).width()>=750) //setTimeout(function(){
		var rgb = getAverageRGB(document.getElementById('currentBack'));
		rgb.r /= 2;
		rgb.g /= 2;
		rgb.b /= 2;
		
		rgb.r = Math.floor(rgb.r);
		rgb.g = Math.floor(rgb.g);
		rgb.b = Math.floor(rgb.b);
		
		var contra =  clone(rgb);
		
		contra.r = 255-contra.r;
		contra.g = 255-contra.g;
		contra.b = 255-contra.b;
		
		$(".header_long").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$(".expand-menu").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$("#content").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$("#content_title").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$(".image-title").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$("#nav_menu-2").css("background-color","rgba("+ rgb.r +","+ rgb.g +","+ rgb.b +",0.85)");
		$("#content_title").css("color","rgb("+ contra.r +","+ contra.g +","+ contra.b +")");
	//}, 1000); 
}

function setCookie(name,value,days) {
	document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toUTCString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    
    
    console.log(document.cookie);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
var nordicHide = "";
function setNordicMenu(){
	$(".expand-menu").css("height","auto");
	clearTimeout(nordicHide);
	nordicHide = setTimeout(function(){ $(".expand-menu").css("height","0px"); }, 1000);
}

function fbShare(){
	var newwindow=window.open("http://www.facebook.com/sharer.php?u="+window.location,'Share','height=300,width=500');
	if (window.focus) {newwindow.focus()}
	return false;
}
function twShare(){
	var newwindow=window.open("http://www.twitter.com/share?url=" +window.location ,'Share','height=300,width=500');
	if (window.focus) {newwindow.focus()}
	return false;
}

function hideContent(){
	if($("#header").hasClass("hidden-content")){
		$("#header").removeClass("hidden-content")
		$("#header-image").show("slow");
		$("#content").show("slow");
		$("#stamp").show("slow");
		$($(".side-btn").get(0)).show("slow");
		//$($(".side-btn").get(1)).show("slow");
		$($(".side-btn").get(1)).css("margin-top","500px");
		$("#footer").css("position","static");
	} else {
		$("#header").addClass("hidden-content")
		$("#header-image").hide("slow");
		$("#content").hide("slow");
		$("#stamp").hide("slow");
		$("#footer").css("position","fixed");
		$("#footer").css("bottom","0px");
		$($(".side-btn").get(1)).css("margin-top","100px");
		$($(".side-btn").get(0)).hide("slow");
		//$($(".side-btn").get(1)).hide("slow");
	}
}