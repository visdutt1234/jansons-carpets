// map center
var center = new google.maps.LatLng(28.5896057, 77.2482389);

// marker position
var factory = new google.maps.LatLng(28.5896057, 77.2482389);

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
                      '<p>A-14, East Nizamuddin, New Delhi - 110 013 (India.)'+                      
                    '</div>'                    
                  '</div>';

  // A new Info Window is created and set content
  var infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 350
  });
   
  // marker options
  var marker = new google.maps.Marker({
    position: {lat: 28.5896057, lng: 77.2482389},    
  
    title:"A-14, East Nizamuddin, New Delhi - 110 013 (India.)",
    icon: 'images/location.png',
  });
  marker.setMap(map);
  infowindow.open(map,marker);
  
}
google.maps.event.addDomListener(window, 'load', initialize);
