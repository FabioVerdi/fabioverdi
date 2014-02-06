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

jQuery(function(){
        jQuery('#contactable').contactable(
        {
            subject: 'feedback URL:'+location.href,
            url: 'mail.php',
            name: 'Name',
            email: 'Email',
            dropdownTitle: 'Issue',
            dropdownOptions: ['General', 'Website bug', 'Feature request'],
            message : 'Message',
            submit : 'SEND',
            recievedMsg : 'Thank you for your message',
            notRecievedMsg : 'Sorry but your message could not be sent, try again later',
            disclaimer: 'Please feel free to get in touch, we value your feedback',
            hideOnSubmit: true
        });
    });
