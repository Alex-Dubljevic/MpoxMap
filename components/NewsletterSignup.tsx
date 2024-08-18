'use client';

import { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSubmit = () => {
    alert('Subscription form submitted.');
  };

  return (
    <div className="bg-blue-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">
        Signup for Email Alerts for Cases in your Country
      </h2>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none"
        />
      </div>
        <div className="relative">
          <div className="w-full p-3 bg-neutral-900 text-gray-400 rounded-md border border-neutral-700 focus:outline-none">
            <CountryDropdown
              value={selectedCountry}
              onChange={handleCountryChange}
            />
          </div>
        </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-700 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default NewsletterSignup;
