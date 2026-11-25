# Mahāvaṃsa Visual Atlas

An interactive visual explorer for **all 37 chapters of the Mahāvaṃsa** (the Great Chronicle of Sri Lanka, spanning c. 588 BCE to 303 CE), built with a structured, extensible data schema designed to expand seamlessly into the **Cūḷavaṃsa** (Chapters 38–100).

## Features

1. **Interactive Story Map (`Story Map`)**
   - Leaflet map plotting **31 historical places** across Sri Lanka and India with both Pāli/ancient names and modern names.
   - **Chapter scrubber & auto-play tour** stepping chronologically from Chapter 1 (the Buddha's three visits) to Chapter 37 (King Mahāsena).
   - **6 multi-stop historical journeys** overlaid with numbered waypoints:
     - The Three Sacred Visits of the Buddha (Ch. 1)
     - Prince Vijaya's Exile & Landing (Ch. 6–7)
     - Arhat Mahinda's Dhamma Mission (Ch. 12–14)
     - Voyage of the Sacred Jaya Śrī Mahā Bodhi (Ch. 18–19)
     - King Duṭṭhagāmaṇi's Unification Campaign (Ch. 24–25)
     - Vaṭṭagāmaṇi's Exile & the Written Tipiṭaka (Ch. 33)

2. **37-Chapter Multi-Track Timeline (`37-Ch. Timeline`)**
   - Filter by **6 historical eras** and **6 thematic tracks** (*Dhamma & Sangha*, *Monarchy & State*, *Wars & Campaigns*, *Stūpas & Tanks*, *Envoys & Trade*, *Myth & Legend*).
   - Visualizes chapter verse counts, narrative arcs, and key dated events.

3. **Dynastic & Relationship Knowledge Graph (`Lineage Graph`)**
   - Era-columned interactive SVG graph of **39 key figures** and **42 relational links** (parentage, royal succession, marriage, battles, mentorship, envoys, and warrior loyalty).
   - Click any node to highlight its connections, inspect patronized monuments, and jump directly to linked chapters.

4. **Chapter Reader & JSON Export (`Chapter Reader`)**
   - Full searchable index of all 37 chapters with Pāli titles, verse counts, Geiger quotes, events, linked places, characters, and monuments.
   - One-click **Export JSON** button in the header to download the complete structured dataset for external tools (QGIS, Neo4j, StoryMapJS, TimelineJS, etc.).

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Project Structure & Extending to the Cūḷavaṃsa

```text
schema/
  chronicle.schema.json   # JSON Schema for validating Mahāvaṃsa & Cūḷavaṃsa data
src/
  types/chronicle.ts      # TypeScript interfaces (supports chronicle: 'mahavamsa' | 'culavamsa')
  data/
    eras.ts               # 6 historical eras
    places.ts             # 31 geocoded ancient & modern sites
    characters.ts         # 39 historical figures + 42 dynastic/story relations
    monuments.ts          # 14 iconic stupas, viharas, and irrigation tanks
    journeys.ts           # 6 multi-stop geographic routes
    chaptersPart1.ts      # Chapters 1–19
    chaptersPart2.ts      # Chapters 20–37
    index.ts              # Unified dataset & lookup maps
  components/
    GeoTimelineMap.tsx
    LineageGraph.tsx
    MultiTrackTimeline.tsx
    ChapterExplorer.tsx
```

To extend into the **Cūḷavaṃsa**:
1. Add new era definitions in `src/data/eras.ts` (e.g., Polonnaruwa Period, Parākramabāhu I, Kandyan Kingdom).
2. Add new places, monarchs, monuments, and journeys in `places.ts`, `characters.ts`, `monuments.ts`, and `journeys.ts`.
3. Create `src/data/culavamsaChapters.ts` with `chronicle: 'culavamsa'` and append it to `CHAPTERS` in `src/data/index.ts`.
