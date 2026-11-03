(function () {
  "use strict";
  var D = window.CV;
  var LIBELLES = { experience: "Expérience", formation: "Formation", personnel: "Parcours personnel" };
  var REALISATIONS = ["thermes-responsable", "negoce", "knockin", "skylivra", "outils-ia", "bateau"];
  var parId = {}, compId = {};
  D.parcours.forEach(function (e) { parId[e.id] = e; });
  D.competences.forEach(function (c) { compId[c.id] = c; });

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

  /* ---------- Accueil ---------- */
  var I = D.identite;
  $("accroche").textContent = I.accroche;
  $("promesse").textContent = I.promesse;
  $("lien-cv").setAttribute("href", I.cvPdf);
  // Jamais d’emplacement vide : sans portrait, la présentation passe sur une colonne.
  var portrait = $("portrait");
  function sansPortrait() { portrait.parentNode.hidden = true; $("haut").classList.add("sans-portrait"); }
  if (portrait.complete && portrait.naturalWidth === 0) sansPortrait();
  else portrait.addEventListener("error", sansPortrait);
  function coordonnees(ul) {
    ul.appendChild(el("li", null, [el("a", { href: "mailto:" + I.email, text: I.email })]));
    if (I.telephone) ul.appendChild(el("li", null, [el("a", { href: "tel:" + I.telephoneLien, text: I.telephone })]));
    ul.appendChild(el("li", { text: I.ville }));
    ul.appendChild(el("li", { text: "Permis B et véhicule" }));
  }
  coordonnees($("coordonnees"));
  coordonnees($("coordonnees-contact"));
  $("langues").textContent = I.langues + " · " + I.permis + ".";
  $("maj").textContent = "Mise à jour : " + D.mentions.maj;

  D.chiffres.forEach(function (c) {
    $("chiffres").appendChild(el("li", null, [el("strong", { text: c.valeur }), el("span", { text: c.libelle })]));
  });

  var ordre = D.parcours.slice().sort(function (a, b) { return b.tri - a.tri; });
  var frise = $("frise");
  ordre.forEach(function (e) {
    var lien = el("a", { href: "#/parcours/" + e.id, class: "etape-lien" }, [
      el("span", { class: "etape-date", text: e.dates }),
      el("span", { class: "etape-titre", text: e.titre }),
      e.lieu ? el("span", { class: "etape-lieu", text: e.lieu }) : null,
      el("span", { class: "etape-resume", text: e.resume }),
      el("span", { class: "visuellement-cache", text: " (" + LIBELLES[e.type] + ")" })
    ]);
    frise.appendChild(el("li", { class: "etape " + e.type, "data-type": e.type, id: "etape-" + e.id }, [lien]));
  });

  function filtrer(type) {
    var n = 0;
    Array.prototype.forEach.call(frise.children, function (li) {
      var ok = type === "tous" || li.getAttribute("data-type") === type;
      li.hidden = !ok; if (ok) n++;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-filtre]"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filtre") === type));
    });
    $("compte").textContent = n + (n > 1 ? " étapes affichées" : " étape affichée");
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-filtre]"), function (b) {
    b.addEventListener("click", function () { filtrer(b.getAttribute("data-filtre")); });
  });
  filtrer("tous");

  D.competences.forEach(function (c) {
    $("liste-competences").appendChild(el("li", { class: "carte" }, [
      el("a", { href: "#/competence/" + c.id }, [
        el("span", { class: "carte-titre", text: c.titre }),
        el("span", { class: "carte-sous", text: c.sousTitre }),
        el("span", { class: "carte-texte", text: c.resume }),
        el("span", { class: "carte-suite", text: "Voir le détail et les preuves" })
      ])
    ]));
  });

  D.outils.forEach(function (f) {
    $("outils").appendChild(el("div", { class: "famille" }, [
      el("h4", { text: f.famille }),
      el("ul", { class: "etiquettes" }, f.items.map(function (t) { return el("li", { text: t }); }))
    ]));
  });

  REALISATIONS.forEach(function (id) {
    var e = parId[id];
    $("liste-realisations").appendChild(el("li", { class: "carte " + e.type }, [
      el("a", { href: "#/parcours/" + e.id }, [
        el("span", { class: "carte-date", text: e.dates + " · " + LIBELLES[e.type] }),
        el("span", { class: "carte-titre", text: e.titre }),
        el("span", { class: "carte-texte", text: e.resume }),
        el("span", { class: "carte-suite", text: "Lire la fiche" })
      ])
    ]));
  });
  D.interets.forEach(function (t) { $("interets").appendChild(el("li", { text: t })); });

  /* ---------- Fiches ---------- */
  var vue = $("vue"), accueil = $("accueil");
  var origine = null; // lien de l’accueil qui a ouvert la fiche
  var retourEnCours = false;

  function retour() {
    return el("p", { class: "retour" }, [
      el("a", { href: "#parcours", text: "← Retour" }),
      el("span", { class: "astuce", text: " ou touche Échap" })
    ]);
  }

  function lienEtape(id) {
    var e = parId[id];
    return el("li", { class: "preuve " + e.type }, [
      el("a", { href: "#/parcours/" + id }, [
        el("span", { class: "etape-date", text: e.dates + " · " + LIBELLES[e.type] }),
        el("span", { class: "preuve-titre", text: e.titre })
      ])
    ]);
  }

  function section(titre, contenu, niveau) {
    return contenu ? el("section", { class: "fiche-section" }, [el(niveau || "h2", { text: titre }), contenu]) : null;
  }

  function galerie(photos, niveau) {
    if (!photos || !photos.length) return null;
    return section("En images", el("div", { class: "galerie" }, photos.map(function (p) {
      return el("figure", null, [
        el("a", { href: p.src, target: "_blank", rel: "noopener", class: p.presentation === "aurore" ? "visuel-aurore" : "", "aria-label": "Agrandir : " + p.alt }, [el("img", { src: p.src, alt: p.alt, loading: "lazy", decoding: "async" })]),
        p.legende ? el("figcaption", { text: p.legende }) : null
      ]);
    })), niveau);
  }

  function dossiers(sections) {
    if (!sections || !sections.length) return null;
    var groupe = el("div", { class: "dossiers" });
    sections.forEach(function (s) {
      var corps = el("div", { class: "dossier-contenu" });
      (s.paragraphes || []).forEach(function (t) { corps.appendChild(el("p", { text: t })); });
      if (s.points && s.points.length) corps.appendChild(liste(s.points));
      var photos = galerie(s.galerie, "h3"); if (photos) corps.appendChild(photos);
      var bloc = el("details", { class: "dossier" }, [
        el("summary", null, [el("h2", { text: s.titre })]), corps
      ]);
      if (s.ouvert) bloc.setAttribute("open", "");
      groupe.appendChild(bloc);
    });
    return groupe;
  }

  function voisins(e) {
    var i = ordre.indexOf(e), nav = el("nav", { class: "voisins", "aria-label": "Étapes voisines" });
    var plusRecent = ordre[i - 1], plusAncien = ordre[i + 1];
    if (plusAncien) nav.appendChild(el("a", { href: "#/parcours/" + plusAncien.id, rel: "prev" }, [el("span", { text: "Étape précédente" }), el("strong", { text: plusAncien.titre })]));
    if (plusRecent) nav.appendChild(el("a", { href: "#/parcours/" + plusRecent.id, rel: "next", class: "suivant" }, [el("span", { text: "Étape suivante" }), el("strong", { text: plusRecent.titre })]));
    return nav;
  }

  function ficheParcours(e) {
    var comps = (e.competences || []).filter(function (id) { return compId[id]; });
    return [
      retour(),
      el("header", { class: "fiche-tete " + e.type }, [
        el("p", { class: "fiche-type", text: LIBELLES[e.type] + " · " + e.dates }),
        el("h1", { id: "fiche-titre", tabindex: "-1", text: e.titre }),
        e.lieu ? el("p", { class: "fiche-lieu", text: e.lieu }) : null,
        el("p", { class: "fiche-resume", text: e.resume })
      ]),
      section("Contexte", el("p", { text: e.contexte })),
      section(e.type === "formation" ? "Contenu" : "Missions et réalisations", liste(e.missions)),
      dossiers(e.sections),
      e.outils ? section("Outils", el("ul", { class: "etiquettes" }, e.outils.map(function (t) { return el("li", { text: t }); }))) : null,
      section("Compétences développées", el("ul", { class: "etiquettes" }, e.apports.map(function (t) { return el("li", { text: t }); }))),
      comps.length ? section("Compétences du CV liées", el("ul", { class: "liens-competences" }, comps.map(function (id) {
        return el("li", null, [el("a", { href: "#/competence/" + id, text: compId[id].titre })]);
      }))) : null,
      section("Ce que cela apporte à un nouveau poste", el("p", { class: "transfert", text: e.transfert })),
      galerie(e.galerie),
      voisins(e)
    ];
  }

  function ficheCompetence(c) {
    return [
      retour(),
      el("header", { class: "fiche-tete competence" }, [
        el("p", { class: "fiche-type", text: "Compétence" }),
        el("h1", { id: "fiche-titre", tabindex: "-1", text: c.titre }),
        el("p", { class: "fiche-lieu", text: c.sousTitre }),
        el("p", { class: "fiche-resume", text: c.resume })
      ]),
      section("En pratique", liste(c.detail)),
      section("Où elle a été exercée", el("ul", { class: "preuves" }, c.preuves.filter(function (id) { return parId[id]; }).map(lienEtape))),
      galerie(c.galerie)
    ];
  }

  function ficheMentions() {
    var M = D.mentions;
    return [
      retour(),
      el("header", { class: "fiche-tete" }, [el("h1", { id: "fiche-titre", tabindex: "-1", text: "Mentions légales et confidentialité" })]),
      section("Éditeur", el("p", { text: M.editeur })),
      section("Hébergement", el("p", { text: M.hebergeur })),
      section("Données personnelles", el("p", { text: M.donnees })),
      section("Contenu", el("p", { text: "Les informations présentées décrivent le parcours d’Alain Ferro. Les photos publiées sont personnelles ; elles ne peuvent pas être réutilisées sans accord." }))
    ];
  }

  function afficherAccueil(h) {
    vue.hidden = true; vue.textContent = "";
    accueil.hidden = false;
    document.title = "Alain Ferro · Gestion, coordination et projets numériques";
    // Retour au parcours : on revient sur le lien qui avait ouvert la fiche.
    var retrouveOrigine = (retourEnCours || !h || h === "parcours") && origine && document.contains(origine);
    retourEnCours = false;
    var cible = retrouveOrigine ? origine : document.getElementById(h || "parcours");
    origine = null;
    if (cible) { cible.scrollIntoView({ block: retrouveOrigine ? "center" : "start" }); cible.focus({ preventScroll: true }); }
  }

  function router() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    var m = h.match(/^\/(parcours|competence)\/([\w-]+)$/);
    var contenu = null, titre = "";
    if (m && m[1] === "parcours" && parId[m[2]]) { contenu = ficheParcours(parId[m[2]]); titre = parId[m[2]].titre; }
    else if (m && m[1] === "competence" && compId[m[2]]) { contenu = ficheCompetence(compId[m[2]]); titre = compId[m[2]].titre; }
    else if (h === "/mentions") { contenu = ficheMentions(); titre = "Mentions légales"; }

    if (!contenu) {
      if (!vue.hidden) afficherAccueil(h.charAt(0) === "/" ? "" : h);
      return;
    }
    retourEnCours = false;
    vue.textContent = "";
    contenu.forEach(function (n) { if (n) vue.appendChild(n); });
    accueil.hidden = true; vue.hidden = false;
    document.title = titre + " · Alain Ferro";
    window.scrollTo(0, 0);
    var t = $("fiche-titre"); if (t) t.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (ev) {
    if (ev.target.closest && ev.target.closest(".evitement")) {
      ev.preventDefault();
      var cible = vue.hidden ? document.getElementById("contenu") : document.getElementById("fiche-titre");
      cible.focus(); cible.scrollIntoView({ block: "start" });
      return;
    }
    if (!vue.hidden && ev.target.closest && ev.target.closest(".retour a")) {
      ev.preventDefault(); revenir(); return;
    }
    var a = ev.target.closest && ev.target.closest("a[href^='#/']");
    if (a && vue.hidden) origine = a;
  });

  function revenir() {
    if (origine && document.contains(origine)) { retourEnCours = true; history.back(); }
    else {
      history.replaceState(null, "", "#parcours");
      afficherAccueil("parcours");
    }
  }

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && !vue.hidden) { ev.preventDefault(); revenir(); }
  });

  window.addEventListener("hashchange", router);
  router();
})();
