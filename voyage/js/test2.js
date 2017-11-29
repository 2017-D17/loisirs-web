function imageGalerie()
{
    var active = $('#galerie .active');
     
    var next = (active.next().length > 0) ? active.next() : $('#galerie img:first');
     
       active.fadeOut(function(){
         
       active.removeClass('active');
       next.fadeln().addClass('active');  
        
       }); 
}
 
setInterval('imageGalerie()',2500);