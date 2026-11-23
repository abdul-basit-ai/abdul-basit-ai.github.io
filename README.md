# Abdul Basit — portfolio

A buildless, responsive portfolio for GitHub Pages. No install, API keys, backend, or build step is required.

Run locally from the repository root:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080. The site can also be opened directly from index.html; clipboard support depends on browser security settings.

## Editing

- `index.html`: page structure and English/French page copy.
- `css/style.css`: layout, visual system, and responsive styles.
- `js/projects.js`: six selected case studies and the research archive. Paired strings contain English first, French second.
- `js/script.js`: filters, accessible native project dialogs, navigation, language persistence, copy email, and the Canvas point-cloud experiment.
- `Abdul_Basit_CV-en.pdf` and `Abdul_Basit_CV-fr.pdf`: language-specific downloads.

The existing `.nojekyll` keeps this compatible with direct GitHub Pages publishing. This redesign does not change hosting configuration or automatically publish changes.

## Content provenance

Project descriptions were curated from these public READMEs in November 2026:

- [VoltForge / PySpice–OpenFOAM Agent](https://github.com/abdul-basit-ai/Pyspice-Openfoam-agent)
- [Playora](https://github.com/abdul-basit-ai/CODEX-Hackathon-2026)
- [SpatialForge](https://github.com/abdul-basit-ai/spatialforge-ai)
- [Financial Agentic System](https://github.com/abdul-basit-ai/Financial_Agentic_System)
- [Multimodal Fusion for Remote Sensing](https://github.com/abdul-basit-ai/Multimodal-fusion-remote-sensing)
- [FeedIntel](https://github.com/abdul-basit-ai/Hackathon-FEED-AI)

Hackathon participation and the OpenAI DevDay top-four finalist placement come from the supplied English CV. No new placements or awards were inferred. Case studies preserve meaningful validation limits from the READMEs. The project artwork is an original schematic illustration, not a screenshot or live benchmark. Private repository contents are not included.

The opening section introduces Abdul personally. Education and experience use the supplied CVs, with the IBISC lab affiliation supplied directly by Abdul. Dates and article titles in the writing section come from the public [Medium RSS feed](https://medium.com/feed/@basitmal36). Article titles remain in their original English; navigation, dates, and interface copy support English and French. The point-cloud experiment lives in the lab.

## Accessibility and performance

Native dialogs provide keyboard focus containment and Escape-to-close behavior. Filters and shape controls expose pressed state. Mobile navigation exposes expanded state. The hero respects reduced-motion preferences, has a pause control, caps pixel density, and suspends animation offscreen and in background tabs. Fonts fall back to system fonts if Google Fonts is unavailable. No tracking or runtime GitHub API calls are used.

Verified in headless Chrome at 360, 390, 768, 1024, and 1440 pixels in English and French: no horizontal overflow, all six dialogs and Escape behavior, filters, shape selection, pause, language persistence, mobile navigation, reduced motion, and successful local asset/CV responses. Desktop and mobile screenshots were visually reviewed.
