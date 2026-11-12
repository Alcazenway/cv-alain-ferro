/* Billard v2.28 : bulles en mouvement qu’on attrape, fait glisser et lance (sans trous).
   window.Billard.creer(options) renvoie la zone de jeu (élément DOM) à insérer dans la page.
   options : { page, libelle, astuce, regrouper, legende: [{famille, texte}],
               bulles: [{ id, titre, sous, lien, fond, famille, poids, vedette, cls, aria, carte: function () -> Node }] }
   page (competences | formation | interets | metiers) → classe bi-zone-<page> : fond de zone surchargeable (billard-fonds.css).
   vedette : bulle plus grande, halo lent, titre en avant. regrouper : légère attraction entre bulles d’une même famille.
   Une bulle avec lien est un vrai <a> ; sans lien, un <button> qui ouvre sa petite carte (popover).
   v2.28 : l’image occupe toute la bulle ; le titre est posé sur un bandeau plein de la couleur de la famille. */
(function () {
  "use strict";
  var SEUIL = 6;            // px : au-delà, c’est un glisser, jamais un clic
  var VMAX = 2600;          // px/s
  var REBOND_BORD = 0.88, REBOND_BULLES = 0.96;
  var mouvementReduit = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function el(tag, cls, texte) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (texte) n.textContent = texte;
    return n;
  }
  function borne(v, a, b) { return v < a ? a : v > b ? b : v; }
  // Césures possibles (trait d’union conditionnel) dans les mots longs, pour qu’ils tiennent dans une petite bulle.
  var VOYELLE = /[aeiouyéèêëàâîïôöûüù]/i;
  function cesures(texte) {
    return texte.replace(/[A-Za-zÀ-ÿ]{11,}/g, function (m) {
      var out = "", debut = 0;
      for (var i = 3; i <= m.length - 4; i++) {
        var a = m[i - 1], b = m[i], c = m[i + 1];
        var coupe = (VOYELLE.test(a) && !VOYELLE.test(b) && VOYELLE.test(c)) || (!VOYELLE.test(a) && a === b && VOYELLE.test(m[i - 2]));
        if (coupe && i - debut >= 3) { out += m.slice(debut, i) + "\u00AD"; debut = i; }
      }
      return out + m.slice(debut);
    });
  }
  function ongletCache() { return document.hidden || document.documentElement.classList.contains("co-onglet-cache"); }

  function creer(options) {
    var zone = el("div", "bi-zone" + (options.page ? " bi-zone-" + options.page : ""));
    var liste = el("ul", "bi-liste");
    liste.setAttribute("aria-label", options.libelle || "Bulles");
    zone.appendChild(liste);
    var legende = null;
    if (options.legende && options.legende.length) {
      var leg = legende = el("ul", "bi-legende");
      options.legende.forEach(function (l) {
        var li = el("li", "bi-f-" + l.famille);
        li.appendChild(el("span", "bi-pastille"));
        // Libellé court facultatif, affiché sur petit écran à la place du libellé complet.
        if (l.court) { li.appendChild(el("span", "bi-leg-long", l.texte)); li.appendChild(el("span", "bi-leg-court", l.court)); }
        else li.appendChild(document.createTextNode(l.texte));
        leg.appendChild(li);
      });
      zone.appendChild(leg);
    }
    var astuce = el("p", "bi-astuce", options.astuce || "Attrapez une bulle et lancez-la ; un simple clic l’ouvre.");
    astuce.setAttribute("aria-hidden", "true");
    zone.appendChild(astuce);

    var W = 0, H = 0, Y0 = 0, place = false, raf = 0, dernier = 0, carteOuverte = null;
    var bulles = (options.bulles || []).map(function (d, i) {
      var b = { d: d, i: i, x: 0, y: 0, vx: 0, vy: 0, r: 40, poids: d.poids || (d.vedette ? 1.35 : 1), survol: false, prise: null, ignorerClic: false, fige: false };
      var n = d.lien ? el("a", "bi-bulle") : el("button", "bi-bulle");
      if (d.lien) n.href = d.lien;
      else { n.type = "button"; if (d.carte) { n.setAttribute("aria-haspopup", "dialog"); n.setAttribute("aria-expanded", "false"); } }
      n.className = "bi-bulle bi-f-" + (d.famille || "defaut") + (d.vedette ? " bi-vedette" : "") + (d.cls ? " " + d.cls : "") + (d.fond ? " avec-fond" : "");
      n.setAttribute("draggable", "false");
      if (d.aria) n.setAttribute("aria-label", d.aria);
      if (d.id) n.id = d.id;
      if (d.fond) {
        var img = el("img", "bi-fond"); img.alt = ""; img.src = d.fond; img.decoding = "async"; img.setAttribute("draggable", "false");
        img.addEventListener("error", function () { img.remove(); n.classList.remove("avec-fond"); });
        n.appendChild(img);
      }
      var texte = el("span", "bi-texte");
      b.cesure = cesures(d.titre);
      b.titre = el("span", "bi-titre", d.titre);
      texte.appendChild(b.titre);
      if (d.sous) texte.appendChild(el("small", "bi-sous", d.sous));
      n.appendChild(texte);
      b.texte = texte; b.n = n;
      var li = el("li", "bi-place"); li.appendChild(n); liste.appendChild(li);
      brancher(b);
      return b;
    });

    /* ---------- Dimensions et placement ---------- */
    function rayons(echelle) {
      var petit = Math.min(W, H) < 520 || W < 600;
      // Sur petit écran, l’écart de taille des vedettes est atténué pour laisser de la place aux titres des autres bulles.
      bulles.forEach(function (b) { b.pe = petit && b.poids > 1 ? 1 + (b.poids - 1) * 0.55 : b.poids; });
      var somme = bulles.reduce(function (s, b) { return s + b.pe * b.pe; }, 0) || 1;
      var remplissage = petit ? 0.6 : 0.44;
      var r0 = Math.sqrt(remplissage * W * (H - Y0) / (Math.PI * somme)) * (echelle || 1);
      r0 = borne(r0, petit ? 40 : 44, petit ? 82 : 108);
      bulles.forEach(function (b) { b.r = Math.min(r0 * b.pe * (b.ajust || 1), Math.min(W, H - Y0) / 2 - 4); });
    }
    function chevauche(b, liste) {
      for (var j = 0; j < liste.length; j++) {
        var o = liste[j], dx = o.x - b.x, dy = o.y - b.y, m = o.r + b.r + 6;
        if (dx * dx + dy * dy < m * m) return true;
      }
      return false;
    }
    function placer() {
      // Les plus grandes d’abord ; si l’espace manque, toutes les bulles rétrécissent un peu puis on recommence.
      var ordre = bulles.slice().sort(function (a, b) { return b.r - a.r; });
      // Regroupement : chaque famille part d’une bande verticale qui lui est propre.
      var familles = [];
      if (options.regrouper) bulles.forEach(function (b) { if (familles.indexOf(b.d.famille) === -1) familles.push(b.d.famille); });
      // v2.28 : une bulle sans place libre prend la position la moins recouvrante, puis on écarte toutes les bulles
      // (relaxation) ; on ne rétrécit que si des recouvrements subsistent.
      function recouvrement(b, liste) {
        var pire = 0;
        for (var j = 0; j < liste.length; j++) {
          var o = liste[j], m = o.r + b.r + 6 - Math.sqrt((o.x - b.x) * (o.x - b.x) + (o.y - b.y) * (o.y - b.y));
          if (m > pire) pire = m;
        }
        return pire;
      }
      function pireRecouvrement() {
        var pire = 0;
        for (var i = 0; i < bulles.length; i++) for (var j = i + 1; j < bulles.length; j++) {
          var a = bulles[i], c = bulles[j], m = a.r + c.r - Math.sqrt((a.x - c.x) * (a.x - c.x) + (a.y - c.y) * (a.y - c.y));
          if (m > pire) pire = m;
        }
        return pire;
      }
      for (var essai = 0; essai < 14; essai++) {
        var poses = [], ok = true;
        for (var k = 0; k < ordre.length; k++) {
          var b = ordre[k], trouve = false, meilleur = null;
          for (var t = 0; t < 400; t++) {
            b.x = b.r + Math.random() * Math.max(1, W - 2 * b.r);
            b.y = Y0 + b.r + Math.random() * Math.max(1, H - Y0 - 2 * b.r);
            if (familles.length > 1 && t < 260) {
              var fi = familles.indexOf(b.d.famille), bande = W / familles.length;
              b.x = borne(bande * (fi + 0.5) + (Math.random() - 0.5) * bande * 1.1, b.r, W - b.r);
            } else if (k === 0 && b.poids > 1) { b.x = W * (0.35 + Math.random() * 0.3); b.y = Y0 + (H - Y0) * (0.35 + Math.random() * 0.3); }
            if (!chevauche(b, poses)) { trouve = true; break; }
            var rec = recouvrement(b, poses);
            if (!meilleur || rec < meilleur.rec) meilleur = { x: b.x, y: b.y, rec: rec };
          }
          if (!trouve) { b.x = meilleur.x; b.y = meilleur.y; }
          poses.push(b);
        }
        for (var it = 0; it < 300; it++) if (!separer()) break;
        ok = pireRecouvrement() <= 1;
        if (ok) break;
        bulles.forEach(function (b) { b.r *= 0.95; });
      }
      var v0 = vitesseDerive();
      bulles.forEach(function (b) {
        var a = Math.random() * Math.PI * 2, v = v0 * (1 + Math.random());
        b.vx = Math.cos(a) * v; b.vy = Math.sin(a) * v;
      });
    }
    function vitesseDerive() { return mouvementReduit.matches ? 0 : borne(Math.min(W, H) * 0.03, 10, 22); }
    // Taille du texte : proportionnelle au rayon, réduite si un mot ou le bloc ne tient pas dans le cercle.
    // Le titre est posé sur un bandeau horizontal (pleine largeur, rogné par le cercle), un peu sous le centre :
    // l’image reste visible au-dessus. Largeur utile du texte : corde du cercle au bord le plus éloigné du bandeau.
    function plancher() { return W < 600 ? 10 : 11.5; }
    // Décalage du bandeau sous le centre : 22 % du rayon pour un bandeau bas, recentré à mesure qu’il s’épaissit
    // (un bandeau centré dispose de la corde la plus large).
    function decalage(b, h) { return borne(b.r * 0.22 - (h - b.r * 0.6) * 0.5, 0, b.r * 0.22); }
    function poserBandeau(b) {
      var h = b.texte.offsetHeight;
      b.texte.style.top = Math.round(b.n.clientHeight / 2 + decalage(b, h) - h / 2) + "px";
    }
    function ajuster(b, depart) {
      var d = Math.round(b.r * 2), min = plancher();
      b.n.style.width = d + "px"; b.n.style.height = d + "px";
      var taille = Math.max(min, depart || borne(b.r * 0.2, min, b.d.vedette ? 24 : 20));
      // Le texte tient si chaque ligne reste dans la corde du cercle au bord le plus éloigné du bandeau.
      function tient() {
        var interieur = b.n.clientWidth, rayon = interieur / 2, tw = rayon * 1.8;
        for (var j = 0; j < 5; j++) {
          b.texte.style.paddingLeft = b.texte.style.paddingRight = Math.max(3, (interieur - tw) / 2).toFixed(1) + "px";
          var h = b.texte.offsetHeight;
          if (h > rayon * 1.5) return false;
          var e = Math.min(1, (decalage(b, h) + h / 2) / rayon), permis = 2 * Math.sqrt(1 - e * e) * rayon * 0.94;
          if (tw <= permis + 1) return b.titre.scrollWidth <= b.titre.clientWidth + 1;
          tw = permis;
        }
        return false;
      }
      // D’abord sans couper les mots (texte un peu plus petit), puis avec césures si nécessaire.
      var debut = taille, bas = Math.max(min, debut * 0.8);
      b.ok = true;
      b.titre.textContent = b.d.titre;
      for (var k = 0; k < 30; k++) {
        b.n.style.fontSize = taille.toFixed(1) + "px";
        if (tient()) { poserBandeau(b); return taille; }
        taille -= 0.4; if (taille < bas) break;
      }
      b.titre.textContent = b.cesure; taille = debut;
      for (k = 0; k < 40; k++) {
        b.n.style.fontSize = taille.toFixed(1) + "px";
        if (tient()) break;
        taille -= 0.4; if (taille < min) { taille = min; b.n.style.fontSize = min + "px"; b.ok = false; break; }
      }
      poserBandeau(b);
      return taille;
    }
    // Même taille de texte pour toutes les bulles de même rayon ; une bulle au titre long grossit un peu plutôt que d’écrire petit.
    function dimensionnerTout(agrandir, tour) {
      var tailles = bulles.map(function (b) { return ajuster(b) / (b.pe * (b.ajust || 1)); });
      var tri = tailles.slice().sort(function (a, b) { return a - b; }), mediane = tri[Math.floor(tri.length / 2)];
      if (agrandir && (tour || 0) < 8) {
        var change = false;
        bulles.forEach(function (b, i) {
          if (!b.ok && (b.ajust || 1) < 1.6) { b.ajust = Math.min(1.6, (b.ajust || 1) * 1.1); change = true; }
          else if (b.ok && tailles[i] < mediane * 0.92 && (b.ajust || 1) < 1.18) { b.ajust = Math.min(1.18, (b.ajust || 1) * mediane / tailles[i]); change = true; }
        });
        if (change) { rayons(); return dimensionnerTout(true, (tour || 0) + 1); }
      }
      bulles.forEach(function (b, i) { ajuster(b, Math.min(tailles[i], mediane) * b.pe * (b.ajust || 1)); });
    }
    function mesurer() {
      if (place && !zone.isConnected) { arreter(); return; }
      var w = zone.clientWidth, h = zone.clientHeight;
      if (!w || !h) return;
      // Sur petit écran, la légende occupe le haut de la zone : les bulles restent dessous.
      var y0 = legende && !/absolute|fixed/.test(getComputedStyle(legende).position) ? legende.offsetHeight : 0;
      if (place && Math.abs(w - W) < 1 && Math.abs(h - H) < 1 && Math.abs(y0 - Y0) < 1) return;
      var ancienW = W, ancienH = H;
      W = w; H = h; Y0 = y0;
      bulles.forEach(function (b) { b.ajust = 1; });
      rayons();
      dimensionnerTout(true);
      if (!place) { place = true; placer(); dimensionnerTout(false); }
      else {
        // Redimensionnement : positions mises à l’échelle, puis on écarte les bulles qui se recouvrent.
        bulles.forEach(function (b) { b.x = b.x * W / ancienW; b.y = b.y * H / ancienH; });
        for (var it = 0; it < 60; it++) if (!separer()) break;
      }
      bulles.forEach(function (b) { murs(b); dessiner(b); });
      if (carteOuverte) positionnerCarte();
      demarrer();
    }
    function separer() {
      var bouge = false;
      for (var i = 0; i < bulles.length; i++) for (var j = i + 1; j < bulles.length; j++) {
        var a = bulles[i], b = bulles[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 0.01, m = a.r + b.r;
        if (d < m) { var p = (m - d) / 2 + 0.5; a.x -= dx / d * p; a.y -= dy / d * p; b.x += dx / d * p; b.y += dy / d * p; murs(a); murs(b); bouge = true; }
      }
      return bouge;
    }

    /* ---------- Physique ---------- */
    function murs(b) {
      if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * REBOND_BORD; }
      else if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * REBOND_BORD; }
      if (b.y < Y0 + b.r) { b.y = Y0 + b.r; b.vy = Math.abs(b.vy) * REBOND_BORD; }
      else if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * REBOND_BORD; }
    }
    function immobile(b) { return !!b.prise || b.fige; }
    function collisions() {
      for (var i = 0; i < bulles.length; i++) for (var j = i + 1; j < bulles.length; j++) {
        var a = bulles[i], b = bulles[j], dx = b.x - a.x, dy = b.y - a.y, m = a.r + b.r, d2 = dx * dx + dy * dy;
        if (d2 >= m * m) continue;
        var d = Math.sqrt(d2) || 0.01, nx = dx / d, ny = dy / d, chev = m - d;
        // Masse ∝ surface ; une bulle tenue (ou figée) pousse les autres sans reculer.
        var ia = immobile(a) ? 0 : 1 / (a.r * a.r), ib = immobile(b) ? 0 : 1 / (b.r * b.r), s = ia + ib;
        if (!s) continue;
        a.x -= nx * chev * ia / s; a.y -= ny * chev * ia / s;
        b.x += nx * chev * ib / s; b.y += ny * chev * ib / s;
        var vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (vn < 0) {
          var jimp = -(1 + REBOND_BULLES) * vn / s;
          a.vx -= jimp * ia * nx; a.vy -= jimp * ia * ny;
          b.vx += jimp * ib * nx; b.vy += jimp * ib * ny;
        }
      }
    }
    function pas(dt) {
      var vmin = vitesseDerive(), actif = false;
      bulles.forEach(function (b) {
        if (b.prise) { actif = true; return; }
        if (b.fige) { b.vx = b.vy = 0; return; }
        var v = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        // Frottement léger ; sous la souris, la bulle ralentit pour se laisser cliquer.
        var k = b.survol ? 7 : mouvementReduit.matches ? 2.4 : 0.75;
        if (v > vmin || b.survol) { var f = Math.exp(-k * dt); b.vx *= f; b.vy *= f; v *= f; }
        if (!b.survol && vmin && v < vmin) {
          // Dérive permanente : on relance doucement la bulle dans sa direction.
          if (v < 0.5) { var a = Math.random() * Math.PI * 2; b.vx = Math.cos(a) * 0.6; b.vy = Math.sin(a) * 0.6; v = 0.6; }
          var g = Math.min(vmin, v + vmin * 1.5 * dt) / v; b.vx *= g; b.vy *= g; v *= g;
        }
        if (v > VMAX) { b.vx *= VMAX / v; b.vy *= VMAX / v; }
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (v > 1) actif = true;
      });
      if (options.regrouper && vmin) regrouper(dt);
      for (var it = 0; it < 3; it++) collisions();
      bulles.forEach(murs);
      return actif || vmin > 0;
    }
    // Attraction douce vers le centre de sa famille : les bulles d’une même famille se rapprochent sans gêner le jeu.
    function regrouper(dt) {
      var centres = {};
      bulles.forEach(function (b) {
        var c = centres[b.d.famille] || (centres[b.d.famille] = { x: 0, y: 0, n: 0 });
        c.x += b.x; c.y += b.y; c.n++;
      });
      bulles.forEach(function (b) {
        var c = centres[b.d.famille];
        if (immobile(b) || b.survol || c.n < 2) return;
        var dx = c.x / c.n - b.x, dy = c.y / c.n - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < b.r * 1.6) return;
        var a = Math.min(40, d * 0.12);
        b.vx += dx / d * a * dt; b.vy += dy / d * a * dt;
      });
    }
    function dessiner(b) { b.n.parentNode.style.transform = "translate3d(" + (b.x - b.r).toFixed(1) + "px," + (b.y - b.r).toFixed(1) + "px,0)"; }

    function boucle(t) {
      raf = 0;
      if (!zone.isConnected) { arreter(); return; }
      if (ongletCache()) return; // reprise au retour sur l’onglet
      var dt = dernier ? Math.min(0.033, (t - dernier) / 1000) : 0.016;
      dernier = t;
      var continuer = pas(dt);
      bulles.forEach(dessiner);
      if (carteOuverte) positionnerCarte();
      if (continuer) raf = requestAnimationFrame(boucle);
    }
    function demarrer() { if (!raf && place && zone.isConnected && !ongletCache()) { dernier = 0; raf = requestAnimationFrame(boucle); } }
    function visibilite() { if (!zone.isConnected) arreter(); else if (!ongletCache()) demarrer(); }
    var ro = window.ResizeObserver ? new ResizeObserver(mesurer) : null;
    if (ro) { ro.observe(zone); if (legende) ro.observe(legende); }
    window.addEventListener("resize", mesurer);
    document.addEventListener("visibilitychange", visibilite);
    if (mouvementReduit.addEventListener) mouvementReduit.addEventListener("change", demarrer);
    function arreter() {
      if (raf) cancelAnimationFrame(raf); raf = 0;
      if (ro) ro.disconnect();
      window.removeEventListener("resize", mesurer);
      document.removeEventListener("visibilitychange", visibilite);
      if (mouvementReduit.removeEventListener) mouvementReduit.removeEventListener("change", demarrer);
      fermerCarte(false);
    }

    /* ---------- Attraper, glisser, lancer ---------- */
    function point(ev) { var r = zone.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top, t: ev.timeStamp || performance.now() }; }
    function brancher(b) {
      var n = b.n;
      n.addEventListener("pointerdown", function (ev) {
        if (ev.button !== 0 && ev.pointerType === "mouse") return;
        ev.preventDefault();
        var p = point(ev);
        b.prise = { id: ev.pointerId, sx: p.x, sy: p.y, ox: b.x - p.x, oy: b.y - p.y, bouge: false, traces: [p] };
        b.ignorerClic = false;
        b.vx = b.vy = 0;
        try { n.setPointerCapture(ev.pointerId); } catch (_) { /* pointeur déjà relâché */ }
        n.classList.add("tenue");
        demarrer();
      });
      n.addEventListener("pointermove", function (ev) {
        var P = b.prise; if (!P || P.id !== ev.pointerId) return;
        var p = point(ev);
        if (!P.bouge && Math.abs(p.x - P.sx) + Math.abs(p.y - P.sy) > SEUIL) { P.bouge = true; if (carteOuverte) fermerCarte(false); }
        if (!P.bouge) return;
        var nx = borne(p.x + P.ox, b.r, W - b.r), ny = borne(p.y + P.oy, Y0 + b.r, H - b.r);
        P.traces.push(p); while (P.traces.length > 2 && p.t - P.traces[0].t > 90) P.traces.shift();
        // Vitesse de la main : sert aux chocs pendant le glisser et au lancer.
        var a = P.traces[0], dt = Math.max(0.008, (p.t - a.t) / 1000);
        b.vx = (p.x - a.x) / dt; b.vy = (p.y - a.y) / dt;
        b.x = nx; b.y = ny;
      });
      function relacher(ev, annule) {
        var P = b.prise; if (!P || P.id !== ev.pointerId) return;
        b.prise = null; n.classList.remove("tenue");
        try { n.releasePointerCapture(ev.pointerId); } catch (_) { /* déjà relâché */ }
        if (P.bouge) {
          b.ignorerClic = true;
          var p = point(ev), a = P.traces[0], dt = (p.t - a.t) / 1000;
          if (annule || dt <= 0 || p.t - P.traces[P.traces.length - 1].t > 120) { b.vx *= 0.2; b.vy *= 0.2; }
          var v = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (v > VMAX) { b.vx *= VMAX / v; b.vy *= VMAX / v; }
          setTimeout(function () { b.ignorerClic = false; }, 400);
        } else { b.vx = b.vy = 0; }
        demarrer();
      }
      n.addEventListener("pointerup", function (ev) { relacher(ev, false); });
      n.addEventListener("pointercancel", function (ev) { relacher(ev, true); });
      n.addEventListener("lostpointercapture", function (ev) { if (b.prise && b.prise.id === ev.pointerId) relacher(ev, true); });
      n.addEventListener("click", function (ev) {
        // Un glisser n’ouvre jamais le lien ni la carte.
        if (b.ignorerClic) { ev.preventDefault(); ev.stopPropagation(); b.ignorerClic = false; return; }
        if (!b.d.lien && b.d.carte) { ev.preventDefault(); if (carteOuverte && carteOuverte.b === b) fermerCarte(true); else ouvrirCarte(b); }
      });
      n.addEventListener("dragstart", function (ev) { ev.preventDefault(); });
      n.addEventListener("pointerenter", function (ev) { if (ev.pointerType === "mouse") b.survol = true; });
      n.addEventListener("pointerleave", function () { b.survol = false; demarrer(); });
      // Clavier : la bulle focalisée s’arrête ; les flèches la poussent.
      n.addEventListener("focus", function () { b.fige = true; });
      n.addEventListener("blur", function () { if (!(carteOuverte && carteOuverte.b === b)) b.fige = false; demarrer(); });
      n.addEventListener("keydown", function (ev) {
        var f = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key];
        if (!f) return;
        ev.preventDefault();
        b.fige = false; b.vx += f[0] * 700; b.vy += f[1] * 700; demarrer();
        setTimeout(function () { if (document.activeElement === n) b.fige = true; }, 900);
      });
    }

    /* ---------- Petite carte (popover) ---------- */
    var compteur = Math.random().toString(36).slice(2, 7);
    function ouvrirCarte(b) {
      fermerCarte(false);
      var carte = el("div", "bi-carte bi-f-" + (b.d.famille || "defaut"));
      var idTitre = "bi-carte-" + compteur + "-" + b.i;
      carte.setAttribute("role", "dialog"); carte.setAttribute("aria-labelledby", idTitre);
      var titre = el("h2", "bi-carte-titre", b.d.titre); titre.id = idTitre; titre.tabIndex = -1;
      var fermer = el("button", "bi-carte-fermer"); fermer.type = "button"; fermer.setAttribute("aria-label", "Fermer"); fermer.textContent = "×";
      fermer.addEventListener("click", function () { fermerCarte(true); });
      carte.appendChild(fermer); carte.appendChild(titre);
      var contenu = b.d.carte(); if (contenu) carte.appendChild(contenu);
      zone.appendChild(carte);
      carteOuverte = { b: b, carte: carte };
      b.fige = true; b.vx = b.vy = 0;
      b.n.setAttribute("aria-expanded", "true"); b.n.classList.add("ouverte");
      positionnerCarte();
      titre.focus({ preventScroll: true });
      document.addEventListener("pointerdown", dehors, true);
      window.addEventListener("keydown", echap, true);
    }
    function positionnerCarte() {
      var c = carteOuverte.carte, b = carteOuverte.b, w = c.offsetWidth, h = c.offsetHeight;
      var x = borne(b.x - w / 2, 8, Math.max(8, W - w - 8));
      var y = b.y + b.r + 10;
      if (y + h > H - 8) y = b.y - b.r - 10 - h;
      if (y < 8) y = borne(b.y < H / 2 ? b.y + b.r + 10 : H - h - 8, 8, Math.max(8, H - h - 8));
      c.style.left = Math.round(x) + "px"; c.style.top = Math.round(y) + "px";
    }
    function fermerCarte(rendreFocus) {
      if (!carteOuverte) return;
      var b = carteOuverte.b;
      carteOuverte.carte.remove(); carteOuverte = null;
      b.n.setAttribute("aria-expanded", "false"); b.n.classList.remove("ouverte");
      document.removeEventListener("pointerdown", dehors, true);
      window.removeEventListener("keydown", echap, true);
      if (rendreFocus && zone.isConnected) b.n.focus({ preventScroll: true });
      else b.fige = false;
      demarrer();
    }
    function dehors(ev) {
      if (!carteOuverte) return;
      if (carteOuverte.carte.contains(ev.target) || carteOuverte.b.n.contains(ev.target)) return;
      fermerCarte(false);
    }
    function echap(ev) {
      if (ev.key !== "Escape" || !carteOuverte) return;
      ev.preventDefault(); ev.stopPropagation();
      fermerCarte(true);
    }

    return zone;
  }

  window.Billard = { creer: creer };
})();
