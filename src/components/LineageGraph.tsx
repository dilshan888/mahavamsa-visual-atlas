import React, { useMemo, useState } from 'react';
import {
  Crown,
  Landmark,
  Search,
  Sparkles,
  Swords,
  Users,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import {
  CHARACTER_BY_ID,
  CHRONICLE_DATA,
  ERA_BY_ID,
  PLACE_BY_ID,
} from '../data';
import {
  Language,
  UI_STRINGS,
  localizeCharacter,
  localizeEra,
  localizeMonument,
  localizePlace,
} from '../i18n';
import {
  Character,
  CharacterRole,
  EraId,
  RelationType,
} from '../types/chronicle';

interface LineageGraphProps {
  lang: Language;
  onSelectChapter: (chapterNum: number) => void;
}

const ROLE_COLOR: Record<CharacterRole, { color: string; bg: string }> = {
  monarch: { color: '#9c3d28', bg: '#fdf2ef' },
  'buddha-monk': { color: '#1b6b57', bg: '#eef8f5' },
  'queen-consort': { color: '#8e3b68', bg: '#fbf0f6' },
  warrior: { color: '#b87a1e', bg: '#fdf7eb' },
  'foreign-ruler': { color: '#2b5978', bg: '#eff5fa' },
  'mythic-figure': { color: '#6b468c', bg: '#f5f0fa' },
};

const RELATION_COLOR: Record<RelationType, string> = {
  'parent-of': '#9c3d28',
  'succeeded-by': '#c98a1c',
  'spouse-of': '#b5497e',
  'sibling-of': '#7c6f64',
  'fought-against': '#c5283d',
  'allied-with': '#2b5978',
  'mentor-of': '#1b6b57',
  'sent-envoy-to': '#2e7d9b',
  'warrior-of': '#a86b15',
};

const COL_WIDTH = 280;
const ROW_HEIGHT = 82;
const PADDING_X = 60;
const PADDING_Y = 74;

export const LineageGraph: React.FC<LineageGraphProps> = ({
  lang,
  onSelectChapter,
}) => {
  const ui = UI_STRINGS[lang];
  const [selectedId, setSelectedId] = useState<string>('dutugamunu');
  const [eraFilter, setEraFilter] = useState<EraId | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<CharacterRole | 'all'>('all');
  const [search, setSearch] = useState<string>('');
  const [zoom, setZoom] = useState<number>(0.92);

  const localizedEras = useMemo(
    () => CHRONICLE_DATA.eras.map((e) => localizeEra(e, lang)),
    [lang]
  );

  const visibleCharacters = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CHRONICLE_DATA.characters
      .map((raw) => ({ raw, loc: localizeCharacter(raw, lang) }))
      .filter(({ raw, loc }) => {
        if (eraFilter !== 'all' && raw.eraId !== eraFilter) return false;
        if (roleFilter !== 'all' && raw.role !== roleFilter) return false;
        if (
          q &&
          !loc.name.toLowerCase().includes(q) &&
          !raw.name.toLowerCase().includes(q) &&
          !(loc.dynasty || '').toLowerCase().includes(q) &&
          !loc.summary.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .map(({ loc }) => loc);
  }, [eraFilter, roleFilter, search, lang]);

  const visibleIds = useMemo(
    () => new Set(visibleCharacters.map((c) => c.id)),
    [visibleCharacters]
  );

  const { nodePositions, eraColumns, svgWidth, svgHeight } = useMemo(() => {
    const activeEras = localizedEras.filter((era) =>
      visibleCharacters.some((c) => c.eraId === era.id)
    );
    const positions: Record<string, { x: number; y: number }> = {};
    let maxRows = 1;

    const cols = activeEras.map((era, colIdx) => {
      const members = visibleCharacters.filter((c) => c.eraId === era.id);
      if (members.length > maxRows) maxRows = members.length;
      const x = PADDING_X + colIdx * COL_WIDTH;
      members.forEach((m, rowIdx) => {
        positions[m.id] = {
          x,
          y: PADDING_Y + rowIdx * ROW_HEIGHT,
        };
      });
      return { era, x, count: members.length };
    });

    return {
      nodePositions: positions,
      eraColumns: cols,
      svgWidth: Math.max(920, PADDING_X * 2 + cols.length * COL_WIDTH),
      svgHeight: Math.max(620, PADDING_Y + maxRows * ROW_HEIGHT + 60),
    };
  }, [visibleCharacters, localizedEras]);

  const visibleRelations = useMemo(
    () =>
      CHRONICLE_DATA.relations.filter(
        (r) => visibleIds.has(r.source) && visibleIds.has(r.target)
      ),
    [visibleIds]
  );

  const connectedIds = useMemo(() => {
    const set = new Set<string>();
    if (!selectedId) return set;
    set.add(selectedId);
    visibleRelations.forEach((r) => {
      if (r.source === selectedId) set.add(r.target);
      if (r.target === selectedId) set.add(r.source);
    });
    return set;
  }, [selectedId, visibleRelations]);

  const selectedCharacter: Character | null = useMemo(() => {
    const raw = CHARACTER_BY_ID[selectedId];
    if (raw) return localizeCharacter(raw, lang);
    return visibleCharacters[0] || null;
  }, [selectedId, visibleCharacters, lang]);

  const selectedRelations = useMemo(() => {
    if (!selectedCharacter) return [];
    return CHRONICLE_DATA.relations.filter(
      (r) =>
        r.source === selectedCharacter.id || r.target === selectedCharacter.id
    );
  }, [selectedCharacter]);

  const patronizedMonuments = useMemo(() => {
    if (!selectedCharacter) return [];
    return CHRONICLE_DATA.monuments
      .filter((m) => m.patronId === selectedCharacter.id)
      .map((m) => localizeMonument(m, lang));
  }, [selectedCharacter, lang]);

  return (
    <div className="graph-layout">
      <div className="graph-toolbar">
        <div className="search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder={ui.graph.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={eraFilter}
          onChange={(e) => setEraFilter(e.target.value as EraId | 'all')}
          className="filter-select"
        >
          <option value="all">{ui.graph.allEras}</option>
          {localizedEras.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value as CharacterRole | 'all')
          }
          className="filter-select"
        >
          <option value="all">{ui.graph.allRoles}</option>
          {(Object.keys(ROLE_COLOR) as CharacterRole[]).map((role) => (
            <option key={role} value={role}>
              {ui.roles[role]}
            </option>
          ))}
        </select>

        <div className="zoom-controls">
          <button
            className="icon-btn"
            onClick={() => setZoom((z) => Math.max(0.55, +(z - 0.12).toFixed(2)))}
          >
            <ZoomOut size={15} />
          </button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <button
            className="icon-btn"
            onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.12).toFixed(2)))}
          >
            <ZoomIn size={15} />
          </button>
          <button
            className="icon-btn"
            onClick={() => {
              setZoom(0.92);
              setEraFilter('all');
              setRoleFilter('all');
              setSearch('');
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      <div className="graph-body">
        <div className="graph-canvas-scroll">
          <svg
            width={svgWidth * zoom}
            height={svgHeight * zoom}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="lineage-svg"
          >
            <defs>
              <marker
                id="arrow-muted"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#b8afa4" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#9c3d28" />
              </marker>
            </defs>

            {eraColumns.map((col, idx) => (
              <g key={col.era.id}>
                <rect
                  x={col.x - 18}
                  y={14}
                  width={COL_WIDTH - 24}
                  height={svgHeight - 28}
                  rx={12}
                  fill={idx % 2 === 0 ? '#f7f2e8' : '#f2ebe0'}
                  stroke="#e3d9c8"
                  strokeWidth={1}
                />
                <rect
                  x={col.x - 18}
                  y={14}
                  width={COL_WIDTH - 24}
                  height={4}
                  rx={2}
                  fill={col.era.color}
                />
                <text
                  x={col.x - 4}
                  y={38}
                  fontSize="11.2"
                  fontWeight="700"
                  fill="#2c241e"
                >
                  {col.era.name.length > 30
                    ? `${col.era.name.slice(0, 29)}…`
                    : col.era.name}
                </text>
                <text x={col.x - 4} y={53} fontSize="10" fill="#7c6f64">
                  {ui.map.chapterPrefix} {col.era.chapterRange[0]}–{col.era.chapterRange[1]}
                </text>
              </g>
            ))}

            {visibleRelations.map((rel) => {
              const src = nodePositions[rel.source];
              const tgt = nodePositions[rel.target];
              if (!src || !tgt) return null;

              const isHighlighted =
                rel.source === selectedId || rel.target === selectedId;
              const sameCol = Math.abs(src.x - tgt.x) < 10;

              const x1 = src.x + 216;
              const y1 = src.y + 26;
              const x2 = sameCol ? tgt.x + 216 : tgt.x;
              const y2 = tgt.y + 26;

              const d = sameCol
                ? `M ${x1} ${y1} C ${x1 + 42} ${y1}, ${x2 + 42} ${y2}, ${x2} ${y2}`
                : `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;

              const strokeColor = isHighlighted
                ? RELATION_COLOR[rel.type]
                : '#cfc5b7';

              return (
                <g key={rel.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 2.4 : 1.15}
                    strokeDasharray={
                      rel.type === 'fought-against'
                        ? '5 3'
                        : rel.type === 'sent-envoy-to'
                        ? '3 3'
                        : undefined
                    }
                    opacity={isHighlighted ? 0.95 : 0.48}
                    markerEnd={
                      isHighlighted ? 'url(#arrow-active)' : 'url(#arrow-muted)'
                    }
                  />
                </g>
              );
            })}

            {visibleCharacters.map((char) => {
              const pos = nodePositions[char.id];
              if (!pos) return null;
              const isSelected = char.id === selectedId;
              const isConnected = connectedIds.has(char.id);
              const meta = ROLE_COLOR[char.role];

              return (
                <g
                  key={char.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedId(char.id)}
                  style={{ cursor: 'pointer' }}
                  opacity={isConnected ? 1 : 0.42}
                >
                  <rect
                    width={216}
                    height={54}
                    rx={9}
                    fill={isSelected ? '#fffdf8' : meta.bg}
                    stroke={isSelected ? meta.color : '#d6cab8'}
                    strokeWidth={isSelected ? 2.6 : 1.2}
                  />
                  <rect width={5} height={54} rx={2.5} fill={meta.color} />
                  <text
                    x={14}
                    y={22}
                    fontSize="11.2"
                    fontWeight="700"
                    fill="#1f1914"
                  >
                    {char.name.length > 26
                      ? `${char.name.slice(0, 25)}…`
                      : char.name}
                  </text>
                  <text x={14} y={39} fontSize="9.6" fill="#6b5e52">
                    {char.reignLabel || ui.roles[char.role]}
                    {char.dynasty ? ` · ${char.dynasty}` : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {selectedCharacter && (
          <aside className="graph-dossier">
            <div className="dossier-role-row">
              <span
                className="role-pill"
                style={{
                  color: ROLE_COLOR[selectedCharacter.role].color,
                  backgroundColor: ROLE_COLOR[selectedCharacter.role].bg,
                }}
              >
                {selectedCharacter.role === 'monarch' && <Crown size={12} />}
                {selectedCharacter.role === 'warrior' && <Swords size={12} />}
                {selectedCharacter.role === 'buddha-monk' && (
                  <Sparkles size={12} />
                )}
                {ui.roles[selectedCharacter.role]}
              </span>
              {selectedCharacter.dynasty && (
                <span className="dynasty-pill">
                  {selectedCharacter.dynasty} {ui.graph.dynastySuffix}
                </span>
              )}
            </div>

            <h2 className="serif-title">{selectedCharacter.name}</h2>
            {selectedCharacter.reignLabel && (
              <div className="year-mono">{selectedCharacter.reignLabel}</div>
            )}

            <p className="body-text">{selectedCharacter.summary}</p>

            <div className="dossier-meta-grid">
              <div>
                <span className="mini-label">{ui.graph.eraLabel}</span>
                <strong>
                  {localizeEra(ERA_BY_ID[selectedCharacter.eraId], lang).name}
                </strong>
              </div>
              {selectedCharacter.primaryPlaceId && (
                <div>
                  <span className="mini-label">{ui.graph.primarySeat}</span>
                  <strong>
                    {
                      localizePlace(
                        PLACE_BY_ID[selectedCharacter.primaryPlaceId],
                        lang
                      ).ancientName
                    }
                  </strong>
                </div>
              )}
            </div>

            {selectedRelations.length > 0 && (
              <div className="dossier-section">
                <div className="section-header">
                  <Users size={14} />
                  <h4>
                    {ui.graph.linksTitle} ({selectedRelations.length})
                  </h4>
                </div>
                <div className="relation-list">
                  {selectedRelations.map((rel) => {
                    const isOutgoing = rel.source === selectedCharacter.id;
                    const otherId = isOutgoing ? rel.target : rel.source;
                    const otherRaw = CHARACTER_BY_ID[otherId];
                    if (!otherRaw) return null;
                    const other = localizeCharacter(otherRaw, lang);
                    const relLabel =
                      lang === 'si' ? ui.relations[rel.type] : rel.label;

                    return (
                      <button
                        key={rel.id}
                        className="relation-item"
                        onClick={() => setSelectedId(other.id)}
                      >
                        <span
                          className="rel-dot"
                          style={{ backgroundColor: RELATION_COLOR[rel.type] }}
                        />
                        <div className="rel-text">
                          <span className="rel-verb">
                            {isOutgoing ? relLabel : `← ${relLabel}`}
                          </span>
                          <strong>{other.name}</strong>
                        </div>
                        {rel.chapter && (
                          <span className="rel-ch">
                            {ui.map.chapterPrefix} {rel.chapter}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {patronizedMonuments.length > 0 && (
              <div className="dossier-section">
                <div className="section-header">
                  <Landmark size={14} />
                  <h4>{ui.graph.monumentsTitle}</h4>
                </div>
                {patronizedMonuments.map((m) => (
                  <div key={m.id} className="mini-monument-card">
                    <strong>{m.name}</strong>
                    <span>{m.yearLabel}</span>
                    <p>{m.significance}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="dossier-section">
              <div className="mini-label">{ui.graph.jumpToChapters}</div>
              <div className="chapter-chip-row">
                {selectedCharacter.chapters.map((ch) => (
                  <button
                    key={ch}
                    className="mini-ch-chip"
                    onClick={() => onSelectChapter(ch)}
                  >
                    {ui.map.chapterPrefix} {ch}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
