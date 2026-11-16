/* Identité commune à Présentation et Entretien : géométrie et données identiques. */
(function () {
  "use strict";
  function svg(tag, attrs, enfants) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function(k) { n.setAttribute(k, attrs[k]); });
    (enfants || []).forEach(function(e) { n.appendChild(typeof e === "string" ? document.createTextNode(e) : e); });
    return n;
  }
  window.IdentiteTerre = { creer: function (I, options) {
    options = options || {};
    var terre = svg("svg", { class: "pr-terre", viewBox: "0 0 480 480", role: "group", "aria-labelledby": "pr-terre-titre" });
    // Géométrie, voile et reflet de la maquette validée. Aucune donnée personnelle en HTML interpolé.
    terre.innerHTML = '<title id="pr-terre-titre"></title><defs>' +
      '<clipPath id="pr-terre-clip"><circle cx="240" cy="240" r="226"/></clipPath>' +
      '<linearGradient id="pr-voile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04142C" stop-opacity=".12"/><stop offset=".42" stop-color="#04142C" stop-opacity=".5"/><stop offset="1" stop-color="#04142C" stop-opacity=".76"/></linearGradient>' +
      '<radialGradient id="pr-bord" cx=".42" cy=".38" r=".62"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#01060F" stop-opacity=".55"/></radialGradient>' +
      '<radialGradient id="pr-reflet"><stop offset="0" stop-color="#fff" stop-opacity=".72"/><stop offset=".55" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<filter id="pr-detourage" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1" stdDeviation="1.2" flood-color="#03122A" flood-opacity=".9"/></filter></defs>' +
      '<g clip-path="url(#pr-terre-clip)" aria-hidden="true"><image href="assets/presentation/terre-apollo17-640.jpg" x="14" y="14" width="452" height="452"/><rect x="14" y="14" width="452" height="452" fill="url(#pr-voile)"/><circle cx="240" cy="240" r="226" fill="url(#pr-bord)"/></g>' +
      '<ellipse cx="160" cy="112" rx="104" ry="56" fill="url(#pr-reflet)" opacity=".5" transform="rotate(-24 160 112)" aria-hidden="true"/>' +
      (options.sansContour ? "" : '<circle cx="240" cy="240" r="226" fill="none" stroke="#8FC3F0" stroke-width="4" opacity=".9" aria-hidden="true"/>');
    terre.querySelector("title").textContent = I.nom + ", coordonnées et proposition d’entretien";
    terre.appendChild(svg("image", { href: "assets/presentation/portrait-detoure-440.png", x: 150, y: 34, width: 180, height: 180, role: "img", "aria-label": I.portrait.alt }));
    var textes = svg("g", { "text-anchor": "middle", fill: "#fff", filter: "url(#pr-detourage)", "font-family": "Segoe UI, Arial, sans-serif" });
    function ligne(y, taille, texte, couleur, gras, lien, label) {
      var n = svg("text", { x: 240, y: y, "font-size": taille, "font-weight": gras || 700, fill: couleur || "#FFFFFF" }, [texte]);
      if (lien) {
        // Zone tactile élargie et invisible ; texte sans soulignement.
        var a = svg("a", { href: lien, "aria-label": label || texte, class: "pr-contact" });
        a.appendChild(svg("rect", { x: 80, y: y - taille - 5, width: 320, height: taille + 14, rx: 5, fill: "transparent", "aria-hidden": "true" }));
        a.appendChild(n); textes.appendChild(a);
      } else textes.appendChild(n);
    }
    var nom = I.nom.split(" "); nom[nom.length - 1] = nom[nom.length - 1].toUpperCase();
    // Accroche retirée de la Présentation (demande d'Alain, 16/11/2026) ; donnée conservée dans contenu.js.
    ligne(258, 28, nom.join(" "), null, 700);
    ligne(308, 26, I.telephone, null, 700, "tel:" + I.telephoneLien, "Téléphoner à " + I.nom + " : " + I.telephone);
    ligne(336, 18, I.email, null, 700, "mailto:" + I.email, "Écrire à " + I.nom + " : " + I.email);
    var permis = I.permis.split(" · ");
    ligne(362, 14, I.ville.replace(/[()]/g, "") + " · " + permis[0].replace(" et véhicule", " · Véhicule"), null, 700);
    ligne(381, 14, (permis[1] || "") + " · " + I.langues.replace(" courant", "").replace(" · Anglais", ", anglais"), null, 700);
    if (!options.sansEntretien) ligne(418, 19, "Proposer un entretien", null, 700, options.entretien || "entretien.html");
    terre.appendChild(textes);
    return terre;
  }};
})();
