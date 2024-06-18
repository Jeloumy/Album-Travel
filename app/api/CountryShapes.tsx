"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CountryData {
  name_country: string;
  superficie: number;
  nb_citizens: number;
  continents: string;
  langues: string;
  flag: string;
}

const CountryShapes: React.FC = () => {
  const [data, setData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,population,region,area,flags,languages');
        
        const results = response.data.map((country: any) => ({
          name_country: country.name.common,
          superficie: country.area,
          nb_citizens: country.population,
          continents: country.region,
          langues: Object.values(country.languages || {}).join(', '),
          flag: country.flags.svg
        }));
        setData(results);
      } catch (error) {
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Informations sur les pays</h1>
      <ul>
        {data.length > 0 ? (
          data.map((country, index) => (
            <li key={index}>
              <br />
              <strong>{country.name_country}</strong><br />
              <img src={country.flag} alt={`Drapeau de ${country.name_country}`} style={{ maxWidth: '100px', height: 'auto' }} /><br />
              Superficie: {country.superficie.toLocaleString()} km²<br />
              Population: {country.nb_citizens.toLocaleString()}<br />
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
