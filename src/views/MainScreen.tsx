import React from 'react';
import ToolsList from '../components/ui/ToolsList';
import { useTranslation } from '../lib/i18n';
import MCToolsLogo from '../components/ui/MCToolsLogo';

function MainScreen() {
  const t = useTranslation();

  return (
    <div className="min-h-[80vh]">
      {/* Tools List */}
      <div className="mb-8">
        <h2 className="text-xl font-minecraft mb-4 text-light-100">
          {t.common.tools}
        </h2>
        <ToolsList />
      </div>

      {/* Features List */}
      <div className="bg-dark-300 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-minecraft mb-4 text-light-100">
          {t.home.features.realtime}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="text-lg font-minecraft text-accent-500 mb-2">{t.home.features.realtime}</div>
            <div className="text-sm text-light-300">{t.home.features.realtimeDesc}</div>
          </div>
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="text-lg font-minecraft text-accent-500 mb-2">{t.home.features.accurate}</div>
            <div className="text-sm text-light-300">{t.home.features.accurateDesc}</div>
          </div>
          <div className="bg-dark-200 p-4 rounded-lg">
            <div className="text-lg font-minecraft text-accent-500 mb-2">{t.home.features.free}</div>
            <div className="text-sm text-light-300">{t.home.features.freeDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;