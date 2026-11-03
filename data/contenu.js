/* Contenu du site. Sources : CV M03 v1.5, CV général de référence, parcours consolidé v1.4.
   Ajouter une photo : déposer un fichier WebP dans assets/photos/ puis ajouter à la fiche
   galerie: [{src: "assets/photos/nom.webp", alt: "Description précise", legende: "Texte visible"}]
   Une fiche sans photo n'affiche aucune galerie. */
window.CV = {
  "identite": {
    "nom": "Alain Ferro",
    "accroche": "Gestion, coordination et projets numériques",
    "promesse": "Dix ans d’encadrement d’équipes de soins, une activité de négoce créée et gérée pendant sept ans, puis une formation récente en comptabilité. J’organise, je fais circuler l’information et je suis une activité au quotidien, avec Excel et l’intelligence artificielle comme outils de travail.",
    "ville": "Poussan (34560)",
    "email": "alainferro34@gmail.com",
    "telephone": "06 12 76 10 12",
    "telephoneLien": "+33612761012",
    "permis": "Permis B et véhicule · Permis bateau côtier",
    "langues": "Français courant · Anglais A1",
    "portrait": {
      "src": "assets/portrait-480.webp",
      "srcPetit": "assets/portrait-240.webp",
      "alt": "Portrait d’Alain Ferro, souriant, chemise bleu clair"
    },
    "cvPdf": "./CV_Alain_Ferro.pdf"
  },
  "chiffres": [
    {
      "valeur": "30 à 40",
      "libelle": "agents et kinésithérapeutes encadrés aux Thermes de Balaruc-les-Bains"
    },
    {
      "valeur": "10 ans",
      "libelle": "d’encadrement aux Thermes (2013–2023), après une évolution interne"
    },
    {
      "valeur": "7 ans",
      "libelle": "à la tête d’une activité de négoce créée en 2003"
    },
    {
      "valeur": "850 / 1000",
      "libelle": "au Tosa Excel, niveau avancé, en 2025"
    }
  ],
  "competences": [
    {
      "id": "encadrement",
      "titre": "Encadrement d’équipes",
      "sousTitre": "30 à 40 agents et kinésithérapeutes",
      "resume": "Planifier, coordonner, écouter, désamorcer les tensions et accompagner les personnes au quotidien.",
      "detail": [
        "Encadrement direct d’agents de soins et de kinésithérapeutes aux Thermes de Balaruc-les-Bains, d’abord comme adjoint (2013–2015) puis comme responsable soins (2015–2023).",
        "Planification de l’activité, coordination quotidienne des soins et accueil des curistes.",
        "Conduite d’entretiens annuels d’évaluation et d’entretiens professionnels (EVA / EP), médiation entre collaborateurs.",
        "Formations au management et à la gestion des conflits en 2023."
      ],
      "preuves": [
        "thermes-responsable",
        "thermes-adjoint",
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
        "Titre professionnel Comptable assistant (niveau 4) obtenu en 2025 au GRETA de Sète.",
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
        "Accueil et écoute des curistes pendant dix ans aux Thermes."
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
        "Certification Tosa Excel, niveau avancé, score de 850 sur 1000 (GRETA, Sète, 2025).",
        "Aux Thermes, conception d’outils Excel, de formulaires et de supports pour faire circuler l’information, en lien avec les services qualité et informatique.",
        "Fonctions utilisées : tableaux croisés dynamiques, Power Query, Power Pivot et VBA."
      ],
      "preuves": [
        "tosa",
        "thermes-responsable",
        "negoce"
      ]
    },
    {
      "id": "ia",
      "titre": "Pilotage de projets avec l’IA",
      "sousTitre": "Cadrage, consignes, contrôle, versions, documentation",
      "resume": "Définir un besoin, rédiger des consignes précises, faire réaliser par des assistants IA et vérifier ce qui est livré.",
      "detail": [
        "Projets personnels menés en 2026 avec ChatGPT, Codex et Claude Code : outil de suivi de recherche d’emploi, contenus et outils pour la simulation aérienne.",
        "Rôle tenu : cadrage fonctionnel, rédaction des consignes, retours d’usage, contrôle des livrables, suivi des versions et documentation.",
        "Une méthode de travail fondée sur des objectifs précis, des corrections successives et la vérification du résultat.",
        "Architecture fonctionnelle et technique : découper les projets en modules, préciser leurs interfaces et dépendances, puis coordonner la fabrication, les essais et la documentation."
      ],
      "preuves": [
        "knockin",
        "skylivra",
        "outils-ia"
      ]
    },
    {
      "id": "plateformes",
      "titre": "Git / GitHub et services web",
      "sousTitre": "Git · GitHub · Supabase · Stripe · Brevo",
      "resume": "Versionner les projets, organiser leurs données et relier les services de paiement et d’e-mails, avec l’appui d’assistants IA.",
      "detail": [
        "Git et GitHub : organiser les dépôts, consulter les modifications, suivre les commits et retrouver les versions des projets.",
        "GitHub : partager et conserver les sources, coordonner les interventions des assistants IA et publier un site statique avec GitHub Pages.",
        "Supabase : piloter l’organisation des données, de l’authentification et du stockage nécessaires aux applications.",
        "Stripe : piloter l’intégration de Checkout et des webhooks pour relier le paiement au traitement des commandes.",
        "Brevo : organiser les courriels transactionnels, leurs modèles et leurs déclencheurs dans le fonctionnement du site."
      ],
      "preuves": [
        "skylivra",
        "outils-ia"
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
      ]
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
      ]
    },
    {
      "famille": "IA et projets numériques",
      "items": [
        "ChatGPT",
        "Codex",
        "Claude",
        "Claude Code",
        "Suno"
      ]
    },
    {
      "famille": "Versionnage et services web",
      "items": [
        "Git",
        "GitHub",
        "Supabase",
        "Stripe",
        "Brevo",
        "Netlify"
      ]
    },
    {
      "famille": "Création et simulation",
      "items": [
        "Microsoft Flight Simulator",
        "SPAD.neXt",
        "OBS Studio",
        "YouTube"
      ]
    }
  ],
  "interets": [
    "Pilotage virtuel",
    "Piano",
    "Technologie numérique",
    "Sciences et astronomie",
    "Jardinage",
    "Course et marche",
    "Randonnée"
  ],
  "parcours": [
    {
      "id": "vendanges",
      "type": "experience",
      "dates": "1997–1999",
      "tri": 1997,
      "titre": "Vendanges du muscat",
      "lieu": "Mireval et Frontignan (Hérault)",
      "resume": "Trois saisons de vendanges chez un viticulteur.",
      "contexte": "Premiers emplois saisonniers, pendant les études, lors des vendanges 1997, 1998 et 1999 dans le vignoble du muscat.",
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
      "transfert": "Habitude des cadences collectives et des délais imposés par la saison : la récolte n’attend pas."
    },
    {
      "id": "skiman",
      "type": "experience",
      "dates": "1998",
      "tri": 1998.1,
      "titre": "Skiman",
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
      "transfert": "Associer un conseil adapté à chaque client et une exécution technique rapide, en période d’affluence."
    },
    {
      "id": "bac",
      "type": "formation",
      "dates": "2000",
      "tri": 1999.9,
      "titre": "Baccalauréat STT",
      "lieu": "Lycée Joliot-Curie, Sète",
      "resume": "Sciences et technologies tertiaires, spécialité action et communication commerciales.",
      "contexte": "Scolarité de 1997 à 2000, baccalauréat technologique orienté vers le commerce et la communication.",
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
      "transfert": "Socle commercial qui a conduit directement à la formation en alternance dans le courtage en vins."
    },
    {
      "id": "bts",
      "type": "formation",
      "dates": "2000–2002",
      "tri": 2000,
      "titre": "Formation BTS commercial",
      "lieu": "Sup’Exup, Montpellier",
      "resume": "Formation en communication commerciale, en alternance avec le courtage en vins.",
      "contexte": "Deux années de formation en alternance, l’entreprise d’accueil étant un courtier en vins de Saint-Christol. Formation suivie en alternance.",
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
      "transfert": "Une formation appliquée immédiatement sur le terrain, auprès de producteurs et de négociants."
    },
    {
      "id": "courtier",
      "type": "experience",
      "dates": "2000–2002",
      "tri": 2000.1,
      "titre": "Apprenti courtier en vins",
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
      "transfert": "Premier apprentissage de l’intermédiation commerciale : écouter les deux parties et assurer un suivi fiable."
    },
    {
      "id": "londres",
      "type": "experience",
      "dates": "2002–2003",
      "tri": 2002,
      "titre": "Restauration et sondages à Londres",
      "lieu": "Londres, Royaume-Uni",
      "resume": "Plusieurs emplois en restauration et en enquêtes téléphoniques, en environnement anglophone.",
      "contexte": "Une année de travail à Londres, dans des établissements de restauration de styles très différents, complétée par une activité freelance.",
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
      "transfert": "S’adapter vite à des organisations différentes et garder une qualité de service constante."
    },
    {
      "id": "negoce",
      "type": "experience",
      "dates": "2003–2010",
      "tri": 2003.2,
      "titre": "Créateur et gérant d’une activité de négoce",
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
      "transfert": "Une vision complète d’une petite entreprise : chaque commande engage les achats, le stock, la livraison et la facture. Cette expérience éclaire aujourd’hui les fonctions d’assistant de gestion, d’ADV ou d’approvisionnement."
    },
    {
      "id": "pailletrice",
      "type": "experience",
      "dates": "2010–2011",
      "tri": 2010,
      "titre": "Agent commercial en vins",
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
      "transfert": "Organisation autonome d’un secteur et suivi régulier des clients."
    },
    {
      "id": "immobilier",
      "type": "experience",
      "dates": "2011–2012",
      "tri": 2011,
      "titre": "Négociateur et conseiller immobilier",
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
      "transfert": "Suivre plusieurs dossiers en parallèle, chacun avec ses interlocuteurs et ses échéances."
    },
    {
      "id": "thermes-agent",
      "type": "experience",
      "dates": "2012–2013",
      "tri": 2012,
      "titre": "Agent qualifié de soins thermaux",
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
      "transfert": "La connaissance du terrain qui a ensuite servi à organiser le travail des équipes."
    },
    {
      "id": "thermes-adjoint",
      "type": "experience",
      "dates": "2013–2015",
      "tri": 2013,
      "titre": "Responsable soins adjoint",
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Première fonction d’encadrement, après une évolution interne.",
      "contexte": "Promotion après un an comme agent de soins, en appui du responsable soins.",
      "missions": [
        "Encadrement des agents de soins et des kinésithérapeutes.",
        "Coordination des soins au quotidien.",
        "Écoute des curistes et traitement de leurs demandes."
      ],
      "competences": [
        "encadrement"
      ],
      "apports": [
        "Encadrement",
        "Coordination",
        "Écoute"
      ],
      "transfert": "Passer du rôle d’équipier à celui de référent d’équipe."
    },
    {
      "id": "thermes-responsable",
      "type": "experience",
      "dates": "2015–2023",
      "tri": 2015,
      "titre": "Responsable soins",
      "lieu": "Thermes de Balaruc-les-Bains",
      "resume": "Encadrement de 30 à 40 agents et kinésithérapeutes, planification et suivi de l’activité.",
      "contexte": "Huit années de responsabilité d’équipes de soins dans un établissement thermal.",
      "missions": [
        "Encadrement de 30 à 40 agents de soins et kinésithérapeutes.",
        "Planification des équipes et coordination quotidienne de l’activité.",
        "Entretiens annuels d’évaluation et entretiens professionnels (EVA / EP).",
        "Médiation et résolution des conflits.",
        "Accueil des curistes, suivi de l’activité et des demandes de maintenance.",
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
        "Entretiens professionnels",
        "Médiation",
        "Outils de suivi"
      ],
      "transfert": "Organiser le travail de nombreuses personnes, tenir des plannings, faire remonter et circuler l’information : ce sont les bases des postes d’assistant de planification, d’assistant de gestion ou d’appui administratif RH."
    },
    {
      "id": "ged-gmao",
      "type": "formation",
      "dates": "2019",
      "tri": 2019,
      "titre": "Gestion documentaire et maintenance (GED / GMAO)",
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
      "transfert": "Classer, retrouver et tracer l’information : utile à tout poste de gestion de dossiers."
    },
    {
      "id": "sst",
      "type": "formation",
      "dates": "2021–2023",
      "tri": 2021,
      "titre": "Sauveteur secouriste du travail (SST)",
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
      "transfert": "Réflexes de prévention et de sécurité au sein d’une équipe."
    },
    {
      "id": "keyce",
      "type": "formation",
      "dates": "2023",
      "tri": 2023,
      "titre": "Bloc de compétences « Management »",
      "lieu": "Keyce Academy, Pérols",
      "resume": "Management opérationnel, organisation de l’activité et des équipes.",
      "contexte": "Bloc de compétences en management suivi en 2023.",
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
      "transfert": "Mettre des méthodes sur une pratique d’encadrement de plusieurs années."
    },
    {
      "id": "comtel",
      "type": "formation",
      "dates": "2023",
      "tri": 2023.1,
      "titre": "Management et gestion des conflits",
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
      "transfert": "Savoir désamorcer une tension, avec des collègues comme avec du public."
    },
    {
      "id": "stage-audit",
      "type": "experience",
      "dates": "2024",
      "tri": 2024,
      "titre": "Stage en cabinet comptable",
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
      "transfert": "Première immersion dans les outils et le rythme d’un cabinet comptable."
    },
    {
      "id": "stage-cecosud",
      "type": "experience",
      "dates": "2025",
      "tri": 2025,
      "titre": "Stage de comptable assistant",
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
      "transfert": "Les opérations comptables courantes pratiquées sur des dossiers réels."
    },
    {
      "id": "titre-comptable",
      "type": "formation",
      "dates": "2025",
      "tri": 2025.1,
      "titre": "Titre professionnel Comptable assistant",
      "lieu": "GRETA, Sète · niveau 4",
      "resume": "Reconversion vers la comptabilité et la gestion.",
      "contexte": "Formation qualifiante suivie après dix ans aux Thermes, complétée par deux stages en cabinet.",
      "missions": [
        "Bases comptables et opérations courantes.",
        "Mise en pratique lors des stages de 2024 et 2025."
      ],
      "competences": [
        "gestion"
      ],
      "apports": [
        "Comptabilité courante",
        "Rigueur documentaire"
      ],
      "transfert": "Le cadre comptable qui complète l’expérience de gestion acquise dans le négoce."
    },
    {
      "id": "tosa",
      "type": "formation",
      "dates": "2025",
      "tri": 2025.2,
      "titre": "Tosa Excel, niveau avancé : 850 / 1000",
      "lieu": "GRETA, Sète",
      "resume": "Certification de la maîtrise d’Excel.",
      "contexte": "Certification passée en 2025, qui valide une pratique d’Excel utilisée depuis de nombreuses années pour le suivi d’activité.",
      "missions": [
        "Tableaux croisés dynamiques.",
        "Power Query et Power Pivot.",
        "VBA."
      ],
      "competences": [
        "excel"
      ],
      "apports": [
        "Analyse de données",
        "Automatisation"
      ],
      "transfert": "Des tableaux de suivi fiables et des tâches répétitives automatisées."
    },
    {
      "id": "jeunesse",
      "type": "personnel",
      "dates": "1987 · 1993 · 1995",
      "tri": 1987,
      "titre": "Football, piano et sciences",
      "lieu": "",
      "resume": "Sport collectif, musique et curiosité scientifique depuis l’enfance.",
      "contexte": "Football pratiqué de 1987 à 2002, piano amateur depuis 1993, intérêt pour l’astronomie et la physique depuis 1995.",
      "missions": [
        "Football pratiqué pendant quinze ans.",
        "Piano en amateur.",
        "Lectures et contenus scientifiques : astronomie, physique."
      ],
      "competences": [],
      "apports": [
        "Esprit d’équipe",
        "Persévérance",
        "Curiosité"
      ],
      "transfert": "Le goût d’apprendre par soi-même, et une longue habitude du collectif."
    },
    {
      "id": "simulation",
      "type": "personnel",
      "dates": "Depuis 1998",
      "tri": 1998.5,
      "titre": "Simulation et pilotage aérien",
      "lieu": "",
      "resume": "Plus de vingt ans de simulation de vol sur PC : Airbus, Boeing et avions légers.",
      "contexte": "Une passion technique pratiquée de façon exigeante, qui a ensuite conduit aux créations du projet SkyLivra.",
      "missions": [
        "Préparation des vols, météo et navigation.",
        "Avionique et réglementation simulée.",
        "Configuration des périphériques avec SPAD.neXt (depuis 2021)."
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
      "transfert": "Préparer, suivre une procédure et vérifier : les réflexes d’une organisation rigoureuse."
    },
    {
      "id": "bateau",
      "type": "personnel",
      "dates": "2003–2006",
      "tri": 2003,
      "titre": "Rénovation d’un bateau en bois de 11 mètres",
      "lieu": "",
      "resume": "Trois ans de chantier sur une coque à clin.",
      "contexte": "Rénovation du Wyjume, un bateau en bois de 11 mètres à coque à clin, menée de 2003 à 2006. Ce chantier a mobilisé la préparation, l’organisation des travaux et une pratique directe de plusieurs techniques. Les photos personnelles montrent notamment le carénage, les boiseries, le ponçage et le tableau électrique.",
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
          "src": "assets/photos/wyjume-chantier-exterieur.webp",
          "alt": "Le Wyjume posé sur bers, avec sa coque blanche à clin et sa cabine.",
          "legende": "Wyjume · vue d’ensemble avant les travaux de carénage · 2004"
        },
        {
          "src": "assets/photos/wyjume-coque-bois.webp",
          "alt": "Coque en bois décapée et jointures des bordés, vue de trois quarts.",
          "legende": "Préparation et remise à nu de la coque en bois · 2004"
        },
        {
          "src": "assets/photos/wyjume-menuiserie.webp",
          "alt": "Banquettes en bois en cours de ponçage, avec ponceuse et aspirateur de chantier.",
          "legende": "Menuiserie et ponçage des bancs intérieurs"
        },
        {
          "src": "assets/photos/wyjume-electricite.webp",
          "alt": "Réseau de câbles et tableau électrique ouverts pendant le chantier.",
          "legende": "Intervention sur le tableau électrique · 2004"
        },
        {
          "src": "assets/photos/wyjume-interieur-vernis.webp",
          "alt": "Boiseries et plancher vernis dans le carré du bateau.",
          "legende": "Boiseries et aménagements intérieurs vernis · 2006"
        }
      ]
    },
    {
      "id": "pc",
      "type": "personnel",
      "dates": "Depuis 2017",
      "tri": 2017,
      "titre": "Montage et configuration de PC",
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
      "transfert": "À l’aise pour prendre en main un poste de travail et ses outils."
    },
    {
      "id": "maison",
      "type": "personnel",
      "dates": "2018",
      "tri": 2018,
      "titre": "Travaux de la maison",
      "lieu": "Poussan",
      "resume": "Préparation, organisation et chiffrage de travaux d’habitation.",
      "contexte": "Projet de travaux sur son habitation, dans la continuité de nombreux travaux manuels réalisés depuis 2000.",
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
      "transfert": "Estimer un budget et organiser des étapes avant d’agir."
    },
    {
      "id": "blockchain",
      "type": "personnel",
      "dates": "Depuis 2019",
      "tri": 2019.1,
      "titre": "Écosystèmes blockchain",
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
      "transfert": "Apprendre seul un domaine technique nouveau."
    },
    {
      "id": "plein-air",
      "type": "personnel",
      "dates": "Depuis 2022",
      "tri": 2022,
      "titre": "Jardinage, course à pied et randonnée",
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
      "transfert": "Des activités qui demandent régularité et persévérance."
    },
    {
      "id": "knockin",
      "type": "personnel",
      "dates": "2026",
      "tri": 2026,
      "titre": "Knockin ever Door : organiser sa recherche d’emploi",
      "lieu": "Projet personnel avec l’IA",
      "resume": "Conception d’un outil de suivi des entreprises, contacts, candidatures et relances.",
      "contexte": "Projet personnel né d’un besoin concret : centraliser une recherche d’emploi. Alain définit les besoins et pilote la réalisation avec des assistants IA.",
      "missions": [
        "Cadrage fonctionnel : entreprises, contacts, candidatures, rendez-vous, relances.",
        "Agrégation des offres et cohérence des filtres de recherche, y compris géographiques.",
        "Retours d’usage et contrôle des évolutions."
      ],
      "competences": [
        "ia",
        "gestion"
      ],
      "outils": [
        "ChatGPT",
        "Codex",
        "Claude Code"
      ],
      "apports": [
        "Cadrage fonctionnel",
        "Suivi de relances",
        "Contrôle qualité"
      ],
      "transfert": "Exprimer un besoin clairement et vérifier qu’un outil y répond : un atout pour accompagner des projets numériques."
    },
    {
      "id": "skylivra",
      "type": "personnel",
      "dates": "Depuis 2026",
      "tri": 2026.1,
      "titre": "SkyLivra : conception et orchestration de projets numériques",
      "lieu": "Projet personnel avec l’IA",
      "resume": "Livrées et textures, add-on d’aurores boréales et australes, site web et application Windows : un écosystème conçu et piloté avec l’IA.",
      "contexte": "SkyLivra est un projet personnel consacré à Microsoft Flight Simulator 2020. Je relie création visuelle, développement d’add-ons et outils de distribution dans une architecture commune. Je définis les besoins, structure les modules et pilote leur réalisation avec des assistants IA, puis je contrôle les livrables et réalise les essais dans le simulateur.",
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
      "galerie": [],
      "sections": [
        {
          "titre": "Aurora Borealis Add-on 0.10.3 : aurores boréales et australes",
          "ouvert": true,
          "paragraphes": [
            "J’ai conçu et piloté le développement d’un add-on qui fait apparaître automatiquement des aurores pendant les vols de nuit. Le module tient compte de la position géomagnétique de l’avion pour gérer l’hémisphère nord comme l’hémisphère sud.",
            "Le rendu a été validé en vol dans l’hémisphère nord sur des versions précédentes. La logique de l’hémisphère sud est implémentée et couverte par des tests automatisés. La dernière livraison locale est la 0.10.3 ; la capture ci-dessous montre la version 0.9.2."
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
              "src": "assets/photos/aurores-msfs-capture.webp",
              "alt": "Voiles verts et violets dans le ciel nocturne de MSFS, avec le panneau de commande de l’add-on.",
              "legende": "Aurora Borealis Add-on 0.9.2 · capture authentique dans MSFS 2020, près de Tromsø · version antérieure à la 0.10.3",
              "presentation": "aurore"
            }
          ]
        },
        {
          "titre": "Structurer l’architecture et orchestrer les IA",
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
          "titre": "Livrées et textures pour les avions",
          "paragraphes": [
            "Je définis la direction artistique des livrées, fournis les références et pilote les corrections jusqu’au rendu recherché. La fabrication relie les maquettes aux textures réellement utilisées dans le simulateur."
          ],
          "points": [
            "Briefs visuels, maquettes et retouches : motifs, couleurs et continuité entre les différentes pièces de l’avion.",
            "Préparation et contrôle des textures DDS, de leurs alignements et de leur intégration dans les paquets MSFS.",
            "Suivi des variantes, assemblage des paquets et préparation des installateurs Windows.",
            "Contrôle visuel dans le simulateur et réalisation de clips de présentation avec OBS Studio."
          ],
          "galerie": [
            {
              "src": "assets/photos/phoenix-presentation.webp",
              "alt": "Avion noir et doré portant un motif de phénix, présenté sur fond bleu.",
              "legende": "Phoenix — Pristine · visuel de présentation de la livrée"
            },
            {
              "src": "assets/photos/aurora-apercu-studio.webp",
              "alt": "Avion bleu et blanc aux motifs d’aurores boréales, vu de trois quarts dans un studio 3D.",
              "legende": "Aurora Borealis Blue · aperçu de travail en studio 3D"
            }
          ]
        },
        {
          "titre": "Un site web et une application Windows de gestion",
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
          "titre": "Fabriquer, diagnostiquer et documenter",
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
      ]
    },
    {
      "id": "outils-ia",
      "type": "personnel",
      "dates": "2026",
      "tri": 2026.2,
      "titre": "Organisation de mes outils IA",
      "lieu": "Méthodes de travail et continuité des projets",
      "resume": "Consignes communes, dossiers de référence et documents de reprise.",
      "contexte": "Pour faire travailler plusieurs assistants IA sur des projets suivis dans la durée, Alain a structuré une organisation commune.",
      "missions": [
        "Rédaction de consignes structurées communes.",
        "Dossiers de référence et documents de reprise entre sessions.",
        "Définition du périmètre de chaque intervention et des éléments attendus pour vérifier un résultat.",
        "Suivi des versions avec GitHub."
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
        "GitHub"
      ],
      "apports": [
        "Organisation",
        "Documentation",
        "Contrôle des résultats"
      ],
      "transfert": "Les mêmes réflexes que pour une équipe : rôles clairs, consignes écrites, contrôle et traçabilité."
    }
  ],
  "mentions": {
    "editeur": "Alain Ferro, Poussan (34560), alainferro34@gmail.com.",
    "hebergeur": "GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
    "donnees": "Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne contient aucun formulaire : l’éditeur ne collecte aucune donnée. Comme tout hébergeur, GitHub peut conserver des journaux techniques de connexion.",
    "maj": "3 novembre 2026"
  }
};
