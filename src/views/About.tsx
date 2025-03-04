import { Github, Heart, Code2, Coffee, Globe, Database, Shield, Zap, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export function About() {
  const t = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-dark-300 rounded-2xl p-8 mb-8 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20" />
        <div className="relative text-center">
          <h1 className="text-3xl md:text-4xl font-minecraft mb-4 text-accent-500">
            MC Tools
          </h1>
          <p className="text-lg text-light-100 max-w-3xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Project Description */}
        <div className="bg-dark-300 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl font-minecraft text-accent-500">{t.about.projectDescription}</h2>
          </div>
          <div className="space-y-4 text-light-100 text-sm">
            <p>{t.about.projectDescriptionText1}</p>
            <p>{t.about.projectDescriptionText2}</p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-dark-300 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl font-minecraft text-accent-500">{t.about.technologyStack}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-dark-200 p-3 rounded-lg">
              <Zap className="w-5 h-5 text-accent-500" />
              <span className="text-light-100 text-sm">React + TypeScript</span>
            </div>
            <div className="flex items-center gap-3 bg-dark-200 p-3 rounded-lg">
              <Shield className="w-5 h-5 text-accent-500" />
              <span className="text-light-100 text-sm">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3 bg-dark-200 p-3 rounded-lg">
              <Database className="w-5 h-5 text-accent-500" />
              <span className="text-light-100 text-sm">Firebase Analytics</span>
            </div>
            <div className="flex items-center gap-3 bg-dark-200 p-3 rounded-lg">
              <Code2 className="w-5 h-5 text-accent-500" />
              <span className="text-light-100 text-sm">Vite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer & Support */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Developer Info */}
        <div className="bg-dark-300 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-minecraft text-accent-500 mb-4">{t.about.developer}</h2>
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-lg font-minecraft text-light-100">ByteFlipper</h3>
              <p className="text-light-200 text-sm mb-4">{t.about.developerRole}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://byteflipper.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-light-200 hover:text-accent-500 transition-colors text-sm"
                >
                  <Globe className="w-4 h-4" />
                  byteflipper.web.app
                </a>
                <a
                  href="https://t.me/byteflipper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-light-200 hover:text-accent-500 transition-colors text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  {t.about.telegramChannel}
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/byteflipper-58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-light-200 hover:text-accent-500 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-light-200 hover:text-accent-500 transition-colors text-sm"
              >
                <Code2 className="w-4 h-4" />
                {t.about.sourceCode}
              </a>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-dark-300 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-minecraft text-accent-500">{t.about.supportProject}</h2>
          </div>
          <div className="text-center">
            <p className="text-light-100 mb-6 text-sm">
              {t.about.supportText}
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-light-200 hover:text-accent-500 transition-colors group text-sm"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {t.about.starOnGithub}
              </a>
              <a
                href="https://ko-fi.com/byteflipper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-light-200 hover:text-accent-500 transition-colors group text-sm"
              >
                <Coffee className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {t.about.buyMeACoffee}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Credits */}
      <div className="bg-dark-300 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-minecraft text-accent-500 mb-4">{t.about.apiCredits}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-dark-200 p-4 rounded-lg">
            <h3 className="font-minecraft mb-2 text-light-100">Ashcon API</h3>
            <p className="text-light-200 text-sm mb-3">{t.about.playerData}</p>
            <a
              href="https://github.com/Electroid/mojang-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-xs"
            >
              {t.about.viewDocs} →
            </a>
          </div>
          <div className="bg-dark-200 p-4 rounded-lg">
            <h3 className="font-minecraft mb-2 text-light-100">Mineatar API</h3>
            <p className="text-light-200 text-sm mb-3">{t.about.skinRendering}</p>
            <a
              href="https://github.com/mineatar/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-xs"
            >
              {t.about.viewDocs} →
            </a>
          </div>
          <div className="bg-dark-200 p-4 rounded-lg">
            <h3 className="font-minecraft mb-2 text-light-100">MCStatus API</h3>
            <p className="text-light-200 text-sm mb-3">{t.about.serverStatus}</p>
            <a
              href="https://api.mcstatus.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors text-xs"
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