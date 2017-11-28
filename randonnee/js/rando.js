// Activate Carousel
$("#myCarousel").carousel();

// Enable Carousel Indicators
$(".item1").click(function(){
    $("#myCarousel").carousel(0);
});
$(".item2").click(function(){
    $("#myCarousel").carousel(1);
});
$(".item3").click(function(){
    $("#myCarousel").carousel(2);
});
$(".item4").click(function(){
    $("#myCarousel").carousel(3);
});

// Enable Carousel Controls
$(".left").click(function(){
    $("#myCarousel").carousel("prev");
});
$(".right").click(function(){
    $("#myCarousel").carousel("next");
});



/* INSCRIPTION */
$('#btn-login').click(function(){
	console.log('passe');
    /* get data from form */
    var name = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    console.log('name: ', name);
    console.log('password', password);
});