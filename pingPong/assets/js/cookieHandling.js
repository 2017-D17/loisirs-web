jQuery(document).ready(function() {
	
	if($.cookie("pingPongBlogUserIsLogged")){
		if($.cookie("pingPongBlogUserName")){
			var username = $.cookie("pingPongBlogUserName");
			$('a[id=userWelcome]').html("Welcome, "+ username + "<b class='caret'></b>")
		}
	}
	
	if($.cookie("pingPongBlogUserIsLogged")){
		$('#btn-logout').click(function(evt) {
			evt.preventDefault();
			$.cookie("pingPongBlogUserIsLogged", true, { expires: 0, path: '/' });
			$.cookie("pingPongBlogUserName", username, { expires: -1, path: '/' });
			window.location.replace('http://127.0.0.1:8080/pingPong/index.html');
		});
	}
	else{
		window.location.replace('http://127.0.0.1:8080/pingPong/index.html');
	}
});

