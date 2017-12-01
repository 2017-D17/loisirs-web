//TODO (me): add better validation 
//TODO (me): find an other way to have the ajax result
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/header-bg.jpg");
    
    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	var isOK = true;
    	$(this).find('input[type="text"], input[type="password"]').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
				isOK = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
		
		if(isOK){
			
			var username = $(this).find('input[name="form-user-name"]').val();
			var password = $(this).find('input[name="form-password"]').val();
			
			console.log(" "+username+" "+password);
			
			var userExist = getUser(username, password);
			console.log(userExist);
			if(userExist){
				
				e.preventDefault();
				document.location.href='http://127.0.0.1:8080/pingPong/home.html';
				
			}else{
				$(this).find('input[type="text"], input[type="password"]').each(function(){
					e.preventDefault();
					$(this).addClass('input-error');
				});
			}
		}
    	
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], input[type="password"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
    	
		var isOK = true;
		
    	$(this).find('input[type="text"], input[type="password"]').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
				isOK = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
		
		if(isOK){
			
			var username = $(this).find('input[name="form-user-name"]').val();
			var password = $(this).find('input[name="form-password"]').val();
			var password2 = $(this).find('input[name="form-confirm-password"]').val();
			
			console.log(" "+username+" "+password+" "+password2)
			
			if(password === password2){
				
				var userSaved = saveUser(username, password);
				if(userSaved){
					e.preventDefault();
					document.location.href='http://127.0.0.1:8080/pingPong/home.html';
				}		
				
			}else{
				
				$(this).find('input[type="password"]').each(function(){
					e.preventDefault();
					$(this).addClass('input-error');
				});
			}
		}
    	
    });
	
	function getUser(username, password){
		var userExist = false;
		jQuery.ajax({
		  url: "http://loisirs-web-backend.cleverapps.io/users?name="+username+"&password="+password,
		  type: "GET",
		  dataType: "json",
		  //ajax devient sync
		  async: false,
		  success:function(data)
		  {
			console.log(data);
			userExist = true;
		  }
		  
		});
		return userExist;
	}
  
  	function saveUser(username, password){
		var userSaved = false;	
		jQuery.ajax({
          url: "http://loisirs-web-backend.cleverapps.io/users",
          data:{
				login : username,
                password : password
		  },
          type: "POST",
          dataType: "json",
		  async: false,
          success:function(data)
          {
			userSaved = true;
          }
        });
		return userSaved;
	}
    
    
});
