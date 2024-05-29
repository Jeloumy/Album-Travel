// pages/index.tsx
"use client";

import React from 'react';
import CountryShapes from '../../component/api/CountryShapes';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue sur le projet Next.js</h1>
      <CountryShapes />
    </div>
  );
};

export default Home;
