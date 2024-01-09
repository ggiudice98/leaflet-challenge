// Siginificant earthquake past 7 days

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

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
            fillcolor: chooseColor(Data.geometry.coordinates[2]),
            color: "black",
            weight: 1,
            fillopacity: 0.8
        });
    },

    style: mapStyle,
}).addTo(map);

// First attribute: Color according to depth

function chooseColor(depth) {
    if (depth < -10) return "rgb(163,246,0";
    else if (depth < 10) return "rgb(230,244,0";
    else if (depth <30) return "rgb(247,219,17";
    else if (depth <70) return "rgb(253,183,42";
    else if (depth <90) return "rgb(252,155,75";
    else return "rgb(225,87,91)";
};



// Adding a legend

var legend = L.control({position: "bottomright"});

    legend.onAdd = function(Map) {
        let div = L.DomUtil.create("div", "info legend"),
        depth = [-10,10,30,50,70,90];
    div.innerhtml = "<strong>Depth (km)</strong><br>";

    return div;
};

legend.addTo(map)

});

