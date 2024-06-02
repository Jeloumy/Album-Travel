import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, LeafletMouseEvent } from 'leaflet';

const WorldMap: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
        const geoJsonData = await response.json();

        const map = L.map('map').setView([30.505, -0.09], 2);
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ).addTo(map);
        
        const geoJsonLayer: GeoJSON = L.geoJSON(geoJsonData, {
          style: function (feature) {
            return { color: "white", weight: 1, fillColor: "white", fillOpacity: 0.4 };
          },
          onEachFeature: function (feature, layer: GeoJSON) {
            layer.on('click', function (e: LeafletMouseEvent) {
              const currentStyle = (layer.options as any).fillColor;
              if (currentStyle === "white") {
                layer.setStyle({ fillColor: "#2ABF7A", fillOpacity: 0.6 });
              } else {
                layer.setStyle({ fillColor: "white", fillOpacity: 0.4 });
              }
            });
          }
        }).addTo(map);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="map" style={{ height: '550px', width: '827px' ,borderRadius: '15px' }}>
      <MapContainer
        center={[30.505, -0.09]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
