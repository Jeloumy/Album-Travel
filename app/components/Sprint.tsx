import React, { useState, useEffect, useRef } from 'react';
import { Country } from '../types/country';
import AnswerCube from '../components/answer-cube';
import { setSecret } from '../utils/secretCountry';

interface SprintProps {
  setCountryClicked: (country: Country | null) => void;
  setActivePlay: (active: boolean) => void;
  secretCountry: Country | null;
  activePlay: boolean;
  countryClicked: Country | null;
  setSecretCountry: (country: Country | null) => void;
}

const Sprint: React.FC<SprintProps> = ({
  setCountryClicked,
  setActivePlay,
  secretCountry,
  activePlay,
  countryClicked,
  setSecretCountry,
}) => {
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds = 1m30s
  const [timeDeduction, setTimeDeduction] = useState<number | null>(null);
  const [timeAddition, setTimeAddition] = useState<number | null>(null);
  const [listOfCountries, setListOfCountries] = useState<Country[]>([]);

  const initialized = useRef(false);

  const startGame = async () => {
    setListOfCountries([]);
    setCountryClicked(null);
    setActivePlay(true);
    setTimeLeft(90);
    try {
      console.log("Initializing the game...");
      const secret = await setSecret(); // Wait for the promise to resolve
      setSecretCountry(secret);
      console.log('Secret country:', secret);
    } catch (error) {
      console.error("Error initializing the game:", error);
    }
    
  };

  // Initialiser le jeu
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      startGame();
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up timer on unmount or game end
    return () => clearInterval(timer);
  }, []);

  // Test si le pays cliqué est le pays secret
  const handleCountryClicked = async () => {
    if (countryClicked && secretCountry) {
      if (countryClicked.name === secretCountry.name) {
        console.log("Victoire");
        setListOfCountries(prevCountries => [...prevCountries, secretCountry]);
        const secret = await setSecret(); // Wait for the promise to resolve
        setSecretCountry(secret);
        console.log('Secret country:', secret);
      }
    }
  };

  useEffect(() => {
    handleCountryClicked();
    if (countryClicked && countryClicked.name !== secretCountry?.name) {
      setTimeLeft(prevTime => Math.max(prevTime - 5, 0));
      const deductionTimer = setTimeout(() => {
        setTimeDeduction(-5);
        setTimeout(() => {
          setTimeDeduction(null);
        }, 1000);
      }, 100);
      return () => clearTimeout(deductionTimer);
    }else if(countryClicked && countryClicked.name === secretCountry?.name){
      setTimeLeft(prevTime => Math.max(prevTime + 10, 0));
      const additionTimer = setTimeout(() => {
        setTimeAddition(+10);
        setTimeout(() => {
          setTimeAddition(null);
        }, 1000);
      }, 100);
      return () => clearTimeout(additionTimer);
    }
  }, [countryClicked]);

  useEffect(() => {
    if (timeLeft === 0) {
      setActivePlay(false);
    }
  }, [timeLeft, setActivePlay]);

  const progress = (timeLeft / 90) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div className="flex-col flex items-center h-full w-full">
      <div className='w-full'>
        {activePlay && (
          <div className='w-full flex flex-col items-center justify-center'>
            {/* Affichage du temps restant */}
            <div className="mt-2 text-white">
              Temps restant : {formattedTime}
            </div>
            {/* Barre de progression */}
            <div className="w-3/4 mt-4 bg-[#383B46] rounded">
              <div
                className="h-4 bg-primary rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Affichage de la déduction de temps */}
            {timeDeduction !== null && (
              <div className="mt-2 text-secondary font-bold">
                -5 secondes !
              </div>
            )}
            {timeAddition !== null && (
              <div className="mt-2 text-primary font-bold">
                  +10 secondes !
              </div>
            )}
          </div>
        )}
        {/* Affichage en cas de temps écoulé */}
        {timeLeft <= 0 && (
          <div className="mt-4 flex flex-col items-center justify-center h-full w-full">
            <h2 className='mb-4'>Temps écoulé !</h2>
            <p className='mb-4'>Nombre de pays trouvé dans le temps imparti <span className="text-accent">{listOfCountries.length}</span></p>
            
            <div className='grid grid-cols-4 w-full mb-4'>
              {listOfCountries.map((country, index) => (
                <p className="text-center" key={index}>{country.name}</p>
              ))}
            </div>
            <button className="btn btn-outline btn-accent" onClick={startGame}>Rejouer</button>
          </div>
        )}
      </div>

      {/* Affichage des informations sur le pays cliqué et le pays secret */}
      {timeLeft > 0 && countryClicked && secretCountry && (
        <div className='w-full'>
          <div className="flex w-full justify-around mt-4">
            <AnswerCube label="Superficie" colorClass="" info={countryClicked.area} dataCountrySecret={secretCountry.area} />
            <AnswerCube label="Continent" colorClass="" info={countryClicked.region} dataCountrySecret={secretCountry.region} />
            <AnswerCube label="Région" colorClass="" info={countryClicked.subregion} dataCountrySecret={secretCountry.subregion} />
            <AnswerCube label="Population" colorClass="" info={countryClicked.population} dataCountrySecret={secretCountry.population} />
          </div>
          <p className='mt-8'>Pays trouvés :</p>
          <div className='grid grid-cols-4 w-full mb-4'>
              {listOfCountries.map((country, index) => (
                <p className="text-center" key={index}>{country.name}</p>
              ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default Sprint;