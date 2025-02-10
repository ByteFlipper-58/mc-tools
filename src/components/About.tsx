import React from 'react';
import { Github, Heart, Code2, Coffee, Globe, Database, Shield, Zap, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

function About() {
  const t = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 md:pt-0">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-light-200 dark:bg-dark-300 rounded-2xl p-12 mb-12 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20" />
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-minecraft mb-6 text-accent-500">
            MC Tools
          </h1>
          <p className="text-xl text-dark-200 dark:text-light-100 max-w-3xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Project Description */}
        <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-accent-500" />
            <h2 className="text-2xl font-minecraft text-accent-500">{t.about.projectDescription}</h2>
          </div>
          <div className="space-y-4 text-dark-200 dark:text-light-100">
            <p>{t.about.projectDescriptionText1}</p>
            <p>{t.about.projectDescriptionText2}</p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-8 h-8 text-accent-500" />
            <h2 className="text-2xl font-minecraft text-accent-500">{t.about.technologyStack}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-light-100 dark:bg-dark-200 p-4 rounded-lg">
              <Zap className="w-5 h-5 text-accent-500" />
              <span className="text-dark-200 dark:text-light-100">React + TypeScript</span>
            </div>
            <div className="flex items-center gap-3 bg-light-100 dark:bg-dark-200 p-4 rounded-lg">
              <Shield className="w-5 h-5 text-accent-500" />
              <span className="text-dark-200 dark:text-light-100">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3 bg-light-100 dark:bg-dark-200 p-4 rounded-lg">
              <Database className="w-5 h-5 text-accent-500" />
              <span className="text-dark-200 dark:text-light-100">Firebase Analytics</span>
            </div>
            <div className="flex items-center gap-3 bg-light-100 dark:bg-dark-200 p-4 rounded-lg">
              <Code2 className="w-5 h-5 text-accent-500" />
              <span className="text-dark-200 dark:text-light-100">Vite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl mb-12 shadow-sm">
        <h2 className="text-2xl font-minecraft text-accent-500 mb-6">{t.common.tools}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: t.nav.serverStatus,
              description: t.server.title,
            },
            {
              title: t.nav.strongholdFinder,
              description: t.nav.strongholdFinder,
            },
            {
              title: t.nav.netherCalculator,
              description: t.nav.netherCalculator,
            },
            {
              title: t.nav.playerInfo,
              description: t.nav.playerInfo,
            },
          ].map((feature, index) => (
            <div key={index} className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg">
              <h3 className="text-xl font-minecraft mb-3 text-dark-300 dark:text-light-100">{feature.title}</h3>
              <p className="text-dark-100 dark:text-light-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Developer & Support */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Developer Info */}
        <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-minecraft text-accent-500 mb-6">{t.about.developer}</h2>
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-minecraft text-dark-300 dark:text-light-100">ByteFlipper</h3>
              <p className="text-dark-100 dark:text-light-200 mb-4">{t.about.developerRole}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://byteflipper.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  byteflipper.web.app
                </a>
                <a
                  href="https://t.me/byteflipper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors"
                >
                  <LinkIcon className="w-5 h-5" />
                  {t.about.telegramChannel}
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/byteflipper-58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors"
              >
                <Code2 className="w-5 h-5" />
                {t.about.sourceCode}
              </a>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-minecraft text-accent-500">{t.about.supportProject}</h2>
          </div>
          <div className="text-center">
            <p className="text-dark-200 dark:text-light-100 mb-6">
              {t.about.supportText}
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t.about.starOnGithub}
              </a>
              <a
                href="https://ko-fi.com/byteflipper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-100 dark:text-light-200 hover:text-accent-500 transition-colors group"
              >
                <Coffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t.about.buyMeACoffee}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Credits */}
      <div className="bg-light-200 dark:bg-dark-300 p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-minecraft text-accent-500 mb-6">{t.about.apiCredits}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg">
            <h3 className="font-minecraft mb-3 text-dark-300 dark:text-light-100">Ashcon API</h3>
            <p className="text-dark-100 dark:text-light-200 mb-4">{t.about.playerData}</p>
            <a
              href="https://github.com/Electroid/mojang-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-sm"
            >
              {t.about.viewDocs} →
            </a>
          </div>
          <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg">
            <h3 className="font-minecraft mb-3 text-dark-300 dark:text-light-100">Mineatar API</h3>
            <p className="text-dark-100 dark:text-light-200 mb-4">{t.about.skinRendering}</p>
            <a
              href="https://github.com/mineatar/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-sm"
            >
              {t.about.viewDocs} →
            </a>
          </div>
          <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg">
            <h3 className="font-minecraft mb-3 text-dark-300 dark:text-light-100">MCStatus API</h3>
            <p className="text-dark-100 dark:text-light-200 mb-4">{t.about.serverStatus}</p>
            <a
              href="https://api.mcstatus.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-sm"
            >
              {t.about.viewDocs} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;