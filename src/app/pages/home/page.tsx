// src/pages/map.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import CountryShapes from '../api/CountryShapes'; // Assurez-vous que ce chemin est correct

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
      <div className='w-full flex justify-center items-center'>
        <div className='w-full flex gap-8'>
          <div className='bg-secondary w-1/4 rounded-[15px]'>
            test
          </div>
          <div className="w-full max-w-1/3">
            <DynamicWorldMap />
          </div>
        </div>
      </div>
      <CountryShapes />
      <button className="btn btn-primary">Hello daisyUI!</button>
    </div>
  );
};

export default Home;
