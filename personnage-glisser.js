/* Personnage du parcours (2.45) : on peut l’attraper (clic maintenu ou appui maintenu) et le faire avancer ou reculer
   à la main le long du chemin. Pendant la saisie, il suit le pointeur projeté sur le point le plus proche du chemin,
   cherché autour de sa position courante (continuité, aucun saut d’une rangée à l’autre) ; il marche dans le bon sens,
   son âge, sa tenue et l’étiquette d’âge suivent. Au relâché, il reste là un moment puis l’animation reprend depuis
   cette position (animation désactivée : il reste immobile). Clavier : flèches gauche / droite (un an), Maj + flèche
   ou Page préc. / suiv. (cinq ans), Début / Fin. La zone de saisie est un rectangle transparent qui suit le personnage
   (le calque du personnage reste pointer-events: none) ; les commandes viennent de Personnage.manuel(svg). */
(function () {
  "use strict";
  var P = window.Personnage;
  if (!P || !P.animer || !P.manuel) return;
  var NS = "http://www.w3.org/2000/svg";
  var CLE_INDICE = "cv-parcours-indice-saisie";
  var PAUSE = 2500; // ms d’arrêt au relâché avant la reprise de l’animation

  var animerOrigine = P.animer;
  P.animer = function (svg, o) {
    var r = animerOrigine.apply(this, arguments);
    try { installer(svg, o); } catch (e) { /* le personnage reste animé, simplement sans saisie */ }
    return r;
  };

  function cree(parent, tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    parent.appendChild(n);
    return n;
  }
  function borne(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function grossier() { return !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches); }
  function indiceVu() { try { return window.sessionStorage.getItem(CLE_INDICE) === "1"; } catch (e) { return false; } }
  function noterIndice() { try { window.sessionStorage.setItem(CLE_INDICE, "1"); } catch (e) { /* sans stockage : une fois par page */ } }

  // Point de la table (indice fractionnaire k).
  function point(T, k) {
    var i = borne(Math.floor(k), 0, T.N - 1), j = Math.min(T.N - 1, i + 1), t = k - i;
    return { x: T.X[i] + (T.X[j] - T.X[i]) * t, y: T.Y[i] + (T.Y[j] - T.Y[i]) * t };
  }
  // Projection sur le chemin autour de k0 : distance au segment + petite pénalité d’éloignement le long du chemin.
  function projeter(T, qx, qy, k0) {
    if (T.N < 2) return 0;
    var R = 80, c0 = Math.floor(k0), i0 = Math.max(0, c0 - R), i1 = Math.min(T.N - 2, c0 + R), best = k0, bc = Infinity;
    for (var i = i0; i <= i1; i++) {
      var ax = T.X[i], ay = T.Y[i], dx = T.X[i + 1] - ax, dy = T.Y[i + 1] - ay, l2 = dx * dx + dy * dy;
      var t = l2 ? borne(((qx - ax) * dx + (qy - ay) * dy) / l2, 0, 1) : 0;
      var ex = ax + dx * t - qx, ey = ay + dy * t - qy, kk = i + t, g = (kk - k0) * T.pas * .25, c = ex * ex + ey * ey + g * g;
      if (c < bc) { bc = c; best = kk; }
    }
    return best;
  }
  // Indice d’une année (première position où l’âge l’atteint).
  function indiceAnnee(T, annee) {
    var lo = 0, hi = T.N - 1;
    if (annee <= T.annees[0]) return 0;
    if (annee >= T.annees[hi]) return hi;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (T.annees[mid] < annee) lo = mid; else hi = mid; }
    var d = T.annees[hi] - T.annees[lo];
    return lo + (d > 0 ? (annee - T.annees[lo]) / d : 0);
  }
  function texteAge(pos, naissance) {
    var an = Math.floor(pos.annee + 1e-6), age = Math.floor(pos.age + 1e-6);
    return an + ", " + (age < 1 ? "naissance" : age + (age > 1 ? " ans" : " an"));
  }

  function installer(svg, o) {
    var naissance = o && o.naissance != null ? +o.naissance : 0;
    var g = cree(svg, "g", { class: "pe-prise" });
    var zone = cree(g, "rect", {
      class: "pe-prise-zone", tabindex: "0", role: "slider", rx: "14", width: "0", height: "0",
      "aria-label": "Personnage du parcours : faites-le avancer ou reculer dans le temps avec les flèches gauche et droite, ou attrapez-le et glissez-le le long du chemin",
      "aria-orientation": "horizontal"
    });
    var indice = cree(g, "text", { class: "pe-indice", "aria-hidden": "true", "text-anchor": "middle" });
    indice.textContent = "Attrapez-moi";

    var saisie = null, clavierCible = null, bloquerClic = 0, rafId = 0, indiceFin = 0, derniereValeur = "";

    function manuel() { return P.manuel(svg); }
    function versSvg(e) {
      var m = svg.getScreenCTM(); if (!m) return null;
      var p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      return { x: p.x, y: p.y };
    }

    // Zone de saisie : suit le personnage à chaque image ; plus grande au doigt (au moins ~60 px à l’écran).
    function suivre() {
      if (!svg.isConnected) { cancelAnimationFrame(rafId); return; }
      rafId = requestAnimationFrame(suivre);
      var m = manuel(), pos = m && m.position(), ctm = svg.getScreenCTM();
      if (!pos || !ctm || !svg.getBoundingClientRect().width) { zone.setAttribute("display", "none"); return; }
      zone.removeAttribute("display");
      var s = Math.abs(ctm.a) || 1, doigt = grossier(), mini = (doigt ? 60 : 36) / s;
      var w = Math.max(pos.taille * (doigt ? .9 : .62) + 12, mini), h = Math.max(pos.taille + (doigt ? 26 : 14), mini);
      zone.setAttribute("x", (pos.x - w / 2).toFixed(1));
      zone.setAttribute("y", (pos.y + (doigt ? 12 : 6) - h).toFixed(1));
      zone.setAttribute("width", w.toFixed(1));
      zone.setAttribute("height", h.toFixed(1));
      var T = m.table();
      var val = Math.floor(pos.annee + 1e-6);
      if (String(val) !== derniereValeur) {
        derniereValeur = String(val);
        zone.setAttribute("aria-valuemin", Math.floor(T.annees[0]));
        zone.setAttribute("aria-valuemax", Math.floor(T.annees[T.N - 1] + 1e-6));
        zone.setAttribute("aria-valuenow", val);
        zone.setAttribute("aria-valuetext", texteAge(pos, naissance));
      }
      if (indiceFin) {
        indice.setAttribute("x", pos.x.toFixed(1));
        indice.setAttribute("y", (pos.y - pos.taille - 10).toFixed(1));
        if (performance.now() > indiceFin) cacherIndice();
      }
    }
    function montrerIndice(texte) {
      if (indiceVu() || saisie) return;
      noterIndice();
      indice.textContent = texte;
      indiceFin = performance.now() + 2600;
      g.classList.add("pe-indice-visible");
    }
    function cacherIndice() { indiceFin = 0; g.classList.remove("pe-indice-visible"); }

    // ---------- Souris, doigt, stylet ----------
    zone.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      var m = manuel(), pos = m && m.position(), T = m && m.table(), p = versSvg(e);
      if (!pos || !T || !p) return;
      e.preventDefault(); e.stopPropagation();
      try { zone.setPointerCapture(e.pointerId); } catch (err) { /* capture indisponible : suivi sur le rectangle */ }
      var q = point(T, pos.k);
      saisie = { id: e.pointerId, k: pos.k, dx: p.x - q.x, dy: p.y - q.y, cx: e.clientX, cy: e.clientY, bouge: false };
      clavierCible = null;
      m.viser(pos.k, false);
      cacherIndice();
      svg.classList.add("pe-saisi");
      document.documentElement.classList.add("pe-glisse");
    });
    zone.addEventListener("pointermove", function (e) {
      if (!saisie || e.pointerId !== saisie.id) return;
      e.preventDefault();
      var m = manuel(), T = m && m.table(), p = versSvg(e);
      if (!T || !p) return;
      if (Math.hypot(e.clientX - saisie.cx, e.clientY - saisie.cy) > 3) saisie.bouge = true;
      saisie.k = projeter(T, p.x - saisie.dx, p.y - saisie.dy, saisie.k);
      m.viser(saisie.k, false);
    });
    function fin(e) {
      if (!saisie || (e && e.pointerId !== saisie.id)) return;
      if (saisie.bouge) bloquerClic = performance.now() + 450;
      saisie = null;
      var m = manuel(); if (m) m.relacher(PAUSE);
      svg.classList.remove("pe-saisi");
      document.documentElement.classList.remove("pe-glisse");
    }
    zone.addEventListener("pointerup", fin);
    zone.addEventListener("pointercancel", fin);
    zone.addEventListener("lostpointercapture", fin);
    // Pas de défilement ni de zoom pendant l’appui sur le personnage (en plus de touch-action: none).
    zone.addEventListener("touchstart", function (e) { e.preventDefault(); }, { passive: false });
    zone.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });
    zone.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    zone.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); });
    // Après un glisser, aucun clic parasite sur une sphère (ou un lien) du chemin.
    svg.addEventListener("click", function (e) {
      if (performance.now() < bloquerClic) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    zone.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") montrerIndice("Attrapez-moi"); });

    // ---------- Clavier ----------
    zone.addEventListener("focus", function () {
      if (zone.matches && zone.matches(":focus-visible")) montrerIndice("← → pour me déplacer");
    });
    zone.addEventListener("keydown", function (e) {
      var m = manuel(), pos = m && m.position(), T = m && m.table();
      if (!pos || !T) return;
      var base = clavierCible != null && m.saisi() ? clavierCible : pos.k, cible = null;
      var pasAn = e.shiftKey ? 5 : 1;
      switch (e.key) {
        case "ArrowRight": case "ArrowUp": cible = sauter(T, base, pasAn); break;
        case "ArrowLeft": case "ArrowDown": cible = sauter(T, base, -pasAn); break;
        case "PageUp": cible = sauter(T, base, 5); break;
        case "PageDown": cible = sauter(T, base, -5); break;
        case "Home": cible = 0; break;
        case "End": cible = T.N - 1; break;
        default: return;
      }
      e.preventDefault();
      cacherIndice();
      clavierCible = cible;
      m.viser(cible, true);
    });
    zone.addEventListener("keyup", function (e) {
      if (clavierCible == null || !/^(Arrow|Page|Home|End)/.test(e.key)) return;
      var m = manuel(); if (m) m.relacher(PAUSE);
    });
    zone.addEventListener("blur", function () {
      cacherIndice();
      if (clavierCible != null) { clavierCible = null; var m = manuel(); if (m && m.saisi()) m.relacher(PAUSE); }
    });
    // Saut d’un nombre d’années entières, en ignorant les années sans longueur de chemin.
    function sauter(T, k, n) {
      var i = borne(Math.round(k), 0, T.N - 1), a = T.annees[i], cible = n > 0 ? Math.floor(a + 1e-6) + n : Math.ceil(a - 1e-6) + n;
      for (var essai = 0; essai < 60; essai++) {
        var kk = indiceAnnee(T, cible);
        if (Math.abs(kk - k) >= 1 || kk <= 0 || kk >= T.N - 1) return borne(kk, 0, T.N - 1);
        cible += n > 0 ? 1 : -1;
      }
      return borne(k, 0, T.N - 1);
    }

    rafId = requestAnimationFrame(suivre);
  }
})();
