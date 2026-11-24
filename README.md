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
- `css/plant-story.css` and `js/plant-story.js`: the plant-monitoring journey from data through Raspberry Pi deployment and CDPR integration.
- `css/project-workflows.css` and `js/project-workflows.js`: exclusive hover/focus workflow previews in Selected Work.
- `js/bird-flight.js`: one brief arrival flight; Pip then stays on the hero illustration.
- `js/projects.js`: six selected case studies and the research archive. Paired strings contain English first, French second.
- `js/script.js`: filters, accessible native project dialogs, navigation, language persistence, copy email, and Pip’s optional interactions.
- `css/learning-playground.css` and `js/learning-playground.js`: the interactive nearest-neighbour classifier in The Curiosity Corner.
- `images/curiosity-landscape.webp`: original generated illustration, compressed to 137,520 bytes.
- `images/projects/plant-cdpr-hardware.jpg`: the actual prototype photograph extracted from Figure 2.5 of the supplied defense report.
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

The opening section introduces Abdul personally, states his search for a first full-time AI/ML role, and offers three project previews. Selected Work is followed immediately by the Edge AI/CDPR story, then the journey. Education and experience use the supplied CVs, with the IBISC lab affiliation supplied directly by Abdul. Dates and article titles in the writing section come from the public [Medium RSS feed](https://medium.com/feed/@basitmal36). Article titles remain in their original English; navigation, dates, and interface copy support English and French. The Curiosity Corner follows writing; hackathons remain in the lab. The header links to [Abdul on X](https://x.com/basit_view) immediately after Writing. A small bilingual footer date records the latest site update; update its text and `datetime` when publishing changes.

The illustrated setting is original, inspired by the personal atmosphere of the supplied portfolio reference. Pip is an inline SVG bird. Eye movement responds only to pointer events inside the illustration; hopping is brief and input-triggered. Pip flies in once on load, lands on the illustration, and opens its options without moving keyboard focus. It stays in that position as the page scrolls. The arrival uses one temporary SVG overlay and the Web Animations API; wing animation stops when the overlay is removed. Reduced motion skips the flight. Sound requires an explicit “Hear a chirp” action and is synthesized locally. Pip can also open a project case study. There is no autoplay audio, remote audio asset, extra animation library, or persistent hero animation loop.

## Orange research story

The feature after the opening previews is grounded in Abdul’s [Orange internship report](https://drive.google.com/file/d/1e9IQRd-5p9qpItNWWbcWwtw6fYggAEKN/view), especially sections 3.4.3 (synthetic anomalies and propagation), 3.6 (contributions), and 4.1 (temporal results). It explains directed traffic dependencies, user displacement, overload, and self-supervised ANEMONE/GATv2 detection. The reported 0.963 AUROC is for the five-day temporal model on the synthetic anomaly test set; it is not accuracy or evidence of a deployed controller.

All five-site diagram loads are explicitly illustrative. The final capacity-aware routing step is an exploratory extension, not an evaluated result from the report. It allocates 64 reconnecting users in proportion to spare capacity across four neighbours; the 16 initial disconnections remain. The story plays automatically when at least a quarter of the diagram is visible, advances every 2.4 seconds, and loops. Selecting a step pauses on that state until Play is chosen. Playback pauses offscreen, while the tab is hidden, or behind a project dialog. Reduced motion defaults to manual playback. Automatically changing narration does not generate repeated screen-reader announcements. No operational data, model inference, or network requests run in the browser.

The opening previews are Financial Agent, VoltForge, and Playora. SpatialForge remains in the full project gallery, at the end. Article summaries are grounded in the public RSS article text.

## Plant monitoring and robotics story

The feature immediately after Selected Work uses the supplied `Final Defense Report.pdf`: pages 27–31 for the 7,200-image / 18-class dataset, preprocessing, deployment flow, and integrated prototype; pages 41–45 for the Raspberry Pi camera and training setup; and Table 4.1 on page 61 for model results. The report itself stays local and is excluded by `.gitignore`. The photograph is extracted unchanged from Figure 2.5. The final-year team is credited as Abdul Basit, Aniqa Firdous, and Abdul Aziz. Joystick-guided robot navigation also uses the supplied CV and Abdul’s account of his work.

The story explains the data pipeline, the CNN building blocks, the device-resource trade-off, TensorFlow Lite inference on Raspberry Pi 4, and camera placement on the CDPR. Compact diagrams replace accuracy charts: a ResNet50 bottleneck (1×1 → 3×3 → 1×1 plus identity skip) and a MobileNet V1 depthwise-separable block (per-channel 3×3 filtering → 1×1 channel mixing). They illustrate representative blocks, omit normalization/activations, and are not full network diagrams or drawn to scale. Architecture references: [ResNet](https://arxiv.org/abs/1512.03385) and [MobileNet V1](https://arxiv.org/abs/1704.04861). The five trained models remain documented in the narrative; the deployment step explains the MobileNet-family choice without score callouts. No field-accuracy or device-latency claim is made. Like the Orange feature, it autoplays while visible and allows manual selection, pause/resume, reset, and reduced motion. Illustrated scenes are labelled as such.

## The Curiosity Corner

The playground starts in Ask the model mode, including after reset, so moving over or tapping the board tests a point without adding examples. Visitors can switch to adding Mint and Plum examples to the decision map and choose how many neighbours vote. The answer, highlighted neighbours, and map come from a real nearest-neighbour classifier running locally. Undo and reset make exploration reversible. Mouse, touch, and arrow keys plus Enter/Space are supported, with English/French controls and screen-reader announcements for explicit actions.

The board starts with 16 toy examples and allows up to 64. A cached 128×96 decision field redraws only when data, neighbour count, or board size changes. Pointer updates are coalesced into individual animation frames; there is no idle animation loop. Pixel density is capped at 2, and drawing stops offscreen or in a hidden tab. Examples are not uploaded or persisted.

## Using a custom domain with GitHub Pages

GitHub Pages can keep hosting the site while a domain you own is displayed in the address bar. See [GitHub’s custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

Once a domain such as `abdulbasit.com` is registered to you:

1. Add the owned domain in this repository’s Settings → Pages → Custom domain.
2. At the DNS provider, set apex (`@`) A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153` (or use a supported ALIAS/ANAME to `abdul-basit-ai.github.io`).
3. Point `www` using a CNAME to `abdul-basit-ai.github.io`.
4. Complete domain verification and enable Enforce HTTPS when GitHub makes it available. Update canonical/Open Graph URLs after the domain works.

The domain is not currently owned or connected; the existing GitHub Pages address and hosting configuration remain active.

## Accessibility and performance

Native dialogs provide keyboard focus containment and Escape-to-close behavior. Filters and learning modes expose pressed state. Mobile navigation exposes expanded state. Pip respects reduced-motion preferences, and the two story animations offer pause controls and stop offscreen or in background tabs. Fonts fall back to system fonts if Google Fonts is unavailable. No tracking or runtime GitHub API calls are used.

Verified in headless Chrome at 360, 390, 768, 1024, and 1440 pixels in English and French: no horizontal overflow, project dialogs and Escape behavior, filters, language persistence, mobile navigation, reduced motion, and successful local asset/CV responses. The learning playground was checked for adding examples, changing predictions with neighbour count, query mode, undo/reset, keyboard and touch input, and no idle animation loop. Section order and the footer update date were also checked. Desktop and mobile screenshots were visually reviewed.

The revised opening was also checked for project-preview visibility at 1440×900, zero idle animation-frame requests, keyboard operation and focus restoration for Pip, reduced-motion behavior, and a bird menu contained within the mobile viewport.

The latest interaction checks verify a single arrival flight with options, no scroll flights, visible-only autoplay and looping, manual selection holding its state, pause/resume/reset, and the lab appearing before writing, at ten combinations of language and viewport width.

Each Selected Work illustration has a project-specific workflow preview. A pointer hover or visible keyboard focus activates one card at a time, with pointer hover taking priority. Leaving the card, opening a dialog, scrolling it offscreen, or hiding the tab stops its animations. The effects use CSS rather than a JavaScript animation loop, honor reduced motion, and are decorative illustrations rather than live model execution. Touch still opens the case study directly. The six previews, exclusive activation, keyboard/pointer switching, filter and language updates, offscreen stopping, reduced motion, and mobile tap behavior were checked in Chrome.
