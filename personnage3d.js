/* Personnage du parcours en 3D (2.44) : même personnage que la version SVG (âges, proportions, tenues et accessoires
   calculés par personnage.js), rendu en volumes avec Three.js dans un petit canevas qui suit ses pieds.
   Chargé à la demande par personnage.js (import dynamique) ; en cas d’échec, la version SVG reste utilisée.
   Repère : unités du viewBox du Parcours, y vers le haut, pieds à l’origine, le personnage regarde vers +z. */
const V = new URL(import.meta.url).searchParams.get("v");
const THREE = await import("./lib/three.module.min.js" + (V ? "?v=" + V : ""));

const NS = "http://www.w3.org/2000/svg", XH = "http://www.w3.org/1999/xhtml";
const PEAU = 0xefc7a6, TRAIT = 0x1f474b;
// Cadre du canevas autour des pieds (unités du viewBox) : assez large pour un plateau, un chapeau ou un bras tendu.
const LARG = 190, HAUT = 210, BAS = 34;
const INCL = 0.2; // caméra légèrement plongeante : on voit le dessus des épaules et des pieds

// 2.45 : couleurs des tenues lues comme sRGB (teintes fidèles aux codes hexadécimaux, ex. bleu #a8bfd4 d’Alain).
function couleur(c) { return THREE.SRGBColorSpace ? new THREE.Color().setRGB(c[0] / 255, c[1] / 255, c[2] / 255, THREE.SRGBColorSpace) : new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255); }

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
  // 2.45 : visage d’Alain (barbe, sourcils, sourire), commandant de bord, stéthoscope, mallette, col en V.
  Object.assign(M, { barbe: mat(0x4a3a30, 0.95), sourcil: mat(0x2f231c, 0.9), dents: mat(0xfbfaf6, 0.4), levre: mat(0xa4524a, 0.6),
    nez: mat(PEAU, 0.55), marine: mat(0x1f2b45, 0.6), or: mat(0xd9a92b, 0.3, 0.75), stetho: mat(0x3a3f45, 0.35), mallette: mat(0x2a211c, 0.45),
    vcol: mat(0x6f8fae, 0.7), colC: mat(0xffffff, 0.7), patte: mat(0xffffff, 0.7) });

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
    disque: new THREE.CircleGeometry(0.5, 32),
    // 2.45 : pans de blouse (de la taille aux genoux, légèrement évasés, ouverts devant), barbe (bas du visage),
    // bouche en D (moitié basse d’une sphère), visière (demi-disque).
    jupe: new THREE.CylinderGeometry(0.5, 0.6, 1, 28, 1, true, Math.PI * 0.22, Math.PI * 1.56),
    menton: new THREE.SphereGeometry(0.5, 28, 14, -Math.PI * 0.14, Math.PI * 1.28, Math.PI * 0.6, Math.PI * 0.4),
    // 2.47 : barbe collier — fine bande le long de la mâchoire (d'une oreille à l'autre), inclinée pour remonter vers les oreilles.
    collier: new THREE.SphereGeometry(0.5, 40, 6, -Math.PI * 0.16, Math.PI * 1.32, Math.PI * 0.68, Math.PI * 0.17),
    bol: new THREE.SphereGeometry(0.5, 20, 10, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5),
    visiere: new THREE.CylinderGeometry(0.5, 0.5, 1, 24, 1, false, -Math.PI / 2, Math.PI)
  };
  const mesh = (g, m, parent) => { const o = new THREE.Mesh(g, m); parent.add(o); return o; };
  const grp = (parent) => { const o = new THREE.Group(); parent.add(o); return o; };

  // 2.49 : surfaces continues du crâne, des cheveux et de la barbe adulte.
  // Les géométries sont construites une seule fois ; aucune dépendance supplémentaire.
  const borner = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  // 2.49 v2 : pommettes gardées, joues basses et menton un peu resserrés ; sommet moins bombé.
  const largeurAdulte = y => 0.91 * (1 + 0.035 * Math.sin(Math.PI * borner(-y * 2)) - 0.055 * borner((-y - 0.08) / 0.35));
  const hauteurAdulte = y => y * 1.04 - 0.025 * Math.pow(borner((y - 0.24) / 0.26), 2);
  function surfaceAdulte(y, a, relief = 0) {
    const r = Math.sqrt(Math.max(0, 0.25 - y * y));
    return [(r * largeurAdulte(y) + relief) * Math.sin(a), hauteurAdulte(y), (r * 0.97 + relief) * Math.cos(a)];
  }
  function nappe(n, m, point, teinte) {
    const positions = [], indices = [], couleurs = [];
    for (let j = 0; j <= m; j++) for (let i = 0; i <= n; i++) {
      positions.push(...point(i / n, j / m));
      if (teinte) couleurs.push(...teinte(i / n, j / m).toArray());
    }
    for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
      const a = j * (n + 1) + i, b = a + n + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    if (teinte) g.setAttribute('color', new THREE.Float32BufferAttribute(couleurs, 3));
    g.setIndex(indices); g.computeVertexNormals(); return g;
  }
  const gVisage = G.boule.clone(), cibleVisage = G.boule.clone();
  const pVisage = cibleVisage.attributes.position;
  for (let i = 0; i < pVisage.count; i++) {
    const y = pVisage.getY(i);
    pVisage.setXYZ(i, pVisage.getX(i) * largeurAdulte(y), hauteurAdulte(y), pVisage.getZ(i) * 0.97);
  }
  cibleVisage.computeVertexNormals();
  gVisage.morphAttributes.position = [pVisage];
  gVisage.morphAttributes.normal = [cibleVisage.attributes.normal];
  // Golfes dégagés, dessus court légèrement porté vers l'avant, nuque et côtés en dégradé.
  const brun = new THREE.Color(0x241b17), court = new THREE.Color(0x827067), peauCoupe = new THREE.Color(PEAU);
  const limiteCheveux = (a) => {
    const f = Math.max(0, Math.cos(a));
    return 0.35 * Math.pow(f, 0.45) + 0.06 * Math.exp(-Math.pow((Math.abs(a) - 0.8) / 0.32, 2))
      + 0.0015 * Math.sin(37 * a); // 2.49 : nuque plus courte, contour légèrement irrégulier.
  };
  const gCoupe = nappe(64, 20, (u, v) => {
    const a = (u * 2 - 1) * Math.PI, theta = Math.acos(limiteCheveux(a) * 2) * v;
    const y = 0.5 * Math.cos(theta), dessus = borner((y - 0.1) / 0.4);
    const fonduBord = borner((1 - v) / 0.14);
    const stries = 0.0018 * Math.sin(a * 39 + theta * 15) * Math.sin(theta) * fonduBord;
    const p = surfaceAdulte(y, a, (0.006 + 0.010 * dessus * fonduBord + stries) * Math.sin(theta));
    p[1] += 0.003 + (0.018 * dessus + 0.006 * Math.cos(a) * dessus * Math.sin(theta)) * fonduBord;
    p[2] += 0.018 * dessus; return p;
  }, (u, v) => {
    const a = (u * 2 - 1) * Math.PI, y = 0.5 * Math.cos(Math.acos(limiteCheveux(a) * 2) * v);
    const fade = borner((0.22 - y) / 0.36) * (1 - Math.pow(Math.max(0, Math.cos(a)), 6));
    const bord = Math.pow(borner((v - 0.73) / 0.27), 1.4) * (1 - Math.pow(Math.max(0, Math.cos(a)), 5));
    return brun.clone().lerp(court, fade * 0.8).lerp(peauCoupe, bord);
  });
  const matCoupe = mat(0xffffff, 0.95); matCoupe.vertexColors = true; matCoupe.side = THREE.DoubleSide;
  // 2.49 : mèches fines procédurales, stables et raccordées en longitude ; aucun fichier image.
  const toileCheveux = document.createElement('canvas'); toileCheveux.width = 512; toileCheveux.height = 256;
  const pinceau = toileCheveux.getContext('2d');
  pinceau.fillStyle = '#ededed'; pinceau.fillRect(0, 0, 512, 256);
  let graineCheveux = 249;
  const hasardCheveux = () => { graineCheveux = (Math.imul(graineCheveux, 1664525) + 1013904223) >>> 0; return graineCheveux / 4294967296; };
  for (let i = 0; i < 640; i++) {
    const x = hasardCheveux() * 512, y = hasardCheveux() * 256;
    const clair = i % 3 === 0;
    pinceau.strokeStyle = clair ? '#ffffff' : '#bdbdbd'; pinceau.lineWidth = clair ? 0.8 : 1;
    for (const decalage of [-512, 0, 512]) {
      pinceau.beginPath(); pinceau.moveTo(x + decalage, y);
      pinceau.quadraticCurveTo(x + decalage + 1.5, y + 3, x + decalage + 4, y + 7 + i % 7); pinceau.stroke();
    }
  }
  const textureCheveux = new THREE.CanvasTexture(toileCheveux); textureCheveux.wrapS = THREE.RepeatWrapping;
  const uvCoupe = [];
  for (let j = 0; j <= 20; j++) for (let i = 0; i <= 64; i++) uvCoupe.push(i / 64, j / 20);
  gCoupe.setAttribute('uv', new THREE.Float32BufferAttribute(uvCoupe, 2));
  matCoupe.map = textureCheveux; matCoupe.bumpMap = textureCheveux; matCoupe.bumpScale = 0.012;
  // La barbe monte aux joues basses et aux favoris, sans couvrir la nuque.
  const gBarbePleine = nappe(48, 14, (u, v) => {
    const a = (u * 2 - 1) * 1.88, haut = -0.19 + 0.24 * Math.pow(Math.sin(Math.abs(a) * 0.84), 1.5);
    return surfaceAdulte(haut + (-0.497 - haut) * v, a, 0.003);
  }, (u, v) => {
    const bord = Math.max(Math.pow(1 - v, 10), Math.pow(Math.abs(u * 2 - 1), 18));
    return new THREE.Color(0x45352b).lerp(new THREE.Color(PEAU), bord * 0.96);
  });
  const matBarbe = mat(0xffffff, 0.96); matBarbe.side = THREE.DoubleSide; matBarbe.vertexColors = true;
  matBarbe.transparent = true; matBarbe.depthWrite = false;
  // Yeux en amande et sourcils courbes : petits volumes raccordés au visage.
  const amande = new THREE.Shape(); amande.moveTo(-0.5, 0);
  amande.quadraticCurveTo(0, 0.44, 0.5, 0); amande.quadraticCurveTo(0, -0.3, -0.5, 0);
  const gAmande = new THREE.ShapeGeometry(amande, 12);
  const gSourcil = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.5, -0.05, 0), new THREE.Vector3(-0.12, 0.13, 0.015),
    new THREE.Vector3(0.23, 0.11, 0), new THREE.Vector3(0.5, -0.06, -0.025)
  ]), 12, 0.09, 5, false);
  const blancOeil = mat(0xe6d9c7, 0.6), irisM = mat(0x37251c, 0.55), pupilleM = mat(0x15110e, 0.5);
  const sourire = new THREE.Shape(); sourire.moveTo(-0.5, 0.11);
  sourire.quadraticCurveTo(0, -0.05, 0.5, 0.11); sourire.quadraticCurveTo(0.36, -0.49, 0, -0.5);
  sourire.quadraticCurveTo(-0.36, -0.49, -0.5, 0.11);
  const gSourire = new THREE.ShapeGeometry(sourire, 18);
  function devantVisage(x, y) {
    const yy = y / 1.04, k = largeurAdulte(yy); // bouche située sous y = 0, hors aplatissement du sommet
    return 0.97 * Math.sqrt(Math.max(0, 0.25 - yy * yy - Math.pow(x / k, 2)));
  }
  for (let i = 0; i < gSourire.attributes.position.count; i++) {
    const x = gSourire.attributes.position.getX(i) * 0.44, y = gSourire.attributes.position.getY(i) * 0.24 - 0.218;
    gSourire.attributes.position.setXYZ(i, x, y, devantVisage(x, y) + 0.016);
  }
  gSourire.computeVertexNormals();
  const gDents = nappe(20, 3, (u, v) => {
    const x = (u - 0.5) * 0.88, arc = 1 - Math.pow(x / 0.5, 2);
    const xx = x * 0.44, yy = (0.07 - 0.09 * arc - v * 0.23 * arc) * 0.24 - 0.218;
    return [xx, yy, devantVisage(xx, yy) + 0.022];
  });
  const boucheM = mat(0x693e34, 0.9); boucheM.side = THREE.DoubleSide;

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
  const tete = grp(corps), crane = mesh(gVisage, M.peau, tete), cheveuxG = grp(tete), cheveux = mesh(G.calotte, M.cheveux, cheveuxG), meche = mesh(G.boule, M.cheveux, tete);
  // 2.49 : une seule masse de cheveux, pas de bande ni de boules isolées.
  const coupeG = grp(tete); mesh(gCoupe, matCoupe, coupeG);
  const visageG = grp(tete), barbePleine = mesh(gBarbePleine, matBarbe, visageG);
  const regard = [-1, 1].map(() => {
    const g = grp(visageG), blanc = mesh(gAmande, blancOeil, g), iris = mesh(G.boule, irisM, g), pupille = mesh(G.boule, pupilleM, g);
    return { g, blanc, iris, pupille, sourcil: mesh(gSourcil, M.sourcil, visageG) };
  });
  const pontNez = mesh(G.boule, M.nez, visageG), ailesNez = [-1, 1].map(() => mesh(G.boule, M.nez, visageG));
  const sourireAdulte = mesh(gSourire, boucheM, visageG), dentsAdulte = mesh(gDents, M.dents, visageG);
  const yeux = [mesh(G.boule, M.oeil, tete), mesh(G.boule, M.oeil, tete)], joues = [mesh(G.boule, M.joue, tete), mesh(G.boule, M.joue, tete)];
  const nez = mesh(G.boule, M.joue, tete), oreilles = [mesh(G.boule, M.peau, tete), mesh(G.boule, M.peau, tete)];
  // 2.45 : plus de collerette (tore « col ») au cou. Visage : sourcils, bouche souriante, barbe et moustache.
  const sourcils = [mesh(G.boite, M.sourcil, tete), mesh(G.boite, M.sourcil, tete)];
  const levre = mesh(G.bol, M.levre, tete), dents = mesh(G.bol, M.dents, tete);
  const barbe = mesh(G.collier, M.barbe, tete), moustache = mesh(G.boule, M.barbe, tete);
  // 2.47 : bouc au menton et deux traits reliant la moustache au bouc (cercle autour de la bouche), joues rasées.
  const bouc = mesh(G.boule, M.barbe, tete), coins = [-1, 1].map(() => mesh(G.gelule, M.barbe, tete));
  nez.material = M.nez;
  // 2.49 : nourrisson enveloppé, capuche ouverte sur le visage et plis de drap.
  const cocon = mesh(G.gelule, M.lange, corps), bande = mesh(G.tore, M.bande, corps); bande.rotation.x = Math.PI / 2;
  const drapOmbre = mat(0xd8d2c8, 0.98), drapClair = mat(0xfff9ef, 0.96);
  const capuche = grp(tete);
  const gCapuche = nappe(48, 18, (u, v) => {
    const a = u * Math.PI * 2, theta = 1.13 + v * (Math.PI - 1.13);
    const pli = 1 + 0.008 * Math.sin(a * 9) * Math.sin(theta);
    return [0.59 * Math.sin(theta) * Math.cos(a) * pli, 0.61 * Math.sin(theta) * Math.sin(a) * pli + 0.01, 0.55 * Math.cos(theta) - 0.005];
  });
  mesh(gCapuche, M.lange, capuche).material.side = THREE.DoubleSide;
  const courbe = (points, rayon, parent, materiau, ferme = false) => mesh(new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), ferme), 40, rayon, 5, ferme), materiau, parent);
  courbe(Array.from({ length: 48 }, (_, i) => {
    const a = i / 48 * Math.PI * 2;
    return [0.534 * Math.cos(a), 0.552 * Math.sin(a) + 0.01, 0.23 + 0.006 * Math.sin(a * 7)];
  }), 0.025, capuche, drapClair, true);
  const plisLange = grp(corps);
  const devantLange = (x, y, relief = 0.002) => {
    const bout = Math.max(0, Math.abs(y - 0.35) - 0.155) / 0.155;
    return [x, y, 0.17 * Math.sqrt(Math.max(0, 1 - bout * bout - Math.pow(x / 0.2, 2))) + relief];
  };
  // Pan rabattu : surface large et bord replié, pas de sangle autour du corps.
  mesh(nappe(24, 12, (u, v) => {
    const x = -0.165 + u * 0.33, bord = 0.43 - x * 0.72;
    return devantLange(x, bord - v * 0.12, 0.003 + 0.003 * Math.sin(v * Math.PI));
  }), drapClair, plisLange).material.side = THREE.DoubleSide;
  // Les pans croisés suivent la face avant du cocon ; le relief reste faible.
  for (const points of [
    [[-0.11, 0.59], [-0.1, 0.53], [0.035, 0.40], [0.17, 0.31]],
    [[0.13, 0.58], [0.10, 0.50], [-0.015, 0.37], [-0.16, 0.28]],
    [[-0.10, 0.20], [0, 0.17], [0.12, 0.21]]
  ]) courbe(points.map(([x, y]) => devantLange(x, y, 0.004)), 0.004, plisLange, drapOmbre);
  const tetine = grp(tete), silicone = mat(0x9eabb4, 0.45), anneauM = mat(0xd4a7a0, 0.6);
  const bouclier = mesh(G.boule, silicone, tetine); bouclier.scale.set(0.24, 0.13, 0.055);
  const boutonTetine = mesh(G.boule, anneauM, tetine); boutonTetine.scale.set(0.09, 0.075, 0.06); boutonTetine.position.z = 0.045;
  const anneauTetine = mesh(G.tore, anneauM, tetine); anneauTetine.scale.set(0.12, 0.14, 0.10); anneauTetine.position.set(0, -0.055, 0.085);
  // Vêtements et accessoires.
  const A = {
    veste: mesh(G.coque, M.veste, corps), gilet: mesh(G.coque, M.gilet, corps), blouse: mesh(G.coque, M.blouse, corps),
    jupe: mesh(G.jupe, M.blouse, corps), vcol: grp(corps), colChemise: grp(corps), stetho: grp(corps), casquette: grp(tete), epaulettes: grp(corps), ailes: grp(corps),
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
  // 2.49 : même accessoire pour les stages et l'adulte récent ; monture fine, branches et verres clairs.
  const verreM = new THREE.MeshStandardMaterial({ color: 0xe6f0f4, roughness: 0.12, transparent: true, opacity: 0.09, depthWrite: false });
  const gMonture = new THREE.TorusGeometry(0.5, 0.024, 6, 36);
  [-1, 1].forEach(k => {
    const oeilleton = grp(A.lunettes); oeilleton.position.set(k * 0.205, 0, -0.026); oeilleton.rotation.y = k * 0.22;
    const l = mesh(gMonture, M.noir, oeilleton); l.scale.set(0.32, 0.20, 0.32);
    const verre = mesh(G.disque, verreM, oeilleton); verre.scale.set(0.305, 0.187, 1); verre.position.z = 0.003;
    courbe([[k * 0.36, 0.02, -0.06], [k * 0.46, 0.015, -0.20], [k * 0.48, 0.01, -0.50]], 0.007, A.lunettes, M.noir);
  });
  courbe([[-0.045, 0.015, 0.01], [0, 0.04, 0.018], [0.045, 0.015, 0.01]], 0.007, A.lunettes, M.noir);
  // Col en V (tunique de soins, revers de la blouse) : deux bandes en V.
  [-1, 1].forEach((k) => { const b = mesh(G.boite, M.vcol, A.vcol); b.userData.k = k; });
  // Col de chemise : deux pointes de col et une patte de boutonnage (remplace l’ancienne collerette en anneau).
  [-1, 1].forEach((k) => { const b = mesh(G.boite, M.colC, A.colChemise); b.userData.k = k; });
  const patte = mesh(G.boite, M.patte, A.colChemise); patte.userData.k = 0;
  // Stéthoscope : tubulure en U autour du cou, embout métallique (unités = demi-largeur du U).
  { const u = mesh(G.arceau, M.stetho, A.stetho); u.rotation.z = Math.PI; u.scale.set(1, 1.25, 1);
    const t = mesh(G.cyl, M.stetho, A.stetho); t.scale.set(0.09, 0.5, 0.09); t.position.set(0.45, -0.85, 0.02);
    const p = mesh(G.cyl, M.metal, A.stetho); p.scale.set(0.42, 0.12, 0.42); p.rotation.x = Math.PI / 2; p.position.set(0.45, -1.12, 0.05); }
  // Casquette de commandant (unités = largeur de tête) : bandeau, calotte évasée, visière noire, insigne doré.
  { const c = A.casquette, ba = mesh(G.cyl, M.noir, c); ba.scale.set(1.08, 0.16, 1.06); ba.position.y = 0.4;
    const ca = mesh(new THREE.CylinderGeometry(0.62, 0.53, 1, 28), M.marine, c); ca.scale.set(1.04, 0.22, 1.02); ca.position.y = 0.58;
    const vi = mesh(G.visiere, M.noir, c); vi.scale.set(1.0, 0.035, 0.62); vi.position.set(0, 0.34, 0.3); vi.rotation.x = 0.28;
    const ins = mesh(G.boite, M.or, c); ins.scale.set(0.2, 0.12, 0.05); ins.position.set(0, 0.6, 0.54);
    const cor = mesh(G.boite, M.or, c); cor.scale.set(0.8, 0.03, 0.04); cor.position.set(0, 0.41, 0.56); }
  // Épaulettes marine à 4 galons dorés (unités = demi-largeur d’épaules), ailes dorées sur la poitrine.
  [-1, 1].forEach((k) => {
    const e = mesh(G.boite, M.marine, A.epaulettes); e.scale.set(0.5, 0.06, 0.34); e.position.set(k * 0.66, 0, 0);
    for (let n = 0; n < 4; n++) { const g = mesh(G.boite, M.or, A.epaulettes); g.scale.set(0.035, 0.07, 0.36); g.position.set(k * (0.8 - n * 0.08), 0, 0); }
    const a = mesh(G.boite, M.or, A.ailes); a.scale.set(0.9, 0.16, 0.12); a.position.set(k * 0.45, 0, 0); a.rotation.z = k * -0.25;
  });
  mesh(G.boule, M.or, A.ailes).scale.set(0.32, 0.32, 0.2);
  // Objets tenus : dans la main gauche (k = -1) ou droite (k = 1).
  const tenus = {
    porteDoc: [mesh(G.boite, M.cuir, bras[0].bout), -1], dossier: [mesh(G.boite, M.dossier, bras[0].bout), -1],
    panier: [mesh(G.cyl, M.paille, bras[0].bout), -1], arrosoir: [grp(bras[0].bout), -1], laptop: [grp(bras[0].bout), -1],
    marteau: [grp(bras[1].bout), 1], plateau: [grp(bras[1].bout), 1], mallette: [grp(bras[0].bout), -1]
  };
  { const ml = tenus.mallette[0], b = mesh(G.boite, M.mallette, ml); b.scale.set(0.45, 1.5, 2.1); b.position.y = -1.0;
    const an = mesh(G.arceau, M.mallette, ml); an.rotation.y = Math.PI / 2; an.scale.set(0.7, 0.55, 0.7); an.position.y = -0.25;
    const fe = mesh(G.boite, M.or, ml); fe.scale.set(0.5, 0.14, 0.3); fe.position.set(0, -0.45, 0); }
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
    if (window.PERSO3D_LACET != null) { s = Object.assign({}, s, { lacet: window.PERSO3D_LACET, dt: null }); } // outil de contrôle (planches face / profil / dos)
    let d = s.lacet - lacet; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    lacet = s.dt == null ? s.lacet : lacet + d * Math.min(1, s.dt * 9);
    racine.rotation.y = lacet;

    const { H, hh, hw, th, sw, jambe, lw, aw, amp, phase, X } = s;
    M.haut.color.copy(couleur(s.haut)); M.bas.color.copy(couleur(s.bas)); M.bras.color.copy(couleur(s.bras));
    M.chaus.color.copy(couleur(s.chaussure)); M.cheveux.color.copy(couleur(s.cheveux));
    M.salop.color.copy(couleur(s.bas)); M.veste.color.copy(couleur(s.vesteC || s.bras));
    M.blouse.color.copy(couleur(s.blouseC || s.haut)); // 2.45 : blouse de médecin bleue #a8bfd4 (Responsable équipes soignants)
    if (s.badgeC) M.badge.color.copy(couleur(s.badgeC)); if (s.lisereC) { M.lisere.color.copy(couleur(s.lisereC)); M.vcol.color.copy(couleur(s.lisereC)); }
    // 2.45 : barbe qui pousse (teinte de la peau vers le brun foncé, puis volume).
    const pousse = Math.max(0, Math.min(1, s.barbe || 0));
    M.barbe.color.setHex(PEAU).lerp(new THREE.Color(0x4a3a30), Math.min(1, 0.25 + 0.75 * Math.pow(pousse, 0.7)));
    M.nez.color.setHex(PEAU).multiplyScalar(0.94);
    M.colC.color.copy(M.haut.color).multiplyScalar(0.97); M.patte.color.copy(M.haut.color).multiplyScalar(0.82);
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
    // Tête : crâne, calotte de cheveux, mèche, visage.
    tete.position.y = epaule + s.cou + hh * 0.46;
    crane.scale.set(hw, hh, hw * 0.96);
    const maturite = borner(((s.age || 0) - 17) / 5), adulte = maturite > 0;
    crane.morphTargetInfluences[0] = maturite; // 2.49 : pommettes gardées, mâchoire affinée, transition après l'enfance.
    const adulteC = Math.max(0, Math.min(1, ((s.age || 0) - 16) / 12));
    // 2.45 : calotte tournée dans l’espace de la sphère unité puis mise à l’échelle du crâne (elle épouse la tête même très inclinée).
    cheveuxG.scale.set(hw * 1.07, hh * 1.04, hw * 1.03); cheveuxG.position.set(0, hh * 0.02, -hw * 0.02);
    cheveux.rotation.x = -0.42 + s.calotte * 0.2 - 0.36 * adulteC; // front dégagé de l’adulte (sourcils visibles)
    cheveux.visible = s.calotte > 0.05;
    // 2.49 : la coupe adulte remplace entièrement la calotte ; le dégradé est dans sa surface continue.
    cheveux.visible = cheveux.visible && !adulte;
    coupeG.visible = adulte && s.calotte > 0.05;
    coupeG.position.set(0, 0, 0); coupeG.scale.set(hw, hh, hw * 0.96);
    meche.visible = s.meche > 0.1 && !adulte; meche.scale.set(hw * 0.5, hh * 0.16, hw * 0.3); meche.position.set(hw * 0.12, hh * 0.36, hw * 0.34); meche.rotation.z = -0.3;
    // 2.45 : visage inspiré du portrait d’Alain : yeux rieurs plissés, sourcils épais, nez marqué, grand sourire, barbe.
    const zs = (y) => hw * 0.48 * Math.sqrt(Math.max(0, 1 - Math.pow(y / (hh * 0.5), 2))); // surface avant du visage à la hauteur y
    yeux.forEach((e, n) => { e.scale.set(hh * 0.1, hh * 0.055, hh * 0.06); e.position.set((n ? 1 : -1) * hw * 0.19, hh * 0.04, zs(hh * 0.04) * 0.97); });
    const adulteV = Math.max(0, Math.min(1, ((s.age || 0) - 10) / 10));
    sourcils.forEach((e, n) => { e.scale.set(hh * 0.17, hh * (0.025 + 0.02 * adulteV), hh * 0.04); e.position.set((n ? 1 : -1) * hw * 0.2, hh * 0.15, zs(hh * 0.15) * 0.99); e.rotation.set(-0.25, (n ? 1 : -1) * 0.3, (n ? -1 : 1) * 0.1); });
    joues.forEach((e, n) => { e.scale.set(hh * 0.13, hh * 0.08, hh * 0.05); e.position.set((n ? 1 : -1) * hw * 0.28, -hh * 0.1, hw * 0.4); e.visible = pousse < 0.4; });
    nez.scale.set(hh * (0.1 + 0.02 * adulteV), hh * (0.12 + 0.05 * adulteV), hh * 0.13); nez.position.set(0, -hh * 0.06, zs(-hh * 0.06) * 0.98);
    const yb = -hh * 0.235, zb = zs(yb) + (pousse > 0.02 ? hw * 0.07 * pousse : 0) + hw * 0.01;
    levre.scale.set(hh * 0.32, hh * 0.19, hh * 0.08); levre.position.set(0, yb + hh * 0.004, zb - hh * 0.015); levre.rotation.x = 0.2;
    dents.scale.set(hh * 0.27, hh * 0.13, hh * 0.08); dents.position.set(0, yb, zb); dents.rotation.x = 0.2;
    barbe.visible = moustache.visible = bouc.visible = pousse > 0.02; coins.forEach((c) => { c.visible = pousse > 0.02; });
    // Collier : bande fine sur la mâchoire, avant abaissé (menton) et côtés relevés vers les oreilles.
    barbe.scale.set(hw * (1.04 + 0.04 * pousse), hh * 1.03, hw * 0.98 * (1.05 + 0.05 * pousse)); barbe.position.set(0, -hh * 0.04, 0); barbe.rotation.x = 0.38;
    const yc = -hh * 0.4;
    bouc.scale.set(hh * 0.24, hh * (0.1 + 0.05 * pousse), hh * 0.11); bouc.position.set(0, yc, zs(yc) * 0.94 + hw * 0.02 * pousse);
    coins.forEach((c, n) => { const x = (n ? 1 : -1) * hh * 0.17, y = (yb + yc) / 2 + hh * 0.02;
      c.scale.set(hh * 0.045, hh * 0.075, hh * 0.045); c.position.set(x, y, zs(y) * 0.97); c.rotation.z = (n ? 1 : -1) * 0.25; });
    moustache.scale.set(hh * 0.3, hh * 0.06, hh * 0.08); moustache.position.set(0, yb + hh * 0.08, zs(yb + hh * 0.08) + hw * 0.02 * pousse);
    oreilles.forEach((e, n) => { e.scale.set(hh * 0.08, hh * 0.18, hh * 0.12); e.position.set((n ? 1 : -1) * hw * 0.5, 0, 0); });

    // 2.49 : visage adulte d'après portrait-bulle-360.png ; visage enfant conservé, tétine du bébé ajoutée plus bas.
    visageG.visible = adulte; visageG.scale.set(hw, hh, hw * 0.96);
    if (adulte) {
      yeux.forEach(e => { e.visible = false; }); sourcils.forEach(e => { e.visible = false; });
      joues.forEach(e => { e.visible = false; }); levre.visible = dents.visible = false;
      barbe.visible = bouc.visible = false; coins.forEach(e => { e.visible = false; });
      matBarbe.opacity = Math.pow(pousse, 0.6);
      barbePleine.visible = pousse > 0.02;
      barbePleine.scale.set(1 + pousse * 0.004, 1, 1 + pousse * 0.006);
      regard.forEach((e, n) => {
        const k = n ? 1 : -1;
        e.g.position.set(k * 0.205, 0.065, 0.442); e.g.rotation.y = k * 0.32;
        e.blanc.scale.set(0.195, 0.11, 1);
        e.iris.scale.set(0.067, 0.034, 0.018); e.iris.position.set(-k * 0.007, 0, 0.009);
        e.pupille.scale.set(0.029, 0.025, 0.01); e.pupille.position.set(-k * 0.007, 0, 0.019);
        e.sourcil.scale.set(0.255, 0.135, 0.12); e.sourcil.position.set(k * 0.205, 0.159, 0.426);
        e.sourcil.rotation.set(0, k * 0.32, -k * 0.09);
      });
      pontNez.scale.set(0.105, 0.21, 0.105); pontNez.position.set(0, -0.005, 0.475);
      nez.scale.set(hw * 0.15, hh * 0.105, hw * 0.16); nez.position.set(0, -hh * 0.075, hw * 0.505);
      ailesNez.forEach((e, n) => { e.scale.set(0.083, 0.063, 0.09); e.position.set((n ? 1 : -1) * 0.069, -0.089, 0.496); });
      moustache.scale.set(hw * 0.34, hh * 0.054, hw * 0.085); moustache.position.set(0, -hh * 0.169, hw * 0.457);
    } else {
      yeux.forEach(e => { e.visible = true; }); sourcils.forEach(e => { e.visible = true; });
      levre.visible = dents.visible = true;
    }

    // Bras : balancement opposé aux jambes ; le serveur porte le plateau avant-bras relevé.
    bras.forEach((b) => {
      const ph = phase + (b.cote < 0 ? 0 : Math.PI), av = Math.sin(ph) * amp;
      let ga = 0.55 * av, fl = 0.22 + 0.35 * Math.max(0, av), ouv = 0.08;
      if (b.cote > 0 && X.plateau > 0.01) { ga += (0.15 - ga) * X.plateau; fl += (1.45 - fl) * X.plateau; }
      if (b.cote < 0 && (X.porteDoc + X.panier + X.arrosoir + X.dossier + X.mallette) > 0.3) { ga *= 0.5; fl *= 0.5; }
      if (b.cote < 0 && X.laptop > 0.3) { ga += (0.2 - ga) * X.laptop; fl += (1.3 - fl) * X.laptop; ouv = 0.3; }
      b.r.position.set(b.cote * (sw - aw * 0.2), epaule - aw * 0.55, 0);
      b.r.rotation.set(-ga, 0, b.cote * ouv);
      b.art.position.y = -Lb; b.art.rotation.x = -fl; b.bout.position.y = -Lb;
      b.haut.material = s.manche > 0.25 ? M.bras : M.peau; b.bas.material = s.manche > 0.75 ? M.bras : M.peau;
      const am = 1 + 0.14 * Math.max(X.blouse, X.veste); // manches de blouse et de veste un peu plus amples
      seg(b.haut, aw * am, Lb); seg(b.bas, aw * 0.9 * am, Lb);
      b.main.scale.setScalar(aw * 1.25); b.main.material = X.gants > 0.3 ? M.gant : M.peau;
      b.r.visible = !bebe;
    });

    // 2.49 : capuche et tétine réservées au nourrisson ; taille issue des proportions du site, sans agrandissement.
    capuche.visible = tetine.visible = bebe;
    capuche.scale.set(hw, hh, hw * 0.96);
    tetine.scale.set(hw, hh, hw); tetine.position.set(0, -hh * 0.235, hw * 0.45);
    if (bebe) { levre.visible = dents.visible = false; meche.visible = cheveux.visible = false; }
    cou.visible = !bebe;
    // Nourrisson emmailloté.
    cocon.visible = bande.visible = lange > 0.02;
    plisLange.visible = bebe; plisLange.scale.setScalar(H);
    if (cocon.visible) {
      const lh = H * 0.62, lr = H * 0.2;
      cocon.scale.set(lr * 2, lh / 2, lr * 1.7); cocon.position.y = lh / 2 + lr * 0.2;
      bande.scale.set(lr * 2.05, lr * 2.05, lr * 4); bande.position.y = lh * 0.55;
      const e = Math.min(1, lange * 1.4); cocon.scale.multiplyScalar(e); bande.scale.multiplyScalar(e);
      bande.visible = !bebe; // les pans de drap remplacent la sangle chez le nourrisson
      tronc.visible = ventre.visible = bassin.visible = !bebe;
      tete.position.y = bebe ? lh + lr * 0.7 : tete.position.y;
    } else tronc.visible = ventre.visible = bassin.visible = true;

    // Couches de vêtement (coques ouvertes devant) et accessoires du torse.
    const coque = (o, ech, long) => { o.scale.set(sw * 2 * 0.98 * ech, long, prof * 1.6 * ech); o.position.y = epaule - long / 2 + lw * 0.1; };
    coque(A.veste, 1.06, th * 1.16); vis(A.veste, X.veste);
    coque(A.gilet, 1.04, th * 0.9); vis(A.gilet, X.gilet);
    // 2.45 : blouse de médecin = buste ajusté + pans de la taille aux genoux (plus de coque qui flotte comme une cape).
    coque(A.blouse, 1.07, th * 1.02); vis(A.blouse, X.blouse);
    { const lj = L2 * 1.15 + th * 0.12, rx = Math.max(s.hw2 * 2.05, sw * 1.55);
      A.jupe.scale.set(rx, lj, prof * 1.75); A.jupe.position.y = hanche + th * 0.1 - lj / 2; vis(A.jupe, X.blouse); }
    A.lisere.visible = false; // ancien liseré d’encolure en anneau retiré (2.45)
    { const pv = th * (X.blouse > 0.5 ? 0.62 : 0.42), lv = Math.hypot(pv, sw * 0.32);
      A.vcol.children.forEach((b) => { const k = b.userData.k;
        b.scale.set(lw * 0.3, lv, lw * 0.12); b.position.set(k * sw * 0.16, epaule - pv / 2 - lw * 0.05, prof * 0.79); b.rotation.set(-0.1, 0, k * Math.atan2(sw * 0.32, pv)); });
      A.vcol.scale.set(1, 1, 1); vis(A.vcol, X.vcol); }
    A.colChemise.children.forEach((b) => { const k = b.userData.k;
      if (k) { b.scale.set(sw * 0.34, lw * 0.75, lw * 0.14); b.position.set(k * sw * 0.17, epaule - lw * 0.22, prof * 0.8); b.rotation.set(-0.15, 0, k * -0.55); }
      else { b.scale.set(lw * 0.14, th * 0.8, lw * 0.1); b.position.set(0, epaule - th * 0.45, prof * 0.78 + s.ventre * H * 0.02); b.visible = X.cravate < 0.5; } });
    A.colChemise.scale.set(1, 1, 1); vis(A.colChemise, s.colTenue > 0.5 && !bebe ? s.colTenue : 0);
    A.stetho.scale.setScalar(sw * 0.42); A.stetho.position.set(0, epaule + lw * 0.1, prof * 0.83); vis(A.stetho, X.stetho);
    A.epaulettes.scale.set(sw, sw, prof * 1.6); A.epaulettes.position.y = epaule + lw * 0.05; vis(A.epaulettes, X.epaulettes);
    A.ailes.scale.setScalar(lw * 1.2); A.ailes.position.set(sw * 0.42, epaule - th * 0.24, prof * 0.8); vis(A.ailes, X.ailes);
    A.salopette.scale.set(sw * 1.1, th * 0.5, prof * 0.2); A.salopette.position.set(0, hanche + th * 0.32, prof * 0.74); vis(A.salopette, X.salopette);
    A.salopette.userData.bretelles.forEach((o, n) => { o.scale.set(lw * 0.5, th * 0.75, prof * 0.16); o.position.set((n ? 1 : -1) * sw * 0.45, hanche + th * 0.62, prof * 0.72); o.visible = A.salopette.visible; });
    A.cravate.scale.set(lw * 0.7, th * 0.62, lw * 0.25); A.cravate.position.set(0, epaule - th * 0.34, prof * 0.78); A.cravate.rotation.x = -0.12; vis(A.cravate, X.cravate);
    A.noeud.scale.setScalar(lw * 1.3); A.noeud.position.set(0, epaule - lw * 0.15, prof * 0.74); vis(A.noeud, X.noeud);
    A.badge.scale.set(lw * 1.1, lw * 0.75, lw * 0.15); A.badge.position.set(sw * 0.45, epaule - th * 0.3, prof * 0.8); vis(A.badge, X.badge);
    A.cartable.scale.set(sw * 1.4, th * 0.8, prof * 0.8); A.cartable.position.set(0, epaule - th * 0.45, -prof * 1.15); vis(A.cartable, X.cartable);
    // Tête : bonnet, chapeau, casque, lunettes.
    A.bonnet.scale.setScalar(hw * 1.02); A.bonnet.position.set(0, hh * 0.08, 0); vis(A.bonnet, X.bonnet);
    A.chapeau.scale.set(hw * 0.62, hh * 0.62, hw * 0.62); A.chapeau.position.set(0, hh * 0.42, 0); vis(A.chapeau, X.chapeau);
    A.casquette.scale.setScalar(hw); A.casquette.position.set(0, hh * 0.05, 0); vis(A.casquette, X.casquette);
    meche.visible = meche.visible && X.casquette < 0.6;
    coupeG.visible = coupeG.visible && Math.max(X.casquette, X.bonnet, X.chapeau) < 0.5;   // coiffe portée : la coupe est dessous
    A.casque.scale.setScalar(hw * 0.95); A.casque.position.set(0, hh * 0.05, 0); vis(A.casque, Math.max(X.casque, X.micro));
    micro.visible = X.micro > 0.05 || X.casque > 0.05;
    // 2.49 : Orchestration IA = tenue numérique (laptop), puis Aujourd'hui (44 ans, 2026).
    // Le poids historique X.lunettes des stages reste prioritaire ; aucune donnée partagée modifiée.
    const lunettesRecentes = adulte ? Math.max(X.laptop || 0, (s.age || 0) >= 44 - 1e-6 ? 1 : 0) : 0;
    A.lunettes.scale.set(hw, hh, hw); A.lunettes.position.set(0, hh * 0.065, hw * 0.49); vis(A.lunettes, Math.max(X.lunettes, lunettesRecentes));
    // Objets tenus.
    const u = aw * 1.4;
    for (const k in tenus) {
      const o = tenus[k][0]; o.scale.setScalar(u); o.position.set(0, 0, 0); o.rotation.set(0, 0, 0);
      if (k === "mallette") { o.scale.setScalar(u * 1.3); }
      else if (k === "porteDoc") { o.scale.set(u * 0.5, u * 2.2, u * 2.9); o.position.y = -u * 1.1; }
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
    textureCheveux.dispose(); // 2.49 : ressource procédurale propre à ce moteur
    renderer.dispose(); try { renderer.forceContextLoss(); } catch (_) { /* déjà perdu */ }
    fo.remove(); etiquette.remove();
  }
  return { dessiner, detruire, canvas };
}
