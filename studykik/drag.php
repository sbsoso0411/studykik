
<!DOCTYPE html> 
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <title>Example sortable list</title> 
  <meta name="author" content="forresst" />
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.0-alpha.2/jquery.mobile-1.4.0-alpha.2.min.css" />
	<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="http://code.jquery.com/mobile/1.4.0-alpha.2/jquery.mobile-1.4.0-alpha.2.min.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
  <script src="jquery.ui.touch-punch.min.js"></script>
  <script>
  var _gaq = _gaq || [];
  $(document).ready(function(e) {
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + 
                  '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }); 

  $(document).on("pageshow", function(event, ui) {
    try {
      _gaq.push(['_setAccount', 'UA-28940436-2']);    
      if ($.mobile.activePage.attr("data-url")) {
            _gaq.push(['_trackPageview', $.mobile.activePage.attr("data-url")]);
        } else {
            _gaq.push(['_trackPageview']);
        }
    } catch(err) {}
  });
  
  $(document).bind('pageinit', function() {
   // $( "#sortable" ).sortable({
    //   items: "li:not(.ui-li-divider)"
   // });
    
    $( "#example-2-3 .sortable-list" ).sortable({ 
		connectWith: '#example-2-3 .sortable-list',
	  update: function( event, ui ) {
		  }
	});
    
   // $( "#sortable" ).disableSelection();
    //$( "#sortable" ).bind( "sortstop", function(event, ui) {
     // $('#sortable').listview('refresh');
    //});
  });
  </script>  
</head>
<body> 
<div>
  <div data-role="header" data-theme="d">
    <h1>Drag and drop</h1>
  </div>

  <div data-role="content" data-theme="c">
  
  <div id="example-2-3" >
    <ul data-role="listview" data-inset="true" data-theme="d" id="sortable" class="sortable-list">
      <li data-role="list-divider">List 1</li>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
      <li>Item 5</li>
    </ul>
    
    <ul data-role="listview" data-inset="true" data-theme="d" id="sortable" class="sortable-list">
      <li data-role="list-divider">List 2</li>
      <li>Item 11</li>
      <li>Item 12</li>
      <li>Item 13</li>
      <li>Item 14</li>
      <li>Item 15</li>
    </ul>
    
    
    <ul data-role="listview" data-inset="true" data-theme="d" id="sortable" class="sortable-list">
      <li data-role="list-divider">List 3</li>
      <li>Item 21</li>
      <li>Item 22</li>
      <li>Item 23</li>
      <li>Item 24</li>
      <li>Item 25</li>
    </ul>
    
  </div>
  </div>
</div>
</body>
</html>
