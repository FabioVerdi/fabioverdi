$('aside nav li a').click(function(){
    $('aside nav li a').removeClass("active");
    $(this).addClass("active");
});

function showonlyone(thechosenone) {
    $('.holder-content').each(function(index) {
        if ($(this).attr("id") == thechosenone) {
            $(this).css('display','block');
        }else {
            $(this).css('display','none');
        }
    });
}

$( "#dialog" ).dialog({ autoOpen: false });
    $( "#opener" ).click(function() {
    $( "#dialog" ).dialog( "open" );
});
