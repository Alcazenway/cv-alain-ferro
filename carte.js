/* Carte des liens v2.7 : vue graphe façon Obsidian, construite depuis data/contenu.js.
   Liens : preuves et compétences des fiches, fiches des intérêts, « liens » des formations.
   Survol, focus ou premier toucher : la bulle et ses voisines s’allument ; clic ou second toucher : ouverture de la fiche.
   Placement par simulation de forces déterministe, recalculé quand la fenêtre change de taille. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var COULEURS = { competence: "#19383D", formation: "#B9653F", interet: "#4E7D3A", experience: "#087E83", personnel: "#735389" };
  var POLES = [
    { id: "p-competence", titre: "Compétences", famille: "competence", href: "#/competences", ax: .26, ay: .3 },
    { id: "p-interet", titre: "Intérêts", famille: "interet", href: "#/interets", ax: .76, ay: .27 },
    { id: "p-formation", titre: "Formation", famille: "formation", href: "#/savoir-formations", ax: .24, ay: .74 },
    { id: "p-parcours", titre: "Parcours", famille: "experience", href: "#/parcours", ax: .72, ay: .72 }
  ];

  function graphe(D) {
    var noeuds = [], liens = [], parId = Object.create(null);
    function ajouter(n) { n.deg = 0; noeuds.push(n); parId[n.id] = n; return n; }
    function lier(a, b, t) { if (parId[a] && parId[b] && a !== b) { liens.push({ a: parId[a], b: parId[b], t: t }); parId[a].deg++; parId[b].deg++; } }
    ajouter({ id: "moi", titre: D.identite.nom, famille: "moi", href: "#/" });
    POLES.forEach(function (p) { ajouter({ id: p.id, titre: p.titre, famille: "pole", couleur: p.famille, href: p.href, ax: p.ax, ay: p.ay }); });
    D.competences.forEach(function (c) { ajouter({ id: "c-" + c.id, titre: c.titre, famille: "competence", href: "#/competence/" + c.id }); });
    D.interets.forEach(function (i) { ajouter({ id: "i-" + i.id, titre: i.nom, famille: "interet", href: "#/interets" }); });
    D.parcours.forEach(function (e) {
      ajouter({ id: e.id, titre: (e.bulle && e.bulle[0]) || e.titreCourt, famille: e.type === "formation" ? "formation" : e.type, important: !!e.important, href: "#/parcours/" + e.id });
    });
    var croises = Object.create(null);
    function croiser(a, b) { var k = a < b ? a + "|" + b : b + "|" + a; if (!croises[k]) { croises[k] = 1; lier(a, b, "x"); } }
    D.competences.forEach(function (c) { (c.preuves || []).forEach(function (p) { croiser("c-" + c.id, p); }); });
    D.parcours.forEach(function (e) {
      (e.competences || []).forEach(function (c) { croiser("c-" + c, e.id); });
      (e.liens || []).forEach(function (p) { croiser(e.id, p); });
    });
    D.interets.forEach(function (i) { (i.fiches || []).forEach(function (p) { croiser("i-" + i.id, p); }); });
    var poleDe = { competence: "p-competence", interet: "p-interet", formation: "p-formation", experience: "p-parcours", personnel: "p-parcours" };
    POLES.forEach(function (p) { lier("moi", p.id, "moi"); });
    noeuds.forEach(function (n) { if (poleDe[n.famille]) { lier(poleDe[n.famille], n.id, "pole"); n.pole = parId[poleDe[n.famille]]; } });
    return { noeuds: noeuds, liens: liens };
  }

  function rayon(n) {
    if (n.famille === "moi") return 28;
    if (n.famille === "pole") return 11;
    var croisements = n.deg - 1;
    return Math.min(4 + 1.6 * croisements, 13) + (n.important ? 2 : 0);
  }

  // Grappes en tournesol autour de chaque pôle (les bulles les plus liées au plus près), puis écartement des chevauchements.
  var ANCRES = {
    paysage: { moi: [.47, .47], "p-competence": [.2, .3], "p-interet": [.8, .25], "p-formation": [.2, .76], "p-parcours": [.71, .7] },
    portrait: { moi: [.5, .45], "p-competence": [.27, .25], "p-interet": [.75, .13], "p-formation": [.25, .66], "p-parcours": [.68, .74] }
  };
  function placer(G, L, H) {
    var N = G.noeuds, paysage = L >= H * 1.05, ancres = ANCRES[paysage ? "paysage" : "portrait"];
    var echelle = Math.max(.42, Math.min(1.25, Math.min(L / (paysage ? 1300 : 760), H / (paysage ? 740 : 1100))));
    N.forEach(function (n) { n.r = rayon(n) * (echelle < .7 ? .75 : 1); });
    var etirement = paysage ? 1.75 : 1.05;
    N.forEach(function (n) { if (ancres[n.id]) { n.x = n.cx = ancres[n.id][0] * L; n.y = n.cy = ancres[n.id][1] * H; } });
    POLES.forEach(function (p) {
      var pole = G.noeuds.filter(function (n) { return n.id === p.id; })[0];
      var membres = N.filter(function (n) { return n.pole === pole; }).sort(function (a, b) { return b.deg - a.deg; });
      var pas = (membres.length > 12 ? 31 : 40) * echelle;
      membres.forEach(function (n, i) {
        var a = (i + 3) * 2.39996, d = pas * Math.sqrt(i + 3);
        n.x = n.cx = pole.x + d * Math.cos(a) * etirement; n.y = n.cy = pole.y + d * Math.sin(a);
      });
    });
    var bas = 48, marge = 12;
    for (var it = 0; it < 160; it++) {
      for (var i = 0; i < N.length; i++) for (var j = i + 1; j < N.length; j++) {
        var a = N[i], b = N[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || .01;
        var min = a.r + b.r + 22 * echelle;
        if (d < min) {
          var k = (min - d) / d / 2, fa = a.famille === "moi" ? 0 : 1, fb = b.famille === "moi" ? 0 : 1;
          a.x -= dx * k * fa; a.y -= dy * k * fa; b.x += dx * k * fb; b.y += dy * k * fb;
        }
      }
      N.forEach(function (n) {
        n.x += (n.cx - n.x) * .02; n.y += (n.cy - n.y) * .02;
        var mx = n.r + marge + (n.famille === "pole" ? 70 : 34 * echelle);
        n.x = Math.max(mx, Math.min(L - mx, n.x)); n.y = Math.max(n.r + 30, Math.min(H - n.r - bas - 16, n.y));
      });
    }
  }

  function el(nom, attrs, parent) {
    var n = document.createElementNS(NS, nom);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(n);
    return n;
  }
  function couper(t, max) {
    var out = [], ligne = "";
    t.split(" ").forEach(function (m) { if ((ligne + " " + m).trim().length > max && ligne) { out.push(ligne); ligne = m; } else ligne = (ligne + " " + m).trim(); });
    if (ligne) out.push(ligne); return out;
  }

  function dessiner(svg, D, L, H, portrait) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + L + " " + H);
    var G = graphe(D); placer(G, L, H);
    var etroit = L < 620 || H < 320;
    var gL = el("g", { class: "carte-fils" }, svg), gN = el("g", { class: "carte-noeuds" }, svg);
    G.liens.forEach(function (l) {
      var f = el("line", { class: "carte-fil " + l.t, x1: l.a.x.toFixed(1), y1: l.a.y.toFixed(1), x2: l.b.x.toFixed(1), y2: l.b.y.toFixed(1) }, gL);
      f.dataset.a = l.a.id; f.dataset.b = l.b.id;
    });
    G.noeuds.forEach(function (n) {
      var a = el("a", { href: n.href, class: "carte-noeud " + n.famille + (n.important ? " important" : "") }, gN);
      a.dataset.id = n.id;
      el("title", {}, a).textContent = n.titre;
      if (n.famille === "moi") {
        el("defs", {}, a).appendChild(function () { var c = el("clipPath", { id: "carte-moi" }); el("circle", { cx: n.x, cy: n.y, r: n.r }, c); return c; }());
        el("circle", { cx: n.x, cy: n.y, r: n.r + 3, class: "carte-anneau" }, a);
        el("image", { href: portrait, x: n.x - n.r, y: n.y - n.r, width: 2 * n.r, height: 2 * n.r, "clip-path": "url(#carte-moi)", preserveAspectRatio: "xMidYMid slice" }, a);
        el("text", { x: n.x, y: n.y + n.r + 18, class: "carte-texte fort" }, a).textContent = "Alain";
        return;
      }
      var col = COULEURS[n.couleur || n.famille];
      if (n.famille === "pole") {
        el("circle", { cx: n.x, cy: n.y, r: n.r + 6, fill: col, opacity: ".18" }, a);
        el("circle", { cx: n.x, cy: n.y, r: n.r, fill: col }, a);
        el("text", { x: n.x, y: n.y - n.r - 10, fill: col, class: "carte-pole" }, a).textContent = n.titre.toUpperCase();
        return;
      }
      el("circle", { cx: n.x, cy: n.y, r: n.r, fill: col, class: "carte-bulle" }, a);
      var t = el("text", { x: n.x, y: n.y + n.r + 12, class: "carte-texte" + (n.important || n.famille === "competence" ? " fort" : "") + (etroit ? " discret" : "") }, a);
      couper(n.titre, etroit ? 14 : 16).forEach(function (ligne, i) { el("tspan", { x: n.x, dy: i ? 12 : 0 }, t).textContent = ligne; });
    });
  }

  function interactions(svg) {
    var verrou = null;
    function montrer(id) {
      var voisins = Object.create(null); voisins[id] = 1;
      Array.prototype.forEach.call(svg.querySelectorAll(".carte-fil"), function (f) {
        var on = f.dataset.a === id || f.dataset.b === id; f.classList.toggle("on", on);
        if (on) { voisins[f.dataset.a] = 1; voisins[f.dataset.b] = 1; }
      });
      Array.prototype.forEach.call(svg.querySelectorAll(".carte-noeud"), function (n) { n.classList.toggle("on", !!voisins[n.dataset.id]); });
      svg.classList.add("estompe");
    }
    function cacher() { if (!verrou) svg.classList.remove("estompe"); }
    svg.addEventListener("mouseover", function (ev) { var n = ev.target.closest(".carte-noeud"); if (n && !verrou) montrer(n.dataset.id); });
    svg.addEventListener("mouseout", function (ev) { var n = ev.target.closest(".carte-noeud"); if (n && !n.contains(ev.relatedTarget)) cacher(); });
    svg.addEventListener("focusin", function (ev) { var n = ev.target.closest(".carte-noeud"); if (n) { verrou = null; montrer(n.dataset.id); } });
    svg.addEventListener("focusout", function () { verrou = null; cacher(); });
    // Toucher : un premier appui allume les liens, un second sur la même bulle ouvre la fiche.
    svg.addEventListener("touchend", function (ev) {
      var n = ev.target.closest(".carte-noeud");
      if (!n) { verrou = null; svg.classList.remove("estompe"); return; }
      if (verrou !== n.dataset.id) { ev.preventDefault(); verrou = n.dataset.id; montrer(verrou); }
    }, { passive: false });
  }

  function page(D) {
    var bloc = document.createElement("div"); bloc.className = "carte-liens";
    var svg = el("svg", { class: "carte-svg", role: "group", "aria-label": "Carte des liens entre parcours, formations, compétences et intérêts" }, bloc);
    var portrait = (D.identite.portrait && D.identite.portrait.srcPetit) || "assets/portrait-240.webp";
    var taille = "", attente = 0;
    function ajuster() {
      attente = 0;
      if (!bloc.isConnected) { if (ro) ro.disconnect(); return; }
      var L = Math.round(bloc.clientWidth), H = Math.round(bloc.clientHeight);
      if (L < 160 || H < 140 || taille === L + "x" + H) return;
      taille = L + "x" + H; dessiner(svg, D, L, H, portrait);
    }
    var ro = window.ResizeObserver ? new ResizeObserver(function () { if (!attente) attente = requestAnimationFrame(ajuster); }) : null;
    if (ro) ro.observe(bloc); else setTimeout(ajuster, 0);
    interactions(svg);
    var legende = document.createElement("p"); legende.className = "carte-legende";
    [["competence", "Compétence"], ["formation", "Formation"], ["interet", "Intérêt"], ["experience", "Expérience pro"], ["personnel", "Projet perso"]].forEach(function (c) {
      var s = document.createElement("span"); s.className = "carte-cle cle-" + c[0]; s.textContent = c[1]; legende.appendChild(s);
    });
    var aide = document.createElement("span"); aide.className = "carte-aide";
    aide.textContent = "Survol ou toucher : liens d’une bulle · clic : fiche";
    legende.appendChild(aide); bloc.appendChild(legende);
    return bloc;
  }

  window.CarteLiens = { page: page, graphe: graphe };
})();
