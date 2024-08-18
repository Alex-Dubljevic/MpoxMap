'use client';

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { parseCSV } from '../utils/csvReader';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY || '';

interface CountryData {
  name: string;
  cases: number;
  deaths: number;
  coordinates: [number, number];
}

const Map: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<CountryData[]>([]);
  const [currentData, setCurrentData] = useState<CountryData[]>([]);
  const [currentLayer, setCurrentLayer] = useState<'current' | 'historical'>('current');
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const Hdata = await parseCSV('/mpoxdata.csv');
        setHistoricalData(Hdata);
        
        const Cdata = await parseCSV('/currentmpox.csv');
        setCurrentData(Cdata);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [20, 10],
      zoom: 2,
      projection: 'globe',
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      ['current', 'historical'].forEach(layerType => {
        const sourceData = layerType === 'current' ? currentData : historicalData;
        
        map.addSource(`${layerType}-countries`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: sourceData.map((country) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: country.coordinates,
              },
              properties: {
                title: country.name,
                cases: country.cases,
                deaths: country.deaths,
              },
            })),
          },
        });

        map.addLayer({
          id: `${layerType}-countries-layer`,
          type: 'circle',
          source: `${layerType}-countries`,
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'cases'], 0, 5, 1000, 12, 20000, 50],
            'circle-color': layerType === 'current' ? '#ff0000' : '#ff0000',
            'circle-opacity': 0.7,
          },
          layout: {
            visibility: layerType === 'current' ? 'visible' : 'none',
          },
        });
      });

      // Function to update totals
      const updateTotals = (data: CountryData[]) => {
        setTotalCases(data.reduce((sum, country) => sum + country.cases, 0));
        setTotalDeaths(data.reduce((sum, country) => sum + country.deaths, 0));
        setTotalCountries(data.length);
      };

      updateTotals(currentData);
   
      const toggleLayer = (layer: 'current' | 'historical') => {
        setCurrentLayer(layer);

        const currentVisibility = layer === 'current' ? 'visible' : 'none';
        const historicalVisibility = layer === 'historical' ? 'visible' : 'none';

        map.setLayoutProperty('current-countries-layer', 'visibility', currentVisibility);
        map.setLayoutProperty('historical-countries-layer', 'visibility', historicalVisibility);
 
        updateTotals(layer === 'current' ? currentData : historicalData);
      };

      (window as any).toggleLayer = toggleLayer;
    });

    return () => {
      map.remove();
    };
  }, [historicalData, currentData]);

  return (
    <div className="relative">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-6 py-3 text-lg ${currentLayer === 'current' ? 'bg-blue-800 text-white' 
          : 'bg-gray-800 hover:bg-gray-600'}`}
          onClick={() => (window as any).toggleLayer('current')}
        >
          Current Data
        </button>
        <button
          className={`px-6 py-3 text-lg ${currentLayer === 'historical' ? 'bg-blue-800 text-white' 
          : 'bg-gray-800 hover:bg-gray-600'}`}
          onClick={() => (window as any).toggleLayer('historical')}
        >
          Historical Data
        </button>
      </div>
      <div id="map" className="w-full h-[80vh] rounded-md" />
      <div className="absolute top-[5rem] left-4 bg-blue-800 p-6 rounded-xl shadow-md text-xl">
        <p className="font-bold">Total Cases: {totalCases}</p>
        <p className="font-bold">Total Deaths: {totalDeaths}</p>
        <p className="font-bold">Countries Affected: {totalCountries}</p>
      </div>
    </div>
  );
};

export default Map;
