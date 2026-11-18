/* 2.66.0 — SkyLivra vu par un recruteur (prototype validé par Alain le 18/11/2026, skylivra-maquette-20261118).
   Vue d'ensemble : phrase + statut exact, 5 catégories égales (image + titre seul), rôle et compétences.
   Catégorie ou création : la vue remplace le contenu, retour visible (Échap), 3 faits, preuve visuelle.
   Les fiches complètes historiques restent accessibles (« Fiche complète », routes -complet).
   Routes : /parcours/skylivra, /parcours/skylivra-{site|livrees|addons|installateur|studio},
   /parcours/skylivra-<création> (fiche courte), /parcours/<id>-complet (fiche complète existante). */
(function () {
  "use strict";
  var IMG = "assets/photos/selection/", TUILE = "assets/skylivra/";
  var CATEGORIES = ["site", "livrees", "addons", "installateur", "studio"];
  // Textes courts issus des fiches SkyLivra du CV (data/contenu.js) ; aucun chiffre commercial.
  var FICHES = {
    site: { titre: "Site marchand", tuile: "site.webp", statut: "Finalisé, non ouvert",
      preuves: [[TUILE + "site.webp", "Visuel d’accueil SkyLivra"]],
      faits: ["Boutique en ligne pour les livrées et add-ons SkyLivra (MSFS 2020).", "Site finalisé ; ouverture en attente d’accords avec les partenaires.", "Alain pilote le site, ses briques et ses tests ; le code est produit par des assistants IA."],
      role: "Architecture fonctionnelle, critères d’acceptation, tests et documentation.", complet: "skylivra" },
    livrees: { titre: "Livrées d’avions", tuile: "livrees.webp", statut: "3 livrées · Fenix A320",
      preuves: [[IMG + "selection-088.webp", "Aurora Borealis Blue — extérieur"], [IMG + "selection-077.webp", "Ancient Dragon — extérieur"]],
      faits: ["3 livrées complètes pour le Fenix A320 : extérieur, cockpit et cabine.", "Direction artistique et validation par Alain ; fabrication pilotée avec l’IA.", "Aurora Borealis Blue validée en jeu (version 1.28.0)."],
      role: "Direction artistique, essais dans le simulateur, retours précis jusqu’à la validation.",
      enfants: ["skylivra-ancient-dragon", "skylivra-aurora-borealis-blue", "skylivra-phoenix-pristine"] },
    addons: { titre: "Add-ons", tuile: "addons.webp", statut: "Aurora Borealis Add-on · v0.10.3",
      preuves: [["assets/videos/aurores-en-vol.webp", "Aurores en vol"], [IMG + "selection-082.webp", "Capture de diagnostic"]],
      faits: ["Aurores boréales et australes la nuit, selon la position de l’avion.", "Panneau de commande dans le simulateur : interrupteur et indication d’état.", "Rendu défini par Alain ; code C++ / WebAssembly produit par l’IA, suivi jusqu’à la version 0.10.3."],
      role: "Conception fonctionnelle, essais en vol, diagnostic des versions.", enfants: ["skylivra-aurores"] },
    installateur: { titre: "Installateur Windows", tuile: "installateur.webp", statut: "Livré avec chaque création",
      preuves: [[IMG + "selection-092.webp", "Écran de l’installateur"]], seule: true,
      faits: ["Installation guidée : langue, produit, dossier, installation.", "Vérifie le simulateur et l’avion requis avant d’installer.", "Restauration protégée en cas de problème."],
      role: "Fiabilité de l’installation : dépendances, contrôles et reprises." },
    studio: { titre: "Studio Vidéos", tuile: "studio.webp", statut: "Chaîne YouTube",
      faits: ["Montages vidéo pour présenter les créations SkyLivra sur la chaîne YouTube.", "Vidéo Phoenix terminée : vues extérieures filmées dans le simulateur.", "Vidéo de la livrée Aurora Borealis : en cours de création."],
      role: "Choix des plans, captation (OBS Studio) et montage." }
  };
  // Créations : fiche courte (3 faits) ; la fiche complète existante reste à /parcours/<id>-complet.
  var CREATIONS = {
    "skylivra-ancient-dragon": { cat: "livrees", statut: "Livrée · Fenix A320", preuves: [[IMG + "selection-077.webp", "Extérieur dans MSFS"], [IMG + "selection-078.webp", "Cockpit et cabine"]],
      faits: ["Tête de dragon cuivrée, écailles et regard ambre, sans modifier la silhouette de l’avion.", "Fresques cuivre et ivoire en cabine, emblème sur les 174 sièges passagers.", "Textures et installateur Windows contrôlés avant l’essai en vol."],
      role: "Direction artistique : choix de la tête, maquettes de cabine approuvées, contrôle du rendu." },
    "skylivra-aurora-borealis-blue": { cat: "livrees", statut: "Validée en jeu · v1.28.0", preuves: [[IMG + "selection-088.webp", "Extérieur"], [IMG + "selection-085.webp", "Poste de pilotage"]],
      faits: ["Aurore en haute définition et ciel étoilé, motifs alignés jusqu’aux volets.", "Cockpit et cabine retravaillés, emblème sur la dérive, les portes et les appuie-têtes.", "Validée en jeu le 1er novembre 2026 ; déclinaison PMDG 737-900ER sans validation à ce jour."],
      role: "Essais en vol et suivi des révisions jusqu’à la version 1.28.0." },
    "skylivra-phoenix-pristine": { cat: "livrees", statut: "Livrée de référence", preuves: [[IMG + "selection-098.webp", "Extérieur"], [IMG + "selection-100.webp", "Cabine passagers"]],
      faits: ["Version neuve d’une famille de livrées (immatriculation fictive F-PHNX).", "Base de la variante usée Phoenix — Weathered.", "Installateur renforcé : reprise si fichier verrouillé, restauration protégée."],
      role: "Direction artistique, validation des sources de peinture, contrôles avant chaque édition." },
    "skylivra-aurores": { cat: "addons", statut: "Add-on · v0.10.3", preuves: [["assets/videos/aurores-en-vol.webp", "Aurores en vol"], [IMG + "selection-082.webp", "Capture de diagnostic"]],
      faits: FICHES.addons.faits, role: FICHES.addons.role }
  };

  function el(tag, attrs, enfants) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (attrs[k] != null) { if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); } });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function retour(route, texte) { return el("p", { class: "retour sky-retour" }, [el("a", { href: "#" + route, "data-retour": "", text: "← " + texte })]); }
  function image(src, alt, cls) { return el("img", { src: src, alt: alt || "", class: cls || null, loading: "lazy", decoding: "async" }); }
  function bouton(href, texte, ic, aria) { // capsule charte B (boutons.css)
    return el("a", { class: "bb bb-p3 sky-bb", href: href, "aria-label": aria || texte }, [el("span", { class: "bb-pastille", "aria-hidden": "true" }, [image("assets/boutons/" + ic + ".svg", "", "bb-ic")]), el("span", { class: "bb-lb", text: texte })]);
  }
  function tete(titre, statut) { return el("header", { class: "sky-fiche-tete" }, [el("h1", { id: "fiche-titre", tabindex: "-1", text: titre }), statut ? el("span", { class: "sky-statut", text: statut }) : null]); }
  function faits(liste, role) {
    return [el("ul", { class: "sky-faits" }, liste.map(function (f) { return el("li", { text: f }); })), el("p", { class: "sky-role-court" }, [el("b", { text: "Rôle d’Alain : " }), role])];
  }
  function preuves(liste, seule) {
    return el("div", { class: "sky-preuves" + (seule ? " seule" : "") }, liste.map(function (p) { return el("figure", null, [image(p[0], p[1]), el("figcaption", { text: p[1] })]); }));
  }

  function ensemble(parent, titreParent) {
    return [el("div", { class: "sky sky-ensemble" }, [
      retour(parent, titreParent),
      el("header", { class: "sky-tete" }, [
        el("h1", { id: "fiche-titre", tabindex: "-1", text: "SkyLivra" }),
        el("p", { class: "sky-phrase", text: "SkyLivra réunit mes créations pour Microsoft Flight Simulator 2020 : livrées d’avions, add-ons et vidéos, avec un site de vente et un installateur Windows." })
      ]),
      el("ul", { class: "sky-categories", "aria-label": "Catégories du projet" }, CATEGORIES.map(function (k) {
        var f = FICHES[k];
        return el("li", null, [el("a", { class: "sky-cat", href: "#/parcours/skylivra-" + k, "aria-label": f.titre }, [el("img", { src: TUILE + f.tuile, alt: "", decoding: "async" }), el("span", { class: "sky-cat-titre", text: f.titre })])]);
      })),
      el("section", { class: "sky-synthese", "aria-label": "Rôle d’Alain et compétences" }, [
        el("p", { class: "sky-role-texte", text: "Je définis les besoins, donne la direction artistique et coordonne plusieurs assistants IA. Des essais en vol au suivi des versions, je mobilise organisation, créativité et contrôle qualité pour mener chaque création à son aboutissement." }),
        bouton("#/parcours/skylivra-complet", "Fiche complète", "cv-lire", "Fiche complète de SkyLivra : missions, outils et galerie")
      ])
    ])];
  }

  function categorie(k) {
    if (k === "livrees") return [el("div", { class: "sky sky-fiche" }, [
      retour("/parcours/skylivra", "SkyLivra"), tete(FICHES.livrees.titre),
      el("ul", { class: "sky-categories sky-livrees", "aria-label": "Livrées d’avions" }, FICHES.livrees.enfants.map(function (id) {
        var titre = parTitre(id);
        return el("li", null, [el("a", { class: "sky-cat", href: "#/parcours/" + id + "-complet", "aria-label": titre }, [image(CREATIONS[id].preuves[0][0], titre)])]);
      }))
    ])];
    var f = FICHES[k], texte = el("div", { class: "sky-texte" }, faits(f.faits, f.role));
    if (f.enfants) texte.appendChild(el("ul", { class: "sky-sous", "aria-label": f.titre === "Add-ons" ? "Add-on" : "Livrées" }, f.enfants.map(function (id) {
      var c = CREATIONS[id], titre = (window.CV && parTitre(id)) || id;
      return el("li", null, [el("a", { class: "sky-sous-lien", href: "#/parcours/" + id, "aria-label": titre }, [image(c.preuves[0][0], ""), el("span", { text: titre })])]);
    })));
    if (f.complet) texte.appendChild(bouton("#/parcours/" + f.complet + "-complet", "Fiche complète", "cv-lire", "Fiche complète de SkyLivra : missions, outils et galerie"));
    var gauche = k === "studio" ? studio() : preuves(f.preuves, f.seule);
    return [el("div", { class: "sky sky-fiche" }, [retour("/parcours/skylivra", "SkyLivra"), tete(f.titre, f.statut), el("div", { class: "sky-corps" }, [gauche, texte])])];
  }

  // Studio Vidéos : vidéo Phoenix terminée (confirmée par Alain le 18/11/2026) ; la vidéo Aurora Borealis est en cours de création (aucune lecture).
  function studio() {
    var video = el("video", { controls: "", preload: "metadata", playsinline: "", poster: "assets/videos/phoenix-exterieur.webp", "aria-label": "Vidéo Phoenix : vues extérieures dans le simulateur" }, [
      el("source", { src: "assets/videos/phoenix-exterieur.mp4", type: "video/mp4" })]);
    return el("div", { class: "sky-preuves sky-studio" }, [
      el("figure", null, [video, el("figcaption", { text: "Vidéo Phoenix" })]),
      el("figure", { class: "sky-encours" }, [el("div", { class: "sky-encours-visuel" }, [image(IMG + "selection-088.webp", "Livrée Aurora Borealis Blue, illustration"), el("span", { class: "sky-badge", text: "En cours de création" })]),
        el("figcaption", { text: "Vidéo Aurora Borealis — en cours de création" })])
    ]);
  }

  function creation(id, titre) {
    var c = CREATIONS[id], f = FICHES[c.cat];
    return [el("div", { class: "sky sky-fiche" }, [retour("/parcours/skylivra-" + c.cat, f.titre), tete(titre, c.statut),
      el("div", { class: "sky-corps" }, [preuves(c.preuves), el("div", { class: "sky-texte" }, faits(c.faits, c.role).concat([bouton("#/parcours/" + id + "-complet", "Fiche complète", "cv-lire", "Fiche complète de " + titre + " : missions, galerie et vidéos")]))])])];
  }

  var parTitre = function () { return null; };
  window.SkyLivra = {
    categories: CATEGORIES,
    // ctx : { titre(id) → titre de la fiche ; parent ; titreParent }
    route: function (slug, ctx) {
      parTitre = ctx.titre;
      if (slug === "skylivra") return { titre: "SkyLivra", rendu: ensemble(ctx.parent, ctx.titreParent) };
      var m = /^skylivra-(site|livrees|addons|installateur|studio)$/.exec(slug);
      if (m) return { titre: "SkyLivra · " + FICHES[m[1]].titre, rendu: categorie(m[1]) };
      if (CREATIONS[slug]) return { titre: ctx.titre(slug), rendu: creation(slug, ctx.titre(slug)) };
      return null;
    },
    // Retour d'une fiche complète : vers la vue courte correspondante.
    retourComplet: function (id) { return id === "skylivra" ? "/parcours/skylivra" : CREATIONS[id] ? "/parcours/" + id : null; }
  };
  // Une vidéo ne continue jamais après un changement de vue.
  window.addEventListener("hashchange", function () { Array.prototype.forEach.call(document.querySelectorAll(".sky video"), function (v) { try { v.pause(); } catch (e) { /* ignoré */ } }); });
})();
