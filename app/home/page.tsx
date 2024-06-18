"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import AnswerCube from '../components/answer-cube';
import { Country } from '../types/country';
import HeaderNav from '../ui/header-nav'
import Sprint from '../components/Sprint';
import LessClick from '../components/LessClick';

const DynamicWorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false,
});

const Home: React.FC = () => {
  const initialized = useRef(false);
  const [countryClicked, setCountryClicked] = useState<Country | null>(null);
  const [secretCountry, setSecretCountry] = useState<Country | null>(null);
  const [activePlay, setActivePlay] = useState<boolean>(false);
  const [numberOfClick, setNumberOfClick] = useState<number>(0);
  const [gameMode, setGameMode] = useState<null | 'Sprint' | 'Precision'>(null);
  const [victory, setVictory] = useState<boolean>(false);

  useEffect(() => {
    if (activePlay) {
      setNumberOfClick(0);
      setCountryClicked(null);
      setSecretCountry(null);
      console.log("test")
    }
  }, [activePlay]);

  return (
    <div>
      <HeaderNav />
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

          {!gameMode ? (
            <div className='grid grid-cols-2 gap-4 h-full'>
              <div className='flex flex-col justify-center items-center p-8 border border-accent rounded gap-2'>
                <h4 className="text-accent font-bold text-xl text-center">Sprint des Nations</h4>
                <p className='text-center'>Trouvez le maximum de pays avant que le temps ne s&apos;écoule.</p>
                <button className="btn btn-outline btn-accent mt-2" onClick={() => setGameMode("Sprint")}>Jouer</button>
              </div>
              <div className='flex flex-col justify-center items-center p-8 border border-accent rounded gap-2'>
                <h4 className="text-accent font-bold text-xl">Défi de Précision</h4>
                <p className='text-center'>Trouvez le pays secret avec le moins de clics et dans le minimum de temps.</p>
                <button className="btn btn-outline btn-accent mt-2" onClick={() => setGameMode("Precision")}>Jouer</button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-2 border-neutral-content rounded h-full">
              <div className='flex justify-between items-center'>
                <h2>Résultat</h2>
                <button className="btn btn-secondary" onClick={() => { setGameMode(null); setActivePlay(false); setVictory(false) }}>Retour</button>
              </div>
              {gameMode === 'Sprint' && <Sprint setCountryClicked={setCountryClicked} secretCountry={secretCountry} setSecretCountry={setSecretCountry} countryClicked={countryClicked} activePlay={activePlay} setActivePlay={setActivePlay} />}
              {gameMode === 'Precision' && <LessClick setVictory={setVictory} victory={victory} setCountryClicked={setCountryClicked} secretCountry={secretCountry} setSecretCountry={setSecretCountry} countryClicked={countryClicked} activePlay={activePlay} setActivePlay={setActivePlay} numberOfClick={numberOfClick} setNumberOfClick={setNumberOfClick} />}
            </div>
          )}
        </div>
        <div className="w-full max-w-1/2">
          <DynamicWorldMap setVictory={setVictory} victory={victory} setCountryClicked={setCountryClicked} secretCountry={secretCountry} activePlay={activePlay} setActivePlay={setActivePlay} numberOfClick={numberOfClick} setNumberOfClick={setNumberOfClick} />
        </div>
      </div>
    </div>
  );
};

export default Home;
