import { CharacterRole, PlaceType, RelationType, ThemeCategory } from '../types/chronicle';

export type Language = 'en' | 'si';

export interface UiStrings {
  appTitle: string;
  appSubtitle: string;
  tabs: {
    map: string;
    timeline: string;
    graph: string;
    chapters: string;
  };
  stats: {
    chapters: string;
    sites: string;
    figures: string;
  };
  exportJson: string;
  map: {
    openFullDossier: string;
    historicalJourneys: string;
    sriLanka: string;
    indiaLanka: string;
    anuradhapura: string;
    showAllSites: string;
    monumentsHere: string;
    featuredInChapters: string;
    more: string;
    chapterPrefix: string;
    ticks: [string, string, string, string, string];
  };
  timeline: {
    allSixEras: string;
    allSixErasDesc: string;
    filterTrack: string;
    allTracks: string;
    colChapter: string;
    colArc: string;
    colTracks: string;
    colVerses: string;
    versesShort: string;
  };
  graph: {
    searchPlaceholder: string;
    allEras: string;
    allRoles: string;
    dynastySuffix: string;
    eraLabel: string;
    primarySeat: string;
    linksTitle: string;
    monumentsTitle: string;
    jumpToChapters: string;
  };
  reader: {
    searchPlaceholder: string;
    versesWord: string;
    prev: string;
    next: string;
    kicker: string;
    of37: string;
    narrativeSignificance: string;
    quoteAttribution: string;
    keyEventsTitle: string;
    locationsTitle: string;
    viewOnMap: string;
    keyFiguresTitle: string;
    exploreLineage: string;
    collectiveCouncilNote: string;
    monumentsTitle: string;
  };
  themes: Record<ThemeCategory, string>;
  roles: Record<CharacterRole, string>;
  placeTypes: Record<PlaceType, string>;
  relations: Record<RelationType, string>;
}

export const UI_STRINGS: Record<Language, UiStrings> = {
  en: {
    appTitle: 'Mahāvaṃsa Visual Atlas',
    appSubtitle: 'All 37 Chapters · 588 BCE – 303 CE · Geo-Map, Timeline & Dynastic Graph',
    tabs: {
      map: 'Story Map',
      timeline: '37-Ch. Timeline',
      graph: 'Lineage Graph',
      chapters: 'Chapter Reader',
    },
    stats: {
      chapters: 'Ch.',
      sites: 'Sites',
      figures: 'Figures',
    },
    exportJson: 'Export JSON',
    map: {
      openFullDossier: 'Open Full Chapter Dossier',
      historicalJourneys: 'Historical Journeys',
      sriLanka: 'Sri Lanka',
      indiaLanka: 'India & Laṅkā',
      anuradhapura: 'Anurādhapura',
      showAllSites: 'Show all 31 sites',
      monumentsHere: 'Monuments here',
      featuredInChapters: 'Featured in Chapters',
      more: 'more',
      chapterPrefix: 'Ch.',
      ticks: [
        'Ch. 1 (588 BCE)',
        'Ch. 10 (Anurādhapura)',
        'Ch. 19 (Bodhi Tree)',
        'Ch. 25 (Elāra vs Duṭṭhagāmaṇi)',
        'Ch. 37 (Mahāsena, 303 CE)',
      ],
    },
    timeline: {
      allSixEras: 'All Six Eras',
      allSixErasDesc: 'Complete 890-year arc of the original Mahāvaṃsa chronicle.',
      filterTrack: 'Filter Track:',
      allTracks: 'All Tracks',
      colChapter: 'Chapter & Period',
      colArc: 'Narrative Arc & Events',
      colTracks: 'Thematic Tracks',
      colVerses: 'Verses',
      versesShort: 'vv.',
    },
    graph: {
      searchPlaceholder: 'Search kings, monks, queens, dynasties...',
      allEras: 'All 6 Eras',
      allRoles: 'All Roles',
      dynastySuffix: 'Dynasty',
      eraLabel: 'Era',
      primarySeat: 'Primary Seat',
      linksTitle: 'Dynastic & Story Links',
      monumentsTitle: 'Monuments & Patronage',
      jumpToChapters: 'Jump to Chapters',
    },
    reader: {
      searchPlaceholder: 'Filter all 37 chapters...',
      versesWord: 'verses',
      prev: 'Prev',
      next: 'Next',
      kicker: 'Mahāvaṃsa · Chapter',
      of37: 'of 37',
      narrativeSignificance: 'Narrative Significance:',
      quoteAttribution: 'Mahāvaṃsa, Chapter',
      keyEventsTitle: 'Key Events in Chapter',
      locationsTitle: 'Locations',
      viewOnMap: 'View on Map',
      keyFiguresTitle: 'Key Figures',
      exploreLineage: 'Explore Lineage →',
      collectiveCouncilNote: 'Collective Sangha council chapter (see summary above).',
      monumentsTitle: 'Monuments & Hydraulic Works',
    },
    themes: {
      religion: 'Dhamma & Sangha',
      politics: 'Monarchy & State',
      war: 'Wars & Campaigns',
      architecture: 'Stūpas & Tanks',
      diplomacy: 'Envoys & Trade',
      'myth-legend': 'Myth & Legend',
    },
    roles: {
      monarch: 'Monarch',
      'buddha-monk': 'Buddha / Sangha',
      'queen-consort': 'Queen / Royal',
      warrior: 'Champion Warrior',
      'foreign-ruler': 'Indian Ruler',
      'mythic-figure': 'Mythic / Yakkha',
    },
    placeTypes: {
      capital: 'Capital',
      'sacred-site': 'Sacred Site',
      monastery: 'Monastery',
      port: 'Port',
      battlefield: 'Battlefield',
      settlement: 'Settlement',
      reservoir: 'Reservoir',
      kingdom: 'Kingdom',
    },
    relations: {
      'parent-of': 'parent of',
      'succeeded-by': 'succeeded by',
      'spouse-of': 'spouse of',
      'sibling-of': 'sibling of',
      'fought-against': 'fought against',
      'allied-with': 'allied with',
      'mentor-of': 'mentor of',
      'sent-envoy-to': 'sent envoy to',
      'warrior-of': 'warrior of',
    },
  },
  si: {
    appTitle: 'මහාවංස දෘශ්‍ය සිතියම්ගත කෘතිය',
    appSubtitle: 'පරිච්ඡේද 37ම · ක්‍රි.පූ. 588 – ක්‍රි.ව. 303 · භූගෝලීය සිතියම, කාලරේඛාව සහ රාජවංශ ජාලය',
    tabs: {
      map: 'කතා සිතියම',
      timeline: 'පරිච්ඡේද කාලරේඛාව',
      graph: 'රාජවංශ ජාලය',
      chapters: 'පරිච්ඡේද කියවනය',
    },
    stats: {
      chapters: 'පරිච්ඡේද',
      sites: 'ස්ථාන',
      figures: 'චරිත',
    },
    exportJson: 'JSON බාගන්න',
    map: {
      openFullDossier: 'සම්පූර්ණ පරිච්ඡේද විස්තරය බලන්න',
      historicalJourneys: 'ඓතිහාසික ගමන් මාර්ග',
      sriLanka: 'ශ්‍රී ලංකාව',
      indiaLanka: 'ඉන්දියාව සහ ලංකාව',
      anuradhapura: 'අනුරාධපුරය',
      showAllSites: 'ස්ථාන 31ම පෙන්වන්න',
      monumentsHere: 'මෙහි පිහිටි ස්මාරක',
      featuredInChapters: 'සඳහන් වන පරිච්ඡේද',
      more: 'තවත්',
      chapterPrefix: 'පරි.',
      ticks: [
        'පරි. 1 (ක්‍රි.පූ. 588)',
        'පරි. 10 (අනුරාධපුරය)',
        'පරි. 19 (ශ්‍රී මහා බෝධිය)',
        'පරි. 25 (දුටුගැමුණු-එළාර)',
        'පරි. 37 (මහසෙන්, ක්‍රි.ව. 303)',
      ],
    },
    timeline: {
      allSixEras: 'යුග හයම',
      allSixErasDesc: 'මුල් මහාවංසයේ වසර 890ක සම්පූර්ණ ඓතිහාසික ගමන් මග.',
      filterTrack: 'තේමාව අනුව පෙරන්න:',
      allTracks: 'සියලු තේමා',
      colChapter: 'පරිච්ඡේදය සහ කාලය',
      colArc: 'කතා සාරාංශය සහ සිදුවීම්',
      colTracks: 'තේමා රේඛා',
      colVerses: 'ගාථා',
      versesShort: 'ගාථා',
    },
    graph: {
      searchPlaceholder: 'රජවරුන්, භික්ෂූන්, රැජිනන්, රාජවංශ සොයන්න...',
      allEras: 'යුග 6ම',
      allRoles: 'සියලු භූමිකා',
      dynastySuffix: 'රාජවංශය',
      eraLabel: 'යුගය',
      primarySeat: 'ප්‍රධාන ස්ථානය',
      linksTitle: 'රාජවංශික සහ කතා සබඳතා',
      monumentsTitle: 'ස්මාරක සහ අනුග්‍රහය',
      jumpToChapters: 'පරිච්ඡේද වෙත යන්න',
    },
    reader: {
      searchPlaceholder: 'පරිච්ඡේද 37 අතරින් සොයන්න...',
      versesWord: 'ගාථා',
      prev: 'පෙර',
      next: 'ඊළඟ',
      kicker: 'මහාවංසය · පරිච්ඡේදය',
      of37: '/ 37',
      narrativeSignificance: 'ඓතිහාසික වැදගත්කම:',
      quoteAttribution: 'මහාවංසය, පරිච්ඡේදය',
      keyEventsTitle: 'ප්‍රධාන සිදුවීම් — පරිච්ඡේදය',
      locationsTitle: 'ස්ථාන',
      viewOnMap: 'සිතියමේ බලන්න',
      keyFiguresTitle: 'ප්‍රධාන චරිත',
      exploreLineage: 'රාජවංශ ජාලය →',
      collectiveCouncilNote: 'සාමූහික ධර්ම සංගායනා පරිච්ඡේදයකි (ඉහත සාරාංශය බලන්න).',
      monumentsTitle: 'ස්මාරක සහ වාරි කර්මාන්ත',
    },
    themes: {
      religion: 'ධර්මය සහ සංඝයා',
      politics: 'රාජ්‍යත්වය',
      war: 'යුද්ධ සහ සටන්',
      architecture: 'ස්තූප සහ වැව්',
      diplomacy: 'රාජ්‍යතාන්ත්‍රික සබඳතා',
      'myth-legend': 'පුරාවෘත්ත',
    },
    roles: {
      monarch: 'රජතුමා / පාලකයා',
      'buddha-monk': 'බුදුරජාණන් / සංඝයා',
      'queen-consort': 'බිසව / රාජකීය',
      warrior: 'මහා යෝධයා',
      'foreign-ruler': 'ඉන්දීය පාලකයා',
      'mythic-figure': 'දේව / යක්ෂ චරිත',
    },
    placeTypes: {
      capital: 'අගනුවර',
      'sacred-site': 'පූජනීය ස්ථානය',
      monastery: 'විහාරය',
      port: 'වරාය',
      battlefield: 'යුද පිටිය',
      settlement: 'ජනාවාසය',
      reservoir: 'වැව / ජලාශය',
      kingdom: 'රාජධානිය',
    },
    relations: {
      'parent-of': 'දෙමාපිය සබඳතාව',
      'succeeded-by': 'අනුප්‍රාප්තිකයා',
      'spouse-of': 'විවාහ සබඳතාව',
      'sibling-of': 'සහෝදර සබඳතාව',
      'fought-against': 'සටන් කළේය',
      'allied-with': 'මිත්‍ර පාර්ශ්වය',
      'mentor-of': 'ගුරු / උපදේශක',
      'sent-envoy-to': 'දූත සබඳතාව',
      'warrior-of': 'සෙන්පති / යෝධයා',
    },
  },
};
