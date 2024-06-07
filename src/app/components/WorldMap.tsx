// src/components/WorldMap.tsx
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON, LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import { Country } from '../../types/country';


const WorldMap: React.FC<{ setCountryClicked: (country: any) => void; secretCountry: Country | null }> = ({ setCountryClicked, secretCountry }) => {
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
              layer.on('click', async function (e) { // Marking function as async
                const currentStyle = (layer.options as any).fillColor;
                console.log("Clicked on", feature.properties.name);

                if (feature.properties.name !== secretCountry?.name) {
                  layer.setStyle({ fillColor: "#FF7D5C", fillOpacity: 0.6 });
                } else {
                  layer.setStyle({ fillColor: "#9FE88D", fillOpacity: 0.4 });
                }

                try {
                  await axios.get(`https://countryapi.io/api/name/${feature.properties.name}?apikey=qsgT6TVTtg353XJQdeI8uEADwD5YKrfYvwsim2PF`).then(
                    (countryResponse) => {
                      const countryKey = Object.keys(countryResponse.data)[0];
                      console.log(countryResponse.data[countryKey]);
                      setCountryClicked(countryResponse.data[countryKey]);
                    }).catch(error => {
                      console.error("Error fetching country data:", error);
                    }
                  );
                } catch (error) {
                  console.error("Error fetching country data:", error);
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
  }, [setCountryClicked, secretCountry]);

  return (
    <div id="map" style={{ height: '550px', width: '700px', borderRadius: '15px' }}></div>
  );
};

export default WorldMap;
