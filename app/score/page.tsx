"use client";

import React, { useEffect, useState } from 'react';
import HeaderNav from '../ui/header-nav';
import { fetchSprintScore, fetchPrecisionScore } from '../lib/data';
import { useUser } from '../context/UserContext';
import { Sprints, Precisions } from '../lib/definitions';

const Score: React.FC = () => {
  const [sprintScore, setSprintScore] = useState<Sprints[]>([]);
  const [precisionScore, setPrecisionScore] = useState<Precisions[]>([]);
  const [sprintPage, setSprintPage] = useState(1);
  const [precisionPage, setPrecisionPage] = useState(1);
  const { user } = useUser(); // Assuming useUser returns user context

  const itemsPerPage = 10;

  useEffect(() => {
    const getSprintScore = async () => {
      const sprintData = await fetchSprintScore();
      setSprintScore(sprintData);
    };

    const getPrecisionScore = async () => {
      const precisionData = await fetchPrecisionScore();
      setPrecisionScore(precisionData);
    };

    getSprintScore();
    getPrecisionScore();
  }, []);

  const sprintPageCount = Math.ceil(sprintScore.length / itemsPerPage);
  const precisionPageCount = Math.ceil(precisionScore.length / itemsPerPage);

  const displayedSprintScores = sprintScore.slice(
    (sprintPage - 1) * itemsPerPage,
    sprintPage * itemsPerPage
  );

  const displayedPrecisionScores = precisionScore.slice(
    (precisionPage - 1) * itemsPerPage,
    precisionPage * itemsPerPage
  );

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
                <th>Nb pays devinés</th>
                <th>Nb pénalités</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedSprintScores.map((sprint, index) => (
                <tr key={index}>
                  <td>{(sprintPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{sprint.username}</td>
                  <td>{sprint.nb_secret_find}</td>
                  <td>{sprint.nb_penalities}</td>
                  <td>{new Date(sprint.score_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between mt-4'>
            <button
              className='btn'
              disabled={sprintPage === 1}
              onClick={() => setSprintPage(sprintPage - 1)}
            >
              Précédent
            </button>
            <button
              className='btn'
              disabled={sprintPage === sprintPageCount}
              onClick={() => setSprintPage(sprintPage + 1)}
            >
              Suivant
            </button>
          </div>
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
              {displayedPrecisionScores.map((precision, index) => (
                <tr key={index}>
                  <td>{(precisionPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{precision.username}</td>
                  <td>{`${Math.floor(precision.duration_of_game / 60)}:${precision.duration_of_game % 60 < 10 ? `0${precision.duration_of_game % 60}` : precision.duration_of_game % 60}`}</td>
                  <td>{precision.nb_click}</td>
                  <td>{new Date(precision.score_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between mt-4'>
            <button
              className='btn'
              disabled={precisionPage === 1}
              onClick={() => setPrecisionPage(precisionPage - 1)}
            >
              Précédent
            </button>
            <button
              className='btn'
              disabled={precisionPage === precisionPageCount}
              onClick={() => setPrecisionPage(precisionPage + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
