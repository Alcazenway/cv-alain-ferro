(function () {
  "use strict";
  var D = window.CV;
  var LIBELLES = { experience: "Exp pro", formation: "Savoir", personnel: "Projets perso" };
  var CATEGORIES = [
    { slug: "exp-pro", type: "experience", titre: "Exp pro" },
    { slug: "savoir", type: "formation", titre: "Savoir" },
    { slug: "projets-perso", type: "personnel", titre: "Projets perso" }
  ];
  var catSlug = Object.create(null), catType = Object.create(null);
  CATEGORIES.forEach(function (c) { catSlug[c.slug] = c; catType[c.type] = c; });
  var ANCIENNES = { haut: "/", parcours: "/parcours", competences: "/competences", realisations: "/realisations", contact: "/contact", interets: "/interets" };
  var ALIAS = D.alias || {};
  var parId = Object.create(null), compId = Object.create(null);
  D.parcours.forEach(function (e) { parId[e.id] = e; });
  D.competences.forEach(function (c) { compId[c.id] = c; });
  var ordre = D.parcours; // du plus ancien au plus récent, même ordre que la frise du PDF
  var REPERES = {
    debut: { texte: "Naissance", annee: "1982", image: "assets/repere-naissance.png" },
    fin: { texte: "Aujourd’hui", annee: "2026", image: "assets/repere-aujourdhui.png" }
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
  function bulle(e) { return e.bulle || [e.titreCourt || e.titre, ""]; }
  // Première image fixe d’une fiche (version statique d’une animation), pour les vignettes.
  function vignette(e) {
    var toutes = (e.galerie || []).concat.apply(e.galerie || [], (e.sections || []).map(function (s) { return s.galerie || []; }));
    for (var i = 0; i < toutes.length; i++) if (toutes[i].src) return { src: toutes[i].statique || toutes[i].src, alt: toutes[i].alt };
    return null;
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
  $("recherche").textContent = I.recherche;
  $("accroche").textContent = I.accroche;
  $("appui").textContent = I.appui;
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

  D.chiffres.forEach(function (c) {
    $("chiffres").appendChild(el("li", null, [el("strong", { text: c.valeur }), el("span", { text: c.libelle })]));
  });

  var entrees = [
    { href: "#/parcours", titre: "Parcours", texte: ordre.length + " étapes, de l’enfance à aujourd’hui" },
    { href: "#/competences", titre: "Compétences", texte: D.competences.length + " compétences, outils et preuves" },
    { href: "#/interets", titre: "Intérêts", texte: D.interets.length + " centres d’intérêt reliés au parcours" }
  ];
  entrees.forEach(function (r, i) {
    $("entrees").appendChild(el("li", null, [el("a", { href: r.href, class: "entree" }, [
      el("span", { class: "entree-num", text: "0" + (i + 1), "aria-hidden": "true" }),
      el("span", { class: "entree-titre", text: r.titre }),
      el("span", { class: "entree-texte", text: r.texte })
    ])]));
  });

  function tuileRealisation(id) {
    var e = parId[id], v = vignette(e);
    return el("li", { class: "tuile " + e.type }, [el("a", { href: "#/parcours/" + e.id }, [
      v ? image(v, "tuile-image") : el("span", { class: "tuile-mot", text: bulle(e)[0], "aria-hidden": "true" }),
      el("span", { class: "tuile-type" }, [forme(e.type), LIBELLES[e.type]]),
      el("span", { class: "tuile-titre", text: e.titre })
    ])]);
  }
  D.realisations.filter(function (id) { return parId[id]; }).forEach(function (id) { $("selection").appendChild(tuileRealisation(id)); });

  $("titre-pistes").textContent = D.pistes.titre;
  $("pistes-texte").textContent = D.pistes.texte;
  D.pistes.metiers.forEach(function (m) { $("metiers").appendChild(el("li", { text: m })); });
  $("maj").textContent = "Version 2.0 · mise à jour : " + D.mentions.maj;

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
  function section(titre, contenu, niveau) {
    return contenu ? el("section", { class: "fiche-section" }, [el(niveau || "h2", { text: titre }), contenu]) : null;
  }
  function borne(cle) {
    var r = REPERES[cle];
    var img = el("img", { src: r.image, alt: "", width: "32", height: "32", class: "borne-image", decoding: "async" });
    var p = el("p", { class: "borne " + cle }, [img, el("span", { class: "borne-texte" }, [el("strong", { text: r.texte }), " · " + r.annee])]);
    // Pictogramme absent : la borne garde son texte et un repère graphique simple.
    img.addEventListener("error", function () { img.remove(); p.classList.add("sans-image"); });
    return p;
  }
  function legende() {
    return el("ul", { class: "legende", "aria-label": "Légende" }, CATEGORIES.map(function (c) {
      return el("li", null, [forme(c.type), c.titre]);
    }));
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
  function galerie(photos, niveau) {
    if (!photos || !photos.length) return null;
    return section("En images", el("div", { class: "galerie" }, photos.map(media)), niveau);
  }

  /* ---------- Parcours : frise ---------- */
  function etapeFrise(e) {
    var v = vignette(e), b = bulle(e);
    return el("li", { class: "etape " + e.type }, [
      el("a", { href: "#/parcours/" + e.id, class: "etape-lien" }, [
        el("span", { class: "etape-texte" }, [
          el("span", { class: "etape-type" }, [forme(e.type), LIBELLES[e.type]]),
          el("span", { class: "etape-titre", text: b[0] }),
          b[1] ? el("span", { class: "etape-sous", text: b[1] }) : null
        ]),
        v ? image(v, "etape-image") : null
      ])
    ]);
  }

  function pageParcours(cat) {
    var etapes = cat ? ordre.filter(function (e) { return e.type === cat.type; }) : ordre;
    var onglets = el("nav", { class: "onglets", "aria-label": "Catégories du parcours" }, [
      el("ul", null, [{ slug: "", titre: "Tout" }].concat(CATEGORIES).map(function (c) {
        var a = el("a", { href: "#/parcours" + (c.slug ? "/" + c.slug : "") }, [c.type ? forme(c.type) : null, c.titre]);
        if ((cat && cat.slug === c.slug) || (!cat && !c.slug)) a.setAttribute("aria-current", "page");
        return el("li", null, [a]);
      }))
    ]);
    return [
      retour("/", "Accueil"),
      entete(cat ? "Parcours · " + cat.titre : "Parcours"),
      onglets,
      el("div", { class: "frise-cadre" }, [
        borne("debut"),
        el("ol", { class: "frise" }, etapes.map(etapeFrise)),
        borne("fin")
      ]),
      el("p", { class: "suite" }, [el("a", { href: "#/realisations", text: "Réalisations marquantes →" })])
    ];
  }

  /* ---------- Parcours : sommaire et fiche ---------- */
  var ETAT_SOMMAIRE = { defilement: 0 };

  function sommaire(actif) {
    var rang = ordre.indexOf(actif) + 1;
    var corps = el("div", { class: "sommaire-corps", id: "sommaire-corps" }, [
      borne("debut"),
      el("ol", { class: "sommaire-liste" }, ordre.map(function (e) {
        var b = bulle(e);
        var a = el("a", { href: "#/parcours/" + e.id }, [
          forme(e.type),
          el("span", { class: "sommaire-texte" }, [
            el("span", { class: "sommaire-titre", text: b[0] }),
            b[1] ? el("span", { class: "sommaire-sous", text: b[1] }) : null
          ])
        ]);
        a.setAttribute("aria-label", b[0] + (b[1] ? ", " + b[1] : "") + " (" + LIBELLES[e.type] + ")");
        if (e === actif) a.setAttribute("aria-current", "page");
        return el("li", { class: e.type }, [a]);
      })),
      borne("fin")
    ]);
    var bascule = el("button", { type: "button", class: "sommaire-bascule", "aria-expanded": "false", "aria-controls": "sommaire-corps" }, [
      el("span", { class: "sommaire-rang", text: rang + " / " + ordre.length }),
      el("span", { class: "sommaire-actif", text: bulle(actif)[0] }),
      el("span", { class: "sommaire-ouvrir", text: "Sommaire" })
    ]);
    bascule.addEventListener("click", function () { basculerSommaire(); });
    return el("nav", { class: "sommaire", id: "sommaire", "aria-label": "Sommaire du parcours" }, [
      el("p", { class: "sommaire-tete" }, [el("a", { href: "#/parcours", text: "Parcours" }), el("span", { text: " · " + ordre.length + " étapes" })]),
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

  function lienEtape(id) {
    var e = parId[id];
    return el("li", { class: "preuve " + e.type }, [
      el("a", { href: "#/parcours/" + id }, [
        el("span", { class: "etape-type" }, [forme(e.type), LIBELLES[e.type]]),
        el("span", { class: "preuve-titre", text: e.titre })
      ])
    ]);
  }

  function dossiers(sections) {
    if (!sections || !sections.length) return null;
    var groupe = el("div", { class: "dossiers" });
    sections.forEach(function (s) {
      var corps = el("div", { class: "dossier-contenu" });
      (s.paragraphes || []).forEach(function (t) { corps.appendChild(el("p", { text: t })); });
      if (s.points && s.points.length) corps.appendChild(liste(s.points));
      var photos = galerie(s.galerie, "h3"); if (photos) corps.appendChild(photos);
      var bloc = el("details", { class: "dossier" }, [el("summary", null, [el("h2", { text: s.titre })]), corps]);
      if (s.ouvert) bloc.setAttribute("open", "");
      groupe.appendChild(bloc);
    });
    return groupe;
  }

  function interetsDe(e) {
    return D.interets.filter(function (x) { return x.fiches.indexOf(e.id) !== -1; });
  }

  function ficheParcours(e, parent) {
    var comps = (e.competences || []).filter(function (id) { return compId[id]; });
    var gouts = interetsDe(e);
    var fiche = el("div", { class: "fiche fiche-" + e.type }, [
      retour(parent, /^\/parcours/.test(parent) ? "Parcours" : "Retour"),
      el("header", { class: "fiche-tete " + e.type }, [
        el("p", { class: "fiche-type" }, [forme(e.type), LIBELLES[e.type]]),
        el("h1", { id: "fiche-titre", tabindex: "-1", text: e.titre }),
        e.lieu ? el("p", { class: "fiche-lieu", text: e.lieu }) : null,
        el("p", { class: "fiche-resume", text: e.resume })
      ]),
      e.contexte ? el("p", { class: "fiche-intro", text: e.contexte }) : null,
      e.site ? el("p", { class: "lien-externe" }, [el("a", { class: "bouton secondaire", href: e.site.url, target: "_blank", rel: "noopener", text: e.site.libelle + " ↗" })]) : null,
      e.missions && e.missions.length ? liste(e.missions, "puces fiche-liste") : null,
      dossiers(e.sections),
      e.outils ? section("Outils", etiquettes(e.outils)) : null,
      e.apports && e.apports.length ? section(e.generale ? "Thèmes" : "Acquis", etiquettes(e.apports)) : null,
      comps.length ? section("Compétences liées", el("ul", { class: "liens-competences" }, comps.map(function (id) {
        return el("li", null, [el("a", { href: "#/competence/" + id, text: compId[id].titre })]);
      }))) : null,
      e.transfert ? section("Apport au poste", el("p", { class: "transfert", text: e.transfert })) : null,
      gouts.length ? section("Intérêts liés", el("ul", { class: "liens-competences" }, gouts.map(function (x) {
        return el("li", null, [el("a", { href: "#/interets", text: x.nom })]);
      }))) : null,
      galerie(e.galerie)
    ]);
    return [el("div", { class: "parcours-mise" }, [sommaire(e), fiche])];
  }

  /* ---------- Compétences ---------- */
  function outilsDe(c) {
    return D.outils.filter(function (f) { return f.competence === c.id; });
  }
  function logos(items) {
    return el("ul", { class: "logos" }, items.map(function (p) {
      return el("li", null, [el("a", { href: "#/parcours/" + p.fiche }, [
        el("img", { src: p.logo, alt: "", width: "40", height: "40", loading: "lazy", decoding: "async" }),
        el("span", { class: "logo-nom", text: p.nom }),
        el("span", { class: "logo-role", text: p.role })
      ])]);
    }));
  }

  function pageCompetences() {
    return [
      retour("/", "Accueil"),
      entete("Compétences"),
      el("ol", { class: "competences-liste" }, D.competences.map(function (c, i) {
        var outils = outilsDe(c).reduce(function (t, f) { return t.concat(f.items); }, []);
        if (c.id === "plateformes") outils = D.plateformes.items.slice(0, 6).map(function (p) { return p.nom; });
        return el("li", null, [el("a", { href: "#/competence/" + c.id, class: "competence-ligne" }, [
          el("span", { class: "competence-num", text: (i < 9 ? "0" : "") + (i + 1), "aria-hidden": "true" }),
          el("span", { class: "competence-corps" }, [
            el("span", { class: "competence-titre", text: c.titre }),
            el("span", { class: "competence-sous", text: c.sousTitre }),
            el("span", { class: "competence-texte", text: c.resume }),
            outils.length ? el("span", { class: "competence-outils", text: outils.join(" · ") }) : null
          ])
        ])]);
      })),
      section("Langues et mobilité", el("p", { text: I.langues + " · " + I.permis + "." }))
    ];
  }

  function ficheCompetence(c) {
    var familles = outilsDe(c);
    var P = D.plateformes;
    return [
      retour("/competences", "Compétences"),
      el("header", { class: "fiche-tete competence" }, [
        el("p", { class: "fiche-type", text: "Compétence" }),
        el("h1", { id: "fiche-titre", tabindex: "-1", text: c.titre }),
        el("p", { class: "fiche-lieu", text: c.sousTitre }),
        el("p", { class: "fiche-resume", text: c.resume })
      ]),
      section("En pratique", liste(c.detail)),
      familles.length ? section("Outils", el("div", { class: "outils" }, familles.map(function (f) {
        return el("div", { class: "famille" }, [el("h3", { text: f.famille }), etiquettes(f.items)]);
      }))) : null,
      c.id === "ia" || c.id === "plateformes" ? el("section", { class: "fiche-section plateformes" }, [
        el("h2", { text: P.titre }), el("p", { class: "note", text: P.note }), logos(P.items)
      ]) : null,
      section("Preuves dans le parcours", el("ul", { class: "preuves" }, c.preuves.filter(function (id) { return parId[id]; }).map(lienEtape))),
      galerie(c.galerie)
    ];
  }

  /* ---------- Intérêts ---------- */
  function pageInterets() {
    return [
      retour("/", "Accueil"),
      entete("Intérêts"),
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
      retour("/parcours", "Parcours"),
      entete("Réalisations"),
      el("ul", { class: "tuiles" }, D.realisations.filter(function (id) { return parId[id]; }).map(tuileRealisation)),
      el("p", { class: "suite" }, [el("a", { href: "#/interets", text: "Centres d’intérêt →" })])
    ];
  }

  function pageMentions() {
    var M = D.mentions;
    return [
      retour("/", "Accueil"),
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
    if (h === "/" || h === "") return { rubrique: "", titre: "" };
    if (h === "/parcours") return { rubrique: "parcours", titre: "Parcours", rendu: pageParcours(null), liste: true };
    if ((m = h.match(/^\/parcours\/([\w-]+)$/))) {
      if (catSlug[m[1]]) return { rubrique: "parcours", titre: "Parcours · " + catSlug[m[1]].titre, rendu: pageParcours(catSlug[m[1]]), liste: true };
      var e = parId[m[1]];
      if (e) {
        var parent = listeOrigine && /^\/(parcours|competence|realisations|interets)/.test(listeOrigine) ? listeOrigine : "/parcours";
        return { rubrique: "parcours", titre: e.titre, rendu: ficheParcours(e, parent), detail: true, fiche: true };
      }
    }
    if (h === "/competences") return { rubrique: "competences", titre: "Compétences", rendu: pageCompetences(), liste: true };
    if ((m = h.match(/^\/competence\/([\w-]+)$/)) && compId[m[1]]) return { rubrique: "competences", titre: compId[m[1]].titre, rendu: ficheCompetence(compId[m[1]]), liste: true, detail: true };
    if (h === "/interets") return { rubrique: "interets", titre: "Intérêts", rendu: pageInterets(), liste: true };
    if (h === "/realisations") return { rubrique: "parcours", titre: "Réalisations", rendu: pageRealisations(), liste: true };
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
    if ((m = h.match(/^\/parcours\/([\w-]+)$/)) && Object.prototype.hasOwnProperty.call(ALIAS, m[1])) {
      h = "/parcours/" + ALIAS[m[1]]; history.replaceState(null, "", "#" + h);
    }
    var r = resoudre(h);
    if (!r) { history.replaceState(null, "", "#/"); h = "/"; r = resoudre(h); }
    var precedente = routeCourante, deFiche = /^\/parcours\/[\w-]+$/.test(precedente) && $("sommaire-corps");
    if (deFiche) ETAT_SOMMAIRE.defilement = $("sommaire-corps").scrollTop;
    routeCourante = h;
    marquerRubrique(r.rubrique);
    document.body.classList.toggle("sur-accueil", !r.rendu);

    if (!r.rendu) {
      vue.hidden = true; vue.textContent = ""; accueil.hidden = false;
      document.title = "Alain Ferro · Gestion et coordination administrative";
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

    // De retour sur une liste : on replace le focus sur le lien de la fiche quittée.
    var lien = r.liste && dernierDetail ? vue.querySelector("a[href='#" + dernierDetail + "']") : null;
    if (lien) { lien.scrollIntoView({ block: "center" }); lien.focus({ preventScroll: true }); }
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

  // Hauteur réelle de l’en-tête (une ou deux lignes) pour placer le sommaire collant.
  function mesurerBandeau() { document.documentElement.style.setProperty("--bandeau", $("bandeau").offsetHeight + "px"); }
  window.addEventListener("resize", mesurerBandeau);
  mesurerBandeau();

  window.addEventListener("hashchange", router);
  router();
})();
