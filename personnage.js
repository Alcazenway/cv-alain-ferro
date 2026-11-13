/* Personnage du parcours (v2.30) : Alain, du nourrisson emmailloté à l’adulte de 44 ans, avance sur tout le chemin.
   Dessin SVG paramétrique en illustration plate : chaque proportion (taille, tête, membres, cheveux, barbe, couleurs
   des vêtements) est interpolée en continu selon l’âge ; l’âge est lui-même interpolé entre les années des bulles.
   v2.30 : vues de face, de dos et de profil selon la direction du trajet (demi-tour simulé), marche articulée
   (cuisse, genou, tibia), taille ×1,5, bouton « Animation : activée / désactivée » mémorisé. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TRAIT = "#1f474b", PEAU = "#f6d8bd", JOUES = "#f0a08a", NEZ = "#cf7448";
  var LANGE = "#f5eee2", BANDE = "#b7a1cb";
  var ECHELLE = 1.5;

  // Clés d’interpolation par âge (années). Les proportions sont rapportées à la taille du personnage.
  var AGES = [0, 1, 3, 7, 12, 16, 22, 30, 44];
  var CLES = {
    taille:   [30, 36, 44, 54, 63, 71, 76, 76, 76],
    tete:     [.52, .44, .37, .31, .27, .245, .23, .23, .23],  // hauteur de tête / taille
    ratio:    [1, .98, .94, .9, .87, .85, .84, .84, .85],        // largeur / hauteur de tête
    cou:      [0, 0, .012, .022, .03, .036, .04, .04, .04],
    torse:    [.46, .3, .28, .28, .29, .3, .3, .3, .31],
    epaules:  [.44, .36, .31, .27, .26, .27, .28, .29, .3],       // largeur d’épaules / taille
    ventre:   [0, .6, .4, .1, 0, 0, 0, .05, .18],
    jambe:    [.1, .095, .08, .068, .062, .06, .06, .06, .062],   // épaisseur des membres / taille
    calotte:  [0, .2, .33, .37, .4, .42, .35, .32, .3],          // profondeur de la calotte / hauteur de tête
    meche:    [0, .2, .45, .5, .55, .8, .5, .35, .3],
    pantalon: [1, 1, .5, .45, .95, 1, 1, 1, 1],                   // part de la jambe couverte (short → pantalon)
    manche:   [1, 1, .45, .4, .42, 1, .55, .55, .6]
  };
  var TEINTES = {
    haut:      ["#f5eee2", "#f3d77a", "#f1b65a", "#e27c55", "#4f80ad", "#68747f", "#3e8c88", "#4a9599", "#5d9ea4"],
    bas:       ["#f5eee2", "#f3d77a", "#4a6fa5", "#3f5f8e", "#34507a", "#2f3e55", "#2f3a4a", "#33404f", "#2e3a48"],
    chaussure: ["#f5eee2", "#ffffff", "#e2574c", "#f4f4f4", "#3d3d3d", "#f0f0f0", "#5a3b2a", "#4a3427", "#3d2b20"],
    cheveux:   ["#c47a45", "#b97342", "#a3653b", "#8e5634", "#7d4a2f", "#744530", "#6f4430", "#6c432f", "#6a4330"]
  };

  /* v2.31 : tenues selon l’activité de la bulle parcourue. Couleurs (haut, bas, chaussure, bras = manches), couvertures
     (manche, pantalon, chemise = col et boutons) et accessoires (poids 0 → 1, fondus entre deux tenues). */
  var TENUES = {
    enfant: {}, actuelle: {},
    ecolier:     { haut: "#34558b", bas: "#4a5463", chaussure: "#f2f2f2", manche: 1, pantalon: 1, chemise: .9, cartable: 1 },
    vigneron:    { haut: "#efe6cf", bas: "#3f6aa0", chaussure: "#6b4a2f", manche: .45, pantalon: 1, chemise: 0, salopette: 1, gants: 1, panier: 1 },
    skiman:      { haut: "#d4473c", bas: "#2c3e50", chaussure: "#3d3d3d", manche: 1, pantalon: 1, chemise: 0, bonnet: 1, gants: 1 },
    vendeur:     { haut: "#f4f6f8", bas: "#2f3a4a", chaussure: "#2b211b", manche: 1, pantalon: 1, chemise: 1, cravate: 1, porteDoc: 1 },
    serveur:     { haut: "#fbfbfb", bas: "#1f2024", chaussure: "#1b1b1b", manche: 1, pantalon: 1, chemise: 1, gilet: 1, noeud: 1, plateau: 1 },
    bricoleur:   { haut: "#efe6cf", bas: "#3f6aa0", chaussure: "#6b4a2f", manche: .45, pantalon: 1, chemise: 0, salopette: 1, marteau: 1, gants: .6 },
    gerant:      { haut: "#eef1f4", bras: "#3a4a5e", bas: "#2e3a48", chaussure: "#2b211b", manche: 1, pantalon: 1, chemise: 1, veste: 1, porteDoc: 1, cravate: .0 },
    pilote:      { haut: "#3e6c8c", manche: .55, casque: 1 },
    commercial:  { haut: "#e3ecf5", bras: "#6f8196", vesteC: "#6f8196", bas: "#3a4656", chaussure: "#2b211b", manche: 1, pantalon: 1, chemise: 1, veste: 1, porteDoc: 1 },
    negociateur: { haut: "#e3ecf5", bras: "#6f8196", vesteC: "#6f8196", bas: "#3a4656", chaussure: "#2b211b", manche: 1, pantalon: 1, chemise: 1, veste: 1, cravate: 1, cravateC: "#3c6e9e", dossier: 1 },
    soignant:    { haut: "#f6fafa", bas: "#eef4f4", chaussure: "#ffffff", manche: .45, pantalon: 1, chemise: 0, blouse: 1, badge: 1, lisere: 1, badgeC: "#8fb3c9", lisereC: "#9fc3cf" },
    responsable: { haut: "#a8bfd4", bas: "#90abc3", chaussure: "#ffffff", manche: .45, pantalon: 1, chemise: 0, blouse: 1, badge: 1, lisere: 1, badgeC: "#e0a526", lisereC: "#6f8fae" }, // 2.35.3 : bleu de la tenue fourni par Alain
    informaticien: { haut: "#3d4a5c", manche: .55, chemise: 0, micro: 1 },
    jardinier:   { haut: "#7a9a52", bas: "#6b5a43", chaussure: "#5a3b2a", manche: .45, chemise: 0, chapeau: 1, arrosoir: 1 },
    bureau:      { haut: "#dfe9f3", bas: "#2e3a48", manche: .6, chemise: 1, lunettes: 1, dossier: 1 },
    numerique:   { laptop: 1 }
  };
  var TENUE_ID = { bac: "ecolier", vendanges: "vigneron", skiman: "skiman", courtier: "vendeur", londres: "serveur", bateau: "bricoleur",
    negoce: "gerant", simulation: "pilote", pailletrice: "commercial", immobilier: "negociateur", "thermes-agent": "soignant",
    "thermes-responsable": "responsable", pc: "informaticien", maison: "bricoleur", "plein-air": "jardinier", "stage-audit": "bureau",
    "stage-cecosud": "bureau", "outils-ia": "numerique" };
  var ACCESSOIRES = ["cartable", "salopette", "gants", "bonnet", "cravate", "porteDoc", "gilet", "noeud", "plateau", "marteau", "veste",
    "casque", "micro", "blouse", "badge", "lisere", "chapeau", "arrosoir", "lunettes", "dossier", "laptop", "panier"];

  function lisse(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function segment(a) {
    var i = 0;
    while (i < AGES.length - 2 && a > AGES[i + 1]) i++;
    var t = Math.max(0, Math.min(1, (a - AGES[i]) / (AGES[i + 1] - AGES[i])));
    return { i: i, t: t * t * (3 - 2 * t) }; // transitions adoucies entre deux clés
  }
  function rgb(h) { return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)]; }
  function parametres(a) {
    var s = segment(a), P = {};
    Object.keys(CLES).forEach(function (k) { var v = CLES[k]; P[k] = v[s.i] + (v[s.i + 1] - v[s.i]) * s.t; });
    P.taille *= ECHELLE;
    Object.keys(TEINTES).forEach(function (k) {
      var c0 = rgb(TEINTES[k][s.i]), c1 = rgb(TEINTES[k][s.i + 1]);
      P[k] = c0.map(function (c, j) { return c + (c1[j] - c) * s.t; });
    });
    return P;
  }
  function teinte(c, f0) { return "rgb(" + c.map(function (v) { return Math.round(v * (f0 || 1)); }).join(",") + ")"; }
  // Longueur de jambe à l’âge a : sert à régler la cadence (pas plus courts et plus rapides chez le petit).
  function longueurJambe(a) {
    var P = parametres(a), H = P.taille;
    return Math.max(6, H - P.tete * H * .94 - P.cou * H - P.torse * H);
  }

  function cree(parent, tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    parent.appendChild(n);
    return n;
  }
  function f(n) { return Math.round(n * 100) / 100; }
  function poly(n, pts) { n.setAttribute("d", pts.length < 2 ? "" : "M" + pts.map(function (p) { return f(p[0]) + "," + f(p[1]); }).join("L")); }
  function attrs(n, o) { Object.keys(o).forEach(function (k) { n.setAttribute(k, typeof o[k] === "number" ? f(o[k]) : o[k]); }); }
  function voir(n, v) { n.setAttribute("display", v ? "inline" : "none"); }
  // Coupe une ligne brisée à la fraction u de sa longueur : [partie couverte, partie en peau].
  function coupe(pts, u) {
    var L = [], tot = 0;
    for (var i = 1; i < pts.length; i++) { var l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(l); tot += l; }
    var cible = tot * Math.max(0, Math.min(1, u)), avant = [pts[0]], cumul = 0;
    for (var j = 1; j < pts.length; j++) {
      if (cumul + L[j - 1] >= cible) {
        var t = L[j - 1] ? (cible - cumul) / L[j - 1] : 0;
        var m = [pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * t, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * t];
        avant.push(m);
        return [avant, [m].concat(pts.slice(j))];
      }
      avant.push(pts[j]); cumul += L[j - 1];
    }
    return [avant, [pts[pts.length - 1]]];
  }
  // Points d’une ellipse entre deux angles (sens trigonométrique, y vers le bas).
  function arc(cx, cy, rx, ry, t0, t1, n) {
    var out = [];
    for (var i = 0; i <= n; i++) { var t = t0 + (t1 - t0) * i / n; out.push([cx + rx * Math.cos(t), cy - ry * Math.sin(t)]); }
    return out;
  }
  function ptsD(pts) { return pts.map(function (p, i) { return (i ? "L" : "M") + f(p[0]) + "," + f(p[1]); }).join(""); }

  var compteur = 0;
  // Construit les éléments du personnage une fois ; dessiner() ne fait ensuite que changer leurs attributs.
  function Figure(calque, calqueHaut) {
    var id = "pe-lange-" + (++compteur);
    var g = cree(calque, "g", { class: "pe-personnage" });
    var E = {};
    function membre(parent) { return { contour: cree(parent, "path", { class: "pe-membre-contour" }), tissu: cree(parent, "path", { class: "pe-membre" }), peau: cree(parent, "path", { class: "pe-membre", stroke: PEAU }) }; }
    E.ombre = cree(g, "ellipse", { class: "pe-ombre" });
    E.pivot = cree(g, "g");            // miroir (profil gauche) et demi-tour simulé
    E.corps = cree(E.pivot, "g");      // bond de la marche, balancement du nourrisson
    // Ordre de profondeur pour le profil : bras arrière, jambe arrière, jambe avant, torse, bras avant.
    E.cartableArr = cree(E.corps, "path", { class: "pe-trait", fill: "#b5562e" });
    E.brasG = membre(E.corps); E.mainG = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU });
    E.jambeG = membre(E.corps); E.chausG = cree(E.corps, "ellipse", { class: "pe-trait" });
    E.jambeD = membre(E.corps); E.chausD = cree(E.corps, "ellipse", { class: "pe-trait" });
    E.torse = cree(E.corps, "path", { class: "pe-trait" });
    E.chemise = cree(E.corps, "g");
    E.encolure = cree(E.chemise, "path", { class: "pe-trait", fill: PEAU });
    E.colG = cree(E.chemise, "path", { class: "pe-trait" }); E.colD = cree(E.chemise, "path", { class: "pe-trait" });
    E.bouton1 = cree(E.chemise, "circle", { fill: TRAIT }); E.bouton2 = cree(E.chemise, "circle", { fill: TRAIT });
    // Habits des tenues, par-dessus le torse.
    E.salopette = cree(E.corps, "path", { class: "pe-trait" });
    E.gilet = cree(E.corps, "path", { class: "pe-trait", fill: "#25282d" });
    E.veste = cree(E.corps, "path", { class: "pe-trait" });
    E.lisere = cree(E.corps, "path", { class: "pe-ligne" });
    E.cravate = cree(E.corps, "path", { class: "pe-trait" });
    E.noeud = cree(E.corps, "path", { class: "pe-trait", fill: "#1d1e22" });
    E.badge = cree(E.corps, "path", { class: "pe-trait" });
    E.bretelles = cree(E.corps, "path", { class: "pe-ligne", stroke: "#7a3a1f" });
    E.cartableDos = cree(E.corps, "path", { class: "pe-trait", fill: "#b5562e" });
    E.brasD = membre(E.corps); E.mainD = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU });
    // Objets tenus dans la main avant.
    E.objet = cree(E.corps, "g");
    E.porteDoc = cree(E.objet, "path", { class: "pe-trait", fill: "#6b4a2f" });
    E.dossier = cree(E.objet, "path", { class: "pe-trait", fill: "#4f7fb5" });
    E.laptop = cree(E.objet, "path", { class: "pe-trait", fill: "#9aa3ad" });
    E.laptopLogo = cree(E.objet, "circle", { fill: "#eef1f3" });
    E.marteauManche = cree(E.objet, "path", { class: "pe-trait", fill: "#a8743f" });
    E.marteauTete = cree(E.objet, "path", { class: "pe-trait", fill: "#7d8790" });
    E.arrosoirAnse = cree(E.objet, "path", { class: "pe-ligne", stroke: "#3f7657" });
    E.arrosoir = cree(E.objet, "path", { class: "pe-trait", fill: "#4e8f6a" });
    E.panier = cree(E.objet, "path", { class: "pe-trait", fill: "#b5824e" });
    E.raisin = cree(E.objet, "path", { class: "pe-trait", fill: "#7b3f8c" });
    E.verre = cree(E.objet, "path", { class: "pe-trait", fill: "#f3d6dc" });
    E.plateau = cree(E.objet, "path", { class: "pe-trait", fill: "#cfd6dc" });
    // Lange du nourrisson : cocon et bande croisée, qui s’effacent quand l’enfant commence à marcher.
    var defs = cree(g, "defs"), clip = cree(defs, "clipPath", { id: id });
    E.clipLange = cree(clip, "ellipse");
    E.lange = cree(E.corps, "g");
    E.cocon = cree(E.lange, "ellipse", { class: "pe-trait", fill: LANGE });
    E.bande = cree(E.lange, "path", { fill: BANDE, "clip-path": "url(#" + id + ")" });
    E.bande2 = cree(E.lange, "path", { fill: "none", stroke: TRAIT, "stroke-width": ".9", "clip-path": "url(#" + id + ")" });
    E.cou = cree(E.corps, "rect", { fill: PEAU });
    E.oreilleG = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU }); E.oreilleD = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU });
    E.tete = cree(E.corps, "ellipse", { class: "pe-trait", fill: PEAU });
    E.oreilleP = cree(E.corps, "path", { class: "pe-trait", fill: PEAU });
    E.barbe = cree(E.corps, "path", { class: "pe-trait" });
    E.levres = cree(E.corps, "ellipse", { fill: PEAU });
    E.joueG = cree(E.corps, "circle", { fill: JOUES }); E.joueD = cree(E.corps, "circle", { fill: JOUES });
    E.oeilG = cree(E.corps, "path", { class: "pe-ligne" }); E.oeilD = cree(E.corps, "path", { class: "pe-ligne" });
    E.nez = cree(E.corps, "path", { fill: NEZ });
    E.bouche = cree(E.corps, "path", { class: "pe-ligne" });
    E.cheveux = cree(E.corps, "path", { class: "pe-trait" });
    E.meche = cree(E.corps, "path", { class: "pe-ligne", fill: "none" });
    // Accessoires de tête.
    E.lunettes = cree(E.corps, "path", { class: "pe-ligne", fill: "rgba(255,255,255,.28)" });
    E.bonnet = cree(E.corps, "path", { class: "pe-trait", fill: "#2f6fb0" });
    E.pompon = cree(E.corps, "circle", { class: "pe-trait", fill: "#f4f4f4" });
    E.bord = cree(E.corps, "path", { class: "pe-trait", fill: "#e8cd7e" });
    E.calotteChapeau = cree(E.corps, "path", { class: "pe-trait", fill: "#e8cd7e" });
    E.ruban = cree(E.corps, "path", { fill: "#8a5a2b" });
    E.arceau = cree(E.corps, "path", { class: "pe-ligne", stroke: "#2b2f36" });
    E.ecouteurs = cree(E.corps, "path", { class: "pe-trait", fill: "#2b2f36" });
    E.micro = cree(E.corps, "path", { class: "pe-ligne", stroke: "#2b2f36" });
    E.microBout = cree(E.corps, "circle", { fill: "#2b2f36" });
    E.etiquette = cree(calqueHaut || calque, "text", { class: "pe-etiquette" });
    this.g = g; this.E = E;
  }

  /* Dessine le personnage à l’âge a (années), pieds au point (x, y).
     phase = cycle de marche, mouv = 0 (arrêt) → 1 (marche), vue = face | dos | droite | gauche, sx = largeur apparente (demi-tour). */
  Figure.prototype.dessiner = function (a, x, y, phase, annee, mouv, vue, sx, tenue) {
    var E = this.E, P = parametres(a);
    // Tenue : mélange de la tenue a vers la tenue b (t), couleurs et accessoires interpolés.
    var TA = TENUES[tenue && tenue.a] || {}, TB = TENUES[tenue && tenue.b] || {}, tt = tenue ? tenue.t : 0;
    function mixC(cle, def) { var ca = TA[cle] ? rgb(TA[cle]) : def, cb = TB[cle] ? rgb(TB[cle]) : def; return ca.map(function (v, i) { return v + (cb[i] - v) * tt; }); }
    function mixN(cle, def) { var va = TA[cle] != null ? TA[cle] : def, vb = TB[cle] != null ? TB[cle] : def; return va + (vb - va) * tt; }
    P.haut = mixC("haut", P.haut); P.bas = mixC("bas", P.bas); P.chaussure = mixC("chaussure", P.chaussure);
    var brasC = mixC("bras", P.haut);
    P.manche = mixN("manche", P.manche); P.pantalon = mixN("pantalon", P.pantalon);
    var X = {}; ACCESSOIRES.forEach(function (k) { X[k] = mixN(k, 0); });
    var colTenue = mixN("chemise", lisse(17, 23, a));
    this.g.setAttribute("data-tenue", tt < .5 ? (tenue && tenue.a) || "" : tenue.b);
    this.g.setAttribute("data-fondu", tt > .02 && tt < .98 && TA !== TB ? "1" : "0");
    var profil = vue === "droite" || vue === "gauche", dos = vue === "dos", face = !profil && !dos;
    var H = P.taille, hh = P.tete * H, hw = hh * P.ratio, cou = P.cou * H, th = P.torse * H;
    var lange = 1 - lisse(.6, 1.8, a), marche = 1 - lange;
    var lw = Math.max(3, P.jambe * H), aw = lw * .86;
    var jambe = Math.max(0, H - hh * .94 - cou - th);
    var hanche = -jambe, epaule = hanche - th, teteY = epaule - cou - hh * .46;
    var sw = P.epaules * H / 2, hw2 = sw * .74 + P.ventre * H * .04;
    var amp = marche * mouv * (.55 + .45 * lisse(2, 7, a)); // bambin : petits pas
    var haut = teint(P.haut), basC = teint(P.bas), cheveux = teint(P.cheveux);
    function teint(c, k) { return teinte(c, k); }
    this.g.setAttribute("transform", "translate(" + f(x) + "," + f(y) + ")");
    this.g.setAttribute("data-vue", vue);
    E.pivot.setAttribute("transform", "scale(" + f((vue === "gauche" ? -1 : 1) * Math.max(.06, sx)) + ",1)");
    attrs(E.ombre, { cx: 0, cy: 0, rx: H * (profil ? .24 : .2), ry: Math.max(1.6, H * .03) });

    /* ---- Jambes : genou articulé, jamais croisées ---- */
    var pieds = [], genoux = [], hx = [], bond = 0, L2 = jambe / 2;
    [-1, 1].forEach(function (k, n) {
      var ph = phase + (k < 0 ? Math.PI : 0);
      if (profil) {
        // Cuisse qui oscille d’avant en arrière ; genou qui fléchit au décollement du pied puis se tend avant l’appui.
        var al = .44 * amp * Math.sin(ph), be = .8 * amp * Math.max(0, Math.cos(ph + .45));
        var kx = L2 * Math.sin(al), ky = hanche + L2 * Math.cos(al);
        hx[n] = 0; genoux[n] = [kx, ky]; pieds[n] = [kx + L2 * Math.sin(al - be), ky + L2 * Math.cos(al - be)];
      } else {
        // De face ou de dos : chaque jambe reste de son côté et se lève à tour de rôle (genou qui monte).
        var leve = Math.max(0, Math.sin(ph)) * amp, h0 = k * hw2 * .52;
        var fy = -leve * jambe * .26;
        hx[n] = h0; pieds[n] = [h0 + k * .3, fy]; genoux[n] = [h0 + k * leve * lw * .3, hanche + (fy - hanche) * .5 + leve * jambe * .04];
      }
    });
    if (profil) bond = -Math.max(pieds[0][1], pieds[1][1]); // le pied d’appui reste au sol
    else {
      bond = -Math.abs(Math.sin(phase)) * H * .014 * amp;
      pieds.forEach(function (p) { p[1] -= bond; }); genoux.forEach(function (p) { p[1] -= bond * .5; });
    }
    var bal = Math.sin(phase * .5) * 3.5 * lange * mouv; // nourrisson : léger bercement
    E.corps.setAttribute("transform", "translate(0," + f(bond) + ") rotate(" + f(bal) + ")");
    [-1, 1].forEach(function (k, n) {
      var J = E[k < 0 ? "jambeG" : "jambeD"], arriere = profil && k < 0;
      var pts = [[hx[n], hanche], genoux[n], pieds[n]], c = coupe(pts, P.pantalon);
      poly(J.contour, pts); J.contour.setAttribute("stroke-width", f(lw + 2.2));
      poly(J.tissu, c[0]); J.tissu.setAttribute("stroke", teint(P.bas, arriere ? .82 : 1)); J.tissu.setAttribute("stroke-width", f(lw));
      poly(J.peau, c[1]); J.peau.setAttribute("stroke-width", f(lw)); J.peau.setAttribute("opacity", P.pantalon > .98 ? 0 : 1);
      J.peau.setAttribute("stroke", arriere ? "#e6c3a6" : PEAU);
      var C = E[k < 0 ? "chausG" : "chausD"], p = pieds[n];
      if (profil) {
        // Chaussure vue de côté : pointe vers l’avant, légèrement inclinée avec le tibia.
        var inc = Math.atan2(p[0] - genoux[n][0], p[1] - genoux[n][1]) * 180 / Math.PI * .35;
        attrs(C, { cx: p[0] + lw * .42, cy: p[1] - lw * .36, rx: lw * 1.12, ry: lw * .56, transform: "rotate(" + f(-inc) + " " + f(p[0]) + " " + f(p[1]) + ")" });
      } else attrs(C, { cx: p[0] + k * lw * .25, cy: p[1] - lw * .32, rx: lw * .88, ry: lw * (dos ? .5 : .58), transform: "" });
      C.setAttribute("fill", teint(P.chaussure, arriere ? .85 : 1));
    });

    /* ---- Bras : balancement opposé à la jambe du même côté ---- */
    var mains = {}, bras = th * (.9 + .12 * lisse(3, 16, a)), Lb = bras * .5, d = profil ? sw * .56 + P.ventre * H * .02 : sw;
    [-1, 1].forEach(function (k) {
      var B = E[k < 0 ? "brasG" : "brasD"], ph = phase + (k < 0 ? 0 : Math.PI), av = Math.sin(ph) * amp, pts;
      if (profil) {
        var ex = -d * .12, ey = epaule + aw * .7, ga = .55 * av, fl = .22 + .35 * Math.max(0, av);
        var cx = ex + Lb * Math.sin(ga), cy = ey + Lb * Math.cos(ga);
        pts = [[ex, ey], [cx, cy], [cx + Lb * Math.sin(ga + fl), cy + Lb * Math.cos(ga + fl)]];
      } else {
        var sx0 = k * (sw - aw * .15), sy0 = epaule + aw * .75, coude = [sx0 + k * bras * (.07 + .04 * Math.max(0, -av)), sy0 + Lb * (1 - .08 * Math.max(0, av))];
        // Bras qui part vers l’avant : l’avant-bras se raccourcit et la main remonte un peu.
        pts = [[sx0, sy0], coude, [coude[0] + k * bras * .04 - k * Math.max(0, av) * bras * .05, coude[1] + Lb * (1 - .5 * Math.max(0, av))]];
      }
      if (k > 0 && X.plateau > .01) { // serveur : avant-bras relevé qui porte le plateau
        var s0 = pts[0], pose = profil ? [s0, [s0[0] + Lb * .12, s0[1] + Lb * .95], [s0[0] + Lb * .98, s0[1] + Lb * .72]]
          : [s0, [s0[0] + bras * .1, s0[1] + Lb * .92], [s0[0] + bras * .32, s0[1] + Lb * .5]];
        pts = pts.map(function (q, i) { return [q[0] + (pose[i][0] - q[0]) * X.plateau, q[1] + (pose[i][1] - q[1]) * X.plateau]; });
      }
      mains[k] = pts[2];
      var arriere = profil && k < 0, c = coupe(pts, P.manche);
      poly(B.contour, pts); B.contour.setAttribute("stroke-width", f(aw + 2.2));
      poly(B.tissu, c[0]); B.tissu.setAttribute("stroke", teint(brasC, arriere ? .82 : 1)); B.tissu.setAttribute("stroke-width", f(aw));
      poly(B.peau, c[1]); B.peau.setAttribute("stroke-width", f(aw)); B.peau.setAttribute("opacity", P.manche > .98 ? 0 : 1);
      B.peau.setAttribute("stroke", arriere ? "#e6c3a6" : PEAU);
      var M = E[k < 0 ? "mainG" : "mainD"], m = pts[2]; attrs(M, { cx: m[0], cy: m[1], r: aw * .62 });
      var gant = rgb(PEAU).map(function (v, i) { return v + ([201, 138, 58][i] - v) * Math.min(1, X.gants); });
      M.setAttribute("fill", teint(gant, arriere ? .92 : 1));
    });

    /* ---- Torse : trapèze arrondi ; de profil, plus étroit avec le ventre vers l’avant ---- */
    var r = Math.min(d * .55, th * .35), v = P.ventre * H * .07, bas = hanche + lw * .3 + X.blouse * jambe * .3, hb = (profil ? d * .9 : hw2) * (1 + .12 * X.blouse);
    var vg = profil ? v * .2 : v, vd = v;
    E.torse.setAttribute("d", "M" + f(-d) + "," + f(epaule + r) + "Q" + f(-d) + "," + f(epaule) + " " + f(-d + r) + "," + f(epaule) +
      "L" + f(d - r) + "," + f(epaule) + "Q" + f(d) + "," + f(epaule) + " " + f(d) + "," + f(epaule + r) +
      "C" + f(d + vd) + "," + f(epaule + th * .55) + " " + f(hb + vd * .6) + "," + f(hanche - th * .1) + " " + f(hb) + "," + f(bas) +
      "L" + f(-hb) + "," + f(bas) + "C" + f(-hb - vg * .6) + "," + f(hanche - th * .1) + " " + f(-d - vg) + "," + f(epaule + th * .55) + " " + f(-d) + "," + f(epaule + r) + "Z");
    E.torse.setAttribute("fill", haut);

    /* ---- Chemise de l’adulte : col et boutons en fondu, adaptés à la vue ---- */
    var nw = hw * .2, col = Math.max(0, Math.min(1, colTenue)), bR = Math.max(.6, hh * .045);
    E.chemise.setAttribute("opacity", f(col)); voir(E.chemise, col > .01);
    E.colG.setAttribute("fill", haut); E.colD.setAttribute("fill", haut);
    voir(E.encolure, face); voir(E.colD, face); E.encolure.setAttribute("opacity", f(1 - Math.max(X.cravate, X.noeud))); voir(E.bouton1, !dos); voir(E.bouton2, !dos);
    if (face) {
      E.encolure.setAttribute("d", "M" + f(-nw * 1.2) + "," + f(epaule) + "L0," + f(epaule + hh * .26) + "L" + f(nw * 1.2) + "," + f(epaule) + "Z");
      E.colG.setAttribute("d", "M" + f(-nw * 1.25) + "," + f(epaule - .4) + "L" + f(-nw * 2.3) + "," + f(epaule + hh * .14) + "L" + f(-hh * .03) + "," + f(epaule + hh * .25) + "Z");
      E.colD.setAttribute("d", "M" + f(nw * 1.25) + "," + f(epaule - .4) + "L" + f(nw * 2.3) + "," + f(epaule + hh * .14) + "L" + f(hh * .03) + "," + f(epaule + hh * .25) + "Z");
      attrs(E.bouton1, { cx: 0, cy: epaule + th * .5, r: bR }); attrs(E.bouton2, { cx: 0, cy: epaule + th * .76, r: bR });
    } else if (dos) {
      // Col vu de dos : simple bande au-dessus des épaules.
      E.colG.setAttribute("d", "M" + f(-nw * 1.7) + "," + f(epaule + .6) + "Q0," + f(epaule + hh * .07) + " " + f(nw * 1.7) + "," + f(epaule + .6) +
        "L" + f(nw * 1.35) + "," + f(epaule - hh * .1) + "Q0," + f(epaule - hh * .05) + " " + f(-nw * 1.35) + "," + f(epaule - hh * .1) + "Z");
    } else {
      E.colG.setAttribute("d", "M" + f(nw * .1) + "," + f(epaule - hh * .06) + "L" + f(nw * 1.9) + "," + f(epaule + hh * .2) + "L" + f(nw * 1.5) + "," + f(epaule - .3) + "Z");
      attrs(E.bouton1, { cx: d * .6, cy: epaule + th * .5, r: bR }); attrs(E.bouton2, { cx: d * .6 + vd * .4, cy: epaule + th * .76, r: bR });
    }

    /* ---- Lange ---- */
    var lHaut = teteY + hh * .28, lrx = Math.max(hw * .52, sw + 1.5) * (profil ? .86 : 1), lry = (0 - lHaut) / 2, lcy = lHaut + lry;
    E.lange.setAttribute("opacity", f(lange)); voir(E.lange, lange > .01);
    [E.cocon, E.clipLange].forEach(function (n) { attrs(n, { cx: 0, cy: lcy, rx: lrx, ry: lry }); });
    var b1 = lHaut + lry * .45, b2 = lHaut + lry * 1.15, e = lry * .32;
    E.bande.setAttribute("d", "M" + f(-lrx - 2) + "," + f(b1) + "L" + f(lrx + 2) + "," + f(b2) + "L" + f(lrx + 2) + "," + f(b2 + e) + "L" + f(-lrx - 2) + "," + f(b1 + e) + "Z");
    E.bande2.setAttribute("d", "M" + f(-lrx - 2) + "," + f(b1) + "L" + f(lrx + 2) + "," + f(b2) + "M" + f(lrx + 2) + "," + f(b2 + e) + "L" + f(-lrx - 2) + "," + f(b1 + e));

    /* ---- Cou, oreilles, tête ---- */
    var tx = profil ? hw * .03 : 0;
    attrs(E.cou, { x: profil ? -nw * .9 : -nw, y: epaule - cou - hh * .1, width: 2 * nw * (profil ? 1.05 : 1), height: cou + hh * .1 + .8, opacity: marche });
    voir(E.oreilleG, !profil); voir(E.oreilleD, !profil); voir(E.oreilleP, profil);
    [-1, 1].forEach(function (k) { attrs(E[k < 0 ? "oreilleG" : "oreilleD"], { cx: k * hw * .49, cy: teteY + hh * .05, r: hh * .11 }); });
    attrs(E.tete, { cx: tx, cy: teteY, rx: hw / 2, ry: hh / 2 });
    var ox = -hw * .07, oy = teteY + hh * .06, orx = hh * .085, ory = hh * .12;
    E.oreilleP.setAttribute("d", "M" + f(ox + orx * .6) + "," + f(oy - ory) + "C" + f(ox - orx * 1.4) + "," + f(oy - ory * 1.2) + " " + f(ox - orx * 1.4) + "," + f(oy + ory * 1.2) + " " + f(ox + orx * .6) + "," + f(oy + ory) + "Z");

    // Barbe courte : apparaît entre 17 et 25 ans, s’épaissit légèrement ensuite ; jamais visible de dos.
    var barbe = lisse(17, 25, a) * (.85 + .15 * lisse(28, 44, a)), xb = hw / 2 + .4, yb = teteY + hh * .15;
    E.barbe.setAttribute("opacity", f(barbe)); voir(E.barbe, barbe > .01 && !dos);
    E.barbe.setAttribute("fill", cheveux);
    if (profil) {
      var fr = tx + hw * .5;
      E.barbe.setAttribute("d", "M" + f(-hw * .14) + "," + f(teteY + hh * .04) + "L" + f(hw * .02) + "," + f(teteY + hh * .04) +
        "Q" + f(hw * .1) + "," + f(teteY + hh * .2) + " " + f(fr - hw * .1) + "," + f(teteY + hh * .21) + "L" + f(fr + .6) + "," + f(teteY + hh * .26) +
        "Q" + f(fr + .4) + "," + f(teteY + hh * .5 + barbe) + " " + f(hw * .1) + "," + f(teteY + hh * .5 + barbe * .6) +
        "Q" + f(-hw * .22) + "," + f(teteY + hh * .42) + " " + f(-hw * .14) + "," + f(teteY + hh * .04) + "Z");
      attrs(E.levres, { cx: fr - hw * .1, cy: teteY + hh * .31, rx: hw * .09, ry: hh * .055, opacity: barbe });
    } else {
      E.barbe.setAttribute("d", "M" + f(-xb) + "," + f(yb) + "A" + f(xb) + "," + f(hh / 2 + .8 + barbe * .8) + " 0 0 0 " + f(xb) + "," + f(yb) +
        "L" + f(xb - hw * .14) + "," + f(yb) + "Q" + f(hw * .28) + "," + f(teteY + hh * .24) + " " + f(hw * .15) + "," + f(teteY + hh * .23) +
        "Q0," + f(teteY + hh * .18) + " " + f(-hw * .15) + "," + f(teteY + hh * .23) + "Q" + f(-hw * .28) + "," + f(teteY + hh * .24) + " " + f(-xb + hw * .14) + "," + f(yb) + "Z");
      attrs(E.levres, { cx: 0, cy: teteY + hh * .31, rx: hw * .14, ry: hh * .065, opacity: barbe });
    }
    voir(E.levres, !dos);

    // Visage souriant (yeux plissés comme les repères illustrés du CV) ; un seul œil de profil, aucun de dos.
    var ey = teteY + hh * .06, ew = hw * .115, lt = Math.max(.75, hh * .05), my = teteY + hh * .28;
    voir(E.oeilG, !dos); voir(E.oeilD, face); voir(E.joueG, !dos); voir(E.joueD, face); voir(E.nez, !dos); voir(E.bouche, !dos);
    [-1, 1].forEach(function (k) {
      var O = E[k < 0 ? "oeilG" : "oeilD"], cx = profil ? tx + hw * .25 : k * hw * .2, w0 = profil ? ew * .9 : ew;
      O.setAttribute("d", "M" + f(cx - w0) + "," + f(ey) + "Q" + f(cx) + "," + f(ey - w0 * 1.15) + " " + f(cx + w0) + "," + f(ey)); O.setAttribute("stroke-width", f(lt));
      attrs(E[k < 0 ? "joueG" : "joueD"], { cx: profil ? tx + hw * .19 : k * hw * .3, cy: teteY + hh * .2, r: hh * .075, opacity: .65 - .25 * barbe });
    });
    if (profil) {
      // Nez en petite bosse qui dépasse du contour du visage.
      var nx = tx + hw * .46, ny = teteY + hh * .1;
      E.nez.setAttribute("d", "M" + f(nx) + "," + f(ny - hh * .08) + "Q" + f(nx + hh * .2) + "," + f(ny + hh * .06) + " " + f(nx - hh * .01) + "," + f(ny + hh * .09) + "Z");
      E.nez.setAttribute("fill", PEAU); E.nez.setAttribute("class", "pe-trait");
      E.bouche.setAttribute("d", "M" + f(tx + hw * .28) + "," + f(my + hh * .01) + "Q" + f(tx + hw * .38) + "," + f(my + hh * .05) + " " + f(tx + hw * .45) + "," + f(my - hh * .02));
    } else {
      var rn = hh * .045, rn2 = hh * .032, cyN = teteY + hh * .17;
      E.nez.setAttribute("d", "M" + f(-rn) + "," + f(cyN) + "A" + f(rn) + "," + f(rn2) + " 0 1 0 " + f(rn) + "," + f(cyN) + "A" + f(rn) + "," + f(rn2) + " 0 1 0 " + f(-rn) + "," + f(cyN) + "Z");
      E.nez.setAttribute("fill", NEZ); E.nez.setAttribute("class", "");
      E.bouche.setAttribute("d", "M" + f(-hw * .1) + "," + f(my) + "Q0," + f(my + hh * .085) + " " + f(hw * .1) + "," + f(my));
    }
    E.bouche.setAttribute("stroke-width", f(lt));

    // Cheveux : calotte qui gagne en volume, mèche plus marquée à l’adolescence ; petite boucle du nourrisson.
    var vol = lisse(.4, 3, a), hautT = teteY - hh / 2, yc = hautT + P.calotte * hh, m = hh * P.meche * .25;
    var rx = hw / 2 + 1.1 * vol, ry = hh / 2 + 1.2 * vol + hh * .06 * vol;
    E.cheveux.setAttribute("fill", cheveux); E.cheveux.setAttribute("opacity", f(lisse(.3, 1.4, a)));
    if (face) {
      var ys = yc + (teteY - hh * .03 - yc) * lisse(.8, 3, a), q = Math.max(0, 1 - Math.pow((ys - teteY) / ry, 2)), xs = rx * Math.sqrt(q);
      E.cheveux.setAttribute("d", "M" + f(-xs) + "," + f(ys) + "A" + f(rx) + "," + f(ry) + " 0 0 1 " + f(xs) + "," + f(ys) +
        "L" + f(xs - hw * .1) + "," + f(ys) + "Q" + f(hw * .33) + "," + f(yc - m * .1) + " " + f(hw * .12) + "," + f(yc + m * .35) +
        "Q0," + f(yc + m) + " " + f(-hw * .12) + "," + f(yc + m * .2) + "Q" + f(-hw * .35) + "," + f(yc - m * .1) + " " + f(-xs + hw * .1) + "," + f(ys) + "Z");
    } else if (dos) {
      // De dos : la chevelure couvre l’arrière du crâne jusqu’à la nuque.
      var yn = teteY + hh * (.06 + .2 * vol), tn = Math.asin(Math.max(-1, Math.min(1, (teteY - yn) / ry)));
      var A = arc(0, teteY, rx, ry, tn, Math.PI - tn, 24);
      E.cheveux.setAttribute("d", ptsD(A) + "Q" + f(-hw * .2) + "," + f(yn + hh * .02) + " 0," + f(yn + hh * .07) + "Q" + f(hw * .2) + "," + f(yn + hh * .02) + " " + f(A[0][0]) + "," + f(A[0][1]) + "Z");
    } else {
      // De profil : de la frange jusqu’à la nuque, l’oreille reste dégagée.
      var yf = yc + m * .1, tf = Math.asin(Math.max(-1, Math.min(1, (teteY - yf) / ry))) + .08;
      var ynP = teteY + hh * (.04 + .2 * vol), tb = Math.PI + Math.asin(Math.max(-1, Math.min(1, (ynP - teteY) / ry)));
      var B2 = arc(tx, teteY, rx, ry, tf, tb, 26), dep = B2[0];
      E.cheveux.setAttribute("d", ptsD(B2) + "L" + f(-hw * .2) + "," + f(teteY + hh * .1) + "Q" + f(-hw * .04) + "," + f(teteY - hh * .14) + " " + f(hw * .12) + "," + f(yc + m * .55) +
        "Q" + f(hw * .26) + "," + f(yc + m * .25) + " " + f(dep[0]) + "," + f(dep[1]) + "Z");
    }
    E.meche.setAttribute("stroke", cheveux); E.meche.setAttribute("stroke-width", f(hh * .06));
    E.meche.setAttribute("opacity", f(1 - lisse(.6, 2, a)));
    E.meche.setAttribute("d", "M" + f(-hw * .08) + "," + f(hautT + hh * .16) + "Q" + f(hw * .02) + "," + f(hautT - hh * .02) + " " + f(hw * .16) + "," + f(hautT + hh * .06) +
      "Q" + f(hw * .06) + "," + f(hautT + hh * .1) + " " + f(hw * .02) + "," + f(hautT + hh * .2));

    /* ---- Tenues : habits et accessoires en fondu, dessinés pour chaque vue ---- */
    var u = lw, sb = lw * .22, yb0 = epaule + th * .36;
    function Z(pts) { return ptsD(pts) + "Z"; }
    function rect(x0, y0, x1, y1) { return Z([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]); }
    function ell(cx, cy, rx, ry) { return "M" + f(cx - rx) + "," + f(cy) + "A" + f(rx) + "," + f(ry) + " 0 1 0 " + f(cx + rx) + "," + f(cy) + "A" + f(rx) + "," + f(ry) + " 0 1 0 " + f(cx - rx) + "," + f(cy) + "Z"; }
    function op(n, w, ok, dessin) {
      var on = w > .01 && ok !== false; voir(n, on);
      if (on) { n.setAttribute("opacity", f(Math.min(1, w))); if (dessin != null) n.setAttribute("d", dessin); }
    }
    // Salopette : bavette et bretelles (croisées de dos).
    E.salopette.setAttribute("fill", teint(P.bas));
    op(E.salopette, X.salopette, true, face
      ? Z([[-d * .55, yb0], [d * .55, yb0], [hb, bas], [-hb, bas]]) + Z([[-d * .64, epaule + .5], [-d * .64 + sb * 2, epaule + .5], [-d * .5 + sb * 2, yb0], [-d * .5, yb0]]) +
        Z([[d * .64, epaule + .5], [d * .64 - sb * 2, epaule + .5], [d * .5 - sb * 2, yb0], [d * .5, yb0]])
      : dos ? Z([[-d * .62, epaule + .5], [-d * .62 + sb * 2, epaule + .5], [d * .6, hanche - th * .2], [d * .6 - sb * 2, hanche - th * .2]]) +
        Z([[d * .62, epaule + .5], [d * .62 - sb * 2, epaule + .5], [-d * .6, hanche - th * .2], [-d * .6 + sb * 2, hanche - th * .2]]) +
        Z([[-hb * 1.06, hanche - th * .22], [hb * 1.06, hanche - th * .22], [hb, bas], [-hb, bas]])
      : Z([[-d * .05, yb0], [d * .98 + vd * .5, yb0], [hb + vd * .4, bas], [-hb, bas], [-hb, hanche - th * .2], [-d * .05, hanche - th * .2]]) +
        Z([[-d * .05, yb0], [-d * .05 + sb * 2, yb0], [-d * .3 + sb * 2, epaule + .5], [-d * .3, epaule + .5]]));
    // Gilet sans manches du serveur.
    op(E.gilet, X.gilet, true, face
      ? Z([[-d * .96, epaule + th * .1], [-nw * 1.15, epaule + .4], [0, epaule + th * .5], [nw * 1.15, epaule + .4], [d * .96, epaule + th * .1], [hb + vd * .3, bas], [0, bas + lw * .5], [-hb - vd * .3, bas]])
      : dos ? Z([[-d * .96, epaule + th * .08], [d * .96, epaule + th * .08], [hb + vd * .3, bas], [-hb - vd * .3, bas]])
      : Z([[-d * .96, epaule + th * .08], [d * .25, epaule + .4], [d * .95 + vd * .5, epaule + th * .5], [hb + vd * .4, bas + lw * .4], [-hb, bas]]));
    // Veste ouverte (gérant, commercial) : pans de part et d’autre de la chemise ; manches de la même couleur.
    E.veste.setAttribute("fill", teint(mixC("vesteC", [58, 74, 94])));
    var vb = bas + lw * .6;
    op(E.veste, X.veste, true, face
      ? Z([[-d - .3, epaule + r * .4], [-d + r, epaule - .3], [-nw * 1.25, epaule - .3], [-nw * .55, epaule + th * .45], [-hb * .42, vb], [-hb - vd * .6 - .3, vb], [-d - vd - .3, epaule + th * .55]]) +
        Z([[d + .3, epaule + r * .4], [d - r, epaule - .3], [nw * 1.25, epaule - .3], [nw * .55, epaule + th * .45], [hb * .42, vb], [hb + vd * .6 + .3, vb], [d + vd + .3, epaule + th * .55]])
      : dos ? Z([[-d - .3, epaule + r * .4], [-d + r, epaule - .3], [d - r, epaule - .3], [d + .3, epaule + r * .4], [d + vd + .3, epaule + th * .55], [hb + vd * .6 + .3, vb], [-hb - vd * .6 - .3, vb], [-d - vd - .3, epaule + th * .55]])
      : Z([[-d - .3, epaule + r * .4], [-d + r, epaule - .3], [d * .4, epaule - .3], [d * .62 + vd * .3, epaule + th * .45], [hb * .75 + vd * .4, vb], [-hb - .3, vb], [-d - vg - .3, epaule + th * .55]]));
    // Liseré d’encolure de la tunique de soignant.
    E.lisere.setAttribute("stroke", teint(mixC("lisereC", [159, 195, 207]))); E.lisere.setAttribute("stroke-width", f(lw * .34));
    op(E.lisere, X.lisere, true, face ? ptsD([[-nw * 1.45, epaule + .3], [0, epaule + hh * .4], [nw * 1.45, epaule + .3]])
      : dos ? ptsD([[-nw * 1.6, epaule + .5], [0, epaule + hh * .07], [nw * 1.6, epaule + .5]]) : ptsD([[d * .1, epaule + .3], [d * .85, epaule + hh * .34]]));
    // Cravate, nœud papillon, badge : vus de face ou de profil seulement.
    E.cravate.setAttribute("fill", teint(mixC("cravateC", [168, 61, 61])));
    op(E.cravate, X.cravate, !dos, face
      ? Z([[-nw * .4, epaule + .3], [nw * .4, epaule + .3], [nw * .22, epaule + hh * .13], [nw * .55, epaule + th * .6], [0, epaule + th * .72], [-nw * .55, epaule + th * .6], [-nw * .22, epaule + hh * .13]])
      : Z([[d * .5, epaule + .3], [d * .8, epaule + .3], [d * 1.0 + vd * .4, epaule + th * .6], [d * .8 + vd * .4, epaule + th * .7]]));
    var yn0 = epaule + hh * .05;
    op(E.noeud, X.noeud, !dos, face
      ? Z([[0, yn0], [-nw * 1.15, yn0 - hh * .075], [-nw * 1.15, yn0 + hh * .075]]) + Z([[0, yn0], [nw * 1.15, yn0 - hh * .075], [nw * 1.15, yn0 + hh * .075]])
      : Z([[d * .5, yn0], [d * .98, yn0 - hh * .08], [d * .98, yn0 + hh * .08]]));
    E.badge.setAttribute("fill", teint(mixC("badgeC", [143, 179, 201])));
    var by = epaule + th * .24;
    op(E.badge, X.badge, !dos, face ? rect(d * .22, by, d * .22 + hh * .26, by + hh * .17) : rect(d * .3, by, d * .3 + hh * .15, by + hh * .17));
    // Cartable de l’écolier : sur le dos, bretelles visibles de face et de profil.
    op(E.cartableDos, X.cartable, dos, rect(-d * .72, epaule + th * .1, d * .72, epaule + th * .84) + rect(-d * .72, epaule + th * .1, d * .72, epaule + th * .36));
    op(E.cartableArr, X.cartable, profil, rect(-d - th * .38, epaule + th * .08, -d + 1, epaule + th * .82));
    E.bretelles.setAttribute("stroke-width", f(lw * .38));
    op(E.bretelles, X.cartable, !dos, face ? ptsD([[-d * .62, epaule + .5], [-d * .56, epaule + th * .62]]) + ptsD([[d * .62, epaule + .5], [d * .56, epaule + th * .62]])
      : ptsD([[-d * .2, epaule + .3], [d * .55, epaule + th * .32], [d * .25, epaule + th * .58]]));
    // Objets tenus dans la main avant (vus de chant quand le personnage est de face ou de dos).
    var mn = mains[1] || [0, 0], wf = profil ? 1 : .42;
    E.objet.setAttribute("transform", "translate(" + f(mn[0]) + "," + f(mn[1]) + ")");
    op(E.porteDoc, X.porteDoc, true, rect(-1.35 * u * wf, .45 * u, 1.35 * u * wf, 2.3 * u));
    op(E.dossier, X.dossier, true, rect(-1.05 * u * wf, .3 * u, 1.05 * u * wf, 2.45 * u) + rect(-.8 * u * wf, .3 * u, .9 * u * wf, .7 * u));
    op(E.laptop, X.laptop, true, rect(-1.5 * u * wf, .3 * u, 1.5 * u * wf, 2.2 * u));
    op(E.laptopLogo, X.laptop, profil); attrs(E.laptopLogo, { cx: 0, cy: 1.25 * u, r: .28 * u });
    op(E.marteauManche, X.marteau, true, rect(-.22 * u, -.1 * u, .22 * u, 2.3 * u));
    op(E.marteauTete, X.marteau, true, rect(-(profil ? .95 : .35) * u, 2.15 * u, (profil ? .7 : .35) * u, 2.8 * u));
    var wa = profil ? 1 : .7;
    op(E.arrosoir, X.arrosoir, true, rect(-1 * u * wa, 1 * u, 1 * u * wa, 2.6 * u) + Z([[1 * u * wa, 2.25 * u], [2.4 * u * wa, .85 * u], [2.7 * u * wa, 1 * u], [1 * u * wa, 1.8 * u]]));
    E.arrosoirAnse.setAttribute("stroke-width", f(.35 * u));
    op(E.arrosoirAnse, X.arrosoir, true, "M" + f(-.8 * u * wa) + "," + f(1 * u) + "Q0," + f(-.4 * u) + " " + f(.8 * u * wa) + "," + f(1 * u));
    // Cagette de vendange : raisins violets qui dépassent.
    var wp = profil ? 1 : .6;
    op(E.raisin, X.panier, true, ell(-.6 * u * wp, .55 * u, .5 * u * wp, .45 * u) + ell(.1 * u * wp, .4 * u, .5 * u * wp, .45 * u) + ell(.75 * u * wp, .6 * u, .45 * u * wp, .42 * u));
    op(E.panier, X.panier, true, rect(-1.5 * u * wp, .75 * u, 1.5 * u * wp, 2.1 * u) + "M" + f(-1.5 * u * wp) + "," + f(1.4 * u) + "L" + f(1.5 * u * wp) + "," + f(1.4 * u));
    op(E.plateau, X.plateau, true, ell(0, -.35 * u, 2 * u, .34 * u));
    op(E.verre, X.plateau, true, Z([[.1 * u, -2.2 * u], [1 * u, -2.2 * u], [.8 * u, -1.35 * u], [.3 * u, -1.35 * u]]) + rect(.48 * u, -1.35 * u, .62 * u, -.55 * u));
    // Tête : lunettes, bonnet, chapeau de paille, casque audio (micro de l’informaticien).
    var ox2 = -hw * .07, xL = tx + hw * .27, rL = hw * .125;
    E.lunettes.setAttribute("stroke-width", f(lt * .85));
    op(E.lunettes, X.lunettes, !dos, face ? ell(-hw * .2, ey, rL, rL * .85) + ell(hw * .2, ey, rL, rL * .85) + "M" + f(-hw * .2 + rL) + "," + f(ey) + "L" + f(hw * .2 - rL) + "," + f(ey)
      : ell(xL, ey, rL * .9, rL * .85) + "M" + f(xL - rL * .9) + "," + f(ey) + "L" + f(ox2 + hh * .05) + "," + f(ey - hh * .03));
    op(E.bonnet, X.bonnet, true, "M" + f(tx - hw * .57) + "," + f(teteY - hh * .1) + "A" + f(hw * .57) + "," + f(hh * .58) + " 0 0 1 " + f(tx + hw * .57) + "," + f(teteY - hh * .1) + "Z" +
      rect(tx - hw * .6, teteY - hh * .22, tx + hw * .6, teteY - hh * .06));
    op(E.pompon, X.bonnet); attrs(E.pompon, { cx: tx, cy: teteY - hh * .7, r: hh * .1 });
    var cxh = tx + (profil ? hw * .08 : 0), yBord = teteY - hh * .3;
    op(E.bord, X.chapeau, true, ell(cxh, yBord, hw * .98, hh * .1));
    op(E.calotteChapeau, X.chapeau, true, "M" + f(tx - hw * .42) + "," + f(yBord) + "L" + f(tx - hw * .37) + "," + f(teteY - hh * .66) + "Q" + f(tx) + "," + f(teteY - hh * .76) + " " + f(tx + hw * .37) + "," + f(teteY - hh * .66) + "L" + f(tx + hw * .42) + "," + f(yBord) + "Z");
    op(E.ruban, X.chapeau, true, rect(tx - hw * .41, teteY - hh * .43, tx + hw * .41, teteY - hh * .33));
    var cq = Math.min(1, X.casque + X.micro);
    E.arceau.setAttribute("stroke-width", f(hh * .08)); E.micro.setAttribute("stroke-width", f(hh * .045));
    op(E.arceau, cq, true, profil ? "M" + f(ox2) + "," + f(teteY - hh * .06) + "Q" + f(ox2 - hw * .04) + "," + f(hautT - hh * .1) + " " + f(tx + hw * .12) + "," + f(hautT - hh * .06)
      : "M" + f(-hw * .54) + "," + f(teteY - hh * .02) + "A" + f(hw * .56) + "," + f(hh * .6) + " 0 0 1 " + f(hw * .54) + "," + f(teteY - hh * .02));
    op(E.ecouteurs, cq, true, profil ? ell(ox2 - hw * .01, teteY + hh * .05, hh * .12, hh * .16) : ell(-hw * .54, teteY + hh * .04, hh * .09, hh * .15) + ell(hw * .54, teteY + hh * .04, hh * .09, hh * .15));
    var mic = profil ? [ox2, teteY + hh * .16, ox2 + hw * .1, teteY + hh * .44, tx + hw * .36, teteY + hh * .37] : [hw * .54, teteY + hh * .14, hw * .46, teteY + hh * .42, hw * .14, teteY + hh * .36];
    op(E.micro, X.micro, !dos, "M" + f(mic[0]) + "," + f(mic[1]) + "Q" + f(mic[2]) + "," + f(mic[3]) + " " + f(mic[4]) + "," + f(mic[5]));
    op(E.microBout, X.micro, !dos); attrs(E.microBout, { cx: mic[4], cy: mic[5], r: hh * .055 });

    // Étiquette discrète : année et âge, à droite de la tête (hors miroir).
    var age = Math.floor(a + 1e-6);
    E.etiquette.textContent = annee + " · " + (age < 1 ? "naissance" : age + (age > 1 ? " ans" : " an"));
    attrs(E.etiquette, { x: x + Math.max(sw, hw / 2) + 9, y: y + teteY + 4 });
  };

  /* ---------- Trajet : table des positions, de l’âge, de l’orientation et du soulèvement au-dessus des bulles ---------- */
  function table(o) {
    var L = o.trajet.getTotalLength(), pas = 3, N = Math.ceil(L / pas) + 1, X = [], Y = [];
    for (var i = 0; i < N; i++) { var p = o.trajet.getPointAtLength(Math.min(L, i * pas)); X.push(p.x); Y.push(p.y); }
    // Position (indice) de chaque jalon : premier passage au plus près, dans l’ordre du trajet.
    var depuis = 0, J = [];
    o.jalons.forEach(function (j, n) {
      var best = depuis, bd = 1e9;
      for (var k = depuis; k < N; k++) {
        var d = Math.hypot(X[k] - j.x, Y[k] - j.y);
        if (d < bd) { bd = d; best = k; } else if (bd < 4 && d > bd + 30) break;
      }
      if (n === o.jalons.length - 1) best = N - 1;
      var annee = Math.max(J.length ? J[J.length - 1].annee : j.annee, j.annee || 0);
      J.push({ i: best, annee: annee, bulle: !!j.bulle, id: j.id });
      depuis = best;
    });
    var annees = new Float32Array(N), leve = new Float32Array(N), poids = new Float32Array(N);
    for (var m = 0; m < J.length - 1; m++) {
      var a = J[m], b = J[m + 1];
      for (var k2 = a.i; k2 <= b.i; k2++) annees[k2] = a.annee + (b.annee - a.annee) * (b.i > a.i ? (k2 - a.i) / (b.i - a.i) : 1);
    }
    // Soulèvement : bosse douce (pente < 1) qui fait passer les pieds par-dessus chaque bulle.
    var Hb = o.rayon + 5, W = 1.6 * Hb / pas, bulles = J.filter(function (j) { return j.bulle; });
    for (var k3 = 0; k3 < N; k3++) {
      var l = 0;
      bulles.forEach(function (bb) { var u = Math.abs(k3 - bb.i) / W; if (u < 1) l = Math.max(l, Hb * Math.pow(Math.cos(u * Math.PI / 2), 2)); });
      leve[k3] = l;
      // Enfance plus lente (la descente avant le BAC) : plus de temps pour voir grandir l’enfant.
      // v2.31 : ralenti au passage de chaque bulle, le temps de voir la tenue.
      poids[k3] = (k3 < J[2].i ? 1.9 : 1) * (1 + .9 * l / Hb);
    }
    var cumul = new Float32Array(N);
    for (var k4 = 1; k4 < N; k4++) cumul[k4] = cumul[k4 - 1] + poids[k4];
    var T = { N: N, X: X, Y: Y, annees: annees, leve: leve, cumul: cumul, pas: pas, vues: orientations(X, Y, N) };
    tenues(T, bulles, W);
    return T;
  }

  /* Tenue par zone : enfant jusqu’à l’approche de la première bulle, puis tenue de chaque bulle jusqu’au début de la
     montée sur la suivante (il « enfile » la nouvelle tenue en y arrivant), tenue actuelle après la dernière ;
     fondu court sur FT points de part et d’autre de chaque frontière. W = demi-largeur de la bosse au-dessus d’une bulle. */
  function tenues(T, bulles, W) {
    var N = T.N, bornes = [], noms = ["enfant"], FT = 10;
    if (bulles.length) {
      bornes.push(Math.max(0, bulles[0].i - 45));
      bulles.forEach(function (bb, n) {
        noms.push(TENUE_ID[bb.id] || "actuelle");
        var suiv = bulles[n + 1];
        bornes.push(suiv ? Math.max((bb.i + suiv.i) / 2, suiv.i - W * .45) : bb.i + (N - 1 - bb.i) * .5);
      });
    }
    noms.push("actuelle");
    T.tA = new Array(N); T.tB = new Array(N); T.tT = new Float32Array(N);
    for (var k = 0, z = 0; k < N; k++) {
      while (z < bornes.length && k >= bornes[z]) z++;
      var a = noms[z], b = noms[z], t = 0;
      if (z < bornes.length && bornes[z] - k < FT) { b = noms[z + 1]; t = lisse(-FT, FT, k - bornes[z]); }
      else if (z > 0 && k - bornes[z - 1] < FT) { a = noms[z - 1]; t = lisse(-FT, FT, k - bornes[z - 1]); }
      T.tA[k] = a; T.tB[k] = b; T.tT[k] = t;
    }
  }

  /* Orientation selon la tangente du tracé (sans la bosse au-dessus des bulles) : descente = face, montée = dos,
     droite / gauche = profil. Hystérésis : on ne change d’axe que si la nouvelle direction domine nettement,
     puis les épisodes trop courts (ondulations entre bulles) sont absorbés par la vue précédente. */
  function orientations(X, Y, N) {
    var V = new Array(N), cour = null, F = 7, SEUIL = 1.7, MIN = 9;
    function axe(v) { return v === "droite" || v === "gauche" ? "h" : "v"; }
    for (var k = 0; k < N; k++) {
      var i0 = Math.max(0, k - F), i1 = Math.min(N - 1, k + F), dx = X[i1] - X[i0], dy = Y[i1] - Y[i0];
      var ax = Math.abs(dx), ay = Math.abs(dy);
      var cand = ax > ay ? (dx > 0 ? "droite" : "gauche") : (dy > 0 ? "face" : "dos");
      if (cour === null) cour = cand;
      else if (cand !== cour) {
        if (axe(cand) === axe(cour)) cour = cand;
        else if ((axe(cand) === "h" ? ax / (ay + 1e-6) : ay / (ax + 1e-6)) > SEUIL) cour = cand;
      }
      V[k] = cour;
    }
    for (var s = 1, debut = 0; s <= N; s++) {
      if (s === N || V[s] !== V[debut]) {
        if (debut > 0 && s - debut < MIN) for (var t = debut; t < s; t++) V[t] = V[debut - 1];
        debut = s;
      }
    }
    return V;
  }

  var FONDU = .8, ATTENTE_DEBUT = 1.4, MARCHE = 60, ATTENTE_FIN = 2.6, DEMI_TOUR = .32;
  var CYCLE = FONDU + ATTENTE_DEBUT + MARCHE + ATTENTE_FIN + FONDU;
  var actifs = [];

  /* ---------- Préférence « Animation : activée / désactivée » (mémorisée, mouvement réduit respecté) ---------- */
  var CLE = "cv-parcours-animation";
  function reduitSysteme() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  function lirePref() { try { return window.localStorage.getItem(CLE); } catch (e) { return null; } }
  function ecrirePref(v) { try { window.localStorage.setItem(CLE, v); } catch (e) { /* stockage indisponible : choix limité à la page */ } }
  var choixPage = null;
  function animationVoulue() {
    var p = choixPage || lirePref();
    if (p === "activee") return true;
    if (p === "desactivee") return false;
    return !reduitSysteme();
  }

  // v2.31 : bouton placé dans l’en-tête du Parcours, après la légende (repli : coin bas droit du cadre du chemin).
  function bascule(cadre, etat) {
    if (!cadre || !cadre.appendChild) return null;
    var b = document.createElement("button");
    b.type = "button"; b.className = "pe-bascule";
    var ic = document.createElementNS(NS, "svg");
    ic.setAttribute("viewBox", "0 0 16 16"); ic.setAttribute("class", "pe-bascule-icone"); ic.setAttribute("aria-hidden", "true"); ic.setAttribute("focusable", "false");
    var chemin = cree(ic, "path", {});
    var txt = document.createElement("span");
    b.appendChild(ic); b.appendChild(txt);
    function maj() {
      var on = etat.actif;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      txt.textContent = "Animation : " + (on ? "activée" : "désactivée");
      b.title = on ? "Mettre en pause l’animation du personnage" : "Relancer l’animation du personnage";
      chemin.setAttribute("d", on ? "M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" : "M4.5 2.3 13 8l-8.5 5.7z");
    }
    b.addEventListener("click", function () {
      etat.basculer(!etat.actif);
      choixPage = etat.actif ? "activee" : "desactivee";
      ecrirePref(choixPage);
      maj();
    });
    maj();
    etat.majBouton = maj;
    etat.placer = function () {
      if (b.isConnected) return;
      var tete = cadre.parentNode && cadre.parentNode.querySelector(".co-tete-parcours");
      if (tete) tete.appendChild(b);
      else { cadre.classList.add("pe-cadre"); cadre.appendChild(b); }
    };
    return b;
  }

  function animer(svg, o) {
    var etat = { svg: svg, horloge: 0, T: null, figure: null, arret: false, rafId: 0, attente: 0, phase: 0, dernier: -1, mouv: 0,
      vue: "face", vuePrec: "face", tour: 1, actif: animationVoulue() };
    actifs.push(etat);
    function arreter() {
      etat.arret = true; cancelAnimationFrame(etat.rafId); clearTimeout(etat.attente);
      document.removeEventListener("visibilitychange", visibilite);
      var i = actifs.indexOf(etat); if (i >= 0) actifs.splice(i, 1);
    }
    function pret() {
      if (etat.T) return true;
      try { etat.T = table(o); } catch (err) { return false; }
      etat.figure = new Figure(o.calque, o.etiquettes);
      return true;
    }
    // Demi-tour simulé : la silhouette s’amincit, change de vue à mi-course, puis reprend sa largeur.
    function orienter(cible, dt) {
      if (cible !== etat.vue) { etat.vuePrec = etat.tour < .5 ? etat.vuePrec : etat.vue; etat.vue = cible; etat.tour = dt == null ? 1 : 0; }
      if (dt != null) etat.tour = Math.min(1, etat.tour + dt / DEMI_TOUR);
      var t = etat.tour;
      return { vue: t < .5 ? etat.vuePrec : etat.vue, sx: t >= 1 ? 1 : Math.abs(Math.cos(Math.PI * t)) };
    }
    // Position à l’indice fractionnaire k.
    function poser(k, opacite, vue, dt) {
      var T = etat.T, i = Math.max(0, Math.min(T.N - 1, Math.floor(k))), j = Math.min(T.N - 1, i + 1), t = k - i;
      var x = T.X[i] + (T.X[j] - T.X[i]) * t, y = T.Y[i] + (T.Y[j] - T.Y[i]) * t - (o.surSpheres ? 0 : T.leve[i] + (T.leve[j] - T.leve[i]) * t);
      var annee = T.annees[i] + (T.annees[j] - T.annees[i]) * t, age = Math.max(0, annee - o.naissance);
      // Rangée du haut : la tête (et un éventuel chapeau) reste dans le cadre. 2.42 : avec surSpheres (chemin posé sur
      // le dessus des sphères, app.js/coherence.js), la bosse « leve » ne sert plus qu’au ralenti sur chaque bulle.
      y = Math.max(y, parametres(age).taille * 1.2 + 6);
      var or = orienter(vue || T.vues[i], dt);
      var ii = Math.round(k) >= T.N ? T.N - 1 : Math.round(k);
      etat.figure.dessiner(age, x, y, etat.phase, Math.floor(annee + 1e-6), etat.mouv, or.vue, or.sx, { a: T.tA[ii], b: T.tB[ii], t: T.tT[ii] });
      o.calque.setAttribute("opacity", opacite.toFixed(3));
      if (o.etiquettes) o.etiquettes.setAttribute("opacity", opacite.toFixed(3));
      return age;
    }
    function indicePour(u) { // u ∈ [0,1] de la marche → indice, à vitesse pondérée
      var T = etat.T, cible = u * T.cumul[T.N - 1], lo = 0, hi = T.N - 1;
      while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (T.cumul[mid] < cible) lo = mid; else hi = mid; }
      var d = T.cumul[hi] - T.cumul[lo];
      return lo + (d > 0 ? (cible - T.cumul[lo]) / d : 0);
    }
    function image(t, dt) {
      var c = t % CYCLE, k, op = 1, T = etat.T, vue = null;
      if (c < FONDU) { k = 0; op = c / FONDU; }
      else if (c < FONDU + ATTENTE_DEBUT) k = 0;
      else if (c < FONDU + ATTENTE_DEBUT + MARCHE) { var u = (c - FONDU - ATTENTE_DEBUT) / MARCHE; k = indicePour(u * u * (3 - 2 * u) * .04 + u * .96); }
      else if (c < CYCLE - FONDU) { k = T.N - 1; vue = c > FONDU + ATTENTE_DEBUT + MARCHE + .35 ? "face" : null; } // arrivé : se tourne vers le visiteur
      else { k = T.N - 1; op = (CYCLE - c) / FONDU; vue = "face"; }
      if (c < FONDU && etat.dernier > k) { etat.vue = etat.vuePrec = "face"; etat.tour = 1; } // nouveau tour
      // Cadence liée à la vitesse : un cycle de pas pour environ 1,7 longueur de jambe parcourue.
      if (etat.dernier >= 0 && k > etat.dernier) {
        var i = Math.min(T.N - 1, Math.floor(k)), age = Math.max(0, T.annees[i] - o.naissance);
        etat.phase += (k - etat.dernier) * T.pas * 2 * Math.PI / (1.7 * longueurJambe(age));
      }
      if (etat.dernier >= 0) etat.mouv += ((k > etat.dernier + 1e-3 ? 1 : 0) - etat.mouv) * .12;
      etat.dernier = k;
      poser(k, Math.max(0, Math.min(1, op)), vue, dt);
    }
    function immobile() { // animation désactivée : adulte de face, immobile à « Aujourd’hui »
      etat.phase = 0; etat.mouv = 0; etat.vue = etat.vuePrec = "face"; etat.tour = 1;
      poser(etat.T.N - 1, 1, "face", null);
    }
    function boucle(maintenant) {
      if (etat.arret) return;
      if (!svg.isConnected) { arreter(); return; }
      if (etat.placer) etat.placer();
      if (document.hidden) return; // reprise par visibilitychange
      // Chemin masqué (vue liste) : vérification espacée, sans faire avancer le temps.
      if (!svg.getBoundingClientRect().width) { etat.prec = null; etat.attente = setTimeout(function () { etat.rafId = requestAnimationFrame(boucle); }, 500); return; }
      if (!pret()) { etat.attente = setTimeout(function () { etat.rafId = requestAnimationFrame(boucle); }, 300); return; }
      if (!etat.actif) { immobile(); return; }
      var dt = etat.prec != null ? Math.min(.1, (maintenant - etat.prec) / 1000) : 0;
      if (!etat.fige) etat.horloge += dt;
      etat.prec = maintenant;
      if (!etat.fige) image(etat.horloge, dt);
      etat.rafId = requestAnimationFrame(boucle);
    }
    function visibilite() {
      if (etat.arret) return;
      cancelAnimationFrame(etat.rafId); clearTimeout(etat.attente); etat.prec = null;
      if (!document.hidden) etat.rafId = requestAnimationFrame(boucle);
    }
    document.addEventListener("visibilitychange", visibilite);
    etat.basculer = function (on) {
      etat.actif = !!on; etat.fige = false;
      cancelAnimationFrame(etat.rafId); clearTimeout(etat.attente); etat.prec = null;
      // Relance : départ presque immédiat de la marche (pas de fondu d’entrée).
      if (on) { etat.horloge = FONDU + ATTENTE_DEBUT - .4; etat.dernier = -1; etat.mouv = 0; etat.vue = etat.vuePrec = "face"; etat.tour = 1; }
      etat.rafId = requestAnimationFrame(boucle);
    };
    bascule(svg.parentNode, etat);
    etat.rafId = requestAnimationFrame(boucle);
    // Outil de contrôle : instant t du cycle ; fige = pose arrêtée sur une phase de marche lisible.
    etat.aller = function (t, fige, phase) {
      var c = t % CYCLE; etat.horloge = t; etat.dernier = -1;
      etat.mouv = c > FONDU + ATTENTE_DEBUT && c < FONDU + ATTENTE_DEBUT + MARCHE ? 1 : 0;
      etat.phase = phase != null ? phase : (fige ? 1.1 : etat.phase); etat.fige = !!fige;
      if (pret()) image(t, null);
    };
    return arreter;
  }

  window.Personnage = {
    animer: animer,
    // Outil de contrôle : place les personnages actifs à l’instant t (secondes du cycle).
    instant: function (t, fige, phase) { actifs.forEach(function (e) { e.aller(t, fige, phase); }); return actifs.length; },
    // Outil de contrôle : vue affichée et état de l’animation.
    etat: function () { return actifs.map(function (e) { return { vue: e.vue, actif: e.actif }; }); },
    cycle: CYCLE,
    // Outil de contrôle : planche de poses (âge, vue, phase) dans un groupe SVG donné.
    Figure: Figure
  };
})();
