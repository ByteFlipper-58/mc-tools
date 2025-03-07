import React, { useState, useEffect } from 'react';
import { Compass, Save, Trash2, X, Edit2, Plus, HelpCircle } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { useTelegramBackButton } from '../lib/telegram';

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
  const t = useTranslation();
  
  useTelegramBackButton(true);

  useEffect(() => {
    const savedData = localStorage.getItem('strongholdLocations');
    if (savedData) {
      try {
        setSavedLocations(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved locations:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('strongholdLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleInputChange = (field: keyof ThrowPoint, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    
    if (field === 'angle') {
      if (numValue < -160 || numValue > 160) {
        setAngleError(t.stronghold.throw.angleError);
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
    <div className="max-w-2xl mx-auto pb-24 md:pb-8">
      <h1 className="text-2xl font-minecraft mb-6 text-light-100">
        {t.stronghold.title}
      </h1>

      <form onSubmit={addThrow} className="bg-dark-300 p-6 rounded-lg mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-light-300 mb-1">{t.stronghold.coordinates.x}</label>
            <input
              type="number"
              value={currentThrow.x || ''}
              onChange={(e) => handleInputChange('x', e.target.value)}
              placeholder={t.stronghold.coordinates.enterX}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm text-light-300 mb-1">{t.stronghold.coordinates.z}</label>
            <input
              type="number"
              value={currentThrow.z || ''}
              onChange={(e) => handleInputChange('z', e.target.value)}
              placeholder={t.stronghold.coordinates.enterZ}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm text-light-300 mb-1">{t.stronghold.throw.angle}</label>
            <input
              type="number"
              value={currentThrow.angle || ''}
              onChange={(e) => handleInputChange('angle', e.target.value)}
              min="-160"
              max="160"
              placeholder={t.stronghold.throw.angle}
              className={`input-base ${angleError ? 'border-red-500' : ''}`}
            />
            {angleError && (
              <p className="text-red-500 text-sm mt-1">{angleError}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {/* Desktop view */}
          <div className="hidden md:flex gap-2">
            <button
              type="submit"
              disabled={!!angleError}
              className="button-primary flex items-center gap-2 px-4"
            >
              <Plus className="w-5 h-5" />
              <span>{editingIndex !== null ? t.common.update : t.common.add}</span>
            </button>
            <button
              type="button"
              onClick={clearCalculation}
              className="button-danger flex items-center gap-2 px-4"
            >
              <Trash2 className="w-5 h-5" />
              <span>{t.common.clear}</span>
            </button>
            <button
              type="button"
              className="button-secondary flex items-center gap-2 px-4"
            >
              <HelpCircle className="w-5 h-5" />
              <span>{t.common.guide}</span>
            </button>
          </div>

          {/* Mobile view */}
          <div className="flex md:hidden gap-2">
            <button
              type="submit"
              disabled={!!angleError}
              className="button-primary w-12 h-12 flex flex-col items-center justify-center"
              title={editingIndex !== null ? t.common.update : t.common.add}
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{t.common.add}</span>
            </button>
            <button
              type="button"
              onClick={clearCalculation}
              className="button-danger w-12 h-12 flex flex-col items-center justify-center"
              title={t.common.clear}
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{t.common.clear}</span>
            </button>
            <button
              type="button"
              className="button-secondary w-12 h-12 flex flex-col items-center justify-center"
              title={t.common.guide}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{t.common.guide}</span>
            </button>
          </div>
        </div>
      </form>

      {strongholdLocation && (
        <div className="bg-dark-300 p-6 rounded-lg mb-6 shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-light-100">{t.stronghold.location.title}</h2>
          <div className="text-center mb-4">
            <div className="text-2xl font-minecraft text-accent-500">
              X: {strongholdLocation.x}, Z: {strongholdLocation.z}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder={t.stronghold.location.enterName}
              className="input-base w-full"
            />
            <button
              onClick={saveLocation}
              disabled={!locationName.trim()}
              className="button-primary w-full md:w-auto flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t.stronghold.location.save}
            </button>
          </div>
        </div>
      )}

      {throws.length > 0 && (
        <div className="bg-dark-300 p-6 rounded-lg mb-6 shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-light-100">{t.stronghold.recorded.title}</h2>
          <div className="space-y-4">
            {throws.map((throwPoint, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-dark-200 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-accent-500" />
                  <div className="text-light-100">
                    <span className="text-light-300">
                      {t.stronghold.throw.title.replace('{number}', String(i + 1))}:
                    </span>{' '}
                    X: {throwPoint.x}, Z: {throwPoint.z}, {t.common.angle}: {throwPoint.angle}°
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditing(i)}
                    className="text-accent-500 hover:text-accent-600 transition-colors p-1"
                    title={t.stronghold.recorded.edit}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteThrow(i)}
                    className="text-red-400 hover:text-red-500 transition-colors p-1"
                    title={t.stronghold.recorded.delete}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedLocations.length > 0 && (
        <div className="bg-dark-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-light-100">{t.stronghold.saved.title}</h2>
          <div className="space-y-4">
            {savedLocations.map((location, i) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-dark-200 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <Compass className="w-5 h-5 text-accent-500" />
                  <div>
                    <span className="font-minecraft text-accent-500">{location.name}</span>
                    <div className="text-light-300">
                      X: {location.x}, Z: {location.z}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteLocation(i)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                  title={t.stronghold.saved.delete}
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