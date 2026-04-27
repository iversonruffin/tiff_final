// Your aunt's travel stops
const places = [
  {
    name: "Havana, Cuba",
    lat: 23.1136,
    lng: -82.3666,
    photo: "img/tiff_pics_2/cuba.JPG",
    caption: "2017",
  },
  {
    name: "Machu Picchu, Peru",
    lat: -13.1631,
    lng: -72.545,
    photo: "img/tiff_pics_2/macchu.JPEG",
    caption: "2019",
  },
  {
    name: "Seoul, South Korea",
    lat: 37.5665,
    lng: 126.978,
    photo: "img/tiff_pics_2/seoul.JPG",
    caption: "2025",
  },
  {
    name: "St. John, U.S. Virgin Islands",
    lat: 18.3358,
    lng: -64.7281,
    photo: "img/tiff_pics_2/blue_dress.JPEG",
    caption: "2021",
  },
];

// Create the map and disable zooming and dragging
const map = L.map("map", {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  boxZoom: false,
  keyboard: false,
});

// Tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add markers
const markers = [];
places.forEach((place) => {
  const marker = L.marker([place.lat, place.lng]).addTo(map);

  const popupContent = `
    <div style="text-align:center; width:30vh; height: 35vh;">
      <h3 style="margin:0 0 8px; font-size:1rem;">${place.name}</h3>
      <img src="${place.photo}" alt="${place.name}" 
           style="width:100%; height:80%; max-height:70vh; border-radius:12px; object-fit:cover;" />
      <p style="font-size:0.9rem; margin-top:6px; color:#334155;">${place.caption}</p>
    </div>
  `;

  marker.bindPopup(popupContent, { className: "travel-popup", closeButton: true });

  markers.push(marker);
});

// Fit map to show all markers
const group = new L.featureGroup(markers);
map.fitBounds(group.getBounds().pad(0.3));

// Draw route line
const coords = places.map((p) => [p.lat, p.lng]);
L.polyline(coords, { color: "#10b981", weight: 3, opacity: 0.7 }).addTo(map);

// Zoom animation when clicking a marker
map.on("popupopen", function (e) {
  const { lat, lng } = e.popup._latlng;
  map.flyTo([lat+3.5, lng], 6, { animate: true, duration: 1.5 });
});

map.on("popupclose", function () {
  map.flyToBounds(group.getBounds().pad(0.3), { animate: true, duration: 1.5 });
});
