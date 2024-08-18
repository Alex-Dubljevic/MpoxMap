'use client';

import { useState } from 'react';

const IntroBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-blue-800 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
        isOpen ? 'bg-blue-600' : 'bg-blue-800'
      } hover:bg-blue-700`}
      onClick={togglePanel}
    >
      <h2 className="text-4xl font-bold text-white mb-4 text-center">What is Mpox?</h2>
      <div
        className={`text-white overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <p>
  Mpox, formerly known as monkeypox, is a viral zoonotic disease caused by the Mpox virus. It is characterized by fever, rash, and swollen lymph nodes,
  and can spread from animals to humans and between humans through contact with infected materials or respiratory droplets.
  <br /><br />
  The recent outbreak of Clade 1 Mpox is particularly concerning because it differs from the more common Clade 2.
  Clade 1 has shown a higher mortality rate and more severe symptoms,
  raising alarms about its potential impact compared to previous Mpox outbreaks.
  This variant&apos;s behavior and spread patterns are still being studied,
  but its emergence signals a need for heightened vigilance and response. I&apos;ve created this website to track the spread
  of Mpox Clade 1, and data regarding the 2022 outbreak of Mpox Clade 2 is available in the historical tab.
</p>    

      </div>
      <div
        className={`mt-4 text-white flex justify-center items-center transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <span className="text-2xl">&#9660;</span>
      </div>
    </div>
  );
};

export default IntroBox;
