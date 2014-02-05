$(function() {
	$('.scroll-pane').jScrollPane(
	  {
	    showArrows: true,
	    arrowScrollOnHover: true
	  }
	);
});

addEvent(window, 'load', initCorners);

  function initCorners() {
    var settings = {
      tl: { radius: 15 },
      tr: { radius: 15 },
      bl: { radius: 15 },
      br: { radius: 15 },
      antiAlias: true
    }

    curvyCorners(settings, ".print");
}