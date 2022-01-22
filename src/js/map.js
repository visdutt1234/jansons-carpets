// map center
var center = new google.maps.LatLng(28.589851, 77.2502974);

// marker position
//var factory = new google.maps.LatLng(23.6278526, 58.2663856);

function initialize() {
  var mapOptions = {
    center: center,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"simplified":0.5}]}],
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  // InfoWindow content
  var content = '<div id="iw-container">' +                    
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Contact</div>' +
                      '<p>19, Block D, Nizamuddin East, <br>New Delhi, Delhi 110013'+                      
                    '</div>'                    
                  '</div>';

  // A new Info Window is created and set content
  var infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 350
  });
   
  // marker options
  var marker = new google.maps.Marker({
    position: {lat: 28.589851, lng: 77.2502974},    
  
    title:"19, Block D, Nizamuddin East, New Delhi, Delhi 110013",
    icon: 'src/static/img/map.png',
  });
  marker.setMap(map);
  infowindow.open(map,marker);
  
}
google.maps.event.addDomListener(window, 'load', initialize);
