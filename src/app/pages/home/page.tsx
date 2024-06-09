// src/pages/map.tsx
"use client";

import React, { useState,useEffect,useRef } from 'react';
import dynamic from 'next/dynamic';
import AnswerCube from '@/app/components/answer-cube';
import { Country } from '../../../../app/types/country';

const DynamicWorldMap = dynamic(() => import('../../components/WorldMap'), {
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
        let randomCountry;
        try {
          const response = await fetch("https://countryapi.io/api/all?apikey=qsgT6TVTtg353XJQdeI8uEADwD5YKrfYvwsim2PF&populationGreaterThan=100000");
          const data = await response.json();
          let population = 0;
          while (population < 100000){
            const countries = Object.keys(data);
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountryCode = countries[randomIndex];
            randomCountry = data[randomCountryCode];
            population = randomCountry.population;
          }
          setSecretCountry(randomCountry);
          console.log('Random country population:', randomCountry.population);
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
              <AnswerCube label="Correct" colorClass="bg-primary" info="e" dataCountrySecret=""/>
              <AnswerCube label="Incorrect" colorClass="bg-secondary" info="e" dataCountrySecret=""/>
              <AnswerCube label="Plus grand" colorClass="bg-accent" info="e" dataCountrySecret=""/>
              <AnswerCube label="Plus petit" colorClass="bg-info" info="e" dataCountrySecret=""/>
            </div>
          </div>
          <div className="p-4 border-2 border-neutral-content rounded">
            <h2>Résultat</h2>
            {countryClicked && secretCountry && (
              <div className="flex gap justify-between mt-4">
                  <AnswerCube label="Superficie" colorClass="" info={countryClicked.area} dataCountrySecret={secretCountry.area} />
                  <AnswerCube label="Continent" colorClass="" info={countryClicked.region} dataCountrySecret={secretCountry.region}/>
                  <AnswerCube label="Région" colorClass="" info={countryClicked.subregion} dataCountrySecret={secretCountry.subregion}/>
                  <AnswerCube label="Population" colorClass="" info={countryClicked.population} dataCountrySecret={secretCountry.population}/>
              </div>
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
