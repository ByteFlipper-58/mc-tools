import React from 'react';
import { useTranslation } from '../../lib/i18n';

function TipsSection() {
  const t = useTranslation();

  return (
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
  );
}

export default TipsSection;