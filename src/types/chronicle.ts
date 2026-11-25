export type ChronicleBook = 'mahavamsa' | 'culavamsa';

export type EraId =
  | 'sacred-foundations'
  | 'vijayan-colonization'
  | 'arrival-of-buddhism'
  | 'dutugamunu-epic'
  | 'middle-anuradhapura'
  | 'lambakanna-hydraulic';

export type ThemeCategory =
  | 'religion'
  | 'politics'
  | 'war'
  | 'architecture'
  | 'diplomacy'
  | 'myth-legend';

export type PlaceRegion = 'sri-lanka' | 'india' | 'southeast-asia';

export type PlaceType =
  | 'capital'
  | 'sacred-site'
  | 'monastery'
  | 'port'
  | 'battlefield'
  | 'settlement'
  | 'reservoir'
  | 'kingdom';

export type CharacterRole =
  | 'buddha-monk'
  | 'monarch'
  | 'queen-consort'
  | 'warrior'
  | 'foreign-ruler'
  | 'mythic-figure';

export type RelationType =
  | 'parent-of'
  | 'succeeded-by'
  | 'spouse-of'
  | 'sibling-of'
  | 'fought-against'
  | 'allied-with'
  | 'mentor-of'
  | 'sent-envoy-to'
  | 'warrior-of';

export type MonumentType =
  | 'stupa'
  | 'vihara'
  | 'reservoir'
  | 'palace'
  | 'sacred-tree'
  | 'cave-complex';

export interface Era {
  id: EraId;
  name: string;
  paliSubtitle: string;
  chapterRange: [number, number];
  yearRange: [number, number]; // negative = BCE, positive = CE
  color: string;
  description: string;
}

export interface Place {
  id: string;
  ancientName: string;
  modernName: string;
  region: PlaceRegion;
  type: PlaceType;
  coords: [number, number]; // [lat, lng]
  summary: string;
  chapters: number[];
}

export interface Character {
  id: string;
  name: string;
  altNames?: string[];
  role: CharacterRole;
  dynasty?: string;
  reignYears?: [number, number]; // negative = BCE, positive = CE
  reignLabel?: string;
  summary: string;
  chapters: number[];
  eraId: EraId;
  primaryPlaceId?: string;
}

export interface CharacterRelation {
  id: string;
  source: string; // character id
  target: string; // character id
  type: RelationType;
  label: string;
  chapter?: number;
}

export interface Monument {
  id: string;
  name: string;
  paliName?: string;
  type: MonumentType;
  placeId: string;
  patronId: string; // character id
  yearBuilt?: number;
  yearLabel: string;
  chapter: number;
  description: string;
  significance: string;
}

export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  chapterRange: [number, number];
  yearLabel: string;
  eraId: EraId;
  color: string;
  category: ThemeCategory;
  stops: {
    placeId: string;
    label: string;
    note: string;
    chapter: number;
  }[];
  summary: string;
}

export interface ChapterEvent {
  id: string;
  title: string;
  yearLabel: string;
  yearNumeric: number;
  category: ThemeCategory;
  placeId?: string;
  summary: string;
}

export interface Chapter {
  number: number;
  chronicle: ChronicleBook;
  title: string;
  paliTitle: string;
  eraId: EraId;
  yearStart: number; // negative = BCE, positive = CE
  yearEnd: number;
  yearLabel: string;
  verseCount: number;
  themes: ThemeCategory[];
  summary: string;
  narrativeArc: string;
  keyQuote?: string;
  primaryPlaceId: string;
  placeIds: string[];
  characterIds: string[];
  monumentIds: string[];
  journeyIds: string[];
  events: ChapterEvent[];
}

export interface ChronicleDataset {
  meta: {
    title: string;
    subtitle: string;
    sourceTranslation: string;
    totalChaptersLoaded: number;
    booksIncluded: ChronicleBook[];
    schemaVersion: string;
  };
  eras: Era[];
  places: Place[];
  characters: Character[];
  relations: CharacterRelation[];
  monuments: Monument[];
  journeys: Journey[];
  chapters: Chapter[];
}
