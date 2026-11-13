/* Personnage du parcours en 3D (2.44) : même personnage que la version SVG (âges, proportions, tenues et accessoires
   calculés par personnage.js), rendu en volumes avec Three.js dans un petit canevas qui suit ses pieds.
   Chargé à la demande par personnage.js (import dynamique) ; en cas d’échec, la version SVG reste utilisée.
   Repère : unités du viewBox du Parcours, y vers le haut, pieds à l’origine, le personnage regarde vers +z. */
const V = new URL(import.meta.url).searchParams.get("v");
const THREE = await import("./lib/three.module.min.js" + (V ? "?v=" + V : ""));

const NS = "http://www.w3.org/2000/svg", XH = "http://www.w3.org/1999/xhtml";
const PEAU = 0xf6d8bd, TRAIT = 0x1f474b;
// Cadre du canevas autour des pieds (unités du viewBox) : assez large pour un plateau, un chapeau ou un bras tendu.
const LARG = 190, HAUT = 210, BAS = 34;
const INCL = 0.2; // caméra légèrement plongeante : on voit le dessus des épaules et des pieds

function couleur(c) { return new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255); }

export function creer(calque, calqueHaut) {
  const fo = document.createElementNS(NS, "foreignObject");
  fo.setAttribute("width", LARG); fo.setAttribute("height", HAUT + BAS);
  fo.setAttribute("class", "pe-personnage pe-3d");   // même classe que la Figure SVG (contrôles communs)
  fo.setAttribute("x", -LARG / 2); fo.setAttribute("y", -HAUT);
  const canvas = document.createElementNS(XH, "canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "display:block;width:100%;height:100%;pointer-events:none";
  fo.appendChild(canvas);
  calque.appendChild(fo);
  const etiquette = document.createElementNS(NS, "text");
  etiquette.setAttribute("class", "pe-etiquette");
  (calqueHaut || calque).appendChild(etiquette);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  // Caméra orthographique : pas de déformation, l’échelle reste celle du dessin SVG.
  const D = 600, cam = new THREE.OrthographicCamera(-LARG / 2, LARG / 2, HAUT, -BAS, 1, 2000);
  cam.position.set(0, D * Math.sin(INCL), D * Math.cos(INCL)); cam.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a9a96, 1.6));
  const soleil = new THREE.DirectionalLight(0xffffff, 1.9); soleil.position.set(-180, 320, 260); scene.add(soleil);
  const contre = new THREE.DirectionalLight(0xdfeaf0, 0.6); contre.position.set(220, 120, -200); scene.add(contre);

  // Matériaux : tissus mats, peau satinée, accessoires un peu brillants.
  const mat = (c, r = 0.75, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const M = {
    peau: mat(PEAU, 0.55), haut: mat(0xffffff), bas: mat(0xffffff), bras: mat(0xffffff), chaus: mat(0xffffff, 0.5),
    cheveux: mat(0x6a4330, 0.85), oeil: mat(TRAIT, 0.3), joue: mat(0xf0a08a, 0.7), lange: mat(0xf5eee2, 0.9), bande: mat(0xb7a1cb, 0.8),
    veste: mat(0x6f8196), gilet: mat(0x1f2024, 0.6), blouse: mat(0xf6fafa, 0.8), lisere: mat(0x9fc3cf), badge: mat(0x8fb3c9, 0.4),
    cravate: mat(0x7a2e35, 0.5), noeud: mat(0x1b1b1b, 0.5), cuir: mat(0x5a3b25, 0.45), cartable: mat(0xb5562e, 0.6),
    bonnet: mat(0xd4473c, 0.9), paille: mat(0xd8b46a, 0.9), metal: mat(0xb9c2c8, 0.3, 0.8), noir: mat(0x2a2d31, 0.4),
    vert: mat(0x4f8a4a, 0.5), dossier: mat(0x3c6e9e, 0.6), plateau: mat(0xc8ced2, 0.25, 0.7), ombre: new THREE.MeshBasicMaterial({ color: 0x19383d, transparent: true, opacity: 0.16, depthWrite: false }),
    salop: mat(0x3f6aa0)
  };
  M.gant = mat(0xc98a3a, 0.6);

  // Géométries unitaires (mises à l’échelle à chaque image).
  const G = {
    boule: new THREE.SphereGeometry(0.5, 28, 20),
    gelule: new THREE.CapsuleGeometry(0.5, 1, 6, 14),          // hauteur totale 2 (1 + 2×0,5), centrée
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 24),
    tronc: new THREE.CylinderGeometry(0.5, 0.44, 1, 28),
    coque: new THREE.CylinderGeometry(0.5, 0.46, 1, 28, 1, true, Math.PI * 0.18, Math.PI * 1.64), // ouverte devant
    calotte: new THREE.SphereGeometry(0.5, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.56),
    boite: new THREE.BoxGeometry(1, 1, 1),
    tore: new THREE.TorusGeometry(0.5, 0.08, 8, 24),
    arceau: new THREE.TorusGeometry(0.5, 0.06, 8, 24, Math.PI),
    disque: new THREE.CircleGeometry(0.5, 32)
  };
  const mesh = (g, m, parent) => { const o = new THREE.Mesh(g, m); parent.add(o); return o; };
  const grp = (parent) => { const o = new THREE.Group(); parent.add(o); return o; };

  const ombre = mesh(G.disque, M.ombre, scene); ombre.rotation.x = -Math.PI / 2; ombre.renderOrder = -1;
  const racine = grp(scene);          // lacet (orientation)
  const corps = grp(racine);          // bond de la marche, bercement
  // Membres : groupe articulé (épaule/hanche) → segment haut → groupe coude/genou → segment bas → extrémité.
  function membre(cote) {
    const r = grp(corps), haut = mesh(G.gelule, M.bas, r), art = grp(r), bas = mesh(G.gelule, M.bas, art), bout = grp(art);
    return { r, haut, art, bas, bout, cote };
  }
  const jambes = [membre(-1), membre(1)], bras = [membre(-1), membre(1)];
  jambes.forEach((j) => { j.pied = mesh(G.gelule, M.chaus, j.bout); j.pied.rotation.x = Math.PI / 2; });
  bras.forEach((b) => { b.main = mesh(G.boule, M.peau, b.bout); });
  const tronc = mesh(G.tronc, M.haut, corps), ventre = mesh(G.boule, M.haut, corps), bassin = mesh(G.boule, M.bas, corps);
  const cou = mesh(G.cyl, M.peau, corps);
  const tete = grp(corps), crane = mesh(G.boule, M.peau, tete), cheveux = mesh(G.calotte, M.cheveux, tete), meche = mesh(G.boule, M.cheveux, tete);
  const yeux = [mesh(G.boule, M.oeil, tete), mesh(G.boule, M.oeil, tete)], joues = [mesh(G.boule, M.joue, tete), mesh(G.boule, M.joue, tete)];
  const nez = mesh(G.boule, M.joue, tete), oreilles = [mesh(G.boule, M.peau, tete), mesh(G.boule, M.peau, tete)];
  const col = mesh(G.tore, M.haut, corps); col.rotation.x = Math.PI / 2;
  // Nourrisson : lange (cocon) et bande.
  const cocon = mesh(G.gelule, M.lange, corps), bande = mesh(G.tore, M.bande, corps); bande.rotation.x = Math.PI / 2;
  // Vêtements et accessoires.
  const A = {
    veste: mesh(G.coque, M.veste, corps), gilet: mesh(G.coque, M.gilet, corps), blouse: mesh(G.coque, M.blouse, corps),
    lisere: mesh(G.tore, M.lisere, corps), salopette: mesh(G.boite, M.salop, corps), cravate: mesh(G.boite, M.cravate, corps),
    noeud: grp(corps), badge: mesh(G.boite, M.badge, corps), cartable: mesh(G.boite, M.cartable, corps),
    bonnet: grp(tete), chapeau: grp(tete), casque: grp(tete), lunettes: grp(tete)
  };
  A.salopette.userData.bretelles = [mesh(G.boite, M.salop, corps), mesh(G.boite, M.salop, corps)];
  [-1, 1].forEach((k) => { const n = mesh(G.boule, M.noeud, A.noeud); n.position.x = k * 0.32; n.scale.set(0.55, 0.42, 0.3); });
  mesh(G.calotte, M.bonnet, A.bonnet).scale.setScalar(1.12); const pompon = mesh(G.boule, M.lange, A.bonnet); pompon.position.y = 0.6; pompon.scale.setScalar(0.24);
  const bord = mesh(G.cyl, M.paille, A.chapeau); bord.scale.set(1.9, 0.04, 1.9); const fond = mesh(G.cyl, M.paille, A.chapeau); fond.position.y = 0.2; fond.scale.set(1.02, 0.42, 1.02);
  const ruban = mesh(G.cyl, M.vert, A.chapeau); ruban.position.y = 0.06; ruban.scale.set(1.05, 0.1, 1.05);
  const arceau = mesh(G.arceau, M.noir, A.casque); arceau.scale.setScalar(1.1);
  [-1, 1].forEach((k) => { const e = mesh(G.boule, M.noir, A.casque); e.position.set(k * 0.55, 0, 0); e.scale.set(0.16, 0.32, 0.3); });
  const micro = mesh(G.cyl, M.noir, A.casque); micro.scale.set(0.035, 0.5, 0.035); micro.position.set(0.42, -0.3, 0.32); micro.rotation.set(0.9, 0, 0.7);
  [-1, 1].forEach((k) => { const l = mesh(G.tore, M.noir, A.lunettes); l.position.x = k * 0.21; l.scale.setScalar(0.32); });
  const pontL = mesh(G.boite, M.noir, A.lunettes); pontL.scale.set(0.12, 0.02, 0.02);
  // Objets tenus : dans la main gauche (k = -1) ou droite (k = 1).
  const tenus = {
    porteDoc: [mesh(G.boite, M.cuir, bras[0].bout), -1], dossier: [mesh(G.boite, M.dossier, bras[0].bout), -1],
    panier: [mesh(G.cyl, M.paille, bras[0].bout), -1], arrosoir: [grp(bras[0].bout), -1], laptop: [grp(bras[0].bout), -1],
    marteau: [grp(bras[1].bout), 1], plateau: [grp(bras[1].bout), 1]
  };
  const arro = tenus.arrosoir[0]; mesh(G.cyl, M.vert, arro).scale.set(1, 0.9, 1);
  const bec = mesh(G.cyl, M.vert, arro); bec.scale.set(0.14, 1.1, 0.14); bec.position.set(0, 0.2, 0.75); bec.rotation.x = 0.95;
  const lap = tenus.laptop[0]; mesh(G.boite, M.noir, lap).scale.set(1, 0.06, 0.7); const ecran = mesh(G.boite, M.metal, lap); ecran.scale.set(1, 0.7, 0.04); ecran.position.set(0, 0.34, -0.36); ecran.rotation.x = -0.25;
  const mar = tenus.marteau[0]; mesh(G.cyl, M.cuir, mar).scale.set(0.12, 1, 0.12); const tm = mesh(G.boite, M.metal, mar); tm.scale.set(0.24, 0.2, 0.6); tm.position.y = -0.5;
  const pla = tenus.plateau[0]; mesh(G.cyl, M.plateau, pla).scale.set(2, 0.06, 2); const verre = mesh(G.cyl, M.lisere, pla); verre.scale.set(0.3, 0.6, 0.3); verre.position.set(0.3, 0.33, 0.2);

  let lacet = 0, w = 0, h = 0;

  function dimensionner() {
    // Taille réelle du canevas à l’écran (net sur écran haute densité, sans gaspillage).
    const m = fo.getScreenCTM && fo.getScreenCTM(), dpr = Math.min(2, window.devicePixelRatio || 1);
    const ech = m ? Math.hypot(m.a, m.b) : 1;
    const W = Math.max(16, Math.round(LARG * ech * dpr)), H = Math.max(16, Math.round((HAUT + BAS) * ech * dpr));
    if (W !== w || H !== h) { w = W; h = H; renderer.setSize(W, H, false); }
  }

  function vis(o, poids) { o.visible = poids > 0.05; if (o.visible) o.scale.multiplyScalar(Math.min(1, 0.4 + poids * 0.6)); }
  function seg(m, ep, L) { m.scale.set(ep, L / 2, ep); m.position.y = -L / 2; } // gélule de longueur L, du point d’attache vers le bas

  /* s : paramètres calculés par personnage.js pour l’âge, la tenue, la marche et l’orientation. */
  function dessiner(s) {
    fo.setAttribute("transform", "translate(" + s.x.toFixed(2) + "," + s.y.toFixed(2) + ")");
    dimensionner();
    // Orientation : rotation douce au plus court chemin (demi-tour réel, plus de silhouette aplatie).
    let d = s.lacet - lacet; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    lacet = s.dt == null ? s.lacet : lacet + d * Math.min(1, s.dt * 9);
    racine.rotation.y = lacet;

    const { H, hh, hw, th, sw, jambe, lw, aw, amp, phase, X } = s;
    M.haut.color.copy(couleur(s.haut)); M.bas.color.copy(couleur(s.bas)); M.bras.color.copy(couleur(s.bras));
    M.chaus.color.copy(couleur(s.chaussure)); M.cheveux.color.copy(couleur(s.cheveux));
    M.salop.color.copy(couleur(s.bas)); M.veste.color.copy(couleur(s.vesteC || s.bras));
    M.blouse.color.copy(couleur(s.haut)); // 2.45 : blouse de la couleur de la tenue (bleu #a8bfd4 pour Responsable d’équipe soignant, blanc pour Agent de soins)
    if (s.badgeC) M.badge.color.copy(couleur(s.badgeC)); if (s.lisereC) M.lisere.color.copy(couleur(s.lisereC));
    if (s.cravateC) M.cravate.color.copy(couleur(s.cravateC)); else M.cravate.color.setHex(0x7a2e35);
    M.gant.color.copy(couleur(s.gant));

    const lange = s.lange, bebe = lange > 0.5, hanche = jambe, epaule = hanche + th, prof = sw * 0.62;
    const L2 = jambe / 2, Lb = s.lbras / 2;
    // Jambes : cuisse qui oscille, genou qui fléchit au décollement, pied d’appui au sol.
    let plusBas = 0;
    jambes.forEach((j, n) => {
      const ph = phase + (j.cote < 0 ? Math.PI : 0), al = 0.44 * amp * Math.sin(ph), be = 0.8 * amp * Math.max(0, Math.cos(ph + 0.45));
      j.r.position.set(j.cote * s.hw2 * 0.52, hanche, 0); j.r.rotation.x = -al;
      j.art.position.y = -L2; j.art.rotation.x = be;
      j.bout.position.y = -L2;
      const couvreHaut = s.pantalon > 0.25, couvreBas = s.pantalon > 0.75;
      j.haut.material = couvreHaut ? M.bas : M.peau; j.bas.material = couvreBas ? M.bas : M.peau;
      seg(j.haut, lw, L2); seg(j.bas, lw * 0.92, L2);
      j.pied.scale.set(lw * 0.95, lw * 0.9, lw * 0.62); j.pied.position.set(0, lw * 0.3, lw * 0.45);
      const y = hanche - L2 * Math.cos(al) - L2 * Math.cos(al - be);
      plusBas = n ? Math.min(plusBas, y) : y;
      j.r.visible = !bebe;
    });
    corps.position.y = bebe ? 0 : -plusBas + Math.abs(Math.sin(phase)) * H * 0.006 * amp;
    corps.rotation.z = Math.sin(phase * 0.5) * 0.06 * lange * s.mouv;

    // Torse, ventre, bassin, cou.
    tronc.scale.set(sw * 2 * 0.92, th, prof * 1.5); tronc.position.y = hanche + th / 2;
    ventre.scale.set(s.hw2 * 1.9, th * 0.7, prof * 1.5 + s.ventre * H * 0.12); ventre.position.set(0, hanche + th * 0.32, s.ventre * H * 0.03);
    bassin.scale.set(s.hw2 * 1.95, lw * 2, prof * 1.35); bassin.position.y = hanche;
    cou.scale.set(hw * 0.38, s.cou + hh * 0.2, hw * 0.38); cou.position.y = epaule + s.cou / 2;
    col.visible = s.colTenue > 0.4 && !bebe; col.scale.set(hw * 0.95, hw * 0.95, hw * 1.6); col.position.y = epaule + lw * 0.1;
    // Tête : crâne, calotte de cheveux, mèche, visage.
    tete.position.y = epaule + s.cou + hh * 0.46;
    crane.scale.set(hw, hh, hw * 0.96);
    cheveux.scale.set(hw * 1.07, hh * 1.04, hw * 1.04); cheveux.position.set(0, hh * 0.04, -hw * 0.03); cheveux.rotation.x = -0.42 + s.calotte * 0.2;
    cheveux.visible = s.calotte > 0.05;
    meche.visible = s.meche > 0.1; meche.scale.set(hw * 0.5, hh * 0.16, hw * 0.3); meche.position.set(hw * 0.12, hh * 0.36, hw * 0.34); meche.rotation.z = -0.3;
    yeux.forEach((e, n) => { e.scale.setScalar(hh * 0.1); e.position.set((n ? 1 : -1) * hw * 0.19, hh * 0.04, hw * 0.45); });
    joues.forEach((e, n) => { e.scale.set(hh * 0.13, hh * 0.08, hh * 0.05); e.position.set((n ? 1 : -1) * hw * 0.28, -hh * 0.12, hw * 0.4); });
    nez.scale.set(hh * 0.09, hh * 0.1, hh * 0.1); nez.position.set(0, -hh * 0.05, hw * 0.5);
    oreilles.forEach((e, n) => { e.scale.set(hh * 0.08, hh * 0.18, hh * 0.12); e.position.set((n ? 1 : -1) * hw * 0.5, 0, 0); });

    // Bras : balancement opposé aux jambes ; le serveur porte le plateau avant-bras relevé.
    bras.forEach((b) => {
      const ph = phase + (b.cote < 0 ? 0 : Math.PI), av = Math.sin(ph) * amp;
      let ga = 0.55 * av, fl = 0.22 + 0.35 * Math.max(0, av), ouv = 0.08;
      if (b.cote > 0 && X.plateau > 0.01) { ga += (0.15 - ga) * X.plateau; fl += (1.45 - fl) * X.plateau; }
      if (b.cote < 0 && (X.porteDoc + X.panier + X.arrosoir + X.dossier) > 0.3) { ga *= 0.5; fl *= 0.5; }
      if (b.cote < 0 && X.laptop > 0.3) { ga += (0.2 - ga) * X.laptop; fl += (1.3 - fl) * X.laptop; ouv = 0.3; }
      b.r.position.set(b.cote * (sw - aw * 0.2), epaule - aw * 0.55, 0);
      b.r.rotation.set(-ga, 0, b.cote * ouv);
      b.art.position.y = -Lb; b.art.rotation.x = -fl; b.bout.position.y = -Lb;
      b.haut.material = s.manche > 0.25 ? M.bras : M.peau; b.bas.material = s.manche > 0.75 ? M.bras : M.peau;
      seg(b.haut, aw, Lb); seg(b.bas, aw * 0.9, Lb);
      b.main.scale.setScalar(aw * 1.25); b.main.material = X.gants > 0.3 ? M.gant : M.peau;
      b.r.visible = !bebe;
    });

    // Nourrisson emmailloté.
    cocon.visible = bande.visible = lange > 0.02;
    if (cocon.visible) {
      const lh = H * 0.62, lr = H * 0.2;
      cocon.scale.set(lr * 2, lh / 2, lr * 1.7); cocon.position.y = lh / 2 + lr * 0.2;
      bande.scale.set(lr * 2.05, lr * 2.05, lr * 4); bande.position.y = lh * 0.55;
      const e = Math.min(1, lange * 1.4); cocon.scale.multiplyScalar(e); bande.scale.multiplyScalar(e);
      tronc.visible = ventre.visible = bassin.visible = !bebe;
      tete.position.y = bebe ? lh + lr * 0.7 : tete.position.y;
    } else tronc.visible = ventre.visible = bassin.visible = true;

    // Couches de vêtement (coques ouvertes devant) et accessoires du torse.
    const coque = (o, ech, long) => { o.scale.set(sw * 2 * 0.98 * ech, long, prof * 1.6 * ech); o.position.y = epaule - long / 2 + lw * 0.1; };
    coque(A.veste, 1.06, th * 1.06); vis(A.veste, X.veste);
    coque(A.gilet, 1.04, th * 0.9); vis(A.gilet, X.gilet);
    coque(A.blouse, 1.08, th * 1.55); vis(A.blouse, X.blouse);
    A.lisere.scale.set(hw * 1.05, hw * 1.05, hw * 1.8); A.lisere.position.y = epaule + lw * 0.15; vis(A.lisere, X.lisere);
    A.salopette.scale.set(sw * 1.1, th * 0.5, prof * 0.2); A.salopette.position.set(0, hanche + th * 0.32, prof * 0.74); vis(A.salopette, X.salopette);
    A.salopette.userData.bretelles.forEach((o, n) => { o.scale.set(lw * 0.5, th * 0.75, prof * 0.16); o.position.set((n ? 1 : -1) * sw * 0.45, hanche + th * 0.62, prof * 0.72); o.visible = A.salopette.visible; });
    A.cravate.scale.set(lw * 0.7, th * 0.62, lw * 0.25); A.cravate.position.set(0, epaule - th * 0.34, prof * 0.78); A.cravate.rotation.x = -0.12; vis(A.cravate, X.cravate);
    A.noeud.scale.setScalar(lw * 1.3); A.noeud.position.set(0, epaule - lw * 0.15, prof * 0.74); vis(A.noeud, X.noeud);
    A.badge.scale.set(lw * 1.1, lw * 0.75, lw * 0.15); A.badge.position.set(sw * 0.45, epaule - th * 0.3, prof * 0.8); vis(A.badge, X.badge);
    A.cartable.scale.set(sw * 1.4, th * 0.8, prof * 0.8); A.cartable.position.set(0, epaule - th * 0.45, -prof * 1.15); vis(A.cartable, X.cartable);
    // Tête : bonnet, chapeau, casque, lunettes.
    A.bonnet.scale.setScalar(hw * 1.02); A.bonnet.position.set(0, hh * 0.08, 0); vis(A.bonnet, X.bonnet);
    A.chapeau.scale.set(hw * 0.62, hh * 0.62, hw * 0.62); A.chapeau.position.set(0, hh * 0.42, 0); vis(A.chapeau, X.chapeau);
    A.casque.scale.setScalar(hw * 0.95); A.casque.position.set(0, hh * 0.05, 0); vis(A.casque, Math.max(X.casque, X.micro));
    micro.visible = X.micro > 0.05 || X.casque > 0.05;
    A.lunettes.scale.setScalar(hw); A.lunettes.position.set(0, hh * 0.04, hw * 0.5); vis(A.lunettes, X.lunettes);
    // Objets tenus.
    const u = aw * 1.4;
    for (const k in tenus) {
      const o = tenus[k][0]; o.scale.setScalar(u); o.position.set(0, 0, 0); o.rotation.set(0, 0, 0);
      if (k === "porteDoc") { o.scale.set(u * 0.5, u * 2.2, u * 2.9); o.position.y = -u * 1.1; }
      else if (k === "dossier") { o.scale.set(u * 0.25, u * 2.6, u * 2); o.position.set(0, -u * 0.2, u * 0.3); }
      else if (k === "panier") { o.scale.set(u * 2.2, u * 1.4, u * 2.2); o.position.y = -u * 0.9; }
      else if (k === "arrosoir") { o.scale.setScalar(u * 1.6); o.position.y = -u * 1.2; }
      else if (k === "laptop") { o.scale.setScalar(u * 2.6); o.position.set(0, u * 0.2, u * 0.6); }
      else if (k === "marteau") { o.scale.setScalar(u * 2.1); o.position.y = -u * 0.4; }
      else if (k === "plateau") { o.scale.setScalar(u * 1.5); o.position.set(0, u * 0.5, 0); o.rotation.x = 1.45 * X.plateau; }
      vis(o, X[k] || 0);
    }

    // Ombre au sol, à plat, qui ne tourne pas avec le personnage.
    ombre.scale.set(H * 0.5, H * 0.24, 1); ombre.position.y = 0.4;
    renderer.render(scene, cam);

    etiquette.textContent = s.texte;
    etiquette.setAttribute("x", (s.x + Math.max(sw, hw / 2) + 12).toFixed(2));
    etiquette.setAttribute("y", (s.y - (bebe ? H * 0.7 : epaule + s.cou + hh * 0.5) + 4).toFixed(2));
  }

  function detruire() {
    renderer.dispose(); try { renderer.forceContextLoss(); } catch (_) { /* déjà perdu */ }
    fo.remove(); etiquette.remove();
  }
  return { dessiner, detruire, canvas };
}
