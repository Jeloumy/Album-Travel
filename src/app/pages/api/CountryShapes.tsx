"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryShapes: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,population,region,area,flag');
        
        const results = response.data.map((country: any) => ({
          name_country: country.name.common,
          superficie: country.area,
          nb_citizens: country.population,
          continents: country.region,
          langues: Object.values(country.languages || {}).join(', ')
        }));
        setData(results);
      } catch (error) {
        setError('Erreur lors de la récupération des données');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Country Information</h1>
      <ul>
        {data.length > 0 ? (
          data.map((country, index) => (
            <li key={index}>
              <strong>{country.name_country}</strong><br />
              Superficie: {country.superficie} km²<br />
              Population: {country.nb_citizens}<br />
              Continent: {country.continents}<br />
              Langue(s) principale(s): {country.langues}
            </li>
          ))
        ) : (
          <li>Aucun enregistrement trouvé</li>
        )}
      </ul>
    </div>
  );
};

export default CountryShapes;
