(function () {
  "use strict";
  var D = window.CV;
  var SAVOIR = "Formation";
  var LIBELLES = { experience: "Expériences professionnelles", formation: SAVOIR, personnel: "Projets personnels" };
  // Catégories du chemin ; les formations ont leur propre page, hors chemin.
  var CATEGORIES = [
    { slug: "exp-pro", type: "experience", titre: "Expériences professionnelles", court: "Exp pro" },
    { slug: "projets-perso", type: "personnel", titre: "Projets personnels", court: "Exp perso" },
    // v2.18 : Exp forte devient un filtre (éléments marquants des deux catégories).
    { slug: "exp-forte", type: "forte", titre: "Expériences fortes", court: "Exp forte" }
  ];
  var catSlug = Object.create(null);
  CATEGORIES.forEach(function (c) { catSlug[c.slug] = c; });
  var ANCIENNES = { haut: "/", parcours: "/parcours", competences: "/competences", realisations: "/realisations", contact: "/contact", interets: "/interets",
    savoir: "/savoir-formations", carte: "/carte", "savoir-formations": "/savoir-formations", metiers: "/metiers", postes: "/metiers", "/postes": "/metiers",
    formation: "/savoir-formations", "/formation": "/savoir-formations", formations: "/savoir-formations", "/formations": "/savoir-formations" };
  var ALIAS = D.alias || {};
  var RETIREES = D.retirees || [];
  var parId = Object.create(null), compId = Object.create(null);
  D.parcours.forEach(function (e) { parId[e.id] = e; });
  D.competences.forEach(function (c) { compId[c.id] = c; });
  // Du plus ancien au plus récent, même ordre que la frise du PDF.
  var ordre = D.parcours.filter(function (e) { return e.type !== "formation"; });
  var formations = D.parcours.filter(function (e) { return e.type === "formation"; });
  // Repères temporels, comme sur le PDF : bébé au départ, adulte à l’arrivée, hors du chemin des expériences.
  var REPERES = {
    debut: { texte: "Naissance", annee: "1982", icone: "assets/repere-naissance-176.webp" },
    fin: { texte: "Aujourd’hui", annee: "2026", icone: "assets/repere-adulte-176.webp" }
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
  function bulle(e) { return (e.bulle && e.bulle[0]) || e.titreCourt || e.titre; } // titre seul
  // Première image fixe d’une fiche (version statique d’une animation), pour les vignettes.
  function vignette(e) {
    var toutes = (e.galerie || []).concat.apply(e.galerie || [], (e.sections || []).map(function (s) { return s.galerie || []; }));
    for (var i = 0; i < toutes.length; i++) if (toutes[i].src) return { src: toutes[i].statique || toutes[i].src, alt: toutes[i].alt, entier: !!toutes[i].entier };
    return null;
  }
  function image(v, cls) {
    var img = el("img", { src: v.src, alt: "", loading: "lazy", decoding: "async", class: cls || "" });
    img.addEventListener("error", function () { img.remove(); });
    return img;
  }

  /* ---------- Accueil ---------- */
  var I = D.identite;
  var C = window.Coherence;
  var mailto = "mailto:" + I.email + "?subject=" + encodeURIComponent(I.mail.objet) +
    "&body=" + encodeURIComponent(I.mail.corps.replace(/\n/g, "\r\n"));
  var nomPdf = I.cvPdf.split("/").pop().split("?")[0];
  // Présentation en paragraphes (un par ligne de la source).
  I.promesse.split("\n").forEach(function (t) { $("promesse").appendChild(el("p", { text: t })); });
  $("ville").textContent = I.ville;
  $("accroche").textContent = I.accroche;
  ["lien-cv", "lien-cv-menu"].forEach(function (id) { $(id).setAttribute("href", I.cvPdf); $(id).setAttribute("download", nomPdf); });
  $("lien-cv-logo").setAttribute("href", I.cvPdf);
  // Courriel prêt à envoyer, ouvert dans la messagerie du visiteur.
  $("entretien-bandeau").setAttribute("href", mailto);
  // Jamais d’emplacement vide : sans portrait, l’identité garde son texte.
  var portrait = $("portrait");
  function sansPortrait() { portrait.hidden = true; $("haut").classList.add("sans-portrait"); }
  if (portrait.complete && portrait.naturalWidth === 0) sansPortrait();
  else portrait.addEventListener("error", sansPortrait);
  // Avion et planète à anneaux : symboles de passions au trait, en fond discret.
  $("marques-une").setAttribute("aria-hidden", "true");
  $("marques-une").appendChild(C.symbole("avion", "co-avion"));
  $("marques-une").appendChild(C.symbole("planete", "co-orbite"));

  var coord = $("coordonnees");
  coord.appendChild(el("li", null, [el("a", { href: "tel:" + I.telephoneLien, text: I.telephone })]));
  coord.appendChild(el("li", null, [el("a", { href: "mailto:" + I.email, text: I.email })]));
  coord.appendChild(el("li", { class: "co-petit", text: I.permis }));
  coord.appendChild(el("li", { class: "co-petit", text: I.langues }));

  // Pied de page : numéro de version seul ; mentions légales accessibles.
  var VERSION = "Version " + D.mentions.version;
  $("maj").textContent = VERSION;
  function piedDePage() {
    return el("footer", { class: "co-pied" }, [el("p", { text: VERSION }), el("p", null, [el("a", { href: "#/mentions", text: "Mentions légales et confidentialité" })])]);
  }

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
  // Tête des pages principales : titre visible et symbole au trait très pâle.
  function tetePage(titre, symbole) {
    return el("header", { class: "co-tete" }, [
      el("span", { class: "co-filigrane", "aria-hidden": "true" }, [C.symbole(symbole)]),
      el("h1", { id: "fiche-titre", tabindex: "-1", text: titre })
    ]);
  }
  // H1 accessible mais masqué : la navigation du haut nomme déjà la page.
  function titreCache(titre) {
    return el("h1", { id: "fiche-titre", class: "visuellement-cache", tabindex: "-1", text: titre });
  }
  // Catalogue au format de la page Compétences (v2.18) : pastille, titre, texte court, un seul lien « Fiche complète ».
  function catalogue(items, niveau) {
    return el("ul", { class: "co-catalogue" }, items.map(function (it) {
      var mini = it.visuel ? el("span", { class: "co-mini co-mini-image", "aria-hidden": "true" }, [image(it.visuel)])
        : el("span", { class: "co-mini" + (it.cls ? " " + it.cls : ""), "aria-hidden": "true" }, [it.icone]);
      return el("li", { class: "co-competence" + (it.cls ? " " + it.cls : ""), id: it.id }, [
        mini,
        el("div", { class: "co-competence-nom" }, [el(niveau || "h3", { text: it.titre }), it.texte ? el("p", { text: it.texte }) : null, it.extra || null]),
        it.lien ? el("a", { class: "co-fiche-complete", href: it.lien, "aria-label": "Fiche complète : " + (it.nom || it.titre), text: "Fiche complète" }) : null
      ]);
    }));
  }
  function section(titre, contenu, niveau) {
    return contenu ? el("section", { class: "fiche-section" }, [el(niveau || "h2", { text: titre }), contenu]) : null;
  }
  // Ligne compacte « libellé : contenu », sans titre de section.
  function ligne(libelle, contenu) {
    return contenu ? el("div", { class: "fiche-ligne" }, [el("span", { class: "fiche-ligne-titre", text: libelle }), contenu]) : null;
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

  /* ---------- Parcours : chemin libre de la naissance à aujourd’hui ---------- */
  var filtreFocus = null;
  // Étapes du chemin : ordre de la source ; « Loisirs actuels » reste une fiche d’intérêt, hors chemin.
  // Les projets rattachés à une fiche (« parent », v2.18) sont ses pages enfants, hors chemin.
  var etapesChemin = ordre.filter(function (e) { return e.id !== "jeunesse" && !e.parent; });
  function texteBulle(e) { return (e.bulle || [e.titreCourt || e.titre]).join(" "); }
  function couper(t, max) {
    var lignes = [], l = "";
    t.split(" ").forEach(function (m) { if ((l + " " + m).trim().length > max && l) { lignes.push(l); l = m; } else l = (l + " " + m).trim(); });
    if (l) lignes.push(l);
    return lignes;
  }

  // Légende : trois filtres (routes #/parcours/exp-pro, projets-perso et exp-forte) ; un second clic les retire.
  function legende(actif) {
    var boutons = CATEGORIES.map(function (c) {
      var presse = c.slug === actif;
      var points = c.type === "forte"
        ? [el("i", { class: "co-point plein", "aria-hidden": "true" }), el("i", { class: "co-point plein personnel", "aria-hidden": "true" })]
        : [el("i", { class: "co-point " + c.type, "aria-hidden": "true" })];
      var b = el("button", { type: "button", class: "co-filtre " + c.type, "aria-pressed": String(presse), "data-filtre": c.slug, title: c.titre }, points.concat(c.court));
      b.addEventListener("click", function () { filtreFocus = c.slug; location.hash = presse ? "#/parcours" : "#/parcours/" + c.slug; });
      return b;
    });
    return el("div", { class: "co-legende", role: "group", "aria-label": "Filtrer le parcours" }, boutons);
  }

  // Repère temporel : icône et date, sans bulle ni lien, relié au chemin par un fil pointillé.
  function repereTemps(r, pos, vers, cote) {
    var t = 52;
    return C.svg("g", { class: "co-repere-temps", role: "img", "aria-label": r.texte + " " + r.annee }, [
      C.svg("path", { d: "M" + pos.x + "," + pos.y + " L" + vers.x + "," + vers.y, class: "co-repere-fil" }),
      C.svg("circle", { cx: pos.x, cy: pos.y, r: t / 2 + 8, class: "co-repere-halo" }),
      C.svg("image", { href: r.icone, x: pos.x - t / 2, y: pos.y - t / 2, width: t, height: t }),
      C.svg("text", { x: pos.x, y: pos.y + (cote > 0 ? t / 2 + 30 : -t / 2 - 34), "text-anchor": "middle", class: "co-repere-texte" }, [r.texte]),
      C.svg("text", { x: pos.x, y: pos.y + (cote > 0 ? t / 2 + 50 : -t / 2 - 14), "text-anchor": "middle", class: "co-repere-annee" }, [r.annee])
    ]);
  }

  // Titres lisibles : 17 unités (environ 14 px à 1280×800), 15 si le libellé demande quatre lignes.
  function noeudChemin(e, pos, r) {
    var x = pos.x, y = pos.y, repere = !e.type;
    var lignes = couper(texteBulle(e), 11), taille = lignes.length > 3 ? 15 : 17, pas = taille + 3;
    var cls = "co-noeud " + (repere ? "repere" : e.type) + (e.important ? " important" : "");
    var contenu = [
      C.svg("circle", { cx: x, cy: y, r: r }),
      C.svg("text", { x: x, y: y - (lignes.length - 1) * pas / 2, "text-anchor": "middle", "dominant-baseline": "middle", class: "co-noeud-texte", "font-size": taille },
        lignes.map(function (l, i) { return C.svg("tspan", { x: x, dy: i ? pas : 0 }, [l]); })),
      C.svg("text", { x: x, y: y + r + 18, "text-anchor": "middle", class: "co-noeud-periode" }, [e.periode])
    ];
    if (repere) return C.svg("g", { class: cls, role: "img", "aria-label": e.titre + " " + e.periode }, contenu);
    return C.svg("a", { href: "#/parcours/" + e.id, class: cls, "aria-label": bulle(e) + " (" + e.periode + ", " + LIBELLES[e.type] + (e.important ? ", élément marquant" : "") + ")" }, contenu);
  }

  function pageParcours(cat) {
    var debut = { id: "naissance", titre: REPERES.debut.texte, icone: REPERES.debut.icone, periode: REPERES.debut.annee };
    var fin = { id: "aujourdhui", titre: REPERES.fin.texte, icone: REPERES.fin.icone, periode: REPERES.fin.annee };
    var tous = [debut].concat(etapesChemin, [fin]);
    var geo = C.chemin(etapesChemin.length);
    var filtre = cat ? " filtre-" + cat.type : "";
    var vueChemin = null;
    if (geo) {
      var n = geo.positions.length;
      vueChemin = el("div", { class: "co-chemin-cadre" }, [C.svg("svg", { class: "co-chemin" + filtre, viewBox: geo.viewBox, preserveAspectRatio: "xMidYMid meet", role: "group", "aria-label": "Parcours de la naissance, en bas à gauche, à aujourd’hui, en haut à droite" }, [
        C.svg("path", { d: geo.route, class: "co-route" }),
        repereTemps(REPERES.debut, geo.debut, geo.positions[0], -1),
        repereTemps(REPERES.fin, geo.fin, geo.positions[n - 1], 1)
      ].concat(etapesChemin.map(function (e, i) { return noeudChemin(e, geo.positions[i], geo.rayon); })))]);
    }
    // Écran étroit ou bas : liste accessible, aujourd’hui en haut, repères temporels non interactifs.
    var vueListe = el("ol", { class: "co-chemin-liste" + filtre + (geo ? "" : " toujours"), reversed: "" }, tous.slice().reverse().map(function (e) {
      if (!e.type) return el("li", { class: "co-arret repere" }, [el("span", { class: "co-arret-corps" }, [
        el("img", { src: e.icone, alt: "", class: "co-arret-icone", width: "40", height: "40" }), el("span", { class: "co-arret-titre", text: e.titre }), el("small", { text: e.periode })])]);
      return el("li", { class: "co-arret " + e.type + (e.important ? " important" : "") }, [el("a", { href: "#/parcours/" + e.id, class: "co-arret-corps" }, [
        el("span", { class: "co-arret-titre", text: texteBulle(e) }), el("small", { text: e.periode }),
        el("span", { class: "visuellement-cache", text: " (" + LIBELLES[e.type] + (e.important ? ", élément marquant" : "") + ")" })
      ])]);
    }));
    // En-tête réduit à une ligne pour laisser toute la hauteur au chemin.
    // Titre fixe : le filtre actif se lit déjà sur son bouton.
    var tete = el("header", { class: "co-tete-parcours" }, [el("h1", { id: "fiche-titre", tabindex: "-1", text: "Parcours" }), legende(cat ? cat.slug : "")]);
    return [tete, vueChemin, vueListe];
  }

  /* ---------- Formation : page séparée, hors chemin ---------- */
  // v2.18 : même organisation que Compétences, de la plus récente à la plus ancienne.
  function pageSavoir() {
    return [
      tetePage(SAVOIR, "toque"),
      catalogue(formations.slice().reverse().map(function (e) {
        return { id: "formation-" + e.id, cls: "formation" + (e.important ? " important" : ""), icone: C.symbole("toque"), titre: e.titre,
          texte: e.periode + (e.lieu ? " · " + e.lieu : ""), lien: "#/parcours/" + e.id };
      }), "h2")
    ];
  }

  /* ---------- Parcours : fiche ---------- */
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

  // Pages enfants (v2.18) : projets réalisés avec l’IA, présentés sous Orchestration IA au format du catalogue.
  function enfantsDe(e) {
    var ids = (e.enfants || []).filter(function (id) { return parId[id]; });
    if (!ids.length) return null;
    return section("Projets réalisés avec l’IA", catalogue(ids.map(function (id) {
      var x = parId[id];
      return { id: "projet-" + id, visuel: vignette(x), titre: bulle(x), texte: x.resume, lien: "#/parcours/" + id, nom: x.titre };
    })));
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
    var c = parent.match(/^\/competence\/([\w-]+)$/), pf = parent.match(/^\/parcours\/([\w-]+)$/);
    var fiche = el("div", { class: "fiche fiche-" + e.type }, [
      retour(parent, pf && parId[pf[1]] ? parId[pf[1]].titre : /^\/parcours/.test(parent) ? "Parcours" : c && compId[c[1]] ? compId[c[1]].titre : RETOURS[parent] || "Retour"),
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
      enfantsDe(e),
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
    return [fiche];
  }

  /* ---------- Compétences ---------- */
  function outilsDe(c) {
    return D.outils.filter(function (f) { return f.competence === c.id; });
  }
  function logos(items) {
    return el("ul", { class: "logos outils-icones" }, items.map(function (p) {
      return el("li", null, [Icones.outil(p.nom, {logo: p.logo, description: p.role})]);
    }));
  }

  // Index : huit compétences, un seul lien d’approfondissement chacune (« Fiche complète »).
  function pageCompetences() {
    return [
      tetePage("Compétences", "reseau"),
      el("ul", { class: "co-catalogue" }, D.competences.map(function (c) {
        var outils = outilsDe(c).reduce(function (t, f) { return t.concat(f.items); }, []);
        if (c.id === "plateformes") outils = D.plateformes.items.slice(0, 6).map(function (p) { return p.nom; });
        if (outils.length > 10) outils = outils.slice(0, 10).concat("…");
        return el("li", { class: "co-competence", id: "competence-" + c.id }, [
          el("span", { class: "co-mini", "aria-hidden": "true" }, [Icones.symbole(Icones.competences[c.id])]),
          el("div", { class: "co-competence-nom" }, [
            el("h2", { text: c.titre }), el("p", { text: c.sousTitre }),
            outils.length ? Icones.liste(outils, true) : null
          ]),
          el("a", { class: "co-fiche-complete", href: "#/competence/" + c.id, "aria-label": "Fiche complète : " + c.titre, text: "Fiche complète" })
        ]);
      }))
    ];
  }

  // Fiche finale : expériences et formations liées sont lues sur place, sans renvoi vers d’autres fiches.
  // Associations : c.preuves et les fiches qui déclarent la compétence (e.competences). Aucun texte ajouté.
  function associeesA(c) {
    var ids = c.preuves.slice();
    D.parcours.forEach(function (e) { if ((e.competences || []).indexOf(c.id) !== -1 && ids.indexOf(e.id) === -1) ids.push(e.id); });
    return D.parcours.filter(function (e) { return ids.indexOf(e.id) !== -1; }).reverse();
  }
  function dossiersNiveau(sections, garder, niveau) {
    if (!sections || !sections.length) return null;
    return el("div", { class: "dossiers" }, sections.map(function (s) {
      var corps = el("div", { class: "dossier-contenu" });
      (s.paragraphes || []).forEach(function (t) { if (garder(t)) corps.appendChild(el("p", { text: t })); });
      var points = (s.points || []).filter(garder);
      if (points.length) corps.appendChild(liste(points));
      var photos = galerie(s.galerie); if (photos) corps.appendChild(photos);
      return el("details", { class: "dossier" }, [el("summary", null, [el(niveau, { text: s.titre })]), corps]);
    }));
  }
  function blocIntegre(e, garder) {
    var missions = (e.missions || []).filter(garder);
    var medias = (e.galerie || []).length + (e.sections || []).length;
    return el("article", { class: "co-integre " + e.type, id: "integre-" + e.id }, [
      el("h3", { text: e.titre }),
      el("p", { class: "co-integre-meta", text: e.periode + (e.lieu ? " · " + e.lieu : "") }),
      garder(e.resume) ? el("p", { text: e.resume }) : null,
      e.apportCourt && garder(e.apportCourt) ? el("p", { class: "fiche-apport", text: e.apportCourt }) : null,
      e.contexte && garder(e.contexte) ? el("p", { text: e.contexte }) : null,
      missions.length ? liste(missions) : null,
      e.site ? el("p", { class: "lien-externe" }, [el("a", { class: "bouton secondaire", href: e.site.url, target: "_blank", rel: "noopener", text: e.site.libelle + " ↗" })]) : null,
      e.outils && e.outils.length ? Icones.liste(e.outils) : null,
      medias ? el("details", { class: "co-integre-medias" }, [
        el("summary", { text: "Médias et compléments" }),
        galerie(e.galerie),
        dossiersNiveau(e.sections, garder, "h4")
      ]) : null
    ]);
  }

  function ficheCompetence(c) {
    var familles = outilsDe(c);
    var P = D.plateformes;
    var vu = Object.create(null);
    // Une même phrase n’apparaît qu’une fois dans la fiche.
    function garder(t) { if (!t || vu[t]) return false; vu[t] = true; return true; }
    garder(c.resume); c.detail.forEach(garder);
    var liees = associeesA(c);
    var experiences = liees.filter(function (e) { return e.type !== "formation"; });
    var formees = liees.filter(function (e) { return e.type === "formation"; });
    var acquis = [];
    liees.forEach(function (e) { (e.apports || []).forEach(function (a) { if (acquis.indexOf(a) === -1) acquis.push(a); }); });
    var blocsExp = experiences.map(function (e) { return blocIntegre(e, garder); });
    var blocsForm = formees.map(function (e) { return blocIntegre(e, garder); });
    return [
      retour("/competences", "Compétences"),
      el("header", { class: "fiche-tete competence" }, [
        el("h1", { id: "fiche-titre", tabindex: "-1", text: c.titre }),
        el("p", { class: "fiche-lieu", text: c.sousTitre }),
        el("p", { class: "fiche-resume", text: c.resume })
      ]),
      section("Savoir-faire", liste(c.detail, "puces fiche-liste")),
      blocsExp.length ? section(experiences.length > 1 ? "Expériences et projets" : "Expérience", el("div", { class: "co-integres" }, blocsExp)) : null,
      acquis.length ? section("Acquis développés", etiquettes(acquis)) : null,
      blocsForm.length ? section(formees.length > 1 ? "Formations associées" : "Formation associée", el("div", { class: "co-integres" }, blocsForm)) : null,
      familles.length ? section("Outils", el("div", { class: "outils" }, familles.map(function (f) {
        return el("div", { class: "famille" }, [el("h3", { text: f.famille }), Icones.liste(f.items)]);
      }))) : null,
      c.id === "creations-ia" || c.id === "ia" || c.id === "plateformes" ? el("section", { class: "fiche-section plateformes" }, [
        el("h2", { text: P.titre }), el("p", { class: "note", text: P.note }), logos(P.items)
      ]) : null,
      galerie(c.galerie)
    ];
  }

  /* ---------- Postes visés : pistes tirées du parcours, chacune avec ses preuves ---------- */
  // v2.18 : format Compétences, sans boutons de preuves.
  function pageMetiers() {
    var P = D.pistes;
    return [
      tetePage(P.titre, "compas"),
      catalogue(P.metiers.map(function (m) {
        return { id: "poste-" + m.id, cls: "poste", icone: C.symbole("compas"), titre: m.titre, texte: m.justification };
      }), "h2")
    ];
  }

  /* ---------- Intérêts ---------- */
  // v2.18 : format Compétences, sans photo ; « Fiche complète » ouvre la fiche principale de la passion.
  function pageInterets() {
    return [
      tetePage("Intérêts", "planete"),
      catalogue(D.interets.map(function (x) {
        var fiche = x.fiches.filter(function (id) { return parId[id]; })[0];
        return { id: "interet-" + x.id, cls: "interet", icone: C.symbole(C.interets[x.id] || "planete"), titre: x.nom, texte: x.texte,
          lien: fiche ? "#/parcours/" + fiche : null };
      }), "h2")
    ];
  }

  /* ---------- Réalisations (route conservée), mentions ---------- */
  // v2.18 : format Compétences ; la vignette de la fiche sert de pastille.
  function pageRealisations() {
    return [
      tetePage("Réalisations", "reseau"),
      el("ul", { class: "co-chiffres", "aria-label": "Repères" }, D.chiffres.map(function (c) { return el("li", null, [el("strong", { text: c.valeur }), el("span", { text: c.libelle })]); })),
      catalogue(D.realisations.filter(function (id) { return parId[id]; }).map(function (id) {
        var e = parId[id], v = vignette(e);
        return { id: "realisation-" + id, cls: e.type, visuel: v, icone: C.symbole("reseau"), titre: bulle(e), texte: e.apportCourt || e.resume, lien: "#/parcours/" + id, nom: e.titre };
      }), "h2")
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
      section("Contenu", el("p", { text: "Les informations présentées décrivent le parcours d’Alain Ferro. Les photographies personnelles ne peuvent pas être réutilisées sans accord. Les fonds de rubrique sont des illustrations générées. Les logos appartiennent à leurs éditeurs respectifs et ne figurent qu’à titre d’identification." }))
    ];
  }

  /* ---------- Routeur ---------- */
  var vue = $("vue"), accueil = $("accueil");
  var routeCourante = "/", listeOrigine = null, dernierDetail = null;

  function resoudre(h) {
    var m;
    if (h === "/" || h === "") return { rubrique: "presentation", titre: "" };
    if (h === "/metiers") return { rubrique: "metiers", titre: D.pistes.titre, rendu: pageMetiers(), liste: true };
    if (h === "/parcours") return { rubrique: "parcours", titre: "Parcours", rendu: pageParcours(null), liste: true };
    if ((m = h.match(/^\/parcours\/([\w-]+)$/))) {
      if (catSlug[m[1]]) return { rubrique: "parcours", titre: "Parcours · " + catSlug[m[1]].titre, rendu: pageParcours(catSlug[m[1]]), liste: true };
      var e = parId[m[1]];
      if (e) {
        var savoir = e.type === "formation";
        // Une formation ne revient jamais vers le chemin du parcours, qui ne la contient pas.
        var origineValide = listeOrigine && (savoir ? /^\/(savoir-formations|competence|realisations|interets|metiers|carte)/ : /^\/(parcours|competence|realisations|interets|metiers|carte)/).test(listeOrigine);
        // Une page enfant revient vers sa fiche parente, sauf depuis une autre rubrique.
        if (e.parent && parId[e.parent] && !(origineValide && !/^\/parcours/.test(listeOrigine))) origineValide = false;
        var parent = origineValide ? listeOrigine : e.parent && parId[e.parent] ? "/parcours/" + e.parent : savoir ? "/savoir-formations" : "/parcours";
        return { rubrique: savoir ? "savoir" : "parcours", titre: e.titre, rendu: ficheParcours(e, parent), detail: true, fiche: true };
      }
    }
    if (h === "/savoir-formations") return { rubrique: "savoir", titre: SAVOIR, rendu: pageSavoir(), liste: true };
    if (h === "/competences") return { rubrique: "competences", titre: "Compétences", rendu: pageCompetences(), liste: true };
    if ((m = h.match(/^\/competence\/([\w-]+)$/)) && compId[m[1]]) return { rubrique: "competences", titre: compId[m[1]].titre, rendu: ficheCompetence(compId[m[1]]), liste: true, detail: true };
    if (h === "/interets") return { rubrique: "interets", titre: "Intérêts", rendu: pageInterets(), liste: true };
    if (h === "/carte" && window.CarteLiens) return { rubrique: "carte", titre: "Carte des liens", rendu: [retour("/", "Présentation"), titreCache("Carte des liens"), window.CarteLiens.page(D)], liste: true };
    if (h === "/realisations") return { rubrique: "realisations", titre: "Réalisations marquantes", rendu: pageRealisations(), liste: true };
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
    var r = resoudre(h);
    if (!r) { history.replaceState(null, "", "#/"); h = "/"; r = resoudre(h); }
    var precedente = routeCourante, deFiche = /^\/parcours\/[\w-]+$/.test(precedente);
    routeCourante = h;
    marquerRubrique(r.rubrique);
    document.body.classList.toggle("sur-accueil", !r.rendu);
    document.body.classList.toggle("sur-metiers", h === "/metiers");
    document.body.classList.toggle("sur-parcours", /^\/parcours(?:\/(?:exp-pro|projets-perso|exp-forte))?$/.test(h));
    // Fond photographique très voilé des rubriques Parcours, Compétences, Formation et Intérêts.
    document.body.setAttribute("data-fond", r.rubrique || "");
    mesurerBandeau();

    if (!r.rendu) {
      vue.hidden = true; vue.textContent = ""; accueil.hidden = false;
      document.title = "Présentation · Alain Ferro";
      if (window.Lecture) window.Lecture.installer(accueil, ajusterTitres);
      ajusterTitres();
      listeOrigine = null;
      if (versContact) { $("entretien-bandeau").focus(); return; }
      window.scrollTo(0, 0);
      if (precedente !== "/") $("titre-nom").focus({ preventScroll: true });
      return;
    }
    vue.textContent = "";
    r.rendu.forEach(function (n) { if (n) vue.appendChild(n); });
    vue.appendChild(piedDePage());
    accueil.hidden = true; vue.hidden = false;
    document.title = r.titre + " · Alain Ferro";
    if (window.Lecture) window.Lecture.installer(vue, ajusterTitres);
    ajusterTitres();

    // De retour sur une liste : on replace le focus sur le lien visible de la fiche quittée.
    var lien = r.liste && dernierDetail ? Array.prototype.filter.call(vue.querySelectorAll("a[href='#" + dernierDetail + "']"), function (a) {
      return a.getClientRects().length > 0;
    })[0] : null;
    var filtre = filtreFocus ? vue.querySelector("[data-filtre='" + filtreFocus + "']") : null;
    filtreFocus = null;
    if (filtre) filtre.focus({ preventScroll: true });
    else if (lien) { lien.scrollIntoView({ block: "center" }); lien.focus({ preventScroll: true }); }
    else {
      // D’une fiche à l’autre, la page ne remonte que si le haut de la fiche est sorti de l’écran.
      var haut = vue.getBoundingClientRect().top + window.pageYOffset;
      if (!(r.fiche && deFiche) || window.pageYOffset > haut) window.scrollTo(0, r.fiche && deFiche ? haut : 0);
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
    revenir();
  });


  // Une ligne entière, sans ellipse : la taille de police suit l’espace réellement disponible.
  var TITRES_LIGNE = ".fiche-tete h1,.preuve-titre,.tuile-titre,.tuile-mot,.metier h2,.liens-competences a";
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

  // Hauteur réelle de l’en-tête (une ou deux lignes).
  function mesurerBandeau() { document.documentElement.style.setProperty("--bandeau", $("bandeau").offsetHeight + "px"); }
  window.addEventListener("resize", function () { mesurerBandeau(); ajusterTitres(); if (window.Lecture) window.Lecture.actualiser(); });
  mesurerBandeau();
  ajusterTitres();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusterTitres);
  // Le conteneur peut changer de largeur après un changement de grille ou de barre de défilement.
  if (window.ResizeObserver) {
    var observationTitres = new ResizeObserver(ajusterTitres);
    observationTitres.observe(vue); observationTitres.observe(accueil);
  }

  window.addEventListener("hashchange", router);
  router();
})();
