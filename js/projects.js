// Curated from public repository READMEs and the supplied CV, November 2026.
// No API requests or credentials are needed at runtime.
const PROJECTS = [
  {
    "id": "voltforge",
    "title": "VoltForge",
    "category": "agents",
    "type": [
      "Agentic engineering",
      "Ingénierie agentique"
    ],
    "visual": "volt",
    "repo": "Pyspice-Openfoam-agent",
    "tags": [
      "LangGraph",
      "SPICE",
      "OpenFOAM"
    ],
    "summary": [
      "From a design specification to a simulated power converter. AI coordinates. Physics does the calculations.",
      "D’une spécification à un convertisseur simulé. L’IA orchestre, la physique calcule."
    ],
    "challenge": [
      "Power converter design spans component selection, electrical behavior, control stability, and heat. Those steps need reproducible calculations and evidence, even when an AI agent coordinates the workflow.",
      "La conception d’un convertisseur relie composants, comportement électrique, stabilité et thermique. Chaque étape doit rester reproductible et fondée sur des calculs."
    ],
    "approach": [
      "Built a LangGraph agent over deterministic engineering tools: analytical sizing, catalog-based component selection, ngspice transients, Type III control analysis, OpenFOAM heat-flow simulation, and NSGA-II optimization. A versioned request and validation report keep requirements and evidence connected.",
      "Un agent LangGraph orchestre le dimensionnement, la sélection de composants, ngspice, l’analyse de contrôle, OpenFOAM et l’optimisation NSGA-II. Un rapport relie chaque exigence aux résultats."
    ],
    "outcome": [
      "The repository reports 0.22 percentage-point mean absolute efficiency error against 17 matched loads on a TI LM27402 buck evaluation board. The workspace includes a CLI, Streamlit UI, and downloadable run artifacts.",
      "Le dépôt rapporte une erreur absolue moyenne de rendement de 0,22 point sur 17 charges d’une carte TI LM27402. CLI, interface Streamlit et artefacts téléchargeables complètent le système."
    ],
    "scope": [
      "That result applies to the buck efficiency comparison. Boost hardware validation and thermal validation remain open; the buck-boost comparison has a documented residual error.",
      "Ce résultat concerne le rendement du buck. La validation matérielle du boost et la validation thermique restent ouvertes ; un écart est documenté pour le buck-boost."
    ]
  },
  {
    "id": "playora",
    "title": "Playora",
    "category": "interfaces",
    "type": [
      "Accessible gaming",
      "Jeu accessible"
    ],
    "visual": "playora",
    "repo": "CODEX-Hackathon-2026",
    "tags": [
      "React",
      "Voice AI",
      "Game state"
    ],
    "summary": [
      "A voice-first game library designed around blind and low-vision play. Five games, one accessible companion.",
      "Une ludothèque vocale pour les personnes aveugles et malvoyantes. Cinq jeux, un compagnon accessible."
    ],
    "challenge": [
      "A useful gaming companion must understand turns, legal actions, and what information a player is allowed to know. Reading interface text aloud is only part of the problem.",
      "Un compagnon de jeu doit comprendre les tours, les actions légales et les informations accessibles au joueur. Lire l’interface à voix haute ne suffit pas."
    ],
    "approach": [
      "Integrated Chess, Loups-Garous, Ludo, The Intercept, and Tic-Tac-Toe with shared voice routing and narration. Spoken or typed intent reaches validated game actions; the game rules remain authoritative. The interface also supports visual play.",
      "Cinq jeux réunis autour de commandes vocales et d’une narration partagées. Les intentions vocales ou écrites passent par les règles du jeu, avec une interface visuelle complémentaire."
    ],
    "outcome": [
      "A playable browser prototype with five distinct interaction models, local saves for browser games, and player-scoped guidance for Loups-Garous. The original hackathon work is listed as an OpenAI DevDay top 4 finalist in my CV.",
      "Un prototype jouable dans le navigateur, avec sauvegardes locales et guidage adapté au joueur. Le projet initial figure parmi les quatre finalistes OpenAI DevDay dans mon CV."
    ],
    "scope": [
      "Live voice depends on browser, microphone, and provider availability. The server-managed game currently uses process-local storage.",
      "La voix en direct dépend du navigateur, du microphone et du fournisseur. Le jeu géré côté serveur utilise actuellement un stockage en mémoire."
    ]
  },
  {
    "id": "finance",
    "title": "Financial Agentic System",
    "category": "agents",
    "type": [
      "Evidence-grounded reasoning",
      "Raisonnement fondé sur les sources"
    ],
    "visual": "finance",
    "repo": "Financial_Agentic_System",
    "tags": [
      "LangGraph",
      "Neo4j",
      "pgvector"
    ],
    "summary": [
      "Graph and vector retrieval working together to answer financial questions with traceable evidence.",
      "Recherche sur graphes et vecteurs pour répondre aux questions financières avec des sources traçables."
    ],
    "challenge": [
      "Financial questions often mix structured figures with narrative evidence. Retrieval, computation, and synthesis need to agree on the company and the source.",
      "Les questions financières combinent chiffres structurés et textes. Recherche, calcul et synthèse doivent rester alignés sur l’entreprise et les sources."
    ],
    "approach": [
      "Built FinQA ingestion into Neo4j and pgvector, parallel graph/vector/table retrieval in LangGraph, human approval gates, sandboxed computation, and an audit ledger. A validator rejects generated numbers absent from the retrieved evidence.",
      "Ingestion FinQA dans Neo4j et pgvector, recherche parallèle, validations humaines, calcul isolé et journal d’audit. Un validateur rejette les chiffres absents des sources."
    ],
    "outcome": [
      "The documented dev-100 benchmark reports 52% execution accuracy and 89.4% Recall@5. The project includes a FastAPI gateway, streaming responses, and a Streamlit workbench.",
      "Le benchmark dev-100 documenté rapporte 52 % de précision d’exécution et 89,4 % de Recall@5. Le projet inclut FastAPI, des réponses en streaming et un atelier Streamlit."
    ],
    "scope": [
      "These are development-set results, not a production performance guarantee. The repository documents remaining API authentication and rate-limiting work.",
      "Ces résultats concernent un jeu de développement. Le dépôt documente les travaux restants sur l’authentification API et les limites de débit."
    ]
  },
  {
    "id": "vision",
    "title": "When vision models don’t look",
    "titleFr": "Quand les modèles ne regardent pas",
    "category": "research",
    "type": [
      "Multimodal research",
      "Recherche multimodale"
    ],
    "visual": "vision",
    "repo": "Multimodal-fusion-remote-sensing",
    "tags": [
      "Qwen2.5-VL",
      "InternVL",
      "LoRA"
    ],
    "summary": [
      "Testing whether vision-language models actually use satellite imagery, or lean on the language around it.",
      "Les modèles utilisent-ils vraiment les images satellites, ou surtout le texte qui les accompagne ?"
    ],
    "challenge": [
      "Strong aggregate scores can hide a weak reliance on images. I investigated whether models use visual information when optical and SAR imagery are paired.",
      "De bons scores globaux peuvent masquer une faible utilisation des images. J’ai étudié ce phénomène sur des paires d’images optiques et SAR."
    ],
    "approach": [
      "Curated 19,995 remote-sensing examples, fine-tuned Qwen2.5-VL-7B and InternVL3.5-8B with LoRA, then examined modality importance, counterfactual swaps, attention, unimodal comparisons, and hidden-state probes.",
      "Création de 19 995 exemples, adaptation LoRA de Qwen2.5-VL-7B et InternVL3.5-8B, puis ablations, échanges contrefactuels, attention, comparaisons unimodales et sondes internes."
    ],
    "outcome": [
      "In the paired optical+SAR experiments, the models encoded image information but relied heavily on text at decision time. Language-side LoRA with a frozen vision encoder reinforced text dominance in this setup.",
      "Dans les expériences optique+SAR, les modèles encodent les images mais s’appuient fortement sur le texte. Le LoRA côté langage avec encodeur visuel gelé renforce ce biais."
    ],
    "scope": [
      "The finding is specific to the documented models, dataset, paired tasks, and training setup. It is not a claim about all vision-language models.",
      "Ce constat est propre aux modèles, données, tâches et méthodes documentés. Il ne concerne pas tous les modèles vision-langage."
    ]
  },
  {
    "id": "feedintel",
    "title": "FeedIntel",
    "category": "agents",
    "type": [
      "Social video intelligence",
      "Analyse de vidéos sociales"
    ],
    "visual": "feed",
    "repo": "Hackathon-FEED-AI",
    "tags": [
      "Node.js",
      "Structured AI",
      "Supabase"
    ],
    "summary": [
      "From social video evidence to competitor comparisons, calculated KPIs, and structured reports.",
      "Des sources vidéo aux comparaisons concurrentielles, indicateurs calculés et rapports structurés."
    ],
    "challenge": [
      "Social analysis needs a clear boundary between calculated metrics, model interpretation, and the actual evidence available in a bounded sample.",
      "L’analyse sociale doit distinguer les indicateurs calculés, l’interprétation du modèle et les preuves disponibles dans un échantillon limité."
    ],
    "approach": [
      "Implemented Competitor Spy and Trend Detector workflows: retrieve videos, normalize and deduplicate records, calculate KPIs, validate structured AI interpretations against evidence IDs, and save reports and history. Provider selection supports OpenAI, Claude, or a Lovable bridge.",
      "Deux parcours : comparaison concurrentielle et détection thématique. Collecte, normalisation, déduplication, calcul des indicateurs, validation des références et sauvegarde des rapports. Plusieurs fournisseurs IA sont pris en charge."
    ],
    "outcome": [
      "A hackathon MVP with a connected frontend and Node/Supabase Edge backend. Missing metrics stay explicitly unavailable, and completed reports retain the evidence snapshot used to produce them.",
      "Un MVP de hackathon avec interface et backend Node/Supabase Edge. Les métriques manquantes sont signalées et chaque rapport conserve ses sources."
    ],
    "scope": [
      "The sample is caption/transcript search, not an exhaustive brand audit. Demo fixtures are fictional; full live-provider acceptance is separately documented in the repository.",
      "L’échantillon repose sur la recherche textuelle, pas sur un audit exhaustif. Les données de démonstration sont fictives ; la validation complète des services est documentée séparément."
    ]
  },
  {
    "id": "spatialforge",
    "title": "SpatialForge",
    "category": "interfaces",
    "type": [
      "Spatial interaction",
      "Interaction spatiale"
    ],
    "visual": "spatial",
    "repo": "spatialforge-ai",
    "tags": [
      "Three.js",
      "Hand tracking",
      "Voice guidance"
    ],
    "summary": [
      "A hands-on 3D assembly workbench with camera gestures, guided corrections, and step-aware placement.",
      "Un atelier d’assemblage 3D avec gestes caméra, corrections guidées et placement sensible aux étapes."
    ],
    "challenge": [
      "Assembly guidance needs to explain not only where a part goes, but whether it is the right part, correctly rotated, and ready to be placed.",
      "Le guidage doit vérifier la bonne pièce, son orientation et les prérequis avant le placement."
    ],
    "approach": [
      "Built a browser workbench for a precision tray and a small valve assembly. Mouse, touch, and camera hand tracking share placement rules. A co-pilot gives captioned and spoken corrections when a target, prerequisite, or rotation is wrong.",
      "Atelier web avec plateau de formes et assemblage de valve. Souris, tactile et suivi des mains partagent les règles. Un copilote explique les erreurs par texte et voix."
    ],
    "outcome": [
      "Two interactive scenarios, scenario-specific run records, and a camera pass-through mode with pinch-to-place interaction. Local browser storage keeps the core demo usable without optional services.",
      "Deux scénarios interactifs, des historiques par scénario et un mode caméra avec placement par pincement. Le stockage local permet une démonstration autonome."
    ],
    "scope": [
      "The camera experience is a screen-locked overlay. Room anchoring, physical-part vision verification, and PDF scene compilation are future phases.",
      "L’expérience caméra est une surcouche liée à l’écran. L’ancrage spatial, la vérification de pièces réelles et la compilation de scènes PDF restent à venir."
    ]
  }
];
const ARCHIVE = [
  [
    "Transformer from scratch",
    "Transformer_From_Scratch"
  ],
  [
    "Vision Transformer in PyTorch",
    "Vision_Transformer_VIT_using_PYTORCH"
  ],
  [
    "PaliGemma-style VLM from scratch",
    "Multimodal_Vision_Language_Model-from-SCRATCH"
  ],
  [
    "LLaMA 2 from scratch",
    "LLaMa2-from-Scratch"
  ],
  [
    "Mistral 7B · QLoRA fine-tuning",
    "Mistral-7B_Q-Lora-Finetuning"
  ],
  [
    "LLM alignment · PPO & DPO",
    "LLM_Allignment_RLHF_PPO_DPO"
  ],
  [
    "JAX for language models",
    "JAX_for_LLMs"
  ],
  [
    "GAN augmentation & style transfer",
    "GAN-Based-Data-Augmentation-Style-Transfer-"
  ],
  [
    "3D reconstruction · research review",
    "3D-Reconstruction-of-Scenes-from-2-D-Images-Review-"
  ],
  [
    "Plant disease detection & robotics",
    "AI-BASED-PLANT-MONITORING-SYSTEM-FOR-IDENTIFICATION-OF-DISEASES-USING-CDPR--ROBOT"
  ],
  [
    "Multivariate time-series experiments",
    "Multivariate_TimeSeries_Projects"
  ],
  [
    "Salome shopping",
    "salome-shopping"
  ]
];

ARCHIVE.push(...[["Multimodal Text-Guided Video Segment Search", "https://drive.google.com/file/d/1Pz9uQqEWDwjb5EReomyPzCTNwjDvY51B/view?usp=sharing"], ["Learning Arithmetic Operations Using Small-LLM With Reinforcement Learning", "https://drive.google.com/file/d/1JbpeV45Io5IMmo0qYKSirM0mBkdb5ywK/view?usp=sharing"], ["Event Cameras", "https://drive.google.com/file/d/1bFuA3TWeyZ_KRN4FQ_nAXdh9kpqAkSZy/view?usp=sharing"], ["Extended Reality – Towers of Hanoi", "https://drive.google.com/file/d/1Vehugvzvau7yUOpUkO5un_y3kr6BEZ2F/view?usp=sharing"], ["Continual Learning for Multi-Image Classification", "https://drive.google.com/file/d/1lzg1l-slupE-8bAPgTY7fRiQzg1H4upy/view?usp=sharing"], ["GAN vs VAE", "https://drive.google.com/file/d/1RoyxWfZkmpQvm0LbT285DxwZ1pCPhsjC/view?usp=sharing"]]);

ARCHIVE.push(["Graph learning for network anomaly detection \u00b7 Orange", "https://drive.google.com/file/d/1e9IQRd-5p9qpItNWWbcWwtw6fYggAEKN/view?usp=sharing"]);
ARCHIVE.push(["Retrieval-augmented generation with LangChain", "RAG-with-langchain"]);
ARCHIVE.push(["VoltForge / PySpice–OpenFOAM · technical report", "https://drive.google.com/file/d/1ni5R_GQEHTGwS3s5hsOFTjS3VWK2OwIO/view?usp=sharing"]);
