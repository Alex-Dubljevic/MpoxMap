'use client';

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { parseCSV } from '../utils/csvReader'; // Adjust the import path as needed

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY || '';

// Placeholder data
const currentData = [
  { name: 'USA', cases: 6000, coordinates: [-98.35, 39.50] },
  { name: 'Brazil', cases: 2000, coordinates: [-51.93, -14.24] },
  { name: 'India', cases: 1500, coordinates: [78.96, 20.59] },
];

const Map: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [currentLayer, setCurrentLayer] = useState<'current' | 'historical'>('current');

  useEffect(() => {
    // Load historical data from CSV
    const loadHistoricalData = async () => {
      try {
        const data = await parseCSV('/mpoxdata.csv'); // Adjust path as necessary
        setHistoricalData(data);
      } catch (error) {
        console.error('Error loading historical data:', error);
      }
    };

    loadHistoricalData();
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [0, 20],
      zoom: 2,
      projection: 'globe',
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      // Add sources for country layer
      map.addSource('current-countries', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: currentData.map((country) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: country.coordinates,
            },
            properties: {
              title: country.name,
              cases: country.cases,
            },
          })),
        },
      });

      map.addSource('historical-countries', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: historicalData.map((country) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: country.coordinates,
            },
            properties: {
              title: country.name,
              cases: country.cases,
            },
          })),
        },
      });

      // Add layers to map for data
      map.addLayer({
        id: 'current-countries-layer',
        type: 'circle',
        source: 'current-countries',
        paint: {
          'circle-radius': ['step', ['get', 'cases'], 5, 1000, 10, 5000, 30],
          'circle-color': '#ff0000',
          'circle-opacity': 0.7,
        },
      });

      map.addLayer({
        id: 'historical-countries-layer',
        type: 'circle',
        source: 'historical-countries',
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'cases'], 0, 5, 30000, 50],
            'circle-color': '#ff0000',
            'circle-opacity': 0.7,
          },
        layout: {
          visibility: 'none',
        },
      });

      // Change cursor to pointer on hover
      map.on('mouseenter', ['current-countries-layer', 'historical-countries-layer'], () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', ['current-countries-layer', 'historical-countries-layer'], () => {
        map.getCanvas().style.cursor = '';
      });

      // Toggle layer visibility
      const toggleLayer = (layer: 'current' | 'historical') => {
        setCurrentLayer(layer);

        const currentVisibility = layer === 'current' ? 'visible' : 'none';
        const historicalVisibility = layer === 'historical' ? 'visible' : 'none';

        map.setLayoutProperty('current-countries-layer', 'visibility', currentVisibility);
        map.setLayoutProperty('historical-countries-layer', 'visibility', historicalVisibility);
      };

      (window as any).toggleLayer = toggleLayer;
    });

    return () => {
      map.remove();
    };
  }, [historicalData]);

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 ${currentLayer === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => (window as any).toggleLayer('current')}
        >
          Current Data
        </button>
        <button
          className={`px-4 py-2 ${currentLayer === 'historical' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => (window as any).toggleLayer('historical')}
        >
          Historical Data
        </button>
      </div>
      <div id="map" className="w-full h-[80vh] rounded-md relative" />
    </div>
  );
};

export default Map;
