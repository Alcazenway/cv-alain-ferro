/* Le numéro visible vient de contenu.js. Ce petit manifeste dérivé sert uniquement
   à sortir d'une ancienne page HTML conservée en cache, sans perdre la fiche ouverte. */
(function () {
  "use strict";
  var courant = window.CV && window.CV.mentions && window.CV.mentions.version;
  var script = document.currentScript;
  if (!courant || !script || !window.fetch || !window.AbortController) return;
  var manifeste = new URL("version.json", script.src);
  manifeste.searchParams.set("controle", String(Date.now()));
  var controle = new AbortController();
  var minuterie = setTimeout(function () { controle.abort(); }, 5000);
  fetch(manifeste.href, { cache: "no-store", credentials: "omit", signal: controle.signal })
    .then(function (reponse) { if (!reponse.ok) throw new Error("Manifeste indisponible"); return reponse.json(); })
    .then(function (donnees) {
      var derniere = donnees.version;
      if (typeof derniere !== "string" || !/^\d+\.\d+\.\d+$/.test(derniere) || derniere === courant) return;
      var cible = new URL(window.location.href);
      // Un seul essai par version, même si le réseau renvoyait encore un HTML périmé.
      if (cible.searchParams.get("_cv") === derniere) return;
      cible.searchParams.set("v", derniere);
      cible.searchParams.set("_cv", derniere);
      window.location.replace(cible.href);
    })
    .catch(function () { /* Hors ligne ou manifeste indisponible : lecture actuelle conservée. */ })
    .finally(function () { clearTimeout(minuterie); });
})();
