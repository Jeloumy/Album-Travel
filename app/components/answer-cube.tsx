// components/AnswerCube.tsx

import { Country } from '../types/country';
import React from 'react';

interface AnswerCubeProps {
  label: string | null;
  colorClass: string | null;
  info: string | number | null;
  dataCountrySecret: string | number | null;
}

const AnswerCube: React.FC<AnswerCubeProps> = ({ label, colorClass,info,dataCountrySecret }) => {
  if ((!colorClass || colorClass === "") && (dataCountrySecret && info)) {
    if(Number.isInteger(info)){
      if(dataCountrySecret === info){
        colorClass = "bg-primary";
      }else if(dataCountrySecret > info){
        colorClass = "bg-accent";
      }else if(dataCountrySecret < info){
        colorClass = "bg-info";
      }else{}
    }else{
      if(dataCountrySecret === info){
        colorClass = "bg-primary";
      }else{
        colorClass = "bg-secondary";
      }
    }

  }

  return (
    <div className="flex-col flex items-center">
      <div className={`w-20 h-20 rounded flex justify-center items-center text-center ${colorClass}`}>
        <p className="text-neutral">{info}</p>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default AnswerCube;
