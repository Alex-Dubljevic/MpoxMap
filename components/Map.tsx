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
        const data = await parseCSV('/mpoxdata.csv');
        setHistoricalData(data);
        
        // For this example, let's assume current data is a subset of historical data
        // You might want to load this from a different source in a real application
        setCurrentData(data.slice(0, 10));
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
      center: [0, 20],
      zoom: 2,
      projection: 'globe',
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      // Add sources and layers for both current and historical data
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

      // Add popup for specific data on click
      map.on('click', ['current-countries-layer', 'historical-countries-layer'], (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const coordinates = feature.geometry.coordinates.slice();
          const { title, cases, deaths } = feature.properties;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${title}</strong><p>Cases: ${cases}</p><p>Deaths: ${deaths}</p>`)
            .addTo(map);
        }
      });

      // Change cursor to pointer on hover
      map.on('mouseenter', ['current-countries-layer', 'historical-countries-layer'], () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', ['current-countries-layer', 'historical-countries-layer'], () => {
        map.getCanvas().style.cursor = '';
      });

      // Function to update totals
      const updateTotals = (data: CountryData[]) => {
        setTotalCases(data.reduce((sum, country) => sum + country.cases, 0));
        setTotalDeaths(data.reduce((sum, country) => sum + country.deaths, 0));
        setTotalCountries(data.length);
      };

      // Initial update
      updateTotals(currentData);

      // Toggle layer visibility
      const toggleLayer = (layer: 'current' | 'historical') => {
        setCurrentLayer(layer);

        const currentVisibility = layer === 'current' ? 'visible' : 'none';
        const historicalVisibility = layer === 'historical' ? 'visible' : 'none';

        map.setLayoutProperty('current-countries-layer', 'visibility', currentVisibility);
        map.setLayoutProperty('historical-countries-layer', 'visibility', historicalVisibility);

        // Update totals based on the selected layer
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
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 ${currentLayer === 'current' ? 'bg-blue-800 text-white' : 'bg-gray-800'}`}
          onClick={() => (window as any).toggleLayer('current')}
        >
          Current Data
        </button>
        <button
          className={`px-4 py-2 ${currentLayer === 'historical' ? 'bg-blue-800 text-white' : 'bg-gray-800'}`}
          onClick={() => (window as any).toggleLayer('historical')}
        >
          Historical Data
        </button>
      </div>
      <div id="map" className="w-full h-[80vh] rounded-md" />
      <div className="absolute top-4 left-4 bg-blue-800 p-4 rounded-md shadow-md">
        <p>Total Cases: {totalCases}</p>
        <p>Total Deaths: {totalDeaths}</p>
        <p>Countries Affected: {totalCountries}</p>
      </div>
    </div>
  );
};

export default Map;