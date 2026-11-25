import { Character, CharacterRelation } from '../types/chronicle';

export const CHARACTERS: Character[] = [
  // Sacred Foundations
  {
    id: 'buddha',
    name: 'Gautama Buddha (Tathāgata)',
    altNames: ['Siddhattha Gotama'],
    role: 'buddha-monk',
    reignLabel: 'c. 623–543 BCE',
    summary:
      'Visited Laṅkā three times—Mahiyangaṇa, Nāgadīpa, and Kalyāṇī/Sumanakūṭa—consecrating the island as the future sanctuary of the Dhamma.',
    chapters: [1, 2, 3, 6, 17, 31],
    eraId: 'sacred-foundations',
    primaryPlaceId: 'bodh-gaya',
  },
  {
    id: 'deity-sumana',
    name: 'Sumana Saman',
    role: 'mythic-figure',
    summary:
      'Guardian deity of Sumanakūṭa (Adam’s Peak) who received hair relics from the Buddha at Mahiyangaṇa and invited him to leave his footprint on the sacred peak.',
    chapters: [1],
    eraId: 'sacred-foundations',
    primaryPlaceId: 'sumanakuta',
  },
  {
    id: 'mahakassapa',
    name: 'Elder Mahākassapa',
    role: 'buddha-monk',
    summary:
      'Senior disciple of the Buddha who presided over the First Buddhist Council at Rājagaha three months after the Parinibbāna.',
    chapters: [3],
    eraId: 'sacred-foundations',
    primaryPlaceId: 'rajagaha',
  },
  {
    id: 'moggaliputta-tissa',
    name: 'Elder Moggaliputta-Tissa',
    role: 'buddha-monk',
    summary:
      'Spiritual mentor of Emperor Asoka who purified the Sangha, presided over the Third Council at Pāṭaliputta, and dispatched missionaries to nine regions including Laṅkā.',
    chapters: [5, 12, 13],
    eraId: 'sacred-foundations',
    primaryPlaceId: 'pataliputta',
  },
  {
    id: 'asoka',
    name: 'Emperor Asoka (Dhammāsoka)',
    altNames: ['Caṇḍāsoka', 'Dhammāsoka'],
    role: 'foreign-ruler',
    dynasty: 'Maurya',
    reignYears: [-268, -232],
    reignLabel: 'c. 268–232 BCE',
    summary:
      'Mauryan Emperor of India who converted to Buddhism, convened the Third Council, forged an unseen friendship with Devānampiyatissa, and sent his son Mahinda and daughter Saṅghamittā to Laṅkā.',
    chapters: [5, 11, 12, 13, 18, 19],
    eraId: 'sacred-foundations',
    primaryPlaceId: 'pataliputta',
  },

  // Vijayan Colonization
  {
    id: 'sihabahu',
    name: 'King Sīhabāhu',
    role: 'foreign-ruler',
    dynasty: 'Vijaya',
    summary:
      'Mythic founder of Sīhapura in Lāḷa, born of Princess Suppādevī and a lion; father of Prince Vijaya and Prince Sumitta.',
    chapters: [6, 8],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'sinhapura',
  },
  {
    id: 'vijaya',
    name: 'King Vijaya',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-543, -505],
    reignLabel: '543–505 BCE',
    summary:
      'Exiled prince of Sīhapura who landed at Tambapaṇṇi with 700 followers on the day of the Buddha’s Parinibbāna, establishing the first Sinhalese kingdom.',
    chapters: [6, 7, 8],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'tambapanni',
  },
  {
    id: 'kuveni',
    name: 'Kuveṇī',
    role: 'mythic-figure',
    summary:
      'Yakkha princess who aided Vijaya in conquering Sirisavatthu and bore him two children before being cast aside for a Pandyan royal bride.',
    chapters: [7],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'tambapanni',
  },
  {
    id: 'panduvasudeva',
    name: 'King Paṇḍuvāsudeva',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-504, -474],
    reignLabel: '504–474 BCE',
    summary:
      'Nephew of Vijaya who arrived from Sīhapura to inherit the throne, marrying the Sakyan princess Bhaddakaccānā.',
    chapters: [8, 9],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'upatissagama',
  },
  {
    id: 'bhaddakaccana',
    name: 'Queen Bhaddakaccānā',
    role: 'queen-consort',
    dynasty: 'Sakya',
    summary:
      'Sakyan princess related to the Buddha who sailed to Laṅkā with 32 maidens; her brothers founded Anurādhagāma, Rohaṇa, and Dīghāyu.',
    chapters: [8, 9],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'upatissagama',
  },
  {
    id: 'abhaya',
    name: 'King Abhaya',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-474, -454],
    reignLabel: '474–454 BCE',
    summary:
      'Eldest son of Paṇḍuvāsudeva who ruled Upatissagāma for twenty years and later served as city guardian under his nephew Paṇḍukābhaya.',
    chapters: [9, 10],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'upatissagama',
  },
  {
    id: 'ummadacitta',
    name: 'Princess Ummādacittā',
    role: 'queen-consort',
    dynasty: 'Vijaya',
    summary:
      'Sister of King Abhaya locked in a single-pillar tower due to a prophecy that her son would slay her brothers; mother of Paṇḍukābhaya.',
    chapters: [9, 10],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'upatissagama',
  },
  {
    id: 'pandukabhaya',
    name: 'King Paṇḍukābhaya',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-437, -367],
    reignLabel: '437–367 BCE',
    summary:
      'First truly indigenous Sri Lankan monarch who defeated his uncles, unified Yakkha and Sinhala communities, planned the metropolis of Anurādhapura, and built Abhayavāpi.',
    chapters: [9, 10, 11],
    eraId: 'vijayan-colonization',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'mutasiva',
    name: 'King Muṭasiva',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-367, -307],
    reignLabel: '367–307 BCE',
    summary:
      'Son of Paṇḍukābhaya who ruled peacefully for sixty years and laid out the royal Mahāmeghavana pleasure garden.',
    chapters: [11],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'anuradhapura',
  },

  // Arrival of Buddhism
  {
    id: 'devanampiyatissa',
    name: 'King Devānampiyatissa',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-250, -210],
    reignLabel: '250–210 BCE',
    summary:
      'Second son of Muṭasiva who converted to Buddhism upon meeting Arhat Mahinda at Mihintale, establishing the Mahāvihāra, Thūpārāma, and planting the Jaya Sri Maha Bodhi.',
    chapters: [11, 13, 14, 15, 16, 17, 18, 19, 20],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'mahinda',
    name: 'Arhat Mahinda',
    role: 'buddha-monk',
    dynasty: 'Maurya',
    summary:
      'Son of Emperor Asoka who arrived at Missaka-pabbata (Mihintale) in 247 BCE, converting King Devānampiyatissa and establishing the Theravāda Sangha in Laṅkā.',
    chapters: [5, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'mihintale',
  },
  {
    id: 'sanghamitta',
    name: 'Therī Saṅghamittā',
    role: 'buddha-monk',
    dynasty: 'Maurya',
    summary:
      'Daughter of Emperor Asoka who voyaged from Tāmalitti to Jambukola bearing the sacred Bodhi sapling and established the Bhikkhunī (nuns’) Order in Sri Lanka.',
    chapters: [5, 18, 19, 20],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'jambukola',
  },
  {
    id: 'anula-queen-early',
    name: 'Queen Anulā (First Bhikkhunī)',
    role: 'queen-consort',
    summary:
      'Sister-in-law of Devānampiyatissa whose desire for ordination prompted the mission to bring Therī Saṅghamittā to Laṅkā; first Sri Lankan Buddhist nun.',
    chapters: [14, 18, 19],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'arittha',
    name: 'Minister / Elder Mahā-Ariṭṭha',
    role: 'buddha-monk',
    summary:
      'Nephew of Devānampiyatissa who led the diplomatic mission to Pāṭaliputta for the Bodhi tree and became the first native Sri Lankan Buddhist monk.',
    chapters: [11, 18, 19],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'uttiya',
    name: 'King Uttiya',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-210, -200],
    reignLabel: '210–200 BCE',
    summary:
      'Younger brother and successor of Devānampiyatissa during whose reign Arhat Mahinda and Therī Saṅghamittā attained Parinibbāna.',
    chapters: [20, 21],
    eraId: 'arrival-of-buddhism',
    primaryPlaceId: 'anuradhapura',
  },

  // Dutugamunu Epic
  {
    id: 'elara',
    name: 'King Elāra',
    role: 'monarch',
    dynasty: 'Chola',
    reignYears: [-205, -161],
    reignLabel: '205–161 BCE',
    summary:
      'Noble prince of the Chola country who ruled Anurādhapura for 44 years with legendary impartiality—famously symbolized by the bell of justice hung at his bedhead.',
    chapters: [21, 25],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'mahanaga',
    name: 'Sub-King Mahānāga',
    role: 'monarch',
    dynasty: 'Ruhuna-Vijaya',
    summary:
      'Brother of Devānampiyatissa who fled a court poisoning plot and founded the southern Kingdom of Ruhuna at Mahāgāma.',
    chapters: [22],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'magama',
  },
  {
    id: 'kavantissa',
    name: 'King Kākavaṇṇatissa',
    altNames: ['Kavantissa'],
    role: 'monarch',
    dynasty: 'Ruhuna-Vijaya',
    reignYears: [-205, -161],
    reignLabel: 'c. 205–161 BCE',
    summary:
      'Shrewd ruler of Ruhuna who fortified the south, wed Vihāramahādevī, recruited the Ten Giant Warriors, and built Tissamahārāma.',
    chapters: [22, 23, 24],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'magama',
  },
  {
    id: 'viharamahadevi',
    name: 'Queen Vihāramahādevī',
    altNames: ['Princess Devī'],
    role: 'queen-consort',
    dynasty: 'Ruhuna-Vijaya',
    summary:
      'Heroic daughter of King Kalyāṇī-Tissa who offered herself to the sea to save her homeland, washed ashore at Kirinda, and guided her son Duṭṭhagāmaṇi in strategy and devotion.',
    chapters: [22, 24, 25],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'kirinda',
  },
  {
    id: 'dutugamunu',
    name: 'King Duṭṭhagāmaṇi Abhaya',
    altNames: ['Dutugemunu', 'Gāmaṇi Abhaya'],
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-161, -137],
    reignLabel: '161–137 BCE',
    summary:
      'Central hero of the Mahāvaṃsa (11 chapters): united Laṅkā by defeating Elāra in single combat, honored his fallen rival, and built Mirisawetiya, Lohapāsāda, and Ruwanwelisaya.',
    chapters: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'saddhatissa',
    name: 'King Saddhātissa',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-137, -119],
    reignLabel: '137–119 BCE',
    summary:
      'Younger brother of Duṭṭhagāmaṇi who provisioned the army from Dīghavāpi, reconciled after a brief fraternal war, and completed the Ruwanwelisaya.',
    chapters: [22, 24, 32, 33],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'dighavapi',
  },
  {
    id: 'nandimitta',
    name: 'Nandimitta',
    role: 'warrior',
    summary:
      'Commander of the Ten Giant Warriors, endowed with the strength of ten elephants; famously fought alongside the royal elephant Kaṇḍula at Vijitanagara.',
    chapters: [23, 25],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'vijitapura',
  },
  {
    id: 'velusumana',
    name: 'Velusumana',
    role: 'warrior',
    summary:
      'Master cavalryman among the Ten Giant Warriors who captured Elāra’s prize steed and led decisive ambushes.',
    chapters: [23, 25],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'magama',
  },
  {
    id: 'theraputtabhaya',
    name: 'Theraputtābhaya',
    role: 'warrior',
    summary:
      'Monk-turned-warrior who fought with a massive palmyra club, later renounced worldly triumph after the war, attained Arahantship, and comforted Duṭṭhagāmaṇi on his deathbed.',
    chapters: [23, 25, 32],
    eraId: 'dutugamunu-epic',
    primaryPlaceId: 'anuradhapura',
  },

  // Middle Anuradhapura
  {
    id: 'vattagamani',
    name: 'King Vaṭṭagāmaṇi Abhaya (Valagamba)',
    altNames: ['Valagamba'],
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-103, -77],
    reignLabel: '103 BCE & 89–77 BCE',
    summary:
      'Endured 14 years in hiding during the Brāhmaṇatissa famine and South Indian invasions, reclaimed Anurādhapura, founded Abhayagiri Vihāra, and oversaw the writing of the Tipiṭaka.',
    chapters: [33],
    eraId: 'middle-anuradhapura',
    primaryPlaceId: 'aluvihare',
  },
  {
    id: 'queen-anula-infamous',
    name: 'Queen Anulā',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-47, -42],
    reignLabel: '47–42 BCE',
    summary:
      'First female sovereign in Sri Lankan history; rose to power through a dramatic succession of palace poisonings before being overthrown by Kuṭakaṇṇa Tissa.',
    chapters: [34],
    eraId: 'middle-anuradhapura',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'bhatikabhaya',
    name: 'King Bhātikābhaya',
    role: 'monarch',
    dynasty: 'Vijaya',
    reignYears: [-22, 7],
    reignLabel: '22 BCE–7 CE',
    summary:
      'Devout monarch who sent diplomatic envoys to Roman markets for coral and draped the entire Ruwanwelisaya in a floral net of jasmine.',
    chapters: [34],
    eraId: 'middle-anuradhapura',
    primaryPlaceId: 'anuradhapura',
  },

  // Lambakanna & Hydraulic Golden Age
  {
    id: 'vasabha',
    name: 'King Vasabha',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [65, 109],
    reignLabel: '65–109 CE',
    summary:
      'Founder of the First Lambakaṇṇa Dynasty who overthrew the usurper Subha, fortified Anurādhapura, and ushered in a 44-year era of peace and 11 major reservoirs.',
    chapters: [35],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'gajabahu',
    name: 'King Gajabāhu I',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [112, 134],
    reignLabel: '112–134 CE',
    summary:
      'Grandson of Vasabha who enlarged Abhayagiri Stūpa, built the Gāmaṇitissa tank, and is remembered in tradition for his expedition to the Chola realm.',
    chapters: [35],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'voharika-tissa',
    name: 'King Vohārika Tissa',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [214, 236],
    reignLabel: '214–236 CE',
    summary:
      'First Sri Lankan king to abolish physical torture and corporal punishment by law; suppressed the Vetulla (Mahāyāna) doctrines at Abhayagiri.',
    chapters: [36],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'sirisanghabodhi',
    name: 'King Sirisaṅghabodhi',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [251, 253],
    reignLabel: '251–253 CE',
    summary:
      'Bodhisattva-like monarch who refused to shed blood when Goṭhābhaya rebelled, retreated to Attanagalla, and offered his own head so a poor man could claim the bounty.',
    chapters: [36],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'attanagalla',
  },
  {
    id: 'gothabhaya',
    name: 'King Goṭhābhaya (Meghavaṇṇābhaya)',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [253, 266],
    reignLabel: '253–266 CE',
    summary:
      'Treasurer who seized the throne from Sirisaṅghabodhi, banished sixty Vetulla monks to South India—triggering the vengeful mission of monk Saṅghamitta—and fathered Mahāsena.',
    chapters: [36, 37],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'anuradhapura',
  },
  {
    id: 'mahasena',
    name: 'King Mahāsena',
    role: 'monarch',
    dynasty: 'Lambakaṇṇa',
    reignYears: [276, 303],
    reignLabel: '276–303 CE',
    summary:
      'Final king of the original Mahāvaṃsa: initially demolished the Mahāvihāra under monk Saṅghamitta’s sway, later reconciled, erected the colossal Jetavanārāmaya, and built 16 giant reservoirs including Minneriya.',
    chapters: [37],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'minneriya',
  },
  {
    id: 'sanghamitta-monk',
    name: 'Monk Saṅghamitta (of Chola)',
    role: 'buddha-monk',
    summary:
      'Vetulla (heterodox) monk from South India who tutored Prince Mahāsena and orchestrated the nine-year suppression of the Mahāvihāra before being slain in a popular backlash.',
    chapters: [36, 37],
    eraId: 'lambakanna-hydraulic',
    primaryPlaceId: 'anuradhapura',
  },
];

export const RELATIONS: CharacterRelation[] = [
  // Sacred foundations & missions
  { id: 'r1', source: 'buddha', target: 'deity-sumana', type: 'mentor-of', label: 'gifted hair relics', chapter: 1 },
  { id: 'r2', source: 'buddha', target: 'mahakassapa', type: 'mentor-of', label: 'chief disciple', chapter: 3 },
  { id: 'r3', source: 'moggaliputta-tissa', target: 'asoka', type: 'mentor-of', label: 'spiritual advisor', chapter: 5 },
  { id: 'r4', source: 'asoka', target: 'mahinda', type: 'parent-of', label: 'father of', chapter: 5 },
  { id: 'r5', source: 'asoka', target: 'sanghamitta', type: 'parent-of', label: 'father of', chapter: 5 },
  { id: 'r6', source: 'asoka', target: 'devanampiyatissa', type: 'sent-envoy-to', label: 'unseen friends & envoys', chapter: 11 },

  // Vijayan dynasty
  { id: 'r7', source: 'sihabahu', target: 'vijaya', type: 'parent-of', label: 'exiled son', chapter: 6 },
  { id: 'r8', source: 'vijaya', target: 'kuveni', type: 'spouse-of', label: 'consort & betrayer', chapter: 7 },
  { id: 'r9', source: 'vijaya', target: 'panduvasudeva', type: 'succeeded-by', label: 'succeeded by nephew', chapter: 8 },
  { id: 'r10', source: 'panduvasudeva', target: 'bhaddakaccana', type: 'spouse-of', label: 'married', chapter: 8 },
  { id: 'r11', source: 'panduvasudeva', target: 'abhaya', type: 'parent-of', label: 'father of', chapter: 9 },
  { id: 'r12', source: 'panduvasudeva', target: 'ummadacitta', type: 'parent-of', label: 'father of', chapter: 9 },
  { id: 'r13', source: 'abhaya', target: 'ummadacitta', type: 'sibling-of', label: 'brother of', chapter: 9 },
  { id: 'r14', source: 'ummadacitta', target: 'pandukabhaya', type: 'parent-of', label: 'mother of', chapter: 9 },
  { id: 'r15', source: 'abhaya', target: 'pandukabhaya', type: 'succeeded-by', label: 'uncle / succeeded by', chapter: 10 },
  { id: 'r16', source: 'pandukabhaya', target: 'mutasiva', type: 'parent-of', label: 'father of', chapter: 11 },
  { id: 'r17', source: 'mutasiva', target: 'devanampiyatissa', type: 'parent-of', label: 'father of', chapter: 11 },

  // Arrival of Buddhism
  { id: 'r18', source: 'mahinda', target: 'devanampiyatissa', type: 'mentor-of', label: 'converted at Mihintale', chapter: 13 },
  { id: 'r19', source: 'sanghamitta', target: 'anula-queen-early', type: 'mentor-of', label: 'ordained first nun', chapter: 19 },
  { id: 'r20', source: 'devanampiyatissa', target: 'arittha', type: 'sent-envoy-to', label: 'dispatched to Asoka', chapter: 18 },
  { id: 'r21', source: 'devanampiyatissa', target: 'uttiya', type: 'succeeded-by', label: 'succeeded by brother', chapter: 20 },
  { id: 'r22', source: 'devanampiyatissa', target: 'mahanaga', type: 'sibling-of', label: 'brother (fled to Ruhuna)', chapter: 22 },

  // Dutugamunu Epic
  { id: 'r23', source: 'mahanaga', target: 'kavantissa', type: 'parent-of', label: 'great-grandfather of', chapter: 22 },
  { id: 'r24', source: 'kavantissa', target: 'viharamahadevi', type: 'spouse-of', label: 'married', chapter: 22 },
  { id: 'r25', source: 'kavantissa', target: 'dutugamunu', type: 'parent-of', label: 'father of', chapter: 22 },
  { id: 'r26', source: 'viharamahadevi', target: 'dutugamunu', type: 'parent-of', label: 'mother & strategist', chapter: 22 },
  { id: 'r27', source: 'dutugamunu', target: 'saddhatissa', type: 'sibling-of', label: 'older brother of', chapter: 24 },
  { id: 'r28', source: 'dutugamunu', target: 'elara', type: 'fought-against', label: 'single combat at Anurādhapura', chapter: 25 },
  { id: 'r29', source: 'nandimitta', target: 'dutugamunu', type: 'warrior-of', label: 'chief of Ten Giants', chapter: 23 },
  { id: 'r30', source: 'velusumana', target: 'dutugamunu', type: 'warrior-of', label: 'cavalry champion', chapter: 23 },
  { id: 'r31', source: 'theraputtabhaya', target: 'dutugamunu', type: 'warrior-of', label: 'warrior & deathbed monk', chapter: 23 },
  { id: 'r32', source: 'dutugamunu', target: 'saddhatissa', type: 'succeeded-by', label: 'succeeded by', chapter: 33 },

  // Middle Anuradhapura
  { id: 'r33', source: 'saddhatissa', target: 'vattagamani', type: 'parent-of', label: 'father of', chapter: 33 },
  { id: 'r34', source: 'vattagamani', target: 'queen-anula-infamous', type: 'succeeded-by', label: 'later court crisis', chapter: 34 },
  { id: 'r35', source: 'queen-anula-infamous', target: 'bhatikabhaya', type: 'succeeded-by', label: 'restoration of order', chapter: 34 },

  // Lambakanna Dynasty
  { id: 'r36', source: 'bhatikabhaya', target: 'vasabha', type: 'succeeded-by', label: 'new Lambakaṇṇa line', chapter: 35 },
  { id: 'r37', source: 'vasabha', target: 'gajabahu', type: 'parent-of', label: 'grandfather of', chapter: 35 },
  { id: 'r38', source: 'gajabahu', target: 'voharika-tissa', type: 'succeeded-by', label: 'Lambakaṇṇa successor', chapter: 36 },
  { id: 'r39', source: 'voharika-tissa', target: 'sirisanghabodhi', type: 'succeeded-by', label: 'later Lambakaṇṇa king', chapter: 36 },
  { id: 'r40', source: 'gothabhaya', target: 'sirisanghabodhi', type: 'fought-against', label: 'usurped throne from', chapter: 36 },
  { id: 'r41', source: 'gothabhaya', target: 'mahasena', type: 'parent-of', label: 'father of', chapter: 37 },
  { id: 'r42', source: 'sanghamitta-monk', target: 'mahasena', type: 'mentor-of', label: 'tutored against Mahāvihāra', chapter: 37 },
];
