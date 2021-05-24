function initMap() {
  var coord = { lat: -33.401745966230166, lng: -70.55507681055502 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: coord,
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map,
  });
}
