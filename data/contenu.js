/* Contenu du site v2.6 (9 novembre 2026). Repris de la v2.3.
   Le parcours est rangé du plus ancien au plus récent (l’ordre du tableau fait foi, comme la frise du PDF) ;
   les périodes figurent uniquement dans l’en-tête des fiches. « bulle » : titre seul des bulles de la spirale et du sommaire.
   « important » : six éléments mis en avant par une teinte plus foncée.
   « apportCourt » : phrase courte affichée sous le résumé (ce qu’Alain apporte) ; « transfert » reste la source, sans affichage.
   « pistes.metiers » : postes visés de la page #/metiers, chacun avec sa justification et ses fiches de preuve.
   « entier: true » sur un média : vignette affichée en entier (document, carte), jamais rognée.
   Les fiches de type « formation » forment l’onglet « Savoir - formations », hors spirale.
   « alias » : anciennes fiches redirigées (Responsable soins adjoint fusionné dans thermes-responsable).
   « retirees » : fiches supprimées en v2.2 (Enfance, Adolescence), redirigées vers le parcours.
   Ajouter une photo : déposer un fichier WebP dans assets/photos/ puis ajouter à la fiche
   galerie: [{src: "assets/photos/nom.webp", alt: "Description précise", legende: "Texte visible"}]
   Une vidéo : {video: "assets/videos/nom.mp4", poster: "assets/videos/nom.webp", alt: "…", legende: "…"}
   Une fiche sans média n'affiche aucune galerie. */
/* v2.7 : « liens » sur une formation = poste ou stage pendant lequel elle a été suivie (carte des liens du site et du PDF). */
/* v2.8 : compétence « creations-ia » en tête (ce qui est créé avec l’IA) ; familles d’outils IA, développement et création rattachées. */
/* v2.5 : périodes issues du parcours consolidé ; affichage dans l’en-tête des fiches uniquement. */
window.CV = {
  "identite": {
    "nom": "Alain Ferro",
    "accroche": "Administration, coordination et relation clients",
    "promesse": "Dix ans d’encadrement d’équipes aux Thermes de Balaruc-les-Bains, sept ans à la tête d’une activité de négoce et un titre professionnel de Comptable assistant : mon parcours associe organisation, relation clients et rigueur administrative, avec une pratique d’Excel avancé (Tosa 850 / 1000).\nJ’orchestre aujourd’hui des assistants IA pour mener des projets complets, du cadrage au contrôle des résultats : applications, sites, logiciel Windows et créations pour la simulation de vol, avec des consignes écrites, des rôles répartis et un suivi de versions.\nPilote virtuel depuis plus de vingt ans, je prépare mes vols comme dans la réalité : plan de vol, météo, lecture des cartes et navigation, puis pilotage d’Airbus, de Boeing et d’avions légers. Cette passion m’a appris à maîtriser des systèmes avioniques complexes, à suivre des procédures et à garder une méthode rigoureuse.",
    "ville": "Poussan (34560)",
    "email": "alainferro34@gmail.com",
    "telephone": "06 12 76 10 12",
    "telephoneLien": "+33612761012",
    "permis": "Permis B et véhicule · permis bateau côtier",
    "langues": "Français courant · Anglais A1",
    "portrait": {
      "src": "assets/portrait-480.webp",
      "srcPetit": "assets/portrait-240.webp",
      "alt": "Portrait d’Alain Ferro, souriant, chemise bleu clair"
    },
    "cvPdf": "./CV-Interactif-Alain-FERRO.pdf?v=2.43.0",
    "mail": {
      "objet": "Proposition d’entretien",
      "corps": "Bonjour Monsieur Ferro,\n\nVotre CV a retenu toute notre attention et nous souhaiterions vous rencontrer pour un entretien.\n\nPourriez-vous nous indiquer vos disponibilités ? Nous reviendrons vers vous pour fixer la date, en présentiel ou par téléphone.\n\nCordialement,"
    }
  },
  "pistes": {
    "titre": "Postes visés",
    "metiers": [
      {
        "id": "coordinateur-administratif",
        "titre": "Coordinateur administratif",
        "justification": "Planification des équipes et gestion quotidienne d’une activité de négoce.",
        "preuves": [
          "thermes-responsable",
          "negoce",
          "keyce"
        ]
      },
      {
        "id": "assistant-administratif",
        "titre": "Assistant administratif",
        "justification": "Suivi des dossiers, circulation de l’information et classement des documents.",
        "preuves": [
          "thermes-responsable",
          "ged-gmao",
          "titre-comptable"
        ]
      },
      {
        "id": "assistant-gestion",
        "titre": "Assistant de gestion",
        "justification": "Gestion des achats, stocks, commandes et factures avec EBP.",
        "preuves": [
          "negoce",
          "titre-comptable",
          "tosa"
        ]
      },
      {
        "id": "assistant-comptable",
        "titre": "Assistant comptable (junior)",
        "justification": "Titre professionnel et pratique en cabinet : saisie, rapprochements, lettrage.",
        "preuves": [
          "titre-comptable",
          "stage-cecosud",
          "stage-audit"
        ]
      },
      {
        "id": "assistant-commercial-adv",
        "titre": "Assistant commercial / ADV",
        "justification": "Prospection B2B et suivi des commandes jusqu’à la facturation.",
        "preuves": [
          "negoce",
          "pailletrice",
          "courtier"
        ]
      },
      {
        "id": "charge-relation-clients",
        "titre": "Chargé de relation clients",
        "justification": "Accueil, conseil et suivi des clients dans les services et le commerce.",
        "preuves": [
          "immobilier",
          "thermes-agent",
          "londres",
          "skiman"
        ]
      },
      {
        "id": "coordinateur-planning",
        "titre": "Coordinateur planning",
        "justification": "Organisation des plannings d’une équipe de 30 à 40 personnes.",
        "preuves": [
          "thermes-responsable",
          "keyce"
        ]
      },
      {
        "id": "assistant-rh",
        "titre": "Assistant RH (appui administratif)",
        "justification": "Appui aux entretiens, au suivi d’équipe et à la gestion des tensions.",
        "preuves": [
          "thermes-responsable",
          "comtel",
          "keyce"
        ]
      },
      {
        "id": "gestionnaire-dossiers",
        "titre": "Gestionnaire de dossiers",
        "justification": "Suivi des échéances, classement et traçabilité des dossiers.",
        "preuves": [
          "immobilier",
          "ged-gmao",
          "stage-cecosud"
        ]
      },
      {
        "id": "assistant-approvisionnement",
        "titre": "Assistant achats et approvisionnement",
        "justification": "Achats fournisseurs, gestion de stock et organisation des livraisons.",
        "preuves": [
          "negoce"
        ]
      },
      {
        "id": "assistant-gestion-documentaire",
        "titre": "Assistant gestion documentaire",
        "justification": "Classement en GED, traçabilité et documentation des reprises.",
        "preuves": [
          "ged-gmao",
          "thermes-responsable",
          "outils-ia"
        ]
      },
      {
        "id": "developpeur-web-ia",
        "titre": "Développeur web junior assisté par IA",
        "justification": "Applications web conçues et pilotées avec des assistants IA : React, Next.js, Supabase.",
        "preuves": [
          "knockin",
          "barysense",
          "poussepousse",
          "creations-ia"
        ]
      },
      {
        "id": "integrateur-web",
        "titre": "Intégrateur web / no-code",
        "justification": "Sites publiés et services reliés : GitHub Pages, Netlify, paiement Stripe, e-mails Brevo.",
        "preuves": [
          "cv-interactif",
          "skylivra",
          "plateformes"
        ]
      },
      {
        "id": "assistant-chef-projet-numerique",
        "titre": "Assistant chef de projet numérique",
        "justification": "Cadrage des besoins, critères d’acceptation, suivi des versions et coordination de plusieurs assistants IA.",
        "preuves": [
          "skylivra",
          "outils-ia",
          "knockin",
          "barysense"
        ]
      },
      {
        "id": "testeur-recetteur",
        "titre": "Testeur / recetteur logiciel",
        "justification": "Essais de chaque évolution, retours d’usage, tests en vol dans MSFS et contrôles avant publication.",
        "preuves": [
          "cv-interactif",
          "knockin",
          "skylivra",
          "poussepousse"
        ]
      },
      {
        "id": "charge-automatisation",
        "titre": "Chargé d’automatisation IA / Excel",
        "justification": "Outils Excel (Power Query, VBA) et scripts Python ou PowerShell produits puis vérifiés avec l’IA.",
        "preuves": [
          "excel",
          "tosa",
          "outils-ia",
          "creations-ia"
        ]
      },
      {
        "id": "support-utilisateurs",
        "titre": "Support utilisateurs fonctionnel",
        "justification": "Prise en main d’outils, configuration de postes et retours d’usage.",
        "preuves": [
          "thermes-responsable",
          "pc",
          "knockin"
        ]
      }
    ]
  },
  "chiffres": [
    {
      "valeur": "30 à 40",
      "libelle": "agents et kinés encadrés aux Thermes",
      "lien": "#/parcours/thermes-responsable"
    },
    {
      "valeur": "10 ans",
      "libelle": "d’encadrement d’équipes",
      "lien": "#/parcours/thermes-responsable"
    },
    {
      "valeur": "7 ans",
      "libelle": "à la tête d’une activité de négoce",
      "lien": "#/parcours/negoce"
    },
    {
      "valeur": "Orchestration IA",
      "libelle": "5 projets livrés en pilotant des assistants IA",
      "lien": "#/orchestration-ia",
      "fort": true
    },
    {
      "valeur": "850 / 1000",
      "libelle": "Tosa Excel avancé",
      "lien": "#/parcours/tosa"
    }
  ],
  "competences": [
    {
      "id": "creations-ia",
      "titre": "Orchestration IA",
      "sousTitre": "Applications, sites, logiciel Windows, add-ons, médias",
      "resume": "Concevoir des applications, des sites et des outils, les faire réaliser par plusieurs assistants IA coordonnés et vérifier chaque livrable jusqu’au produit utilisé.",
      "detail": [
        "Projets menés avec ChatGPT, Codex, Claude et Claude Code : cadrage fonctionnel, rédaction des consignes, retours d’usage, contrôle des livrables, suivi des versions et documentation.",
        "Orchestration de plusieurs assistants IA en parallèle avec Orca : répartition des tâches, revues croisées et synchronisation par des fichiers de coordination communs.",
        "Bibliothèque de compétences réutilisables (skills) et protocoles communs, pour que chaque assistant applique les mêmes règles d’un projet à l’autre.",
        "Architecture fonctionnelle : découper les projets en modules, préciser leurs interfaces et dépendances, puis coordonner la fabrication, les essais et la documentation.",
        "Une méthode de travail fondée sur des objectifs précis, des corrections successives et la vérification du résultat.",
        "Applications web avec base de données : Knockin ever Door (entreprises, contacts, candidatures et relances), BarySense (cafés, machines, extractions et stock), PoussePousse (plan et suivi d’un potager).",
        "Site marchand SkyLivra : catalogue, panier, paiement Stripe, e-mails Brevo et espace d’administration, hébergé sur Netlify.",
        "Logiciel Windows SkyLivra Manager (Tauri) : installation et mise à jour des créations chez les clients, avec des installateurs Inno Setup.",
        "Créations pour Microsoft Flight Simulator : livrées d’avions (textures et matériaux), add-on d’aurores boréales (effets visuels en C++ / WebAssembly) et outils de vues caméra.",
        "Médias : clips de présentation des livrées, GIF animés, musiques composées avec Suno, visuels générés ou retouchés par IA.",
        "Ce CV interactif : site publié sur GitHub Pages, parcours interactif, carte des liens et PDF relié par QR code.",
        "Automatisations et documents : scripts Python et PowerShell, tableaux Excel, documents Word, PDF et présentations produits puis vérifiés avec l’IA."
      ],
      "preuves": [
        "skylivra",
        "knockin",
        "barysense",
        "outils-ia",
        "simulation"
      ],
      "groupes": [
        {
          "titre": "Méthode",
          "points": [
            "Projets menés avec ChatGPT, Codex, Claude et Claude Code : cadrage fonctionnel, rédaction des consignes, retours d’usage, contrôle des livrables, suivi des versions et documentation.",
            "Orchestration de plusieurs assistants IA en parallèle avec Orca : répartition des tâches, revues croisées et synchronisation par des fichiers de coordination communs.",
            "Bibliothèque de compétences réutilisables (skills) et protocoles communs, pour que chaque assistant applique les mêmes règles d’un projet à l’autre.",
            "Architecture fonctionnelle : découper les projets en modules, préciser leurs interfaces et dépendances, puis coordonner la fabrication, les essais et la documentation.",
            "Une méthode de travail fondée sur des objectifs précis, des corrections successives et la vérification du résultat."
          ]
        },
        {
          "titre": "Réalisations",
          "points": [
            "Applications web avec base de données : Knockin ever Door (entreprises, contacts, candidatures et relances), BarySense (cafés, machines, extractions et stock), PoussePousse (plan et suivi d’un potager).",
            "Site marchand SkyLivra : catalogue, panier, paiement Stripe, e-mails Brevo et espace d’administration, hébergé sur Netlify.",
            "Logiciel Windows SkyLivra Manager (Tauri) : installation et mise à jour des créations chez les clients, avec des installateurs Inno Setup.",
            "Créations pour Microsoft Flight Simulator : livrées d’avions (textures et matériaux), add-on d’aurores boréales (effets visuels en C++ / WebAssembly) et outils de vues caméra.",
            "Médias : clips de présentation des livrées, GIF animés, musiques composées avec Suno, visuels générés ou retouchés par IA.",
            "Ce CV interactif : site publié sur GitHub Pages, parcours interactif, carte des liens et PDF relié par QR code.",
            "Automatisations et documents : scripts Python et PowerShell, tableaux Excel, documents Word, PDF et présentations produits puis vérifiés avec l’IA."
          ]
        }
      ],
      "rubrique": "orchestration-ia"
    },
    {
      "id": "encadrement",
      "titre": "Encadrement d’équipes",
      "sousTitre": "30 à 40 agents et kinésithérapeutes",
      "resume": "Planifier, coordonner, écouter, désamorcer les tensions et accompagner les personnes au quotidien.",
      "detail": [
        "Encadrement direct d’agents de soins et de kinésithérapeutes aux Thermes de Balaruc-les-Bains, d’abord comme adjoint puis comme responsable soins.",
        "Planification de l’activité, coordination quotidienne des soins et accueil des curistes.",
        "Conduite d’entretiens annuels d’évaluation et d’entretiens professionnels (EVA / EP), médiation entre collaborateurs."
      ],
      "preuves": [
        "thermes-responsable",
        "comtel",
        "keyce"
      ]
    },
    {
      "id": "gestion",
      "titre": "Gestion administrative et comptable",
      "sousTitre": "Dossiers, documents, stocks, commandes, factures",
      "resume": "Tenir des dossiers à jour, traiter des pièces, suivre stocks, commandes et facturation, appliquer les bases comptables.",
      "detail": [
        "Sept ans de gestion d’une entreprise de négoce : achats, stocks, commandes, facturation, encaissements et suivi administratif avec EBP Gestion commerciale.",
        "Titre professionnel Comptable assistant (niveau 4), GRETA de Sète.",
        "Deux stages en cabinet comptable : tri et traitement des pièces, saisie d’écritures, rapprochements bancaires, lettrage, appui à la révision.",
        "Gestion documentaire, traçabilité et suivi de maintenance aux Thermes (GED, GMAO, GLPI)."
      ],
      "preuves": [
        "negoce",
        "titre-comptable",
        "stage-cecosud",
        "stage-audit",
        "ged-gmao",
        "thermes-responsable"
      ]
    },
    {
      "id": "relation",
      "titre": "Relation clients et commerce",
      "sousTitre": "Accueil, service, prospection, vente B2B",
      "resume": "Accueillir, conseiller, prospecter et fidéliser, du service en salle à la vente aux professionnels.",
      "detail": [
        "Prospection et vente aux professionnels : vins en alternance, truffes et champignons auprès de la restauration gastronomique, vins auprès des restaurants, bars et épiceries.",
        "Prospection de mandats, recherche de biens et suivi de clientèle dans l’immobilier.",
        "Service et relation clients en restauration à Londres, en environnement anglophone.",
        "Accueil et écoute des curistes aux Thermes."
      ],
      "preuves": [
        "courtier",
        "negoce",
        "pailletrice",
        "immobilier",
        "londres",
        "skiman",
        "thermes-agent"
      ]
    },
    {
      "id": "excel",
      "titre": "Excel avancé et automatisation",
      "sousTitre": "Tosa 850 / 1000 · TCD · Power Query · Power Pivot · VBA",
      "resume": "Construire des tableaux de suivi, croiser des données et automatiser des tâches répétitives.",
      "detail": [
        "Certification Tosa Excel, niveau avancé, score de 850 sur 1000 (GRETA, Sète).",
        "Aux Thermes, conception d’outils Excel, de formulaires et de supports pour faire circuler l’information, en lien avec les services qualité et informatique.",
        "Fonctions utilisées : tableaux croisés dynamiques, Power Query, Power Pivot et VBA."
      ],
      "preuves": [
        "tosa",
        "thermes-responsable",
        "negoce"
      ],
      "galerie": [
        {
          "src": "assets/photos/selection/selection-048.webp",
          "alt": "Tableau de bord Excel de suivi des candidatures",
          "legende": "Tableau de bord Excel de suivi des candidatures"
        }
      ]
    },
    {
      "id": "plateformes",
      "titre": "Git / GitHub et services web",
      "sousTitre": "Supabase · Stripe · Brevo · Git · GitHub · Netlify",
      "resume": "Versionner les projets, organiser leurs données et relier paiement et e-mails : des services pilotés avec l’appui d’assistants IA.",
      "detail": [
        "Git et GitHub : organiser les dépôts, consulter les modifications, suivre les commits et retrouver les versions des projets ; publication de ce site avec GitHub Pages.",
        "Supabase : organisation des données, de l’authentification et du stockage dans SkyLivra et dans l’outil de recherche d’emploi Knockin ever Door.",
        "Stripe : intégration de Checkout et des webhooks pour relier le paiement au traitement des commandes, réalisée par IA sous la direction d’Alain Ferro.",
        "Brevo : modèles, déclencheurs et envoi des e-mails transactionnels du site SkyLivra.",
        "Netlify : hébergement du site SkyLivra et de ses fonctions serveur.",
        "Le code technique est produit par des assistants IA ; le rôle d’Alain Ferro porte sur le cadrage, les consignes, les essais et le contrôle."
      ],
      "preuves": [
        "skylivra",
        "knockin",
        "outils-ia",
        "barysense"
      ]
    },
    {
      "id": "informatique",
      "titre": "Informatique et matériel",
      "sousTitre": "Montage, configuration PC, réseau et périphériques",
      "resume": "Assembler, configurer et mettre en réseau des postes de travail et leurs périphériques.",
      "detail": [
        "Assemblage de deux ordinateurs, dont un poste dédié à la simulation aérienne.",
        "Configuration matérielle et logicielle, postes multi-écrans.",
        "Mise en réseau et paramétrage des périphériques, dont les commandes de vol avec SPAD.neXt."
      ],
      "preuves": [
        "pc"
      ]
    },
    {
      "id": "manuel",
      "titre": "Travaux manuels",
      "sousTitre": "Bois, plomberie, électricité, préparation et chiffrage",
      "resume": "Préparer un chantier, chiffrer les achats et réaliser soi-même avec l’outillage adapté.",
      "detail": [
        "Rénovation d’un bateau en bois de 11 mètres pendant trois ans : menuiserie, résine époxy, plomberie, électricité 220 V / 12 V.",
        "Travaux dans la maison familiale à Poussan : préparation, organisation et chiffrage des achats.",
        "Outillage pratiqué : perceuse à percussion, disqueuse, scie sauteuse, ponceuse, élagueuse, tronçonneuse, tondeuse.",
        "Pratique personnelle développée au fil des chantiers et de l’entretien du matériel."
      ],
      "preuves": [
        "bateau",
        "maison",
        "plein-air"
      ]
    }
  ],
  "plateformes": {
    "titre": "Plateformes pilotées avec l’IA",
    "note": "Pratique des plateformes et outils avec les assistants IA : cadrage, consignes, essais et contrôle des résultats.",
    "items": [
      {
        "nom": "Supabase",
        "role": "Données, authentification, stockage",
        "logo": "assets/logos/supabase.png",
        "fiche": "skylivra"
      },
      {
        "nom": "Stripe",
        "role": "Paiement Checkout et webhooks",
        "logo": "assets/logos/stripe.png",
        "fiche": "skylivra"
      },
      {
        "nom": "Brevo",
        "role": "E-mails transactionnels",
        "logo": "assets/logos/brevo.svg",
        "fiche": "skylivra"
      },
      {
        "nom": "Git",
        "role": "Versions et historique",
        "logo": "assets/logos/git.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "GitHub",
        "role": "Dépôts et GitHub Pages",
        "logo": "assets/logos/github.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Netlify",
        "role": "Hébergement et fonctions serveur",
        "logo": "assets/logos/netlify.svg",
        "fiche": "skylivra"
      },
      {
        "nom": "ChatGPT",
        "role": "Assistant IA",
        "logo": "assets/logos/chatgpt.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Codex",
        "role": "Assistant IA de réalisation",
        "logo": "assets/logos/codex.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Claude Code",
        "role": "Assistant IA de réalisation",
        "logo": "assets/logos/claude.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Visual Studio Code",
        "role": "Édition et suivi des projets",
        "logo": "assets/logos/vscode.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Node.js",
        "role": "Exécution des outils de projets",
        "logo": "assets/logos/nodejs.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Python",
        "role": "Scripts produits avec l’IA",
        "logo": "assets/logos/python.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "PowerShell",
        "role": "Automatisations avec l’IA",
        "logo": "assets/logos/powershell.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Tauri",
        "role": "Application Windows SkyLivra",
        "logo": "assets/logos/tauri.png",
        "fiche": "skylivra"
      },
      {
        "nom": "Inno Setup",
        "role": "Installateurs SkyLivra",
        "logo": "assets/logos/inno.png",
        "fiche": "skylivra"
      },
      {
        "nom": "Next.js",
        "role": "Application BarySense",
        "logo": "assets/logos/nextjs.png",
        "fiche": "barysense"
      },
      {
        "nom": "React",
        "role": "Interfaces des projets personnels",
        "logo": "assets/logos/react.png",
        "fiche": "barysense"
      },
      {
        "nom": "Vite",
        "role": "Projet potager PoussePousse",
        "logo": "assets/logos/vite.png",
        "fiche": "outils-ia"
      },
      {
        "nom": "Google Cloud",
        "role": "Intégration de la connexion Google",
        "logo": "assets/logos/googlecloud.png",
        "fiche": "skylivra"
      }
    ]
  },
  "outils": [
    {
      "famille": "Bureautique et partage",
      "items": [
        "Excel",
        "Word",
        "PowerPoint",
        "Outlook",
        "Publisher",
        "Google Workspace",
        "Microsoft Teams",
        "pCloud",
        "PhotoFiltre"
      ],
      "competence": "excel"
    },
    {
      "famille": "Gestion et comptabilité",
      "items": [
        "EBP Gestion commerciale",
        "Cegid Quadra",
        "DEXT",
        "ACD",
        "GLPI",
        "Moovapps (GED / GMAO)",
        "Horoquartz"
      ],
      "competence": "gestion"
    },
    {
      "famille": "Intelligence artificielle",
      "items": [
        "ChatGPT",
        "Codex",
        "Claude",
        "Claude Code",
        "Orca (plusieurs assistants en parallèle)",
        "Génération d’images par IA",
        "Suno (musique)"
      ],
      "competence": "creations-ia"
    },
    {
      "famille": "Développement et services web",
      "items": [
        "Visual Studio Code",
        "Git",
        "GitHub et GitHub Pages",
        "HTML / CSS / JavaScript",
        "Node.js",
        "Python",
        "PowerShell",
        "React",
        "Next.js",
        "Vite",
        "Tauri / Rust",
        "C++ / WebAssembly",
        "Supabase",
        "Stripe",
        "Brevo",
        "Netlify",
        "Google Cloud",
        "Inno Setup"
      ],
      "competence": "creations-ia"
    },
    {
      "famille": "Création et simulation",
      "items": [
        "Microsoft Flight Simulator",
        "SDK MSFS / SimConnect",
        "SPAD.neXt",
        "OBS Studio",
        "FFmpeg",
        "PhotoFiltre",
        "YouTube"
      ],
      "competence": "creations-ia"
    },
    {
      "famille": "Assistants IA pilotés",
      "items": [
        "ChatGPT",
        "Codex",
        "Claude",
        "Claude Code"
      ],
      "competence": "creations-ia"
    },
    {
      "famille": "Poste de pilotage IA",
      "items": [
        "Orca"
      ],
      "competence": "creations-ia"
    }
  ],
  "interets": [
    {
      "id": "vol",
      "nom": "Pilotage virtuel",
      "texte": "Plus de vingt ans de simulation de vol, à l’origine des créations SkyLivra.",
      "image": {
        "src": "assets/photos/selection/selection-061.webp",
        "alt": "Installation personnelle de simulation de vol"
      },
      "fiches": [
        "simulation",
        "skylivra"
      ],
      "page": {
        "intro": "Plus de vingt ans de simulation de vol sur PC, d’Airbus et Boeing aux avions légers : préparation des vols, navigation, procédures et systèmes avioniques. Cette passion est à l’origine des créations SkyLivra.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-061.webp",
            "alt": "Installation personnelle de simulation de vol"
          },
          {
            "src": "assets/photos/selection/selection-062.webp",
            "alt": "Matériel et commandes de simulation"
          },
          {
            "src": "assets/photos/selection/selection-059.webp",
            "alt": "Cockpit d’Airbus dans le simulateur"
          },
          {
            "src": "assets/photos/selection/selection-060.webp",
            "alt": "Avion de ligne dans le simulateur"
          },
          {
            "src": "assets/photos/selection/selection-063.webp",
            "alt": "Poste de pilotage d’un avion léger simulé"
          },
          {
            "src": "assets/photos/selection/selection-064.webp",
            "alt": "Cockpit d’Airbus A320 simulé"
          },
          {
            "src": "assets/photos/selection/selection-065.webp",
            "alt": "Cockpit d’avion léger simulé"
          },
          {
            "src": "assets/photos/selection/selection-073.webp",
            "alt": "Avion de ligne simulé"
          }
        ],
        "liens": [
          "simulation",
          "skylivra"
        ]
      }
    },
    {
      "id": "piano",
      "nom": "Piano",
      "texte": "Pratique en amateur.",
      "image": {
        "src": "assets/photos/selection/selection-034.webp",
        "alt": "Piano et mécanique de l’instrument"
      },
      "fiches": [
        "jeunesse"
      ],
      "page": {
        "intro": "Pratique du piano en amateur.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-034.webp",
            "alt": "Piano et mécanique de l’instrument"
          }
        ],
        "liens": []
      }
    },
    {
      "id": "numerique",
      "nom": "Intelligence artificielle",
      "texte": "Projets menés en orchestrant des assistants IA.",
      "image": {
        "src": "assets/photos/selection/selection-054.webp",
        "alt": "Montage d’un ordinateur sur table"
      },
      "fiches": [
        "outils-ia",
        "knockin",
        "barysense"
      ],
      "lien": "#/orchestration-ia"
    },
    {
      "id": "sciences",
      "nom": "Sciences et astronomie",
      "texte": "Intérêt durable pour l’astronomie et la physique, prolongé par le projet d’aurores dans le simulateur.",
      "image": {
        "src": "assets/photos/selection/selection-033.webp",
        "alt": "Visite d’un espace de médiation scientifique"
      },
      "fiches": [
        "jeunesse",
        "skylivra"
      ],
      "page": {
        "intro": "Intérêt durable pour l’astronomie et la physique, nourri par des lectures, des visites et des découvertes en voyage. Il se prolonge dans le projet d’aurores boréales et australes créé pour le simulateur.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-031.webp",
            "alt": "Découverte de formations rocheuses"
          },
          {
            "src": "assets/photos/selection/selection-032.webp",
            "alt": "Curiosité et découvertes en voyage"
          },
          {
            "src": "assets/photos/selection/selection-033.webp",
            "alt": "Visite d’un espace de médiation scientifique"
          },
          {
            "src": "assets/photos/aurores-msfs-capture.webp",
            "alt": "Aurores boréales dans le simulateur"
          }
        ],
        "liens": [
          "skylivra"
        ]
      }
    },
    {
      "id": "jardinage",
      "nom": "Jardinage",
      "texte": "Potager et entretien des extérieurs.",
      "image": {
        "src": "assets/photos/selection/selection-035.webp",
        "alt": "Au potager"
      },
      "fiches": [
        "plein-air"
      ],
      "page": {
        "intro": "Potager en bacs construits soi-même, du terrain à la récolte, et entretien des extérieurs à l’élagueuse, à la tronçonneuse et à la tondeuse.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-035.webp",
            "alt": "Au potager"
          },
          {
            "src": "assets/photos/selection/selection-037.webp",
            "alt": "Préparation du terrain"
          },
          {
            "src": "assets/photos/selection/selection-038.webp",
            "alt": "Installation des bacs du potager"
          },
          {
            "src": "assets/photos/selection/selection-041.webp",
            "alt": "Construction d’un bac potager"
          },
          {
            "src": "assets/photos/selection/selection-042.webp",
            "alt": "Potager et paillage"
          },
          {
            "src": "assets/photos/selection/selection-036.webp",
            "alt": "Cultures et tuteurs"
          },
          {
            "src": "assets/photos/selection/selection-039.webp",
            "alt": "Récolte de courgettes"
          },
          {
            "src": "assets/photos/selection/selection-040.webp",
            "alt": "Produits du potager"
          },
          {
            "src": "assets/photos/selection/selection-043.webp",
            "alt": "Préparation des végétaux"
          }
        ],
        "liens": []
      }
    },
    {
      "id": "course",
      "nom": "Course à pied",
      "texte": "Course à pied en amateur.",
      "image": {
        "src": "assets/photos/selection/selection-002.webp",
        "alt": "Sortie à pied"
      },
      "fiches": [
        "plein-air"
      ],
      "page": {
        "intro": "Course à pied et marche en amateur. Auparavant, football en club pendant quinze ans.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-002.webp",
            "alt": "Sortie à pied"
          },
          {
            "src": "assets/photos/selection/selection-004.webp",
            "alt": "Marche en plein air"
          }
        ],
        "liens": []
      }
    },
    {
      "id": "velo",
      "nom": "Vélo",
      "texte": "Sorties à VTT en plein air.",
      "image": {
        "src": "assets/photos/selection/selection-003.webp",
        "alt": "Sortie à vélo"
      },
      "fiches": [
        "plein-air"
      ],
      "page": {
        "intro": "Sorties à VTT en plein air.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-003.webp",
            "alt": "Sortie à vélo"
          }
        ],
        "liens": []
      }
    },
    {
      "id": "randonnee",
      "nom": "Randonnée",
      "texte": "Sorties en montagne et en plein air.",
      "image": {
        "src": "assets/photos/selection/selection-001.webp",
        "alt": "Randonnée en montagne"
      },
      "fiches": [
        "plein-air"
      ],
      "page": {
        "intro": "Randonnée en montagne et sorties en plein air.",
        "photos": [
          {
            "src": "assets/photos/selection/selection-001.webp",
            "alt": "Randonnée en montagne"
          }
        ],
        "liens": []
      }
    }
  ],
  "realisations": [
    "thermes-responsable",
    "negoce",
    "knockin",
    "barysense",
    "skylivra",
    "outils-ia",
    "bateau"
  ],
  "parcours": [
    {
      "id": "vendanges",
      "type": "experience",
      "titre": "Vendanges · Muscat",
      "titreCourt": "Vendanges · Muscat",
      "lieu": "Mireval et Frontignan (Hérault)",
      "resume": "Trois saisons de vendanges chez un viticulteur.",
      "apportCourt": "Travail au rythme d’une équipe, dans les délais imposés par la récolte.",
      "contexte": "Premiers emplois saisonniers, pendant les études, dans le vignoble du muscat.",
      "missions": [
        "Récolte du raisin au sécateur au sein d’une équipe.",
        "Portage et manutention des comportes."
      ],
      "competences": [],
      "apports": [
        "Travail en équipe",
        "Rigueur et régularité",
        "Endurance physique"
      ],
      "transfert": "Habitude des cadences collectives et des délais imposés par la saison : la récolte n’attend pas.",
      "bulle": [
        "Vendanges"
      ],
      "periode": "1997–1999"
    },
    {
      "id": "skiman",
      "type": "experience",
      "titre": "Skiman · Station de ski",
      "titreCourt": "Skiman · Bonascre",
      "lieu": "Le Chamois d’Or, Bonascre (Ariège)",
      "resume": "Vente, location et entretien de matériel de ski.",
      "apportCourt": "Conseil aux clients et exécution rapide des tâches en période d’affluence.",
      "contexte": "Saison d’hiver dans un magasin de location et de vente de skis en station.",
      "missions": [
        "Accueil et conseil des clients, vente et location.",
        "Réglage et entretien des skis et des équipements."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Conseil client",
        "Vente",
        "Entretien technique du matériel"
      ],
      "transfert": "Associer un conseil adapté à chaque client et une exécution technique rapide, en période d’affluence.",
      "bulle": [
        "Skiman"
      ],
      "periode": "1998"
    },
    {
      "id": "bac",
      "type": "formation",
      "titre": "BAC Sciences et technologies tertiaires",
      "titreCourt": "BAC · Sciences et technologies tertiaires",
      "lieu": "Lycée Joliot-Curie, Sète",
      "resume": "Sciences et technologies tertiaires, spécialité action et communication commerciales.",
      "apportCourt": "Bases du commerce et de la communication écrite et orale.",
      "contexte": "Baccalauréat technologique orienté vers le commerce et la communication.",
      "missions": [
        "Enseignements tertiaires : communication, action commerciale, gestion."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Bases du commerce",
        "Communication écrite et orale"
      ],
      "transfert": "Socle commercial qui a conduit directement à la formation en alternance dans le courtage en vins.",
      "bulle": [
        "Baccalauréat STT"
      ],
      "periode": "1997–2000"
    },
    {
      "id": "bts",
      "liens": [
        "courtier"
      ],
      "type": "formation",
      "titre": "BTS commercial",
      "titreCourt": "BTS · Commercial",
      "important": true,
      "lieu": "Sup’Exup, Montpellier",
      "resume": "Formation suivie en communication commerciale, en alternance avec le courtage en vins.",
      "apportCourt": "Présentation d’une offre et négociation avec une clientèle professionnelle.",
      "contexte": "Deux années de formation en alternance, l’entreprise d’accueil étant un courtier en vins de Saint-Christol.",
      "missions": [
        "Cours de communication et de négociation commerciales.",
        "Participation à des dégustations ONIVIN pour l’appellation Vin de pays, à Montpellier."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Communication commerciale",
        "Connaissance des vins et spiritueux",
        "Analyse sensorielle"
      ],
      "transfert": "Une formation appliquée immédiatement sur le terrain, auprès de producteurs et de négociants.",
      "bulle": [
        "BTS commercial"
      ],
      "periode": "2000–2002"
    },
    {
      "id": "courtier",
      "type": "experience",
      "titre": "Apprenti courtier · Vins",
      "titreCourt": "Apprenti courtier · Vins",
      "lieu": "Louche, Saint-Christol (Hérault)",
      "resume": "Relation avec les domaines et collecte d’échantillons, en alternance.",
      "apportCourt": "Relation entre les parties et suivi des échantillons tout au long des échanges.",
      "contexte": "Le courtier fait le lien entre les producteurs et les négociants. Poste occupé en alternance avec la formation BTS.",
      "missions": [
        "Prospection auprès de professionnels du vin.",
        "Collecte et suivi des échantillons.",
        "Entretien de la relation avec les clients."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Prospection B2B",
        "Relation clients",
        "Connaissance des vins"
      ],
      "transfert": "Premier apprentissage de l’intermédiation commerciale : écouter les deux parties et assurer un suivi fiable.",
      "bulle": [
        "Apprenti courtier"
      ],
      "periode": "2000–2002"
    },
    {
      "id": "londres",
      "type": "experience",
      "titre": "Londres · Restauration, sondages",
      "titreCourt": "Londres · Restauration · Sondages",
      "lieu": "Londres, Royaume-Uni",
      "resume": "Expériences en restauration et en enquêtes téléphoniques à Londres.",
      "apportCourt": "Adaptation à de nouvelles équipes et maintien d’un service régulier.",
      "contexte": "Travail à Londres dans des établissements de restauration de styles très différents, complété par une activité freelance.",
      "missions": [
        "Serveur à l’hôtel Le Méridien.",
        "Commis de salle au restaurant Racine : mise en place et aide au service.",
        "Préparation de plats et de sandwichs chez Pret A Manger.",
        "Sondages téléphoniques en freelance : conduite d’entretiens et saisie des réponses."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Service en salle",
        "Relation clients",
        "Adaptabilité",
        "Entretiens téléphoniques"
      ],
      "transfert": "S’adapter vite à des organisations différentes et garder une qualité de service constante.",
      "bulle": [
        "Londres"
      ],
      "periode": "2002–2003"
    },
    {
      "id": "bateau",
      "type": "personnel",
      "titre": "Rénovation Bateau bois 11 m",
      "titreCourt": "Rénovation Bateau bois 11 m",
      "important": true,
      "lieu": "",
      "resume": "Trois ans de chantier sur une coque à clin.",
      "apportCourt": "Conduite d’un chantier de trois ans, de la préparation aux interventions techniques.",
      "contexte": "Rénovation du Wyjume, un bateau en bois de 11 mètres à coque à clin. Ce chantier a mobilisé la préparation, l’organisation des travaux et une pratique directe de plusieurs techniques. Les photos personnelles montrent notamment le carénage, les boiseries, le ponçage et le tableau électrique.",
      "missions": [
        "Menuiserie et aménagement intérieur.",
        "Travaux en résine époxy.",
        "Plomberie et tuyauterie.",
        "Électricité 220 V et 12 V.",
        "Mesures, découpe, ponçage, peinture."
      ],
      "competences": [
        "manuel"
      ],
      "apports": [
        "Conduite d’un projet long",
        "Polyvalence technique"
      ],
      "transfert": "Mener un projet de plusieurs années jusqu’au bout, en enchaînant les corps de métier.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-123.webp",
          "alt": "Coque — avant rénovation",
          "legende": "Coque — avant rénovation"
        },
        {
          "src": "assets/photos/selection/selection-124.webp",
          "alt": "Coque — pendant la rénovation",
          "legende": "Coque — pendant la rénovation"
        },
        {
          "src": "assets/photos/selection/selection-128.webp",
          "alt": "Vue d’ensemble du Wyjume",
          "legende": "Vue d’ensemble du Wyjume"
        }
      ],
      "sections": [
        {
          "titre": "Boiseries · Aménagement",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-125.webp",
              "alt": "Boiseries — avant",
              "legende": "Boiseries — avant"
            },
            {
              "src": "assets/photos/selection/selection-126.webp",
              "alt": "Boiseries — pendant les travaux",
              "legende": "Boiseries — pendant les travaux"
            },
            {
              "src": "assets/photos/selection/selection-127.webp",
              "alt": "Boiseries et intérieur — après",
              "legende": "Boiseries et intérieur — après"
            },
            {
              "src": "assets/photos/selection/selection-130.webp",
              "alt": "Menuiserie et préparation de l’intérieur",
              "legende": "Menuiserie et préparation de l’intérieur"
            },
            {
              "src": "assets/photos/selection/selection-133.webp",
              "alt": "Travail des boiseries",
              "legende": "Travail des boiseries"
            }
          ]
        },
        {
          "titre": "À bord · Navigation",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-131.webp",
              "alt": "Tableau de bord",
              "legende": "Tableau de bord"
            },
            {
              "src": "assets/photos/selection/selection-132.webp",
              "alt": "Vue du bateau au port",
              "legende": "Vue du bateau au port"
            },
            {
              "src": "assets/photos/selection/selection-129.webp",
              "alt": "Bateau en navigation",
              "legende": "Bateau en navigation"
            }
          ]
        }
      ],
      "bulle": [
        "Rénovation Bateau bois 11 m"
      ],
      "periode": "2003–2006"
    },
    {
      "id": "negoce",
      "type": "experience",
      "titre": "Créateur gérant · Négoce B2B Truffes",
      "titreCourt": "Créateur gérant · Négoce B2B Truffes",
      "important": true,
      "lieu": "Saveurs Européennes Culinaires, Balaruc-les-Bains",
      "resume": "Achat et vente de truffes, champignons et produits dérivés auprès de la restauration gastronomique.",
      "apportCourt": "Suivi complet d’une commande : achat, stock, livraison, facturation et encaissement.",
      "contexte": "Entreprise créée et gérée pendant sept ans : toute la chaîne, de l’achat auprès des fournisseurs à la livraison des restaurants clients.",
      "missions": [
        "Développement d’une clientèle de restaurants gastronomiques par la prospection.",
        "Achats et ventes entre professionnels, gestion des stocks de produits frais.",
        "Distribution et logistique en véhicule frigorifique, planification des tournées avec CartoExploreur.",
        "Gestion commerciale avec EBP : commandes, facturation, encaissements.",
        "Suivi administratif, tableaux de suivi et supports de vente sous Office, retouche de visuels avec PhotoFiltre."
      ],
      "competences": [
        "gestion",
        "relation",
        "excel"
      ],
      "apports": [
        "Achats et ventes B2B",
        "Gestion des stocks",
        "Logistique",
        "Facturation",
        "Suivi administratif"
      ],
      "transfert": "Une vision complète d’une petite entreprise : chaque commande engage les achats, le stock, la livraison et la facture. Cette expérience éclaire aujourd’hui les fonctions d’assistant de gestion, d’ADV ou d’approvisionnement.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-013-v2.4.png",
          "alt": "Support de l’activité de négoce",
          "legende": "Support de l’activité de négoce",
          "entier": true
        },
        {
          "src": "assets/photos/selection/selection-026.webp",
          "alt": "Huile à la truffe blanche",
          "legende": "Huile à la truffe blanche"
        },
        {
          "src": "assets/photos/selection/selection-027.webp",
          "alt": "Crème de cèpes et truffe blanche",
          "legende": "Crème de cèpes et truffe blanche"
        },
        {
          "src": "assets/photos/selection/selection-028.webp",
          "alt": "Préparation à la truffe",
          "legende": "Préparation à la truffe"
        }
      ],
      "sections": [
        {
          "titre": "Produits",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-015.webp",
              "alt": "Girolles",
              "legende": "Girolles"
            },
            {
              "src": "assets/photos/selection/selection-022.webp",
              "alt": "Produit : jus de truffe",
              "legende": "Produit : jus de truffe"
            },
            {
              "src": "assets/photos/selection/selection-023.webp",
              "alt": "Morilles",
              "legende": "Morilles"
            },
            {
              "src": "assets/photos/selection/selection-024.webp",
              "alt": "Mousserons",
              "legende": "Mousserons"
            },
            {
              "src": "assets/photos/selection/selection-025.webp",
              "alt": "Truffes",
              "legende": "Truffes"
            },
            {
              "src": "assets/photos/selection/selection-029.webp",
              "alt": "Trompettes des Maures",
              "legende": "Trompettes des Maures"
            },
            {
              "src": "assets/photos/selection/selection-030.webp",
              "alt": "Truffes fraîches",
              "legende": "Truffes fraîches"
            }
          ]
        },
        {
          "titre": "Véhicule · Logistique",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-016.webp",
              "alt": "Véhicule utilisé pour l’activité de négoce",
              "legende": "Véhicule utilisé pour l’activité de négoce"
            },
            {
              "src": "assets/photos/selection/selection-017.webp",
              "alt": "Préparation de l’isolation du véhicule",
              "legende": "Préparation de l’isolation du véhicule"
            },
            {
              "src": "assets/photos/selection/selection-018.webp",
              "alt": "Aménagement intérieur isolé",
              "legende": "Aménagement intérieur isolé"
            },
            {
              "src": "assets/photos/selection/selection-019.webp",
              "alt": "Aménagement du véhicule",
              "legende": "Aménagement du véhicule"
            },
            {
              "src": "assets/photos/selection/selection-020.webp",
              "alt": "Véhicule de l’activité de négoce",
              "legende": "Véhicule de l’activité de négoce"
            }
          ]
        },
        {
          "titre": "Supports · Cueillette",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-014.webp",
              "alt": "Verso d’un support commercial",
              "legende": "Verso d’un support commercial"
            },
            {
              "src": "assets/photos/selection/selection-021.webp",
              "alt": "Cueillette de champignons",
              "legende": "Cueillette de champignons"
            }
          ]
        }
      ],
      "bulle": [
        "Créateur gérant · Négoce B2B Truffes"
      ],
      "periode": "2003–2010"
    },
    {
      "id": "simulation",
      "type": "personnel",
      "titre": "Simulation de vol",
      "titreCourt": "Simulation de vol · Airbus · Boeing · Avions légers",
      "lieu": "",
      "resume": "Plus de vingt ans de simulation de vol sur PC : Airbus, Boeing et avions légers.",
      "apportCourt": "Préparation des opérations, suivi des procédures et vérification des paramètres.",
      "contexte": "Une passion technique pratiquée de façon exigeante, qui a ensuite conduit aux créations du projet SkyLivra.",
      "missions": [
        "Préparation des vols, météo et navigation.",
        "Avionique et réglementation simulée.",
        "Configuration des périphériques avec SPAD.neXt."
      ],
      "competences": [],
      "outils": [
        "Microsoft Flight Simulator",
        "SPAD.neXt",
        "PC multi-écrans"
      ],
      "apports": [
        "Méthode",
        "Respect des procédures",
        "Configuration technique"
      ],
      "transfert": "Préparer, suivre une procédure et vérifier : les réflexes d’une organisation rigoureuse.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-061.webp",
          "alt": "Installation personnelle de simulation de vol",
          "legende": "Installation personnelle de simulation de vol"
        },
        {
          "src": "assets/photos/selection/selection-062.webp",
          "alt": "Matériel et commandes de simulation",
          "legende": "Matériel et commandes de simulation"
        },
        {
          "src": "assets/photos/selection/selection-059.webp",
          "alt": "Cockpit d’Airbus dans le simulateur",
          "legende": "Cockpit d’Airbus dans le simulateur"
        },
        {
          "src": "assets/photos/selection/selection-060.webp",
          "alt": "Avion de ligne dans le simulateur",
          "legende": "Avion de ligne dans le simulateur"
        },
        {
          "src": "assets/photos/selection/selection-063.webp",
          "alt": "Poste de pilotage d’un avion léger simulé",
          "legende": "Poste de pilotage d’un avion léger simulé"
        },
        {
          "src": "assets/photos/selection/selection-064.webp",
          "alt": "Cockpit d’Airbus A320 simulé",
          "legende": "Cockpit d’Airbus A320 simulé"
        },
        {
          "src": "assets/photos/selection/selection-065.webp",
          "alt": "Cockpit d’avion léger simulé",
          "legende": "Cockpit d’avion léger simulé"
        },
        {
          "src": "assets/photos/selection/selection-071.webp",
          "alt": "Vue du cockpit dans le simulateur",
          "legende": "Vue du cockpit dans le simulateur"
        },
        {
          "src": "assets/photos/selection/selection-073.webp",
          "alt": "Avion de ligne simulé",
          "legende": "Avion de ligne simulé"
        }
      ],
      "sections": [
        {
          "titre": "Univers simulation",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-057.webp",
              "alt": "Aviation et simulation : Boeing 777",
              "legende": "Aviation et simulation : Boeing 777"
            },
            {
              "src": "assets/photos/selection/selection-058.webp",
              "alt": "Présentation d’un avion pour la simulation",
              "legende": "Présentation d’un avion pour la simulation"
            },
            {
              "src": "assets/photos/selection/selection-069.webp",
              "alt": "Microsoft Flight Simulator — intérêt pour la simulation",
              "legende": "Microsoft Flight Simulator — intérêt pour la simulation"
            }
          ]
        },
        {
          "titre": "Défis simulateur",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-066.webp",
              "alt": "Attestation virtuelle Flight Simulator : pilote de ligne",
              "legende": "Attestation virtuelle Flight Simulator : pilote de ligne"
            },
            {
              "src": "assets/photos/selection/selection-067.webp",
              "alt": "Attestation virtuelle Flight Simulator : pilote privé",
              "legende": "Attestation virtuelle Flight Simulator : pilote privé"
            },
            {
              "src": "assets/photos/selection/selection-068.webp",
              "alt": "Attestation virtuelle Flight Simulator : pilote commercial",
              "legende": "Attestation virtuelle Flight Simulator : pilote commercial"
            },
            {
              "src": "assets/photos/selection/selection-070.webp",
              "alt": "Attestation virtuelle Flight Simulator : vol aux instruments",
              "legende": "Attestation virtuelle Flight Simulator : vol aux instruments"
            },
            {
              "src": "assets/photos/selection/selection-074.webp",
              "alt": "Attestation virtuelle Flight Simulator : premier vol solo",
              "legende": "Attestation virtuelle Flight Simulator : premier vol solo"
            }
          ],
          "paragraphes": [
            "Attestations internes de Flight Simulator : elles ne constituent pas des qualifications aéronautiques réelles."
          ]
        },
        {
          "titre": "Aviation · Découverte",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-005.webp",
              "alt": "Visite d’un musée aéronautique",
              "legende": "Visite d’un musée aéronautique"
            },
            {
              "src": "assets/photos/selection/selection-006.webp",
              "alt": "Découverte d’un Airbus A380",
              "legende": "Découverte d’un Airbus A380"
            },
            {
              "video": "assets/videos/aviation-vol-cotier.mp4",
              "poster": "assets/videos/aviation-vol-cotier.webp",
              "alt": "Découverte en vol sur la côte",
              "legende": "Découverte en vol sur la côte"
            }
          ],
          "paragraphes": [
            "Visites et découverte en vol."
          ]
        }
      ],
      "bulle": [
        "Simulation de vol"
      ],
      "periode": "2003–aujourd’hui",
      "important": true
    },
    {
      "id": "pailletrice",
      "type": "experience",
      "titre": "Agent commercial · Vins",
      "titreCourt": "Agent commercial · Vins",
      "lieu": "Domaine Pailletrice, Pérols / Montpellier",
      "resume": "Prospection et vente de vins auprès des professionnels.",
      "apportCourt": "Organisation autonome d’un secteur commercial et suivi régulier des clients.",
      "contexte": "Commercialisation des vins d’un domaine, notamment en bag-in-box, sur le secteur de Montpellier.",
      "missions": [
        "Prospection des restaurants, bars et épiceries.",
        "Développement et suivi de la clientèle."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Prospection terrain",
        "Développement de clientèle",
        "Autonomie"
      ],
      "transfert": "Organisation autonome d’un secteur et suivi régulier des clients.",
      "bulle": [
        "Agent commercial"
      ],
      "periode": "2010–2011"
    },
    {
      "id": "immobilier",
      "type": "experience",
      "titre": "Négociateur, conseiller immobilier",
      "titreCourt": "Conseiller · Immobilier",
      "lieu": "Carrefour Immobilier (Balaruc / Sète) et Century 21 (Sète)",
      "resume": "Prospection de mandats, recherche de biens, transactions et location.",
      "apportCourt": "Suivi simultané de plusieurs dossiers clients et de leurs échéances.",
      "contexte": "Deux agences successives sur le bassin de Thau, en vente et en location.",
      "missions": [
        "Prospection de mandats de vente.",
        "Recherche de biens adaptés aux demandes.",
        "Accompagnement des transactions et des locations.",
        "Suivi de la clientèle vendeurs et acquéreurs."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Prospection",
        "Suivi de dossiers clients",
        "Connaissance du territoire"
      ],
      "transfert": "Suivre plusieurs dossiers en parallèle, chacun avec ses interlocuteurs et ses échéances.",
      "bulle": [
        "Conseiller immobilier"
      ],
      "periode": "2011–2012"
    },
    {
      "id": "thermes-agent",
      "type": "experience",
      "titre": "Agent qualifié · Soins thermaux",
      "titreCourt": "Agent de soins · Thermaux",
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Soins aux curistes en rhumatologie et phlébologie.",
      "apportCourt": "Accueil du public et connaissance du terrain des soins thermaux.",
      "contexte": "Entrée aux Thermes de Balaruc-les-Bains, établissement thermal recevant des curistes pour des soins de rhumatologie et de phlébologie. Point de départ de dix années d’évolution interne.",
      "missions": [
        "Soins d’hydrothérapie et application de boue.",
        "Accueil et accompagnement des curistes.",
        "Polyvalence en blanchisserie."
      ],
      "competences": [
        "relation"
      ],
      "apports": [
        "Soin à la personne",
        "Accueil du public",
        "Polyvalence"
      ],
      "transfert": "La connaissance du terrain qui a ensuite servi à organiser le travail des équipes.",
      "bulle": [
        "Agent de soins"
      ],
      "periode": "2012–2013"
    },
    {
      "id": "thermes-responsable",
      "type": "experience",
      "titre": "Responsable d’équipe soignant",
      "titreCourt": "Responsable d’équipe soignant",
      "important": true,
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Encadrement de 30 à 40 agents et kinésithérapeutes, planification et suivi de l’activité.",
      "apportCourt": "Organisation du travail de 30 à 40 personnes : plannings, entretiens, médiation et suivi.",
      "contexte": "Évolution interne après un an comme agent de soins : d’abord responsable soins adjoint, en appui du responsable soins, puis responsable soins pendant huit années.",
      "missions": [
        "Encadrement de 30 à 40 agents de soins et kinésithérapeutes.",
        "Planification des équipes et coordination quotidienne des soins.",
        "Entretiens annuels d’évaluation et entretiens professionnels (EVA / EP).",
        "Médiation et résolution des conflits.",
        "Écoute des curistes et traitement de leurs demandes ; suivi de l’activité et des demandes de maintenance.",
        "Création d’outils Excel, de formulaires et de signalétique pour faire circuler l’information, en coopération avec les services qualité (QSE) et informatique."
      ],
      "competences": [
        "encadrement",
        "gestion",
        "excel"
      ],
      "outils": [
        "Excel (TCD, Power Query, Power Pivot, VBA)",
        "Microsoft Office",
        "GED",
        "GMAO",
        "GLPI",
        "Horoquartz"
      ],
      "apports": [
        "Management d’équipe",
        "Planification",
        "Coordination",
        "Entretiens professionnels",
        "Médiation",
        "Écoute",
        "Outils de suivi"
      ],
      "transfert": "Passer du rôle d’équipier à celui de référent, puis organiser le travail de nombreuses personnes, tenir des plannings, faire remonter et circuler l’information : ce sont les bases des postes d’assistant de planification, d’assistant de gestion ou d’appui administratif RH.",
      "bulle": [
        "Responsable d’équipe soignant"
      ],
      "periode": "2013–2023"
    },
    {
      "id": "pc",
      "type": "personnel",
      "titre": "Montage, configuration PC",
      "titreCourt": "Montage · Informatique",
      "lieu": "",
      "resume": "Assemblage de deux ordinateurs, réseau et postes multi-écrans.",
      "apportCourt": "Montage et configuration de postes de travail, périphériques et réseau.",
      "contexte": "Pratique personnelle liée à la simulation aérienne.",
      "missions": [
        "Assemblage de deux PC.",
        "Configuration matérielle et logicielle.",
        "Mise en réseau et paramétrage des périphériques."
      ],
      "competences": [
        "informatique"
      ],
      "apports": [
        "Autonomie informatique",
        "Diagnostic"
      ],
      "transfert": "À l’aise pour prendre en main un poste de travail et ses outils.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-054.webp",
          "alt": "Montage d’un ordinateur sur table",
          "legende": "Montage d’un ordinateur sur table"
        },
        {
          "src": "assets/photos/selection/selection-055.webp",
          "alt": "Installation des barrettes mémoire",
          "legende": "Installation des barrettes mémoire"
        },
        {
          "src": "assets/photos/selection/selection-056.webp",
          "alt": "Configuration intérieure d’un PC",
          "legende": "Configuration intérieure d’un PC"
        },
        {
          "src": "assets/photos/selection/selection-052.webp",
          "alt": "Assemblage des composants d’un PC",
          "legende": "Assemblage des composants d’un PC"
        },
        {
          "src": "assets/photos/selection/selection-053.webp",
          "alt": "Installation de composants et câblage",
          "legende": "Installation de composants et câblage"
        }
      ],
      "bulle": [
        "Montage PC"
      ],
      "periode": "2017–aujourd’hui"
    },
    {
      "id": "maison",
      "type": "personnel",
      "titre": "Travaux · Habitation",
      "titreCourt": "Travaux · Habitation",
      "lieu": "Poussan",
      "resume": "Préparation, organisation et chiffrage de travaux d’habitation.",
      "apportCourt": "Chiffrage du budget et planification des étapes d’un chantier.",
      "contexte": "Travaux sur son habitation, dans la continuité de nombreux travaux manuels.",
      "missions": [
        "Préparation des projets et organisation des étapes.",
        "Chiffrage des achats.",
        "Réalisation de travaux de bricolage."
      ],
      "competences": [
        "manuel",
        "gestion"
      ],
      "apports": [
        "Préparation de projet",
        "Chiffrage",
        "Organisation"
      ],
      "transfert": "Estimer un budget et organiser des étapes avant d’agir.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-107.webp",
          "alt": "Façade et fenêtre — avant",
          "legende": "Façade et fenêtre — avant"
        },
        {
          "src": "assets/photos/selection/selection-108.webp",
          "alt": "Façade et fenêtre — après",
          "legende": "Façade et fenêtre — après"
        }
      ],
      "sections": [
        {
          "titre": "Agencements · Mobilier",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-112.webp",
              "alt": "Assemblage d’un meuble",
              "legende": "Assemblage d’un meuble"
            },
            {
              "src": "assets/photos/selection/selection-117.webp",
              "alt": "Plan de travail — assemblage",
              "legende": "Plan de travail — assemblage"
            },
            {
              "src": "assets/photos/selection/selection-118.webp",
              "alt": "Plan de travail — résultat",
              "legende": "Plan de travail — résultat"
            },
            {
              "src": "assets/photos/selection/selection-122.webp",
              "alt": "Travaux intérieurs et préparation",
              "legende": "Travaux intérieurs et préparation"
            }
          ]
        },
        {
          "titre": "Portail",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-115.webp",
              "alt": "Portail — avant",
              "legende": "Portail — avant"
            },
            {
              "src": "assets/photos/selection/selection-116.webp",
              "alt": "Portail — après",
              "legende": "Portail — après"
            }
          ]
        },
        {
          "titre": "Entretien · Équipements",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-110.webp",
              "alt": "Unité de climatisation — avant nettoyage",
              "legende": "Unité de climatisation — avant nettoyage"
            },
            {
              "src": "assets/photos/selection/selection-109.webp",
              "alt": "Unité de climatisation — après nettoyage",
              "legende": "Unité de climatisation — après nettoyage"
            },
            {
              "src": "assets/photos/selection/selection-111.webp",
              "alt": "Unité extérieure et raccordements",
              "legende": "Unité extérieure et raccordements"
            },
            {
              "src": "assets/photos/selection/selection-119.webp",
              "alt": "Entretien de l’unité de climatisation",
              "legende": "Entretien de l’unité de climatisation"
            },
            {
              "src": "assets/photos/selection/selection-120.webp",
              "alt": "Nettoyage de la turbine",
              "legende": "Nettoyage de la turbine"
            },
            {
              "src": "assets/photos/selection/selection-121.webp",
              "alt": "Raccordements de plomberie",
              "legende": "Raccordements de plomberie"
            },
            {
              "src": "assets/photos/selection/selection-113.webp",
              "alt": "Préparation d’un équipement",
              "legende": "Préparation d’un équipement"
            },
            {
              "src": "assets/photos/selection/selection-114.webp",
              "alt": "Entretien d’un équipement",
              "legende": "Entretien d’un équipement"
            }
          ],
          "paragraphes": [
            "Travaux et entretien réalisés dans un cadre personnel."
          ]
        }
      ],
      "bulle": [
        "Travaux habitation"
      ],
      "periode": "2018"
    },
    {
      "id": "ged-gmao",
      "liens": [
        "thermes-responsable"
      ],
      "type": "formation",
      "titre": "Gestion documentaire, maintenance · GED / GMAO",
      "titreCourt": "GED · GMAO · SST · Secours",
      "lieu": "Formation interne, Thermes de Balaruc-les-Bains",
      "resume": "Prise en main des outils de gestion électronique des documents et de gestion de la maintenance.",
      "apportCourt": "Classement, traçabilité et recherche d’informations dans une GED ou une GMAO.",
      "contexte": "Formation interne accompagnant le déploiement d’outils de gestion documentaire et de maintenance dans l’établissement.",
      "missions": [
        "Gestion documentaire et traçabilité.",
        "Suivi des demandes de maintenance."
      ],
      "competences": [
        "gestion"
      ],
      "outils": [
        "GED",
        "GMAO",
        "Moovapps"
      ],
      "apports": [
        "Gestion documentaire",
        "Traçabilité",
        "Suivi de maintenance"
      ],
      "transfert": "Classer, retrouver et tracer l’information : utile à tout poste de gestion de dossiers.",
      "sections": [
        {
          "titre": "SST · Secours",
          "paragraphes": [
            "Formation interne suivie dans le cadre de l’établissement thermal."
          ],
          "points": [
            "Gestes de premiers secours.",
            "Prévention, utilisation des extincteurs."
          ]
        }
      ],
      "bulle": [
        "GED · GMAO"
      ],
      "periode": "2019"
    },
    {
      "id": "sst",
      "liens": [
        "thermes-responsable"
      ],
      "type": "formation",
      "titre": "Sauveteur secouriste du travail · SST",
      "titreCourt": "Sauveteur secouriste · SST",
      "lieu": "Formation interne, Thermes de Balaruc-les-Bains",
      "resume": "Premiers secours et prévention des risques.",
      "apportCourt": "Premiers secours et prévention des risques au sein d’une équipe.",
      "contexte": "Formation interne suivie dans le cadre de l’établissement thermal.",
      "missions": [
        "Gestes de premiers secours.",
        "Prévention, utilisation des extincteurs."
      ],
      "competences": [],
      "apports": [
        "Premiers secours",
        "Prévention"
      ],
      "transfert": "Réflexes de prévention et de sécurité au sein d’une équipe.",
      "bulle": [
        "Sauveteur secouriste"
      ],
      "periode": "2021–2023"
    },
    {
      "id": "plein-air",
      "type": "personnel",
      "titre": "Jardinage, course, randonnée",
      "titreCourt": "Jardinage · Course · Randonnée",
      "lieu": "",
      "resume": "Activités de plein air et entretien des espaces extérieurs.",
      "apportCourt": "Pratique régulière d’activités physiques et entretien d’espaces extérieurs.",
      "contexte": "Activités de plein air pratiquées en loisir.",
      "missions": [
        "Course à pied en amateur.",
        "Marche et randonnée.",
        "Jardinage et entretien des extérieurs : élagueuse, tronçonneuse, tondeuse."
      ],
      "competences": [
        "manuel"
      ],
      "apports": [
        "Régularité",
        "Équilibre"
      ],
      "transfert": "Des activités qui demandent régularité et persévérance.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-001.webp",
          "alt": "Randonnée en montagne",
          "legende": "Randonnée en montagne"
        },
        {
          "src": "assets/photos/selection/selection-002.webp",
          "alt": "Sortie à pied",
          "legende": "Sortie à pied"
        },
        {
          "src": "assets/photos/selection/selection-003.webp",
          "alt": "Sortie à vélo",
          "legende": "Sortie à vélo"
        },
        {
          "src": "assets/photos/selection/selection-004.webp",
          "alt": "Marche en plein air",
          "legende": "Marche en plein air"
        }
      ],
      "sections": [
        {
          "titre": "Potager",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-035.webp",
              "alt": "Au potager",
              "legende": "Au potager"
            },
            {
              "src": "assets/photos/selection/selection-037.webp",
              "alt": "Préparation du terrain",
              "legende": "Préparation du terrain"
            },
            {
              "src": "assets/photos/selection/selection-038.webp",
              "alt": "Installation des bacs du potager",
              "legende": "Installation des bacs du potager"
            },
            {
              "src": "assets/photos/selection/selection-041.webp",
              "alt": "Construction d’un bac potager",
              "legende": "Construction d’un bac potager"
            },
            {
              "src": "assets/photos/selection/selection-042.webp",
              "alt": "Potager et paillage",
              "legende": "Potager et paillage"
            },
            {
              "src": "assets/photos/selection/selection-036.webp",
              "alt": "Cultures et tuteurs",
              "legende": "Cultures et tuteurs"
            },
            {
              "src": "assets/photos/selection/selection-039.webp",
              "alt": "Récolte de courgettes",
              "legende": "Récolte de courgettes"
            },
            {
              "src": "assets/photos/selection/selection-040.webp",
              "alt": "Produits du potager",
              "legende": "Produits du potager"
            },
            {
              "src": "assets/photos/selection/selection-043.webp",
              "alt": "Préparation des végétaux",
              "legende": "Préparation des végétaux"
            }
          ]
        }
      ],
      "bulle": [
        "Jardinage"
      ],
      "periode": "2018–aujourd’hui"
    },
    {
      "id": "keyce",
      "liens": [
        "thermes-responsable"
      ],
      "type": "formation",
      "titre": "Bloc de compétences · Management",
      "titreCourt": "Formation · Management",
      "lieu": "Keyce Academy, Pérols",
      "resume": "Management opérationnel, organisation de l’activité et des équipes.",
      "apportCourt": "Méthodes de management appliquées à l’organisation de l’activité et des équipes.",
      "contexte": "Bloc de compétences en management, suivi après plusieurs années d’encadrement.",
      "missions": [
        "Management opérationnel.",
        "Organisation de l’activité et des équipes."
      ],
      "competences": [
        "encadrement"
      ],
      "apports": [
        "Management opérationnel",
        "Organisation"
      ],
      "transfert": "Mettre des méthodes sur une pratique d’encadrement de plusieurs années.",
      "bulle": [
        "Management"
      ],
      "periode": "2023"
    },
    {
      "id": "comtel",
      "liens": [
        "thermes-responsable"
      ],
      "type": "formation",
      "titre": "Management · Gestion des conflits",
      "titreCourt": "Formation · Gestion des conflits",
      "lieu": "Comtel, Castries, pour les Thermes de Balaruc-les-Bains",
      "resume": "Dialogue, prévention et gestion des conflits.",
      "apportCourt": "Prévention et désamorçage des tensions entre collègues ou avec le public.",
      "contexte": "Formation suivie dans le cadre de la fonction de responsable soins.",
      "missions": [
        "Techniques de dialogue.",
        "Prévention et gestion des situations conflictuelles."
      ],
      "competences": [
        "encadrement"
      ],
      "apports": [
        "Dialogue",
        "Gestion des conflits"
      ],
      "transfert": "Savoir désamorcer une tension, avec des collègues comme avec du public.",
      "bulle": [
        "Gestion des conflits"
      ],
      "periode": "2023"
    },
    {
      "id": "stage-audit",
      "type": "experience",
      "titre": "Stage · Cabinet comptable",
      "titreCourt": "Stage comptable · Audit Conseil",
      "lieu": "Audit Conseil & Associés, Saint-Jean-de-Védas",
      "resume": "Une semaine de découverte du travail en cabinet.",
      "apportCourt": "Pratique des outils de cabinet DEXT, ACD et Cegid Quadra.",
      "contexte": "Stage court réalisé pendant la formation de comptable assistant.",
      "missions": [
        "Classement et traitement des pièces comptables.",
        "Travail sur les comptes et lettrage.",
        "Échanges par courriel."
      ],
      "competences": [
        "gestion"
      ],
      "outils": [
        "DEXT",
        "ACD",
        "Cegid Quadra"
      ],
      "apports": [
        "Traitement des pièces",
        "Lettrage",
        "Logiciels de cabinet"
      ],
      "transfert": "Première immersion dans les outils et le rythme d’un cabinet comptable.",
      "bulle": [
        "Stage cabinet comptable"
      ],
      "periode": "2024"
    },
    {
      "id": "stage-cecosud",
      "type": "experience",
      "titre": "Stage · Comptable assistant",
      "titreCourt": "Stage comptable · Cecosud 34",
      "lieu": "Cecosud 34, Agde",
      "resume": "Un mois et demi de pratique comptable en cabinet.",
      "apportCourt": "Saisie comptable, rapprochements bancaires et lettrage sur des dossiers clients réels.",
      "contexte": "Stage de la formation de comptable assistant au GRETA de Sète.",
      "missions": [
        "Tri des pièces et saisie des écritures.",
        "Rapprochements bancaires et lettrage.",
        "Appui à la révision et au suivi des dossiers."
      ],
      "competences": [
        "gestion",
        "excel"
      ],
      "outils": [
        "Cegid Quadra",
        "Excel",
        "Microsoft Office"
      ],
      "apports": [
        "Saisie comptable",
        "Rapprochements bancaires",
        "Lettrage",
        "Révision"
      ],
      "transfert": "Les opérations comptables courantes pratiquées sur des dossiers réels.",
      "bulle": [
        "Stage comptable assistant"
      ],
      "periode": "2025"
    },
    {
      "id": "titre-comptable",
      "liens": [
        "stage-cecosud"
      ],
      "type": "formation",
      "titre": "Titre professionnel · Comptable assistant",
      "titreCourt": "Titre professionnel · Comptable assistant",
      "lieu": "GRETA, Sète · niveau 4",
      "resume": "Reconversion vers la comptabilité et la gestion.",
      "apportCourt": "Application des bases comptables aux opérations courantes d’une petite structure.",
      "contexte": "Formation qualifiante suivie après dix ans aux Thermes, complétée par deux stages en cabinet.",
      "missions": [
        "Bases comptables et opérations courantes.",
        "Mise en pratique lors de deux stages en cabinet."
      ],
      "competences": [
        "gestion"
      ],
      "apports": [
        "Comptabilité courante",
        "Rigueur documentaire"
      ],
      "transfert": "Le cadre comptable qui complète l’expérience de gestion acquise dans le négoce.",
      "bulle": [
        "Titre Comptable assistant"
      ],
      "periode": "2025"
    },
    {
      "id": "tosa",
      "type": "formation",
      "titre": "Tosa Excel avancé · 850 / 1000",
      "titreCourt": "Excel avancé · Tosa · 850/1000",
      "lieu": "GRETA, Sète",
      "resume": "Certification de la maîtrise d’Excel.",
      "apportCourt": "Création de tableaux de suivi et automatisation des tâches répétitives dans Excel.",
      "contexte": "Certification qui valide une pratique d’Excel utilisée depuis de nombreuses années pour le suivi d’activité.",
      "missions": [
        "Tableaux croisés dynamiques.",
        "Power Query et Power Pivot."
      ],
      "competences": [
        "excel"
      ],
      "apports": [
        "Analyse de données",
        "Automatisation"
      ],
      "transfert": "Des tableaux de suivi fiables et des tâches répétitives automatisées.",
      "bulle": [
        "Tosa Excel avancé"
      ],
      "periode": "2025"
    },
    {
      "id": "outils-ia",
      "type": "personnel",
      "titre": "Orchestration IA",
      "titreCourt": "Orchestration IA",
      "important": true,
      "lieu": "Méthodes de travail et continuité des projets personnels",
      "resume": "Orchestrer des assistants IA dans des projets suivis : consignes communes, dossiers de référence et documents de reprise.",
      "apportCourt": "Consignes écrites, répartition des rôles et traçabilité des versions.",
      "contexte": "La coordination de plusieurs assistants IA sur des projets suivis repose sur des consignes communes et des documents de reprise.",
      "missions": [
        "Rédaction de consignes structurées communes.",
        "Dossiers de référence et documents de reprise entre sessions.",
        "Coordination de plusieurs assistants travaillant en parallèle avec Orca, chacun sur un périmètre défini, puis revue croisée.",
        "Définition du périmètre de chaque intervention et des éléments attendus pour vérifier un résultat.",
        "Suivi des versions avec Git et GitHub."
      ],
      "competences": [
        "creations-ia",
        "gestion",
        "plateformes"
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude",
        "Claude Code",
        "Orca",
        "Git",
        "GitHub"
      ],
      "apports": [
        "Organisation",
        "Documentation",
        "Contrôle des résultats"
      ],
      "transfert": "Les mêmes réflexes que pour une équipe : rôles clairs, consignes écrites, contrôle et traçabilité.",
      "bulle": [
        "Orchestration IA"
      ],
      "periode": "2026–aujourd’hui",
      "enfants": [
        "skylivra",
        "barysense",
        "knockin",
        "poussepousse",
        "cv-interactif"
      ]
    },
    {
      "id": "barysense",
      "type": "personnel",
      "titre": "BarySense · Suivi du café",
      "titreCourt": "BarySense · Suivi du café",
      "lieu": "",
      "resume": "Application de suivi des cafés, des machines, des extractions et du stock.",
      "apportCourt": "Organisation du suivi des stocks et des dépenses dans un outil adapté aux usages.",
      "contexte": "Application issue d’une pratique personnelle du café : suivi des cafés, réglages, extractions, machines et paquets.",
      "missions": [
        "Définition des informations à conserver et des parcours de consultation.",
        "Organisation des écrans et des réglages d’extraction.",
        "Suivi du stock de café, des dépenses et des cafés à racheter.",
        "Pilotage des évolutions avec l’appui des assistants IA."
      ],
      "competences": [
        "creations-ia",
        "gestion",
        "plateformes"
      ],
      "outils": [
        "Next.js",
        "React",
        "Supabase",
        "Assistants IA"
      ],
      "apports": [
        "Structuration des données",
        "Conception d’interfaces",
        "Suivi d’activité"
      ],
      "transfert": "Transformer un besoin concret en un outil organisé, puis contrôler les évolutions.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-009.webp",
          "alt": "BarySense — accueil de l’application",
          "legende": "BarySense — accueil de l’application"
        },
        {
          "src": "assets/photos/selection/selection-008.webp",
          "alt": "BarySense — gestion des machines à café",
          "legende": "BarySense — gestion des machines à café"
        },
        {
          "src": "assets/photos/selection/selection-010.webp",
          "alt": "BarySense — fiche et réglages café",
          "legende": "BarySense — fiche et réglages café"
        }
      ],
      "sections": [
        {
          "titre": "Identité visuelle",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-011.webp",
              "alt": "BarySense — visuel de présentation",
              "legende": "BarySense — visuel de présentation"
            },
            {
              "src": "assets/photos/selection/selection-012.webp",
              "alt": "BarySense — identité visuelle",
              "legende": "BarySense — identité visuelle"
            }
          ]
        }
      ],
      "bulle": [
        "BarySense"
      ],
      "periode": "2026",
      "parent": "outils-ia"
    },
    {
      "id": "knockin",
      "type": "personnel",
      "titre": "Knockin ever Door · Recherche d’emploi",
      "titreCourt": "Knockin ever Door · CRM candidatures",
      "lieu": "",
      "resume": "Conception d’un outil de suivi des entreprises, contacts, candidatures et relances.",
      "apportCourt": "Suivi structuré des contacts, candidatures, rendez-vous et relances.",
      "contexte": "Projet personnel né d’un besoin concret : centraliser une recherche d’emploi. Le cadrage des besoins et le pilotage de la réalisation s’appuient sur des assistants IA.",
      "missions": [
        "Cadrage fonctionnel : entreprises, contacts, candidatures, rendez-vous, relances.",
        "Agrégation des offres et cohérence des filtres de recherche, y compris géographiques.",
        "Données de l’outil organisées dans Supabase.",
        "Retours d’usage et contrôle des évolutions."
      ],
      "competences": [
        "creations-ia",
        "gestion",
        "plateformes"
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "Supabase"
      ],
      "apports": [
        "Cadrage fonctionnel",
        "Suivi de relances",
        "Contrôle qualité"
      ],
      "transfert": "Exprimer un besoin clairement et vérifier qu’un outil y répond : un atout pour accompagner des projets numériques.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-050.webp",
          "alt": "Knockin ever Door — création d’une démarche",
          "legende": "Knockin ever Door — création d’une démarche"
        },
        {
          "src": "assets/photos/selection/selection-044.webp",
          "alt": "Knockin ever Door — filtres de suivi des démarches",
          "legende": "Knockin ever Door — filtres de suivi des démarches"
        },
        {
          "src": "assets/photos/selection/selection-049.webp",
          "alt": "Knockin ever Door — suivi des pistes, informations masquées",
          "legende": "Knockin ever Door — suivi des pistes, informations masquées"
        }
      ],
      "sections": [
        {
          "titre": "Offres · Recherche, classement",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-045.webp",
              "alt": "Knockin ever Door — recherche d’offres en cours",
              "legende": "Knockin ever Door — recherche d’offres en cours"
            },
            {
              "src": "assets/photos/selection/selection-047.webp",
              "alt": "Knockin ever Door — offres collectées",
              "legende": "Knockin ever Door — offres collectées"
            },
            {
              "src": "assets/photos/selection/selection-051.webp",
              "alt": "Knockin ever Door — classement et recherche d’offres",
              "legende": "Knockin ever Door — classement et recherche d’offres"
            }
          ]
        },
        {
          "titre": "Connexion",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-046.webp",
              "alt": "Knockin ever Door — écran de connexion",
              "legende": "Knockin ever Door — écran de connexion"
            }
          ]
        },
        {
          "titre": "Suivi Excel",
          "galerie": [
            {
              "src": "assets/photos/selection/selection-048.webp",
              "alt": "Tableau de bord Excel de suivi des candidatures",
              "legende": "Tableau de bord Excel de suivi des candidatures"
            }
          ],
          "paragraphes": [
            "Tableau de bord personnel de suivi des candidatures."
          ]
        }
      ],
      "bulle": [
        "Knockin ever Door"
      ],
      "periode": "2026–aujourd’hui",
      "parent": "outils-ia"
    },
    {
      "id": "skylivra",
      "type": "personnel",
      "titre": "SkyLivra · Créations / Simulation aérienne",
      "titreCourt": "SkyLivra · Créations / Simulation aérienne",
      "important": true,
      "lieu": "",
      "resume": "Direction artistique, cadrage et pilotage avec l’IA de créations et d’outils pour la simulation de vol.",
      "apportCourt": "Cadrage du projet, coordination des intervenants et contrôle des livrables.",
      "contexte": "Définition des besoins, fourniture des références, pilotage des assistants IA et contrôle dans le simulateur. Les IA produisent le code technique ; la direction fonctionnelle et artistique reste assurée par Alain Ferro.",
      "missions": [
        "Définir les besoins, les contraintes techniques et les critères d’acceptation de chaque création.",
        "Structurer l’architecture : rôle des modules, interfaces, dépendances et circulation des données.",
        "Orchestrer plusieurs assistants IA avec des consignes communes, des périmètres de travail et des revues croisées.",
        "Piloter les textures, les effets visuels, le site et les outils d’installation, puis contrôler leur cohérence.",
        "Suivre les versions, documenter les reprises et tester les résultats, notamment en vol dans MSFS."
      ],
      "competences": [
        "creations-ia",
        "gestion",
        "plateformes"
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "Python",
        "C++ / WebAssembly",
        "SDK MSFS 2020 / SimConnect",
        "HTML / CSS / JavaScript",
        "Tauri / Rust",
        "Supabase",
        "Netlify",
        "Inno Setup",
        "Git / GitHub",
        "PhotoFiltre",
        "OBS Studio",
        "Stripe",
        "Brevo"
      ],
      "apports": [
        "Architecture fonctionnelle",
        "Orchestration d’IA",
        "Direction créative",
        "Gestion des dépendances",
        "Tests et diagnostic",
        "Suivi de versions",
        "Documentation"
      ],
      "transfert": "Transformer un besoin en projet structuré, coordonner des intervenants et des outils différents, puis contrôler que le résultat répond aux attentes.",
      "galerie": [
        {
          "src": "assets/photos/selection/skylivra-decollage-boucle.gif",
          "alt": "Découvrir SkyLivra",
          "legende": "Découvrir SkyLivra",
          "attente": "Ouverture prochaine : le site SkyLivra est finalisé. Sa mise en ligne publique est suspendue dans l’attente de la validation de mes partenaires ; il sera accessible dès leur accord.",
          "statique": "assets/photos/selection/skylivra-affiche.webp"
        },
        {
          "src": "assets/photos/selection/selection-092.webp",
          "alt": "SkyLivra — écran de l’installateur",
          "legende": "SkyLivra — écran de l’installateur"
        }
      ],
      "sections": [
        {
          "titre": "Sous-projets",
          "ouvert": true,
          "points": [
            "Livrées d’avions pour Microsoft Flight Simulator : textures, matériaux et variantes.",
            "Add-ons : aurores boréales et australes (effets visuels en C++ / WebAssembly), outils de vues caméra.",
            "Site e-commerce : catalogue, panier, paiement Stripe et e-mails Brevo, hébergé sur Netlify.",
            "Site de gestion : espace d’administration du site marchand.",
            "Logiciel Windows SkyLivra Manager : installation et mise à jour des créations chez les clients.",
            "Studios vidéo : outils de montage des clips de présentation des livrées et de cinématiques du simulateur."
          ]
        },
        {
          "titre": "Architecture · Orchestration des IA",
          "paragraphes": [
            "Transformation d’une intention en instructions et en livrables vérifiables, avec une vue d’ensemble du projet et une répartition claire des responsabilités entre outils et assistants."
          ],
          "points": [
            "Découpage en modules : site, catalogue, créations, effets, fabrication et installation.",
            "Définition des interfaces, des données échangées et des dépendances entre les composants.",
            "Consignes et documents partagés pour préserver les décisions entre sessions et répartir les interventions.",
            "Revues croisées, essais, corrections successives et suivi des versions avec Git / GitHub.",
            "Manipulation de Git et GitHub avec l’appui des IA : dépôts, différences entre versions, commits et publication des évolutions."
          ]
        },
        {
          "titre": "Livrées · Textures",
          "paragraphes": [
            "Définition de la direction artistique des livrées, fourniture des références et pilotage des corrections jusqu’au rendu recherché. La fabrication relie les maquettes aux textures utilisées dans le simulateur."
          ],
          "points": [
            "Briefs visuels, maquettes et retouches : motifs, couleurs et continuité entre les différentes pièces de l’avion.",
            "Préparation et contrôle des textures DDS, de leurs alignements et de leur intégration dans les paquets MSFS.",
            "Suivi des variantes, assemblage des paquets et préparation des installateurs Windows.",
            "Contrôle visuel dans le simulateur et réalisation de clips de présentation avec OBS Studio."
          ]
        },
        {
          "titre": "Site web · Application Windows",
          "paragraphes": [
            "Le projet comprend les outils de présentation des créations et d’installation. Leur conception fonctionnelle et leur cohérence font partie du pilotage d’ensemble."
          ],
          "points": [
            "Site de présentation et catalogue en HTML, CSS et JavaScript, avec des fonctions serveur Netlify et des services Supabase.",
            "Organisation des données du catalogue, de la présentation des produits et du parcours de distribution, dont l’intégration de Stripe Checkout.",
            "Supabase : organisation du catalogue et des données, authentification et stockage ; Brevo : modèles et envoi des e-mails transactionnels.",
            "SkyLivra Manager 0.9.0 : application Windows fondée sur Tauri et Rust, avec détection de l’installation MSFS et catalogue des créations.",
            "Contrôle des fichiers par empreinte SHA-256 et suivi des installations, mises à jour et désinstallations."
          ]
        },
        {
          "titre": "Fabrication · Diagnostic · Documentation",
          "paragraphes": [
            "Une chaîne de fabrication structurée et des contrôles à chaque étape rendent les créations reproductibles. Les essais isolés et les vérifications dans le simulateur répondent à des besoins différents."
          ],
          "points": [
            "Scripts Python de génération d’effets, de textures et de préparation des paquets.",
            "Compilation avec le SDK MSFS, audits statiques et tests du module WebAssembly sur un hôte simulé.",
            "Outils de diagnostic pour comprendre les effets invisibles, les états du module ou les problèmes d’intégration.",
            "Installateurs Inno Setup, numéros de version, preuves de contrôle et documentation de reprise.",
            "Organisation des sources, configurations et sauvegardes pour conserver la continuité du travail."
          ]
        }
      ],
      "bulle": [
        "SkyLivra"
      ],
      "periode": "2026–aujourd’hui",
      "parent": "outils-ia",
      "enfants": [
        "skylivra-ancient-dragon",
        "skylivra-aurora-borealis-blue",
        "skylivra-phoenix-pristine",
        "skylivra-aurores"
      ],
      "enfantsTitre": "Créations livrées"
    },
    {
      "id": "skylivra-ancient-dragon",
      "type": "personnel",
      "titre": "Ancient Dragon",
      "titreCourt": "Ancient Dragon",
      "lieu": "",
      "resume": "Livrée « dragon » pour le Fenix A320 CFM dans Microsoft Flight Simulator 2020, extérieur et cabine.",
      "apportCourt": "Direction artistique d’une livrée complète, de la tête du dragon aux fresques de cabine.",
      "contexte": "Livrée SkyLivra pour le Fenix A320 CFM de Microsoft Flight Simulator 2020, immatriculation fictive A-DRGN. Alain Ferro définit la direction artistique, approuve les maquettes et contrôle le rendu ; la fabrication est pilotée avec des assistants IA.",
      "missions": [
        "Choix de la tête « Ancien » : armure cuivrée, écailles orientées de l’avant vers l’arrière, regard ambre et vapeur peinte sur le museau.",
        "Respect de la silhouette réelle de l’avion : aucun ajout géométrique, cadres, poignées et signalétique conservés.",
        "Cabine approuvée sur maquette : fresques cuivre et ivoire au plafond, sur les porte-bagages et les parois, sols taupe.",
        "Emblème du dragon sur les 174 sièges passagers et les deux sièges pilotes.",
        "Préparation des textures DDS et de l’installateur Windows, contrôles avant l’essai en vol dans MSFS."
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "Python",
        "Blender",
        "SDK MSFS 2020",
        "OBS Studio"
      ],
      "apports": [
        "Direction artistique",
        "Cohérence extérieur et cabine",
        "Contrôle qualité"
      ],
      "transfert": "Traduire une intention artistique en consignes précises, puis contrôler chaque surface jusqu’au rendu attendu.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-077.webp",
          "alt": "Ancient Dragon — vue extérieure dans MSFS",
          "legende": "Ancient Dragon — vue extérieure dans MSFS"
        },
        {
          "src": "assets/photos/selection/selection-078.webp",
          "alt": "Ancient Dragon — aménagement intérieur",
          "legende": "Ancient Dragon — aménagement intérieur"
        },
        {
          "src": "assets/photos/selection/selection-079.webp",
          "alt": "Ancient Dragon — vue de profil dans MSFS",
          "legende": "Ancient Dragon — vue de profil dans MSFS"
        },
        {
          "video": "assets/videos/ancient-dragon-exterieur.mp4",
          "poster": "assets/videos/ancient-dragon-exterieur.webp",
          "alt": "Ancient Dragon — vues extérieures",
          "legende": "Ancient Dragon — vues extérieures"
        },
        {
          "video": "assets/videos/ancient-dragon-interieur.mp4",
          "poster": "assets/videos/ancient-dragon-interieur.webp",
          "alt": "Ancient Dragon — cockpit et cabine",
          "legende": "Ancient Dragon — cockpit et cabine"
        }
      ],
      "bulle": [
        "Ancient Dragon"
      ],
      "periode": "2026",
      "parent": "skylivra"
    },
    {
      "id": "skylivra-aurora-borealis-blue",
      "type": "personnel",
      "titre": "Aurora Borealis Blue",
      "titreCourt": "Aurora Borealis Blue",
      "lieu": "",
      "resume": "Livrée aux couleurs des aurores boréales pour le Fenix A320 CFM dans Microsoft Flight Simulator 2020 : extérieur, cockpit et cabine.",
      "apportCourt": "Livrée menée jusqu’à sa validation en jeu par des révisions successives.",
      "contexte": "Livrée SkyLivra pour le Fenix A320 CFM de Microsoft Flight Simulator 2020, terminée en version 1.28.0 après validation en jeu par Alain Ferro le 1er novembre 2026. Alain fixe la direction artistique, essaie les versions dans le simulateur et demande les corrections ; les assistants IA produisent les textures et les installateurs. Une déclinaison pour le PMDG 737-900ER existe, sans validation en jeu à ce jour.",
      "missions": [
        "Maquettes extérieure et intérieure approuvées, puis emblème Aurora Borealis décliné sur la dérive, les portes et les appuie-têtes.",
        "Aurore en haute définition et ciel étoilé, avec continuité du motif entre les pièces qui partagent leurs coordonnées de texture.",
        "Alignement des motifs des volets et des becs, contrôlé à chaque cran de sortie.",
        "Cabine et cockpit : voile blanc partagé par six sièges, plafond, sols et poste de pilotage retravaillés.",
        "Essais en vol, retours précis et suivi des révisions jusqu’à la version 1.28.0."
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "Python",
        "SDK MSFS 2020",
        "SPAD.neXt",
        "OBS Studio"
      ],
      "apports": [
        "Direction artistique",
        "Itérations contrôlées",
        "Tests en simulateur"
      ],
      "transfert": "Conduire un livrable par itérations courtes, avec des retours précis, jusqu’à sa validation finale.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-088.webp",
          "alt": "Aurora Borealis Blue — vue extérieure",
          "legende": "Aurora Borealis Blue — vue extérieure"
        },
        {
          "src": "assets/photos/selection/selection-089.webp",
          "alt": "Aurora Borealis Blue — voilure et motifs",
          "legende": "Aurora Borealis Blue — voilure et motifs"
        },
        {
          "src": "assets/photos/selection/selection-091.webp",
          "alt": "Aurora Borealis Blue — vue de profil",
          "legende": "Aurora Borealis Blue — vue de profil"
        },
        {
          "src": "assets/photos/selection/selection-085.webp",
          "alt": "Aurora Borealis Blue — poste de pilotage",
          "legende": "Aurora Borealis Blue — poste de pilotage"
        },
        {
          "src": "assets/photos/selection/selection-086.webp",
          "alt": "Aurora Borealis Blue — sièges du cockpit",
          "legende": "Aurora Borealis Blue — sièges du cockpit"
        },
        {
          "src": "assets/photos/selection/selection-087.webp",
          "alt": "Aurora Borealis Blue — décoration de la cabine",
          "legende": "Aurora Borealis Blue — décoration de la cabine"
        },
        {
          "src": "assets/photos/selection/selection-090.webp",
          "alt": "Aurora Borealis Blue — cabine passagers",
          "legende": "Aurora Borealis Blue — cabine passagers"
        },
        {
          "video": "assets/videos/aurora-blue-exterieur.mp4",
          "poster": "assets/videos/aurora-blue-exterieur.webp",
          "alt": "Aurora Borealis Blue — vues extérieures",
          "legende": "Aurora Borealis Blue — vues extérieures"
        },
        {
          "video": "assets/videos/aurora-blue-interieur.mp4",
          "poster": "assets/videos/aurora-blue-interieur.webp",
          "alt": "Aurora Borealis Blue — cockpit et cabine",
          "legende": "Aurora Borealis Blue — cockpit et cabine"
        }
      ],
      "bulle": [
        "Aurora Borealis Blue"
      ],
      "periode": "2026",
      "parent": "skylivra"
    },
    {
      "id": "skylivra-phoenix-pristine",
      "type": "personnel",
      "titre": "Phoenix — Pristine",
      "titreCourt": "Phoenix — Pristine",
      "lieu": "",
      "resume": "Livrée Phoenix, version neuve, pour le Fenix A320 CFM dans Microsoft Flight Simulator 2020.",
      "apportCourt": "Livrée de référence d’une famille, déclinée ensuite en version usée.",
      "contexte": "Livrée SkyLivra pour le Fenix A320 CFM de Microsoft Flight Simulator 2020, immatriculation fictive F-PHNX. Les sources de peinture correspondent à l’édition confirmée par Alain Ferro le 8 octobre 2026 ; les éditions suivantes renforcent l’installateur. La variante usée Phoenix — Weathered en dépend.",
      "missions": [
        "Direction artistique de la livrée et validation des sources de peinture.",
        "Habillage de l’extérieur et de la cabine : motifs, voilure, sièges, cloisons et décor de plafond.",
        "Base de la variante usée Phoenix — Weathered.",
        "Installateur Windows renforcé : reprise automatique en cas de fichier verrouillé et restauration protégée.",
        "Contrôles du profil, du logo, des dépendances et de la fabrication avant chaque édition."
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "Python",
        "SDK MSFS 2020",
        "OBS Studio"
      ],
      "apports": [
        "Direction artistique",
        "Déclinaison de variantes",
        "Fiabilité de l’installation"
      ],
      "transfert": "Stabiliser une référence avant de la décliner, en contrôlant chaque nouvelle édition.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-098.webp",
          "alt": "Phoenix — Pristine : vue extérieure",
          "legende": "Phoenix — Pristine : vue extérieure"
        },
        {
          "src": "assets/photos/selection/selection-099.webp",
          "alt": "Phoenix — Pristine : motifs et voilure",
          "legende": "Phoenix — Pristine : motifs et voilure"
        },
        {
          "src": "assets/photos/selection/selection-103.webp",
          "alt": "Phoenix — Pristine : vue de profil",
          "legende": "Phoenix — Pristine : vue de profil"
        },
        {
          "src": "assets/photos/selection/selection-096.webp",
          "alt": "Phoenix — Pristine : avion dans le simulateur",
          "legende": "Phoenix — Pristine : avion dans le simulateur"
        },
        {
          "src": "assets/photos/selection/selection-097.webp",
          "alt": "Phoenix — Pristine : sièges et cloisons",
          "legende": "Phoenix — Pristine : sièges et cloisons"
        },
        {
          "src": "assets/photos/selection/selection-100.webp",
          "alt": "Phoenix — Pristine : cabine passagers",
          "legende": "Phoenix — Pristine : cabine passagers"
        },
        {
          "src": "assets/photos/selection/selection-101.webp",
          "alt": "Phoenix — Pristine : décor de plafond",
          "legende": "Phoenix — Pristine : décor de plafond"
        },
        {
          "src": "assets/photos/selection/selection-102.webp",
          "alt": "Phoenix — Pristine : sièges du cockpit",
          "legende": "Phoenix — Pristine : sièges du cockpit"
        },
        {
          "src": "assets/photos/selection/selection-104.webp",
          "alt": "Phoenix — Pristine : ambiance de cabine",
          "legende": "Phoenix — Pristine : ambiance de cabine"
        },
        {
          "video": "assets/videos/phoenix-cabine-court.mp4",
          "poster": "assets/videos/phoenix-cabine-court.webp",
          "alt": "Phoenix — Pristine : ambiance de cabine",
          "legende": "Phoenix — Pristine : ambiance de cabine"
        },
        {
          "video": "assets/videos/phoenix-exterieur.mp4",
          "poster": "assets/videos/phoenix-exterieur.webp",
          "alt": "Phoenix — Pristine : vues extérieures",
          "legende": "Phoenix — Pristine : vues extérieures"
        },
        {
          "video": "assets/videos/phoenix-interieur.mp4",
          "poster": "assets/videos/phoenix-interieur.webp",
          "alt": "Phoenix — Pristine : cockpit et cabine",
          "legende": "Phoenix — Pristine : cockpit et cabine"
        }
      ],
      "bulle": [
        "Phoenix — Pristine"
      ],
      "periode": "2026",
      "parent": "skylivra"
    },
    {
      "id": "skylivra-aurores",
      "type": "personnel",
      "titre": "Aurora Borealis Add-on",
      "titreCourt": "Aurora Borealis Add-on",
      "lieu": "",
      "resume": "Add-on faisant apparaître des aurores boréales et australes pendant les vols de nuit dans Microsoft Flight Simulator 2020.",
      "apportCourt": "Pilotage de la conception d’un effet visuel dynamique, du scénario au panneau de commande.",
      "contexte": "Add-on SkyLivra pour Microsoft Flight Simulator 2020. Alain Ferro définit le rendu recherché à partir de références photographiques, essaie les versions en vol et oriente les corrections ; le code C++ / WebAssembly et les scripts Python sont produits par les assistants IA.",
      "missions": [
        "Définition du comportement : activation de nuit selon la position de l’avion et l’ovale auroral.",
        "Choix de la direction visuelle : lueurs vert-bleu, arcs lumineux, couleurs réparties selon l’altitude.",
        "Conception du panneau de commande dans le simulateur : interrupteur et indication d’état.",
        "Essais en vol, diagnostic des versions successives et suivi jusqu’à la version 0.10.3."
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
        "C++ / WebAssembly",
        "SDK MSFS 2020 / SimConnect",
        "Python",
        "Inno Setup"
      ],
      "apports": [
        "Conception fonctionnelle",
        "Tests et diagnostic",
        "Suivi de versions"
      ],
      "transfert": "Décrire un comportement attendu, le faire réaliser par étapes et vérifier le résultat en conditions réelles.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-082.webp",
          "alt": "Aurora Borealis Add-on — capture de diagnostic 0.9.2",
          "legende": "Aurora Borealis Add-on — capture de diagnostic 0.9.2"
        },
        {
          "video": "assets/videos/aurores-vues-exterieures.mp4",
          "poster": "assets/videos/aurores-vues-exterieures.webp",
          "alt": "Aurores dans le simulateur — vues extérieures",
          "legende": "Aurores dans le simulateur — vues extérieures"
        },
        {
          "video": "assets/videos/aurores-en-vol.mp4",
          "poster": "assets/videos/aurores-en-vol.webp",
          "alt": "Aurores dans le simulateur — en vol",
          "legende": "Aurores dans le simulateur — en vol"
        }
      ],
      "sections": [
        {
          "titre": "Fonctionnement",
          "ouvert": false,
          "paragraphes": [
            "Pilotage de la conception d’un add-on faisant apparaître des aurores pendant les vols de nuit, en fonction de la position de l’avion.",
            "Les captures et vidéos montrent des états de travail distincts : la capture de diagnostic est identifiée comme version 0.9.2."
          ],
          "points": [
            "Activation de nuit lorsque l’avion se trouve à portée de l’ovale auroral de son hémisphère.",
            "Niveau d’activité géomagnétique simulé, tiré à chaque nuit, qui fait varier l’étendue des phénomènes.",
            "Apparition progressive : les lueurs naissent en continu et s’allument en fondu ; le ciel se remplit en une à deux minutes.",
            "Animation par vagues lentes et sursauts, avec extinction en fondu à l’aube ou en quittant la zone visible.",
            "Arcs lumineux suivant la courbure de l’ovale et la rotondité de la Terre, avec des couleurs réparties selon l’altitude.",
            "Panneau de commande dans le simulateur, interrupteur et indication d’état, avec remise en marche automatique à l’entrée dans une zone visible.",
            "Module C++ compilé en WebAssembly, échanges SimConnect et effets VFX ; génération des textures et des graphes d’effets par des scripts Python."
          ]
        }
      ],
      "bulle": [
        "Aurora Borealis Add-on"
      ],
      "periode": "2026",
      "parent": "skylivra"
    },
    {
      "id": "poussepousse",
      "type": "personnel",
      "parent": "outils-ia",
      "competences": [
        "creations-ia",
        "plateformes"
      ],
      "titre": "PoussePousse · Potager",
      "titreCourt": "PoussePousse",
      "lieu": "Projet personnel",
      "resume": "Application de plan et de suivi d’un potager, utilisable sur téléphone, tablette et PC.",
      "apportCourt": "Organisation des cultures, des arrosages et des récoltes dans un outil simple au quotidien.",
      "contexte": "Application installable sur Android depuis Chrome, qui fonctionne aussi hors connexion, née de la pratique du jardinage.",
      "missions": [
        "Plan du jardin au cœur de l’application : emplacements, cultures et état de chaque parcelle.",
        "Suivi des semis, des graines, des arrosages, des récoltes et des dépenses.",
        "Journal du potager et sauvegarde des données sur l’appareil.",
        "Pilotage de la réalisation avec des assistants IA et contrôle des évolutions."
      ],
      "outils": [
        "React",
        "Vite",
        "TypeScript"
      ],
      "apports": [
        "Conception d’interfaces",
        "Structuration des données",
        "Usage mobile"
      ],
      "bulle": [
        "PoussePousse"
      ],
      "periode": "2026"
    },
    {
      "id": "cv-interactif",
      "type": "personnel",
      "parent": "outils-ia",
      "competences": [
        "creations-ia",
        "plateformes"
      ],
      "titre": "CV interactif · Site et PDF",
      "titreCourt": "CV interactif",
      "lieu": "Projet personnel",
      "resume": "Ce CV : un site publié sur GitHub Pages et un PDF interactif relié au site, construits à partir d’une seule source de contenu.",
      "apportCourt": "Un même contenu, une même version, deux supports cohérents.",
      "contexte": "Projet conçu et dirigé par Alain Ferro, réalisé avec deux assistants IA coordonnés (Claude et Codex) qui se répartissent les tâches et se relisent.",
      "missions": [
        "Définition du contenu, de l’organisation des pages et du design.",
        "Site : parcours interactif, compétences, formations, intérêts, carte des liens.",
        "PDF : bulles reliées façon Obsidian, boutons animés et QR code vers la dernière version.",
        "Numéro de version commun au site et au PDF, contrôles automatiques avant chaque publication."
      ],
      "outils": [
        "GitHub",
        "Claude",
        "Codex"
      ],
      "apports": [
        "Orchestration d’IA",
        "Direction créative",
        "Suivi de versions"
      ],
      "site": {
        "url": "https://alcazenway.github.io/cv-alain-ferro/",
        "libelle": "Voir le site"
      },
      "bulle": [
        "CV interactif"
      ],
      "periode": "2026–aujourd’hui"
    },
    {
      "id": "jeunesse",
      "type": "personnel",
      "titre": "Loisirs actuels",
      "titreCourt": "Loisirs actuels",
      "lieu": "",
      "resume": "Piano, curiosité scientifique et découvertes : des loisirs pratiqués aujourd’hui.",
      "apportCourt": "Loisirs culturels et scientifiques, apprentissage autonome et activités collectives.",
      "contexte": "Piano en amateur et intérêt durable pour l’astronomie et la physique, nourri par des visites et des découvertes en voyage. Auparavant, football pratiqué pendant quinze ans.",
      "missions": [
        "Piano en amateur.",
        "Lectures et contenus scientifiques : astronomie, physique.",
        "Visites et découvertes en voyage.",
        "Football en club pendant quinze ans."
      ],
      "competences": [],
      "apports": [
        "Esprit d’équipe",
        "Persévérance",
        "Curiosité"
      ],
      "transfert": "Le goût d’apprendre par soi-même, et une longue habitude du collectif.",
      "galerie": [
        {
          "src": "assets/photos/selection/selection-031.webp",
          "alt": "Découverte de formations rocheuses"
        },
        {
          "src": "assets/photos/selection/selection-032.webp",
          "alt": "Curiosité et découvertes en voyage"
        },
        {
          "src": "assets/photos/selection/selection-033.webp",
          "alt": "Visite d’un espace de médiation scientifique"
        },
        {
          "src": "assets/photos/selection/selection-034.webp",
          "alt": "Piano et mécanique de l’instrument"
        }
      ],
      "bulle": [
        "Loisirs actuels"
      ],
      "periode": "1993–aujourd’hui"
    }
  ],
  "mentions": {
    "editeur": "Alain Ferro, Poussan (34560), alainferro34@gmail.com.",
    "hebergeur": "GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
    "donnees": "Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne contient aucun formulaire : l’éditeur ne collecte aucune donnée. Le bouton « Proposer un entretien » ouvre simplement votre messagerie, sans aucun envoi automatique. Comme tout hébergeur, GitHub peut conserver des journaux techniques de connexion.",
    "maj": "11 novembre 2026",
    "version": "2.43.0"
  },
  "alias": {
    "thermes-adjoint": "thermes-responsable"
  },
  "retirees": [
    "enfance",
    "adolescence",
    "blockchain"
  ],
  "aliasCompetences": {
    "ia": "creations-ia"
  },
  "redirections": {
    "/parcours/outils-ia": "/orchestration-ia",
    "/competence/creations-ia": "/orchestration-ia",
    "/competence/ia": "/orchestration-ia",
    "/realisations": "/",
    "/carte": "/"
  },
  "methode": {
    "titre": "Méthode",
    "intro": "Au centre, je joue le rôle de l’orchestrateur : je cadre, je confie le travail aux assistants IA, je fais relire et je contrôle chaque livrable. Déplacez les bulles, survolez-les pour voir leurs liens, filtrez par application.",
    "actions": [
      {
        "id": "cadrer",
        "titre": "Cadrer le besoin",
        "icone": "cible",
        "texte": "Définir les besoins, les contraintes techniques et les critères d’acceptation de chaque création.",
        "assistants": [
          "ChatGPT",
          "Claude"
        ],
        "projets": [
          "skylivra",
          "barysense",
          "knockin",
          "poussepousse",
          "cv-interactif"
        ]
      },
      {
        "id": "consignes",
        "titre": "Rédiger les consignes",
        "icone": "plume",
        "texte": "Consignes structurées communes et bibliothèque de compétences réutilisables (skills), pour que chaque assistant applique les mêmes règles d’un projet à l’autre.",
        "assistants": [
          "ChatGPT",
          "Claude",
          "Codex",
          "Claude Code"
        ],
        "projets": [
          "skylivra",
          "barysense",
          "knockin",
          "poussepousse",
          "cv-interactif"
        ]
      },
      {
        "id": "architecture",
        "titre": "Découper en modules",
        "icone": "blocs",
        "texte": "Architecture fonctionnelle : découper les projets en modules, préciser leurs interfaces et dépendances, puis coordonner la fabrication.",
        "assistants": [
          "Claude Code",
          "Codex"
        ],
        "projets": [
          "skylivra",
          "barysense",
          "knockin",
          "poussepousse",
          "cv-interactif"
        ]
      },
      {
        "id": "repartir",
        "titre": "Répartir entre assistants",
        "icone": "aiguillage",
        "texte": "Plusieurs assistants travaillent en parallèle avec Orca, chacun sur un périmètre défini.",
        "assistants": [
          "Orca",
          "Claude",
          "Codex"
        ],
        "projets": [
          "skylivra",
          "cv-interactif"
        ]
      },
      {
        "id": "relire",
        "titre": "Faire relire",
        "icone": "oeil",
        "texte": "Revues croisées entre assistants et synchronisation par des fichiers de coordination communs.",
        "assistants": [
          "Claude",
          "Codex"
        ],
        "projets": [
          "skylivra",
          "cv-interactif"
        ]
      },
      {
        "id": "controler",
        "titre": "Tester et contrôler",
        "icone": "coche",
        "texte": "Contrôle des livrables, retours d’usage et corrections successives, jusqu’à la vérification du résultat ; essais en vol dans le simulateur pour SkyLivra.",
        "assistants": [
          "Claude Code",
          "Codex"
        ],
        "projets": [
          "skylivra",
          "barysense",
          "knockin",
          "poussepousse",
          "cv-interactif"
        ]
      },
      {
        "id": "versionner",
        "titre": "Versionner et documenter",
        "icone": "branche",
        "texte": "Suivi des versions avec Git et GitHub, dossiers de référence et documents de reprise entre sessions.",
        "assistants": [],
        "outils": [
          "Git",
          "GitHub"
        ],
        "projets": [
          "skylivra",
          "barysense",
          "knockin",
          "poussepousse",
          "cv-interactif"
        ]
      }
    ]
  }
};
