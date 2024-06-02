"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryShapes: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let allData: React.SetStateAction<any[]> = [];
      let offset = 0;
      const limit = 50; // Nombre de résultats par requête
      let moreDataAvailable = true;

      while (moreDataAvailable) {
        try {
          const response = await axios.get(
            `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/country_shapes/records?rows=${limit}&start=${offset}`
          );
          const results = response.data.results || [];
          allData = [...allData, ...results];
          offset += limit;
          moreDataAvailable = results.length === limit;
        } catch (error) {
          setError('Erreur lors de la récupération des données');
          setLoading(false);
          moreDataAvailable = false;
        }
      }
console.log(allData);
      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Country Shapes</h1>
      <ul>
        {data.length > 0 ? (
          data.map((record, index) => (
            <li key={record.recordid || record.join_name || index}>{record.cntry_name}</li>
          ))
        ) : (
          <li>Aucun enregistrement trouvé</li>
        )}
      </ul>
    </div>
  );
};

export default CountryShapes;
