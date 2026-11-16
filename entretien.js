/* v2.50 : page « Proposer un entretien », cible du lien du PDF (demande d'Alain du 16/11/2026).
   1. Ouvre automatiquement la messagerie habituelle (mailto:) avec le message prêt à envoyer, une seule fois.
   2. Affiche en même temps les choix de secours qui marchent sans aucun réglage : messagerie habituelle (au toucher,
      le navigateur pouvant bloquer l'ouverture automatique), Gmail, Outlook web, copie de l'adresse et du message.
   Sans données ou sans script, les recours statiques de entretien.html restent en place : il ne se passe jamais « rien ».
   Données : data/contenu.js (identite.email, identite.mail.objet / corps, identite.telephone). Revue Trinity : entretien-20261116/. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var I = window.CV && window.CV.identite;
  if (!I || !I.email || !I.mail || !I.mail.objet || !I.mail.corps) return; // recours statiques conservés
  var q = encodeURIComponent, corps = I.mail.corps.replace(/\r?\n/g, "\r\n");
  var mailto = "mailto:" + I.email + "?subject=" + q(I.mail.objet) + "&body=" + q(corps);

  $("ent-objet").textContent = I.mail.objet;
  $("ent-corps").textContent = I.mail.corps;
  $("ent-apercu").hidden = false;
  if (I.telephone && I.telephoneLien) { $("ent-tel").textContent = I.telephone; $("ent-tel").setAttribute("href", "tel:" + I.telephoneLien); }

  var choix = [
    ["Ma messagerie habituelle", mailto, "app"],
    ["Gmail", "https://mail.google.com/mail/?view=cm&fs=1&to=" + q(I.email) + "&su=" + q(I.mail.objet) + "&body=" + q(corps), "web"],
    ["Outlook.com", "https://outlook.live.com/mail/0/deeplink/compose?to=" + q(I.email) + "&subject=" + q(I.mail.objet) + "&body=" + q(corps), "web"],
    ["Outlook professionnel (Microsoft 365)", "https://outlook.office.com/mail/deeplink/compose?to=" + q(I.email) + "&subject=" + q(I.mail.objet) + "&body=" + q(corps), "web"]
  ];
  var boite = $("ent-boutons");
  boite.textContent = "";
  choix.forEach(function (c) {
    var a = document.createElement("a");
    a.className = "ent-bouton" + (c[2] === "app" ? " principal" : " secondaire");
    a.href = c[1];
    a.textContent = c[0];
    if (c[2] === "web") { a.target = "_blank"; a.rel = "noopener"; }
    boite.appendChild(a);
  });

  // Copie : adresse seule, ou message complet (objet + texte) pour une autre messagerie.
  function copie(libelle, texte, fait) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "ent-bouton secondaire";
    b.textContent = libelle;
    b.addEventListener("click", function () {
      var ok = function () { b.textContent = fait; $("ent-etat").textContent = fait; setTimeout(function () { b.textContent = libelle; }, 1800); };
      var repli = function () { window.prompt(libelle, texte); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texte).then(ok, repli);
      else repli();
    });
    boite.appendChild(b);
  }
  copie("Copier l’adresse " + I.email, I.email, "Adresse copiée ✓");
  copie("Copier le message", "Objet : " + I.mail.objet + "\n\n" + I.mail.corps, "Message copié ✓");

  // Ouverture automatique une seule fois : marqueur de session ET marqueur de l'entrée d'historique
  // (au retour arrière, même sans stockage, la tentative n'est pas relancée).
  var deja = !!(history.state && history.state.entOuvert);
  try { deja = deja || sessionStorage.getItem("ent-ouvert") === "1"; sessionStorage.setItem("ent-ouvert", "1"); } catch (e) { /* stockage indisponible */ }
  try { var etat = history.state && typeof history.state === "object" ? history.state : {}; etat.entOuvert = true; history.replaceState(etat, ""); } catch (e) { /* historique indisponible */ }
  if (deja) { $("ent-etat").textContent = "Choisissez votre messagerie ci-dessous."; return; }
  $("ent-etat").textContent = "Votre messagerie s’ouvre avec un message prêt à envoyer…";
  setTimeout(function () { window.location.href = mailto; }, 350);
  setTimeout(function () {
    $("ent-etat").textContent = "Si votre messagerie s’est ouverte, il ne reste qu’à envoyer. Sinon, choisissez-la ci-dessous.";
  }, 2500);
})();
