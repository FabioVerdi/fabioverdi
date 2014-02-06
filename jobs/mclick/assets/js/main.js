$(document).ready(function(){


	$(".btn-send-documents").change(function() {
		$(this).prev().html($(this).val());
	});

	$( "#dialog, #dialogOK" ).dialog({ autoOpen: false });

	$( ".btn-blue" ).click(function(){
	      $('#teste').after(function(){
          var check = $(this).val();
          if(check == '')
          {
                $("#dialog").dialog( "open", function(){
                	            $("#teste").keyup(function () {
                	  var name = $(this).val();
                	  $("p").text(name);
                	}).keyup();
                } );

          }
          else
          {
                $("#dialogOK").dialog( "open" );

          }
    });
	});

});
