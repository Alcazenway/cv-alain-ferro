// Lecteur du CV (2.33.0) : zones cliquables posées en pourcentages sur l'image de la page, d'après les liens du PDF.
(function () {
  "use strict";
  var D = window.CV_LIENS, page = document.getElementById("cvl-page");
  if (!D || !page) return;
  function nom(u) {
    if (/^tel:/.test(u)) return "Appeler Alain Ferro";
    if (/^mailto:.*subject=/.test(u)) return "Proposer un entretien par courriel";
    if (/^mailto:/.test(u)) return "Écrire à Alain Ferro";
    var r = (u.split("#")[1] || "/").replace(/^\//, "");
    return r ? "Ouvrir la page " + decodeURIComponent(r).replace(/[\/-]/g, " ") : "Ouvrir la présentation";
  }
  D.liens.forEach(function (l) {
    var a = document.createElement("a");
    a.className = "cvl-lien" + (l.b ? " bulle" : "");
    a.href = l.u;
    a.setAttribute("aria-label", nom(l.u));
    a.style.left = l.x + "%"; a.style.top = l.y + "%"; a.style.width = l.w + "%"; a.style.height = l.h + "%";
    page.appendChild(a);
  });
})();
