import React, { useState, useEffect, useRef } from 'react';
import {Countries} from '../lib/definitions';
import AnswerCube from '../components/answer-cube';
import { setSecret } from '../utils/secretCountry';
import { insertPrecisionScore } from '../lib/data';
import { useUser } from '../context/UserContext';
import Image from 'next/image';

interface LessClickProps {
  setCountryClicked: (country: Countries | null) => void;
  setActivePlay: (active: boolean) => void;
  secretCountry: Countries | null;
  activePlay: boolean;
  numberOfClick: number;
  setNumberOfClick: (number: number) => void;
  countryClicked: Countries | null;
  setSecretCountry: (country: Countries | null) => void;
  victory: boolean;
  setVictory: (victory: boolean) => void;
}

const LessClick: React.FC<LessClickProps> = ({
  setCountryClicked,
  setActivePlay,
  secretCountry,
  activePlay,
  numberOfClick,
  setNumberOfClick,
  countryClicked,
  setSecretCountry,
  victory,
  setVictory
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialized = useRef(false);
  const { user } = useUser();

  const startGame = async () => {
    setCountryClicked(null);
    setActivePlay(true);
    setNumberOfClick(0);
    setVictory(false);
    setTimeElapsed(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    try {
      console.log("Initializing the game...");
      let secret = await setSecret(); // Wait for the promise to resolve
      setSecretCountry(secret);
      console.log('Secret country:', secret);
    } catch (error) {
      console.error("Error initializing the game:", error);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      startGame();
    }
  }, []);

  useEffect(() => {
    if (countryClicked && secretCountry) {
      const newNumberOfClick = numberOfClick + 1;
      setNumberOfClick(newNumberOfClick);
  
      if (countryClicked.name === secretCountry.name) {
        setVictory(true);
        setActivePlay(false);
  
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
  
        if (user) {
          console.log("insertion",secretCountry.id_country, user.id, timeElapsed, newNumberOfClick);
          insertPrecisionScore(timeElapsed, newNumberOfClick, user.id, secretCountry.id_country);
        }
      }
    }
  }, [countryClicked]);
  

  const formattedTime = `${Math.floor(timeElapsed / 60)}:${timeElapsed % 60 < 10 ? `0${timeElapsed % 60}` : timeElapsed % 60}`;

  return (
    <div className="flex-col flex items-center">
      {countryClicked && secretCountry && (
        <div className='w-full'>
          <div className="flex w-full justify-around mt-4 mb-8">
            {countryClicked && countryClicked.flag_link && (
              <div className='flex flex-col justify-between items-center'>
                <div className="w-20 my-2">
                  <Image
                    src={countryClicked.flag_link}
                    alt="flag"
                    layout="responsive"
                    width={60}
                    height={40}
                    objectFit="contain"
                  />
                </div>
                <p>{countryClicked.name}</p>
              </div>
            )}
            <AnswerCube label="Superficie" colorClass="" info={countryClicked.area} dataCountrySecret={secretCountry.area} />
            <AnswerCube label="Continent" colorClass="" info={countryClicked.region} dataCountrySecret={secretCountry.region} />
            <AnswerCube label="Région" colorClass="" info={countryClicked.subregion} dataCountrySecret={secretCountry.subregion} />
            <AnswerCube label="Population" colorClass="" info={countryClicked.population} dataCountrySecret={secretCountry.population} />
          </div>
          <div className='flex w-full gap-4 items-center justify-center'>
            <h2>Nombre d&apos;essais</h2>
            <p>{numberOfClick}</p>
          </div>
        </div>
      )}
      {victory && secretCountry && (
        <div className="flex gap-4 mt-4 items-center">
          <div>
            <h1>Victoire !</h1>
            <p>Le pays deviné était bien {secretCountry.name}. Vous avez réussi en {numberOfClick} essais et en {formattedTime}.</p>
          </div>
          <button className="btn btn-outline btn-accent" onClick={startGame}>Rejouer</button>
        </div>
      )}
    </div>
  );
};

export default LessClick;
