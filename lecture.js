/* Lecture par écrans v2.6. La fragmentation native conserve textes, liens et médias originaux.
   Aucune copie du contenu, aucun texte raccourci : les colonnes se parcourent par pages. */
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
    var cadre = noeud("div", "lecture"), fenetre = noeud("div", "lecture-fenetre");
    var flux = noeud("div", "lecture-flux"), barre = noeud("nav", "lecture-pagination");
    fenetre.setAttribute("tabindex", "-1"); fenetre.setAttribute("aria-label", "Contenu de la page");
    barre.setAttribute("aria-label", "Pages du contenu");
    var precedent = noeud("button", "bouton secondaire", "← Précédent");
    var suivant = noeud("button", "bouton secondaire", "Suivant →");
    precedent.type = suivant.type = "button";
    var choix = noeud("select", "lecture-choix"); choix.setAttribute("aria-label", "Choisir une page du contenu");
    var statut = noeud("span", "visuellement-cache"); statut.setAttribute("role", "status");
    barre.append(precedent, choix, suivant, statut);
    originaux.forEach(function (n) { flux.appendChild(n); });
    fenetre.appendChild(flux); cadre.append(fenetre, barre); host.appendChild(cadre); host.classList.add("lecture-hote");
    var page = 0, total = 1, largeur = 0, demande = 0, actif = true;
    var sommaire = host.querySelector(".sommaire"), raccourci = null;
    if (sommaire) {
      sommaire.hidden = true;
      raccourci = noeud("div", "lecture-sommaire");
      var label = noeud("label", "", "Parcourir : ");
      var liste = noeud("select", ""); liste.setAttribute("aria-label", sommaire.getAttribute("aria-label"));
      Array.prototype.forEach.call(sommaire.querySelectorAll(".sommaire-liste a"), function (a) {
        var o = noeud("option", "", a.textContent); o.value = a.getAttribute("href"); o.selected = a.hasAttribute("aria-current"); liste.appendChild(o);
      });
      liste.addEventListener("change", function () { location.hash = liste.value; });
      label.appendChild(liste); raccourci.appendChild(label); cadre.insertBefore(raccourci, fenetre);
    }
    function afficher(index, annoncer) {
      page = Math.max(0, Math.min(total - 1, index));
      flux.style.transform = "translateX(" + (-page * (largeur + 32)) + "px)";
      precedent.disabled = page === 0; suivant.disabled = page === total - 1;
      choix.value = String(page); cadre.dataset.page = String(page + 1); cadre.dataset.pages = String(total);
      if (annoncer) statut.textContent = "Page " + (page + 1) + " sur " + total;
      // Une vidéo quittée ne continue pas à jouer hors de la vue.
      Array.prototype.forEach.call(flux.querySelectorAll("video"), function (v) {
        var r = v.getBoundingClientRect(), f = fenetre.getBoundingClientRect();
        if (r.right <= f.left || r.left >= f.right) v.pause();
      });
    }
    function mesurer() {
      demande = 0; if (!actif || !fenetre.clientWidth || !fenetre.clientHeight) return;
      var spirale = host.querySelector(".spirale:not([hidden])");
      cadre.classList.toggle("lecture-galaxie", !!spirale);
      largeur = fenetre.clientWidth;
      flux.style.setProperty("--lecture-largeur", largeur + "px");
      flux.style.setProperty("--lecture-hauteur", fenetre.clientHeight + "px");
      flux.style.height = fenetre.clientHeight + "px";
      if (ajuster) ajuster();
      total = spirale ? 1 : Math.max(1, Math.ceil((flux.scrollWidth + 32) / (largeur + 32)));
      if (choix.options.length !== total) {
        choix.textContent = "";
        for (var i = 0; i < total; i++) { var o = noeud("option", "", "Page " + (i + 1) + " / " + total); o.value = String(i); choix.appendChild(o); }
      }
      barre.hidden = !!spirale; afficher(page, false);
    }
    function actualiser() { if (actif) mesurer(); }
    function deplacement(ev) {
      if (ev.altKey || ev.ctrlKey || ev.metaKey || /^(INPUT|SELECT|TEXTAREA|VIDEO)$/.test(ev.target.tagName)) return;
      if (ev.key === "PageDown" || ev.key === "PageUp") { ev.preventDefault(); afficher(page + (ev.key === "PageDown" ? 1 : -1), true); }
    }
    function focus(ev) {
      if (!flux.contains(ev.target)) return;
      var r = ev.target.getBoundingClientRect(), f = fenetre.getBoundingClientRect();
      var cible = Math.floor((r.left - f.left + page * (largeur + 32) + 2) / (largeur + 32));
      if (cible !== page) afficher(cible, true);
    }
    precedent.addEventListener("click", function () { afficher(page - 1, true); });
    suivant.addEventListener("click", function () { afficher(page + 1, true); });
    choix.addEventListener("change", function () { afficher(Number(choix.value), true); });
    host.addEventListener("keydown", deplacement); host.addEventListener("focusin", focus);
    host.addEventListener("load", actualiser, true); host.addEventListener("toggle", actualiser, true); host.addEventListener("click", actualiser);
    var ro = window.ResizeObserver ? new ResizeObserver(actualiser) : null; if (ro) ro.observe(fenetre);
    var mo = new MutationObserver(actualiser); mo.observe(flux, {subtree: true, attributes: true, attributeFilter: ["hidden", "open"]});
    lecture = {actualiser: actualiser, arreter: function () {
      actif = false; cancelAnimationFrame(demande); if (ro) ro.disconnect(); mo.disconnect();
      host.removeEventListener("keydown", deplacement); host.removeEventListener("focusin", focus);
      host.removeEventListener("load", actualiser, true); host.removeEventListener("toggle", actualiser, true); host.removeEventListener("click", actualiser);
      originaux.forEach(function (n) { host.appendChild(n); }); cadre.remove(); host.classList.remove("lecture-hote"); if (sommaire) sommaire.hidden = false;
    }};
    mesurer();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(actualiser);
  }
  function arreter() { if (lecture) { lecture.arreter(); lecture = null; } }
  window.Lecture = {installer: installer, arreter: arreter, actualiser: function () { if (lecture) lecture.actualiser(); }};
})();
