

var pause_load_more     = false;
//var oldScrollTop = 0;
//var initHistory;
//var initTitle;

$(function () { // page load









  	InitIsotope();
  	//InitIsotope2();		
	initScrollToTopButton();
	initFollowButton();
	initFriendButton();
	InitActionFourButton();	
	
	
	
	
	
	
	

	InitSearchlink();
	initViewMode();
	initAboutme();
	initSendMessage();
initChangeAvatarMySettings();


	InitShareIcon();
	// InitTextHover();
	//InitSound();	
	initLoadMessage();	


	
	
	
	


});


/* isotope - InitIsotope
-------------*/ 
function InitIsotope() {	
		var ForceContainerRowLinksNum = 0;	 	
   		var $container = $('#container');
   		
		var Clientwidth = Math.max(
			Math.max(document.body.clientWidth, document.documentElement.clientWidth)
		);
		/*273 = 259(LinkBox width)+7(margin-left)+7(margin-right)*/
		var LinkBoxWidth = 283;
		if (ForceContainerRowLinksNum==1) {
			var ContainerRowLinksNum = 4;
		} else {
			var ContainerRowLinksNum = Math.floor( ( Clientwidth-50 )/LinkBoxWidth );
		}
		var ContainerWidth = ContainerRowLinksNum*LinkBoxWidth;    	
    	$container.css('width',ContainerWidth);
    	//alert(ContainerRowLinksNum);
/*
    	$container.imagesLoaded( function(){
    	  $container.isotope({
    	    itemSelector : '.photo'
    	  });
    	}); 
*/
 		$container.imagesLoaded(function(){
 		$container.isotope({
 		itemSelector: '.photo',
 		masonry: {
 		columnWidth: 283
 		}
 		});
 		});
    			
}	


/*
function InitIsotope2() {		 	
   		var $container = $('#container-small');
    	$container.imagesLoaded( function(){
    	  $container.isotope({
    	    itemSelector : '.CompletePhoto'
    	  });
    	}); 
    			
}
*/











function initScrollToTopButton() {
	
	

		/* scroll to top */
		//$('a[href=#top]').click(function(){
		$("#ScrollToTop").click(function(){	
		    $('html, body').animate({scrollTop:0}, 300);
		    return false;
		});
			
			
		/* scroll down */
		/* By Clicking */
		$("#ScrollToDown").click(function() {
			scrollOnClick(1300);
		    return false;			
		});		
		
		/* By Hovering
		$('#ScrollToDown').live({   
		mouseenter:	
		function()
		{
			scrollOnClick(1300);
		},
		mouseleave:
		function(){
		    return false;					
		}
		});			
		*/
	
		/* scroll to top button show */
		var scroll_timer = null;
		var displayed = false;
		var scrolltotop_button = $('#ScrollToTop'); 
		var $window = $(window);
		var a;
    	var b=$(window).height()/2;
		$window.scroll(function () {
			a=(window.innerWidth?window.pageYOffset:document.documentElement.scrollTop);
			if (a>=b) {
				$("#ScrollToTop").removeClass("Offscreen");
				$("#ScrollToDown").removeClass("Offscreen");
			} else {	
				$("#ScrollToTop").addClass("Offscreen");
			}
		});
	
}
















function InitActionFourButton(){	


					
		/* mine it / Unmine it
		$('.MineItAction, .MineItAction-View').live({
			mouseenter:
			function(){	
				var s = $(this).attr('tid');	
				if ($('#MineItAction'+s).hasClass("greencolor") || $('#MineItAction'+s).hasClass("greencolorRefresh")) {
					$('#MineItAction'+s).html(LOAD_MSG_UNMINE); 
				}							
			},	
			mouseleave:
			function(){
				var s = $(this).attr('tid');	
				if ($('#MineItAction'+s).hasClass("greencolor") || $('#MineItAction'+s).hasClass("greencolorRefresh")) {
					$('#MineItAction'+s).html(LOAD_MSG_MINED); 
				}					
			}
		});	
		*/
		
		
		
		
					
		$('.MineItAction, .MineItAction-View').live("click",function(e) 
		{	
			
			
			e.preventDefault();
			$('.MineItAction, .MineItAction-View').unbind('click');	
			var s = $(this).attr('tid');			
			
			
			//if ($('#MineItAction'+s).hasClass("bluecolor")) {
				

				$('#MineItAction'+s).find('span').html('<img src="worldwide/images/countdown1.gif" style="position:absolute; top:28%; left:23%;">');
				
				var dataString5 = 'profileitemId='+s+'&local_idx='+local_id+'&cat_name='+""+'&create_post_des='+""+'&locked='+0+'&from_home='+1;
				$.ajax({
					url: "collectlink.php?"+dataString5,
					cache: false,
					success: function(html)
					{
						//alert(html);
						$('#MineItAction'+s).removeClass('bluecolor');
				
						$('#MineItAction'+s).addClass('greencolor');
						$('#MineItAction'+s).addClass('edit_mine_it');				 
						$('#MineItAction'+s).html("<span><i class='arrow-s'></i></span>"+LOAD_MSG_MINED); 

						return false;			
					}
				});			
			//}
			/*
			else if ($('#MineItAction'+s).hasClass("greencolor") ) {
				$('#MineItAction'+s).find('span').html('<img src="worldwide/images/countdown1.gif" style="position:absolute; top:28%; left:23%;">');
			
				var dataString5 = 'itemId='+s+'&deleteFrom='+2;
				$.ajax({
					url: "deletelink.php?"+dataString5,
					cache: false,
					success: function(html)
					{				
						$('#MineItAction'+s).removeClass('greencolor');
						$('#MineItActionSubmenu'+s).removeClass('greencolor');				
						$('#MineItAction'+s).addClass('bluecolor');
						$('#MineItActionSubmenu'+s).addClass('bluecolor'); 				 
						$('#MineItAction'+s).html(LOAD_MSG_MINE_IT); 
						$('#MineItActionSubmenu'+s).html("<span><i class='arrow-s'></i></span>"+LOAD_MSG_MINE_IT);	
							return false;				
								
					}
				});					
			}
			else if ($('#MineItAction'+s).hasClass("greencolorRefresh")) {
				
		
				if (confirm("Delete this link you Mine'd , there is no undo.")) {
					$('#MineItAction'+s).find('span').html('<img src="worldwide/images/countdown1.gif" style="position:absolute; top:28%; left:23%;">');	
					var dataString5 = 'itemId='+s;
					$.ajax({
						url: "deletelink.php?"+dataString5,
						cache: false,
						success: function(html)
						{   	
								$('#item'+s).fadeOut('slow');
								$('#item'+s).remove();
								var $container = $('#container');
								$container.isotope('reLayout');	 		
									return false;		
						}
					});
				}
				else {
		
						return false; 	
				}
									
			}
			*/
			return false;	
		});		
		
					
							
		/* Like */	
		$('.vote-like').live("click",function() 		
		{		

			$('.vote-like').unbind('click');
			var IDD 	= $(this).attr('data-id');
			var IDDCnt  = $(this).attr('tid');
			IDDCnt = parseInt(IDDCnt.match(/[0-9.]+/g));								
			//$('#like_button_img'+IDD).attr('src', 'worldwide/images/load2.gif');	
			if($(this).hasClass("like"))
			{				
				
						$('#vote-like'+IDD).removeClass('like');						
						$('#vote-like'+IDD).addClass('liked'); 
						var IDDCnt = IDDCnt+1;
						$('#vote-like'+IDD).find('strong').html(IDDCnt); 	
						$.ajax({
							url: "createnewlike.php?item="+IDD+"&local_id="+local_id+"&remote_id="+0+"&worldwide="+1,
							cache: false,
							success: function(html){
								return false;	
							}
						});
			}
			else if ($(this).hasClass("liked")) {
				
						$('#vote-like'+IDD).removeClass('liked');						
						$('#vote-like'+IDD).addClass('like'); 
						var IDDCnt = IDDCnt-1;
						$('#vote-like'+IDD).find('strong').html(IDDCnt); 					
				
						$.ajax({
							url: "deletelike.php?item="+IDD+"&local_id="+local_id,
							cache: false,
							success: function(html){
									return false;	
							}
						});				
			}
			return false;
		});		



		/* dislike */
		$('.vote-dislike').live("click",function() 		
		{		

			$('.vote-dislike').unbind('click');
			var IDD = $(this).attr('data-id');
			var IDDCnt = $(this).attr('tid');		
			IDDCnt =  parseInt(IDDCnt.match(/[0-9.]+/g));										
			//$('#like_button_img'+IDD).attr('src', 'worldwide/images/load2.gif');	
			if($(this).hasClass("dislike"))
			{				

						$('#vote-dislike'+IDD).removeClass('dislike');						
						$('#vote-dislike'+IDD).addClass('disliked'); 
						IDDCnt = IDDCnt+1;
						$('#vote-dislike'+IDD).find('strong').html(IDDCnt); 	
						$.ajax({
							url: "createnewdislike.php?item="+IDD+"&local_id="+local_id+"&remote_id="+0+"&worldwide="+1,
							cache: false,
							success: function(html){
									return false;	
							}
						});
			}
			else if ($(this).hasClass("disliked")) {
				
						$('#vote-dislike'+IDD).removeClass('disliked');						
						$('#vote-dislike'+IDD).addClass('dislike'); 
						IDDCnt = IDDCnt-1;
						$('#vote-dislike'+IDD).find('strong').html(IDDCnt); 				
						$.ajax({
							url: "deletedislike.php?item="+IDD+"&local_id="+local_id,
							cache: false,
							success: function(html){
									return false;	
							}
						});				
			}
			return false;
		});	



		/* comment*/
		$('.comment_mine_it').live("click",function() 
		{		
			$('.comment_mine_it').unbind('click');		
			var s = $(this).attr('data-id');
			var fromWhere = $(this).attr('tid'); 
			if (fromWhere=="popUpView") {
				$('#ctextarea'+s).focus();
			}
			else if (fromWhere=="worldwideView") { 
				$('#AddComment-worldwide'+s).toggle();
				if ($('#AddComment-worldwide'+s).css('display')=="none"){
					$(this).addClass('disabled');	
				}
				else {
					$(this).removeClass('disabled');
				}
				var $container = $('#container');	
				$container.isotope('reLayout');   		
				$('#ctextarea'+s).focus();
			}			
		});	 
		//$('.comment-worldwide').bind('input propertychange', function() {
		$('.comment-worldwide').live("click",function() 
		{
			$('.comment-worldwide').unbind('click');		
			var s = $(this).attr('data-id');	
			var $container = $('#container');			
			//$("#ctextarea"+s).focus();
			//$("#ctextarea"+s).css('height','150px');//expand/shrink	
			$('#commentbutton'+s).fadeIn('slow');
			$container.isotope('reLayout');	     						
			return false;		
		});	
		
		$('.popPanelCommentTextareaJS').live("click",function() 
		{		
			$('.answer').find('.avatar').fadeIn(10);
			$('.answer').find('.controls').fadeIn(10);		
		});	
		
		$(document).mouseup(function()
		{
			//$(".comment-worldwide").css('height','20px');	//expand/shrink
				var $container = $('#container');	
				$container.isotope('reLayout');						
		});			
		
		
		
		$('.commentbutton').live("click",function() 
		{				
			if ($(this).hasClass('disabled')) {
				return false;				
			}
			$('.commentbutton').unbind('click');
			var IDI = $(this).attr('data-id');	
				
			var comment = $("#ctextarea"+IDI).val();
			var htmlcontent =$("#loaderhtml"+IDI).html();
			var dataString = 'comment='+comment+'&item='+IDI+"&local_id="+local_id+"&remote_id="+0+"&worldwide="+1+"&htmlcontent="+escape(htmlcontent);
			if($.trim(comment).length==0)
			{
				alert("Please Enter Comment Text");
			}
			else
			{
				$('#commentbutton'+IDI).addClass('disabled'); 					
				$("#numComments"+IDI).html('<img src="worldwide/css/ajax-loader.gif" alt="Loading Animation">');
				var ori_text= $("#commentbutton"+IDI).val();
				$("#commentbutton"+IDI).val(ori_text+'...');				
				$.ajax({
					type: "POST",
					url: "createnewcomment.php",
					data: dataString,
					cache: false,
					success: function(html){

						$("#ctextarea"+IDI).val('');
						$("#commentbutton"+IDI).val(ori_text);																	
						$("#UpdateComment"+IDI).append(html);
						$('#commentbutton'+IDI).removeClass('disabled');						
			 			var $container = $('#container');	
			 			setTimeout(function(){ 
						$container.isotope('reLayout');
						},300);
											
					}
				});															
			}
			return false;
		});	
		
		
    	//$('.popPanelCommentTextareaJS').bind('keydown', function(e){
    	$('.popPanelCommentTextareaJS').live('keydown', function(e){
    	    if (e.keyCode == 13) {
    	
    		//if (!args) { var args = []; }
    	
    		if (e.which === 65 && (e.ctrlKey || e.metaKey)) {
    	    	// allow the user to ctrl+a or cmd+a to select text
    	    	// without calling a new search function
    		} else {
    			var IDI = $(this).attr('data-id');
    			
    			
    			//alert(IDI);
    			viewCommentSubmit(IDI);
			}        	
    	    	
    	    }
    	});			
		

		function viewCommentSubmit(IDI) {	
			
			
			//if ($(this).hasClass('disabled')) {
			//	return false;				
			//}

			//$('.commentbutton-view').unbind('click');
			//var IDI = $(this).attr('data-id');			
			var comment= $("#ctextarea"+IDI).val();
			var htmlcontent=$("#loaderhtml"+IDI).html();
			var dataString='comment='+comment+'&item='+IDI+"&local_id="+local_id+"&remote_id="+0+"&worldwide="+2+"&htmlcontent="+escape(htmlcontent);
			if($.trim(comment).length==0)
			{
				alert("Please Enter Comment Text");
			}
			else
			{
				//$('#commentbutton'+IDI).addClass('disabled'); 				
				//$("#numComments"+IDI).html('<img src="worldwide/css/ajax-loader.gif" alt="Loading Animation">');
				var ori_textPosting=$(".popPanelCommentLabelJS").html();
				$(".popPanelCommentLabelJS").html('Posting...');
				var ori_text= $("#commentbutton"+IDI).val();
				$("#commentbutton"+IDI).val(ori_text+'...');							
				$.ajax({
					type: "POST",
					url: "createnewcomment.php",
					data: dataString,
					cache: false,
					success: function(html){

						$("#ctextarea"+IDI).val('');
						$("#commentbutton"+IDI).val(ori_text);	
						$(".popPanelCommentLabelJS").html(ori_textPosting);																
						$("#UpdateComment"+IDI).append(html);
						//$('#commentbutton'+IDI).removeClass('disabled');								
			 			//var $container = $('#container');	
			 			//setTimeout(function(){ 
						//$container.isotope('reLayout');
						//},300);					
					}
				});															
			}
			return false;
		};	

		
		$('.commentbutton-view').live("click",function() 
		{	
			
			if ($(this).hasClass('disabled')) {
				return false;				
			}

			$('.commentbutton-view').unbind('click');
			var IDI = $(this).attr('data-id');			
			var comment= $("#ctextarea"+IDI).val();
			var htmlcontent=$("#loaderhtml"+IDI).html();
			var dataString='comment='+comment+'&item='+IDI+"&local_id="+local_id+"&remote_id="+0+"&worldwide="+2+"&htmlcontent="+escape(htmlcontent);
			if($.trim(comment).length==0)
			{
				alert("Please Enter Comment Text");
			}
			else
			{
				$('#commentbutton'+IDI).addClass('disabled'); 				
				//$("#numComments"+IDI).html('<img src="worldwide/css/ajax-loader.gif" alt="Loading Animation">');

				var ori_text= $("#commentbutton"+IDI).val();
				$("#commentbutton"+IDI).val(ori_text+'...');							
				$.ajax({
					type: "POST",
					url: "createnewcomment.php",
					data: dataString,
					cache: false,
					success: function(html){

						$("#ctextarea"+IDI).val('');
						$("#commentbutton"+IDI).val(ori_text);																	
						$("#UpdateComment"+IDI).append(html);
						$('#commentbutton'+IDI).removeClass('disabled');								
			 			var $container = $('#container');	
			 			setTimeout(function(){ 
						$container.isotope('reLayout');
						},300);					
					}
				});															
			}
			return false;
		});	



		/* uncomment */
		$('.comment_button_delete').live("click",function() 
		{		
				$('.comment_button_delete').unbind('click');
									
				var IDD = $(this).attr('data-id');
				var IDD2 = $(this).attr('tid');				
				if(confirm("Sure you want to delete this update? There is NO undo!"))
				{
					$('#comment_button_delete'+IDD).html('<img src="worldwide/images/load2.gif">');
					
					var ctext = $('#comment_text'+IDD).html();							
					if(IDD)
					{						
						$.ajax({
							url: "deletecomment.php?item="+IDD2+"&id="+IDD+"&local_id="+local_id+"&ctext="+ctext,
							cache: false,
							beforeSend: function(){     $("#each_comment_area"+IDD).animate(  {'backgroundColor':'#fca6a6'},300  );     },							
							success: function(){
								$("#each_comment_area"+IDD).fadeOut(     300,function(){  $("#each_comment_area"+IDD).remove();  }     );						 					           	
							}
						});
					}
					return false;
				}
				return false;
		});	

		
}





function initFollowButton() {
	
		// Follow this list
		$(".follow-list-view").live('click',function(e)	{

			if ($(this).hasClass('disabled')) {
				return false;				
			}			
			e.preventDefault();	
			$('.follow-list-view').unbind('click');	
	
			var s    		= $(this).attr("data-id");					
			var ssId5 		= $(this).attr("alt");
			var exploded_ids = ssId5.split('_');
										
			var s0 = 0;
			if(exploded_ids[0]){s0 = parseInt(exploded_ids[0].match(/[0-9.]+/g));}
			var s1 = 0;
			if(exploded_ids[1]){s1 = parseInt(exploded_ids[1].match(/[0-9.]+/g));}	

			if ($("#follow-list-view"+s).html()== VIEW_FOLLOW) {
				$('#follow-list-view'+s).addClass('disabled'); 	
				$("#follow-list-view"+s).html(VIEW_FOLLOW+"..");
								
				$.ajax({
					url: "createnewfollow.php?fid="+s0+'&uid='+s1+'&cat='+exploded_ids[2],
					statusCode: {
						404: function() {
							$('#follow-list-view'+s).removeClass('disabled'); 								
							alert('Something went wrong. Please reload this page and try again.');
						},
						200: function() {
//							if ( $("#follow-list-view"+s).hasClass('follow-view') ){
//								$("#follow-list-view"+s).removeClass('follow-view');
//								$("#follow-list-view"+s).addClass('followed-view');						
//							}
//							else if ($("#follow-list-view"+s).hasClass('follow-view-add')){
//								$("#follow-list-view"+s).removeClass('follow-view-add');
//								$("#follow-list-view"+s).addClass('followed-view-add');																
//							}
							$('#follow-list-view'+s).removeClass('disabled'); 	
							if ( $("#follow-list-view"+s).hasClass('RedButton') ){
								$("#follow-list-view"+s).removeClass('RedButton');
								$("#follow-list-view"+s).addClass('WhiteButton');						
							}

							$("#follow-list-view"+s).html(VIEW_UNFOLLOW);								
						}
					}	
				});
			}
			else { 
			//else if ($("#follow-list-view"+s).html()== VIEW_UNFOLLOW){	
				$('#follow-list-view'+s).addClass('disabled'); 
				$("#follow-list-view"+s).html(VIEW_UNFOLLOW+"...");				
				$.ajax({
					url: "deletefollow.php?fid="+s0+'&uid='+s1+'&cat='+exploded_ids[2],
					statusCode: {
						404: function() {
							$('#follow-list-view'+s).removeClass('disabled'); 							
							alert('Something went wrong. Please reload this page and try again.');
						},
						200: function() {
//							if ($("#follow-list-view"+s).hasClass('followed-view')){
//								$("#follow-list-view"+s).removeClass('followed-view');
//								$("#follow-list-view"+s).addClass('follow-view');					
//							}
//							else if ($("#follow-list-view"+s).hasClass('followed-view-add')){
//								$("#follow-list-view"+s).removeClass('followed-view-add');
//								$("#follow-list-view"+s).addClass('follow-view-add');									
//							}	
							$('#follow-list-view'+s).removeClass('disabled'); 	
							if ($("#follow-list-view"+s).hasClass('WhiteButton')){
								$("#follow-list-view"+s).removeClass('WhiteButton');
								$("#follow-list-view"+s).addClass('RedButton');					
							}
						
							$("#follow-list-view"+s).html(VIEW_FOLLOW);								
						}
					}	
				});				
			}									
		});				
}







function initFriendButton() {

		// Follow this list
		$(".friend-list-view").live('click',function()	{
		
			$('.friend-list-view').unbind('click');			
			var s    		 = $(this).attr("data-id");					
			var ssId5 		 = $(this).attr("alt");
			var exploded_ids = ssId5.split('_');
										
			var s0 = 0;
			if(exploded_ids[0]){
				s0 = parseInt(exploded_ids[0].match(/[0-9.]+/g));
			}

			var s1 = 0;
			if(exploded_ids[1]){
				s1 = parseInt(exploded_ids[1].match(/[0-9.]+/g));
			}	

			if ($("#friend-list-view"+s).html() == VIEW_FRIEND) {


				$("#friend-list-view"+s).html(VIEW_FRIEND+"..");	
				
							
				$.ajax({
					url: "createnewfriend.php?fid="+s0+'&uid='+s1+'&step='+1,
					statusCode: {
						404: function() {
							alert('Something went wrong. Please reload this page and try again.');
						},
						200: function() {
							$("#friend-list-view"+s).removeClass('friend-view-add');
							$("#friend-list-view"+s).addClass('friend-view-confirm');																
							$("#friend-list-view"+s).html(VIEW_WAITFRIEND);								
						}
					}	
				});
			}
			else if ( $("#friend-list-view"+s).html()== VIEW_ACCEPTFRIEND) {


				$("#friend-list-view"+s).html(VIEW_ACCEPTFRIEND+"..");		
				
						
				$.ajax({
					url: "createnewfriend.php?fid="+s0+'&uid='+s1+'&step='+2,
					statusCode: {
						404: function() {
							alert('Something went wrong. Please reload this page and try again.');
						},
						200: function() {

							$("#friend-list-view"+s).removeClass('friend-view-confirm');
							$("#friend-list-view"+s).addClass('followed-view-add');																				
							$("#friend-list-view"+s).html(VIEW_UNFRIEND);								
						}
					}	
				});				
				
			}
			else if ($("#friend-list-view"+s).html()== VIEW_UNFRIEND){
					   
					   
				$("#friend-list-view"+s).html(VIEW_UNFRIEND+"..");	
				
							
				$.ajax({
					url: "deletefriend.php?fid="+s0+'&uid='+s1,
					statusCode: {
						404: function() {
							alert('Something went wrong. Please reload this page and try again.');
						},
						200: function() {
							$("#friend-list-view"+s).removeClass('followed-view-add');
							$("#friend-list-view"+s).addClass('friend-view-add');									
								
							$("#friend-list-view"+s).html(VIEW_FRIEND);								
						}
					}	
				});				
			}									
		});				
}
















function initIframewmode(){
 		/* Iframe z-index not always the frontest */ /*if no iframe in Homepage, no need*/   	
 		$("iframe").each(function(){
 		    var ifr_source = $(this).attr('src');
 		    var wmode = "wmode=transparent";
 		    if(ifr_source.indexOf('?') != -1) {
 		        var getQString = ifr_source.split('?');
 		        var oldString = getQString[1];
 		        var newString = getQString[0];
 		        $(this).attr('src',newString+'?'+wmode+'&'+oldString);
 		    }
 		    else $(this).attr('src',ifr_source+'?'+wmode);
 		});
}





var globalPanelHeight = 0;
var globalPanelHeight2 = 0;

var oldScrollTop;
var ajaxPinId = 0;
var initialUrl = window.location.href;
//alert(initialUrl);
var dirctoryPath = "/myminelink/index.php#";


function pushState(urlPath, title) {
	urlPath = dirctoryPath+urlPath;
	if (window.history.pushState) {
		window.history.pushState(null, title, urlPath);
	} else {
		window.location.hash = urlPath;
	}
}  



function bindAjaxNavigation() {

	$('a[rel="ajax"]').live("click",function() {
				
		//alert(dirctoryPath+$(this).attr('href'));
				
		// push state
		pushState($(this).attr('href'), "Pin Title");
		
		// load pin
		if (window.history.pushState) {
			loadPin($(this).attr('href'));
		}
		
		// save screen position
		oldScrollTop = $(window).scrollTop();
        
        // prevent default handler (open in new window)
        return false;
        		
		//$.address.value($(this).attr('href'));
        //return false;
    });
}

function initAjaxNavigation() { 
	            


	// there's a hash tag already
	if (window.location.hash) {

		// remove # from path
		var requestedPath = window.location.hash.replace('#', '');
		// check if it's a pins url
		var pregMatch = requestedPath.match(/\/mine\/[0-9]+/);
			
		// yes it's a pin
	    if (pregMatch) {	
	        window.location.href = requestedPath;
	    }
	}

	if (window.history.pushState) {
		
		window.addEventListener("popstate", function(e) {
						
			var requestedPath = document.location.pathname;
			// check if it's a pins url
			var pregMatch = requestedPath.match(/\/mine\/[0-9]+/);
			
			// yes it's a pin
	        if (pregMatch) {	        	
	        	// laod pin
	        	loadPin(requestedPath);
	        } else {
	        	unPopPin();
	        }
		});
		
	} else {
		
		$(window).bind('hashchange', function() {
			
			// get request url from hash
			var requestedPath = window.location.hash;
			// remove # from path
			requestedPath = requestedPath.replace('#', '');
				
			// check if it's a pins url
			var pregMatch = requestedPath.match(/\/mine\/[0-9]+/);
				
			// yes it's a pin
		    if (pregMatch) {	
		    	// load pin
		        loadPin(requestedPath);
		    } else {
		       	unPopPin();
		    }
		});
	}
	
	
	

	bindAjaxNavigation();
	
	
	
	// bind escape key and arrows
	$(document).keyup(function(e) {
		if (e.keyCode == 37 || e.keyCode == 38) { // left, up
			loadPrevPin();
		} else if (e.keyCode == 39 || e.keyCode == 40) { // right, down
			loadNextPin();
		} else if (e.keyCode == 27) { // escape
			
			unPopPin();
			if (window.history.pushState) {
				pushState(initialUrl, "Pin Title", {event:'unpop'});
			} else {
				pushState("#", "Pin Title");
			}
		}
	});	
    $('#pin_ajax_overlay, .exit_couch_modeJs').live("click",function() {
			
			unPopPin();
    		//history.back();
    		if (window.history.pushState) {
				pushState(initialUrl, "Pin Title", {event:'unpop'});
			} else {
				pushState("#", "Pin Title");
			}
    });
    $('.pin_ajax_prevJS').live("click",function() {
    	loadPrevPin();
    });
    $('.pin_ajax_nextJS').live("click",function() {
    	loadNextPin();
    });   
}


function loadPrevPin() {
	
	if (!ajaxPinId) {
		return;
	}
	var currentEl = $('.linkboxJS[data-id='+ajaxPinId+']');
	var prevPinUri = currentEl.prev('.linkboxJS').attr('data-id');
	if (prevPinUri) {
		pushState(dirctoryPath+"/mine/"+prevPinUri+"/", "Pin Title", {event:'prev'});
		if (window.history.pushState) {
			loadPin("/mine/"+prevPinUri+"/");
		}
	} else {
			unPopPin();
			if (window.history.pushState) {
				pushState(initialUrl, "Pin Title", {event:'unpop'});
			} else {
				pushState("#", "Pin Title");
			}
	}
}


function loadNextPin() {
	
	if (!ajaxPinId) {
		return;
	}
	var currentEl = $('.linkboxJS[data-id='+ajaxPinId+']');
	var nextPinUri = currentEl.next('.linkboxJS').attr('data-id');
	var nbNextPins = currentEl.nextAll('.linkboxJS').length - 2;
	if (nextPinUri) {
		pushState(dirctoryPath+"/mine/"+nextPinUri+"/", "Pin Title", {event:'next'});
		if (window.history.pushState) {
			loadPin("/mine/"+nextPinUri+"/");
		}
	} else {
			unPopPin();
			if (window.history.pushState) {
				pushState(initialUrl, "Pin Title", {event:'unpop'});
			} else {
				pushState("#", "Pin Title");
			}
	}
	
	// there is a next page and only 3 pin after that, let's load new content
	if ($('#masonry_container').data('infinitescroll').options) {
		var currentPage = $('#masonry_container').data('infinitescroll').options.state.currPage;
		if (currentPage < 10 && nbNextPins == 3) {
			$('#masonry_container').infinitescroll('retrieve');
		}
	}
}


function loadPin(pinUrl){

			$('#loadingGeneral').show();					
			
            var s = parseInt(pinUrl.match(/[0-9.]+/g));
			ajaxPinId = s;
			var dataString = 'itemID='+s+'&uid='+local_id;
		   
			var height = Math.max(
				Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
				Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
				Math.max(document.body.clientHeight, document.documentElement.clientHeight)
			);
        	$('#pin_ajax_overlay').height( height + 'px');			
			$('#pin_ajax_overlay').show();
			$('#pin_ajax_prev').show();
			$('#pin_ajax_next').show();
			
			$.ajax({
				type: "GET",
				url: "content_iframe.php",
				data: dataString,
				cache: true,
				success: function(data)
				{
					_gaq.push(['_trackPageview', pinUrl]);
					//alert(data);
					popPin(data);	
				}
			});    
			
			$.ajax({
				type: "GET",
				url: "content.php",
				data: dataString,
				cache: false,
				success: function(data)
				{						
					$('.popupPanelContentJS').html(data);
					$('.popupPanelContentJS').find('.streamCommentJS').css('height', globalPanelHeight);
					$('.popupPanelContentJS').find('.streamRecommendJS').css('height', globalPanelHeight2);
					$('#loadingGeneral').fadeOut(10);										

					initPanelSlide();				
				}
			});
			return false;		
}

function popPin(data) {
		pause_load_more = true;

		$('#pin_ajax_view').stop().animate( { right: '0%' }, 1300 );
		
		$('#pin_ajax_view').html(data);
    	var iframe_width = $('#pin_ajax_view').width(); 
    	var iframe_height = $('#pin_ajax_view').height();   	
		$('#pin_ajax_view').find('object').css('width', iframe_width);	
		$('#pin_ajax_view').find('object').css('height', iframe_height);	
		$('#pin_ajax_view').find('iframe').css('width', iframe_width);	
		$('#pin_ajax_view').find('iframe').css('height', iframe_height);	
		globalPanelHeight = iframe_height*0.8;
		globalPanelHeight2 = iframe_height*0.2;	
		
		
		$('.popupPanelTagJS').show();
		$('.popupPanelContentJS').css('height', iframe_height);	


		$('.exit_couch_modeJs').fadeIn(10);			

			
		$("body").css("overflow", "hidden");						
		$(window).scrollTop(0);		
}

function unPopPin() {
	pause_load_more = false;

	$(window).scrollTop(oldScrollTop);
	
	$('#pin_ajax_overlay').fadeOut(50);
	$('#pin_ajax_view').stop().animate( { right: '-101%' }, 400 );
	$('#pin_ajax_view').html('');
	
	$('.popupPanelJS').stop().animate( { left: '-382px' }, 10 );
	$('.popupPanelTagJS').hide();
	$(".popupPanelContentJS").html('');
	
	$('.exit_couch_modeJs').fadeOut(10);							
	$('#pin_ajax_prev').hide();
	$('#pin_ajax_next').hide();	
	
	$("body").css("overflow", "auto");
	
	pause_load_more = false;
	
	// reset current pin id
	ajaxPinId = 0;	
}















function initPanelSlide(){
	
		var panelWidth = "-382px";
		$('.popupPanelJS').stop().animate( { left: '0px' }, 300 );
		setTimeout(function(){ 
			$('.popupPanelJS').stop().animate( { left : panelWidth}, 700 );															
		},1500);


		$('.popupPanelTagJS').live({   
		mouseenter:	
		function()
		{
			$('.popupPanelJS').stop().animate( { left: '0px' }, 700 );					
		},
		mouseleave:
		function(){}
		});	


		$('.popupPanelJS').live({   
		mouseenter:	
		function()
		{},
		mouseleave:
		function(){
			$('.popupPanelJS').stop().animate( { left: panelWidth }, 700 );							
		}
		});			

		/*
    	$('.Couchiframe, #pin_ajax_view, .video_controlsJs').live("click",function(e) {	
   			var $clicked = $(e.target); 
   			if (   (! $clicked.hasClass("comment_mine_it")) ) {
					$('#panel').addClass('socail_controls_show').addClass('socail_controls_panel_Left').removeClass('socail_controls_hide');
					$('.socail_controlsJs').stop().animate( { top : - $('.socail_controlsJs').width() - 10 + 'px' }, 300 );
			}
			else {
					$('#panel').addClass('socail_controls_hide').removeClass('socail_controls_panel_Left').removeClass('socail_controls_show');
					$('.socail_controlsJs').stop().animate( { top : '0px' }, 300 );				
			}
		});
		*/	
}





function InitSearchlink() {
	
	$(".searchBtn").live('click',function()	{
		
		$('#sub_cont').hide();
		$('.deletesearch2').hide();		
		$('#sub_cont').html('');
		$("#search").val('');
		if ($("#search").css('display')=="none") {					
			$('#search').slideDown(300);
		}
		else  {
			$('#search').slideUp(300);			
		}
				
	});		
	
	//$('#search').bind('input propertychange', function() {			     
	$('.allworldwideSearch').find('.Button').click(function(e) {      	
      	//var dataString = $("#search").val();
      	var dataString = $('.allworldwideSearch').find('input').val();
      	//alert(dataString);
      	if($.trim(dataString).length > 1) {

			$('#sub_cont').fadeIn(1500);
			$("#sub_cont").load("search.php?val=" + dataString+"&lookatcat="+2+"&remote_id="+0);
			$('.deletesearch2').fadeIn(1500);	
						
      	}
      	  	  
    });
    
	$('.allworldwideSearch').find('input').bind('keydown', function(e){
        if (e.keyCode == 13) {
      		//var dataString = $("#search").val();
      	var dataString = $('.allworldwideSearch').find('input').val();
      	//alert(dataString);      		
      		if($.trim(dataString).length > 1) {
        	
				$('#sub_cont').fadeIn(1500);
				$("#sub_cont").load("search.php?val=" + dataString+"&lookatcat="+2+"&remote_id="+0);
				$('.deletesearch2').fadeIn(1500);
								
      		}     	
        }	
	});	    
    
    
    
    	
	$(".deletesearch, .deletesearch2").live('click',function()	{					
		
		$('#sub_cont').fadeOut(500);	 
		$('.allworldwideSearch').find('input').val('');
		$('.deletesearch2').fadeOut(500);	
		 	
	});	
	
	
	
}






function initViewMode(){
	
	$('.containermenumodeout').live("click",function()
	{
		var IDint = $(this).attr("data-id");
		if (IDint ==1){
			var IDintincerse = 0;
		}
		else {
			var IDintincerse = 1;	
		} 
		$('.containermenumodeout').attr("class",'containermenumodeclick');
		$('#menumode'+IDintincerse).attr("class",'containermenumodeout');			
	  	var dataString = 'menumode='+ IDint+'&thiscat='+thisCat+'&thisitem='+thisitem+'&remote_id='+remote_id;
		$.ajax({
				type: "POST",
				url: "set_menumode.php",
				data: dataString,
				cache: false,
				success: function(html){
					$('#container').html('');
					$('#container').append(html);
					
					
			 			var $container = $('#container');	
			 			setTimeout(function(){ 
						//$container.isotope('reLayout');
						},200);										
	
				}
		});	
	}); 	
	
	
}





function initAboutme(){
	
	$('.edit_searchicon2-intro, .no_profile, .with_profile').click(function()
	{
		$('#text_wrapper').hide();
		var data=$('#text_wrapper').html();
		$('.editbox').show();
		$('.editbox').html(data);
		$('.editbox').focus();
	});	
	$(".editbox").mouseup(function() 
	{
		return false
	});
	$(".editbox").change(function() 
	{
		var boxval = $(".editbox").val();
		var dataString = 'data='+ boxval;
		$.ajax({
		type: "POST",
		url: "update_profile_ajax.php",
		data: dataString,
		cache: false,
		success: function(html)
		{
		$('.editbox').fadeOut('slow');
		$('#text_wrapper').html(boxval);
		$('#text_wrapper').attr("class",'with_profile');
		$('#text_wrapper').show();
		alert("You have described your status suscessfully !");
		}
		});
	});
	$(document).mouseup(function()
	{
		$('.editbox').hide();
		$('#text_wrapper').show();
	});	
	
	
	
}




function initSendMessage(){
	
	$('.replyMsgButton').live("click",function()
	{	
			//var item_id            = $(this).attr("data-id");
			var subject            = $(".replyMsgText").val();
			if ($.trim(subject).length==0) {
				alert('Please write some message.');
				return false;						
			}					
			var f_ids              = $(this).attr("data-id");				
			var tid                = $(this).attr("tid");			
			

			if ($(this).html()== "Reply"){
				var IDD = 1;
			}
			else if ($(this).html()== "Reply All"){
				var IDD = 2;				
			}
			var ori_text = $('#replyMsgButton'+IDD).html();			
			$('#replyMsgButton'+IDD).html(ori_text+"...");
			var dataString = 'f_ids='+f_ids+'&local_id='+local_id+'&item_id='+0+'&subject='+subject+'&profile_id='+tid+'&message_id='+3+'&message_html='+'';
			
			
			$.ajax({
				type: "GET",
				url: "createnewmessage.php",
				data: dataString,
				cache: false,
				success: function(html)
				{
        			//$('#msgcontainer').append(html);
        			$('#msgcontainer').prepend(html);
					$('#replyMsgButton'+IDD).html(ori_text);
					$(".replyMsgText").val('');	
					if (IDD==1) {
						$('#replyMsgButton2').fadeOut(10);						
					}															
				}
			});			
	
	});		
	
}








function initChangeAvatarMySettings(){
	

			
			$('.ChangePassword').click(function(e){	
				                e.preventDefault();			
				$("#ChangePasswordForm").toggle(); 	
		    });	
	
	
	
			$('.DeactivateAccount').click(function(e){	
				                e.preventDefault();			
				$("#DeactivateForm").toggle(); 	
		    });		
		    
		    
		    
            $('#enable_button').click(function() {
                if ($(this).is(':checked')) {
                  $('#deactivate_user_account_confirm').removeAttr('disabled').removeClass('disabled');
                } else {
                  $('#deactivate_user_account_confirm').attr('disabled', 'disabled').addClass('disabled');
                }
            });	
	
	
	
	
			$('.editpage_submit').click(function(){	
	
				$(".error").html(''); 	
		    });		
	
	
	
			$("#id_img, #id_img2").change(function(){
				
				$("#error_image_upload").html('');
				$(".current_avatar").hide(); 
				$(".spinner").show();
				var s =$(this).attr("tid");
		        var data = new FormData();
		        if (s=="Big") {
		        	$.each($('#id_img')[0].files, function(i, file) {
		        	   	data.append('file', file);
		        	});
		    	} else if (s=="Small") {
		    			//alert($(this).attr("data-id"));	 
		       		$.each($('#id_img2')[0].files, function(i, file) {
		        	   	data.append('file', file);
		        	});
				} else {
		        	$.each($('#id_img')[0].files, function(i, file) {
		        	   	data.append('file', file);
		        	});					
				}
				if ($(this).attr("data-id")=="allworldwide") {// Type1	

					var s =$(this).attr("tid");
					data.append('itemID', s);
					data.append('local_id', local_id);
					
					$.ajax({
						type: "POST",
						url: "allworldwide_avatar.php",
						data: data,
						datatype:'json',
						cache: false,
                	    contentType: false,    
                	    processData: false,    				
						success: function(json)
						{
							$(".spinner").fadeOut(10);			
		        	
							//$(".current_avatar").attr('src',json.bighead);
							$("#a_class"+s).find('img').attr('src',json.smallhead);
							$("#a_class"+s).find('img').show();
							//$(".id_img_current").val(json.bighead);
							//$(".id_img_current2").val(json.smallhead);						
							//$(".current_avatar").fadeIn(10); 						
							//$("#error_image_upload").html(json.message);
							
							$("#UploadImage"+s).remove();
							//$(".img_change_current").val(1);	
							var $container = $('#container');	
			 				setTimeout(function(){ 
								$container.isotope('reLayout');
							},300);					
											 	
						}
					});	
				}
				else if ( ($(this).attr("data-id")=="editSpecialCover") || ($(this).attr("data-id")=="editSpecialCover2") ) {// Type2   
					//alert("555");
					
					//alert(s);
					data.append('type', s);
					if (s=="Big") {
						if($(".editSpecialCoverLabelJS").hasClass('unload')){
                		$(".editSpecialCoverLabelJS").removeClass('unload');
                		$(".editSpecialCoverLabelJS").addClass('loading');
                		}   
                	} else if (s=="Small") {
                		if($(".editSpecialCoverLabelSmallJS").hasClass('unloadS')){
                		$(".editSpecialCoverLabelSmallJS").removeClass('unloadS');
                		$(".editSpecialCoverLabelSmallJS").addClass('loading');
                		}
                	}
					$.ajax({
						type: "POST",
						url: "FORMAL_CropUploadAjax.php",
						data: data,
						datatype:'json',
						cache: false,
            		    contentType: false,    
            		    processData: false,    				
						success: function(json)
						{
							if (s=="Big") {
								if($(".editSpecialCoverLabelJS").hasClass('loading')){
                				$(".editSpecialCoverLabelJS").removeClass('loading');
                				$(".editSpecialCoverLabelJS").addClass('unload');
                				}   
                			} else if (s=="Small") {
                				if($(".editSpecialCoverLabelSmallJS").hasClass('loading')){
                				$(".editSpecialCoverLabelSmallJS").removeClass('loading');
                				$(".editSpecialCoverLabelSmallJS").addClass('unloadS');
                				}
                			}							
							
							//$(".spinnerJS").fadeOut(10);			
							//$(".current_bigcoverJS").attr('src',json.bighead);
							$(".id_img_current").val(json.bighead);
							$(".id_img_current2").val(json.smallhead);						
							$(".current_bigcoverJS").fadeIn(10); 						
							$("#error_image_upload").html(json.message);
							$(".img_change_current").val(1);
							/*
							$(".cropBgJS").find('img').attr('src', json.bighead);
							$(".cropBgJS").find('img').css('width', json.bigheadWidth);
							$(".cropBgJS").find('img').css('height',json.bigheadHeight);
							*/
							$('#duck').attr('src', json.bighead);
							$('#duck').attr('data-id', json.bigheadNamePrefix);
							$('#duck').attr('tid', json.bigheadExtension);
							/* check if larger than window width and scale 
							if ( json.bigheadWidth > $(window).width() ) {
								$('#duck').css('width', $(window).width()*0.9);
								$('#duck').css('height',($(window).width()*0.9*json.bigheadHeight)/json.bigheadWidth);							
							} else {
								$('#duck').css('width', json.bigheadWidth);
								$('#duck').css('height',json.bigheadHeight);
							}
							*/
							loadPopup(".modal-editcover");	//$(popupContact)
							$(".modal-editcover").css('margin-left', -((960+60)/2)+"px");
							$('#duck').css('width', 960);
							$('#duck').css('height',(960*json.bigheadHeight)/json.bigheadWidth);						
							$('#duck').show();
							addImgAreaSelect('#duck');
							//alert( -(($('#duck').width()+60)/2));
							
						}
					});								
			    }
				else{// Type3
					
					$.ajax({
						type: "POST",
						url: "mysettings_avatar.php",
						data: data,
						datatype:'json',
						cache: false,
                	    contentType: false,    
                	    processData: false,    				
						success: function(json)
						{
                	
							
							$(".spinner").fadeOut(10);			
		        	
							$(".current_avatar").attr('src',json.bighead);
							$(".id_img_current").val(json.bighead);
							$(".id_img_current2").val(json.smallhead);						
							$(".current_avatar").fadeIn(10); 						
							$("#error_image_upload").html(json.message);
							$(".img_change_current").val(1);						
											 	
						}
					});					

				}

			});
			
			$(".cancel_edit_cover").live('click',function()
			{			
				disablePopup(".modal-editcover");
				//$('#duck').removeClass( 'imgAreaSelect' ).imgAreaSelect({hide:true;});		   					
			});				
}






function addImgAreaSelect(img) {
	
	
//$('#duck').imgAreaSelect({ x1: 120, y1: 90, x2: 280, y2: 210 });
	
        $(img).addClass( 'imgAreaSelect' ).imgAreaSelect({
        		autoHide : true,
                handles : true,
                aspectRatio : '96:35',
                fadeSpeed : 1,
                show : true,
                onSelectEnd: getSizes
        });
        $(img).load(function(){ // display initial image selection 16:9
                height = ( this.width / 96 ) * 35;
                diff = ( this.height - height ) / 2;
                //$( this ).imgAreaSelect({ x1 : 0, y1 : diff, x2 : this.width, y2 : height + diff });                
                height=350;
                width=960;
                $( this ).imgAreaSelect({ x1 : 0, y1 : diff, x2 : width, y2 : height + diff });
        });
        
        //alert("8888");	cannot include here
}


function getSizes(im,obj)
	{
		var x_axis = obj.x1;
		var x2_axis = obj.x2;
		var y_axis = obj.y1;
		var y2_axis = obj.y2;
		var thumb_width = obj.width;
		var thumb_height = obj.height;
		var image_name = $('#duck').attr('src');//$("#image_name").val();
		var image_namePrefix = $('#duck').attr('data-id');
		var image_ext = $('#duck').attr('tid');
		if(thumb_width > 0)
			{
				if(confirm("Do you want to save image..!"))
					{
						$.ajax({
							type:"GET",
							url:"FORMAL_CropAjaximage.php?t=ajax&img="+image_name+"&namePrefix="+image_namePrefix+"&ext="+image_ext+"&w="+thumb_width+"&h="+thumb_height+"&x1="+x_axis+"&y1="+y_axis,
							cache:false,
							success:function(rsponse)
								{
								    $("#cropimage").hide();
								    //$("#thumbs").html("");
									//$("#thumbs").html("<img src='TEST_FOLDER/"+rsponse+"' />");
									$('#duck').removeClass( 'imgAreaSelect' ).imgAreaSelect({hide: true});
																		$('#duck').css('width', 960);
									$('#duck').css('height',350);
									$('#duck').attr('src', rsponse);

								}
						});
					}
			}
		else
			alert("Please select portion..!");
	}




		/* modal -basic - InitModal
		-------------*/	
		function loadPopup(popupContact)
		{
			//$(".backgroundPopup").css({"opacity": "0.1"});
			if (popupContact!=".modal-add" && popupContact!=".modal-list" && popupContact!=".modal-share" && popupContact!=".modal-upload") {
				//$("body").css("overflow", "hidden");
			}
			if (popupContact==".modal-list" || popupContact==".modal-add" || popupContact==".modal-share" || popupContact==".modal-upload") {
				//$("body").css("overflow", "auto");
			}							
			$(".backgroundPopup").fadeIn("fast");
			//$(popupContact).slideDown(300);
			//$(popupContact).effect("shake", {times:0}, 100);			
			$(popupContact).fadeIn(10);
			pause_load_more = true;
		}
		function disablePopup(popupContact)
		{
			$(".backgroundPopup").fadeOut("slow");
			//$(popupContact).slideUp("slow");
			$(popupContact).fadeOut(50);
							$("body").css("overflow", "auto");

			if ($('#pin_ajax_view').css('display')=="none") {

				$("body").css("overflow", "auto");
			}
			pause_load_more = false;			
		}

















function initLoginForgotSwitch() {
	

	
	// Checking for CSS 3D transformation support
	$.support.css3d = supportsCSS3D();
	
	var formContainer = $('.hearter');
	
	// Listening for clicks on the ribbon links
	$('.flipLink').click(function(e){
		

		
		// Flipping the forms
		formContainer.toggleClass('flipped');

		// If there is no CSS3 3D support, simply
		// hide the login form (exposing the recover one)
		if(!$.support.css3d){
			

			$('#login').toggle();
		}
		e.preventDefault();

	});
	
	
	

	
	
	// A helper function that checks for the 
	// support of the 3D CSS3 transformations.
	function supportsCSS3D() {

		var props = [
			'perspectiveProperty', 'WebkitPerspective', 'MozPerspective'
		], testDom = document.createElement('a');
		  
		for(var i=0; i<props.length; i++){
			if(props[i] in testDom.style){
				return true;
			}
		}
		
		return false;
	}	
	
	
	
}






function initRegister(){
	
	
	$('#CompleteAccount').submit(function(e) {
		//alert("55555");		
		register();
		e.preventDefault();
	}); 	
	
	
	
	
	
	function register()
	{
		
		//alert("5555");
		$('.error').html("");
		var ori_text =  $('#CompleteSignupButton').html();
		$('#CompleteSignupButton').html(ori_text+"...");
		$.ajax({
			type: "POST",
			url: "NEW_submit.php",
			data: $('#CompleteAccount').serialize(),
			dataType: "json",
			success: function(msg){
				//alert("5555");

				if(parseInt(msg.status)==1)
				{
					$('#CompleteSignupButton').html(ori_text);
					window.location=msg.txt;
				}
				else if(parseInt(msg.status)==0)
				{
					$('#CompleteSignupButton').html(ori_text);					
					if(msg.txt) $('.error').html(msg.txt);
					
				}	

			}
		});
	}	
	
	var continue_show_count = 0;
	$('.CompletePhoto').live("click",function()
	{

		var s = $(this).attr("data-id");
		
        if ($(this).hasClass('CompletePhotoClass')) { 
    		continue_show_count = continue_show_count + 1;
            $('#CompletePhoto'+s).removeClass('CompletePhotoClass');
            $('#CompletePhoto'+s).addClass('CompletePhotoClass-Clicked');
            var color_change = $('#CompletePhoto'+s).css('border-color');  
            $('#CompletePhoto'+s).find('p').css('background',color_change);  
            var clicked_img = $('#CompletePhoto'+s).find('img').attr('src');
            // 
            //$('.cliked_img').css('opacity', '1');  
            var clicked_img_bookNmae = $(this).find('.current_signup_picture_wrapper').attr('data-id');
            var clicked_img_booker = $(this).find('.current_signup_picture_wrapper').attr('tid');                        
            var clicked_img_box = "<span class='CompletePhotoClass-Clicked ' id='CompletePhotoClass-ClickedThum"+s+"' data-id='"+clicked_img_bookNmae+"' tid='"+clicked_img_booker+"' style='margin:0px 2px 10px 2px; width:75px; height:75px; overflow:hidden; '><img width='75' src='"+clicked_img+"' onload='this.style.opacity=1' style='opacity: 1; '></span>";  
         

            //$('#progress').find('span').attr('data-id',clicked_img_bookNmae);
            //$('#progress').find('span').attr('tid',clicked_img_booker);
            //$('#progress').find('span').attr('id','CompletePhotoClass-ClickedThum'+s);
            $('.clicked-container').find('#progress').append(clicked_img_box);
                     
        } else {
        	continue_show_count = continue_show_count - 1;
            $('#CompletePhoto'+s).removeClass('CompletePhotoClass-Clicked');
            $('#CompletePhoto'+s).addClass('CompletePhotoClass');
            //$('.cliked_img').find('img').attr('src', ''); 
            //$('.cliked_img').css('opacity', '0');      
            $('#CompletePhotoClass-ClickedThum'+s).fadeOut(10);
            $('#CompletePhotoClass-ClickedThum'+s).remove();
            $('#CompletePhoto'+s).find('p').css('background','transparent');                      
        
        }
        
        if (continue_show_count >= 5) {
        	$('#CompleteSignupButton2').fadeIn(10);        	
        	$('.error').fadeOut(10); 
        	
        }
        else{
        	$('#CompleteSignupButton2').fadeOut(10);        	
        	
        	$('.error').fadeIn(10);  
        }		
		
			
	});	
	
}







function initSignupFollowing() {
	
	
	$('#CompleteSignupButton2').live("click",function()
	{	

			
			
			var $this = $(this), params, cats=[], writers=[];
			
			
			
			
			if ($.trim(default_id).length==0) {
				alert("There is something wrong in Step 1 of 2, Please Register again.");
				return; 
			}
			
			
			
			
			params = {
				type : 'nt',
				oauth_provider : registrant,
				ooid : default_id
			};
			$('.clicked-container').find('span').each(function(){
				var $b = $(this); 
				if ($b.attr('data-id')) {
					cats.push($b.attr('data-id'));				
				} 
				if ($b.attr('tid')) {
					writers.push($b.attr('tid'));
				}
			});
			params.cats = cats.join(',');
			params.writers  = writers.join(',');
			
			
			

			var ori_text =  $this.html();
			$this.html(ori_text+"...");
			
			
			
			
			$.ajax({
				type : 'post',
				url  : 'createnewMuntiplefollow.php',
				data :  {datastring:params},
				dataType : 'json',
				success  : function(msg){

					//if(!json) return;
					//if(json.status_code) {
					//	alert('Sent!');
					//	//$mine_share.trigger('hide');
					//} else {
					//	alert(json.message);
					//}

					if(!msg) return;
					
					if(parseInt(msg.status)==1)
					{
						alert("Thank you for Registeration, exploring myminelink from Now.");
						var completed_text_for_activate = "An activation email has been sent to your email address (dont forget to check your spam folder). Please check your Email and click on the activation link."; 
						window.location = "index.php?RegisterComplete="+completed_text_for_activate;							

					}
					else if(parseInt(msg.status)==0)
					{
				
						if(msg.txt) { 
							$('.error').html(msg.txt);
							$('.error').fadeIn(10);  
						}

					}
				
					
					
				}
				//,complete : function(){
					
					
					

					//$this.removeClass('disabled').prop('disabled',false);
					
		
					
				//}
			});	
	});	
}






function InitShareIcon() {

		$('.load_post_description a').live({
			mouseenter:
			function()
			{		
				//alert("5555");
				$(this).find('img').css({width: '16px' , height: '16px' });															    															
			},	
			mouseleave:
			function(){
				$(this).find('img').css({width: '15px' , height: '15px' });					
			}
		});	

}



/*
function InitTextHover() {

		$('.ImgLink-photo').live({
			mouseenter:
			function()
			{		
				//alert("5555");
				var s = $(this).attr("data-id");
				$("#linktitle"+s).removeClass('text_dn');
				$("#linktitle"+s).addClass('text_up');						    															
			},	
			mouseleave:
			function(){
				var s = $(this).attr("data-id");
				$("#linktitle"+s).removeClass('text_up');
				$("#linktitle"+s).addClass('text_dn');					
			}
		});	

}
*/











function initLoadMessage(){
	
	$('.NoMessengerMsg').live("click",function()
	{
		
		var IDint = $(this).attr("data-id");
		//alert(IDint);
		$('#MessengerMsgContainer').find('section').remove();
		$('#MessengerMsgContainer').find('.stbodyMsg').remove();
		
		$('#MessengerMsgContainer').find('#ContextBar').remove();
		
		
		$('#MessgaeLoading').show();
		$('#NoMessengerMsg'+IDint).addClass('MessengerClicked');		
	  	var dataString = 'messenger_id='+IDint+"&local_id="+local_id;
		//alert(dataString);
		$.ajax({
				type: "POST",
				url: "moreupdates_ajax_message.php",
				data: dataString,
				cache: false,
				success: function(html){
					//alert(html);
					$('#MessengerMsgContainer').find('.topic').append(html);
					$('#MessgaeLoading').hide();
					var documnetHeight = $('#MessengerMsgContainer').height();
					$('#MessengerMsgContainer').scrollTop(documnetHeight);
				}
		});	
	}); 	
	
	
}




(function (w, d, a) {
  // keep JSLint happy
  "use strict";
  var $ = w[a.k] = {
    'a': a,
    'd': d,
    'w': w,
    's': {},
    'f': (function () {
      return {
        // get an element
        seek: function (id) {
          var el = undefined;
          if (id) {
            el = $.d.getElementById(id);
          }
          return el;
        },
        // get a DOM property or text attribute
        get: function (el, att) {
          var v = null;
          if (typeof el[att] === 'string') {
            v = el[att];
          } else {
            v = el.getAttribute(att);
          }
          return v;
        },
        // set a DOM property or text attribute
        set: function (el, att, string) {
          if (typeof el[att] === 'string') {
            el[att] = string;
          } else {
            el.setAttribute(att, string);
          }
        },
        // listen, cross-browser
        listen: function (el, ev, fn) { 
          if (typeof $.w.addEventListener !== 'undefined') { 
            el.addEventListener(ev, fn, false); 
          } else if (typeof $.w.attachEvent !== 'undefined') { 
            el.attachEvent('on' + ev, fn); 
          } 
        },
        selectNav: function (el) {
          $.v.selectedCarousel.className = '';
          el.className = 'selected';
          $.v.selectedCarousel = el;
          $.s.carousel.style.marginLeft = 0 - ($.s.carouselImg[el.rel].offsetLeft + 480) + 'px';
          $.v.selectedCarouselContent.className = '';
          $.v.selectedCarouselContent = $.d.getElementById(el.rel);
          $.v.selectedCarouselIndex = parseInt(el.rev);
          $.v.selectedCarouselContent.className = 'selected';    
        },
        // on click do stuff
        click: function (v) {
          var t = v || $.w.event, el = null;
          if (t.target) {
            el = (t.target.nodeType === 3) ? t.target.parentNode : t.target;
          } else {
            el = t.srcElement;
          }
          if (el.parentNode === $.s.caseStudiesNav && el.rel) {
            $.f.selectNav(el);
          }
          
          if (el === $.s.caroNavLeft) {
            if ($.v.selectedCarouselIndex > 0) {
              $.v.selectedCarouselIndex = $.v.selectedCarouselIndex - 1;
              var a = $.s.caseStudiesNav.getElementsByTagName('A')[$.v.selectedCarouselIndex];
              if (a) {
                $.f.selectNav(a);
              }
            }
          }
          
          if (el === $.s.caroNavRight) {
            if ($.v.selectedCarouselIndex < 5) {
              $.v.selectedCarouselIndex = $.v.selectedCarouselIndex + 1;
              var a = $.s.caseStudiesNav.getElementsByTagName('A')[$.v.selectedCarouselIndex];
              if (a) {
                $.f.selectNav(a);
              }
            }
          }
          
          if (el === $.s.caroNavCenter) {
            //$.w.location = $.a.caroEndpoint + $.v.selectedCarouselContent.id;
          }
          
        },
        doNavScroll: function () {    
          var y = $.w.pageYOffset;
          if (y !== $.v.pageTop) {
            $.v.pageTop = y;
            for (var i = 0, n = $.v.pageTocY.length; i < n; i = i + 1) {
              if ($.v.pageTop >= $.v.pageTocY[i] && $.v.pageTop <= $.v.pageTocY[i + 1]) {
                var anchor = $.f.get($.s.pageTocLink[i], 'anchor');
                if ($.v.currentAnchor !== anchor) {
                  $.v.currentAnchor = anchor;
                  $.f.doTocSelect(anchor);    
                }     
                break;       
              }
            }
          }
          $.w.setTimeout(function() {
            $.f.doNavScroll();
          },100);
        },
        
        doTocSelect: function (a) {
          // deselect
          for (var i = 0; i < $.s.pageTocLink.length; i = i + 1) {
            $.s.pageTocLink[i].className = '';
            if (a === $.f.get($.s.pageTocLink[i], 'anchor')) {
              $.s.pageTocLink[i].className = 'selected';
            }
          }
        },
        
        // highlight pageToc link on hash change
        doPageToc: function () {
          var frag = $.d.URL.split('#')[1] || '';
          $.f.doTocSelect(frag);
        },
        readCookie: function (k) {
          // return the value of cookie K if you find it
          var i, q, t, v = null, p = $.d.cookie.split("; "), n = p.length;
          // loop through all key/value pairs in cookie
          for (i = 0; i < n; i = i + 1) {
            // if q matches k, return its value
            q = p[i].split("=")[0];
            t = p[i].split("=")[1];
            if (k === q) {
              v = t;
              break;
            }
          }
          return v
        },
        toggleMainCta: function () {
          var ctaJoin = $.d.getElementById('ctaJoin');
          var ctaConvert = $.d.getElementById('ctaConvert');
          if (ctaJoin && ctaConvert) {
            var sess = $.f.readCookie('_pinterest_sess');
            if (sess) {
              console.log(sess);
            }
          }
        },
        structure: function () {
          $.d.b = $.d.getElementsByTagName('BODY')[0];
          $.s.pageToc = $.d.getElementsByClassName('pageToc')[0];
          $.s.carousel = $.d.getElementById('caseStudiesCarousel');
          if ($.s.carousel) {
            $.s.caroNavLeft = $.d.getElementById('caroNavLeft');
            $.s.caroNavCenter = $.d.getElementById('caroNavCenter');
            $.s.caroNavRight = $.d.getElementById('caroNavRight');
            var div = $.d.getElementById('caseStudiesContent').getElementsByTagName('DIV');
            $.s.caroContentDivs = div;
            var n = ~~(div.length / 2);
            $.s.carousel.style.width = (div.length * $.a.carouselImageWidth)+20 + 'px';
            
            $.s.caseStudiesNav = $.d.getElementById('caseStudiesNav');

            var selected = Math.floor(Math.random() * div.length);
            $.v.selectedCarouselIndex = selected;
            $.s.carousel.style.marginLeft  = -($.a.carouselImageWidth * selected + ($.a.carouselImageWidth / 2)) + 'px';
            div[selected].className = 'selected';
            $.v.selectedCarouselContent = div[selected];
            var links = $.d.getElementById('caseStudiesNav').getElementsByTagName('A');
            for (var i = 0; i < links.length; i = i + 1) {
              links[i].rev = i;
            }
            links[selected].className = 'selected';
            $.v.selectedCarousel = links[selected];
            $.s.carouselImg = {};
            var img = $.s.carousel.getElementsByTagName('IMG');
            for (var i = 0; i < img.length; i = i + 1) {
              $.s.carouselImg[img[i].id.split('_')[1]] = img[i];
            }
          }
          var cta = $.d.getElementById('ctaJoinOrConvert');
          if (cta) {
            $.f.toggleMainCta();
          }
        },
        behavior: function () {
          $.f.listen($.d.b, 'mouseover', $.f.click);
          $.f.listen($.d.b, 'click', $.f.click);
          if ($.s.pageToc) {
            $.s.pageTocLink = [];
            $.v.pageTocY = [];
            var tag = $.s.pageToc.getElementsByTagName('A');
            for (var i = 0; i < tag.length; i = i + 1) {
              var href = tag[i].href.split('#')[1];
              var anchor = $.d.getElementById(href);
              if (anchor && href) {
                $.v.pageTocY.push(anchor.offsetTop);
                $.f.set(tag[i], 'anchor', href); 
                $.s.pageTocLink.push(tag[i]);
              }
            }
            // arbitrarily high number so we can get to the bottom
            $.v.pageTocY.push(8675309);
            $.f.doNavScroll();
            $.f.doPageToc();
          }
        },
        init : function () {
          $.v = {'pageTop': $.w.pageYOffset };
          $.f.structure();
          $.f.behavior();
        }
      };
    }())
  };
  $.f.init();
}(window, document, {
  'k': 'PP',
  'carouselImageWidth': 960,
  'caroEndpoint': '/case-study-'
}));




