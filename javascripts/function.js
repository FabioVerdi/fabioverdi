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
    maxWidth  : 1024,
    maxHeight : 768,
    fitToView : false,
    width   : '100%',
    height    : '100%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'elastic',
    closeEffect : 'elastic'
});

$('#contactable').contactable({
    url: 'mail.php'
});
