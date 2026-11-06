/* Contenu du site v2.1 (6 novembre 2026). Repris de la v2.0.
   Le parcours est rangé du plus ancien au plus récent (l’ordre du tableau fait foi, comme la frise du PDF) ;
   aucune date intermédiaire affichée. « bulle » : titre seul des bulles de la spirale et du sommaire.
   « important » : six éléments mis en avant par une teinte plus foncée.
   Les fiches de type « formation » forment l’onglet « Savoir - formations », hors spirale.
   « alias » : anciennes fiches redirigées (Responsable soins adjoint fusionné dans thermes-responsable).
   « retirees » : fiches supprimées en v2.1 (Enfance, Adolescence), redirigées vers le parcours.
   Ajouter une photo : déposer un fichier WebP dans assets/photos/ puis ajouter à la fiche
   galerie: [{src: "assets/photos/nom.webp", alt: "Description précise", legende: "Texte visible"}]
   Une vidéo : {video: "assets/videos/nom.mp4", poster: "assets/videos/nom.webp", alt: "…", legende: "…"}
   Une fiche sans média n'affiche aucune galerie. */
window.CV = {
  "identite": {
    "nom": "Alain Ferro",
    "accroche": "Gestion et coordination administrative",
    "promesse": "Pendant dix ans, j’ai encadré des équipes de soins aux Thermes de Balaruc-les-Bains. Auparavant, j’ai créé et géré pendant sept ans une activité de négoce. Titulaire du titre professionnel Comptable assistant, j’aime organiser le travail, tenir des dossiers à jour et faire circuler l’information. J’utilise Excel avancé et je mène des projets numériques avec l’IA.",
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
    "cvPdf": "./CV_Alain_Ferro.pdf?v=2.1",
    "mail": {
      "objet": "Proposition d’entretien",
      "corps": "Bonjour Monsieur Ferro,\n\nJ’ai consulté votre CV en ligne et votre parcours m’intéresse pour un poste de [intitulé du poste] au sein de [entreprise], à [lieu].\n\nJe vous propose un entretien [proposition de date et d’horaire], en présentiel ou par téléphone.\n\nCordialement,\n\n[Prénom Nom]\n[Fonction] · [Entreprise]\n[Téléphone]"
    },
    "appui": "Comptabilité et projets numériques en appui",
    "recherche": "Poste recherché en CDI, autour de Poussan"
  },
  "pistes": {
    "titre": "Postes visés",
    "texte": "Environ 80 % de bureau, autour de Poussan.",
    "metiers": [
      "Coordinateur administratif",
      "Assistant administratif",
      "Assistant de gestion",
      "Gestionnaire de dossiers",
      "Assistant comptable",
      "Assistant commercial / ADV",
      "Coordinateur planning",
      "Assistant gestion documentaire",
      "Assistant projets numériques",
      "Support utilisateurs fonctionnel"
    ]
  },
  "chiffres": [
    {
      "valeur": "30 à 40",
      "libelle": "agents et kinés encadrés aux Thermes"
    },
    {
      "valeur": "10 ans",
      "libelle": "d’encadrement d’équipes"
    },
    {
      "valeur": "7 ans",
      "libelle": "à la tête d’une activité de négoce"
    },
    {
      "valeur": "850 / 1000",
      "libelle": "Tosa Excel avancé"
    }
  ],
  "competences": [
    {
      "id": "encadrement",
      "titre": "Encadrement d’équipes",
      "sousTitre": "30 à 40 agents et kinésithérapeutes",
      "resume": "Planifier, coordonner, écouter, désamorcer les tensions et accompagner les personnes au quotidien.",
      "detail": [
        "Encadrement direct d’agents de soins et de kinésithérapeutes aux Thermes de Balaruc-les-Bains, d’abord comme adjoint puis comme responsable soins.",
        "Planification de l’activité, coordination quotidienne des soins et accueil des curistes.",
        "Conduite d’entretiens annuels d’évaluation et d’entretiens professionnels (EVA / EP), médiation entre collaborateurs.",
        "Formations au management et à la gestion des conflits."
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
      "id": "ia",
      "titre": "Pilotage de projets avec l’IA",
      "sousTitre": "Cadrage, consignes, contrôle, versions, documentation",
      "resume": "Définir un besoin, rédiger des consignes précises, faire réaliser par des assistants IA et vérifier ce qui est livré.",
      "detail": [
        "Projets personnels menés avec ChatGPT, Codex et Claude Code : outil de suivi de recherche d’emploi, contenus et outils pour la simulation aérienne.",
        "Rôle tenu : cadrage fonctionnel, rédaction des consignes, retours d’usage, contrôle des livrables, suivi des versions et documentation.",
        "Une méthode de travail fondée sur des objectifs précis, des corrections successives et la vérification du résultat.",
        "Architecture fonctionnelle : découper les projets en modules, préciser leurs interfaces et dépendances, puis coordonner la fabrication, les essais et la documentation."
      ],
      "preuves": [
        "knockin",
        "skylivra",
        "outils-ia",
        "barysense"
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
        "Stripe : intégration de Checkout et des webhooks pour relier le paiement au traitement des commandes, réalisée par IA sous mon pilotage.",
        "Brevo : modèles, déclencheurs et envoi des e-mails transactionnels du site SkyLivra.",
        "Netlify : hébergement du site SkyLivra et de ses fonctions serveur.",
        "Le code technique est produit par des assistants IA ; mon rôle porte sur le cadrage, les consignes, les essais et le contrôle."
      ],
      "preuves": [
        "skylivra",
        "knockin",
        "outils-ia",
        "barysense"
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
      "famille": "Création et simulation",
      "items": [
        "Microsoft Flight Simulator",
        "SPAD.neXt",
        "OBS Studio",
        "YouTube",
        "Suno"
      ],
      "competence": "ia"
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
      ]
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
      ]
    },
    {
      "id": "numerique",
      "nom": "Technologie numérique",
      "texte": "Montage de PC, veille blockchain et outils conçus avec l’IA.",
      "image": {
        "src": "assets/photos/selection/selection-054.webp",
        "alt": "Montage d’un ordinateur sur table"
      },
      "fiches": [
        "pc",
        "blockchain",
        "knockin",
        "barysense",
        "outils-ia"
      ]
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
      ]
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
      ]
    },
    {
      "id": "course",
      "nom": "Course et marche",
      "texte": "Course à pied en amateur, marche.",
      "image": {
        "src": "assets/photos/selection/selection-002.webp",
        "alt": "Sortie à pied"
      },
      "fiches": [
        "plein-air"
      ]
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
      ]
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
      ]
    },
    {
      "id": "skiman",
      "type": "experience",
      "titre": "Skiman · Station de ski",
      "titreCourt": "Skiman · Bonascre",
      "lieu": "Le Chamois d’Or, Bonascre (Ariège)",
      "resume": "Vente, location et entretien de matériel de ski.",
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
      ]
    },
    {
      "id": "simulation",
      "type": "personnel",
      "titre": "Simulation de vol",
      "titreCourt": "Simulation de vol · Airbus · Boeing · Avions légers",
      "lieu": "",
      "resume": "Plus de vingt ans de simulation de vol sur PC : Airbus, Boeing et avions légers.",
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
      ]
    },
    {
      "id": "bac",
      "type": "formation",
      "titre": "Baccalauréat STT",
      "titreCourt": "Baccalauréat · STT",
      "lieu": "Lycée Joliot-Curie, Sète",
      "resume": "Sciences et technologies tertiaires, spécialité action et communication commerciales.",
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
      ]
    },
    {
      "id": "bts",
      "type": "formation",
      "titre": "Formation BTS commercial",
      "titreCourt": "Formation BTS · Commercial",
      "important": true,
      "lieu": "Sup’Exup, Montpellier",
      "resume": "Formation suivie en communication commerciale, en alternance avec le courtage en vins.",
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
      ]
    },
    {
      "id": "courtier",
      "type": "experience",
      "titre": "Apprenti courtier · Vins",
      "titreCourt": "Apprenti courtier · Vins",
      "lieu": "Louche, Saint-Christol (Hérault)",
      "resume": "Relation avec les domaines et collecte d’échantillons, en alternance.",
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
      ]
    },
    {
      "id": "londres",
      "type": "experience",
      "titre": "Londres · Restauration, sondages",
      "titreCourt": "Londres · Restauration · Sondages",
      "lieu": "Londres, Royaume-Uni",
      "resume": "Expériences en restauration et en enquêtes téléphoniques à Londres.",
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
      ]
    },
    {
      "id": "bateau",
      "type": "personnel",
      "titre": "Rénovation Bateau bois 11 m",
      "titreCourt": "Rénovation Bateau bois 11 m",
      "important": true,
      "lieu": "",
      "resume": "Trois ans de chantier sur une coque à clin.",
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
      ]
    },
    {
      "id": "negoce",
      "type": "experience",
      "titre": "Créateur gérant · Négoce B2B Truffes",
      "titreCourt": "Créateur gérant · Négoce B2B Truffes",
      "important": true,
      "lieu": "Saveurs Européennes Culinaires, Balaruc-les-Bains",
      "resume": "Achat et vente de truffes, champignons et produits dérivés auprès de la restauration gastronomique.",
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
          "src": "assets/photos/selection/selection-013.webp",
          "alt": "Support de l’activité de négoce",
          "legende": "Support de l’activité de négoce"
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
      ]
    },
    {
      "id": "pailletrice",
      "type": "experience",
      "titre": "Agent commercial · Vins",
      "titreCourt": "Agent commercial · Vins",
      "lieu": "Domaine Pailletrice, Pérols / Montpellier",
      "resume": "Prospection et vente de vins auprès des professionnels.",
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
      ]
    },
    {
      "id": "immobilier",
      "type": "experience",
      "titre": "Négociateur, conseiller immobilier",
      "titreCourt": "Conseiller · Immobilier",
      "lieu": "Carrefour Immobilier (Balaruc / Sète) et Century 21 (Sète)",
      "resume": "Prospection de mandats, recherche de biens, transactions et location.",
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
      ]
    },
    {
      "id": "thermes-agent",
      "type": "experience",
      "titre": "Agent qualifié · Soins thermaux",
      "titreCourt": "Agent de soins · Thermaux",
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Soins aux curistes en rhumatologie et phlébologie.",
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
      ]
    },
    {
      "id": "thermes-responsable",
      "type": "experience",
      "titre": "Responsable d’équipe soignant",
      "titreCourt": "Responsable d’équipe soignant",
      "important": true,
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Encadrement de 30 à 40 agents et kinésithérapeutes, planification et suivi de l’activité.",
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
      ]
    },
    {
      "id": "pc",
      "type": "personnel",
      "titre": "Montage, configuration PC",
      "titreCourt": "Montage · Informatique",
      "lieu": "",
      "resume": "Assemblage de deux ordinateurs, réseau et postes multi-écrans.",
      "contexte": "Pratique personnelle liée à la simulation aérienne.",
      "missions": [
        "Assemblage de deux PC.",
        "Configuration matérielle et logicielle.",
        "Mise en réseau et paramétrage des périphériques."
      ],
      "competences": [],
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
      ]
    },
    {
      "id": "maison",
      "type": "personnel",
      "titre": "Travaux · Habitation",
      "titreCourt": "Travaux · Habitation",
      "lieu": "Poussan",
      "resume": "Préparation, organisation et chiffrage de travaux d’habitation.",
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
      ]
    },
    {
      "id": "ged-gmao",
      "type": "formation",
      "titre": "Gestion documentaire, maintenance · GED / GMAO",
      "titreCourt": "GED · GMAO · SST · Secours",
      "lieu": "Formation interne, Thermes de Balaruc-les-Bains",
      "resume": "Prise en main des outils de gestion électronique des documents et de gestion de la maintenance.",
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
      ]
    },
    {
      "id": "blockchain",
      "type": "personnel",
      "titre": "Écosystèmes blockchain",
      "titreCourt": "Blockchains · Exploration",
      "lieu": "",
      "resume": "Veille et exploration personnelle des plateformes centralisées et décentralisées.",
      "contexte": "Intérêt personnel pour les technologies numériques émergentes.",
      "missions": [
        "Exploration des écosystèmes CeFi et DeFi.",
        "Gestion de portefeuilles numériques personnels."
      ],
      "competences": [],
      "apports": [
        "Veille technologique",
        "Prudence et méthode"
      ],
      "transfert": "Apprendre seul un domaine technique nouveau.",
      "bulle": [
        "Blockchains"
      ]
    },
    {
      "id": "sst",
      "type": "formation",
      "titre": "Sauveteur secouriste du travail · SST",
      "titreCourt": "Sauveteur secouriste · SST",
      "lieu": "Formation interne, Thermes de Balaruc-les-Bains",
      "resume": "Premiers secours et prévention des risques.",
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
      ]
    },
    {
      "id": "plein-air",
      "type": "personnel",
      "titre": "Jardinage, course, randonnée",
      "titreCourt": "Jardinage · Course · Randonnée",
      "lieu": "",
      "resume": "Activités de plein air et entretien des espaces extérieurs.",
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
      ]
    },
    {
      "id": "keyce",
      "type": "formation",
      "titre": "Bloc de compétences · Management",
      "titreCourt": "Formation · Management",
      "lieu": "Keyce Academy, Pérols",
      "resume": "Management opérationnel, organisation de l’activité et des équipes.",
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
      ]
    },
    {
      "id": "comtel",
      "type": "formation",
      "titre": "Management · Gestion des conflits",
      "titreCourt": "Formation · Gestion des conflits",
      "lieu": "Comtel, Castries, pour les Thermes de Balaruc-les-Bains",
      "resume": "Dialogue, prévention et gestion des conflits.",
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
      ]
    },
    {
      "id": "stage-audit",
      "type": "experience",
      "titre": "Stage · Cabinet comptable",
      "titreCourt": "Stage comptable · Audit Conseil",
      "lieu": "Audit Conseil & Associés, Saint-Jean-de-Védas",
      "resume": "Une semaine de découverte du travail en cabinet.",
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
      ]
    },
    {
      "id": "stage-cecosud",
      "type": "experience",
      "titre": "Stage · Comptable assistant",
      "titreCourt": "Stage comptable · Cecosud 34",
      "lieu": "Cecosud 34, Agde",
      "resume": "Un mois et demi de pratique comptable en cabinet.",
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
      ]
    },
    {
      "id": "titre-comptable",
      "type": "formation",
      "titre": "Titre professionnel · Comptable assistant",
      "titreCourt": "Titre professionnel · Comptable assistant",
      "lieu": "GRETA, Sète · niveau 4",
      "resume": "Reconversion vers la comptabilité et la gestion.",
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
      ]
    },
    {
      "id": "tosa",
      "type": "formation",
      "titre": "Tosa Excel avancé · 850 / 1000",
      "titreCourt": "Excel avancé · Tosa · 850/1000",
      "lieu": "GRETA, Sète",
      "resume": "Certification de la maîtrise d’Excel.",
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
      ]
    },
    {
      "id": "barysense",
      "type": "personnel",
      "titre": "BarySense · Suivi du café",
      "titreCourt": "BarySense · Suivi du café",
      "lieu": "",
      "resume": "Application de suivi des cafés, des machines, des extractions et du stock.",
      "contexte": "Je transforme une pratique personnelle du café en un outil de suivi : informations sur les cafés, réglages, extractions, machines et paquets.",
      "missions": [
        "Définition des informations à conserver et des parcours de consultation.",
        "Organisation des écrans et des réglages d’extraction.",
        "Suivi du stock de café, des dépenses et des cafés à racheter.",
        "Pilotage des évolutions avec l’appui des assistants IA."
      ],
      "competences": [
        "ia",
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
      ]
    },
    {
      "id": "knockin",
      "type": "personnel",
      "titre": "Knockin ever Door · Recherche d’emploi",
      "titreCourt": "Knockin ever Door · CRM candidatures",
      "lieu": "",
      "resume": "Conception d’un outil de suivi des entreprises, contacts, candidatures et relances.",
      "contexte": "Projet personnel né d’un besoin concret : centraliser une recherche d’emploi. Je définis les besoins et pilote la réalisation avec des assistants IA.",
      "missions": [
        "Cadrage fonctionnel : entreprises, contacts, candidatures, rendez-vous, relances.",
        "Agrégation des offres et cohérence des filtres de recherche, y compris géographiques.",
        "Données de l’outil organisées dans Supabase.",
        "Retours d’usage et contrôle des évolutions."
      ],
      "competences": [
        "ia",
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
      ]
    },
    {
      "id": "skylivra",
      "type": "personnel",
      "titre": "SkyLivra · Créations / Simulation aérienne",
      "titreCourt": "SkyLivra · Créations / Simulation aérienne",
      "important": true,
      "lieu": "",
      "resume": "Direction artistique, cadrage et pilotage avec l’IA de créations et d’outils pour la simulation de vol.",
      "contexte": "Je définis les besoins, fournis les références, pilote les assistants IA et contrôle les résultats dans le simulateur. Les IA produisent le code technique ; je garde la direction fonctionnelle et artistique.",
      "site": {
        "url": "https://skylivra.netlify.app/",
        "libelle": "Voir le site SkyLivra"
      },
      "missions": [
        "Définir les besoins, les contraintes techniques et les critères d’acceptation de chaque création.",
        "Structurer l’architecture : rôle des modules, interfaces, dépendances et circulation des données.",
        "Orchestrer plusieurs assistants IA avec des consignes communes, des périmètres de travail et des revues croisées.",
        "Piloter les textures, les effets visuels, le site et les outils d’installation, puis contrôler leur cohérence.",
        "Suivre les versions, documenter les reprises et tester les résultats, notamment en vol dans MSFS."
      ],
      "competences": [
        "ia",
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
          "lien": "https://skylivra.netlify.app/",
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
          "titre": "Ancient Dragon",
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
          ]
        },
        {
          "titre": "Aurora Borealis Blue",
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
          ]
        },
        {
          "titre": "Phoenix — Pristine",
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
          ]
        },
        {
          "titre": "Aurores boréales, australes",
          "ouvert": false,
          "paragraphes": [
            "Je pilote la conception d’un add-on qui fait apparaître des aurores pendant les vols de nuit, en fonction de la position de l’avion.",
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
          ],
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
          ]
        },
        {
          "titre": "Architecture · Orchestration des IA",
          "paragraphes": [
            "Mon travail consiste à transformer une intention en instructions et en livrables vérifiables. Je garde une vue d’ensemble du projet tout en séparant les responsabilités de chaque outil et de chaque assistant."
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
            "Je définis la direction artistique des livrées, fournis les références et pilote les corrections jusqu’au rendu recherché. La fabrication relie les maquettes aux textures réellement utilisées dans le simulateur."
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
            "Le projet comprend aussi les outils qui présentent les créations et accompagnent leur installation. Je pilote leur conception fonctionnelle et la cohérence de l’ensemble."
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
            "Pour rendre les créations reproductibles, je structure une chaîne de fabrication et des contrôles à chaque étape. Les essais isolés et les vérifications dans le simulateur répondent à des besoins différents."
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
      ]
    },
    {
      "id": "outils-ia",
      "type": "personnel",
      "titre": "Intégration IA",
      "titreCourt": "Intégration IA",
      "important": true,
      "lieu": "Méthodes de travail et continuité des projets personnels",
      "resume": "Intégrer des assistants IA dans des projets suivis : consignes communes, dossiers de référence et documents de reprise.",
      "contexte": "Pour faire travailler plusieurs assistants IA sur des projets suivis dans la durée, je structure des consignes communes et des documents de reprise.",
      "missions": [
        "Rédaction de consignes structurées communes.",
        "Dossiers de référence et documents de reprise entre sessions.",
        "Définition du périmètre de chaque intervention et des éléments attendus pour vérifier un résultat.",
        "Suivi des versions avec Git et GitHub."
      ],
      "competences": [
        "ia",
        "gestion",
        "plateformes"
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code",
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
        "Intégration IA"
      ]
    },
    {
      "id": "jeunesse",
      "type": "personnel",
      "titre": "Loisirs actuels",
      "titreCourt": "Loisirs actuels",
      "lieu": "",
      "resume": "Piano, curiosité scientifique et découvertes : des loisirs pratiqués aujourd’hui.",
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
      ]
    }
  ],
  "mentions": {
    "editeur": "Alain Ferro, Poussan (34560), alainferro34@gmail.com.",
    "hebergeur": "GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
    "donnees": "Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne contient aucun formulaire : l’éditeur ne collecte aucune donnée. Le bouton « Proposer un entretien » ouvre simplement votre messagerie, sans aucun envoi automatique. Comme tout hébergeur, GitHub peut conserver des journaux techniques de connexion.",
    "maj": "6 novembre 2026"
  },
  "alias": {
    "thermes-adjoint": "thermes-responsable"
  },
  "retirees": [
    "enfance",
    "adolescence"
  ]
};
