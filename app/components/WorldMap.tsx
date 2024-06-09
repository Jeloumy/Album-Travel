import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { GeoJSON } from 'leaflet';
import axios from 'axios';
import { Country } from '../types/country';

interface WorldMapProps {
  setCountryClicked: (country: any) => void;
  setActivePlay: (active: boolean) => void;
  secretCountry: Country | null;
  activePlay: boolean;
  numberOfClicks: number;
  setNumberOfClicks: (number: number) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ setCountryClicked, secretCountry, activePlay, setActivePlay, numberOfClicks, setNumberOfClicks }) => {
  const mapRef = useRef<L.Map | null>(null);
  let lastCountryClicked = "";
  let prevCount = 0;

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
              return { color: "#cccccc", weight: 1, fillColor: "#ffffff", fillOpacity: 0.4 };
            },
            onEachFeature: function (feature, layer: GeoJSON) {
              layer.on('click', async function () {
                if (!activePlay) return; // Ignore clicks if the game is not active

                console.log("Clicked on", feature.properties.name);
                if (lastCountryClicked !== feature.properties.name) {
                  lastCountryClicked = feature.properties.name;
                  prevCount ++;
                  setNumberOfClicks(prevCount);
                  if (feature.properties.name !== secretCountry?.name) {
                    layer.setStyle({ fillColor: "#FF7D5C", fillOpacity: 0.6 });
                  } else {
                    layer.setStyle({ fillColor: "#9FE88D", fillOpacity: 0.4 });
                    setActivePlay(false);
                  }
                  try {
                    await axios.get(`https://countryapi.io/api/name/${feature.properties.name}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`).then(
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
  }, [setCountryClicked, secretCountry, activePlay, setActivePlay, setNumberOfClicks]); // setNumberOfClicks est utilisé dans l'effet

  return (
    <div id="map" style={{ height: '550px', width: '700px', borderRadius: '15px' }}></div>
  );
};

export default WorldMap;
