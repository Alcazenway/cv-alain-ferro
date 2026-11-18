/* Réalisations : deux courts textes et les preuves visuelles, sur le format approuvé SkyLivra. */
(function () {
  "use strict";
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "text") n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); }); return n;
  }
  var logos = {barysense: 1, knockin: 1, poussepousse: 1, "cv-interactif": 1};
  var labels = {"/realisations": "Réalisations", "/orchestration-ia": "Orchestration IA", "/parcours": "Parcours", "/parcours/simulation": "Simulation de vol"};
  window.Realisations = {
    page: function (e, parent, ouvrir) {
      var p = e.presentation; if (!p || !window.SkyLivra) return null;
      var enfants = (e.enfants || []).map(function (id) { return window.CV.parcours.filter(function (x) { return x.id === id; })[0]; }).filter(Boolean);
      return [el("div", {class: "sky re-fiche" + ((p.medias || []).length === 4 ? " re-quatre" : ""), "data-realisation": e.id}, [
        el("p", {class: "retour sky-retour"}, [el("a", {href: "#" + parent, "data-retour": "", text: "← " + (labels[parent] || "Retour")})]),
        el("header", {class: "sky-fiche-tete"}, [logos[e.id] ? el("img", {class: "re-logo", src: "assets/applis/" + e.id + ".webp", alt: ""}) : null, el("h1", {id: "fiche-titre", tabindex: "-1", text: p.titre})]),
        el("p", {class: "re-texte", text: p.resume}),
        el("p", {class: "re-texte", text: p.role}),
        window.SkyLivra.medias(p.medias || [], ouvrir),
        enfants.length ? el("nav", {class: "re-liens", "aria-label": "Réalisation associée"}, enfants.map(function (x) { return el("a", {href: "#/parcours/" + x.id, text: x.presentation ? x.presentation.titre : x.titre}); })) : null
      ])];
    }
  };
})();
