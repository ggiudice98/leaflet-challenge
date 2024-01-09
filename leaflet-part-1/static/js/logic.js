// Siginificant earthquake past 7 days

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Create Map

let map = L.map("map", {
    center: [41.15, -116.65],
    zoom: 5
});

// Adding first tile layer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Retrieve Json Data
d3.json(url).then(function(Data) {

    L.geoJson(Data, {
    pointToLayer: function (Data, latlng) {
        return L.circleMarker(latlng,{
            radius: (Data.properties.mag) * 5,
            fillColor: chooseColor(Data.geometry.coordinates[2]),
            color: chooseColor,
            weight: 1,
            opacity: 10000,
            fillOpacity: 1000   });
    },

}).addTo(map);

//according to depth

function chooseColor(depth) {
    if (depth < -10) return "lightgreen";
    else if (depth < 10) return "green";
    else if (depth <30) return "yellow";
    else if (depth <70) return "orange";
    else if (depth <90) return "pink";
    else return "red";
};


// Adding a legend

var legend = L.control({ position: "bottomright" });

    legend.addTo(map)

});

