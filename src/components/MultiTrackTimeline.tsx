import React, { useMemo, useState } from 'react';
import { Calendar, Layers, MapPin } from 'lucide-react';
import {
  CHRONICLE_DATA,
  ERA_BY_ID,
  PLACE_BY_ID,
  THEME_META,
} from '../data';
import {
  Language,
  UI_STRINGS,
  formatYearLocalized,
  localizeChapter,
  localizeEra,
  localizePlace,
} from '../i18n';
import { EraId, ThemeCategory } from '../types/chronicle';

interface MultiTrackTimelineProps {
  lang: Language;
  selectedChapter: number;
  onSelectChapter: (chapterNum: number) => void;
  onOpenOnMap: (chapterNum: number) => void;
}

const ALL_THEMES: ThemeCategory[] = [
  'religion',
  'politics',
  'war',
  'architecture',
  'diplomacy',
  'myth-legend',
];

export const MultiTrackTimeline: React.FC<MultiTrackTimelineProps> = ({
  lang,
  selectedChapter,
  onSelectChapter,
  onOpenOnMap,
}) => {
  const ui = UI_STRINGS[lang];
  const [activeEra, setActiveEra] = useState<EraId | 'all'>('all');
  const [activeTheme, setActiveTheme] = useState<ThemeCategory | 'all'>('all');

  const localizedEras = useMemo(
    () => CHRONICLE_DATA.eras.map((e) => localizeEra(e, lang)),
    [lang]
  );

  const filteredChapters = useMemo(() => {
    return CHRONICLE_DATA.chapters
      .filter((ch) => {
        if (activeEra !== 'all' && ch.eraId !== activeEra) return false;
        if (activeTheme !== 'all' && !ch.themes.includes(activeTheme))
          return false;
        return true;
      })
      .map((ch) => localizeChapter(ch, lang));
  }, [activeEra, activeTheme, lang]);

  const maxVerses = useMemo(
    () => Math.max(...CHRONICLE_DATA.chapters.map((c) => c.verseCount)),
    []
  );

  return (
    <div className="timeline-page">
      <section className="era-grid">
        <button
          className={`era-card ${activeEra === 'all' ? 'active' : ''}`}
          onClick={() => setActiveEra('all')}
        >
          <div className="era-card-bar" style={{ backgroundColor: '#2c241e' }} />
          <div className="era-card-top">
            <span className="era-ch-badge">
              {ui.map.chapterPrefix} 1–37
            </span>
            <span className="year-mono">
              {formatYearLocalized(-588, lang)} – {formatYearLocalized(303, lang)}
            </span>
          </div>
          <h4>{ui.timeline.allSixEras}</h4>
          <p>{ui.timeline.allSixErasDesc}</p>
        </button>

        {localizedEras.map((era) => (
          <button
            key={era.id}
            className={`era-card ${activeEra === era.id ? 'active' : ''}`}
            onClick={() =>
              setActiveEra(activeEra === era.id ? 'all' : era.id)
            }
          >
            <div
              className="era-card-bar"
              style={{ backgroundColor: era.color }}
            />
            <div className="era-card-top">
              <span className="era-ch-badge">
                {ui.map.chapterPrefix} {era.chapterRange[0]}–{era.chapterRange[1]}
              </span>
              <span className="year-mono">
                {formatYearLocalized(era.yearRange[0], lang)} –{' '}
                {formatYearLocalized(era.yearRange[1], lang)}
              </span>
            </div>
            <h4>{era.name}</h4>
            <p>{era.description}</p>
          </button>
        ))}
      </section>

      <div className="track-filter-bar">
        <div className="track-filter-label">
          <Layers size={15} />
          <span>{ui.timeline.filterTrack}</span>
        </div>
        <button
          className={`track-pill ${activeTheme === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTheme('all')}
        >
          {ui.timeline.allTracks} ({CHRONICLE_DATA.chapters.length})
        </button>
        {ALL_THEMES.map((theme) => (
          <button
            key={theme}
            className={`track-pill ${activeTheme === theme ? 'active' : ''}`}
            style={
              activeTheme === theme
                ? {
                    backgroundColor: THEME_META[theme].color,
                    color: '#fff',
                    borderColor: THEME_META[theme].color,
                  }
                : undefined
            }
            onClick={() =>
              setActiveTheme(activeTheme === theme ? 'all' : theme)
            }
          >
            <span
              className="track-dot"
              style={{ backgroundColor: THEME_META[theme].color }}
            />
            {ui.themes[theme]}
          </button>
        ))}
      </div>

      <div className="timeline-table-wrap">
        <div className="timeline-header-row">
          <div>{ui.timeline.colChapter}</div>
          <div>{ui.timeline.colArc}</div>
          <div className="tracks-col-header">{ui.timeline.colTracks}</div>
          <div>{ui.timeline.colVerses}</div>
        </div>

        <div className="timeline-rows">
          {filteredChapters.map((ch) => {
            const era = ERA_BY_ID[ch.eraId];
            const rawPlace = PLACE_BY_ID[ch.primaryPlaceId];
            const primaryPlace = rawPlace ? localizePlace(rawPlace, lang) : null;
            const isSelected = ch.number === selectedChapter;
            const versePct = Math.max(8, (ch.verseCount / maxVerses) * 100);

            return (
              <div
                key={ch.number}
                className={`timeline-row ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectChapter(ch.number)}
              >
                <div className="tl-col-chapter">
                  <div className="tl-ch-top">
                    <span
                      className="chapter-num-badge"
                      style={{ backgroundColor: era.color }}
                    >
                      {ui.map.chapterPrefix} {ch.number}
                    </span>
                    <span className="year-mono">
                      <Calendar size={11} /> {ch.yearLabel}
                    </span>
                  </div>
                  <h4 className="tl-title">{ch.title}</h4>
                  <span className="pali-mini">{ch.paliTitle}</span>
                  {primaryPlace && (
                    <button
                      className="tl-place-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOnMap(ch.number);
                      }}
                    >
                      <MapPin size={11} /> {primaryPlace.ancientName}
                    </button>
                  )}
                </div>

                <div className="tl-col-arc">
                  <p className="tl-arc-text">{ch.narrativeArc}</p>
                  <div className="tl-event-pills">
                    {ch.events.map((ev) => (
                      <span key={ev.id} className="tl-event-pill">
                        <strong>{ev.yearLabel}:</strong> {ev.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tl-col-tracks">
                  {ALL_THEMES.map((theme) => {
                    const present = ch.themes.includes(theme);
                    return (
                      <span
                        key={theme}
                        title={ui.themes[theme]}
                        className={`track-cell ${present ? 'on' : 'off'}`}
                        style={
                          present
                            ? { backgroundColor: THEME_META[theme].color }
                            : undefined
                        }
                      />
                    );
                  })}
                </div>

                <div className="tl-col-verses">
                  <span className="year-mono">
                    {ch.verseCount} {ui.timeline.versesShort}
                  </span>
                  <div className="verse-bar-bg">
                    <div
                      className="verse-bar-fill"
                      style={{
                        width: `${versePct}%`,
                        backgroundColor: era.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
