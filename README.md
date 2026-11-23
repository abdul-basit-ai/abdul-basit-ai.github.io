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
- `css/first-impression.css`: illustrated opening, project previews, Pip, and journey styling.
- `css/network-story.css` and `js/network-story.js`: the interactive Orange research story.
- `js/bird-flight.js`: brief arrival flight and scroll-triggered flights between perches.
- `js/projects.js`: six selected case studies and the research archive. Paired strings contain English first, French second.
- `js/script.js`: filters, accessible native project dialogs, navigation, language persistence, copy email, the Canvas point-cloud experiment, and Pip’s optional interactions.
- `images/curiosity-landscape.webp`: original generated illustration, compressed to 137,520 bytes.
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

The opening section introduces Abdul personally, states his search for a first full-time AI/ML role, and offers three project previews. The full projects section precedes the journey. Education and experience use the supplied CVs, with the IBISC lab affiliation supplied directly by Abdul. Dates and article titles in the writing section come from the public [Medium RSS feed](https://medium.com/feed/@basitmal36). Article titles remain in their original English; navigation, dates, and interface copy support English and French. The point-cloud experiment lives in the lab.

The illustrated setting is original, inspired by the personal atmosphere of the supplied portfolio reference. Pip is an inline SVG bird. Eye movement responds only to pointer events inside the illustration; hopping is brief and input-triggered. Pip flies in on load, then makes short flights between perches when scrolling changes the active section. These flights use one temporary SVG overlay and the Web Animations API; wing animation stops when that overlay is removed. Reduced motion disables flight. Sound requires an explicit “Hear a chirp” action and is synthesized locally. Pip can also open a project case study. There is no autoplay audio, remote audio asset, extra animation library, or persistent hero animation loop.

## Orange research story

The feature after the opening previews is grounded in Abdul’s [Orange internship report](https://drive.google.com/file/d/1e9IQRd-5p9qpItNWWbcWwtw6fYggAEKN/view), especially sections 3.4.3 (synthetic anomalies and propagation), 3.6 (contributions), and 4.1 (temporal results). It explains directed traffic dependencies, user displacement, overload, and self-supervised ANEMONE/GATv2 detection. The reported 0.963 AUROC is for the five-day temporal model on the synthetic anomaly test set; it is not accuracy or evidence of a deployed controller.

All five-site diagram loads are explicitly illustrative. The final capacity-aware routing step is an exploratory extension, not an evaluated result from the report. It allocates 64 reconnecting users in proportion to spare capacity across four neighbours; the 16 initial disconnections remain. Story playback is user-started, ends after one pass, and stops when the feature leaves the viewport or the tab is hidden. No operational data, model inference, or network requests run in the browser.

The opening previews are Financial Agent, VoltForge, and Playora. SpatialForge remains in the full project gallery, at the end. Article summaries are grounded in the public RSS article text.

## Accessibility and performance

Native dialogs provide keyboard focus containment and Escape-to-close behavior. Filters and shape controls expose pressed state. Mobile navigation exposes expanded state. The hero respects reduced-motion preferences, has a pause control, caps pixel density, and suspends animation offscreen and in background tabs. Fonts fall back to system fonts if Google Fonts is unavailable. No tracking or runtime GitHub API calls are used.

Verified in headless Chrome at 360, 390, 768, 1024, and 1440 pixels in English and French: no horizontal overflow, all six dialogs and Escape behavior, filters, shape selection, pause, language persistence, mobile navigation, reduced motion, and successful local asset/CV responses. Desktop and mobile screenshots were visually reviewed.

The revised opening was also checked for project-preview visibility at 1440×900, zero idle animation-frame requests, keyboard operation and focus restoration for Pip, reduced-motion behavior, and a bird menu contained within the mobile viewport.
