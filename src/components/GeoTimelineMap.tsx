import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass,
  MapPin,
  Pause,
  Play,
  Route,
  SkipBack,
  SkipForward,
  Landmark,
} from 'lucide-react';
import {
  CHAPTER_BY_NUM,
  CHAPTERS,
  CHRONICLE_DATA,
  ERA_BY_ID,
  PLACE_BY_ID,
  THEME_META,
} from '../data';
import {
  Language,
  UI_STRINGS,
  localizeChapter,
  localizeEra,
  localizeJourney,
  localizeMonument,
  localizePlace,
} from '../i18n';
import { PlaceType } from '../types/chronicle';

interface GeoTimelineMapProps {
  lang: Language;
  selectedChapter: number;
  onSelectChapter: (chapterNum: number) => void;
  onOpenChapterDetail: (chapterNum: number) => void;
}

const PLACE_TYPE_COLOR: Record<PlaceType, string> = {
  capital: '#9c3d28',
  'sacred-site': '#c98a1c',
  monastery: '#1b6b57',
  port: '#2b5978',
  battlefield: '#9b2c4e',
  settlement: '#6b5b4b',
  reservoir: '#1e7a8c',
  kingdom: '#6b468c',
};

export const GeoTimelineMap: React.FC<GeoTimelineMapProps> = ({
  lang,
  selectedChapter,
  onSelectChapter,
  onOpenChapterDetail,
}) => {
  const ui = UI_STRINGS[lang];
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const journeyLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
    'anuradhapura'
  );
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(
    'buddha-visits'
  );
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const rawChapter = CHAPTER_BY_NUM[selectedChapter] || CHAPTERS[0];
  const chapter = useMemo(
    () => localizeChapter(rawChapter, lang),
    [rawChapter, lang]
  );
  const era = useMemo(
    () => localizeEra(ERA_BY_ID[chapter.eraId], lang),
    [chapter.eraId, lang]
  );

  const selectedPlace = useMemo(() => {
    if (!selectedPlaceId) return null;
    const raw = PLACE_BY_ID[selectedPlaceId];
    return raw ? localizePlace(raw, lang) : null;
  }, [selectedPlaceId, lang]);

  // Auto-sync journey and primary place when chapter changes
  useEffect(() => {
    if (rawChapter.journeyIds.length > 0) {
      setActiveJourneyId(rawChapter.journeyIds[0]);
    }
    if (PLACE_BY_ID[rawChapter.primaryPlaceId]) {
      setSelectedPlaceId(rawChapter.primaryPlaceId);
    }
  }, [rawChapter.number]);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      onSelectChapter(selectedChapter >= 37 ? 1 : selectedChapter + 1);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPlaying, selectedChapter, onSelectChapter]);

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [7.87, 80.7],
      zoom: 7,
      minZoom: 4,
      maxZoom: 13,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const cartoKey = import.meta.env.VITE_CARTO_API_KEY?.trim();
    const keyParam = cartoKey ? `?key=${encodeURIComponent(cartoKey)}` : '';

    L.tileLayer(
      `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${keyParam}`,
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }
    ).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    journeyLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render place markers
  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;

    layer.clearLayers();
    const activeSet = new Set(chapter.placeIds);

    CHRONICLE_DATA.places.forEach((rawPlace) => {
      const place = localizePlace(rawPlace, lang);
      const isActive = activeSet.has(place.id);
      const isPrimary = chapter.primaryPlaceId === place.id;
      const isSelected = selectedPlaceId === place.id;

      if (!showAllPlaces && !isActive) return;

      const color = PLACE_TYPE_COLOR[place.type];
      const radius = isPrimary ? 10 : isActive ? 8 : 5;

      const marker = L.circleMarker(place.coords, {
        radius,
        color: isSelected ? '#1c1917' : '#ffffff',
        weight: isSelected ? 3 : isPrimary ? 2.5 : 1.5,
        fillColor: color,
        fillOpacity: isActive ? 0.95 : 0.45,
      });

      marker.bindTooltip(
        `<div class="map-tooltip"><strong>${place.ancientName}</strong><span>${place.modernName}</span></div>`,
        { direction: 'top', offset: [0, -8] }
      );

      marker.on('click', () => {
        setSelectedPlaceId(place.id);
      });

      marker.addTo(layer);

      if (isPrimary) {
        L.circleMarker(place.coords, {
          radius: 17,
          color,
          weight: 1.5,
          opacity: 0.65,
          fillOpacity: 0.12,
          fillColor: color,
          interactive: false,
        }).addTo(layer);
      }
    });
  }, [chapter, selectedPlaceId, showAllPlaces, lang]);

  // Render active journey polyline & numbered stops
  useEffect(() => {
    const layer = journeyLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    if (!activeJourneyId) return;
    const rawJourney = CHRONICLE_DATA.journeys.find(
      (j) => j.id === activeJourneyId
    );
    if (!rawJourney) return;
    const journey = localizeJourney(rawJourney, lang);

    const latlngs: [number, number][] = [];
    journey.stops.forEach((stop) => {
      const p = PLACE_BY_ID[stop.placeId];
      if (p) latlngs.push(p.coords);
    });

    if (latlngs.length > 1) {
      L.polyline(latlngs, {
        color: journey.color,
        weight: 3.5,
        opacity: 0.85,
        dashArray: '8 6',
      }).addTo(layer);
    }

    journey.stops.forEach((stop, idx) => {
      const p = PLACE_BY_ID[stop.placeId];
      if (!p) return;

      const icon = L.divIcon({
        className: 'journey-stop-badge',
        html: `<span style="background:${journey.color}">${idx + 1}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      const stopMarker = L.marker(p.coords, { icon });
      stopMarker.bindTooltip(
        `<div class="map-tooltip"><strong>${idx + 1}. ${stop.label}</strong><span>${stop.note}</span></div>`,
        { direction: 'right', offset: [10, 0] }
      );
      stopMarker.on('click', () => {
        setSelectedPlaceId(p.id);
      });
      stopMarker.addTo(layer);
    });
  }, [activeJourneyId, lang]);

  const jumpToRegion = (region: 'sri-lanka' | 'subcontinent' | 'anuradhapura') => {
    const map = mapRef.current;
    if (!map) return;
    if (region === 'sri-lanka') {
      map.flyTo([7.87, 80.7], 7, { duration: 0.9 });
    } else if (region === 'subcontinent') {
      map.flyTo([16.5, 82.8], 5, { duration: 0.9 });
    } else {
      map.flyTo([8.33, 80.45], 11, { duration: 0.9 });
    }
  };

  const localizedJourneys = useMemo(
    () => CHRONICLE_DATA.journeys.map((j) => localizeJourney(j, lang)),
    [lang]
  );

  const activeJourney = useMemo(
    () => localizedJourneys.find((j) => j.id === activeJourneyId) || null,
    [localizedJourneys, activeJourneyId]
  );

  const placeMonuments = useMemo(() => {
    if (!selectedPlace) return [];
    return CHRONICLE_DATA.monuments
      .filter((m) => m.placeId === selectedPlace.id)
      .map((m) => localizeMonument(m, lang));
  }, [selectedPlace, lang]);

  return (
    <div className="geo-layout">
      <aside className="geo-sidebar">
        <div className="panel-card">
          <div className="chapter-pill-row">
            <span className="era-dot" style={{ backgroundColor: era.color }} />
            <span className="era-label">{era.name}</span>
          </div>
          <div className="chapter-heading-row">
            <span className="chapter-num-badge">
              {ui.map.chapterPrefix} {chapter.number}
            </span>
            <span className="year-mono">{chapter.yearLabel}</span>
          </div>
          <h2 className="serif-title">{chapter.title}</h2>
          <p className="pali-subtitle">{chapter.paliTitle}</p>
          <p className="body-text">{chapter.summary}</p>
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
          <button
            className="primary-btn full-width"
            onClick={() => onOpenChapterDetail(chapter.number)}
          >
            {ui.map.openFullDossier}
          </button>
        </div>

        <div className="panel-card">
          <div className="section-header">
            <Route size={16} />
            <h3>{ui.map.historicalJourneys}</h3>
          </div>
          <div className="journey-list">
            {localizedJourneys.map((j) => {
              const active = j.id === activeJourneyId;
              return (
                <button
                  key={j.id}
                  className={`journey-btn ${active ? 'active' : ''}`}
                  onClick={() => {
                    const nextId = active ? null : j.id;
                    setActiveJourneyId(nextId);
                    if (nextId) {
                      onSelectChapter(j.chapterRange[0]);
                      const hasIndia = j.stops.some(
                        (s) => PLACE_BY_ID[s.placeId]?.region === 'india'
                      );
                      jumpToRegion(hasIndia ? 'subcontinent' : 'sri-lanka');
                    }
                  }}
                >
                  <span
                    className="journey-swatch"
                    style={{ backgroundColor: j.color }}
                  />
                  <div className="journey-btn-text">
                    <strong>{j.title}</strong>
                    <span>
                      {j.yearLabel} · {ui.map.chapterPrefix}{' '}
                      {j.chapterRange[0] === j.chapterRange[1]
                        ? j.chapterRange[0]
                        : `${j.chapterRange[0]}–${j.chapterRange[1]}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {activeJourney && (
            <div className="journey-detail-box">
              <p>{activeJourney.summary}</p>
              <ol className="journey-stops-list">
                {activeJourney.stops.map((stop, idx) => (
                  <li
                    key={`${stop.placeId}-${idx}`}
                    onClick={() => {
                      const p = PLACE_BY_ID[stop.placeId];
                      if (p) {
                        setSelectedPlaceId(p.id);
                        mapRef.current?.flyTo(p.coords, 8, { duration: 0.8 });
                      }
                    }}
                  >
                    <strong>{stop.label}</strong>
                    <span>{stop.note}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </aside>

      <div className="geo-main">
        <div className="map-toolbar">
          <div className="map-toolbar-group">
            <Compass size={15} />
            <button onClick={() => jumpToRegion('sri-lanka')}>
              {ui.map.sriLanka}
            </button>
            <button onClick={() => jumpToRegion('subcontinent')}>
              {ui.map.indiaLanka}
            </button>
            <button onClick={() => jumpToRegion('anuradhapura')}>
              {ui.map.anuradhapura}
            </button>
          </div>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showAllPlaces}
              onChange={(e) => setShowAllPlaces(e.target.checked)}
            />
            {ui.map.showAllSites}
          </label>
        </div>

        <div className="map-wrapper">
          <div ref={mapContainerRef} className="leaflet-canvas" />

          {selectedPlace && (
            <div className="place-inspector">
              <div className="place-inspector-header">
                <div>
                  <span
                    className="place-type-pill"
                    style={{
                      backgroundColor: PLACE_TYPE_COLOR[selectedPlace.type],
                    }}
                  >
                    {ui.placeTypes[selectedPlace.type]}
                  </span>
                  <h4>{selectedPlace.ancientName}</h4>
                  <span className="modern-name">
                    <MapPin size={12} /> {selectedPlace.modernName}
                  </span>
                </div>
                <button
                  className="icon-close"
                  onClick={() => setSelectedPlaceId(null)}
                  aria-label="Close place details"
                >
                  ×
                </button>
              </div>
              <p className="place-summary">{selectedPlace.summary}</p>
              {placeMonuments.length > 0 && (
                <div className="place-monuments">
                  <div className="mini-label">
                    <Landmark size={12} /> {ui.map.monumentsHere}
                  </div>
                  {placeMonuments.map((m) => (
                    <div key={m.id} className="mini-monument-item">
                      <strong>{m.name}</strong> ({m.yearLabel})
                    </div>
                  ))}
                </div>
              )}
              <div className="place-chapters">
                <div className="mini-label">{ui.map.featuredInChapters}</div>
                <div className="chapter-chip-row">
                  {selectedPlace.chapters.slice(0, 12).map((chNum) => (
                    <button
                      key={chNum}
                      className={`mini-ch-chip ${
                        chNum === selectedChapter ? 'active' : ''
                      }`}
                      onClick={() => onSelectChapter(chNum)}
                    >
                      {chNum}
                    </button>
                  ))}
                  {selectedPlace.chapters.length > 12 && (
                    <span className="more-count">
                      +{selectedPlace.chapters.length - 12} {ui.map.more}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="scrubber-bar">
          <div className="scrubber-controls">
            <button
              className="icon-btn"
              onClick={() =>
                onSelectChapter(selectedChapter > 1 ? selectedChapter - 1 : 37)
              }
            >
              <SkipBack size={16} />
            </button>
            <button
              className="icon-btn play-btn"
              onClick={() => setIsPlaying((p) => !p)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              className="icon-btn"
              onClick={() =>
                onSelectChapter(selectedChapter < 37 ? selectedChapter + 1 : 1)
              }
            >
              <SkipForward size={16} />
            </button>
          </div>
          <div className="scrubber-track">
            <div className="scrubber-meta">
              <strong>
                {ui.map.chapterPrefix} {chapter.number}: {chapter.title}
              </strong>
              <span className="year-mono">{chapter.yearLabel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={37}
              value={selectedChapter}
              onChange={(e) => onSelectChapter(Number(e.target.value))}
              className="chapter-range-slider"
            />
            <div className="scrubber-ticks">
              {ui.map.ticks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
