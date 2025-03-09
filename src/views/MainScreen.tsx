import ToolsList from '../components/ui/ToolsList';
import { useTranslation } from '../lib/i18n';
import { useTelegramBackButton } from '../lib/telegram';

function MainScreen() {
  const t = useTranslation();

  useTelegramBackButton(false);

  return (
    <div className="min-h-[80vh]">
      {/* Tools List */}
      <div className="mb-8">
        <h2 className="text-xl font-minecraft mb-4 text-light-100">
          {t.common.tools}
        </h2>
        <ToolsList />
      </div>
    </div>
  );
}

export default MainScreen;