// src/components/WorldMap.tsx
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, LeafletMouseEvent } from 'leaflet';

const WorldMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current === null) {
        mapRef.current = L.map('map').setView([30.505, -0.09], 2);
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ).addTo(mapRef.current);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
        const geoJsonData = await response.json();
        initializeMap();

        if (mapRef.current) {
          L.geoJSON(geoJsonData, {
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
          }).addTo(mapRef.current);
        }
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchData();

    // Cleanup function to remove the map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="map" style={{ height: '550px', width: '827px', borderRadius: '15px' }}></div>
  );
};

export default WorldMap;
