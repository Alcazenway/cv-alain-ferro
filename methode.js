/* Page Méthode (v2.24) : graphe façon Obsidian construit comme le PDF. Alain au centre, actions confiées aux IA,
   assistants, outils et applications en îlots ; bulles déplaçables, liens au survol, filtre par application.
   Les nœuds et liens sont tirés des données (methode.actions, outils des fiches, plateformes, familles d’outils). */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  // Pictogrammes au trait des actions (viewBox 24).
  var PICTOS = {
    cible: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    plume: '<path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3M4 20h16"/>',
    blocs: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/>',
    aiguillage: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 12h10M7 11l10-5M7 13l10 5"/>',
    oeil: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    coche: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    branche: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 4-6 3-12 7"/>'
  };
  var ASSISTANTS = ["ChatGPT", "Codex", "Claude", "Claude Code", "Orca"];
  // Îlots, comme le PDF : position relative de leur centre (x, y en fraction de la zone) et rayon des bulles.
  var GROUPES = {
    hub: { titre: "", ancre: [0.5, 0.5], r: 60 },
    action: { titre: "Ce que je demande aux IA", ancre: [0.5, 0.5], r: 30 },
    assistant: { titre: "Assistants IA", ancre: [0.14, 0.22], r: 27 },
    dev: { titre: "Développement et services", ancre: [0.86, 0.24], r: 20 },
    creation: { titre: "Création et simulation", ancre: [0.86, 0.8], r: 21 },
    projet: { titre: "Applications créées", ancre: [0.14, 0.78], r: 34 }
  };

  function svg(tag, attrs, enfants) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function html(tag, attrs, enfants) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "text") n.textContent = attrs[k]; else if (k === "class") n.className = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function premiereImage(e) {
    var toutes = (e.galerie || []).concat.apply(e.galerie || [], (e.sections || []).map(function (s) { return s.galerie || []; }));
    for (var i = 0; i < toutes.length; i++) if (toutes[i].src) return toutes[i].statique || toutes[i].src;
    return null;
  }
  // Nom court d’un outil composé (« Tauri / Rust » → « Tauri ») et ses logos.
  var COURTS = { "Git / GitHub": null, "HTML / CSS / JavaScript": "HTML / CSS / JS", "Tauri / Rust": "Tauri", "C++ / WebAssembly": "C++ / Wasm",
    "SDK MSFS 2020 / SimConnect": "SDK MSFS", "SDK MSFS / SimConnect": "SDK MSFS", "GitHub et GitHub Pages": "GitHub", "Orca (plusieurs assistants en parallèle)": "Orca",
    "Suno (musique)": "Suno", "Génération d’images par IA": "Images IA", "Microsoft Flight Simulator": "Flight Simulator", "Visual Studio Code": "VS Code" };
  function noms(nom) { return nom === "Git / GitHub" ? ["Git", "GitHub"] : [COURTS[nom] || nom]; }

  /* ---------- Construction du graphe depuis les données ---------- */
  function construire(D) {
    var M = D.methode, parId = {}, noeuds = [], index = {}, liens = [], cles = {};
    D.parcours.forEach(function (e) { parId[e.id] = e; });
    function ajouter(n) { if (!index[n.id]) { index[n.id] = n; noeuds.push(n); } return index[n.id]; }
    function relier(a, b) { var k = a < b ? a + "|" + b : b + "|" + a; if (a !== b && index[a] && index[b] && !cles[k]) { cles[k] = 1; liens.push({ a: index[a], b: index[b] }); } }
    function logo(nom) { var s = window.Icones && window.Icones.sources ? window.Icones.sources(nom) : []; return s[0] || null; }
    function outil(nomBrut, groupe) {
      return noms(nomBrut).map(function (nom) {
        if (ASSISTANTS.indexOf(nom) !== -1) groupe = "assistant";
        var p = (D.plateformes.items || []).filter(function (x) { return x.nom === nom; })[0];
        return ajouter({ id: "o-" + nom, groupe: groupe, titre: nom, image: logo(nomBrut) || logo(nom), texte: p ? p.role : "" }).id;
      });
    }
    ajouter({ id: "hub", groupe: "hub", titre: "Alain FERRO", sous: "Orchestrateur", image: "assets/portrait-pdf-360.png",
      texte: "Je conçois les applications, je confie la réalisation aux assistants IA et je contrôle chaque livrable." });
    var projets = (parId["outils-ia"].enfants || []).filter(function (id) { return parId[id]; });
    projets.forEach(function (id) {
      var e = parId[id];
      ajouter({ id: "p-" + id, groupe: "projet", projet: id, titre: (e.bulle && e.bulle[0]) || e.titreCourt || e.titre, image: premiereImage(e), texte: e.resume, lien: "#/parcours/" + id });
      relier("hub", "p-" + id);
    });
    ASSISTANTS.forEach(function (n) { outil(n, "assistant"); });
    M.actions.forEach(function (a) {
      ajouter({ id: "a-" + a.id, groupe: "action", titre: a.titre, picto: a.icone, texte: a.texte });
      relier("hub", "a-" + a.id);
      (a.assistants || []).forEach(function (n) { relier("a-" + a.id, "o-" + n); });
      (a.outils || []).forEach(function (n) { outil(n, "dev").forEach(function (o) { relier("a-" + a.id, o); }); });
      (a.projets || []).forEach(function (p) { relier("a-" + a.id, "p-" + p); });
    });
    // Outils déclarés par chaque application.
    projets.forEach(function (id) {
      (parId[id].outils || []).forEach(function (n) { if (n !== "Assistants IA") outil(n, "dev").forEach(function (o) { relier(o, "p-" + id); }); });
    });
    // Plateformes : rattachées à leur application, ou à l’orchestrateur pour les outils de travail communs.
    (D.plateformes.items || []).forEach(function (p) {
      outil(p.nom, "dev").forEach(function (o) { relier(o, index["p-" + p.fiche] ? "p-" + p.fiche : "hub"); });
    });
    // Création et simulation : outils des créations SkyLivra (livrées, clips, médias).
    (D.outils || []).filter(function (f) { return f.competence === "creations-ia"; }).forEach(function (f) {
      var groupe = /Création/.test(f.famille) ? "creation" : "dev";
      f.items.forEach(function (n) {
        if (n === "SPAD.neXt") return; // matériel de simulation personnel, pas une création SkyLivra
        outil(n, groupe).forEach(function (o) {
          if (groupe === "creation" || /Suno|Images IA/.test(index[o].titre)) { index[o].groupe = "creation"; relier(o, "p-skylivra"); }
          else if (!liens.some(function (l) { return l.a.id === o || l.b.id === o; })) relier(o, "hub");
        });
      });
    });
    return { noeuds: noeuds, liens: liens, projets: projets };
  }

  /* ---------- Page ---------- */
  function page(D, aides) {
    var G = construire(D), M = D.methode;
    var cadre = html("div", { class: "co-graphe" });
    // Écran étroit : îlots empilés en hauteur pour garder des bulles lisibles.
    var etroit = window.innerWidth < 700, largeur = etroit ? 760 : 1200, hauteur = etroit ? 1240 : 800;
    var zone = svg("svg", { class: "co-graphe-svg", viewBox: "0 0 " + largeur + " " + hauteur, role: "group", "aria-label": "Graphe de la méthode d’orchestration" });
    var calqueIlots = svg("g", { class: "co-ilots" }), calqueLiens = svg("g", { class: "co-graphe-liens" }), calqueNoeuds = svg("g");
    zone.appendChild(svg("defs")); zone.appendChild(calqueIlots); zone.appendChild(calqueLiens); zone.appendChild(calqueNoeuds);
    var defs = zone.firstChild;
    cadre.appendChild(zone);

    // Îlots pâles nommés, comme les grandes rubriques du PDF.
    var ilots = {};
    ["assistant", "dev", "creation", "projet"].forEach(function (g) {
      ilots[g] = { cercle: svg("circle", { class: "co-ilot " + g }), titre: svg("text", { class: "co-ilot-titre", "text-anchor": "middle" }, [GROUPES[g].titre.toUpperCase()]) };
      calqueIlots.appendChild(ilots[g].cercle); calqueIlots.appendChild(ilots[g].titre);
    });

    // Places d’origine, comme les îlots du PDF : une bulle au centre de l’îlot puis des couronnes successives ;
    // les actions en couronne autour d’Alain. Chaque bulle revient vers sa place, sauf si on la pose ailleurs.
    function couronnes(ns, cx, cy, pas0) {
      var i = 0, anneau = 0;
      while (i < ns.length) {
        var places = anneau === 0 ? 1 : Math.min(anneau * 6, ns.length - i), rayon = anneau * pas0;
        for (var k = 0; k < places && i < ns.length; k++, i++) {
          var ang = -Math.PI / 2 + (k + (anneau % 2) * 0.5) * 2 * Math.PI / places;
          ns[i].hx = cx + rayon * Math.cos(ang); ns[i].hy = cy + rayon * 0.92 * Math.sin(ang);
        }
        anneau++;
      }
    }
    var parGroupe = {};
    G.noeuds.forEach(function (n) { n.r = GROUPES[n.groupe].r; n.vx = n.vy = 0; (parGroupe[n.groupe] = parGroupe[n.groupe] || []).push(n); });
    var P = etroit
      ? { hub: [380, 600], anneau: [235, 175], assistant: [170, 150, 82], dev: [540, 200, 74], projet: [200, 1030, 112], creation: [560, 1040, 70] }
      : { hub: [600, 400], anneau: [215, 185], assistant: [165, 205, 82], dev: [1000, 250, 74], projet: [205, 565, 112], creation: [1020, 645, 70] };
    var hub = parGroupe.hub[0]; hub.hx = P.hub[0]; hub.hy = P.hub[1]; hub.fixe = true;
    parGroupe.action.forEach(function (n, k, t) { var ang = -Math.PI / 2 + k * 2 * Math.PI / t.length; n.hx = P.hub[0] + P.anneau[0] * Math.cos(ang); n.hy = P.hub[1] + P.anneau[1] * Math.sin(ang); });
    ["assistant", "projet", "dev", "creation"].forEach(function (g) { couronnes(parGroupe[g] || [], P[g][0], P[g][1], P[g][2]); });
    G.noeuds.forEach(function (n) { n.x = n.hx; n.y = n.hy; });

    G.liens.forEach(function (l) {
      l.el = svg("line", { class: "co-graphe-lien " + (l.a.groupe === "hub" || l.b.groupe === "hub" ? "hub" : l.a.groupe === "action" || l.b.groupe === "action" ? "action" : "outil") });
      calqueLiens.appendChild(l.el);
    });
    var voisins = {};
    G.noeuds.forEach(function (n) { voisins[n.id] = {}; voisins[n.id][n.id] = 1; });
    G.liens.forEach(function (l) { voisins[l.a.id][l.b.id] = 1; voisins[l.b.id][l.a.id] = 1; });

    G.noeuds.forEach(function (n, i) {
      var g = svg("g", { class: "co-gnoeud " + n.groupe, tabindex: "0", role: "button", "aria-label": n.titre + (n.sous ? ", " + n.sous : "") });
      var clip = "clip-m" + i;
      defs.appendChild(svg("clipPath", { id: clip }, [svg("circle", { cx: 0, cy: 0, r: n.groupe === "hub" ? n.r - 4 : n.groupe === "projet" ? n.r - 3 : n.r * 0.62 })]));
      g.appendChild(svg("circle", { class: "co-gnoeud-fond", r: n.r }));
      if (n.picto) {
        var p = svg("g", { class: "co-gnoeud-picto", transform: "translate(-12,-12)" }); p.innerHTML = PICTOS[n.picto] || ""; g.appendChild(p);
      } else if (n.image) {
        var t = n.groupe === "hub" ? n.r - 4 : n.groupe === "projet" ? n.r - 3 : n.r * 0.62;
        var im = svg("image", { href: n.image, x: -t, y: -t, width: 2 * t, height: 2 * t, "clip-path": "url(#" + clip + ")", preserveAspectRatio: n.groupe === "hub" || n.groupe === "projet" ? "xMidYMid slice" : "xMidYMid meet" });
        im.addEventListener("error", function () { im.remove(); g.appendChild(svg("text", { class: "co-gnoeud-initiales", "text-anchor": "middle", dy: "0.35em" }, [n.titre.slice(0, 2)])); });
        g.appendChild(im);
      } else {
        g.appendChild(svg("text", { class: "co-gnoeud-initiales", "text-anchor": "middle", dy: "0.35em" }, [n.titre.replace(/[^A-Za-z0-9+]/g, "").slice(0, 3)]));
      }
      if (n.groupe === "hub") g.appendChild(svg("circle", { class: "co-hub-anneau", r: n.r + 6 }));
      g.appendChild(svg("text", { class: "co-gnoeud-titre", "text-anchor": "middle", y: n.r + 16 }, [n.titre]));
      if (n.sous) g.appendChild(svg("text", { class: "co-gnoeud-sous", "text-anchor": "middle", y: n.r + 32 }, [n.sous]));
      n.el = g;
      calqueNoeuds.appendChild(g);
    });

    // Panneau d’information de la bulle choisie.
    var panneau = html("div", { class: "co-graphe-panneau", "aria-live": "polite" });
    function montrer(n) {
      panneau.textContent = "";
      panneau.appendChild(html("strong", { text: n.titre }));
      if (n.texte) panneau.appendChild(html("p", { text: n.texte }));
      if (n.lien) panneau.appendChild(html("a", { href: n.lien, class: "co-graphe-lien-fiche", text: "Voir la fiche →" }));
      panneau.classList.add("visible");
    }
    montrer(G.noeuds[0]);
    cadre.appendChild(panneau);

    // Filtres par application.
    var filtre = null, survol = null;
    var filtres = html("div", { class: "co-graphe-filtres", role: "group", "aria-label": "Filtrer par application" });
    [{ id: null, titre: "Toutes" }].concat(G.projets.map(function (id) { return { id: id, titre: G.noeuds.filter(function (n) { return n.projet === id; })[0].titre }; })).forEach(function (f) {
      var b = html("button", { type: "button", class: "co-graphe-filtre", "aria-pressed": String(f.id === null), text: f.titre });
      b.addEventListener("click", function () {
        filtre = f.id;
        Array.prototype.forEach.call(filtres.children, function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        if (f.id) montrer(G.noeuds.filter(function (n) { return n.projet === f.id; })[0]);
        peindre();
      });
      filtres.appendChild(b);
    });

    function actifs() {
      if (survol) return voisins[survol.id];
      if (!filtre) return null;
      var p = "p-" + filtre, set = {}; set[p] = 1; set.hub = 1;
      Object.keys(voisins[p]).forEach(function (id) { set[id] = 1; });
      return set;
    }
    function peindre() {
      var set = actifs();
      G.noeuds.forEach(function (n) { n.el.classList.toggle("estompe", !!set && !set[n.id]); n.el.classList.toggle("allume", !!set && !!set[n.id]); });
      G.liens.forEach(function (l) {
        var on = set && set[l.a.id] && set[l.b.id] && (!survol || l.a === survol || l.b === survol) && (!filtre || survol || l.a.id === "p-" + filtre || l.b.id === "p-" + filtre || l.a.groupe === "hub" || l.b.groupe === "hub" || l.a.groupe === "action" || l.b.groupe === "action");
        l.el.classList.toggle("estompe", !!set && !on); l.el.classList.toggle("allume", !!on);
      });
    }

    /* ---------- Forces : retour vers sa place, collisions, et liens élastiques vers la bulle tenue ---------- */
    var alpha = 1, anime = null, reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function pas() {
      var ns = G.noeuds, i, j;
      for (i = 0; i < ns.length; i++) for (j = i + 1; j < ns.length; j++) {
        var a = ns[i], b = ns[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 0.1, min = a.r + b.r + 14;
        if (d < min) { var f = (min - d) * 0.25; dx /= d; dy /= d; a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f; }
      }
      // La bulle tenue entraîne ses voisines, comme dans Obsidian ; lâchée, chacune revient à sa place.
      if (tenu) G.liens.forEach(function (l) {
        var autre = l.a === tenu ? l.b : l.b === tenu ? l.a : null; if (!autre || autre.fixe) return;
        var dx = tenu.x - autre.x, dy = tenu.y - autre.y, d = Math.sqrt(dx * dx + dy * dy) || 1, f = (d - 160) * 0.012;
        autre.vx += dx / d * f; autre.vy += dy / d * f;
      });
      ns.forEach(function (n) {
        if (n.fixe) { n.vx = n.vy = 0; return; }
        n.vx += (n.hx - n.x) * 0.03; n.vy += (n.hy - n.y) * 0.03;
        n.vx *= 0.78; n.vy *= 0.78;
        n.x += n.vx * alpha; n.y += n.vy * alpha;
        n.x = Math.max(n.r + 4, Math.min(largeur - n.r - 4, n.x));
        n.y = Math.max(n.r + 4, Math.min(hauteur - n.r - 36, n.y));
      });
      alpha = Math.max(0.02, alpha * 0.985);
    }
    function dessiner() {
      G.liens.forEach(function (l) { l.el.setAttribute("x1", l.a.x.toFixed(1)); l.el.setAttribute("y1", l.a.y.toFixed(1)); l.el.setAttribute("x2", l.b.x.toFixed(1)); l.el.setAttribute("y2", l.b.y.toFixed(1)); });
      G.noeuds.forEach(function (n) { n.el.setAttribute("transform", "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")"); });
      Object.keys(ilots).forEach(function (g) {
        var ns = G.noeuds.filter(function (n) { return n.groupe === g; }); if (!ns.length) return;
        var cx = ns.reduce(function (s, n) { return s + n.x; }, 0) / ns.length, cy = ns.reduce(function (s, n) { return s + n.y; }, 0) / ns.length;
        var r = ns.reduce(function (m, n) { return Math.max(m, Math.hypot(n.x - cx, n.y - cy) + n.r + 26); }, 60);
        ilots[g].cercle.setAttribute("cx", cx.toFixed(1)); ilots[g].cercle.setAttribute("cy", cy.toFixed(1)); ilots[g].cercle.setAttribute("r", r.toFixed(1));
        ilots[g].titre.setAttribute("x", cx.toFixed(1)); ilots[g].titre.setAttribute("y", Math.max(16, cy - r - 8).toFixed(1));
      });
    }
    function boucle() {
      for (var k = 0; k < 2; k++) pas();
      dessiner();
      anime = alpha > 0.03 && cadre.isConnected ? requestAnimationFrame(boucle) : null;
    }
    function relancer(a) { alpha = Math.max(alpha, a); if (!anime && !reduit) anime = requestAnimationFrame(boucle); else if (reduit) { for (var k = 0; k < 120; k++) pas(); dessiner(); } }
    var tenu = null, depart = null, bouge = false;
    for (var k = 0; k < 120; k++) pas(); // disposition stable dès l’affichage
    alpha = 0.25; dessiner();

    /* ---------- Glisser, survoler, choisir ---------- */
    function point(ev) { var p = zone.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(zone.getScreenCTM().inverse()); }
    G.noeuds.forEach(function (n) {
      n.el.addEventListener("pointerdown", function (ev) { tenu = n; depart = point(ev); bouge = false; n.el.setPointerCapture(ev.pointerId); n.ancienFixe = n.fixe; n.fixe = true; ev.preventDefault(); });
      n.el.addEventListener("pointermove", function (ev) {
        if (tenu !== n) return;
        var p = point(ev); if (Math.hypot(p.x - depart.x, p.y - depart.y) > 4) bouge = true;
        if (bouge) { n.x = Math.max(n.r, Math.min(largeur - n.r, p.x)); n.y = Math.max(n.r, Math.min(hauteur - n.r, p.y)); relancer(0.35); if (reduit) dessiner(); }
      });
      n.el.addEventListener("pointerup", function () {
        if (tenu !== n) return;
        tenu = null; n.fixe = n.groupe === "hub" ? true : n.ancienFixe;
        if (bouge && n.groupe !== "hub") { n.hx = n.x; n.hy = n.y; } // posée ailleurs, elle y reste
        if (bouge && n.groupe === "hub") { n.x = n.hx; n.y = n.hy; } // Alain reste au centre
        if (!bouge) { montrer(n); if (n.lien && n.el.classList.contains("choisi")) location.hash = n.lien; G.noeuds.forEach(function (x) { x.el.classList.toggle("choisi", x === n); }); }
        relancer(0.2);
      });
      n.el.addEventListener("pointerenter", function () { survol = n; peindre(); });
      n.el.addEventListener("pointerleave", function () { survol = null; peindre(); });
      n.el.addEventListener("focus", function () { survol = n; peindre(); montrer(n); });
      n.el.addEventListener("blur", function () { survol = null; peindre(); });
      n.el.addEventListener("keydown", function (ev) { if ((ev.key === "Enter" || ev.key === " ") && n.lien) { ev.preventDefault(); location.hash = n.lien; } });
    });
    if (!reduit) anime = requestAnimationFrame(boucle);

    // Version texte complète : méthode, réalisations, outils et plateformes (contenu conservé, accessible).
    var texte = aides.texte ? aides.texte() : null;
    return [
      html("p", { class: "co-chapo-rubrique", text: M.intro }),
      filtres,
      cadre,
      html("p", { class: "co-graphe-aide", text: "Astuce : faites glisser une bulle pour la déplacer ; touchez-la deux fois pour ouvrir la fiche d’une application." }),
      texte
    ];
  }

  window.Methode = { page: page, construire: construire };
})();
