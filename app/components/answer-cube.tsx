// components/AnswerCube.tsx

import React from 'react';

interface AnswerCubeProps {
  label: string;
  colorClass: string;
}

const AnswerCube: React.FC<AnswerCubeProps> = ({ label, colorClass }) => {
  return (
    <div className="flex-col flex items-center">
      <div className={`w-20 h-20 rounded ${colorClass}`}></div>
      <p>{label}</p>
    </div>
  );
};

export default AnswerCube;
