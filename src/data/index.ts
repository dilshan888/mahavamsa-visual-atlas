import { ChronicleDataset, ThemeCategory } from '../types/chronicle';
import { ERAS } from './eras';
import { PLACES } from './places';
import { CHARACTERS, RELATIONS } from './characters';
import { MONUMENTS } from './monuments';
import { JOURNEYS } from './journeys';
import { CHAPTERS_PART_1 } from './chaptersPart1';
import { CHAPTERS_PART_2 } from './chaptersPart2';

export const CHAPTERS = [...CHAPTERS_PART_1, ...CHAPTERS_PART_2];

export const CHRONICLE_DATA: ChronicleDataset = {
  meta: {
    title: 'Mahāvaṃsa Visual Atlas',
    subtitle: 'The Great Chronicle of Sri Lanka (Chapters 1–37)',
    sourceTranslation: 'Wilhelm Geiger (1912) Pāli Text Society Translation',
    totalChaptersLoaded: CHAPTERS.length,
    booksIncluded: ['mahavamsa'],
    schemaVersion: '1.0.0',
  },
  eras: ERAS,
  places: PLACES,
  characters: CHARACTERS,
  relations: RELATIONS,
  monuments: MONUMENTS,
  journeys: JOURNEYS,
  chapters: CHAPTERS,
};

export const THEME_META: Record<
  ThemeCategory,
  { label: string; color: string; bg: string }
> = {
  religion: { label: 'Dhamma & Sangha', color: '#1b6b57', bg: '#e3f3ee' },
  politics: { label: 'Monarchy & State', color: '#8f3a24', bg: '#f8e9e4' },
  war: { label: 'Wars & Campaigns', color: '#9b2c4e', bg: '#f9e5ec' },
  architecture: { label: 'Stūpas & Tanks', color: '#a86b15', bg: '#fbf2e0' },
  diplomacy: { label: 'Envoys & Trade', color: '#2b5978', bg: '#e4eef5' },
  'myth-legend': { label: 'Myth & Legend', color: '#6b468c', bg: '#f0eaf7' },
};

export const PLACE_BY_ID = Object.fromEntries(PLACES.map((p) => [p.id, p]));
export const CHARACTER_BY_ID = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
export const MONUMENT_BY_ID = Object.fromEntries(MONUMENTS.map((m) => [m.id, m]));
export const ERA_BY_ID = Object.fromEntries(ERAS.map((e) => [e.id, e]));
export const JOURNEY_BY_ID = Object.fromEntries(JOURNEYS.map((j) => [j.id, j]));
export const CHAPTER_BY_NUM = Object.fromEntries(CHAPTERS.map((c) => [c.number, c]));

export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 0) return '1 CE';
  return `${year} CE`;
}
