import React from 'react';
import { Compass } from 'lucide-react';
import CoordinateInput from './CoordinateInput';

interface CoordinateSectionProps {
  title: string;
  subtitle: string;
  coordinates: {
    x: string;
    y: string;
    z: string;
  };
  onCoordinateChange: (axis: 'x' | 'y' | 'z', value: string) => void;
  theme: 'emerald' | 'red';
}

function CoordinateSection({ 
  title, 
  subtitle, 
  coordinates, 
  onCoordinateChange,
  theme
}: CoordinateSectionProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className={`text-xl font-minecraft mb-2 ${theme === 'emerald' ? 'text-emerald-400' : 'text-red-400'}`}>
          {title}
        </h2>
        <div className="inline-flex items-center gap-2 text-gray-400">
          <Compass className="w-4 h-4" />
          <span className="text-sm">{subtitle}</span>
        </div>
      </div>
      
      <CoordinateInput
        label="X Coordinate"
        value={coordinates.x}
        onChange={(value) => onCoordinateChange('x', value)}
        placeholder="Enter X coordinate"
      />
      <CoordinateInput
        label="Y Coordinate"
        value={coordinates.y}
        onChange={(value) => onCoordinateChange('y', value)}
        placeholder="Enter Y coordinate"
      />
      <CoordinateInput
        label="Z Coordinate"
        value={coordinates.z}
        onChange={(value) => onCoordinateChange('z', value)}
        placeholder="Enter Z coordinate"
      />
    </div>
  );
}

export default CoordinateSection;