import {
  Chapter,
  Character,
  Era,
  Journey,
  Monument,
  Place,
} from '../types/chronicle';
import { Language, UI_STRINGS } from './ui';
import { SI_CHAPTERS } from './sinhalaChapters';
import {
  SI_CHARACTERS,
  SI_ERAS,
  SI_JOURNEYS,
  SI_MONUMENTS,
  SI_PLACES,
} from './sinhalaEntities';

export type { Language };
export { UI_STRINGS };

export function localizeEra(era: Era, lang: Language): Era {
  if (lang === 'en') return era;
  const tr = SI_ERAS[era.id];
  if (!tr) return era;
  return { ...era, name: tr.name, description: tr.description };
}

export function localizePlace(place: Place, lang: Language): Place {
  if (lang === 'en') return place;
  const tr = SI_PLACES[place.id];
  if (!tr) return place;
  return {
    ...place,
    ancientName: tr.ancientName,
    modernName: tr.modernName,
    summary: tr.summary,
  };
}

export function localizeCharacter(char: Character, lang: Language): Character {
  if (lang === 'en') return char;
  const tr = SI_CHARACTERS[char.id];
  if (!tr) return char;
  return {
    ...char,
    name: tr.name,
    dynasty: tr.dynasty ?? char.dynasty,
    reignLabel: tr.reignLabel ?? char.reignLabel,
    summary: tr.summary,
  };
}

export function localizeMonument(monument: Monument, lang: Language): Monument {
  if (lang === 'en') return monument;
  const tr = SI_MONUMENTS[monument.id];
  if (!tr) return monument;
  return {
    ...monument,
    name: tr.name,
    yearLabel: tr.yearLabel,
    description: tr.description,
    significance: tr.significance,
  };
}

export function localizeJourney(journey: Journey, lang: Language): Journey {
  if (lang === 'en') return journey;
  const tr = SI_JOURNEYS[journey.id];
  if (!tr) return journey;
  return {
    ...journey,
    title: tr.title,
    subtitle: tr.subtitle,
    yearLabel: tr.yearLabel,
    summary: tr.summary,
    stops: journey.stops.map((s, idx) => ({
      ...s,
      label: tr.stops[idx]?.label ?? s.label,
      note: tr.stops[idx]?.note ?? s.note,
    })),
  };
}

export function localizeChapter(chapter: Chapter, lang: Language): Chapter {
  if (lang === 'en') return chapter;
  const tr = SI_CHAPTERS[chapter.number];
  if (!tr) return chapter;
  return {
    ...chapter,
    title: tr.title,
    yearLabel: tr.yearLabel,
    summary: tr.summary,
    narrativeArc: tr.narrativeArc,
    keyQuote: tr.keyQuote ?? chapter.keyQuote,
    events: chapter.events.map((ev) => {
      const evTr = tr.events[ev.id];
      return evTr
        ? {
            ...ev,
            title: evTr.title,
            yearLabel: evTr.yearLabel,
            summary: evTr.summary,
          }
        : ev;
    }),
  };
}

export function formatYearLocalized(year: number, lang: Language): string {
  if (lang === 'si') {
    if (year < 0) return `ක්‍රි.පූ. ${Math.abs(year)}`;
    if (year === 0) return 'ක්‍රි.ව. 1';
    return `ක්‍රි.ව. ${year}`;
  }
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 CE';
  return `${year} CE`;
}
