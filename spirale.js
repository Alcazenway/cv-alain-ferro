/* Spirale du parcours — CV Intelligent v2.3 (6 novembre 2026).
   Naissance au centre, étapes du plus ancien au plus récent sur une spirale d’Archimède qui se déroule
   dans le sens horaire vers l’extérieur. La spirale entière tourne très lentement vers la droite
   (un tour en DUREE secondes) : seules les positions tournent, les libellés restent horizontaux.

   Garantie d’absence de chevauchement pendant toute la rotation : la rotation est rigide, les distances
   entre centres ne changent pas ; deux rectangles horizontaux de demi-tailles (w1, h1) et (w2, h2)
   ne peuvent se toucher, quelle que soit la direction, si la distance entre centres dépasse
   hypot(w1 + w2 + m, h1 + h2 + m). Chaque bulle est placée sur la spirale au premier angle qui respecte
   cette distance avec toutes les bulles déjà placées (marge m comprise). Tailles mesurées dans la page,
   placement recalculé si une bulle change de taille (police, zoom du navigateur, largeur d’écran). */
(function () {
  "use strict";
  var DUREE = 600;            // secondes par tour : très lent (≈ 0,6° par seconde)
  var MARGE = 12;             // écart minimal entre deux bulles, en pixels
  var BORD = 24;              // marge autour de la spirale
  var IMAGE_MS = 50;          // au plus 20 mises à jour par seconde : mouvement < 0,3 px par mise à jour
  var ZOOMS = [0.6, 0.8, 1, 1.25, 1.5];
  var etat = { angle: 0 };    // angle conservé d’un affichage à l’autre

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
  function svg(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  var mouvementReduit = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  /* Placement : renvoie pour chaque nœud son rayon r et son angle t, puis le rayon extérieur. */
  function placer(noeuds) {
    // Écart entre deux tours : diagonale moyenne des bulles. Les paires plus larges sont écartées
    // par la vérification ci-dessous, qui fait foi ; ce pas ne sert qu’à garder la surface compacte.
    var somme = 0;
    noeuds.forEach(function (n) { somme += Math.hypot(2 * n.w, 2 * n.h); });
    var pas = somme / noeuds.length + MARGE;
    var b = pas / (2 * Math.PI);                  // r = b · t
    var places = [], t = 0;
    noeuds.forEach(function (n, i) {
      if (i === 0) { n.r = 0; n.t = 0; n.x = 0; n.y = 0; places.push(n); return; }
      for (var essais = 0; essais < 200000; essais++) {
        var r = b * t, x = r * Math.cos(t), y = r * Math.sin(t), libre = true;
        for (var j = 0; j < places.length; j++) {
          var p = places[j];
          var mini = Math.hypot(n.w + p.w + MARGE, n.h + p.h + MARGE);
          if (Math.hypot(x - p.x, y - p.y) < mini) { libre = false; break; }
        }
        if (libre) break;
        t += 3 / Math.max(r, 30);                 // avance d’environ 3 px le long de la spirale
      }
      n.r = b * t; n.t = t; n.x = n.r * Math.cos(t); n.y = n.r * Math.sin(t);
      places.push(n);
      t += 3 / Math.max(n.r, 30);
    });
    var ext = 0;
    noeuds.forEach(function (n) { ext = Math.max(ext, n.r + Math.hypot(n.w, n.h)); });
    return { b: b, ext: ext, tFin: noeuds[noeuds.length - 1].t };
  }

  /* Contrôle indépendant : marge minimale (px) entre toutes les paires, valable pour toute rotation. */
  function controler(noeuds) {
    var pire = Infinity, paire = null;
    for (var i = 0; i < noeuds.length; i++) for (var j = i + 1; j < noeuds.length; j++) {
      var a = noeuds[i], c = noeuds[j];
      var d = Math.hypot(a.x - c.x, a.y - c.y) - Math.hypot(a.w + c.w, a.h + c.h);
      if (d < pire) { pire = d; paire = [a.id, c.id]; }
    }
    return { noeuds: noeuds.length, margeMinimale: Math.round(pire * 10) / 10, paire: paire, garanti: pire >= 0 };
  }

  /* options : items [{id, titre, href, type, important, libelle}], debut/fin {texte, annee, image}, legende */
  function creer(options) {
    var items = options.items;
    var racine = el("section", { class: "spirale", "aria-label": "Parcours en spirale" });
    var zoom = 1, pauseUtilisateur = mouvementReduit.matches, survol = false, focus = false, toucher = null;
    var noeuds = [], geo = null, signature = "", centre = 0, dernier = 0, horloge = 0, actif = true, minuterie = 0;

    // Outils : pause/reprise, zoom, état lisible
    var bPause = el("button", { type: "button", class: "spirale-bouton", "aria-controls": "spirale-scene" });
    var bMoins = el("button", { type: "button", class: "spirale-bouton zoom", "aria-label": "Zoom arrière", text: "−" });
    var bPlus = el("button", { type: "button", class: "spirale-bouton zoom", "aria-label": "Zoom avant", text: "+" });
    var vZoom = el("span", { class: "spirale-zoom", "aria-live": "polite" });
    var statut = el("p", { class: "spirale-statut" });
    var outils = el("div", { class: "spirale-outils", role: "group", "aria-label": "Commandes de la spirale" }, [
      bPause, el("span", { class: "spirale-zooms" }, [bMoins, vZoom, bPlus]), options.extra || null
    ]);

    var fenetre = el("div", { class: "spirale-fenetre" });
    var taille = el("div", { class: "spirale-taille" });
    var scene = el("div", { class: "spirale-scene", id: "spirale-scene" });
    var galaxie = el("img", { class: "spirale-galaxie", src: "assets/galaxie-spirale-v2.2.webp", alt: "", "aria-hidden": "true", decoding: "async", draggable: "false" });
    galaxie.addEventListener("error", function () { galaxie.remove(); });
    var trace = svg("svg", { class: "spirale-trace", "aria-hidden": "true", focusable: "false" });
    var groupe = svg("g", {});
    var chemin = svg("path", { class: "spirale-bras" });
    var halo = svg("path", { class: "spirale-halo" });
    groupe.appendChild(halo); groupe.appendChild(chemin); trace.appendChild(groupe);
    var liste = el("ol", { class: "spirale-liste", "aria-label": "Étapes, du centre (naissance) vers l’extérieur (aujourd’hui)" });

    function borne(b, cle) {
      var img = el("img", { src: b.image, alt: "", width: "28", height: "28", decoding: "async" });
      img.addEventListener("error", function () { img.remove(); });
      return el("li", { class: "spirale-noeud repere " + cle }, [
        el("span", { class: "spirale-bulle repere" }, [img, el("span", null, [el("strong", { text: b.texte }), " · " + b.annee])])
      ]);
    }
    var elements = [borne(options.debut, "debut")];
    items.forEach(function (it) {
      var a = el("a", { href: it.href, class: "spirale-bulle " + it.type + (it.important ? " important" : "") }, [
        el("span", { class: "spirale-titre", text: it.titre }),
        el("span", { class: "visuellement-cache", text: " (" + it.libelle + (it.important ? ", élément marquant" : "") + ")" })
      ]);
      elements.push(el("li", { class: "spirale-noeud " + it.type }, [a]));
    });
    elements.push(borne(options.fin, "fin"));
    elements.forEach(function (li) { liste.appendChild(li); });
    scene.appendChild(galaxie); scene.appendChild(trace); scene.appendChild(liste);
    taille.appendChild(scene); fenetre.appendChild(taille);
    racine.appendChild(outils);
    if (options.legende) racine.appendChild(options.legende);
    racine.appendChild(statut);
    racine.appendChild(fenetre);

    function mesurer() {
      var mesures = elements.map(function (li, i) {
        var b = li.firstChild;
        return { li: li, id: i === 0 ? "naissance" : i === elements.length - 1 ? "aujourdhui" : items[i - 1].id,
          w: b.offsetWidth / 2, h: b.offsetHeight / 2 };
      });
      if (!mesures[1] || !mesures[1].w) return false; // pas encore affiché (vue liste)
      var cle = mesures.map(function (n) { return n.w + "x" + n.h; }).join(",");
      if (geo && cle === signature) return true;   // tailles inchangées : rien à recalculer
      var premier = !geo;
      signature = cle; noeuds = mesures;
      geo = placer(noeuds);
      centre = Math.ceil(geo.ext + BORD);
      scene.style.width = scene.style.height = (2 * centre) + "px";
      trace.setAttribute("width", 2 * centre); trace.setAttribute("height", 2 * centre);
      trace.setAttribute("viewBox", "0 0 " + 2 * centre + " " + 2 * centre);
      var d = "", dHalo = "";
      for (var t = 0; t <= geo.tFin + 0.15; t += 0.04) {
        var r = geo.b * t, x = centre + r * Math.cos(t), y = centre + r * Math.sin(t);
        d += (d ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      for (var u = 0; u <= geo.tFin + 0.6; u += 0.04) { // second bras discret, décalé d’un demi-tour : effet galaxie
        var r2 = geo.b * u * 0.92, x2 = centre + r2 * Math.cos(u + Math.PI), y2 = centre + r2 * Math.sin(u + Math.PI);
        dHalo += (dHalo ? " L" : "M") + x2.toFixed(1) + " " + y2.toFixed(1);
      }
      chemin.setAttribute("d", d); halo.setAttribute("d", dHalo);
      appliquerZoom(!premier); // premier affichage : vue centrée sur la naissance
      dessiner();
      return true;
    }

    function dessiner() {
      if (!geo) return;
      var phi = etat.angle - Math.PI / 2; // départ vers le haut
      noeuds.forEach(function (n) {
        var x = centre + n.r * Math.cos(n.t + phi) - n.w, y = centre + n.r * Math.sin(n.t + phi) - n.h;
        n.li.style.transform = "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px)";
      });
      groupe.setAttribute("transform", "rotate(" + (phi * 180 / Math.PI).toFixed(3) + " " + centre + " " + centre + ")");
      galaxie.style.transform = "rotate(" + (phi * 180 / Math.PI).toFixed(3) + "deg)";
    }

    function tourne() { return !pauseUtilisateur && !survol && !focus && !toucher; }
    function majStatut() {
      bPause.textContent = pauseUtilisateur ? (mouvementReduit.matches ? "Lancer la rotation" : "Reprendre la rotation") : "Mettre en pause";
      statut.textContent = pauseUtilisateur
        ? (mouvementReduit.matches ? "Spirale fixe (mouvement réduit demandé)." : "Rotation en pause.")
        : tourne() ? "Rotation très lente vers la droite : un tour en 10 minutes." : "Rotation suspendue pendant la sélection.";
    }
    function boucle(now) {
      if (!actif) return;
      horloge = requestAnimationFrame(boucle);
      if (!dernier) { dernier = now; return; }
      var dt = now - dernier;
      if (dt < IMAGE_MS) return;
      dernier = now;
      if (!tourne() || dt > 1000) return; // onglet masqué ou reprise : pas de saut
      etat.angle = (etat.angle + dt / 1000 * 2 * Math.PI / DUREE) % (2 * Math.PI);
      dessiner();
    }

    // Le zoom agrandit la surface défilable ; le point central de la vue reste en place.
    function appliquerZoom(garderCentre) {
      var cx = 0.5;
      if (garderCentre && taille.offsetWidth) cx = (fenetre.scrollLeft + fenetre.clientWidth / 2) / taille.offsetWidth;
      var cote = 2 * centre * zoom;
      taille.style.width = taille.style.height = cote + "px";
      scene.style.transform = zoom === 1 ? "" : "scale(" + zoom + ")";
      vZoom.textContent = Math.round(zoom * 100) + " %";
      bMoins.disabled = zoom === ZOOMS[0]; bPlus.disabled = zoom === ZOOMS[ZOOMS.length - 1];
      fenetre.scrollLeft = Math.max(0, cx * cote - fenetre.clientWidth / 2);
    }
    function changerZoom(sens) {
      var i = ZOOMS.indexOf(zoom) + sens;
      if (i < 0 || i >= ZOOMS.length) return;
      zoom = ZOOMS[i]; appliquerZoom(true);
    }

    bPause.addEventListener("click", function () { pauseUtilisateur = !pauseUtilisateur; majStatut(); });
    bMoins.addEventListener("click", function () { changerZoom(-1); });
    bPlus.addEventListener("click", function () { changerZoom(1); });
    // Souris : arrêt tant que le pointeur est sur une bulle.
    scene.addEventListener("pointerover", function (e) {
      if (e.pointerType !== "mouse") return;
      var sur = !!(e.target.closest && e.target.closest(".spirale-bulle"));
      if (sur !== survol) { survol = sur; majStatut(); }
    });
    scene.addEventListener("pointerleave", function () { if (survol) { survol = false; majStatut(); } });
    // Tactile : arrêt pendant le toucher et quelques secondes après, pour viser une bulle sans qu’elle bouge.
    fenetre.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") return;
      clearTimeout(toucher); toucher = setTimeout(function () { toucher = null; majStatut(); }, 6000); majStatut();
    });
    scene.addEventListener("focusin", function () { focus = true; majStatut(); });
    scene.addEventListener("focusout", function (e) { if (!scene.contains(e.relatedTarget)) { focus = false; majStatut(); } });
    function preference() { pauseUtilisateur = mouvementReduit.matches; majStatut(); }
    if (mouvementReduit.addEventListener) mouvementReduit.addEventListener("change", preference);

    function relancer() { clearTimeout(minuterie); minuterie = setTimeout(mesurer, 120); }
    var observateur = window.ResizeObserver ? new ResizeObserver(relancer) : null;
    if (observateur) elements.forEach(function (li) { observateur.observe(li.firstChild); });
    else window.addEventListener("resize", relancer);

    majStatut();
    return {
      noeud: racine,
      // Mesure immédiate après la bascule liste -> spirale, avant le prochain rendu.
      actualiser: mesurer,
      // À appeler une fois le nœud inséré dans la page.
      demarrer: function () {
        if (!mesurer()) requestAnimationFrame(mesurer);
        horloge = requestAnimationFrame(boucle);
      },
      arreter: function () {
        actif = false; cancelAnimationFrame(horloge); clearTimeout(minuterie); clearTimeout(toucher);
        if (observateur) observateur.disconnect(); else window.removeEventListener("resize", relancer);
        if (mouvementReduit.removeEventListener) mouvementReduit.removeEventListener("change", preference);
      },
      controle: function () { return controler(noeuds); }
    };
  }

  window.Spirale = { creer: creer, DUREE: DUREE };
})();
