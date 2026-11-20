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
    // 2.70.0 (Alain, 3A) : disque très pâle aux couleurs de la charte à la place de la Terre ; aucune image de fond.
    terre.innerHTML = '<title id="pr-terre-titre"></title><defs>' +
      '<radialGradient id="pr-disque" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".72" stop-color="#F6F9F8"/><stop offset="1" stop-color="#E8F0EE"/></radialGradient></defs>' +
      '<circle cx="240" cy="240" r="226" fill="url(#pr-disque)" aria-hidden="true"/>' +
      '<circle cx="240" cy="240" r="225" fill="none" stroke="#C9DCD9" stroke-width="2" aria-hidden="true"/>' +
      (options.sansContour ? "" : '<circle cx="240" cy="240" r="231" fill="none" stroke="#155E66" stroke-width="3" opacity=".55" aria-hidden="true"/>');
    terre.querySelector("title").textContent = I.nom + ", coordonnées et proposition d’entretien";
    terre.appendChild(svg("image", { href: "assets/presentation/portrait-detoure-440.png", x: 150, y: 34, width: 180, height: 180, role: "img", "aria-label": I.portrait.alt }));
    var textes = svg("g", { "text-anchor": "middle", fill: "#22313A", "font-family": "Segoe UI, Arial, sans-serif" });
    function ligne(y, taille, texte, couleur, gras, lien, label) {
      var n = svg("text", { x: 240, y: y, "font-size": taille, "font-weight": gras || 700, fill: couleur || "#22313A" }, [texte]);
      if (lien) {
        // Zone tactile élargie et invisible ; texte sans soulignement.
        var a = svg("a", { href: lien, "aria-label": label || texte, class: "pr-contact" });
        a.appendChild(svg("rect", { x: 80, y: y - taille - 5, width: 320, height: taille + 14, rx: 5, fill: "transparent", "aria-hidden": "true" }));
        a.appendChild(n); textes.appendChild(a);
      } else textes.appendChild(n);
    }
    var nom = I.nom.split(" "); nom[nom.length - 1] = nom[nom.length - 1].toUpperCase();
    // Accroche retirée de la Présentation (demande d'Alain, 16/11/2026) ; donnée conservée dans contenu.js.
    ligne(258, 31, nom.join(" "), "#155E66", 700);
    ligne(300, 28, I.telephone, null, 700, "tel:" + I.telephoneLien, "Téléphoner à " + I.nom + " : " + I.telephone);
    ligne(333, 20, I.email, null, 600, "mailto:" + I.email, "Écrire à " + I.nom + " : " + I.email);
    // 2.65.0 (Alain) : cinq lignes centrées et régulières : nom, téléphone, e-mail, ville, permis (comme le PDF).
    ligne(362, 18.5, I.ville.replace(/[()]/g, ""), null, 600);
    ligne(389, 18.5, I.permis, null, 600);
    if (!options.sansEntretien) ligne(428, 20, "Proposer un entretien", "#155E66", 700, options.entretien || "entretien.html");
    terre.appendChild(textes);
    // 2.60.0 : globe animé sous le portrait (Présentation). Repli = cette même photo fixe.
    // 2.70.0 : globe animé retiré avec la Terre (décision 3A).
    return terre;
  }};
})();
