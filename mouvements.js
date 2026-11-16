/* Animations partagées : pages du site, lecteur et Entretien. Pas de boucle de calcul. */
(function () {
  "use strict";
  if (document.querySelector(".mv-ambiance")) return;
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ambiance = document.createElement("div");
  ambiance.className = "mv-ambiance";
  ambiance.setAttribute("aria-hidden", "true");
  document.body.prepend(ambiance);
  document.body.classList.add("mv-active");
  var observer = null, planifie = 0;
  var vus = new WeakSet();
  var selecteurs = [
    ".lecture-flux > .co-tete", ".lecture-flux > .retour", ".pr-profil",
    ".re-page > .page-tete", ".re-groupe", ".co-bulle-appli",
    ".fiche-tete", ".fiche-section", ".fiche-lignes", ".co-interet-tete", ".co-chapo-rubrique",
    ".co-graphe", ".ent-carte", ".ent h1", ".ent-message", ".ent-envoi", ".ent-copie",
    ".cvl-barre", ".cvl-aide", ".cvl-page"
  ].join(",");
  function montrer(n, i) {
    if (vus.has(n) || reduit.matches) return;
    vus.add(n);
    n.style.setProperty("--mv-delai", Math.min(i % 4, 3) * 60 + "ms");
    n.classList.add("mv-entree");
    n.addEventListener("animationend", function fin(ev) {
      if (ev.target !== n || ev.animationName !== "mv-entree") return;
      n.classList.remove("mv-entree"); n.removeEventListener("animationend", fin);
    });
  }
  function preparer() {
    planifie = 0;
    if (observer) observer.disconnect();
    if (reduit.matches) return;
    var elements = Array.prototype.filter.call(document.querySelectorAll(selecteurs), function(n) { return n.getClientRects().length; });
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(function(entrees) {
        entrees.forEach(function(e, i) { if (e.isIntersecting) { montrer(e.target, i); observer.unobserve(e.target); } });
      }, {threshold: .08});
      elements.forEach(function(n) { if (!vus.has(n)) observer.observe(n); });
    } else elements.forEach(montrer);
  }
  function planifier() { if (!planifie) planifie = requestAnimationFrame(preparer); }
  function visibilite() { document.documentElement.classList.toggle("mv-pause", document.hidden); }
  new MutationObserver(planifier).observe(document.body, {childList: true, subtree: true});
  document.addEventListener("visibilitychange", visibilite);
  if (reduit.addEventListener) reduit.addEventListener("change", planifier);
  else if (reduit.addListener) reduit.addListener(planifier);
  visibilite(); planifier();
})();
