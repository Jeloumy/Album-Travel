// /app/home/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import AnswerCube from '../components/answer-cube';
import { Country } from '../types/country';
import HeaderNav  from '../ui/header-nav'

const DynamicWorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false
});

const Home: React.FC = () => {
  const initialized = useRef(false);
  const [countryClicked, setCountryClicked] = useState<Country | null>(null);
  const [secretCountry, setSecretCountry] = useState<Country | null>(null);
  const [activePlay, setActivePlay] = useState<boolean>(false);
  const [numberOfClicks, setNumberOfClicks] = useState<number>(0);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initializedTheGame();
    }
  }, []);

  async function initializedTheGame() {
    setNumberOfClicks(0);
    setActivePlay(true);
    let randomCountry;
    try {
      const response = await fetch(`https://countryapi.io/api/all?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
      const data = await response.json();
      let population = 0;
      while (population < 100000) {
        const countries = Object.keys(data);
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountryCode = countries[randomIndex];
        randomCountry = data[randomCountryCode];
        population = randomCountry.population;
      }
      setSecretCountry(randomCountry);
      setCountryClicked(null);
      console.log('Random country population:', randomCountry.name);
    } catch (error) {
      console.error("Error fetching random country:", error);
    }
  }

  return (
    <div>
      <HeaderNav/>
      {/* <div className='w-full flex justify-center items-center my-8'>
        <h1>Voyager autour du monde</h1>
      </div> */}
      <div className='w-full flex gap-8'>
        <div className='bg-neutral w-3/4 rounded-[15px] p-6 flex flex-col gap-4'>
          <div className="p-4 border-2 border-neutral-content rounded">
            <h2>Indicateurs de couleur</h2>
            <div className="flex gap justify-around mt-4">
              <AnswerCube label="Correct" colorClass="bg-primary" info="" dataCountrySecret="" />
              <AnswerCube label="Incorrect" colorClass="bg-secondary" info="" dataCountrySecret="" />
              <AnswerCube label="Plus grand" colorClass="bg-accent" info="" dataCountrySecret="" />
              <AnswerCube label="Plus petit" colorClass="bg-info" info="" dataCountrySecret="" />
            </div>
          </div>
          <div className="p-4 border-2 border-neutral-content rounded">
            <h2>Résultat</h2>
            {countryClicked && secretCountry && (
              <div className="flex gap justify-around mt-4">
                <AnswerCube label="Superficie" colorClass="" info={countryClicked.area} dataCountrySecret={secretCountry.area} />
                <AnswerCube label="Continent" colorClass="" info={countryClicked.region} dataCountrySecret={secretCountry.region} />
                <AnswerCube label="Région" colorClass="" info={countryClicked.subregion} dataCountrySecret={secretCountry.subregion} />
                <AnswerCube label="Population" colorClass="" info={countryClicked.population} dataCountrySecret={secretCountry.population} />
              </div>
            )}
            {!activePlay && secretCountry &&(
              <div className="flex gap-4 mt-4">
                <div>
                  <h1>Victoire !</h1>
                  <p>Le pays a deviné était bien {secretCountry.name}; Vous avez réussi en {numberOfClicks} essais</p>
                </div>
                <button className="bg-primary text-neutral py-2 px-4 rounded" onClick={initializedTheGame}>Rejouer</button>
              </div>
            )}
          </div>
        </div>
        <div className="w-full max-w-1/2">
          <DynamicWorldMap setCountryClicked={setCountryClicked} secretCountry={secretCountry} activePlay={activePlay} setActivePlay={setActivePlay} numberOfClicks={numberOfClicks} setNumberOfClicks={setNumberOfClicks}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
