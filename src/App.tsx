import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Download,
  GitBranch,
  Globe2,
  ListTree,
  ScrollText,
} from 'lucide-react';
import { CHRONICLE_DATA } from './data';
import { Language, UI_STRINGS } from './i18n';
import { GeoTimelineMap } from './components/GeoTimelineMap';
import { LineageGraph } from './components/LineageGraph';
import { MultiTrackTimeline } from './components/MultiTrackTimeline';
import { ChapterExplorer } from './components/ChapterExplorer';

type ActiveTab = 'map' | 'timeline' | 'graph' | 'chapters';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem('mahavamsa-lang');
      return saved === 'si' ? 'si' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('mahavamsa-lang', lang);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const ui = UI_STRINGS[lang];

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(CHRONICLE_DATA, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mahavamsa-37-chapters-dataset.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell" data-lang={lang}>
      <header className="top-header">
        <div className="brand-block">
          <div className="brand-emblem">
            <ScrollText size={20} />
          </div>
          <div>
            <h1 className="brand-title">{ui.appTitle}</h1>
            <p className="brand-subtitle">{ui.appSubtitle}</p>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary Views">
          <button
            className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Globe2 size={16} />
            <span>{ui.tabs.map}</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <ListTree size={16} />
            <span>{ui.tabs.timeline}</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('graph')}
          >
            <GitBranch size={16} />
            <span>{ui.tabs.graph}</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'chapters' ? 'active' : ''}`}
            onClick={() => setActiveTab('chapters')}
          >
            <BookOpen size={16} />
            <span>{ui.tabs.chapters}</span>
          </button>
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={lang === 'si' ? 'active' : ''}
              onClick={() => setLang('si')}
            >
              සිංහල
            </button>
          </div>

          <div className="stat-pill">
            <strong>{CHRONICLE_DATA.chapters.length}</strong> {ui.stats.chapters} ·{' '}
            <strong>{CHRONICLE_DATA.places.length}</strong> {ui.stats.sites} ·{' '}
            <strong>{CHRONICLE_DATA.characters.length}</strong> {ui.stats.figures}
          </div>

          <button
            className="secondary-btn"
            onClick={handleExportJson}
            title="Download full structured JSON dataset"
          >
            <Download size={14} />
            <span>{ui.exportJson}</span>
          </button>
        </div>
      </header>

      <main className="main-stage">
        {activeTab === 'map' && (
          <GeoTimelineMap
            lang={lang}
            selectedChapter={selectedChapter}
            onSelectChapter={setSelectedChapter}
            onOpenChapterDetail={(ch) => {
              setSelectedChapter(ch);
              setActiveTab('chapters');
            }}
          />
        )}

        {activeTab === 'timeline' && (
          <MultiTrackTimeline
            lang={lang}
            selectedChapter={selectedChapter}
            onSelectChapter={(ch) => {
              setSelectedChapter(ch);
              setActiveTab('chapters');
            }}
            onOpenOnMap={(ch) => {
              setSelectedChapter(ch);
              setActiveTab('map');
            }}
          />
        )}

        {activeTab === 'graph' && (
          <LineageGraph
            lang={lang}
            onSelectChapter={(ch) => {
              setSelectedChapter(ch);
              setActiveTab('chapters');
            }}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterExplorer
            lang={lang}
            selectedChapter={selectedChapter}
            onSelectChapter={setSelectedChapter}
            onJumpToMap={(ch) => {
              setSelectedChapter(ch);
              setActiveTab('map');
            }}
            onJumpToGraph={() => setActiveTab('graph')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
