import $ from 'jquery';

$(document).ready(function(){
    var circles = $("#bg .circle").map(function(){
        return this.id;
    });

    for(let i = 0; i < circles.length; i++){
        var newp = makeNewPosition();
        $("#"+(i+1)).css("top", newp[0]+"px");
        $("#"+(i+1)).css("left", newp[1]+"px");
        animateDiv('#'+(i+1));
    }

});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = ((($(window).height() ?? 0) - 10) - 500);
    var w = (((($(window).width() ?? 0) - 10)) - 500);
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass: any){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 6000,   function(){
      animateDiv(myclass);        
    });
    
};