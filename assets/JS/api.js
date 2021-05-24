function iniciarMap(){
    var coord = {lat:-33.59507316652269 ,lng: -70.70689070205067};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 16,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}