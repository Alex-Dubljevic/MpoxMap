'use client';

import { useState } from 'react';

const IntroBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">What is Mpox?</h2>
      <button
        onClick={togglePanel}
        className="text-blue-300 hover:text-white font-semibold"
      >
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>
      <div
        className={`mt-4 text-white overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p>
          Mpox, formerly known as Monkeypox, is a viral zoonotic disease caused by the Mpox virus. 
          It is characterized by fever, rash, and swollen lymph nodes, and can lead to a range of other 
          symptoms such as body aches and fatigue. The virus is transmitted from animals to humans 
          through contact with infected animals or their bodily fluids, and it can also spread between 
          humans through respiratory droplets and contact with contaminated materials.
        </p>
      </div>
    </div>
  );
};

export default IntroBox;
