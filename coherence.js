/* Cohérence v2.15 : format clair à bulles du PDF. Symboles au trait, chemin du parcours, bandeau et menus. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  // Symboles au trait (viewBox 300×300), purement décoratifs.
  var TRACES = {
    avion: '<path d="M150 20q8 0 8 18v65l97 62v17l-97-35v65l30 24v12l-38-10-38 10v-12l30-24v-65l-97 35v-17l97-62V38q0-18 8-18z"/>',
    planete: '<circle cx="150" cy="140" r="65"/><ellipse cx="150" cy="140" rx="126" ry="27" transform="rotate(-28 150 140)"/><path d="M52 38v18m-9-9h18M248 223v18m-9-9h18M245 40l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z"/>',
    toque: '<path d="M20 105l130-65 130 65-130 65zM70 132v66q80 52 160 0v-66M280 105v103m-9 0h18v28h-18z"/>',
    compas: '<circle cx="150" cy="150" r="108"/><circle cx="150" cy="150" r="91" stroke-dasharray="2 13"/><path d="M150 34v23m0 186v23M34 150h23m186 0h23M182 88l-16 78-78 46 46-78z"/><circle cx="150" cy="150" r="9"/>',
    reseau: '<circle cx="150" cy="150" r="36"/><path d="M150 114V52m36 98h62M150 186v62m-36-98H52m73-25L72 72m103 53 53-53m-53 103 53 53m-103-53-53 53"/><g fill="currentColor"><circle cx="150" cy="40" r="12"/><circle cx="260" cy="150" r="12"/><circle cx="150" cy="260" r="12"/><circle cx="40" cy="150" r="12"/><circle cx="64" cy="64" r="9"/><circle cx="236" cy="64" r="9"/><circle cx="236" cy="236" r="9"/><circle cx="64" cy="236" r="9"/></g>',
    piano: '<rect x="38" y="65" width="224" height="170" rx="8"/><path d="M70 65v170m32-170v170m32-170v170m32-170v170m32-170v170m32-170v170"/><path d="M60 65v95h21V65m11 0v95h21V65m43 0v95h21V65m11 0v95h21V65m11 0v95h21V65" fill="currentColor"/>',
    plante: '<path d="M150 270V110m0 64q-110 0-110-110 110 0 110 110zm0-43q110 0 110-100-110 0-110 100zm-40 139h80"/>',
    montagne: '<path d="M20 250L120 60l45 88 35-60 85 162zM88 120l32 18 25-23M30 260q150 0 130-55t80-37"/>',
    marche: '<circle cx="165" cy="43" r="19"/><path d="M154 77l-38 71 55 31 33 80m-88-111-20 64-40 47m80-151 64 29 30-25m-99-20-46 7-27 52"/>'
  };
  // Passions : même ordre de symboles que les maquettes validées.
  var INTERETS = { vol: "avion", piano: "piano", numerique: "reseau", sciences: "planete", jardinage: "plante", course: "marche", randonnee: "montagne" };

  function symbole(cle, cls) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 300 300");
    s.setAttribute("class", "co-symbole " + (cls || ""));
    s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "3");
    s.setAttribute("stroke-linejoin", "round"); s.setAttribute("stroke-linecap", "round");
    s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
    s.innerHTML = TRACES[cle] || "";
    return s;
  }
  function svg(tag, attrs, enfants) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (enfants || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  // Chemin libre et stable, au format paysage de l’écran : premier pas en bas à gauche, dernier en haut à droite.
  // Trois passages avec montées et descentes ; les hauteurs sont une métaphore graphique, jamais un classement des expériences.
  // v2.27 : le trajet complet part de la naissance, en haut de la marge gauche, descend jusqu’à la première étape
  // (le BAC), suit les trois rangées puis finit sur « Aujourd’hui », en haut à droite. Il sert aussi au personnage animé.
  // « annexe » : index d’une étape sous laquelle une bulle hors chemin est suspendue (le BTS sous Apprenti courtier).
  // 2.42 : rangées plus espacées (le personnage marche sur le dessus des sphères sans toucher la rangée au-dessus).
  var RANGEES = [800, 510, 220], X0 = 250, X1 = 1150, HAUT = 1070;
  function chemin(nombre, annexe) {
    if (nombre < 6) return null;
    var p = [], tailles = [Math.ceil(nombre / 3), Math.ceil((nombre - Math.ceil(nombre / 3)) / 2)];
    tailles.push(nombre - tailles[0] - tailles[1]);
    tailles.forEach(function (n, r) {
      for (var j = 0; j < n; j++) {
        var x = n > 1 ? X0 + j * (X1 - X0) / (n - 1) : (X0 + X1) / 2;
        // Rangée du milieu parcourue de droite à gauche ; légère ondulation, en phase d’une rangée à l’autre (écart constant).
        var colonne = r === 1 ? n - 1 - j : j;
        p.push({ x: Math.round(r === 1 ? X0 + X1 - x : x), y: RANGEES[r] + (colonne % 2 ? 18 : -22) });
      }
    });
    var arrondi = function (n) { return Math.round(n * 10) / 10; };
    var route = "M" + p[0].x + "," + p[0].y;
    for (var i = 0; i < p.length - 1; i++) {
      var a = p[Math.max(0, i - 1)], b = p[i], c = p[i + 1], d = p[Math.min(p.length - 1, i + 2)];
      route += " C" + arrondi(b.x + (c.x - a.x) / 6) + "," + arrondi(b.y + (c.y - a.y) / 6) + " " + arrondi(c.x - (d.x - b.x) / 6) + "," + arrondi(c.y - (d.y - b.y) / 6) + " " + c.x + "," + c.y;
    }
    var rayon = 64, debut = { x: 118, y: 104 }, coude = p[0].y - 70, der = p[p.length - 1], fin = { x: 1292, y: der.y + 12 };
    // Descente verticale dans la marge gauche, puis arrivée à l’horizontale sur la première bulle.
    var depart = "M" + debut.x + "," + debut.y + " L" + debut.x + "," + coude +
      " C" + debut.x + "," + (p[0].y - 20) + " " + (debut.x + 50) + "," + p[0].y + " " + p[0].x + "," + p[0].y;
    var arrivee = " C" + (der.x + 50) + "," + der.y + " " + (fin.x - 60) + "," + fin.y + " " + fin.x + "," + fin.y;
    var geo = { positions: p, route: route, trajet: depart + route.replace(/^M[^ ]+/, "") + arrivee, viewBox: "0 0 1400 " + HAUT, rayon: rayon,
      debut: debut, fin: fin, coude: { x: debut.x, y: coude } };
    marche(geo, tailles);
    if (annexe >= 0 && annexe < p.length) geo.annexe = { x: p[annexe].x, y: p[annexe].y + 2 * rayon + 30 };
    return geo;
  }

  // 2.42 : chemin de marche du personnage, jamais caché par une sphère : il marche sur le dessus des sphères
  // (arcs de rayon R, ponts tangents entre deux sphères voisines) et change de rangée en montant le long du côté
  // extérieur (vers le bord de la fenêtre) de la sphère du dessus. geo.sommets : point haut de chaque sphère (jalons).
  function marche(geo, tailles) {
    var p = geo.positions, R = geo.rayon + 7, a1 = function (n) { return Math.round(n * 10) / 10; };
    var pt = function (c, t) { return { x: c.x + R * Math.cos(t), y: c.y + R * Math.sin(t) }; };
    var ang = function (c, q) { return Math.atan2(q.y - c.y, q.x - c.x); };
    var arc = function (q, sens) { return " A" + R + "," + R + " 0 0 " + sens + " " + a1(q.x) + "," + a1(q.y); };
    var lig = function (q) { return " L" + a1(q.x) + "," + a1(q.y); };
    // Tangente extérieure haute entre deux sphères de même rayon.
    var tangente = function (a, b) {
      var dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy), nx = dy / l, ny = -dx / l;
      if (ny > 0) { nx = -nx; ny = -ny; }
      return [{ x: a.x + R * nx, y: a.y + R * ny }, { x: b.x + R * nx, y: b.y + R * ny }];
    };
    var d = "M" + geo.debut.x + "," + geo.debut.y + " L" + geo.debut.x + "," + geo.coude.y, debutRangee = 0;
    // Arrivée à gauche de la première sphère, à hauteur de son centre.
    var c0 = p[0], e0 = pt(c0, Math.PI);
    d += " C" + geo.debut.x + "," + a1(e0.y - 20) + " " + a1((geo.debut.x + e0.x) / 2) + "," + a1(e0.y) + " " + a1(e0.x) + "," + a1(e0.y);
    tailles.forEach(function (n, r) {
      var sens = r % 2 ? 0 : 1, fin = debutRangee + n - 1;     // rangées paires : vers la droite (sens horaire)
      for (var i = debutRangee; i < fin; i++) {
        var t = tangente(p[i], p[i + 1]);
        d += arc(t[0], sens) + lig(t[1]);
      }
      var cf = p[fin];
      if (r < tailles.length - 1) {
        // Côté extérieur : à droite pour une rangée qui va vers la droite, à gauche sinon ; montée verticale.
        var cote = sens ? 0 : Math.PI, s1 = pt(cf, cote), u = p[fin + 1], s2 = pt(u, cote);
        d += arc(s1, sens) + lig(s2);
      } else {
        var sx = pt(cf, 0);
        d += arc(sx, sens) + " C" + a1(sx.x + 40) + "," + a1(sx.y) + " " + a1(geo.fin.x - 40) + "," + geo.fin.y + " " + geo.fin.x + "," + geo.fin.y;
      }
      debutRangee = fin + 1;
    });
    geo.marche = d;
    geo.sommets = p.map(function (c) { return { x: c.x, y: c.y - R }; });
  }

  /* ---------- Bandeau : menu mobile et menu complémentaire ---------- */
  var bandeau = document.getElementById("bandeau");
  var nav = document.getElementById("navigation-principale");
  var menu = bandeau && bandeau.querySelector(".co-menu");
  var plus = bandeau && bandeau.querySelector(".co-plus-bouton");
  var plusListe = plus && document.getElementById(plus.getAttribute("aria-controls"));
  function ouvrirMenu(o) { if (!menu) return; nav.classList.toggle("ouvert", o); menu.setAttribute("aria-expanded", String(o)); }
  function ouvrirPlus(o) { if (!plus) return; plusListe.classList.toggle("ouvert", o); plus.setAttribute("aria-expanded", String(o)); }
  function menuOuvert() { return menu && menu.getAttribute("aria-expanded") === "true"; }
  function plusOuvert() { return plus && plus.getAttribute("aria-expanded") === "true"; }
  if (menu) menu.addEventListener("click", function () { ouvrirMenu(!menuOuvert()); });
  if (plus) plus.addEventListener("click", function () { ouvrirPlus(!plusOuvert()); });
  // Enregistré avant app.js : Échap ferme d’abord un menu ouvert, sans déclencher le retour de page.
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    if (plusOuvert()) { ev.preventDefault(); ouvrirPlus(false); plus.focus(); }
    else if (menuOuvert()) { ev.preventDefault(); ouvrirMenu(false); menu.focus(); }
  });
  document.addEventListener("click", function (ev) {
    if (plusOuvert() && !plus.parentNode.contains(ev.target)) ouvrirPlus(false);
    if (menuOuvert() && !bandeau.contains(ev.target)) ouvrirMenu(false);
  });
  window.addEventListener("hashchange", function () { ouvrirMenu(false); ouvrirPlus(false); });
  if (window.matchMedia) {
    var large = window.matchMedia("(min-width: 1101px)");
    var fermer = function () { ouvrirMenu(false); ouvrirPlus(false); };
    if (large.addEventListener) large.addEventListener("change", fermer); else if (large.addListener) large.addListener(fermer);
  }

  // Le mouvement lent des fonds s’arrête quand l’onglet est caché.
  document.addEventListener("visibilitychange", function () { document.documentElement.classList.toggle("co-onglet-cache", document.hidden); });

  window.Coherence = { symbole: symbole, svg: svg, chemin: chemin, interets: INTERETS };
})();
