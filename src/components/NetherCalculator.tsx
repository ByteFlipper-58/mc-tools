import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CoordinateSection from './nether/CoordinateSection';
import TipsSection from './nether/TipsSection';

interface Coordinates {
  x: string;
  y: string;
  z: string;
}

function NetherCalculator() {
  const [overworldCoords, setOverworldCoords] = useState<Coordinates>({ x: '0', y: '64', z: '0' });
  const [netherCoords, setNetherCoords] = useState<Coordinates>({ x: '0', y: '64', z: '0' });

  const handleOverworldChange = (axis: keyof Coordinates, value: string) => {
    setOverworldCoords(prev => ({ ...prev, [axis]: value }));
    
    if (axis === 'y') {
      setNetherCoords(prev => ({ ...prev, [axis]: value }));
    } else {
      const numValue = value === '' ? '0' : value;
      setNetherCoords(prev => ({
        ...prev,
        [axis]: (Number(numValue) / 8).toString()
      }));
    }
  };

  const handleNetherChange = (axis: keyof Coordinates, value: string) => {
    setNetherCoords(prev => ({ ...prev, [axis]: value }));
    
    if (axis === 'y') {
      setOverworldCoords(prev => ({ ...prev, [axis]: value }));
    } else {
      const numValue = value === '' ? '0' : value;
      setOverworldCoords(prev => ({
        ...prev,
        [axis]: (Number(numValue) * 8).toString()
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 md:pt-0">
      <h1 className="text-3xl font-minecraft mb-8 text-center">
        Nether Portal Calculator
      </h1>

      <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <CoordinateSection
            title="Overworld"
            subtitle="1:8 ratio"
            coordinates={overworldCoords}
            onCoordinateChange={handleOverworldChange}
            theme="emerald"
          />

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-accent-500" />
          </div>

          <CoordinateSection
            title="Nether"
            subtitle="8:1 ratio"
            coordinates={netherCoords}
            onCoordinateChange={handleNetherChange}
            theme="red"
          />
        </div>

        <TipsSection />
      </div>
    </div>
  );
}

export default NetherCalculator