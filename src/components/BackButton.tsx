import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import { useTelegramWebApp } from '../lib/telegram';

interface BackButtonProps {
  className?: string;
}

function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const t = useTranslation();
  const webApp = useTelegramWebApp();

  // Don't show back button if we're in Telegram since we use Telegram's native back button
  if (webApp) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className={`text-light-300 hover:text-accent-500 transition-colors ${className}`}
      aria-label={t.common.back}
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}

export default BackButton;