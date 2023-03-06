const query = `
{
  stopsByRadius(lat: 60.258394, lon: 24.84436, radius: 500) {
    edges {
      node {
        distance
        stop {
          name
          lat
          lon
        }
      }
    }
  }
}
`;

fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({query})
})
    .then(response => response.json())
    .then(data => {
        const stops = data.data.stopsByRadius.edges;
        const busStopsList = document.getElementById('bus-stops');

        // Initialize kartta
        const map = L.map('mapid', {zoomControl: false}).setView([60.258394, 24.84436], 17);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);

        // Lisää markkeri jokaiselle pysäkille
        stops.forEach(stop => {
            const stopName = stop.node.stop.name;
            const stopDistance = stop.node.distance;
            const stopLat = stop.node.stop.lat;
            const stopLon = stop.node.stop.lon;

            const listItem = document.createElement('li');
            listItem.innerText = `${stopName} (${stopDistance} metriä kampukselta)`;
            busStopsList.appendChild(listItem);

            L.marker([stopLat, stopLon]).addTo(map)
                .bindPopup(`${stopName} (${stopDistance} metriä kampukselta)`)
                .openPopup();
        });

        // Lisää punainen markkeri kampukselle
        const metropoliaMarker = L.marker([60.258394, 24.84436], {icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41]
            })}).addTo(map)
            .bindPopup('Metropolia Myyrmäki Kampus')
            .openPopup();

        // Zoom kontrolli
        L.control.zoom({position: 'bottomright'}).addTo(map);
    })
    .catch(error => console.error(error));
