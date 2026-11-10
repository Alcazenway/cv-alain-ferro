/* Lecture v2.10 : chaque page tient dans une seule zone qui défile verticalement si son contenu dépasse la fenêtre.
   Remplace la pagination v2.6 (Précédent / Suivant). Textes, liens et médias originaux conservés tels quels. */
(function () {
  "use strict";
  var lecture = null;
  function noeud(tag, cls, texte) {
    var n = document.createElement(tag); n.className = cls || "";
    if (texte) n.textContent = texte; return n;
  }
  function installer(host, ajuster) {
    arreter();
    var originaux = Array.prototype.slice.call(host.childNodes);
    var cadre = noeud("div", "lecture"), fenetre = noeud("div", "lecture-fenetre"), flux = noeud("div", "lecture-flux");
    fenetre.setAttribute("tabindex", "-1"); fenetre.setAttribute("aria-label", "Contenu de la page");
    originaux.forEach(function (n) { flux.appendChild(n); });
    fenetre.appendChild(flux); cadre.appendChild(fenetre); host.appendChild(cadre); host.classList.add("lecture-hote");
    var demande = 0, actif = true;
    var sommaire = host.querySelector(".sommaire");
    if (sommaire) {
      sommaire.hidden = true;
      var raccourci = noeud("div", "lecture-sommaire");
      var label = noeud("label", "", "Parcourir : ");
      var liste = noeud("select", ""); liste.setAttribute("aria-label", sommaire.getAttribute("aria-label"));
      Array.prototype.forEach.call(sommaire.querySelectorAll(".sommaire-liste a"), function (a) {
        var o = noeud("option", "", a.textContent); o.value = a.getAttribute("href"); o.selected = a.hasAttribute("aria-current"); liste.appendChild(o);
      });
      liste.addEventListener("change", function () { location.hash = liste.value; });
      label.appendChild(liste); raccourci.appendChild(label); cadre.insertBefore(raccourci, fenetre);
    }
    function mesurer() {
      demande = 0; if (!actif || !fenetre.clientHeight) return;
      // La carte des liens occupe la fenêtre entière, sans défilement.
      cadre.classList.toggle("lecture-galaxie", !!host.querySelector(".carte-liens"));
      flux.style.setProperty("--lecture-hauteur", fenetre.clientHeight + "px");
      if (ajuster) ajuster();
    }
    function actualiser() { if (actif && !demande) demande = requestAnimationFrame(mesurer); }
    // Une vidéo sortie de la zone visible ne continue pas à jouer.
    function defilement() {
      var f = fenetre.getBoundingClientRect();
      Array.prototype.forEach.call(flux.querySelectorAll("video"), function (v) {
        var r = v.getBoundingClientRect();
        if (r.bottom <= f.top || r.top >= f.bottom) v.pause();
      });
    }
    fenetre.addEventListener("scroll", defilement, {passive: true});
    host.addEventListener("load", actualiser, true); host.addEventListener("toggle", actualiser, true);
    var ro = window.ResizeObserver ? new ResizeObserver(actualiser) : null; if (ro) ro.observe(fenetre);
    var mo = new MutationObserver(actualiser); mo.observe(flux, {subtree: true, attributes: true, attributeFilter: ["hidden"]});
    lecture = {actualiser: actualiser, fenetre: fenetre, arreter: function () {
      actif = false; cancelAnimationFrame(demande); if (ro) ro.disconnect(); mo.disconnect();
      fenetre.removeEventListener("scroll", defilement);
      host.removeEventListener("load", actualiser, true); host.removeEventListener("toggle", actualiser, true);
      originaux.forEach(function (n) { host.appendChild(n); }); cadre.remove(); host.classList.remove("lecture-hote"); if (sommaire) sommaire.hidden = false;
    }};
    mesurer();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(actualiser);
  }
  function arreter() { if (lecture) { lecture.arreter(); lecture = null; } }
  window.Lecture = {installer: installer, arreter: arreter, actualiser: function () { if (lecture) lecture.actualiser(); },
    haut: function () { if (lecture) lecture.fenetre.scrollTop = 0; }};
})();
