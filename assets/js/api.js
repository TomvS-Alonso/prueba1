  function iniciarMap(){
  var coord = {lat:-33.5951476169428 ,lng: -70.70688333503495};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 18,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}


