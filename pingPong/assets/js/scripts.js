
jQuery(document).ready(function() {
		
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/header-bg.jpg");
});

	$.validator.setDefaults({
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
	
    /*
        Login form validation
    */
	
	var loginFormValidator = $("#login-form").validate({
		rules: {
		  'form-user-name': "required",
		  'form-password': "required"
		},
		messages: {
		  'form-user-name': {
			required: "Please enter your username",
		  },
		  'form-password': {
			required: "Please provide a password",
		  }
		}
	});
	
	$('.login-form').on('submit', function(e) {
  		registerFormValidator.resetForm();
		var username = $(this).find('input[name="form-user-name"]').val();
		var password = $(this).find('input[name="form-password"]').val();
		
		var formValided = loginFormValidator.form() ;
		var userExist = formValided ? getUser(username, password) : false;		 
		
		if(userExist){
			e.preventDefault();
			document.location.href='http://127.0.0.1:8080/pingPong/home.html';
		}
		else if(!userExist && formValided){
			
			var helper = "<div class=\"alert alert-danger fade in\">\
							<strong>Error!</strong> Invalid username or password </div>"

			$(helper).insertBefore(this);
			window.setTimeout(function() { $(".alert-danger").alert('close'); }, 3600);
		}
		
		e.preventDefault();
    });
   
    /*
        Registration form validation
    */
	$.validator.addMethod("unique", function(value, element) {
		return !getUserByName(element.value);
	}, "Name already taken.");
	
	var registerFormValidator = $("#registration-form").validate({
		rules: {
		  'reg-form-user-name': {
			required: true,
			minlength: 2,
			unique: true,
			nowhitespace: true
			
		  },
		  'reg-form-password': {
			required: true,
			minlength: 5,
			nowhitespace: true
		  },
		  'reg-form-confirm-password': {
			required: true,
			equalTo: '#reg-form-password'
		  }
		},
		messages: {
		  'reg-form-user-name': {
			required: "Please enter your username",
			minlength: "Your username must consist at least 3 characters long",
			
		  },
		  'reg-form-password': {
			required: "Please provide a password",
			minlength: "Your password must be at least 5 characters long",
			nowhitespace: "Letters, numbers, underscores only please"
		  },
		  'reg-form-confirm-password': {
			required: "Please provide a password",
			equalTo : "Passwords must match."
		  }
		}
	});
	
	$('.registration-form').on('submit', function(e) {
    	loginFormValidator.resetForm() ;
		
		var formValided = registerFormValidator.form();
		
		var username = $(this).find('input[name="reg-form-user-name"]').val();
		var password = $(this).find('input[name="reg-form-password"]').val();
		
		var userSaved = formValided ? saveUser(username, password) : false;
		
		if(userSaved){
			e.preventDefault();
			document.location.href='http://127.0.0.1:8080/pingPong/home.html';
		}
		
		e.preventDefault();
	});
	
    	
	function getUserByName(username){
		var userExist = false;
		jQuery.ajax({
		  url: "http://loisirs-web-backend.cleverapps.io/users?name="+username,
		  type: "GET",
		  dataType: "json",
		  //ajax devient sync
		  async: false,
		  success:function(data)
		  {
			if(data.length >= 1){
				userExist = true;
			}
		  }
		  
		});
		return userExist;
	}
	
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
			if(data.length === 1){
				userExist = true;
			}
		  }
		  
		});
		return userExist;
	}
  
  	function saveUser(username, password){
		var userSaved = false;

		jQuery.ajax({
          url: "http://loisirs-web-backend.cleverapps.io/users",
          data:{
				name : username,
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
    


