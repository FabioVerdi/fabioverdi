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

$(".various").fancybox({
    fitToView : false,
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'elastic',
    closeEffect : 'elastic'
});
