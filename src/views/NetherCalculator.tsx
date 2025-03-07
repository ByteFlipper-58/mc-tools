import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { useTelegramBackButton } from '../lib/telegram';
import PageTitle from '../components/PageTitle';

interface Coordinates {
  x: string;
  z: string;
}

function NetherCalculator() {
  const [overworldCoords, setOverworldCoords] = useState<Coordinates>({ x: '0', z: '0' });
  const [netherCoords, setNetherCoords] = useState<Coordinates>({ x: '0', z: '0' });
  const t = useTranslation();
  
  useTelegramBackButton(true);

  const handleOverworldChange = (axis: keyof Coordinates, value: string) => {
    setOverworldCoords(prev => ({ ...prev, [axis]: value }));
    const numValue = value === '' ? '0' : value;
    setNetherCoords(prev => ({
      ...prev,
      [axis]: (Number(numValue) / 8).toString()
    }));
  };

  const handleNetherChange = (axis: keyof Coordinates, value: string) => {
    setNetherCoords(prev => ({ ...prev, [axis]: value }));
    const numValue = value === '' ? '0' : value;
    setOverworldCoords(prev => ({
      ...prev,
      [axis]: (Number(numValue) * 8).toString()
    }));
  };

  return (
    <div className="max-w-2xl mx-auto nether-page">
      <PageTitle>{t.nether.title}</PageTitle>

      <div className="bg-dark-300 p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overworld Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-minecraft mb-2 text-accent-500">
                {t.nether.overworld}
              </h2>
              <div className="text-sm text-light-300">
                {t.nether.overworldRatio}
              </div>
            </div>
            
            <div className="bg-dark-200 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm text-light-300 mb-1">{t.nether.coordinates.x}</label>
                <input
                  type="number"
                  value={overworldCoords.x}
                  onChange={(e) => handleOverworldChange('x', e.target.value)}
                  className="input-base text-center"
                  placeholder={t.nether.coordinates.enterX}
                />
              </div>
              <div>
                <label className="block text-sm text-light-300 mb-1">{t.nether.coordinates.z}</label>
                <input
                  type="number"
                  value={overworldCoords.z}
                  onChange={(e) => handleOverworldChange('z', e.target.value)}
                  className="input-base text-center"
                  placeholder={t.nether.coordinates.enterZ}
                />
              </div>
            </div>
          </div>

          {/* Nether Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-minecraft mb-2 text-red-400">
                {t.nether.nether}
              </h2>
              <div className="text-sm text-light-300">
                {t.nether.netherRatio}
              </div>
            </div>
            
            <div className="bg-dark-200 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm text-light-300 mb-1">{t.nether.coordinates.x}</label>
                <input
                  type="number"
                  value={netherCoords.x}
                  onChange={(e) => handleNetherChange('x', e.target.value)}
                  className="input-base text-center"
                  placeholder={t.nether.coordinates.enterX}
                />
              </div>
              <div>
                <label className="block text-sm text-light-300 mb-1">{t.nether.coordinates.z}</label>
                <input
                  type="number"
                  value={netherCoords.z}
                  onChange={(e) => handleNetherChange('z', e.target.value)}
                  className="input-base text-center"
                  placeholder={t.nether.coordinates.enterZ}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-4 bg-dark-200 rounded-lg">
          <h3 className="font-minecraft text-lg mb-3 text-light-100">{t.nether.tips.title}</h3>
          <ul className="space-y-2 text-light-300 text-sm">
            <li>• {t.nether.tips.tip1}</li>
            <li>• {t.nether.tips.tip2}</li>
            <li>• {t.nether.tips.tip3}</li>
            <li>• {t.nether.tips.tip4}</li>
            <li>• {t.nether.tips.tip5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NetherCalculator;