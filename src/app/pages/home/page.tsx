// src/pages/map.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import CountryShapes from '../api/CountryShapes';
import AnswerCube from '@/app/components/answer-cube';

// Charger WorldMap dynamiquement côté client
const DynamicWorldMap = dynamic(() => import('../../components/WorldMap'), {
  ssr: false
});

const Home: React.FC = () => {
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
            <h2> Résultat </h2>
          </div>
        </div>
        <div className="w-full max-w-1/2">
          <DynamicWorldMap />
        </div>
      </div>

      <CountryShapes />
      <button className="btn btn-primary">Hello daisyUI!</button>
    </div>
  );
};

export default Home;
