import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON } from 'leaflet';

import { Countries } from '../lib/definitions';
import {fetchCountry} from '../lib/data';

interface WorldMapProps {
  setCountryClicked: (country: any) => void;
  setActivePlay: (active: boolean) => void;
  secretCountry: Countries | null;
  activePlay: boolean;
  numberOfClick: number;
  setNumberOfClick: (number: number) => void;
  victory: boolean;
  setVictory: (victory: boolean) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ setCountryClicked, secretCountry, activePlay, setActivePlay, numberOfClick, setNumberOfClick, victory,
  setVictory }) => {
  const mapRef = useRef<L.Map | null>(null);
  const lastCountryClickedRef = useRef<string>("");
  

  useEffect(() => {
    const initializeMap = () => {
      lastCountryClickedRef.current = "";
      if (mapRef.current === null) {
        mapRef.current = L.map('map').setView([30.505, -0.09], 2);
        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ).addTo(mapRef.current);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
        const geoJsonData = await response.json();
        initializeMap(); // Initialize the map before adding GeoJSON data

        if (mapRef.current) {
          L.geoJSON(geoJsonData, {
            style: function (feature) {
              return { color: "#cccccc", weight: 1, fillColor: "#ffffff", fillOpacity: 0.4 };
            },
            onEachFeature: function (feature, layer: GeoJSON) {
              // Click on a country
              layer.on('click', async function () { 
                if (!activePlay) return; 

                console.log("Clicked on", feature.properties.name);

                if (lastCountryClickedRef.current !== feature.properties.name) {
                  lastCountryClickedRef.current = feature.properties.name;

                  // test si victoire
                  if (feature.properties.name !== secretCountry?.name) {
                    layer.setStyle({ fillColor: "#FF7D5C", fillOpacity: 0.6 });
                  } else {
                    layer.setStyle({ fillColor: "#9FE88D", fillOpacity: 0.4 });
                  }

                  try {
                    let data = await fetchCountry(feature.properties.name);
                    setCountryClicked(data[0]);
                    console.log("Country data:", data[0]);
                  } catch (error) {
                    console.error("Error fetching country data:", error);
                  }
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
  }, [setCountryClicked, secretCountry, activePlay, setActivePlay, setNumberOfClick, setVictory, victory]); // setNumberOfClick est utilisé dans l'effet

  return (
    <div id="map" style={{ height: '550px', width: '700px', borderRadius: '15px' }}></div>
  );
};

export default WorldMap;
