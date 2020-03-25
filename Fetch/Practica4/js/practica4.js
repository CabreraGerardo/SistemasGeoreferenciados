var coordenadas = {
    lat: 0,
    lng: 0
}

var propiedades ={
    center: coordenadas,
    zoom: 2
}

function obtenerMarcadores(map){
    
    var icono = {
        url: "https://cdn.pixabay.com/photo/2020/02/26/08/41/corona-4881111_1280.png",
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    }

    var fetchConf = { method: 'GET',
               mode: 'no-cors',
               cache: 'default' };

    fetch('https://corona.lmao.ninja/countries')
    .then((response) => {
        response.json().then((datos) => {
            datos.forEach((marcador) => {
                console.log(marcador);
                
                var infoContent = "<strong>" + marcador.country + "</strong>"
                                  +"<strong>Casos: </strong>" + marcador.cases + "<br>"
                                  +"<strong>Nuevos hoy:</strong> " + marcador.todayCases + "<br>"
                                  +"<strong>Muertes:</strong> " + marcador.deaths + "<br>"
                                  +"<strong>Muertes Hoy:</strong> " + marcador.todayDeaths + "<br>"
                                  +"<strong>Recuperados:</strong> " + marcador.recovered + "<br>"
                                  +"<strong>Activos:</strong> " + marcador.active + "<br>"
                                  +"<strong>Críticos:</strong> " + marcador.critical + "<br>"
                                  +"<strong>Casos por millón:</strong> " + marcador.casesPerOneMillion;

                var info = new google.maps.InfoWindow({
                    content: infoContent
                });

                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(marcador.countryInfo.lat, marcador.countryInfo.long),
                    title: marcador.country + ': ' + marcador.cases,
                    icon: icono
                });

                marker.addListener('click', () => {
                    info.open(map, marker);
                });

            });
        });
    })
    .catch((error) => {
        console.log('Hubo un problema con la petición Fetch: ' + error.message);
    });
};

function initMap(){
    const map = new google.maps.Map(document.getElementById("map"), propiedades);

    const markers = obtenerMarcadores(map);
};