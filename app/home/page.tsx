// src/pages/map.tsx
"use client";

import React, { useState,useEffect,useRef } from 'react';
import dynamic from 'next/dynamic';
import CountryShapes from '../api/CountryShapes';
import AnswerCube from '../components/answer-cube';

// Charger WorldMap dynamiquement côté client
const DynamicWorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false
});

const Home: React.FC = () => {
  const initialized = useRef(false)
  const [countryClicked, setCountryClicked] = useState<Country | null>(null);
  const [secretCountry, setSecretCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchRandomCountry = async () => {
        try {
          const response = await fetch("https://countryapi.io/api/all?apikey=qsgT6TVTtg353XJQdeI8uEADwD5YKrfYvwsim2PF&populationGreaterThan=100000");
          const data = await response.json();
          const countries = Object.keys(data); // Obtenir les clés de l'objet
          const randomIndex = Math.floor(Math.random() * countries.length);
          const randomCountryCode = countries[randomIndex];
          console.log('Random countryCode:', randomCountryCode);
          const randomCountry = data[randomCountryCode];
          setSecretCountry(randomCountry);
          console.log('Random country:', randomCountry);
        } catch (error) {
          console.error("Error fetching random country:", error);
        }
      };
      
    fetchRandomCountry();}
  }, []);

  return (
    <div>
      <div className='w-full flex justify-center items-center my-8'>
        <h1>Voyager autour du monde</h1>
      </div>
      <div className='w-full flex gap-8'>
        <div className='bg-neutral w-3/4 rounded-[15px] p-6 flex flex-col gap-4'>
          <div className="p-4 border-2 border-neutral-content rounded">
            <h2>Indicateurs de couleur</h2>
            <div className="flex gap justify-between mt-4">
              <AnswerCube label="Correct" colorClass="bg-primary" />
              <AnswerCube label="Incorrect" colorClass="bg-secondary" />
              <AnswerCube label="Plus grand" colorClass="bg-accent" />
              <AnswerCube label="Plus petit" colorClass="bg-accent" />
            </div>
          </div>
          <div className="p-4 border-2 border-neutral-content rounded">
            <h2>Résultat</h2>
            {countryClicked && (
              <p>{countryClicked.area} - {countryClicked.region} - {countryClicked.subregion} - {countryClicked.population}</p>
            )
            }
          </div>
        </div>
        <div className="w-full max-w-1/2">
        <DynamicWorldMap setCountryClicked={setCountryClicked} secretCountry={secretCountry} />
        </div>
      </div>

    </div>
  );
};

export default Home;
