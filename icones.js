/* Outils : dictionnaire unique, noms accessibles et infobulle hors des zones défilantes. */
(function () {
  'use strict';
  const catalogue = window.CVIcones;
  const aliases = {
    'Moovapps (GED / GMAO)': ['Moovapps'],
    'Orca (plusieurs assistants en parallèle)': ['Orca'],
    'Suno (musique)': ['Suno'],
    'GitHub et GitHub Pages': ['GitHub', 'GitHub Pages'],
    'HTML / CSS / JavaScript': ['HTML', 'CSS', 'JavaScript'],
    'Tauri / Rust': ['Tauri', 'Rust'],
    'C++ / WebAssembly': ['C++', 'WebAssembly'],
    'Git / GitHub': ['Git', 'GitHub'],
    'Excel (TCD, Power Query, Power Pivot, VBA)': ['Excel'],
    'SDK MSFS 2020 / SimConnect': ['SDK MSFS / SimConnect']
  };
  function sources(nom) {
    return (aliases[nom] || [nom]).map(n => catalogue[n]).filter(Boolean);
  }
  function outil(nom, options) {
    const o = options || {}, files = o.logo ? [o.logo] : sources(nom);
    if (!files.length) { const t = document.createElement('span'); t.className = 'outil-texte'; t.textContent = nom; return t; }
    const n = document.createElement(o.href ? 'a' : o.apercu ? 'span' : 'button');
    n.className = 'outil-icone' + (o.apercu ? ' outil-apercu' : '');
    if (o.href) n.href = o.href;
    else if (!o.apercu) n.type = 'button';
    else n.setAttribute('role', 'img');
    const label = nom + (o.description ? ' · ' + o.description : '');
    n.dataset.outil = label; n.setAttribute('aria-label', label);
    files.forEach(src => { const img = document.createElement('img'); img.src = src; img.alt = ''; img.width = img.height = 30; img.loading = 'lazy'; img.decoding = 'async'; n.append(img); });
    n.addEventListener('error', function () { n.classList.add('outil-indisponible'); if (!n.querySelector('.outil-secours')) { const s = document.createElement('span'); s.className = 'outil-secours'; s.textContent = nom; n.append(s); } }, true);
    return n;
  }
  function liste(items, apercu) {
    const list = document.createElement(apercu ? 'span' : 'ul'); list.className = apercu ? 'outils-apercu' : 'outils-icones';
    if (apercu) list.dataset.outilsNoms = items.join(' · ');
    items.forEach(nom => { const n = outil(nom, {apercu: !!apercu}); if (apercu) list.append(n); else { const li = document.createElement('li'); li.append(n); list.append(li); } });
    return list;
  }
  const dessins = {
    ia: '<path d="M12 3l2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3Z"/>',
    equipe: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0112 0v4m1-17a3 3 0 010 6m2 3a5 5 0 013 5v3"/>',
    gestion: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 5V2h8v3M8 10h8M8 14h8M8 18h5"/>',
    relation: '<path d="M20 15a7 7 0 01-7 6H3l2-4A8 8 0 1120 15Z"/><path d="M7 9h10M7 13h6"/>',
    excel: '<path d="M3 3v18h18M7 16v-5m5 5V6m5 10V9"/>',
    manuel: '<path d="M14 4a6 6 0 00-7 8L2 17l5 5 5-5a6 6 0 008-7l-4 4-4-4Z"/>',
    parcours: '<path d="M5 20h12a4 4 0 000-8H7a4 4 0 010-8h12"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="4" r="2"/>',
    savoir: '<path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3ZM12 6v16"/>',
    interets: '<path d="M12 21S2 15 2 8a5 5 0 0110-2A5 5 0 0122 8c0 7-10 13-10 13Z"/>',
    carte: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="5" cy="21" r="2"/><path d="M6 6l4 4m4 0 4-4M10 14l-4 5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>',
    lieu: '<path d="M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 0116 0Z"/><circle cx="12" cy="9" r="3"/>',
    periode: '<rect x="3" y="5" width="18" height="17" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>',
    accueil: '<path d="M2 11 12 2l10 9M5 9v13h14V9M10 22v-8h4v8"/>',
    permis: '<path d="m4 10 2-6h12l2 6M3 10h18v9H3ZM6 19v3m12-3v3M6 14h2m8 0h2"/>',
    langues: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c-6 6-6 14 0 20M12 2c6 6 6 14 0 20"/>'
  };
  function symbole(type) {
    const box = document.createElement('span'); box.className = 'repere-visuel'; box.setAttribute('aria-hidden', 'true');
    box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (dessins[type] || dessins.gestion) + '</svg>';
    return box;
  }
  const competences = {'creations-ia':'ia', ia:'ia', encadrement:'equipe', gestion:'gestion', relation:'relation', excel:'excel', manuel:'manuel', plateformes:'carte'};
  const tip = document.createElement('div'); tip.id = 'nom-outil'; tip.className = 'outil-tooltip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.append(tip);
  let active = null, pinned = false, pointerType = '', fermeture;
  function cacher() { clearTimeout(fermeture); if (active) active.removeAttribute('aria-describedby'); active = null; pinned = false; tip.hidden = true; }
  function afficher(n) {
    if (!n || !n.isConnected) return;
    clearTimeout(fermeture);
    if (active !== n) { if (active) active.removeAttribute('aria-describedby'); pinned = false; }
    active = n; tip.textContent = n.dataset.outil || n.dataset.outilsNoms; tip.hidden = false; n.setAttribute('aria-describedby', tip.id);
    const r = n.getBoundingClientRect(), b = tip.getBoundingClientRect();
    tip.style.left = Math.max(12, Math.min(innerWidth - b.width - 12, r.left + (r.width - b.width) / 2)) + 'px';
    tip.style.top = Math.max(12, Math.min(innerHeight - b.height - 12, r.top >= b.height + 16 ? r.top - b.height - 8 : r.bottom + 8)) + 'px';
  }
  function cible(t, focus) { return t.closest('[data-outil]') || (focus ? t.closest('a')?.querySelector('[data-outils-noms]') : null); }
  document.addEventListener('pointerdown', e => { pointerType = e.pointerType; if (!cible(e.target) && !tip.contains(e.target)) cacher(); });
  document.addEventListener('pointerover', e => { if (e.pointerType === 'touch' || pinned) return; const n = cible(e.target); if (n) afficher(n); });
  document.addEventListener('pointerout', e => { if (!pinned && active && active.contains(e.target) && !active.contains(document.activeElement) && !active.contains(e.relatedTarget) && !tip.contains(e.relatedTarget)) fermeture = setTimeout(cacher, 180); });
  tip.addEventListener('pointerenter', () => clearTimeout(fermeture));
  tip.addEventListener('pointerleave', () => { if (!pinned) cacher(); });
  document.addEventListener('focusin', e => { const n = cible(e.target, true); if (pointerType === 'touch' && n?.hasAttribute('data-outils-noms')) return; if (n) afficher(n); else cacher(); });
  document.addEventListener('click', e => {
    const n = cible(e.target); if (!n) return;
    const link = n.closest('a');
    if (link && pointerType === 'touch' && e.detail !== 0 && (!pinned || active !== n)) { e.preventDefault(); e.stopPropagation(); afficher(n); pinned = true; }
    else if (!link && n.tagName === 'BUTTON') { if (pinned && active === n) cacher(); else { afficher(n); pinned = true; } }
  }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Tab' || e.key === 'Enter') pointerType = 'keyboard'; if (e.key === 'Escape' && active) { cacher(); e.preventDefault(); e.stopImmediatePropagation(); } });
  document.addEventListener('scroll', () => { if (active && (active.contains(document.activeElement) || active.parentElement === document.activeElement)) afficher(active); else cacher(); }, true);
  window.addEventListener('resize', cacher); window.addEventListener('hashchange', cacher); window.addEventListener('blur', cacher);
  window.Icones = {outil, liste, symbole, competences};
})();
