"use client";

import React from 'react';
import HeaderNav from '../ui/header-nav'

const Score: React.FC = () => {
  return (
    <div>
      <HeaderNav />
      <div className='w-full flex gap-8'>
        <div className='bg-neutral w-1/2 rounded-[15px] p-6 flex flex-col gap-4'>
          <h2 className="text-accent">Classement Sprint des nations</h2>
          <table className='text-left'>
            <thead className='border-b'>
              <tr>
                <th>Rang</th>
                <th>Utilisateur</th>
                <th>Nb pays dévinés</th>
                <th>Nb pénalités</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>User A</td>
                <td>100</td>
                <td>2</td>
                <td>2022-01-01</td>
              </tr>
              <tr>
                <td>2</td>
                <td>User B</td>
                <td>90</td>
                <td>1</td>
                <td>2022-01-02</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='bg-neutral w-1/2 rounded-[15px] p-6 flex flex-col gap-4'>
          <h2 className="text-accent">Classement Défi de précision</h2>
          <table className='text-left'>
            <thead className='border-b'>
              <tr>
                <th>Rang</th>
                <th>Utilisateur</th>
                <th>Temps pour trouver</th>
                <th>Nb de clicks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>User C</td>
                <td>30s</td>
                <td>5</td>
                <td>2022-01-03</td>
              </tr>
              <tr>
                <td>2</td>
                <td>User D</td>
                <td>40s</td>
                <td>7</td>
                <td>2022-01-04</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Score;