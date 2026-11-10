(function () {
  "use strict";
  var D = window.CV;
  var SAVOIR = "Savoir - formations";
  var LIBELLES = { experience: "Expériences professionnelles", formation: SAVOIR, personnel: "Projets personnels" };
  // Catégories de la spirale ; les formations ont leur propre onglet, hors spirale.
  var CATEGORIES = [
    { slug: "exp-pro", type: "experience", titre: "Expériences professionnelles" },
    { slug: "projets-perso", type: "personnel", titre: "Projets personnels" }
  ];
  var catSlug = Object.create(null);
  CATEGORIES.forEach(function (c) { catSlug[c.slug] = c; });
  var ANCIENNES = { haut: "/", parcours: "/parcours", competences: "/competences", realisations: "/realisations", contact: "/contact", interets: "/interets",
    savoir: "/savoir-formations", carte: "/carte", "savoir-formations": "/savoir-formations", metiers: "/metiers", postes: "/metiers", "/postes": "/metiers" };
  var ALIAS = D.alias || {};
  var RETIREES = D.retirees || [];
  var parId = Object.create(null), compId = Object.create(null);
  D.parcours.forEach(function (e) { parId[e.id] = e; });
  D.competences.forEach(function (c) { compId[c.id] = c; });
  // Du plus ancien au plus récent, même ordre que la frise du PDF.
  var ordre = D.parcours.filter(function (e) { return e.type !== "formation"; });
  var formations = D.parcours.filter(function (e) { return e.type === "formation"; });
  function suiteDe(e) { return e.type === "formation" ? formations : ordre; }
  // Repère de fin : adulte (comme le PDF v2.4) ; l’ancien pictogramme sert de secours tant que le fichier manque.
  var REPERES = {
    debut: { texte: "Naissance", annee: "1982", image: "assets/repere-naissance.png" },
    fin: { texte: "Aujourd’hui", annee: "2026", image: "assets/repere-adulte-v2.4.png", secours: "assets/repere-aujourdhui.png" }
  };

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, attrs, enfants) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function liste(items, cls) {
    return el("ul", { class: cls || "puces" }, items.map(function (t) { return el("li", { text: t }); }));
  }
  function etiquettes(items) {
    return el("ul", { class: "etiquettes" }, items.map(function (t) { return el("li", { text: t }); }));
  }
  function forme(type) { return el("span", { class: "forme " + type, "aria-hidden": "true" }); }
  function bulle(e) { return (e.bulle && e.bulle[0]) || e.titreCourt || e.titre; } // titre seul
  // Première image fixe d’une fiche (version statique d’une animation), pour les vignettes.
  function vignette(e) {
    var toutes = (e.galerie || []).concat.apply(e.galerie || [], (e.sections || []).map(function (s) { return s.galerie || []; }));
    for (var i = 0; i < toutes.length; i++) if (toutes[i].src) return { src: toutes[i].statique || toutes[i].src, alt: toutes[i].alt, entier: !!toutes[i].entier };
    return null;
  }
  // Image de secours : en cas d’échec, essaie l’ancien fichier avant de retirer l’image.
  function secours(img, chemin, retirer) {
    img.addEventListener("error", function () {
      if (chemin && img.getAttribute("src") !== chemin) img.setAttribute("src", chemin);
      else retirer();
    });
  }
  function image(v, cls) {
    var img = el("img", { src: v.src, alt: "", loading: "lazy", decoding: "async", class: cls || "" });
    img.addEventListener("error", function () { img.remove(); });
    return img;
  }

  /* ---------- Accueil ---------- */
  var I = D.identite;
  var mailto = "mailto:" + I.email + "?subject=" + encodeURIComponent(I.mail.objet) +
    "&body=" + encodeURIComponent(I.mail.corps.replace(/\n/g, "\r\n"));
  $("promesse").textContent = I.promesse;
  $("lien-cv").setAttribute("href", I.cvPdf);
  $("proposer-entretien").setAttribute("href", mailto);
  $("entretien-bandeau").setAttribute("href", mailto);
  $("appeler").setAttribute("href", "tel:" + I.telephoneLien);
  $("numero").textContent = I.telephone;
  // Jamais d’emplacement vide : sans portrait, la présentation passe sur une colonne.
  var portrait = $("portrait");
  function sansPortrait() { portrait.closest("figure").hidden = true; $("haut").classList.add("sans-portrait"); }
  if (portrait.complete && portrait.naturalWidth === 0) sansPortrait();
  else portrait.addEventListener("error", sansPortrait);

  var coord = $("coordonnees");
  coord.appendChild(el("li", null, [el("a", { href: "mailto:" + I.email, text: I.email })]));
  coord.appendChild(el("li", { text: I.ville }));
  coord.appendChild(el("li", { text: I.permis }));
  coord.appendChild(el("li", { text: I.langues }));

  Array.prototype.forEach.call(coord.children, function (n, i) { n.prepend(Icones.symbole(["mail", "lieu", "permis", "langues"][i])); });

  D.chiffres.forEach(function (c) {
    $("chiffres").appendChild(el("li", null, [el("strong", { text: c.valeur }), el("span", { text: c.libelle })]));
  });

  // Postes visés à côté de la photo : les premiers intitulés, la page #/metiers donne la liste complète et les preuves.
  var POSTES_UNE = 6;
  D.pistes.metiers.slice(0, POSTES_UNE).forEach(function (m) { $("postes").appendChild(el("li", { text: m.titre })); });


  // Réalisations marquantes : vignette, titre et apport concret.
  function tuileRealisation(id) {
    var e = parId[id], v = vignette(e);
    return el("li", { class: "tuile " + e.type }, [el("a", { href: "#/parcours/" + e.id }, [
      v ? image(v, "tuile-image" + (v.entier ? " entier" : "")) : el("span", { class: "tuile-mot", text: bulle(e) }),
      v ? el("span", { class: "tuile-titre", text: bulle(e) }) : null,
      e.apportCourt ? el("span", { class: "tuile-apport", text: e.apportCourt }) : null
    ])]);
  }
  D.realisations.filter(function (id) { return parId[id]; }).forEach(function (id) { $("selection").appendChild(tuileRealisation(id)); });

  $("maj").textContent = "Version " + D.mentions.version + " · mise à jour : " + D.mentions.maj;

  /* ---------- Briques communes ---------- */
  function retour(parent, texte) {
    return el("p", { class: "retour" }, [el("a", { href: "#" + parent, "data-retour": "", text: "← " + (texte || "Retour") })]);
  }
  function entete(titre, chapo) {
    return el("header", { class: "page-tete" }, [
      el("h1", { id: "fiche-titre", tabindex: "-1", text: titre }),
      chapo ? el("p", { class: "chapo", text: chapo }) : null
    ]);
  }
  // H1 accessible mais masqué : la navigation du haut nomme déjà la page.
  function titreCache(titre) {
    return el("h1", { id: "fiche-titre", class: "visuellement-cache", tabindex: "-1", text: titre });
  }
  function section(titre, contenu, niveau) {
    return contenu ? el("section", { class: "fiche-section" }, [el(niveau || "h2", { text: titre }), contenu]) : null;
  }
  // Ligne compacte « libellé : contenu », sans titre de section.
  function ligne(libelle, contenu) {
    return contenu ? el("div", { class: "fiche-ligne" }, [el("span", { class: "fiche-ligne-titre", text: libelle }), contenu]) : null;
  }
  function borne(cle) {
    var r = REPERES[cle];
    var img = el("img", { src: r.image, alt: "", width: "32", height: "32", class: "borne-image", decoding: "async" });
    var p = el("p", { class: "borne " + cle }, [img, el("span", { class: "borne-texte" }, [el("strong", { text: r.texte }), " · " + r.annee])]);
    // Pictogramme absent : la borne garde son texte et un repère graphique simple.
    secours(img, r.secours, function () { img.remove(); p.classList.add("sans-image"); });
    return p;
  }

  function media(p) {
    var corps;
    if (p.video) {
      corps = el("video", { controls: "", preload: "none", playsinline: "", poster: p.poster || "", "aria-label": p.alt }, [
        el("source", { src: p.video, type: "video/mp4" })
      ]);
      if (!p.poster) corps.removeAttribute("poster");
    } else {
      var img = el("img", { src: p.src, alt: p.alt, loading: "lazy", decoding: "async" });
      var visuel = p.statique ? el("picture", null, [el("source", {media: "(prefers-reduced-motion: reduce)", srcset: p.statique}), img]) : img;
      corps = el("a", { href: p.lien || p.src, target: "_blank", rel: "noopener", class: p.presentation === "aurore" ? "visuel-aurore" : "",
        "aria-label": p.lien ? p.alt + " (nouvel onglet)" : "Agrandir : " + p.alt }, [visuel]);
    }
    return el("figure", null, [corps, p.legende ? el("figcaption", { text: p.legende }) : null]);
  }
  // Galerie sans titre « En images » : les médias parlent d’eux-mêmes ; les légendes validées restent.
  function galerie(photos) {
    if (!photos || !photos.length) return null;
    return el("div", { class: "galerie" }, photos.map(media));
  }

  /* ---------- Parcours : spirale, liste alternative et onglets ---------- */
  var ETAT_VUE = { liste: window.innerWidth < 700 };
  var adapterParcours = null;
  var spiraleActive = null, spiraleAttente = null, filtreFocus = null;

  // Deux filtres à bascule : un clic active la catégorie, un second clic revient à toutes les étapes.
  // Les routes #/parcours/exp-pro et #/parcours/projets-perso restent les adresses de chaque filtre.
  function filtres(actif) {
    return el("div", { class: "filtres", role: "group", "aria-label": "Filtrer le parcours" }, CATEGORIES.map(function (c) {
      var presse = c.slug === actif;
      var b = el("button", { type: "button", class: "filtre " + c.type, "aria-pressed": String(presse), "data-filtre": c.slug, text: c.titre });
      // Après le changement de route, le focus revient sur ce même filtre (et non sur le titre masqué).
      b.addEventListener("click", function () { filtreFocus = c.slug; location.hash = presse ? "#/parcours" : "#/parcours/" + c.slug; });
      return b;
    }));
  }

  // Liste lisible sans animation : du plus récent au plus ancien, comme le sommaire.
  function etapeListe(e) {
    return el("li", { class: "etape " + e.type + (e.important ? " important" : "") }, [
      el("a", { href: "#/parcours/" + e.id, class: "etape-lien" }, [
        el("span", { class: "etape-titre", text: bulle(e) }),
        el("span", { class: "visuellement-cache", text: " (" + LIBELLES[e.type] + (e.important ? ", élément marquant" : "") + ")" })
      ])
    ]);
  }

  function pageParcours(cat) {
    var etapes = cat ? ordre.filter(function (e) { return e.type === cat.type; }) : ordre;
    var groupe = 0, nombre = window.innerWidth < 700 ? 1 : 4;
    function creerSpirale() { return window.Spirale ? window.Spirale.creer({
      items: etapes.slice(groupe * nombre, (groupe + 1) * nombre).map(function (e) {
        return { id: e.id, titre: bulle(e), href: "#/parcours/" + e.id, type: e.type, important: !!e.important, libelle: LIBELLES[e.type] };
      }),
      debut: REPERES.debut, fin: REPERES.fin
    }) : null; }
    var spirale = creerSpirale();
    var avant = el("button", {type: "button", class: "bouton secondaire", text: "← Précédent"});
    var apres = el("button", {type: "button", class: "bouton secondaire", text: "Suivant →"});
    var progression = el("span", {role: "status"});
    var chapitres = el("div", {class: "parcours-chapitres", "aria-label": "Étapes de la spirale"}, [avant, progression, apres]);
    function etatChapitre() {
      progression.textContent = "Étapes " + (groupe * nombre + 1) + "–" + Math.min(etapes.length, (groupe + 1) * nombre) + " / " + etapes.length;
      avant.disabled = groupe === 0; apres.disabled = (groupe + 1) * nombre >= etapes.length;
    }
    function changerGroupe(index) {
      groupe = Math.max(0, Math.min(Math.ceil(etapes.length / nombre) - 1, index));
      var ancien = spirale; spirale = creerSpirale();
      if (ancien && spirale) { ancien.arreter(); ancien.noeud.replaceWith(spirale.noeud); spiraleActive = spirale; spirale.demarrer(); }
      etatChapitre(); afficher(); if (window.Lecture) window.Lecture.actualiser();
    }
    avant.addEventListener("click", function () { changerGroupe(groupe - 1); });
    apres.addEventListener("click", function () { changerGroupe(groupe + 1); });
    adapterParcours = function () { var n = window.innerWidth < 700 ? 1 : 4; if (n !== nombre) { var debut = groupe * nombre; nombre = n; changerGroupe(Math.floor(debut / nombre)); } };
    etatChapitre();
    var vueListe = el("div", { class: "frise-cadre", id: "parcours-liste" }, [
      borne("fin"),
      el("ol", { class: "frise", reversed: "" }, etapes.slice().reverse().map(etapeListe)),
      borne("debut")
    ]);
    var bascule = el("button", { type: "button", class: "bouton secondaire vue-bascule", "aria-controls": "parcours-liste" });
    function afficher() {
      var liste = ETAT_VUE.liste || !spirale;
      vueListe.hidden = !liste;
      if (spirale) spirale.noeud.hidden = liste;
      bascule.hidden = !spirale;
      chapitres.hidden = liste || !spirale;
      bascule.textContent = liste ? "Voir la spirale" : "Voir en liste";
      bascule.setAttribute("aria-expanded", String(liste));
    }
    bascule.addEventListener("click", function () {
      ETAT_VUE.liste = !ETAT_VUE.liste; afficher();
      if (spirale && !ETAT_VUE.liste) spirale.actualiser();
    });
    afficher();
    spiraleAttente = spirale;
    return [
      titreCache(cat ? "Parcours · " + cat.titre : "Parcours"),
      el("div", { class: "parcours-commandes" }, [filtres(cat ? cat.slug : ""), bascule, chapitres]),
      spirale ? spirale.noeud : null,
      vueListe
    ];
  }

  /* ---------- Savoir - formations : onglet séparé, hors spirale ---------- */
  function pageSavoir() {
    return [
      titreCache(SAVOIR),
      el("ol", { class: "savoir-liste", reversed: "" }, formations.slice().reverse().map(function (e) {
        return el("li", { class: "savoir-item formation" + (e.important ? " important" : "") }, [
          el("a", { href: "#/parcours/" + e.id }, [
            el("span", { class: "savoir-titre", text: bulle(e) }),
            e.important ? el("span", { class: "visuellement-cache", text: " (élément marquant)" }) : null
          ])
        ]);
      }))
    ];
  }

  /* ---------- Parcours : sommaire et fiche ---------- */
  var ETAT_SOMMAIRE = { defilement: 0 };

  // Sommaire vertical : plus récent en haut, naissance en bas.
  function sommaire(actif) {
    var suite = suiteDe(actif), estSavoir = actif.type === "formation";
    var rang = suite.indexOf(actif) + 1;
    var corps = el("div", { class: "sommaire-corps", id: "sommaire-corps" }, [
      borne("fin"),
      el("ol", { class: "sommaire-liste", reversed: "" }, suite.slice().reverse().map(function (e) {
        var a = el("a", { href: "#/parcours/" + e.id }, [
          forme(e.type),
          el("span", { class: "sommaire-texte" }, [el("span", { class: "sommaire-titre", text: bulle(e) })])
        ]);
        a.setAttribute("aria-label", bulle(e) + " (" + LIBELLES[e.type] + (e.important ? ", élément marquant" : "") + ")");
        if (e === actif) a.setAttribute("aria-current", "page");
        return el("li", { class: e.type + (e.important ? " important" : "") }, [a]);
      })),
      borne("debut")
    ]);
    var bascule = el("button", { type: "button", class: "sommaire-bascule", "aria-expanded": "false", "aria-controls": "sommaire-corps" }, [
      el("span", { class: "sommaire-rang", text: rang + " / " + suite.length }),
      el("span", { class: "sommaire-actif", text: bulle(actif) }),
      el("span", { class: "sommaire-ouvrir", text: "Sommaire" })
    ]);
    bascule.addEventListener("click", function () { basculerSommaire(); });
    return el("nav", { class: "sommaire", id: "sommaire", "aria-label": estSavoir ? "Sommaire des formations" : "Sommaire du parcours" }, [
      el("p", { class: "sommaire-tete" }, [
        el("a", { href: estSavoir ? "#/savoir-formations" : "#/parcours", text: estSavoir ? SAVOIR : "Parcours" }),
        el("span", { text: " · " + suite.length + (estSavoir ? " formations" : " étapes") })
      ]),
      bascule, corps
    ]);
  }
  function basculerSommaire(fermer) {
    var nav = $("sommaire"); if (!nav) return false;
    var b = nav.querySelector(".sommaire-bascule");
    var ouvrir = fermer ? false : b.getAttribute("aria-expanded") !== "true";
    if (!ouvrir && b.getAttribute("aria-expanded") !== "true") return false;
    b.setAttribute("aria-expanded", String(ouvrir));
    nav.classList.toggle("ouvert", ouvrir);
    if (ouvrir) ajusterSommaire();
    return true;
  }
  // Garde l’entrée active entièrement visible dans le sommaire, sans faire défiler la page.
  function placerSommaire() {
    var corps = $("sommaire-corps"); if (!corps) return;
    corps.scrollTop = ETAT_SOMMAIRE.defilement;
    ajusterSommaire();
  }
  // Mesures dans le même référentiel (écran) : position de l’entrée dans la zone visible du corps.
  function ajusterSommaire() {
    var corps = $("sommaire-corps"); if (!corps) return;
    var actif = corps.querySelector("[aria-current]");
    if (!actif || corps.scrollHeight <= corps.clientHeight) return;
    var cadre = corps.getBoundingClientRect(), zone = actif.getBoundingClientRect();
    var haut = zone.top - cadre.top - (corps.clientTop || 0), bas = haut + (zone.bottom - zone.top);
    if (haut < 16) corps.scrollTop = Math.max(0, corps.scrollTop + haut - 24);
    else if (bas > corps.clientHeight - 16) corps.scrollTop = Math.min(corps.scrollHeight - corps.clientHeight, corps.scrollTop + bas - corps.clientHeight + 24);
  }

  // Lien vers une fiche : titre seul ; la catégorie n’est donnée que par la couleur et aux lecteurs d’écran.
  function lienEtape(id) {
    var e = parId[id];
    return el("li", { class: "preuve " + e.type }, [
      el("a", { href: "#/parcours/" + id }, [
        el("span", { class: "preuve-titre", text: bulle(e) }),
        el("span", { class: "visuellement-cache", text: " (" + LIBELLES[e.type] + ")" })
      ])
    ]);
  }

  function dossiers(sections, dejaVu) {
    if (!sections || !sections.length) return null;
    var groupe = el("div", { class: "dossiers" });
    sections.forEach(function (s) {
      var corps = el("div", { class: "dossier-contenu" });
      (s.paragraphes || []).forEach(function (t) { if (dejaVu.indexOf(t) === -1) corps.appendChild(el("p", { text: t })); });
      if (s.points && s.points.length) corps.appendChild(liste(s.points));
      var photos = galerie(s.galerie); if (photos) corps.appendChild(photos);
      var bloc = el("details", { class: "dossier" }, [el("summary", null, [el("h2", { text: s.titre })]), corps]);
      if (s.ouvert) bloc.setAttribute("open", "");
      groupe.appendChild(bloc);
    });
    return groupe;
  }

  function interetsDe(e) {
    return D.interets.filter(function (x) { return x.fiches.indexOf(e.id) !== -1; });
  }

  var RETOURS = { "/savoir-formations": SAVOIR, "/metiers": "Postes visés", "/competences": "Compétences", "/interets": "Intérêts", "/realisations": "Réalisations" };

  // Fiche : un seul vrai titre, lieu, résumé, puis tout de suite l’apport concret.
  // Pas de catégorie répétée ni de titres de sections mécaniques ; aucun texte affiché deux fois.
  function ficheParcours(e, parent) {
    var comps = (e.competences || []).filter(function (id) { return compId[id]; });
    var gouts = interetsDe(e);
    var dejaVu = [e.resume, e.apportCourt];
    var contexte = e.contexte && dejaVu.indexOf(e.contexte) === -1 ? e.contexte : null;
    if (contexte) dejaVu.push(contexte);
    var missions = (e.missions || []).filter(function (m) { return dejaVu.indexOf(m) === -1; });
    var c = parent.match(/^\/competence\/([\w-]+)$/);
    var fiche = el("div", { class: "fiche fiche-" + e.type }, [
      retour(parent, /^\/parcours/.test(parent) ? "Parcours" : c && compId[c[1]] ? compId[c[1]].titre : RETOURS[parent] || "Retour"),
      el("header", { class: "fiche-tete " + e.type }, [
        el("h1", { id: "fiche-titre", tabindex: "-1", text: e.titre }),
        el("p", { class: "fiche-periode" }, [Icones.symbole("periode"), "(" + e.periode + ")"]),
        e.lieu ? el("p", { class: "fiche-lieu" }, [Icones.symbole("lieu"), e.lieu]) : null,
        el("p", { class: "fiche-resume", text: e.resume }),
        e.apportCourt ? el("p", { class: "fiche-apport", text: e.apportCourt }) : null
      ]),
      contexte ? el("p", { class: "fiche-intro", text: contexte }) : null,
      e.site ? el("p", { class: "lien-externe" }, [el("a", { class: "bouton secondaire", href: e.site.url, target: "_blank", rel: "noopener", text: e.site.libelle + " ↗" })]) : null,
      missions.length ? liste(missions, "puces fiche-liste") : null,
      galerie(e.galerie),
      dossiers(e.sections, dejaVu),
      el("div", { class: "fiche-lignes" }, [
        e.outils ? ligne("Outils", Icones.liste(e.outils)) : null,
        e.apports && e.apports.length ? ligne("Acquis", etiquettes(e.apports)) : null,
        comps.length ? ligne("Compétences", el("ul", { class: "liens-competences" }, comps.map(function (id) {
          return el("li", null, [el("a", { href: "#/competence/" + id }, [Icones.symbole(Icones.competences[id]), compId[id].titre])]);
        }))) : null,
        gouts.length ? ligne("Intérêts", el("ul", { class: "liens-competences" }, gouts.map(function (x) {
          return el("li", null, [el("a", { href: "#/interets", text: x.nom })]);
        }))) : null
      ])
    ]);
    return [el("div", { class: "parcours-mise" }, [sommaire(e), fiche])];
  }

  /* ---------- Compétences ---------- */
  function outilsDe(c) {
    return D.outils.filter(function (f) { return f.competence === c.id; });
  }
  function logos(items) {
    return el("ul", { class: "logos outils-icones" }, items.map(function (p) {
      return el("li", null, [Icones.outil(p.nom, {href: "#/parcours/" + p.fiche, logo: p.logo, description: p.role})]);
    }));
  }

  // Index : seulement les compétences, chacune ouvre sa fiche ; pas de chapo ni de commentaire.
  function pageCompetences() {
    return [
      titreCache("Compétences"),
      el("ol", { class: "competences-liste" }, D.competences.map(function (c, i) {
        var outils = outilsDe(c).reduce(function (t, f) { return t.concat(f.items); }, []);
        if (c.id === "plateformes") outils = D.plateformes.items.slice(0, 6).map(function (p) { return p.nom; });
        if (outils.length > 10) outils = outils.slice(0, 10).concat("…");
        return el("li", null, [el("a", { href: "#/competence/" + c.id, class: "competence-ligne" }, [
          el("span", { class: "competence-num", "aria-hidden": "true" }, [Icones.symbole(Icones.competences[c.id])]),
          el("span", { class: "competence-corps" }, [
            el("span", { class: "competence-titre", text: c.titre }),
            el("span", { class: "competence-sous", text: c.sousTitre }),
            outils.length ? Icones.liste(outils, true) : null
          ])
        ])]);
      }))
    ];
  }

  function ficheCompetence(c) {
    var familles = outilsDe(c);
    var P = D.plateformes;
    return [
      retour("/competences", "Compétences"),
      el("header", { class: "fiche-tete competence" }, [
        el("h1", { id: "fiche-titre", tabindex: "-1", text: c.titre }),
        el("p", { class: "fiche-lieu", text: c.sousTitre }),
        el("p", { class: "fiche-resume", text: c.resume })
      ]),
      liste(c.detail, "puces fiche-liste"),
      familles.length ? el("div", { class: "outils fiche-section" }, familles.map(function (f) {
        return el("div", { class: "famille" }, [el("h2", { text: f.famille }), Icones.liste(f.items)]);
      })) : null,
      c.id === "creations-ia" || c.id === "ia" || c.id === "plateformes" ? el("section", { class: "fiche-section plateformes" }, [
        el("h2", { text: P.titre }), el("p", { class: "note", text: P.note }), logos(P.items)
      ]) : null,
      section("Preuves dans le parcours", el("ul", { class: "preuves" }, c.preuves.filter(function (id) { return parId[id]; }).map(lienEtape))),
      galerie(c.galerie)
    ];
  }

  /* ---------- Postes visés : pistes tirées du parcours, chacune avec ses preuves ---------- */
  function pageMetiers() {
    var P = D.pistes;
    return [
      entete(P.titre),
      el("ul", { class: "metiers-liste" }, P.metiers.map(function (m) {
        return el("li", { class: "metier", id: "poste-" + m.id }, [
          el("h2", { text: m.titre }),
          el("p", { text: m.justification }),
          el("ul", { class: "preuves compactes", "aria-label": "Preuves : " + m.titre }, m.preuves.filter(function (id) { return parId[id]; }).map(lienEtape))
        ]);
      }))
    ];
  }

  /* ---------- Intérêts ---------- */
  function pageInterets() {
    return [
      titreCache("Intérêts"),
      el("ul", { class: "interets" }, D.interets.map(function (x) {
        return el("li", { class: "interet", id: "interet-" + x.id }, [
          el("figure", { class: "interet-image" }, [el("img", { src: x.image.src, alt: x.image.alt, loading: "lazy", decoding: "async" })]),
          el("div", { class: "interet-texte" }, [
            el("h2", { text: x.nom }),
            el("p", { text: x.texte }),
            el("ul", { class: "preuves compactes" }, x.fiches.filter(function (id) { return parId[id]; }).map(lienEtape))
          ])
        ]);
      }))
    ];
  }

  /* ---------- Réalisations (route conservée), mentions ---------- */
  function pageRealisations() {
    return [
      retour("/", "Présentation"),
      entete("Réalisations marquantes"),
      el("ul", { class: "tuiles" }, D.realisations.filter(function (id) { return parId[id]; }).map(tuileRealisation))
    ];
  }

  function pageMentions() {
    var M = D.mentions;
    return [
      retour("/", "Présentation"),
      entete("Mentions légales et confidentialité"),
      section("Éditeur", el("p", { text: M.editeur })),
      section("Hébergement", el("p", { text: M.hebergeur })),
      section("Données personnelles", el("p", { text: M.donnees })),
      section("Contenu", el("p", { text: "Les informations présentées décrivent le parcours d’Alain Ferro. Les photos publiées sont personnelles ; elles ne peuvent pas être réutilisées sans accord. Les logos appartiennent à leurs éditeurs respectifs et ne figurent qu’à titre d’identification." }))
    ];
  }

  /* ---------- Routeur ---------- */
  var vue = $("vue"), accueil = $("accueil");
  var routeCourante = "/", listeOrigine = null, dernierDetail = null;

  function resoudre(h) {
    var m;
    if (h === "/" || h === "") return { rubrique: "presentation", titre: "" };
    if (h === "/metiers") return { rubrique: "presentation", titre: D.pistes.titre, rendu: pageMetiers(), liste: true };
    if (h === "/parcours") return { rubrique: "parcours", titre: "Parcours", rendu: pageParcours(null), liste: true };
    if ((m = h.match(/^\/parcours\/([\w-]+)$/))) {
      if (catSlug[m[1]]) return { rubrique: "parcours", titre: "Parcours · " + catSlug[m[1]].titre, rendu: pageParcours(catSlug[m[1]]), liste: true };
      var e = parId[m[1]];
      if (e) {
        var savoir = e.type === "formation";
        // Une formation ne revient jamais vers la spirale, qui ne la contient pas.
        var origineValide = listeOrigine && (savoir ? /^\/(savoir-formations|competence|realisations|interets|metiers|carte)/ : /^\/(parcours|competence|realisations|interets|metiers|carte)/).test(listeOrigine);
        var parent = origineValide ? listeOrigine : savoir ? "/savoir-formations" : "/parcours";
        return { rubrique: savoir ? "savoir" : "parcours", titre: e.titre, rendu: ficheParcours(e, parent), detail: true, fiche: true };
      }
    }
    if (h === "/savoir-formations") return { rubrique: "savoir", titre: SAVOIR, rendu: pageSavoir(), liste: true };
    if (h === "/competences") return { rubrique: "competences", titre: "Compétences", rendu: pageCompetences(), liste: true };
    if ((m = h.match(/^\/competence\/([\w-]+)$/)) && compId[m[1]]) return { rubrique: "competences", titre: compId[m[1]].titre, rendu: ficheCompetence(compId[m[1]]), liste: true, detail: true };
    if (h === "/interets") return { rubrique: "interets", titre: "Intérêts", rendu: pageInterets(), liste: true };
    if (h === "/carte" && window.CarteLiens) return { rubrique: "presentation", titre: "Carte des liens", rendu: [retour("/", "Présentation"), titreCache("Carte des liens"), window.CarteLiens.page(D)], liste: true };
    if (h === "/realisations") return { rubrique: "presentation", titre: "Réalisations marquantes", rendu: pageRealisations(), liste: true };
    if (h === "/mentions") return { rubrique: "", titre: "Mentions légales", rendu: pageMentions() };
    return null;
  }

  function marquerRubrique(r) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-rubrique]"), function (a) {
      if (a.getAttribute("data-rubrique") === r) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function router() {
    var h, m, versContact = false;
    try { h = decodeURIComponent(location.hash.replace(/^#/, "")); } catch (_) { h = "/"; history.replaceState(null, "", "#/"); }
    if (Object.prototype.hasOwnProperty.call(ANCIENNES, h)) { history.replaceState(null, "", "#" + ANCIENNES[h]); h = ANCIENNES[h]; }
    // Ancienne page Contact : les actions sont désormais sur l’accueil, sans page intermédiaire.
    if (h === "/contact") { history.replaceState(null, "", "#/"); h = "/"; versContact = true; }
    if ((m = h.match(/^\/parcours\/([\w-]+)$/))) {
      // Anciennes routes : fiche fusionnée, ancien onglet Savoir, fiches retirées (Enfance, Adolescence).
      var cible = Object.prototype.hasOwnProperty.call(ALIAS, m[1]) ? "/parcours/" + ALIAS[m[1]]
        : m[1] === "savoir" ? "/savoir-formations"
        : RETIREES.indexOf(m[1]) !== -1 ? "/parcours" : null;
      if (cible) { h = cible; history.replaceState(null, "", "#" + h); }
    }
    if (window.Lecture) window.Lecture.arreter();
    adapterParcours = null;
    if (spiraleActive) { spiraleActive.arreter(); spiraleActive = null; }
    spiraleAttente = null;
    var r = resoudre(h);
    if (!r) { history.replaceState(null, "", "#/"); h = "/"; r = resoudre(h); }
    var precedente = routeCourante, deFiche = /^\/parcours\/[\w-]+$/.test(precedente) && $("sommaire-corps");
    if (deFiche) ETAT_SOMMAIRE.defilement = $("sommaire-corps").scrollTop;
    routeCourante = h;
    marquerRubrique(r.rubrique);
    document.body.classList.toggle("sur-accueil", !r.rendu);
    document.body.classList.toggle("sur-metiers", h === "/metiers");
    document.body.classList.toggle("sur-parcours", /^\/parcours(?:\/(?:exp-pro|projets-perso))?$/.test(h));
    // Mentions, version et date : uniquement sous la Présentation ; ailleurs le pied est retiré (ni espace ni focus).
    $("pied").hidden = !!r.rendu;
    mesurerBandeau();

    if (!r.rendu) {
      vue.hidden = true; vue.textContent = ""; accueil.hidden = false;
      document.title = "Présentation · Alain Ferro";
      if (window.Lecture) window.Lecture.installer(accueil, ajusterTitres);
      ajusterTitres();
      listeOrigine = null;
      if (versContact) { $("proposer-entretien").focus(); return; }
      window.scrollTo(0, 0);
      if (precedente !== "/") $("titre-nom").focus({ preventScroll: true });
      return;
    }
    vue.textContent = "";
    r.rendu.forEach(function (n) { if (n) vue.appendChild(n); });
    accueil.hidden = true; vue.hidden = false;
    document.title = r.titre + " · Alain Ferro";
    if (window.Lecture) window.Lecture.installer(vue, function () { ajusterTitres(); if (spiraleActive) spiraleActive.actualiser(); });
    ajusterTitres();
    if (spiraleAttente) { spiraleActive = spiraleAttente; spiraleAttente = null; spiraleActive.demarrer(); }

    // De retour sur une liste : on replace le focus sur le lien visible de la fiche quittée.
    var lien = r.liste && dernierDetail ? Array.prototype.filter.call(vue.querySelectorAll("a[href='#" + dernierDetail + "']"), function (a) {
      return a.getClientRects().length > 0;
    })[0] : null;
    var filtre = filtreFocus ? vue.querySelector("[data-filtre='" + filtreFocus + "']") : null;
    filtreFocus = null;
    if (filtre) filtre.focus({ preventScroll: true });
    else if (lien) { lien.scrollIntoView({ block: "center" }); lien.focus({ preventScroll: true }); }
    else {
      if (!r.fiche || !deFiche) ETAT_SOMMAIRE.defilement = 0;
      // D’une fiche à l’autre, la page ne remonte que si le haut de la fiche est sorti de l’écran.
      var haut = vue.getBoundingClientRect().top + window.pageYOffset;
      if (!(r.fiche && deFiche) || window.pageYOffset > haut) window.scrollTo(0, r.fiche && deFiche ? haut : 0);
      placerSommaire();
      var t = $("fiche-titre"); if (t) t.focus({ preventScroll: true });
    }
    if (r.liste) listeOrigine = h;
    dernierDetail = r.detail ? h : null;
  }

  function revenir() {
    var a = vue.querySelector("[data-retour]");
    if (a) location.hash = a.getAttribute("href");
  }

  document.addEventListener("click", function (ev) {
    if (ev.target.closest && ev.target.closest(".evitement")) {
      ev.preventDefault();
      var cible = vue.hidden ? $("titre-nom") : $("fiche-titre");
      if (cible) { cible.focus(); cible.scrollIntoView({ block: "start" }); }
    }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape" || vue.hidden || ev.defaultPrevented) return;
    ev.preventDefault();
    // Échap ferme d’abord le sommaire ouvert sur mobile, puis revient à la liste.
    if (basculerSommaire(true)) { $("sommaire").querySelector(".sommaire-bascule").focus(); return; }
    revenir();
  });


  // Une ligne entière, sans ellipse : la taille de police suit l’espace réellement disponible.
  var TITRES_LIGNE = ".onglets-site a,.fiche-tete h1,.sommaire-titre,.savoir-titre,.etape-titre,.preuve-titre,.tuile-titre,.tuile-mot,.metier h2,.spirale-titre,.competence-titre,.interet h2,.liens-competences a";
  function ajusterTitres() {
    Array.prototype.forEach.call(document.querySelectorAll(TITRES_LIGNE), function (n) {
      if (!n.getClientRects().length) return;
      n.style.fontSize = "";
      var c = getComputedStyle(n), taille = parseFloat(c.fontSize);
      var pad = parseFloat(c.paddingLeft) + parseFloat(c.paddingRight);
      var plage = document.createRange(); plage.selectNodeContents(n);
      var largeur = n.clientWidth - pad, texte = Math.max(n.scrollWidth - pad, plage.getBoundingClientRect().width);
      if (largeur > 0 && texte > largeur) n.style.fontSize = Math.max(6, taille * (largeur - 1) / texte).toFixed(2) + "px";
    });
  }

  // Hauteur réelle de l’en-tête (une ou deux lignes) pour placer le sommaire collant.
  function mesurerBandeau() { document.documentElement.style.setProperty("--bandeau", $("bandeau").offsetHeight + "px"); }
  window.addEventListener("resize", function () { mesurerBandeau(); if (adapterParcours) adapterParcours(); ajusterTitres(); if (spiraleActive) spiraleActive.actualiser(); if (window.Lecture) window.Lecture.actualiser(); });
  mesurerBandeau();
  ajusterTitres();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusterTitres);
  // Le conteneur peut changer de largeur après un changement de grille ou de barre de défilement.
  if (window.ResizeObserver) {
    var observationTitres = new ResizeObserver(function () { ajusterTitres(); if (spiraleActive) spiraleActive.actualiser(); });
    observationTitres.observe(vue); observationTitres.observe(accueil);
  }

  // Contrôle de géométrie de la spirale affichée (recette) : marge minimale entre bulles, toute rotation.
  window.CVControleSpirale = function () { return spiraleActive ? spiraleActive.controle() : null; };

  window.addEventListener("hashchange", router);
  router();
})();
