'use client';

import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;

//Placeholder data
const currentData = [
  { name: 'USA', cases: 5000, coordinates: [-98.35, 39.50] },
  { name: 'Brazil', cases: 2000, coordinates: [-51.93, -14.24] },
  { name: 'India', cases: 1500, coordinates: [78.96, 20.59] },
];

const historicalData = [
  { name: 'Mexico', cases: 3000, coordinates: [-102.55, 23.63] },
  { name: 'Russia', cases: 2500, coordinates: [105.32, 61.52] },
  { name: 'Australia', cases: 1000, coordinates: [133.77, -25.27] },
];

const Map: React.FC = () => {
  const [currentLayer, setCurrentLayer] = useState<'current' | 'historical'>('current');

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
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
          'circle-radius': ['step', ['get', 'cases'], 5, 1000, 10, 5000, 15],
          'circle-color': '#ff5200',
          'circle-opacity': 0.7,
        },
      });

      map.addLayer({
        id: 'historical-countries-layer',
        type: 'circle',
        source: 'historical-countries',
        paint: {
          'circle-radius': ['step', ['get', 'cases'], 5, 1000, 10, 5000, 15],
          'circle-color': '#00ff00',
          'circle-opacity': 0.7,
        },
        layout: {
          visibility: 'none',
        },
      });

      // Add popup for specific data on click
      map.on('click', ['current-countries-layer', 'historical-countries-layer'], (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const coordinates = feature.geometry.coordinates.slice();
          const { title, cases } = feature.properties;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<strong>${title}</strong><p>Cases: ${cases}</p>`)
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
  }, []);

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
      <div id="map" className="w-full h-[80vh] border-8 border-gray-800 rounded-md" />
    </div>
  );
};

export default Map;
