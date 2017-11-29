$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
    label = $this.prev('label');

    if (e.type === 'keyup') {
            if ($this.val() === '') {
        label.removeClass('active highlight');
        } else {
        label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight'); 
            } else {
            label.removeClass('highlight');   
            }   
    } else if (e.type === 'focus') {
    
    if( $this.val() === '' ) {
            label.removeClass('highlight'); 
            } 
    else if( $this.val() !== '' ) {
            label.addClass('highlight');
            }
    }

});
  
$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});


// Sending and receiving data in JSON format using POST method
$('#inscription').on('click', function (e) {

    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var url = "http://loisirs-web-backend.cleverapps.io/users";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify({
        "name": document.getElementById("name").value,
        "password": document.getElementById("password").value
    });
    xhr.send(data);

});

$('#connexion').on('click', function (e) {
    
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var url = "http://loisirs-web-backend.cleverapps.io/users";
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);

            var trouve = false
            var i;
            for(i=0; i<json.length; i++) {
                if( document.getElementById("name2").value == json[i].name && document.getElementById("password2").value == json[i].password ) {
                    trouve = true;
                    alert("OK TU EST CONNECTE");
                }
            }

            if(!trouve) {
                alert("Name ou Password incorrect !")
            }

        }
    };

    xhr.open("GET", url, true);
    xhr.send();

});


