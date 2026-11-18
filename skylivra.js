/* 2.66.0 — SkyLivra vu par un recruteur (prototype validé par Alain le 18/11/2026, skylivra-maquette-20261118).
   Vue d'ensemble : phrase + statut exact, 5 catégories égales (image + titre seul), rôle et compétences.
   Catégorie ou création : la vue remplace le contenu, retour visible (Échap), 3 faits, preuve visuelle.
   Pages détaillées directement accessibles ; anciens liens -complet compatibles.
   Routes : /parcours/skylivra, /parcours/skylivra-{site|livrees|addons|installateur|studio},
   /parcours/skylivra-<création> (fiche courte), /parcours/<id>-complet (fiche complète existante). */
(function () {
  "use strict";
  var IMG = "assets/photos/selection/", TUILE = "assets/skylivra/";
  var CATEGORIES = ["site", "livrees", "addons", "installateur", "studio"];
  // Textes courts issus des fiches SkyLivra du CV (data/contenu.js) ; aucun chiffre commercial.
  var FICHES = {
    site: { titre: "Site marchand", tuile: "site.webp", statut: "Non actif : autorisation des éditeurs en attente",
      preuves: [[TUILE + "site.webp", "Visuel d’accueil SkyLivra"]],
      faits: ["Boutique en ligne pour les livrées et add-ons SkyLivra (MSFS 2020).", "Site marchand non actif : ouverture en attente de l’autorisation des éditeurs.", "Alain pilote le site, ses briques et ses tests ; le code est produit par des assistants IA."],
      role: "Architecture fonctionnelle, critères d’acceptation, tests et documentation.", complet: "skylivra" },
    livrees: { titre: "Livrées d’avions", tuile: "livrees.webp", statut: "3 livrées · Fenix A320",
      preuves: [[IMG + "selection-088.webp", "Aurora Borealis Blue — extérieur"], [IMG + "selection-077.webp", "Ancient Dragon — extérieur"]],
      faits: ["3 livrées complètes pour le Fenix A320 : extérieur, cockpit et cabine.", "Direction artistique et validation par Alain ; fabrication pilotée avec l’IA.", ""],
      role: "Direction artistique, essais dans le simulateur, retours précis jusqu’à la validation.",
      enfants: ["skylivra-ancient-dragon", "skylivra-aurora-borealis-blue", "skylivra-phoenix-pristine"] },
    addons: { titre: "Add-ons", tuile: "addons.webp", statut: "Aurora Borealis Add-on",
      preuves: [["assets/videos/aurores-en-vol.webp", "Aurores en vol"], [IMG + "selection-082.webp", "Capture de diagnostic"]],
      faits: ["Aurores boréales et australes la nuit, selon la position de l’avion.", "Panneau de commande dans le simulateur : interrupteur et indication d’état.", "Je définis le rendu et pilote la réalisation avec des assistants IA."],
      role: "Conception fonctionnelle, essais en vol, diagnostic des versions.", enfants: ["skylivra-aurores"] },
    installateur: { titre: "Installateur Windows", tuile: "installateur.webp", statut: "Livré avec chaque création",
      preuves: [[IMG + "selection-092.webp", "Écran de l’installateur"]], seule: true,
      faits: ["Installation guidée : langue, produit, dossier, installation.", "Vérifie le simulateur et l’avion requis avant d’installer.", "Restauration protégée en cas de problème."],
      role: "Fiabilité de l’installation : dépendances, contrôles et reprises." },
    studio: { titre: "Studio Vidéos", tuile: "studio.webp", statut: "Chaîne YouTube non publique",
      faits: ["Je réalise des montages pour présenter les créations SkyLivra. Ma chaîne YouTube n’est pas encore publique.", "Le montage Phoenix est terminé.", "Vidéo de la livrée Aurora Borealis : en cours de création."],
      role: "Choix des plans, captation (OBS Studio) et montage." }
  };
  // Créations : fiche courte (3 faits) ; la fiche complète existante reste à /parcours/<id>-complet.
  var CREATIONS = {
    "skylivra-ancient-dragon": { cat: "livrees", statut: "Livrée · Fenix A320", preuves: [[IMG + "selection-077.webp", "Extérieur dans MSFS"], [IMG + "selection-078.webp", "Cockpit et cabine"]],
      faits: ["Tête de dragon cuivrée, écailles et regard ambre, sans modifier la silhouette de l’avion.", "Fresques cuivre et ivoire en cabine, emblème sur les 174 sièges passagers.", "Textures et installateur Windows contrôlés avant l’essai en vol."],
      role: "Direction artistique : choix de la tête, maquettes de cabine approuvées, contrôle du rendu." },
    "skylivra-aurora-borealis-blue": { cat: "livrees", statut: "Livrée · Fenix A320", preuves: [[IMG + "selection-088.webp", "Extérieur"], [IMG + "selection-085.webp", "Poste de pilotage"]],
      faits: ["Aurore en haute définition et ciel étoilé, motifs alignés jusqu’aux volets.", "Cockpit et cabine retravaillés, emblème sur la dérive, les portes et les appuie-têtes.", "Déclinaison également préparée pour le PMDG 737-900ER."],
      role: "Essais en vol et ajustements du rendu." },
    "skylivra-phoenix-pristine": { cat: "livrees", statut: "Livrée de référence", preuves: [[IMG + "selection-098.webp", "Extérieur"], [IMG + "selection-100.webp", "Cabine passagers"]],
      faits: ["Version neuve d’une famille de livrées (immatriculation fictive F-PHNX).", "Base de la variante usée Phoenix — Weathered.", "Installateur renforcé : reprise si fichier verrouillé, restauration protégée."],
      role: "Direction artistique, validation des sources de peinture, contrôles avant chaque édition." },
    "skylivra-aurores": { cat: "addons", statut: "Add-on", preuves: [["assets/videos/aurores-en-vol.webp", "Aurores en vol"], [IMG + "selection-082.webp", "Capture de diagnostic"]],
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
  function logo() { return image("assets/applis/skylivra.webp", "SkyLivra", "sky-logo"); }
  function tete(titre, statut) { return el("header", { class: "sky-fiche-tete" }, [logo(), el("h1", { id: "fiche-titre", tabindex: "-1", text: titre }), statut ? el("span", { class: "sky-statut", text: statut }) : null]); }
  function faits(liste, role) {
    return [el("p", { class: "sky-prose", text: liste.join(" ") }), el("p", { class: "sky-role-court" }, [role])];
  }
  var ouvrirMedia = function () {};
  function preuves(liste, seule) {
    return medias(liste.map(function (p) { return {src: p[0], legende: p[1]}; }), ouvrirMedia);
  }

  function ensemble(parent, titreParent) {
    return [el("div", { class: "sky sky-ensemble" }, [
      retour(parent, titreParent),
      el("header", { class: "sky-tete" }, [
        el("h1", { id: "fiche-titre", tabindex: "-1", text: "SkyLivra" }),
        el("p", { class: "sky-phrase", text: "SkyLivra réunit mes créations pour Microsoft Flight Simulator 2020 : livrées d’avions, add-ons et vidéos, avec un installateur Windows et un site marchand non actif, en attente de l’autorisation des éditeurs." })
      ]),
      el("ul", { class: "sky-categories", "aria-label": "Catégories du projet" }, CATEGORIES.map(function (k) {
        var f = FICHES[k];
        return el("li", null, [el("a", { class: "sky-cat", href: "#/parcours/skylivra-" + k, "aria-label": f.titre }, [el("img", { src: TUILE + f.tuile, alt: "", decoding: "async" }), el("span", { class: "sky-cat-titre", text: f.titre })])]);
      })),
      el("section", { class: "sky-synthese", "aria-label": "Pilotage et compétences" }, [
        el("p", { class: "sky-role-texte", text: "Je définis les besoins, donne la direction artistique et coordonne plusieurs assistants IA. Des essais en vol au suivi des versions, je mobilise organisation, créativité et contrôle qualité pour mener chaque création à son aboutissement." })
      ])
    ])];
  }

  function categorie(k) {
    var f = FICHES[k];
    var cartes = f.enfants ? el("ul", { class: "sky-categories sky-livrees", "aria-label": f.titre }, f.enfants.map(function (id) {
      var titre = parTitre(id);
      return el("li", null, [el("a", { class: "sky-cat", href: "#/parcours/" + id, "aria-label": titre }, [image(CREATIONS[id].preuves[0][0], ""), el("span", { class: "sky-cat-titre", text: titre })])]);
    })) : k === "studio" ? studio() : preuves(f.preuves, f.seule);
    return [el("div", { class: "sky sky-fiche" }, [retour("/parcours/skylivra", "SkyLivra"), tete(f.titre),
      k === "livrees" ? null : el("p", {class: "sky-prose", text: f.faits.join(" ")}), cartes,
      k === "livrees" || k === "addons" ? null : el("p", {class: "sky-role-texte", text: f.role})])];
  }

  // Vignettes communes : titre sous chaque média, vidéos avant les photos.
  function medias(items, ouvrir) {
    var tries = items.filter(function (p) { return p.src || p.video || p.youtube; }).slice().sort(function (a, b) { return Number(!!(b.video || b.youtube)) - Number(!!(a.video || a.youtube)); });
    var photos = tries.filter(function (p) { return !p.video && !p.youtube; });
    return el("div", {class: "sky-media"}, tries.map(function (p) {
      var titre = p.legende || p.alt || "SkyLivra", visuel;
      if (p.youtube) visuel = el("iframe", {src: "https://www.youtube-nocookie.com/embed/" + p.youtube, title: titre, loading: "lazy", allow: "encrypted-media; picture-in-picture; fullscreen", allowfullscreen: "", referrerpolicy: "strict-origin-when-cross-origin"});
      else if (p.video) visuel = el("video", {src: p.video, poster: p.poster || "", controls: "", preload: "none", playsinline: "", "aria-label": titre});
      else {
        visuel = el("button", {type: "button", class: "sky-photo" + (p.entier ? " sky-photo-entier" : ""), "aria-label": "Agrandir : " + titre}, [image(p.statique || p.src, "")]);
        visuel.addEventListener("click", function () { ouvrir(photos, photos.indexOf(p), visuel); });
      }
      return el("figure", {class: "sky-media-carte", "data-media": p.video || p.youtube ? "video" : "photo"}, [visuel, el("figcaption", {text: titre})]);
    }));
  }

  function detail(e, parent, ouvrir) {
    var items = (e.galerie || []).concat.apply(e.galerie || [], (e.sections || []).map(function (s) { return s.galerie || []; }));
    if (e.id === "skylivra-phoenix-pristine") items = [{youtube: "6jUwnpN6TYk", legende: "Vidéo Phoenix"}].concat(items);
    var site = e.id === "skylivra", titre = site ? "Site marchand" : e.titre;
    if (site) items = [
      {src: "assets/skylivra/site-accueil.png", legende: "Accueil du site", entier: true},
      {src: "assets/skylivra/site-installation.png", legende: "Guide d’installation", entier: true},
      {src: "assets/skylivra/site-faq.png", legende: "Questions fréquentes", entier: true}
    ];
    var resume = site ? "Site marchand conçu pour distribuer mes livrées et add-ons de simulation de vol. Finalisé, il reste fermé en attendant l’autorisation des éditeurs d’avions." : e.resume;
    if (site) return [el("div", {class: "sky sky-fiche sky-detail"}, [
      retour(parent, "SkyLivra"), tete(titre), el("p", {class: "sky-prose", text: resume}), medias(items, ouvrir),
      el("p", {class: "sky-prose", text: "Je conçois le parcours client, coordonne les assistants IA et vérifie le catalogue, le paiement et l’installation des produits : cadrage, organisation et contrôle qualité."})
    ])];
    var textes = [];
    if (e.contexte && !site) textes.push(el("p", {text: e.contexte}));
    var missions = e.missions || [];
    for (var i = 0; i < missions.length; i += 2) textes.push(el("p", {text: missions.slice(i, i + 2).join(" ")}));
    (e.sections || []).forEach(function (s) {
      textes.push(el("section", {class: "sky-explication"}, [el("h2", {text: s.titre})].concat((s.paragraphes || []).map(function (t) { return el("p", {text: t}); }),
        (s.points || []).map(function (t) { return el("p", {text: t}); }))));
    });
    if (e.apports && e.apports.length) textes.push(el("p", {text: "Compétences mobilisées : " + e.apports.join(", ") + "."}));
    return [el("div", {class: "sky sky-fiche sky-detail"}, [
      retour(parent, site ? "SkyLivra" : e.id === "skylivra-aurores" ? "Add-ons" : "Livrées d’avions"), tete(titre),
      el("p", {class: "sky-prose", text: resume}), medias(items, ouvrir), el("div", {class: "sky-prose sky-explications"}, textes)
    ])];
  }

  // Vidéo Phoenix fournie explicitement par Alain le 18/11/2026 ; chaîne pas encore publique.
  function studio() {
    var video = el("iframe", { src: "https://www.youtube-nocookie.com/embed/6jUwnpN6TYk", title: "Vidéo Phoenix — SkyLivra", loading: "lazy", allow: "encrypted-media; picture-in-picture; fullscreen", allowfullscreen: "", referrerpolicy: "strict-origin-when-cross-origin" });
    return el("div", { class: "sky-preuves sky-studio" }, [
      el("figure", null, [video, el("figcaption", null, [el("a", { href: "https://www.youtube.com/watch?v=6jUwnpN6TYk&list=PLZdDgNxdfv6Q", target: "_blank", rel: "noopener", text: "Vidéo Phoenix ↗" })])]),
      el("figure", { class: "sky-encours" }, [el("div", { class: "sky-encours-visuel" }, [image(IMG + "selection-088.webp", "Livrée Aurora Borealis Blue, illustration"), el("span", { class: "sky-badge", text: "En cours de création" })]),
        el("figcaption", { text: "Vidéo Aurora Borealis" })])
    ]);
  }

  var parTitre = function () { return null; };
  window.SkyLivra = {
    categories: CATEGORIES,
    detail: detail,
    // ctx : { titre(id) → titre de la fiche ; parent ; titreParent }
    route: function (slug, ctx) {
      parTitre = ctx.titre;
      ouvrirMedia = ctx.ouvrir;
      if (slug === "skylivra") return { titre: "SkyLivra", rendu: ensemble(ctx.parent, ctx.titreParent) };
      var m = /^skylivra-(site|livrees|addons|installateur|studio)$/.exec(slug);
      if (m) return { titre: "SkyLivra · " + FICHES[m[1]].titre, rendu: categorie(m[1]) };

      return null;
    },
    // Retour d'une fiche complète : vers la vue courte correspondante.
    retourComplet: function (id) { return id === "skylivra" ? "/parcours/skylivra" : CREATIONS[id] ? "/parcours/skylivra-" + CREATIONS[id].cat : null; }
  };
  // Une vidéo ne continue jamais après un changement de vue.
  window.addEventListener("hashchange", function () { Array.prototype.forEach.call(document.querySelectorAll(".sky video"), function (v) { try { v.pause(); } catch (e) { /* ignoré */ } }); });
})();
