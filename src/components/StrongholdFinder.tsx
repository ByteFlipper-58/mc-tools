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

      const angle1 = (throw1.angle - 90) * (Math.PI / 180);
      const angle2 = (throw2.angle - 90) * (Math.PI / 180);

      const dx1 = Math.cos(angle1);
      const dz1 = Math.sin(angle1);
      const dx2 = Math.cos(angle2);
      const dz2 = Math.sin(angle2);

      const denominator = dx1 * dz2 - dx2 * dz1;
      
      if (Math.abs(denominator) < 0.000001) {
        return null;
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
      <h1 className="text-3xl font-minecraft mb-8 text-center text-dark-200 dark:text-light-100">
        Stronghold Finder
      </h1>

      <form onSubmit={addThrow} className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-muted-100 dark:text-light-300 mb-1">X Coordinate</label>
            <input
              type="number"
              value={currentThrow.x || ''}
              onChange={(e) => handleInputChange('x', e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-100 dark:text-light-300 mb-1">Z Coordinate</label>
            <input
              type="number"
              value={currentThrow.z || ''}
              onChange={(e) => handleInputChange('z', e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-100 dark:text-light-300 mb-1">Angle (degrees)</label>
            <input
              type="number"
              value={currentThrow.angle || ''}
              onChange={(e) => handleInputChange('angle', e.target.value)}
              min="-160"
              max="160"
              className={`input-base ${angleError ? 'border-red-500' : ''}`}
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
            className="button-primary flex-1"
          >
            {editingIndex !== null ? 'Update Throw' : 'Add Throw'}
          </button>
          <button
            type="button"
            onClick={clearCalculation}
            className="button-danger flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </form>

      {throws.length > 0 && (
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-dark-200 dark:text-light-100">Recorded Throws</h2>
          <div className="space-y-4">
            {throws.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-light-100 dark:bg-dark-200 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-accent-500" />
                  <div className="text-dark-200 dark:text-light-100">
                    <span className="text-muted-100 dark:text-light-300">Throw {i + 1}:</span>{' '}
                    X: {t.x}, Z: {t.z}, Angle: {t.angle}°
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditing(i)}
                    className="text-accent-500 hover:text-accent-600 transition-colors p-1"
                    title="Edit throw"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteThrow(i)}
                    className="text-red-400 hover:text-red-500 transition-colors p-1"
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
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-dark-200 dark:text-light-100">Estimated Stronghold Location</h2>
          <div className="text-center mb-4">
            <div className="text-2xl font-minecraft text-accent-500">
              X: {strongholdLocation.x}, Z: {strongholdLocation.z}
            </div>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Enter location name"
              className="input-base flex-1"
            />
            <button
              onClick={saveLocation}
              disabled={!locationName.trim()}
              className="button-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      )}

      {savedLocations.length > 0 && (
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-dark-200 dark:text-light-100">Saved Locations</h2>
          <div className="space-y-4">
            {savedLocations.map((location, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-light-100 dark:bg-dark-200 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-accent-500" />
                  <div>
                    <span className="font-minecraft text-accent-500">{location.name}</span>
                    <div className="text-muted-100 dark:text-light-300">
                      X: {location.x}, Z: {location.z}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteLocation(i)}
                  className="text-red-400 hover:text-red-500 transition-colors"
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