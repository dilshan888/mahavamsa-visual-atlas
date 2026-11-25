import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Landmark,
  MapPin,
  Quote,
  Search,
  Users,
} from 'lucide-react';
import {
  CHAPTER_BY_NUM,
  CHARACTER_BY_ID,
  CHRONICLE_DATA,
  ERA_BY_ID,
  MONUMENT_BY_ID,
  PLACE_BY_ID,
  THEME_META,
} from '../data';
import {
  Language,
  UI_STRINGS,
  localizeChapter,
  localizeCharacter,
  localizeEra,
  localizeMonument,
  localizePlace,
} from '../i18n';

interface ChapterExplorerProps {
  lang: Language;
  selectedChapter: number;
  onSelectChapter: (chapterNum: number) => void;
  onJumpToMap: (chapterNum: number) => void;
  onJumpToGraph: () => void;
}

export const ChapterExplorer: React.FC<ChapterExplorerProps> = ({
  lang,
  selectedChapter,
  onSelectChapter,
  onJumpToMap,
  onJumpToGraph,
}) => {
  const ui = UI_STRINGS[lang];
  const [search, setSearch] = useState('');

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = CHRONICLE_DATA.chapters.map((c) => ({
      raw: c,
      loc: localizeChapter(c, lang),
    }));
    if (!q) return list.map((x) => x.loc);
    return list
      .filter(
        ({ raw, loc }) =>
          loc.title.toLowerCase().includes(q) ||
          raw.title.toLowerCase().includes(q) ||
          raw.paliTitle.toLowerCase().includes(q) ||
          loc.summary.toLowerCase().includes(q) ||
          String(raw.number) === q
      )
      .map((x) => x.loc);
  }, [search, lang]);

  const rawChapter =
    CHAPTER_BY_NUM[selectedChapter] || CHRONICLE_DATA.chapters[0];
  const chapter = useMemo(
    () => localizeChapter(rawChapter, lang),
    [rawChapter, lang]
  );
  const era = useMemo(
    () => localizeEra(ERA_BY_ID[chapter.eraId], lang),
    [chapter.eraId, lang]
  );

  const linkedPlaces = chapter.placeIds
    .map((id) => PLACE_BY_ID[id])
    .filter(Boolean)
    .map((p) => localizePlace(p, lang));
  const linkedChars = chapter.characterIds
    .map((id) => CHARACTER_BY_ID[id])
    .filter(Boolean)
    .map((c) => localizeCharacter(c, lang));
  const linkedMonuments = chapter.monumentIds
    .map((id) => MONUMENT_BY_ID[id])
    .filter(Boolean)
    .map((m) => localizeMonument(m, lang));

  return (
    <div className="reader-layout">
      <aside className="reader-sidebar">
        <div className="search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder={ui.reader.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="chapter-index-list">
          {filteredList.map((c) => {
            const cEra = ERA_BY_ID[c.eraId];
            const active = c.number === chapter.number;
            return (
              <button
                key={c.number}
                className={`chapter-index-item ${active ? 'active' : ''}`}
                onClick={() => onSelectChapter(c.number)}
              >
                <span
                  className="index-num"
                  style={{
                    backgroundColor: active ? cEra.color : '#efe8dc',
                    color: active ? '#fff' : '#4a3f35',
                  }}
                >
                  {c.number}
                </span>
                <div className="index-text">
                  <strong>{c.title}</strong>
                  <span>
                    {c.yearLabel} · {c.verseCount} {ui.reader.versesWord}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <article className="reader-content">
        <div className="reader-top-nav">
          <div className="chapter-pill-row">
            <span className="era-dot" style={{ backgroundColor: era.color }} />
            <span className="era-label">{era.name}</span>
            <span className="divider-dot">·</span>
            <span className="year-mono">{chapter.yearLabel}</span>
            <span className="divider-dot">·</span>
            <span className="year-mono">
              {chapter.verseCount} {ui.reader.versesWord}
            </span>
          </div>

          <div className="prev-next-group">
            <button
              className="secondary-btn"
              disabled={chapter.number <= 1}
              onClick={() => onSelectChapter(chapter.number - 1)}
            >
              <ChevronLeft size={15} /> {ui.reader.prev}
            </button>
            <button
              className="secondary-btn"
              disabled={chapter.number >= 37}
              onClick={() => onSelectChapter(chapter.number + 1)}
            >
              {ui.reader.next} <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <header className="reader-hero">
          <div className="reader-hero-kicker">
            <BookOpen size={15} /> {ui.reader.kicker} {chapter.number}{' '}
            {ui.reader.of37}
          </div>
          <h1 className="serif-hero">{chapter.title}</h1>
          <p className="pali-hero">{chapter.paliTitle}</p>

          <div className="theme-chips">
            {chapter.themes.map((t) => (
              <span
                key={t}
                className="theme-chip"
                style={{
                  color: THEME_META[t].color,
                  backgroundColor: THEME_META[t].bg,
                }}
              >
                {ui.themes[t]}
              </span>
            ))}
          </div>
        </header>

        <div className="reader-arc-banner" style={{ borderLeftColor: era.color }}>
          <strong>{ui.reader.narrativeSignificance}</strong>{' '}
          {chapter.narrativeArc}
        </div>

        <p className="reader-summary">{chapter.summary}</p>

        {chapter.keyQuote && (
          <blockquote className="chronicle-quote">
            <Quote size={18} />
            <p>“{chapter.keyQuote}”</p>
            <footer>
              — {ui.reader.quoteAttribution} {chapter.number}
            </footer>
          </blockquote>
        )}

        <section className="reader-section">
          <h3>
            {ui.reader.keyEventsTitle} {chapter.number}
          </h3>
          <div className="event-cards-grid">
            {chapter.events.map((ev) => (
              <div key={ev.id} className="event-card">
                <div className="event-card-top">
                  <span
                    className="theme-chip"
                    style={{
                      color: THEME_META[ev.category].color,
                      backgroundColor: THEME_META[ev.category].bg,
                    }}
                  >
                    {ui.themes[ev.category]}
                  </span>
                  <span className="year-mono">{ev.yearLabel}</span>
                </div>
                <h4>{ev.title}</h4>
                <p>{ev.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="reader-entities-grid">
          <section className="entity-box">
            <div className="entity-box-header">
              <div className="section-header">
                <MapPin size={15} />
                <h4>
                  {ui.reader.locationsTitle} ({linkedPlaces.length})
                </h4>
              </div>
              <button
                className="link-btn"
                onClick={() => onJumpToMap(chapter.number)}
              >
                <Compass size={13} /> {ui.reader.viewOnMap}
              </button>
            </div>
            <ul className="entity-list">
              {linkedPlaces.map((p) => (
                <li key={p.id}>
                  <strong>{p.ancientName}</strong>
                  <span>{p.modernName}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="entity-box">
            <div className="entity-box-header">
              <div className="section-header">
                <Users size={15} />
                <h4>
                  {ui.reader.keyFiguresTitle} ({linkedChars.length})
                </h4>
              </div>
              <button className="link-btn" onClick={onJumpToGraph}>
                {ui.reader.exploreLineage}
              </button>
            </div>
            {linkedChars.length > 0 ? (
              <ul className="entity-list">
                {linkedChars.map((c) => (
                  <li key={c.id}>
                    <strong>{c.name}</strong>
                    <span>{c.reignLabel || ui.roles[c.role]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted-note">{ui.reader.collectiveCouncilNote}</p>
            )}
          </section>

          {linkedMonuments.length > 0 && (
            <section className="entity-box full-span">
              <div className="section-header">
                <Landmark size={15} />
                <h4>
                  {ui.reader.monumentsTitle} ({linkedMonuments.length})
                </h4>
              </div>
              <div className="monument-cards-row">
                {linkedMonuments.map((m) => (
                  <div key={m.id} className="mini-monument-card">
                    <strong>{m.name}</strong>
                    <span>{m.yearLabel}</span>
                    <p>{m.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
};
