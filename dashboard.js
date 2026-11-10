/* Tableau de bord : mêmes données et mêmes routes que le CV détaillé. */
(function () {
  'use strict';
  const D = window.CV;
  function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  const header = document.querySelector('.bandeau-in');
  const nav = document.querySelector('.onglets-site');
  const side = node('aside', 'dashboard-side');
  side.setAttribute('aria-label', 'Explorer le profil');
  side.append(node('p', 'dashboard-label', 'Explorer le profil'), nav);
  const homeLink = nav.querySelector('[data-rubrique="presentation"]');
  homeLink.textContent = 'Présentation';
  const list = nav.querySelector('ul');
  [['#/carte', 'Carte des liens'], ['#/metiers', 'Postes visés'], ['#/realisations', 'Réalisations']].forEach(([href, text]) => {
    const li = node('li'); const a = node('a', '', text); a.href = href; li.append(a); list.append(li);
  });
  const reperesNav = {'#/':'accueil', '#/parcours':'parcours', '#/savoir-formations':'savoir', '#/competences':'gestion', '#/interets':'interets', '#/carte':'carte', '#/metiers':'relation', '#/realisations':'manuel'};
  list.querySelectorAll('a').forEach(a => a.prepend(Icones.symbole(reperesNav[a.getAttribute('href')])));
  side.append(node('p', 'dashboard-label', 'Pour aller plus loin'), document.querySelector('.pdf'));
  const mobilePdfItem = node('li', 'dashboard-mobile-pdf');
  const mobilePdf = node('a', '', 'CV · PDF'); mobilePdf.href = D.identite.cvPdf; mobilePdf.setAttribute('download', D.identite.cvPdf.split('/').pop().split('?')[0]); mobilePdfItem.append(mobilePdf); list.append(mobilePdfItem);
  document.body.insertBefore(side, document.querySelector('main'));
  const brand = node('a', 'dashboard-brand', 'Alain Ferro'); brand.href = '#/';
  const crystal = node('span', '', '◈'); crystal.setAttribute('aria-hidden', 'true'); brand.prepend(crystal);
  header.prepend(brand);
  const home = document.getElementById('accueil');
  const hero = document.getElementById('haut');
  const about = node('details', 'dashboard-about cadre');
  about.append(node('summary', '', 'Profil, coordonnées et postes recherchés'));
  const aboutBody = node('div', 'dashboard-about-body');
  ['promesse','coordonnees','postes','proposer-entretien'].forEach(id => {
    const n = document.getElementById(id);
    if (id === 'proposer-entretien') aboutBody.append(n.parentElement);
    else aboutBody.append(n.closest('aside') || n);
  });
  about.append(aboutBody);
  const title = document.querySelector('.une-identite');
  title.prepend(node('p', 'dashboard-label', D.identite.ville));
  title.append(node('p', 'dashboard-position', D.identite.accroche));
  const graphEntry = document.querySelector('.entree-carte');
  const needs = node('section', 'dashboard-needs cadre');
  needs.setAttribute('aria-labelledby', 'dashboard-needs-title');
  needs.append(node('p', 'dashboard-label', 'Votre besoin, le point de départ'));
  const h = node('h2', '', 'Quelles compétences recherchez-vous ?'); h.id = 'dashboard-needs-title'; needs.append(h);
  const grid = node('ul', 'dashboard-grid');
  const labels = {
    'creations-ia': ['Créer avec l’IA', 'Applications, visuels et outils numériques'],
    encadrement: ['Coordonner une équipe', 'Encadrement, organisation et accompagnement'],
    gestion: ['Gérer une activité', 'Administration et comptabilité junior'],
    relation: ['Accompagner les clients', 'Accueil, conseil et relation commerciale'],
    excel: ['Exploiter les données', 'Excel avancé et automatisation'],
    manuel: ['Réaliser et entretenir', 'Travaux, agencements et équipements']
  };
  Object.entries(labels).forEach(([id, texts], i) => {
    const c = D.competences.find(c => c.id === id); if (!c) return;
    const li = node('li'); const a = node('a', 'dashboard-tile'); a.href = '#/competence/' + id;
    a.append(Object.assign(node('span', 'dashboard-number'), {ariaHidden: 'true'}), node('h3', '', texts[0]), node('p', '', texts[1]));
    a.querySelector('.dashboard-number').append(Icones.symbole(Icones.competences[id]));
    const count = new Set((c.preuves || []).filter(id => D.parcours.some(p => p.id === id))).size;
    a.append(node('span', 'dashboard-proof', count + ' éléments du parcours associés →')); li.append(a); grid.append(li);
  });
  needs.append(grid);
  const all = node('a', 'dashboard-all', 'Toutes les compétences, les outils et leurs applications →'); all.href = '#/competences'; needs.append(all);
  // Les rubriques existantes restent intégrales, sur une seule page qui défile si nécessaire (v2.10), y compris les réalisations.
  home.insertBefore(needs, hero.nextSibling);
  if (graphEntry) needs.append(graphEntry);
  home.append(about);
  const mark = () => {
    const hash = location.hash || '#/';
    const section = hash.startsWith('#/competence/') ? '#/competences' : hash.startsWith('#/parcours/') ? '#/parcours' : hash;
    side.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href') === section) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  };
  window.addEventListener('hashchange', () => setTimeout(mark, 0)); setTimeout(mark, 0);
})();
