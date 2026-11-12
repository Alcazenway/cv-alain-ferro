/* Personnage du parcours (v2.27) : Alain, du nourrisson emmailloté à l’adulte de 44 ans, avance sur tout le chemin.
   Dessin SVG paramétrique en illustration plate : chaque proportion (taille, tête, membres, cheveux, barbe, couleurs
   des vêtements) est interpolée en continu selon l’âge ; l’âge est lui-même interpolé entre les années des bulles. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var TRAIT = "#1f474b", PEAU = "#f6d8bd", JOUES = "#f0a08a", NEZ = "#cf7448";
  var LANGE = "#f5eee2", BANDE = "#b7a1cb";

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
    Object.keys(TEINTES).forEach(function (k) {
      var c0 = rgb(TEINTES[k][s.i]), c1 = rgb(TEINTES[k][s.i + 1]);
      P[k] = "rgb(" + c0.map(function (c, j) { return Math.round(c + (c1[j] - c) * s.t); }).join(",") + ")";
    });
    return P;
  }

  function cree(parent, tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    parent.appendChild(n);
    return n;
  }
  function f(n) { return Math.round(n * 100) / 100; }
  function trait(n, x1, y1, x2, y2) { n.setAttribute("d", "M" + f(x1) + "," + f(y1) + "L" + f(x2) + "," + f(y2)); }

  var compteur = 0;
  // Construit les éléments du personnage une fois ; dessiner() ne fait ensuite que changer leurs attributs.
  function Figure(calque, calqueHaut) {
    var id = "pe-lange-" + (++compteur);
    var g = cree(calque, "g", { class: "pe-personnage" });
    var E = {};
    E.ombre = cree(g, "ellipse", { class: "pe-ombre" });
    E.corps = cree(g, "g");
    ["jambeG", "jambeD"].forEach(function (k) {
      E[k] = { contour: cree(E.corps, "path", { class: "pe-membre-contour" }), bas: cree(E.corps, "path", { class: "pe-membre" }), peau: cree(E.corps, "path", { class: "pe-membre", stroke: PEAU }) };
    });
    E.chausG = cree(E.corps, "ellipse", { class: "pe-trait" }); E.chausD = cree(E.corps, "ellipse", { class: "pe-trait" });
    E.torse = cree(E.corps, "path", { class: "pe-trait" });
    ["brasG", "brasD"].forEach(function (k) {
      E[k] = { contour: cree(E.corps, "path", { class: "pe-membre-contour" }), manche: cree(E.corps, "path", { class: "pe-membre" }), peau: cree(E.corps, "path", { class: "pe-membre", stroke: PEAU }) };
    });
    E.mainG = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU }); E.mainD = cree(E.corps, "circle", { class: "pe-trait", fill: PEAU });
    E.chemise = cree(E.corps, "g");
    E.encolure = cree(E.chemise, "path", { class: "pe-trait", fill: PEAU });
    E.colG = cree(E.chemise, "path", { class: "pe-trait" }); E.colD = cree(E.chemise, "path", { class: "pe-trait" });
    E.bouton1 = cree(E.chemise, "circle", { fill: TRAIT }); E.bouton2 = cree(E.chemise, "circle", { fill: TRAIT });
    // Lange du nourrisson : cocon et bande croisée, qui s’effacent quand l’enfant commence à marcher.
    var defs = cree(g, "defs"), clip = cree(defs, "clipPath", { id: id });
    E.clipLange = cree(clip, "ellipse");
    E.lange = cree(g, "g");
    E.cocon = cree(E.lange, "ellipse", { class: "pe-trait", fill: LANGE });
    E.bande = cree(E.lange, "path", { fill: BANDE, "clip-path": "url(#" + id + ")" });
    E.bande2 = cree(E.lange, "path", { fill: "none", stroke: TRAIT, "stroke-width": ".9", "clip-path": "url(#" + id + ")" });
    E.cou = cree(g, "rect", { fill: PEAU });
    E.oreilleG = cree(g, "circle", { class: "pe-trait", fill: PEAU }); E.oreilleD = cree(g, "circle", { class: "pe-trait", fill: PEAU });
    E.tete = cree(g, "ellipse", { class: "pe-trait", fill: PEAU });
    E.barbe = cree(g, "path", { class: "pe-trait" });
    E.levres = cree(g, "ellipse", { fill: PEAU });
    E.joueG = cree(g, "circle", { fill: JOUES, opacity: ".6" }); E.joueD = cree(g, "circle", { fill: JOUES, opacity: ".6" });
    E.oeilG = cree(g, "path", { class: "pe-ligne" }); E.oeilD = cree(g, "path", { class: "pe-ligne" });
    E.nez = cree(g, "ellipse", { fill: NEZ });
    E.bouche = cree(g, "path", { class: "pe-ligne" });
    E.cheveux = cree(g, "path", { class: "pe-trait" });
    E.meche = cree(g, "path", { class: "pe-ligne", fill: "none" });
    E.etiquette = cree(calqueHaut || calque, "text", { class: "pe-etiquette" });
    this.g = g; this.E = E;
  }

  // Dessine le personnage à l’âge a (années), pieds au point (x, y) ; phase = cycle de marche.
  Figure.prototype.dessiner = function (a, x, y, phase, annee, mouv) {
    var E = this.E, P = parametres(a);
    var H = P.taille, hh = P.tete * H, hw = hh * P.ratio, cou = P.cou * H, th = P.torse * H;
    var lange = 1 - lisse(.6, 1.8, a), marche = 1 - lange;
    var lw = Math.max(2.3, P.jambe * H), aw = lw * .86;
    var jambe = Math.max(0, H - hh * .94 - cou - th);
    var s = Math.sin(phase), ampl = marche * mouv * (a < 4 ? .42 : .3);
    var bond = -Math.abs(Math.cos(phase)) * H * .018 * marche * mouv + Math.sin(phase * .5) * lange * .8 * mouv;
    var hanche = -jambe, epaule = hanche - th, teteY = epaule - cou - hh * .46;
    var sw = P.epaules * H / 2, hw2 = sw * .74 + P.ventre * H * .04;
    this.g.setAttribute("transform", "translate(" + f(x) + "," + f(y) + ")");
    E.corps.setAttribute("transform", "translate(0," + f(bond) + ")");
    E.ombre.setAttribute("cx", 0); E.ombre.setAttribute("cy", 0); E.ombre.setAttribute("rx", f(H * .2)); E.ombre.setAttribute("ry", f(Math.max(1.6, H * .03)));
    // Jambes : pantalon (ou short) puis peau, chaussures.
    [-1, 1].forEach(function (k) {
      var J = E[k < 0 ? "jambeG" : "jambeD"], hx = k * hw2 * .5, pas = (k < 0 ? 1 : -1) * s * jambe * ampl;
      var px = hx + pas + k * .4, py = -Math.max(0, (k < 0 ? 1 : -1) * Math.cos(phase)) * jambe * .12 * marche * mouv;
      var gx = hx + (px - hx) * P.pantalon, gy = hanche + (py - hanche) * P.pantalon;
      trait(J.contour, hx, hanche, px, py); J.contour.setAttribute("stroke-width", f(lw + 2.2));
      trait(J.bas, hx, hanche, gx, gy); J.bas.setAttribute("stroke", P.bas); J.bas.setAttribute("stroke-width", f(lw));
      trait(J.peau, gx, gy, px, py); J.peau.setAttribute("stroke-width", f(lw)); J.peau.setAttribute("opacity", P.pantalon > .98 ? 0 : 1);
      var C = E[k < 0 ? "chausG" : "chausD"];
      C.setAttribute("cx", f(px + k * lw * .3)); C.setAttribute("cy", f(py - lw * .32)); C.setAttribute("rx", f(lw * .9)); C.setAttribute("ry", f(lw * .58));
      C.setAttribute("fill", P.chaussure);
    });
    // Bras : balancement opposé aux jambes ; manches courtes chez l’enfant, retroussées chez l’adulte.
    var bras = th * (.9 + .12 * lisse(3, 16, a));
    [-1, 1].forEach(function (k) {
      var B = E[k < 0 ? "brasG" : "brasD"], ex = k * (sw - aw * .15), ey = epaule + aw * .75;
      var mx = ex + k * bras * .13 - (k < 0 ? 1 : -1) * s * bras * ampl * .7, my = ey + bras * .96;
      var cx = ex + (mx - ex) * P.manche, cy = ey + (my - ey) * P.manche;
      trait(B.contour, ex, ey, mx, my); B.contour.setAttribute("stroke-width", f(aw + 2.2));
      trait(B.manche, ex, ey, cx, cy); B.manche.setAttribute("stroke", P.haut); B.manche.setAttribute("stroke-width", f(aw));
      trait(B.peau, cx, cy, mx, my); B.peau.setAttribute("stroke-width", f(aw)); B.peau.setAttribute("opacity", P.manche > .98 ? 0 : 1);
      var M = E[k < 0 ? "mainG" : "mainD"]; M.setAttribute("cx", f(mx)); M.setAttribute("cy", f(my)); M.setAttribute("r", f(aw * .62));
    });
    // Torse : trapèze arrondi, ventre rond du bambin.
    var r = Math.min(sw * .55, th * .35), v = P.ventre * H * .07, bas = hanche + lw * .3;
    E.torse.setAttribute("d", "M" + f(-sw) + "," + f(epaule + r) + "Q" + f(-sw) + "," + f(epaule) + " " + f(-sw + r) + "," + f(epaule) +
      "L" + f(sw - r) + "," + f(epaule) + "Q" + f(sw) + "," + f(epaule) + " " + f(sw) + "," + f(epaule + r) +
      "C" + f(sw + v) + "," + f(epaule + th * .55) + " " + f(hw2 + v * .6) + "," + f(hanche - th * .1) + " " + f(hw2) + "," + f(bas) +
      "L" + f(-hw2) + "," + f(bas) + "C" + f(-hw2 - v * .6) + "," + f(hanche - th * .1) + " " + f(-sw - v) + "," + f(epaule + th * .55) + " " + f(-sw) + "," + f(epaule + r) + "Z");
    E.torse.setAttribute("fill", P.haut);
    // Chemise de l’adulte : encolure, col et boutons apparaissent en fondu.
    var nw = hw * .2, col = lisse(17, 23, a);
    E.chemise.setAttribute("opacity", f(col));
    E.encolure.setAttribute("d", "M" + f(-nw * 1.2) + "," + f(epaule) + "L0," + f(epaule + hh * .26) + "L" + f(nw * 1.2) + "," + f(epaule) + "Z");
    E.colG.setAttribute("d", "M" + f(-nw * 1.25) + "," + f(epaule - .4) + "L" + f(-nw * 2.3) + "," + f(epaule + hh * .14) + "L" + f(-hh * .03) + "," + f(epaule + hh * .25) + "Z");
    E.colD.setAttribute("d", "M" + f(nw * 1.25) + "," + f(epaule - .4) + "L" + f(nw * 2.3) + "," + f(epaule + hh * .14) + "L" + f(hh * .03) + "," + f(epaule + hh * .25) + "Z");
    E.colG.setAttribute("fill", P.haut); E.colD.setAttribute("fill", P.haut);
    E.bouton1.setAttribute("cx", 0); E.bouton1.setAttribute("cy", f(epaule + th * .5)); E.bouton1.setAttribute("r", f(Math.max(.6, hh * .045)));
    E.bouton2.setAttribute("cx", 0); E.bouton2.setAttribute("cy", f(epaule + th * .76)); E.bouton2.setAttribute("r", f(Math.max(.6, hh * .045)));
    // Lange.
    var lHaut = teteY + hh * .28, lrx = Math.max(hw * .52, sw + 1.5), lry = (0 - lHaut) / 2, lcy = lHaut + lry;
    E.lange.setAttribute("opacity", f(lange)); E.lange.setAttribute("display", lange < .01 ? "none" : "inline");
    [E.cocon, E.clipLange].forEach(function (n) { n.setAttribute("cx", 0); n.setAttribute("cy", f(lcy)); n.setAttribute("rx", f(lrx)); n.setAttribute("ry", f(lry)); });
    var b1 = lHaut + lry * .45, b2 = lHaut + lry * 1.15, e = lry * .32;
    E.bande.setAttribute("d", "M" + f(-lrx - 2) + "," + f(b1) + "L" + f(lrx + 2) + "," + f(b2) + "L" + f(lrx + 2) + "," + f(b2 + e) + "L" + f(-lrx - 2) + "," + f(b1 + e) + "Z");
    E.bande2.setAttribute("d", "M" + f(-lrx - 2) + "," + f(b1) + "L" + f(lrx + 2) + "," + f(b2) + "M" + f(lrx + 2) + "," + f(b2 + e) + "L" + f(-lrx - 2) + "," + f(b1 + e));
    // Cou, oreilles, tête.
    E.cou.setAttribute("x", f(-nw)); E.cou.setAttribute("y", f(epaule - cou - hh * .1)); E.cou.setAttribute("width", f(2 * nw)); E.cou.setAttribute("height", f(cou + hh * .1 + .8));
    E.cou.setAttribute("opacity", f(marche));
    [-1, 1].forEach(function (k) {
      var O = E[k < 0 ? "oreilleG" : "oreilleD"]; O.setAttribute("cx", f(k * hw * .49)); O.setAttribute("cy", f(teteY + hh * .05)); O.setAttribute("r", f(hh * .11));
    });
    E.tete.setAttribute("cx", 0); E.tete.setAttribute("cy", f(teteY)); E.tete.setAttribute("rx", f(hw / 2)); E.tete.setAttribute("ry", f(hh / 2));
    // Barbe courte : apparaît entre 17 et 25 ans, s’épaissit légèrement ensuite.
    var barbe = lisse(17, 25, a) * (.85 + .15 * lisse(28, 44, a)), xb = hw / 2 + .4, yb = teteY + hh * .15;
    E.barbe.setAttribute("opacity", f(barbe)); E.barbe.setAttribute("display", barbe < .01 ? "none" : "inline");
    E.barbe.setAttribute("fill", P.cheveux);
    E.barbe.setAttribute("d", "M" + f(-xb) + "," + f(yb) + "A" + f(xb) + "," + f(hh / 2 + .8 + barbe * .8) + " 0 0 0 " + f(xb) + "," + f(yb) +
      "L" + f(xb - hw * .14) + "," + f(yb) + "Q" + f(hw * .28) + "," + f(teteY + hh * .24) + " " + f(hw * .15) + "," + f(teteY + hh * .23) +
      "Q0," + f(teteY + hh * .18) + " " + f(-hw * .15) + "," + f(teteY + hh * .23) + "Q" + f(-hw * .28) + "," + f(teteY + hh * .24) + " " + f(-xb + hw * .14) + "," + f(yb) + "Z");
    E.levres.setAttribute("cx", 0); E.levres.setAttribute("cy", f(teteY + hh * .31)); E.levres.setAttribute("rx", f(hw * .14)); E.levres.setAttribute("ry", f(hh * .065));
    E.levres.setAttribute("opacity", f(barbe));
    // Visage souriant, yeux plissés comme les repères illustrés du CV.
    var ey = teteY + hh * .06, ex = hw * .2, ew = hw * .115, lt = Math.max(.75, hh * .05);
    [-1, 1].forEach(function (k) {
      var O = E[k < 0 ? "oeilG" : "oeilD"], cx = k * ex;
      O.setAttribute("d", "M" + f(cx - ew) + "," + f(ey) + "Q" + f(cx) + "," + f(ey - ew * 1.15) + " " + f(cx + ew) + "," + f(ey)); O.setAttribute("stroke-width", f(lt));
      var J = E[k < 0 ? "joueG" : "joueD"]; J.setAttribute("cx", f(k * hw * .3)); J.setAttribute("cy", f(teteY + hh * .2)); J.setAttribute("r", f(hh * .075));
      J.setAttribute("opacity", f(.65 - .25 * barbe));
    });
    E.nez.setAttribute("cx", 0); E.nez.setAttribute("cy", f(teteY + hh * .17)); E.nez.setAttribute("rx", f(hh * .045)); E.nez.setAttribute("ry", f(hh * .032));
    var my = teteY + hh * .28;
    E.bouche.setAttribute("d", "M" + f(-hw * .1) + "," + f(my) + "Q0," + f(my + hh * .085) + " " + f(hw * .1) + "," + f(my)); E.bouche.setAttribute("stroke-width", f(lt));
    // Cheveux : calotte qui gagne en volume, mèche plus marquée à l’adolescence ; petite boucle du nourrisson.
    var vol = lisse(.4, 3, a), haut = teteY - hh / 2, yc = haut + P.calotte * hh, ys = yc + (teteY - hh * .03 - yc) * lisse(.8, 3, a);
    var rx = hw / 2 + 1.1 * vol, ry = hh / 2 + 1.2 * vol + hh * .06 * vol, q = Math.max(0, 1 - Math.pow((ys - teteY) / ry, 2)), xs = rx * Math.sqrt(q), m = hh * P.meche * .25;
    E.cheveux.setAttribute("fill", P.cheveux); E.cheveux.setAttribute("opacity", f(lisse(.3, 1.4, a)));
    E.cheveux.setAttribute("d", "M" + f(-xs) + "," + f(ys) + "A" + f(rx) + "," + f(ry) + " 0 0 1 " + f(xs) + "," + f(ys) +
      "L" + f(xs - hw * .1) + "," + f(ys) + "Q" + f(hw * .33) + "," + f(yc - m * .1) + " " + f(hw * .12) + "," + f(yc + m * .35) +
      "Q0," + f(yc + m) + " " + f(-hw * .12) + "," + f(yc + m * .2) + "Q" + f(-hw * .35) + "," + f(yc - m * .1) + " " + f(-xs + hw * .1) + "," + f(ys) + "Z");
    E.meche.setAttribute("stroke", P.cheveux); E.meche.setAttribute("stroke-width", f(hh * .06));
    E.meche.setAttribute("opacity", f(1 - lisse(.6, 2, a)));
    E.meche.setAttribute("d", "M" + f(-hw * .08) + "," + f(haut + hh * .16) + "Q" + f(hw * .02) + "," + f(haut - hh * .02) + " " + f(hw * .16) + "," + f(haut + hh * .06) +
      "Q" + f(hw * .06) + "," + f(haut + hh * .1) + " " + f(hw * .02) + "," + f(haut + hh * .2));
    // Étiquette discrète : année et âge, à droite de la tête.
    var age = Math.floor(a + 1e-6);
    E.etiquette.textContent = annee + " · " + (age < 1 ? "naissance" : age + (age > 1 ? " ans" : " an"));
    E.etiquette.setAttribute("x", f(x + Math.max(sw, hw / 2) + 9)); E.etiquette.setAttribute("y", f(y + teteY + 4));
  };

  /* ---------- Trajet : table des positions, de l’âge et du soulèvement au-dessus des bulles ---------- */
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
      J.push({ i: best, annee: annee, bulle: !!j.bulle });
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
      poids[k3] = k3 < J[2].i ? 1.9 : 1;
    }
    var cumul = new Float32Array(N);
    for (var k4 = 1; k4 < N; k4++) cumul[k4] = cumul[k4 - 1] + poids[k4];
    return { N: N, X: X, Y: Y, annees: annees, leve: leve, cumul: cumul, pas: pas };
  }

  var FONDU = .8, ATTENTE_DEBUT = 1.4, MARCHE = 37, ATTENTE_FIN = 2.6;
  var CYCLE = FONDU + ATTENTE_DEBUT + MARCHE + ATTENTE_FIN + FONDU;
  var actifs = [];

  function animer(svg, o) {
    var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var etat = { svg: svg, horloge: 0, T: null, figure: null, arret: false, rafId: 0, attente: 0, phase: 0, dernier: -1, mouv: 0 };
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
    // Position à l’indice fractionnaire k.
    function poser(k, opacite) {
      var T = etat.T, i = Math.max(0, Math.min(T.N - 1, Math.floor(k))), j = Math.min(T.N - 1, i + 1), t = k - i;
      var x = T.X[i] + (T.X[j] - T.X[i]) * t, y = T.Y[i] + (T.Y[j] - T.Y[i]) * t - (T.leve[i] + (T.leve[j] - T.leve[i]) * t);
      var annee = T.annees[i] + (T.annees[j] - T.annees[i]) * t, age = Math.max(0, annee - o.naissance);
      etat.figure.dessiner(age, x, y, etat.phase, Math.floor(annee + 1e-6), etat.mouv);
      o.calque.setAttribute("opacity", opacite.toFixed(3));
      if (o.etiquettes) o.etiquettes.setAttribute("opacity", opacite.toFixed(3));
    }
    function indicePour(u) { // u ∈ [0,1] de la marche → indice, à vitesse pondérée
      var T = etat.T, cible = u * T.cumul[T.N - 1], lo = 0, hi = T.N - 1;
      while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (T.cumul[mid] < cible) lo = mid; else hi = mid; }
      var d = T.cumul[hi] - T.cumul[lo];
      return lo + (d > 0 ? (cible - T.cumul[lo]) / d : 0);
    }
    function image(t) {
      var c = t % CYCLE, k, op = 1, T = etat.T;
      if (c < FONDU) { k = 0; op = c / FONDU; }
      else if (c < FONDU + ATTENTE_DEBUT) k = 0;
      else if (c < FONDU + ATTENTE_DEBUT + MARCHE) { var u = (c - FONDU - ATTENTE_DEBUT) / MARCHE; k = indicePour(u * u * (3 - 2 * u) * .04 + u * .96); }
      else if (c < CYCLE - FONDU) k = T.N - 1;
      else { k = T.N - 1; op = (CYCLE - c) / FONDU; }
      // Cycle de marche proportionnel à la distance parcourue.
      if (etat.dernier >= 0 && k > etat.dernier) etat.phase += (k - etat.dernier) * T.pas / 7.5;
      if (etat.dernier >= 0) etat.mouv += ((k > etat.dernier + 1e-3 ? 1 : 0) - etat.mouv) * .12;
      etat.dernier = k;
      poser(k, Math.max(0, Math.min(1, op)));
    }
    function boucle(maintenant) {
      if (etat.arret) return;
      if (!svg.isConnected) { arreter(); return; }
      if (document.hidden) return; // reprise par visibilitychange
      // Chemin masqué (vue liste) : vérification espacée, sans faire avancer le temps.
      if (!svg.getBoundingClientRect().width) { etat.prec = null; etat.attente = setTimeout(function () { etat.rafId = requestAnimationFrame(boucle); }, 500); return; }
      if (!pret()) { etat.attente = setTimeout(function () { etat.rafId = requestAnimationFrame(boucle); }, 300); return; }
      if (reduit) { etat.phase = 0; poser(etat.T.N - 1, 1); return; } // adulte immobile à l’arrivée
      if (etat.prec != null && !etat.fige) etat.horloge += Math.min(.1, (maintenant - etat.prec) / 1000);
      etat.prec = maintenant;
      if (!etat.fige) image(etat.horloge);
      etat.rafId = requestAnimationFrame(boucle);
    }
    function visibilite() {
      if (etat.arret) return;
      cancelAnimationFrame(etat.rafId); clearTimeout(etat.attente); etat.prec = null;
      if (!document.hidden) etat.rafId = requestAnimationFrame(boucle);
    }
    document.addEventListener("visibilitychange", visibilite);
    etat.rafId = requestAnimationFrame(boucle);
    etat.aller = function (t, fige) { var c = t % CYCLE; etat.horloge = t; etat.dernier = -1; etat.mouv = c > FONDU + ATTENTE_DEBUT && c < FONDU + ATTENTE_DEBUT + MARCHE ? 1 : 0; etat.phase = fige ? 1.1 : etat.phase; etat.fige = !!fige; if (pret()) image(t); };
    return arreter;
  }

  window.Personnage = {
    animer: animer,
    // Outil de contrôle : place les personnages actifs à l’instant t (secondes du cycle).
    instant: function (t, fige) { actifs.forEach(function (e) { e.aller(t, fige); }); return actifs.length; },
    cycle: CYCLE
  };
})();
