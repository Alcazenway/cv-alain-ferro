/* v2.51 : page « Proposer un entretien », cible du lien du PDF (demandes d'Alain du 16/11/2026).
   - Ouverture automatique de la messagerie habituelle (mailto:), une seule fois, sans élément visible.
   - Message modifiable (objet + texte) : les tuiles Gmail / Outlook.com / Outlook Pro reprennent le texte modifié.
   - Copie séparée : adresse, message.
   Sans données ou sans script, la page statique reste utilisable (liens, téléphone, message par défaut).
   Données : data/contenu.js (identite.email, identite.mail, identite.telephone, identite.cvPdf). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var I = window.CV && window.CV.identite;
  // Même composant que Présentation ; les coordonnées statiques restent disponibles sans script.
  if (I && I.nom && I.portrait && I.permis && I.langues && I.ville && window.IdentiteTerre) {
    var terre = window.IdentiteTerre.creer(I, {entretien: "#ent-objet"});
    terre.querySelector('a[href^="tel:"]').id = "ent-tel";
    terre.querySelector('a[href^="mailto:"]').id = "ent-mail";
    $("ent-identite").replaceChildren(terre);
  }
  var email = (I && I.email) || "alainferro34@gmail.com";
  var objet = $("ent-objet"), corps = $("ent-corps");
  if (I && I.mail && I.mail.objet && I.mail.corps) { objet.value = I.mail.objet; corps.value = I.mail.corps; }
  if (I && I.telephone && I.telephoneLien) { $("ent-tel").lastChild.textContent = I.telephone; $("ent-tel").setAttribute("href", "tel:" + I.telephoneLien); }

  var q = encodeURIComponent;
  var texte = function () { return corps.value.replace(/\r?\n/g, "\r\n"); };
  var mailto = function () { return "mailto:" + email + "?subject=" + q(objet.value) + "&body=" + q(texte()); };
  // Liens d'envoi recalculés à chaque modification du message.
  function liens() {
    $("env-gmail").href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + q(email) + "&su=" + q(objet.value) + "&body=" + q(texte());
    $("env-outlook").href = "https://outlook.live.com/mail/0/deeplink/compose?to=" + q(email) + "&subject=" + q(objet.value) + "&body=" + q(texte());
    $("env-365").href = "https://outlook.office.com/mail/deeplink/compose?to=" + q(email) + "&subject=" + q(objet.value) + "&body=" + q(texte());
    $("ent-mail").setAttribute("href", mailto());
  }
  // Champs en lecture seule tant que le script n'est pas actif (sans JS, le message affiché = message envoyé).
  objet.readOnly = false; corps.readOnly = false;
  objet.addEventListener("input", liens);
  corps.addEventListener("input", liens);
  liens();

  // Copie dans le presse-papiers ; coche brève sur le bouton, repli par fenêtre de saisie.
  function copier(bouton, valeur, annonce) {
    bouton.addEventListener("click", function () {
      var v = valeur();
      var ok = function () { $("ent-annonce").textContent = annonce; bouton.classList.add("fait"); setTimeout(function () { bouton.classList.remove("fait"); }, 1600); };
      var repli = function () { window.prompt("", v); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(ok, repli);
      else repli();
    });
  }
  copier($("cop-adresse"), function () { return email; }, "Adresse copiée");
  copier($("cop-message"), function () { return "Objet : " + objet.value + "\n\n" + corps.value; }, "Message copié");
  $("cop-adresse").querySelector(".txt").textContent = email;
  $("ent-copie").hidden = false;

  // Ouverture automatique une seule fois (session + entrée d'historique), texte par défaut.
  var deja = !!(history.state && history.state.entOuvert);
  try { deja = deja || sessionStorage.getItem("ent-ouvert") === "1"; sessionStorage.setItem("ent-ouvert", "1"); } catch (e) { /* stockage indisponible */ }
  try { var etat = history.state && typeof history.state === "object" ? history.state : {}; etat.entOuvert = true; history.replaceState(etat, ""); } catch (e) { /* historique indisponible */ }
  if (!deja) setTimeout(function () { window.location.href = mailto(); }, 350);
})();
