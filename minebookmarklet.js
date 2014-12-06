	  
	  
	  
	  
	  
var video_image_src;	  
var video_statistics1;		  
var video_statistics2;		  
var video_title;		  

var doc_root = "http://localhost/myminelink/";  

	  

	  
	  
	  
function getVimeoId( url ) {
  	// look for a string with 'vimeo', then whatever, then a forward slash and a group of digits.
  	var match = /vimeo.*\/(\d+)/i.exec( url );
  	// if the match isn't null (i.e. it matched)
  	if ( match ) {
    	// the grouped/matched digits from the regex
    	return match[1];
  	}
}
function vimeoLoadingThumb(getUrlparam){ 
		var id = getVimeoId(getUrlparam);	  
    	$.getScript("http://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb");
}
function showThumb(data){
		//var images = new Array();
		//imgTags[0].src = data[0].thumbnail_medium;
		//metas = getPageMeta();
		//createOverlay(images, metas);	
		video_image_src   = data[0].thumbnail_medium;
		video_title       = data[0].title;
  		//$('.create_add_description').val(data[0].title);   
		//$('.images-add').html('<img id="gmi1" src="'+data[0].thumbnail_medium+'">'); 
  		//$('.info-add').html('<div style="border-top: 1px solid #D9D4D4; margin-top:10px;margin-bottom:10px;"></div><img class="load_create_post_favicon" src="'+'http://www.google.com/s2/favicons?domain=vimeo.com'+'" width="18" height="18"  style="border-radius:9px;-moz-border-radius:9px;-webkit-border-radius:9px;-khtml-border-radius:9px; position:relative; top:3px;"><span class="load_create_post_title">'+data[0].title+'</span><div style="margin-top:12px;"></div><span class="load_create_post_description">'+data[0].stats_number_of_likes+' favorite(s); '+data[0].stats_number_of_plays+' view(s)...</span>'); 	  
}  
	
function youtubeFetchData(getUrlparam)
{

  	var videoid = '';
  	var tempvar = getUrlparam;	
  	if ( /^https?\:\/\/.+/i.test( tempvar ) )
  	{
  	  tempvar = /[\?\&]v=([^\?\&]+)/.exec( tempvar );
  	  if ( ! tempvar )
  	  {
  	    alert( 'YouTube video URL has a problem!' );
  	    return;
  	  }
  	  videoid = tempvar[ 1 ];
  	}
  	else
  	{
  	  if ( /^[A-Za-z0-9_\-]{8,32}$/.test( tempvar ) == false )
  	  {
  	    alert( 'YouTube video ID has a problem!' );
  	    return;
  	  }
  	  videoid = tempvar;
  	}

  	$.getScript( 'http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent( videoid ) + '?v=2&alt=json-in-script&callback=youtubeFetchDataCallback' );
}
function youtubeFetchDataCallback(data)
{
	  	  		alert("444");
  	var s = '';
  	var d = '';  
  	var i = '';
  	var w = '';
  	var h = '';    
  	var sf = '';
  	var sv = '';    
  	// s += '<img src="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].url + '" width="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].width + '" height="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].height + '" alt="Default Thumbnail" align="right"/>';
  	// s += '<b>Title:</b> ' + data.entry[ "title" ].$t + '<br/>';
  	// s += '<b>Author:</b> ' + data.entry[ "author" ][ 0 ].name.$t + '<br/>';
  	// s += '<b>Published:</b> ' + new Date( data.entry[ "published" ].$t.substr( 0, 4 ), data.entry[ "published" ].$t.substr( 5, 2 ) - 1, data.entry[ "published" ].$t.substr( 8, 2 ) ).toLocaleDateString( ) + '<br/>';
  	// s += '<b>Duration:</b> ' + Math.floor( data.entry[ "media$group" ][ "yt$duration" ].seconds / 60 ) + ':' + ( data.entry[ "media$group" ][ "yt$duration" ].seconds % 60 ) + ' (' + data.entry[ "media$group" ][ "yt$duration" ].seconds + ' seconds)<br/>';
  	// s += '<b>Rating:</b> ' + new Number( data.entry[ "gd$rating" ].average ).toFixed( 1 ) + ' out of ' + data.entry[ "gd$rating" ].max + '; ' + data.entry[ "gd$rating" ].numRaters + ' rating(s)' + '<br/>';
  	// s += '<b>Statistics:</b> ' + data.entry[ "yt$statistics" ].favoriteCount + ' favorite(s); ' + data.entry[ "yt$statistics" ].viewCount + ' view(s)' + '<br/>';
  	// s += '<br/>' + data.entry[ "media$group" ][ "media$description" ].$t.replace( /\n/g, '<br/>' ) + '<br/>';
  	// s += '<br/><a href="' + data.entry[ "media$group" ][ "media$player" ].url + '" target="_blank">Watch on YouTube</a>';
  	// $( '#youtubeDataFetcherOutput' ).html( s );
  	i += data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].url;
  	//w += data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].width;
  	//h += data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].height;
  	s += data.entry[ "title" ].$t;
  	d += data.entry[ "media$group" ][ "media$description" ].$t.replace( /\n/g, '<br/>' );
  	//$('#linkTitle').val(s);
  	sf += data.entry[ "yt$statistics" ].favoriteCount;
  	sv += data.entry[ "yt$statistics" ].viewCount;
  	video_image_src   = i;
  	video_statistics1 = sf;
  	video_statistics1 = sv;
  	video_title       = s;

  	//$('.create_add_description').val(s);
  	//$('.images-add').html('<img id="gmi1" src="'+i+'">');
  	//$('.info-add').html('<div style="border-top: 1px solid #D9D4D4; margin-top:10px;margin-bottom:10px;"></div><img class="load_create_post_favicon" src="'+'http://www.google.com/s2/favicons?domain=www.youtube.com'+'" width="18" height="18"  style="border-radius:9px;-moz-border-radius:9px;-webkit-border-radius:9px;-khtml-border-radius:9px; position:relative; top:3px;"><span class="load_create_post_title">'+s+'</span><div style="margin-top:12px;"></div><span class="load_create_post_description">'+sf+' favorite(s); '+sv+' view(s)...</span>');           
}  
















function getDomain(url) {
	url=	unescape(url);		
	s = url.match(/(s:|:|%3A)\/\/(www\.)?(.[^/:]+)/g);
	for(var i=0;i<s.length;i++){
	    tempdomain = s[i];
		domainname = tempdomain.replace("s://","").replace("://",""); 
		return domainname;
	}
}       
function addslashes(string) {
   return string.replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
}
function urlencode(str) {
	str = (str+'').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
//function post_to_url(url, params) {
/*
function post_to_url(url) {	
	
	//alert(url);
	
	
    var form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
	
//    for (var i in params) {
//        if (params.hasOwnProperty(i)) {
//            var input = document.createElement('input');
//            input.type = 'hidden';
//            input.name = i;
//            input.value = params[i];
//            form.appendChild(input);
//        }
//    }
    form.submit();
    
    	destroyOverlay();
}
*/














function getTitle(){
	var title = document.title ? document.title : "";
	
    return title;
}

function GetMetaValue(attribute, meta_name) {
    var my_arr = document.getElementsByTagName("meta");
    for (var counter = 0; counter < my_arr.length; counter++) {
        console.log(my_arr[counter].getAttribute(attribute));

        if (my_arr[counter].getAttribute(attribute) == meta_name) {
            return my_arr[counter].content;
        }
    }
    return "";
}

function getPageMeta() {
	var my_title = document.body.getElementsByTagName('title');
	var meta_title = my_title[1];
    var my_arr = document.body.getElementsByTagName('meta');
	var metas = new Array();    
	var title_name;
	var description_name;
	if (  GetMetaValue('property', 'og:title')  ) {
		title_name = GetMetaValue('property', 'og:title');
	}
	else if( GetMetaValue('property', 'og:Title')  ){
		title_name = GetMetaValue('property', 'og:Title');		
	}
	else if( GetMetaValue('name', 'title')  ){
		title_name = GetMetaValue('name', 'title');		
	}	
	else if( GetMetaValue('name', 'Title')  ){
		title_name = GetMetaValue('name', 'Title');		
	}
	else if( GetMetaValue('name', 'TITLE')  ){
		title_name = GetMetaValue('name', 'TITLE');		
	}
	else{
		title_name = getTitle();
	}
	if (  GetMetaValue('property', 'og:description')  ) {
		description_name = GetMetaValue('property', 'og:description');
	}
	else if( GetMetaValue('property', 'og:Description')  ){
		description_name = GetMetaValue('property', 'og:Description');		
	}
	else if( GetMetaValue('name', 'Description')  ){
		description_name = GetMetaValue('name', 'Description');		
	}	
	else if( GetMetaValue('name', 'description')  ){
		description_name = GetMetaValue('name', 'description');		
	}	
	else if( GetMetaValue('name', 'DESCRIPTION')  ){
		description_name = GetMetaValue('name', 'DESCRIPTION');		
	}
		
    metas.push(title_name);  
    metas.push(description_name);        
    return metas;

}	


function getPageImages() {
			
	var imgTags = document.body.getElementsByTagName('img');
	var images = new Array();
	
	if (videoThumbUrl) {
		var image = new Image();
		image.src = videoThumbUrl;
		image.isVideo = true;
		image.onload = function() {
			var imgEl = document.getElementById("img_0");
			var imgSizeEl = document.getElementById("img_size_0");
			if (imgEl != null && imgSizeEl != null) {
				setImageSizeAndPosition(imgEl, image, imgSizeEl);
			}
		};
		images.push(image);
	}
	
	for (var i=0; i<imgTags.length; i++) {
		if (imgTags[i].width < 107 || imgTags[i].height < 107){
			continue;
		}
		var found = false;
		for (var j=0; j<i; j++) {
			if (imgTags[i].src == imgTags[j].src) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			imgTags[i].isVideo = false;
			//imgTags[i].id = "gmi"+i;
			images.push(imgTags[i]);
		}
	}

	return images;
	

}














function bookmark(url, imgIdx, t, m0, m1) {
					

	
	msg2 = {
		key : myminelink_user_key,
		video : 0,
		singleMode : 1,
		ImgsNumber : images.length,
		urlTitle : metas[0],
		urlDescription : metas[1],		
		pinIndex :imgIdx,
 		sourceUrl :getUrl,
		sourceUrlRoot :getUrlRoot				
	};	
	

	msg2.imgSRC     = images[imgIdx].src;//imgSRC.join(',');
	msg2.imgWidth   = images[imgIdx].width;//imgWidth.join(',');	
	msg2.imgHeight  = images[imgIdx].height;//imgHeight.join(',');	
	
		
	var url = "http://localhost/myminelink/post_this.php?json_over_url="+encodeURIComponent(JSON.stringify(msg2));	



	var IFrameDoc;
	  //if(document.createElement){
	  	
   
	  		/*
         if (this.IFrameObj.contentWindow) {
		   // For IE5.5 and IE6
		   IFrameDoc = this.IFrameObj.contentWindow;
		 }else{
			IFrameDoc = this.IFrameObj;
		 }
		 */
		 /*} else if (this.IFrameObj.document) {
		   // For IE5
		   IFrameDoc = this.IFrameObj.document;
		 }
		 else if (this.IFrameObj.contentDocument) {
		   // For NS6
		   IFrameDoc = this.IFrameObj.contentDocument;
		 }
		 else{
	  		 IFrameDoc = this.IFrameObj.contentWindow;
		 }*/
		 //var json_over_url = encodeURIComponent(fttaggerbookmarklet.JSON2.stringify(msg));
		 //var url = fttaggerbookmarklet.iframe_url+"#tfbml-data"+json_over_url;

		 
	  IFrameDoc = document.getElementById("porn_iframe");	 
	  document.getElementById('porn_iframe').src = url;
		 //IFrameDoc.location.replace(url);
		   //alert(url);

	 //}
					
					
	//var documentUrl = 'http://upload'+domain+'/pin/flash?image_url='+urlencode(url)+'&source_url='+urlencode(location.href);
	// http://localhost/sliding_panel3/New_Folder/myminelink/
	// http://www.myminelink.com/
	/*
	var documentUrl = 'http://www.myminelink.com/?image_url='+urlencode(url)+'&source_url='+urlencode(location.href)+'&image_title='+t+'&url_title='+m0+'&url_descr='+m1;
	if (document.referrer) {
		documentUrl += "&referrer_url="+urlencode(document.referrer);
	}
	if (isVideo) {
		documentUrl += "&video=1";
	}
	
	var pinpornWindow = window.open(documentUrl,'name','width=800,height=450');
	if (window.focus) {
		pinpornWindow.focus();
	}
	*/
	destroyOverlay();
}
/*
function destroyAll() {
	document.body.removeChild(document.getElementById("porn_iframe"));  
	document.body.removeChild(document.getElementById("porn_popup"));
	document.body.removeChild(document.getElementById("thumbIcon"));	
		
}
*/
function destroyOverlay() {
	//document.body.removeChild(document.getElementById("porn_iframe"));  
	//document.body.removeChild(document.getElementById("porn_full_overlay"));
	//document.body.removeChild(document.getElementById("porn_popup"));
	var porn_popupObj = document.getElementById("porn_popup");
	porn_popupObj.style.display = "none";	
	//document.body.removeChild(document.getElementById("thumbIcon"));	
	//document.body.removeChild(document.getElementById("title_bar")); 
	//document.body.removeChild(document.getElementById("title_bar2"));		
	//document.body.removeChild(document.getElementById("title_bar3")); 		
}

//var past_select_id;
function pinThis(id){
	
	
	
	//var idBigObj = document.getElementsByClassName('MineItImageCube');
	//idBigObj.find('a').css('display','none');
	//idBigObj.find('a').removeClass('clicked');	
	//idBigObj.find('a').addClass('unclick');	
	
	
	//var idObj2 = document.getElementById('pinThis-'+past_select_id);	
	//idObj2.setAttribute("class", "unclick");	
	//idObj2.style.display= 'none';	
	
		
	var idObj = document.getElementById('pinThis-'+id);	
	//if () {
	idObj.setAttribute("class", "clicked");	
	idObj.style.display= 'block';
	//}	

	//past_select_id = id;
	
}
function pinThisOver(id){
	var idObj = document.getElementById('pinThis-'+id);

	if (idObj.getAttribute('class')=="unclick") {

		idObj.style.display= 'block';
	}
}

function pinThisOut(id){
	var idObj = document.getElementById('pinThis-'+id);

	if (idObj.getAttribute('class')=="unclick") {	
		idObj.style.display= 'none';
	}
}

function ChangeColor(){
	var idObj = document.getElementById("cancelButton2");
	idObj.style.color= '#CB2027';
}
function ChangeColor2(){ 
	var idObj = document.getElementById("cancelButton2");
	idObj.style.color= '#3D434E';
}

function ChangeColorPost(id){ 
	var idObj = document.getElementById("img_post_tag_"+id);
	idObj.style.background= '#B0281A'; 
}

function ChangeColorPost2(id){ 
	var idObj = document.getElementById("img_post_tag_"+id);
	idObj.style.background= '#D14836';
}
function setImageSizeAndPosition(imageEl, imageObj, imageSizeEl) {
	
	var topMargin = 0;
	var leftMargin = 0;
	var imageWidth = 0;
	var imageHeight = 0;
	
	if (imageObj.width >= imageObj.height) { 
		topMargin = Math.floor(( 200 - (200 * imageObj.height / imageObj.width)) / 2);
		imageWidth = 200;
		imageHeight = Math.round(200 * imageObj.height / imageObj.width);
	} else if (imageObj.width < imageObj.height) {
		leftMargin = Math.floor(( 200 - (200 * imageObj.width / imageObj.height)) / 2);
		imageWidth = Math.round(200 * imageObj.width / imageObj.height);
		imageHeight = 200;
	}


	imageEl.style.margin 	= topMargin+"px "+leftMargin+"px";
	imageEl.style.width 	= imageWidth+"px";
	imageEl.style.height 	= imageHeight+"px";
	
	// set the text
	imageSizeEl.innerHTML = imageObj.width+' X '+imageObj.height;
}















function displayImages(container, images, metas){

	var titleDiv = document.createElement("div");

	titleDiv.style.position = "relative";
	titleDiv.style.width = "100%";		
	titleDiv.style.display = "block";
	titleDiv.style.height = "95px";
	titleDiv.style.margin = "0px";	
	titleDiv.style.padding = "0px";		
	titleDiv.style.borderBottom = "solid 1px #f2f0f0";
	titleDiv.style.color = "#666";
	titleDiv.style.textAlign="left";	
	titleDiv.style.font=" bold 16px arial,serif";





		var metas1 = document.createElement("p");
		metas1.style.paddingTop = "35px";
		metas1.style.paddingLeft= "30px";				
		metas1.style.color = "#3D434E";	
		metas1.style.width = "500px";		
		metas1.style.fontSize="26px";			
		metas1.style.font="lucida grande bold 20px arial,serif";	
		metas1.style.textShadow="#8B8B8B 1px 1px 1px";			
		metas1.style.overflow= "hidden";
		metas1.innerHTML = "Choose one image for this link";//metas[0];
	
	
	
	
	
	
	
		var metas2 = document.createElement("p");
		metas2.style.paddingTop = "2px";
		metas2.style.paddingLeft= "30px";				
		metas2.style.color = "#999";	
		metas2.style.width = "500px";		
		metas2.style.fontSize="15px";			
		metas2.style.font="lucida grande bold 16px arial,serif";	
		metas2.style.textShadow="#CCC 0px 1px 1px";			
		metas2.style.overflow= "hidden";
		metas2.innerHTML = metas[1];	

	
	

	
	
	var cancelButtonWrapper = document.createElement("div");
	cancelButtonWrapper.style.position = "absolute";
	cancelButtonWrapper.style.right = "90px";
	cancelButtonWrapper.style.top = "25px";
	cancelButtonWrapper.style.textDecoration = "none";
	cancelButtonWrapper.style.fontWeight = "bold";
	cancelButtonWrapper.style.color = "#524D4D";
	cancelButtonWrapper.style.textShadow = "0 1px rgba(255, 255, 255, 0.9)";
	cancelButtonWrapper.style.display = "inline-block";
	cancelButtonWrapper.style.textAlign = "center";
	cancelButtonWrapper.style.padding = "2px 6px";
	cancelButtonWrapper.setAttribute('onmouseover','ChangeColor()');
	cancelButtonWrapper.setAttribute('onmouseout','ChangeColor2()');
	
	
	
			
	
	var cancelButton = document.createElement("a");
	cancelButton.setAttribute("href", "javascript:destroyOverlay();");
	cancelButton.style.textDecoration = "none";
	cancelButton.style.fontSize = "36px";
	cancelButton.style.color = "#3D434E";
	cancelButton.style.font="normal bold 36px arial,serif";
	cancelButton.style.border = "none";	
	cancelButton.innerHTML=	"CANCEL";	
	cancelButton.setAttribute("id","cancelButton2");			
	
	
		
			var Clientwidth = Math.max(
			Math.max(document.body.clientWidth, document.documentElement.clientWidth)
			);
	

	var imagesContainerRowImgNum = Math.floor( ( Clientwidth*0.7 )/200 )
	var imagesContainerWidth = imagesContainerRowImgNum*200+(imagesContainerRowImgNum+1)*10;
	//alert(imagesContainerWidth);
	

	
	
	var imagesContainer = document.createElement("div");
	imagesContainer.style.padding = "0px";
	imagesContainer.style.paddingLeft = "20px";	
	imagesContainer.style.width = imagesContainerWidth+"px";
	imagesContainer.style.margin = "0 auto";
	imagesContainer.style.position = "relative";
	//imagesContainer.style.float = "left";					
	//imagesContainer.style.background = "#393F49";	
	//imagesContainer.style.border = "1px solid #D2D2D2";	
	
	
	

	
	
	
	if(metas[0] === undefined){
		metas[0] = '';
	}
	
	if(metas[1] === undefined){
		metas[1] = '';
	}
	
	metas[0] = addslashes(metas[0]);
	metas[1] = addslashes(metas[1]);
	
	
	
	
	
	
	
	
	
	msg = {
	
		key : myminelink_user_key,
		video : 0,
		singleMode : 0,	
		ImgsNumber : images.length,		
		urlTitle : metas[0],
		urlDescription : metas[1],
		pinIndex : 0,
 		sourceUrl :getUrl,
		sourceUrlRoot :getUrlRoot
	
	};	
	
	

	
	
	
	
	
	
	
	
	for (var i=0; i<images.length; i++) {
		
		var imageSize = document.createElement("div");
		imageSize.style.backgroundColor  = "#cccccc";
		imageSize.style.color  = "#000";
		imageSize.style.padding  = "5";
		imageSize.style.textAlign = 'center';
		imageSize.setAttribute("id", "img_size_"+i);
				
				
				
				
		var imageWrapper = document.createElement("div");
		//imageWrapper.style.border = "1px solid #cccccc";
		
		imageWrapper.style.cssFloat = "left";
		imageWrapper.style.float = "left";
		imageWrapper.style.width = "200px";
		imageWrapper.style.height = "228px";
		imageWrapper.style.margin = "10px 10px 0 0";
		imageWrapper.style.position = "relative";
		imageWrapper.setAttribute('onmouseover','pinThisOver('+i+')');
		imageWrapper.setAttribute('onmouseout','pinThisOut('+i+')');
		imageWrapper.setAttribute('onclick','pinThis('+i+')');		
		imageWrapper.setAttribute('id','MineItImageCube'+i);  
		imageWrapper.setAttribute('class','MineItImageCube');  		
	
		
		
		
		/* video
		var imagePlay = document.createElement("a");
		imagePlay.style.position = "absolute";
		imagePlay.style.zIndex  = "2147483646";
		imagePlay.setAttribute("href", "javascript:bookmark('"+images[i].src+"', "+images[i].isVideo+")");
		imagePlay.style.width = "60px";
		imagePlay.style.height = "60px";
		imagePlay.style.top="60px";
		imagePlay.style.left="70px";
		var imageObjPlay = document.createElement("img");
		imageObjPlay.style.width = "60px";
		imageObjPlay.style.height = "60px";
		imageObjPlay.style.border = "none";
		*/
		
		
		
		
		
		
		
		
		
		var imagePinThis = document.createElement("a");
		imagePinThis.style.position = "absolute";
		imagePinThis.style.zIndex  = "2147483647";
		var image_title =images[i].getAttribute('alt')?images[i].getAttribute('alt'):(images[i].getAttribute('title')?images[i].getAttribute('title'):"");
		
		if(image_title.length > 20){
			image_title = image_title.substr(0, 20) + '...';
		}

		



		
		
		
		imagePinThis.setAttribute("href", "javascript:bookmark('"+images[i].src+"', "+i+",'"+escape(image_title)+"', '"+escape(metas[0])+"', '"+escape(metas[1])+"')");
		//imagePinThis.setAttribute('onclick','chooseThisImg()');		
		//imagePinThis.setAttribute("onclick", "javascript:post_to_url('http://localhost/myminelink/post_this.php?json_over_url="+JSON.stringify(msg2)+"')");		
		//javascript:post_to_url('http://is.gd/create.php', {'URL': location.href});
		
		imagePinThis.style.width = "124px";
		imagePinThis.style.height = "30px";
		imagePinThis.style.bottom="0px";
		imagePinThis.style.left="0px";
		imagePinThis.innerHTML=images[i].getAttribute('alt')?images[i].getAttribute('alt'):images[i].getAttribute('title');
		imagePinThis.style.opacity = "0.5";		
		imagePinThis.style.filter = "alpha(opacity=70)";
		imagePinThis.style.background = "black";
		imagePinThis.style.width = "200px";
		imagePinThis.style.height = "83px";	
		imagePinThis.style.paddingTop = "145px";				
		imagePinThis.style.color = "white";	
		imagePinThis.style.fontSize="13px";				
		imagePinThis.style.font="lucida grande normal 13px arial,serif";
		imagePinThis.style.verticalAlign="bottom";
		imagePinThis.style.textAlign="center";		
		imagePinThis.style.textDecoration="none";			
		imagePinThis.style.display="none";
		imagePinThis.setAttribute("id","pinThis-"+i);
		imagePinThis.setAttribute("class", "unclick");
		imagePinThis.style.cursor="pointer";					
		//imagePinThis.style.zIndex  = "200000000";		
		

		var imageObjPinThis = document.createElement("span");
		imageObjPinThis.style.position = "absolute";		
		imageObjPinThis.style.bottom="30px";
		imageObjPinThis.style.right="5px";	
		imageObjPinThis.style.width = "35px";
		imageObjPinThis.style.height = "35px";
		imageObjPinThis.style.borderRadius="17px"
		imageObjPinThis.style.paddingTop = "0px";		
		imageObjPinThis.style.color = "white";	
		imageObjPinThis.style.fontSize="20px";			
		imageObjPinThis.style.font="lucida grande bold 20px arial,serif";				
		//imageObjPinThis.style.border = "1px solid #992A1B";
		//imageObjPinThis.style.borderRadius="4px";
		imageObjPinThis.style.background = "green"; 
		imageObjPinThis.innerHTML= "&radic;";//"POST THIS";	
		imageObjPinThis.setAttribute("id", "img_post_tag_"+i);
	
		//imageObjPinThis.setAttribute('onmouseover','ChangeColorPost('+i+')');
		//imageObjPinThis.setAttribute('onmouseout','ChangeColorPost2('+i+')');							
		//imageObjPinThis.style.zIndex  = "200000005";		
		
		
		
		
		
		
		
		
		var imageLink = document.createElement("a");
		imageLink.setAttribute("href", "javascript:bookmark('"+images[i].src+"', "+images[i].isVideo+")");
		imageLink.style.boxShadow = " 0px 2px 4px 0px #3B474C";			
		//imageLink.style.width = "228px";	
		imageLink.style.position = "relative";
		imageLink.style.display = "block";						
		
		var imageObj = document.createElement("img");
		imageObj.style.border = "none";
		imageObj.style.margin = "0 auto";		
		imageObj.setAttribute("id", "gmi"+i);
		imageObj.style.boxShadow = " 0px 2px 4px 0px #3B474C";	

		/*	
box-shadow: 0px 2px 4px 0px #3B474C;
-moz-box-shadow: 0px 2px 4px 0px #3b474c;
-webkit-box-shadow: 0px 2px 4px 0px #3B474C;
box-shadow: 0px 2px 4px 0px #3B474C;
-moz-box-shadow: 0px 2px 4px 0px #3b474c;
-webkit-box-shadow: 0px 2px 4px 0px #3B474C;
box-shadow: 0px 2px 4px 0px #3B474C;
-moz-box-shadow: 0px 2px 4px 0px #3b474c;
-webkit-box-shadow: 0px 2px 4px 0px #3B474C;		
		*/
		
		setImageSizeAndPosition(imageObj, images[i], imageSize);
		
		imageObj.setAttribute("src", images[i].src);













		imageLink.appendChild(imageObj);
		
		
		
		imagePinThis.appendChild(imageObjPinThis);
		
		
		imageWrapper.appendChild(imagePinThis);	
		/*
		if (images[i].isVideo) {
			imagePlay.appendChild(imageObjPlay);
			imageWrapper.appendChild(imagePlay);
		}
		*/
		imageWrapper.appendChild(imageLink);
		imageWrapper.appendChild(imageSize);
		cancelButtonWrapper.appendChild(cancelButton);
	//titleDiv.appendChild(metas1);
	//titleDiv.appendChild(metas2);		
	//titleDiv.appendChild(cancelButtonWrapper);
	//container.appendChild(titleDiv);
		//imagesContainer.appendChild(cancelButtonWrapper);					
		//imagesContainer.appendChild(metas1);	
		//imagesContainer.appendChild(metas2);					
		imagesContainer.appendChild(imageWrapper);






		imgSRC.push(urlencode(images[i].src));
		imgWidth.push(images[i].width);
		imgHeight.push(images[i].height);
		
		
		
		
		

	}// end for loop





	msg.imgSRC = imgSRC.join(',');
	msg.imgWidth  = imgWidth.join(',');	
	msg.imgHeight  = imgHeight.join(',');	








	if (images.length == 0) {
		var imagePinThis = document.createElement("a");
		imagePinThis.style.position = "absolute";
		imagePinThis.style.zIndex  = "2147483647";
		//var image_title =images[i].getAttribute('alt')?images[i].getAttribute('alt'):(images[i].getAttribute('title')?images[i].getAttribute('title'):"");
		
		//if(image_title.length > 20){
		//	image_title = image_title.substr(0, 20) + '...';
		//}
	
		
		imagePinThis.setAttribute("href", "javascript:bookmark('', 'false','', '"+escape(metas[0])+"', '"+escape(metas[1])+"')");
		imagePinThis.style.width = "124px";
		imagePinThis.style.height = "30px";
		imagePinThis.style.bottom="0px";
		imagePinThis.style.left="0px";
		//imagePinThis.innerHTML=images[i].getAttribute('alt')?images[i].getAttribute('alt'):images[i].getAttribute('title');
		imagePinThis.style.opacity = "0.7";		
		imagePinThis.style.filter = "alpha(opacity=70)";
		imagePinThis.style.background = "black";
		imagePinThis.style.width = "228px";
		imagePinThis.style.height = "83px";	
		imagePinThis.style.paddingTop = "145px";				
		imagePinThis.style.color = "white";	
		imagePinThis.style.fontSize="13px";				
		imagePinThis.style.font="lucida grande normal 13px arial,serif";
		imagePinThis.style.verticalAlign="bottom";
		imagePinThis.style.textAlign="center";		
		imagePinThis.style.textDecoration="none";			
		imagePinThis.style.display="block";
		imagePinThis.setAttribute("id","pinThis-"+i);	
		
		var imageWrapper = document.createElement("div");
		//imageWrapper.style.border = "1px solid #cccccc";
		imageWrapper.style.cssFloat = "left";
		imageWrapper.style.float = "left";
		imageWrapper.style.width = "228px";
		imageWrapper.style.height = "228px";
		imageWrapper.style.margin = "4px 4px 0 0";
		imageWrapper.style.position = "relative";
		imageWrapper.setAttribute('onmouseover','pinThisOver('+i+')');
		imageWrapper.setAttribute('onmouseout','pinThisOut('+i+')');		
		
		var imageObjPinThis = document.createElement("span");
		imageObjPinThis.style.position = "absolute";		
		imageObjPinThis.style.top="85px";
		imageObjPinThis.style.left="51px";	
		imageObjPinThis.style.width = "124px";
		imageObjPinThis.style.height = "30px";
		imageObjPinThis.style.paddingTop = "10px";		
		imageObjPinThis.style.color = "white";	
		imageObjPinThis.style.fontSize="20px";			
		imageObjPinThis.style.font="lucida grande bold 20px arial,serif";				
		//imageObjPinThis.style.border = "1px solid #992A1B";
		imageObjPinThis.style.borderRadius="4px";
		imageObjPinThis.style.background = "green"; 
		imageObjPinThis.innerHTML= "POST THIS";	
		imageObjPinThis.setAttribute("id", "img_post_tag_"+i);
		imageObjPinThis.setAttribute('onmouseover','ChangeColorPost('+i+')');
		imageObjPinThis.setAttribute('onmouseout','ChangeColorPost2('+i+')');			
		
		imagePinThis.appendChild(imageObjPinThis);		
		imageWrapper.appendChild(imagePinThis);
		imagesContainer.appendChild(imageWrapper);			
	}
	
	
	
	
	
	
	var spacer = document.createElement("div");
	spacer.style.float = "none";
	spacer.style.clear = "both";
	spacer.style.height = "0px";
	spacer.style.lineHeight = "0px";
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	spacer.appendChild(document.createTextNode(" "));
	imagesContainer.appendChild(spacer);
	//cancelButtonWrapper.appendChild(cancelButton);
	//titleDiv.appendChild(metas1);
	//titleDiv.appendChild(metas2);		
	//titleDiv.appendChild(cancelButtonWrapper);
	//container.appendChild(titleDiv);
	container.appendChild(imagesContainer);
	
	
	//return msg;
	
}























function createOverlay(images, metas) {
	
	if (document.getElementById("porn_full_overlay") != null) {
		return;
	}
	
	var height = Math.max(
			Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
			Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
			Math.max(document.body.clientHeight, document.documentElement.clientHeight)
			);
	
	/*
	var iframe = document.createElement("iframe");
	iframe.setAttribute("id","porn_iframe");
	iframe.setAttribute("width", "100%");
	iframe.setAttribute("height", "100%");
	iframe.style.position = "absolute";
	iframe.style.top = "0px";
	iframe.style.right = "0px";
	iframe.style.bottom = "0px";
	iframe.style.left = "0px";
	iframe.style.zIndex = "2147483643";
	iframe.style.background = "transparent";
	iframe.style.border = "none";
	*/
	
	
	
	
	
	var popupDiv = document.createElement("div");
	popupDiv.setAttribute("id","porn_popup");
	popupDiv.style.position = "absolute";
	popupDiv.style.top = "65px";
	popupDiv.style.right = "300px";
	popupDiv.style.width = "75%";
	popupDiv.style.zIndex = "2147483645";
	popupDiv.style.margin = "0 auto";
	//popupDiv.style.background = "#EBEBEB";
	//popupDiv.style.opacity = "0.9";	
	popupDiv.style.textAlign = "left";
	popupDiv.style.display = "none";	
	//popupDiv.style.background = "#F7F5F5 url(http://www.myminelink.com/login/css/logo.png) center center no-repeat";	
	popupDiv.style.border = "1px solid #D2D2D2";		
	popupDiv.style.background = "#393F49";	
	


	displayImages(popupDiv, images, metas);	
	
	
	/*Add a DOM to trigger pop_div FadeIn*/
	/*Add post_this.php?object=msg¡]one image src width height¡^*/
	/*Same Origin Policy crop and cut on Origin and php post to Destimation to edit scribble*/	
		

	
		
	
	//var url = 'ajax.php?object=' + JSON.stringify(json_msg);
	//var testJson = JSON.stringify(msg);
	//var parsed = JSON.parse(testJson);
	//alert( parsed.urlTitle );




	var iframe = document.createElement("iframe");
	iframe.setAttribute("id","porn_iframe");
	iframe.setAttribute("width", "279px");
	iframe.setAttribute("height", "472px");
	//iframe.setAttribute("src", "http://localhost/myminelink/post_this.php?myminelink_user_key="+myminelink_user_key);	
	iframe.setAttribute("src", "http://localhost/myminelink/post_this.php?json_over_url="+encodeURIComponent(JSON.stringify(msg)));		
	iframe.style.position = "fixed";
	iframe.style.top = "10px";
	iframe.style.right = "10px";
	iframe.style.zIndex = "2147483643";
	iframe.style.margin = "0";	
	iframe.style.background = "#eff1f7";
	iframe.style.border = "none";	
	iframe.style.border = "1px solid #D2D2D2";	
	
	
	
	
	
	var fullOverlay = document.createElement("div");
	fullOverlay.setAttribute("id","porn_full_overlay");	
	fullOverlay.style.position = "absolute";
	fullOverlay.style.top = "0px";
	fullOverlay.style.left = "0px";
	fullOverlay.style.width = "100%";
	fullOverlay.style.height = height+"px";
	fullOverlay.style.opacity = "0.9";
	fullOverlay.style.zIndex = "2147483644";
	fullOverlay.style.filter = "alpha(opacity=70)";
	fullOverlay.style.background = "#EBEBEB";	


	
	
	
	
	
	var popupDiv0 = document.createElement("div");
	popupDiv0.setAttribute("id","title_bar");	
	popupDiv0.style.position = "absolute";
	popupDiv0.style.top = "0px";
	popupDiv0.style.left = "0px";
	popupDiv0.style.width = "100%";
	popupDiv0.style.height = "89px";	
	popupDiv0.style.zIndex = "2147483645";
	popupDiv0.style.background = "#F7F5F5 url(http://www.myminelink.com/login/css/logo.png) center center no-repeat";
	popupDiv0.style.opacity = "0.7";	
	popupDiv0.style.textAlign = "left";	
	// http://localhost/sliding_panel3/New_Folder/myminelink/login/css/logo.png
	// http://www.myminelink.com/login/css/logo.png
	var line0 = document.createElement("div");	
	line0.setAttribute("id","title_bar2");	
	line0.style.position = "absolute";
	line0.style.top = "89px";
	line0.style.left = "0px";
	line0.style.width = "100%";
	line0.style.borderBottom = "1px solid #D2D2D2";
	line0.style.borderLeft = "1px solid #D2D2D2";
	line0.style.borderRight = "1px solid #D2D2D2";		
	line0.style.clear = "both";	
	line0.style.marginLeft = "2px";
	line0.style.marginRight = "2px";
	
	
	
	
	var line1 = document.createElement("div");	
	line1.setAttribute("id","title_bar3");	
	line1.style.position = "absolute";
	line1.style.top = "91px";
	line1.style.left = "0px";
	line1.style.width = "100%";
	line1.style.borderBottom = "1px solid #D2D2D2";
	line1.style.borderLeft = "1px solid #D2D2D2";
	line1.style.borderRight = "1px solid #D2D2D2";		
	line1.style.clear = "both";	
	line1.style.marginLeft = "4px";
	line1.style.marginRight = "4px";		
	
	


	//document.body.appendChild(fullOverlay);
	//document.body.appendChild(popupDiv0);
	//document.body.appendChild(line0);
	//document.body.appendChild(line1);				
	//document.body.appendChild(popupDiv);
	
	scroll(0,0);
	
	if (images.length > 0) {
		
		var thumbIcon = document.createElement("img");	
		thumbIcon.setAttribute("id","thumbIcon"); 
		thumbIcon.setAttribute("class","unclick"); 		
		thumbIcon.style.position = "fixed";
		thumbIcon.style.top = "10px";
		thumbIcon.style.right = "300px";
		thumbIcon.style.padding = "0px";	
		//thumbIcon.style.width = "100%";
		thumbIcon.setAttribute("src","https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/ic_menu_smalltiles.png");		
		thumbIcon.style.zIndex = "2147483643";	
		thumbIcon.setAttribute('onclick','thumbImgShow()');
		thumbIcon.setAttribute('onmouseover','thumbIconHover()');		
		thumbIcon.setAttribute('onmouseout','thumbIconOut()');		
		thumbIcon.setAttribute('title',"Grid view to choose image");				
		//thumbIcon.style.background = "#eff1f7";
		thumbIcon.style.background = "url(https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/bg_header.png) repeat";	
		thumbIcon.style.border = "1px solid #D2D2D2";	
		thumbIcon.style.cursor = "pointer";	
			

		
		document.body.appendChild(thumbIcon);		
	}
	
	
	
	document.body.appendChild(popupDiv);	
	document.body.appendChild(iframe);	
	

}















function thumbImgShow(){
	
	var idObj = document.getElementById("porn_popup");	
	if (idObj.style.getPropertyValue("display")=="none") {

		idObj.style.display = "block";
		var idObj = document.getElementById("thumbIcon");
		idObj.setAttribute("src","https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/ic_menu_smalltiles_H.png");		
		idObj.setAttribute("class", "clicked");		
	}
	else {

		idObj.style.display = "none";
		var idObj = document.getElementById("thumbIcon");
		idObj.setAttribute("src","https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/ic_menu_smalltiles.png");		
		idObj.setAttribute("class", "unclick");		
	}
}
function thumbIconHover(){
	var idObj = document.getElementById("thumbIcon");
	if (idObj.getAttribute('class')=="unclick") {
		idObj.setAttribute("src","https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/ic_menu_smalltiles_H.png");	
	}

}
function thumbIconOut(){

	var idObj = document.getElementById("thumbIcon");
	if ( idObj.getAttribute('class')=="unclick") {
		idObj.setAttribute("src","https://s3-ap-northeast-1.amazonaws.com/cdn2.myminelink.com/ic_menu_smalltiles.png");	
	}
}



























var allowPin = true;
var metaTags = document.getElementsByTagName("meta");
for (var i=0 ; i<metaTags.length ; i++) {
	if (metaTags[i].name !== undefined && metaTags[i].name.toLowerCase() == "post" && metaTags[i].content !== undefined && metaTags[i].content == "nopost" ) {
		allowPin = false;
		alert("The owner from this site doesn't allow post from this page. Please contact the owner with any questions.");
	}
}







if (document.location.href.indexOf(domain) != -1) {

	allowPin = false;
	alert("Your bookmarklet is installed! Now you can click your <<Mine It>> button to post links around every browsed websites.");
}
var videoApi;
var videoThumbUrl = "";
var images;
if (allowPin) {
	




	setInterval(function()
	{   
		
		var tf_current_hash = window.location.hash;		
		regexp = /^#(.*)tfbml-data|^#(.*)/;
		var data = tf_current_hash.replace(regexp,'');
		
		
		var json_over_url = decodeURIComponent(data);
		var parsed = JSON.parse(json_over_url);
    	
		if (parsed.close_iframe != undefined && parsed.close_iframe==1){
			var del_node = document.getElementById("porn_iframe");
			del_node.parentNode.removeChild(del_node);
			var del_node2 = document.getElementById("porn_popup");
			del_node2.parentNode.removeChild(del_node2);
			var del_node3 = document.getElementById("thumbIcon");
			del_node3.parentNode.removeChild(del_node3);
        	var p = window.parent;				
            p.location.replace(parsed.location_url);						
		}		  		
		
		if (parsed.iframe_height != undefined && parsed.iframe_height > 0){		
			var del_node = document.getElementById("porn_iframe");
			del_node.style.height = parsed.iframe_height+"px";	
		}
		

	},100); 	



	
	

	var msg, msg2, imgSRC=[], imgWidth=[], imgHeight=[];
	var myminelink_user_key = myminelink_username;


	
	var getUrl = document.location.href;
	var getUrlRoot = getDomain(document.location.href); 





	if ( (getUrlRoot == "www.youtube.com" || getUrlRoot == "vimeo.com" || getUrlRoot == "www.metacafe.com" || getUrlRoot == "video.google.com" || getUrlRoot == "www.megavideo.com" || getUrlRoot == "www.dailymotion.com" ) && !(getUrl == "http://www.youtube.com" || getUrl == "http://vimeo.com" || getUrl == "http://www.metacafe.com" || getUrl == "http://video.google.com" || getUrl == "http://www.megavideo.com" || getUrl == "http://www.dailymotion.com" )  )
	{		
					
					
		metas = getPageMeta();
		
					
		if(metas[0] === undefined){
			metas[0] = '';
		}
		
		if(metas[1] === undefined){
			metas[1] = '';
		}
		
		//metas[0] = addslashes(metas[0]);
		//metas[1] = addslashes(metas[1]);
		
		
		
	
		
		
		
		
		
		msg = {
		
			key : myminelink_user_key,
			video : 1,
			singleMode : 0,
			ImgsNumber : 0,			
			urlTitle : metas[0],
			urlDescription : metas[1],
			pinIndex : 0,			
 			sourceUrl :getUrl,
			sourceUrlRoot :getUrlRoot			
		
		};						
					
						
		/* youtube */
		if (getUrlRoot == "www.youtube.com" ){
			//youtubeFetchData(getUrl);

			
			//msg = {
			//	video_image_src : video_image_src,
			//	video_title : video_title,
			//	video_statistics1 : video_statistics1,
			//	video_statistics2 : video_statistics2		
			//};	  
					
		}
		/* vimeo */
		else if (getUrlRoot == "vimeo.com" ){

			//vimeoLoadingThumb(getUrl);

			//msg = {
			//	video_image_src : video_image_src,
			//	video_title : video_title	
			//};				
			 							
		}					
		/* others video */
		else {
			/* iframe part 					
			$.post("fetch_video.php?url="+escape($('#url').val()), {
			}, function(response){
				$('.images-add').html(response);												
			});									
			$.post("fetch_title.php?url="+escape($('#url').val())+"&titleP="+getUrlRoot, {
			}, function(respond){
				if ($.trim(respond).length > 0) {
					$(".info-add").html(respond);
					$(".modal_add_load_indicator").hide();
					$(".create_add_description").focus();
					$("#modal-add-content").slideDown(500);												
				}
			});	
			*/
		}
		
		


		
		
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id","porn_iframe");
		iframe.setAttribute("width", "279px");
		iframe.setAttribute("height", "552px");
		//iframe.setAttribute("src", "http://localhost/myminelink/post_this.php?myminelink_user_key="+myminelink_user_key);	
		//iframe.setAttribute("src", "http://localhost/myminelink/post_this.php?json_over_url="+encodeURIComponent(JSON.stringify(msg)));
		iframe.setAttribute("src", doc_root+"post_this.php?json_over_url="+encodeURIComponent(JSON.stringify(msg)));		
		iframe.style.position = "fixed";
		iframe.style.top = "10px";
		iframe.style.right = "10px";
		iframe.style.zIndex = "2147483643";
		iframe.style.margin = "0";	
		iframe.style.background = "#eff1f7";
		iframe.style.border = "none";	
		iframe.style.border = "1px solid #D2D2D2";	
		
				
		document.body.appendChild(iframe);		
															
	}
	else {


		videoApi = document.createElement("script");
		videoApi.type = "text/javascript";
		//videoApi.src = "http://upload"+domain+"/javascript/tube_site_api.php?url="+escape(document.location.href);
		//videoApi.src = "http://localhost/myminelink/tube_site_api.php?url="+escape(document.location.href);
		videoApi.src = doc_root+"tube_site_api.php?url="+escape(document.location.href);
		// "http://localhost/sliding_panel3/New_Folder/myminelink/tube_site_api.php?url="
		// "http://www.myminelink.com/tube_site_api.php?url="
		//alert(escape(document.location.href));
		document.body.appendChild(videoApi);    
		
	}
	
	
}