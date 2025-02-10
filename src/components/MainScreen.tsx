import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Compass, Flame, User, Github, Shield, ArrowRight } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import { useTranslation } from '../lib/i18n';

function MainScreen() {
  const t = useTranslation();

  return (
    <div className="min-h-[80vh] py-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-minecraft mb-6 bg-gradient-to-r from-accent-400 to-accent-600 text-transparent bg-clip-text">
            {t.home.title}
          </h1>
          <p className="text-xl text-muted-100 dark:text-light-300 mb-8">
            {t.home.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/byteflipper-58/mc-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-500 hover:bg-accent-600 text-light-50 transition-colors font-minecraft"
            >
              <Github className="w-5 h-5" />
              {t.home.viewOnGithub}
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-light-200 dark:bg-dark-300 hover:bg-light-300 dark:hover:bg-dark-400 text-dark-200 dark:text-light-100 transition-colors font-minecraft"
            >
              <Shield className="w-5 h-5" />
              {t.common.about}
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            to="/server-status"
            icon={<Server className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title={t.nav.serverStatus}
            description={t.server.title}
          />

          <FeatureCard
            to="/stronghold-finder"
            icon={<Compass className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title={t.nav.strongholdFinder}
            description={t.nav.strongholdFinder}
          />

          <FeatureCard
            to="/nether-calculator"
            icon={<Flame className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title={t.nav.netherCalculator}
            description={t.nav.netherCalculator}
          />

          <FeatureCard
            to="/player-info"
            icon={<User className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title={t.nav.playerInfo}
            description={t.nav.playerInfo}
          />
        </div>
      </div>

      {/* Features List */}
      <div className="bg-light-200 dark:bg-dark-300 py-16 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">{t.home.features.realtime}</div>
                  <div className="text-muted-100 dark:text-light-300">{t.home.features.realtimeDesc}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">{t.home.features.accurate}</div>
                  <div className="text-muted-100 dark:text-light-300">{t.home.features.accurateDesc}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">{t.home.features.free}</div>
                  <div className="text-muted-100 dark:text-light-300">{t.home.features.freeDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-muted-100 dark:text-light-300">
          <Link 
            to="/privacy" 
            className="hover:text-accent-500 transition-colors flex items-center gap-1"
          >
            Privacy Policy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;