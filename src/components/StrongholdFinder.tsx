import React, { useState } from 'react';
import { Compass, Save, Trash2, X, Edit2 } from 'lucide-react';

interface ThrowPoint {
  x: number;
  z: number;
  angle: number;
}

interface SavedLocation {
  name: string;
  x: number;
  z: number;
}

function StrongholdFinder() {
  const [throws, setThrows] = useState<ThrowPoint[]>([]);
  const [newThrow, setNewThrow] = useState<ThrowPoint>({
    x: 0,
    z: 0,
    angle: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [angleError, setAngleError] = useState('');
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [locationName, setLocationName] = useState('');

  const handleInputChange = (field: keyof ThrowPoint, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    
    if (field === 'angle') {
      if (numValue < -160 || numValue > 160) {
        setAngleError('Angle must be between -160 and 160 degrees');
      } else {
        setAngleError('');
      }
    }

    if (editingIndex !== null) {
      setThrows(prev => prev.map((t, i) => 
        i === editingIndex ? { ...t, [field]: numValue } : t
      ));
    } else {
      setNewThrow(prev => ({
        ...prev,
        [field]: numValue
      }));
    }
  };

  const addThrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (angleError) return;
    
    if (editingIndex !== null) {
      setEditingIndex(null);
    } else {
      setThrows([...throws, newThrow]);
    }
    setNewThrow({ x: 0, z: 0, angle: 0 });
    setAngleError('');
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setNewThrow(throws[index]);
  };

  const deleteThrow = (index: number) => {
    setThrows(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewThrow({ x: 0, z: 0, angle: 0 });
    }
  };

  const clearCalculation = () => {
    setThrows([]);
    setNewThrow({ x: 0, z: 0, angle: 0 });
    setAngleError('');
    setEditingIndex(null);
  };

  const calculateStronghold = () => {
    if (throws.length >= 2) {
      const throw1 = throws[0];
      const throw2 = throws[1];

      // Convert angles to radians and adjust for Minecraft's coordinate system
      const angle1 = (throw1.angle - 90) * (Math.PI / 180);
      const angle2 = (throw2.angle - 90) * (Math.PI / 180);

      // Calculate direction vectors
      const dx1 = Math.cos(angle1);
      const dz1 = Math.sin(angle1);
      const dx2 = Math.cos(angle2);
      const dz2 = Math.sin(angle2);

      // Calculate the intersection point
      const denominator = dx1 * dz2 - dx2 * dz1;
      
      if (Math.abs(denominator) < 0.000001) {
        return null; // Lines are parallel
      }

      const t1 = ((throw2.x - throw1.x) * dz2 - (throw2.z - throw1.z) * dx2) / denominator;

      const x = Math.round(throw1.x + dx1 * t1);
      const z = Math.round(throw1.z + dz1 * t1);

      return { x, z };
    }
    return null;
  };

  const strongholdLocation = calculateStronghold();

  const saveLocation = () => {
    if (strongholdLocation && locationName.trim()) {
      setSavedLocations([
        ...savedLocations,
        {
          name: locationName.trim(),
          x: strongholdLocation.x,
          z: strongholdLocation.z
        }
      ]);
      setLocationName('');
    }
  };

  const deleteLocation = (index: number) => {
    setSavedLocations(savedLocations.filter((_, i) => i !== index));
  };

  const getCurrentThrow = () => {
    return editingIndex !== null ? throws[editingIndex] : newThrow;
  };

  const currentThrow = getCurrentThrow();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-minecraft mb-8 text-center">
        Stronghold Finder
      </h1>

      <form onSubmit={addThrow} className="bg-[#2C2F33] p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">X Coordinate</label>
            <input
              type="number"
              value={currentThrow.x || ''}
              onChange={(e) => handleInputChange('x', e.target.value)}
              className="w-full bg-[#1A1C1E] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Z Coordinate</label>
            <input
              type="number"
              value={currentThrow.z || ''}
              onChange={(e) => handleInputChange('z', e.target.value)}
              className="w-full bg-[#1A1C1E] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Angle (degrees)</label>
            <input
              type="number"
              value={currentThrow.angle || ''}
              onChange={(e) => handleInputChange('angle', e.target.value)}
              min="-160"
              max="160"
              className={`w-full bg-[#1A1C1E] border ${angleError ? 'border-red-500' : 'border-gray-700'} rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400`}
            />
            {angleError && (
              <p className="text-red-500 text-sm mt-1">{angleError}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!!angleError}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-minecraft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingIndex !== null ? 'Update Throw' : 'Add Throw'}
          </button>
          <button
            type="button"
            onClick={clearCalculation}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-minecraft transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </form>

      {throws.length > 0 && (
        <div className="bg-[#2C2F33] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-minecraft mb-4">Recorded Throws</h2>
          <div className="space-y-4">
            {throws.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-[#1A1C1E] p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-gray-400">Throw {i + 1}:</span>{' '}
                    X: {t.x}, Z: {t.z}, Angle: {t.angle}°
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditing(i)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="Edit throw"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteThrow(i)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Delete throw"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {strongholdLocation && (
        <div className="bg-[#2C2F33] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-minecraft mb-4">Estimated Stronghold Location</h2>
          <div className="text-center mb-4">
            <div className="text-2xl font-minecraft text-emerald-400">
              X: {strongholdLocation.x}, Z: {strongholdLocation.z}
            </div>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Enter location name"
              className="flex-1 bg-[#1A1C1E] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={saveLocation}
              disabled={!locationName.trim()}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-minecraft transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      )}

      {savedLocations.length > 0 && (
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4">Saved Locations</h2>
          <div className="space-y-4">
            {savedLocations.map((location, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-[#1A1C1E] p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="font-minecraft text-emerald-400">{location.name}</span>
                    <div className="text-gray-400">
                      X: {location.x}, Z: {location.z}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteLocation(i)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StrongholdFinder;