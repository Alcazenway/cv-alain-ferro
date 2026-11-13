/* Sphères métal 2.37 : les bulles du billard dessinées en sphères métalliques gravées (Three.js local, lib/).
   Une scène WebGL par zone de billard, sous les bulles (pointer-events: none), une fenêtre par bulle (b.x, b.y, b.r
   lus dans zone.biApi après chaque pas de billard.js). La physique, les clics, le glisser et l’accessibilité restent
   ceux des éléments .bi-bulle, rendus transparents (classe bi-sphere) seulement quand leur sphère est dessinée.
   Repli : sans WebGL, sans module, carte absente ou titre modifié depuis la génération → bulle 2D intacte.
   Cartes précalculées : assets/spheres/<id>-512|1024.webp (spheres-20261113/generer.mjs), 3N×N gris
   [hauteur | patine | rugosité] ; les normales sont calculées ici (Sobel). Métaux inspirés des peintures de Satisfactory. */
const V = new URL(import.meta.url).searchParams.get("v");
const Q = V ? "?v=" + encodeURIComponent(V) : "";
const reduit = matchMedia("(prefers-reduced-motion: reduce)");
const METAUX = {
  cuivre: { couleur: "#f0a07a", rug: 0.5 },
  chrome: { couleur: "#eef2f7", rug: 0.34 },
  acier: { couleur: "#a3b4cc", rug: 0.4, vernis: 0.35 },     // acier au carbone éclairci (bleu-acier lumineux)
  caterium: { couleur: "#e6d24e", rug: 0.46 }
};
const PAR_PAGE = { competences: "acier", formation: "cuivre", interets: "chrome" };
const PAR_POSTE = { numerique: "caterium", gestion: "chrome", commerce: "cuivre", coordination: "acier" };
function metalDe(page, d) {
  if (d.vedette) return "caterium";
  if (page === "metiers") return PAR_POSTE[d.famille] || "acier";
  return PAR_PAGE[page] || "acier";
}

let THREE = null, manifeste = null, chargement = null, horsService = false;
const couches = new Set();
const petit = () => innerWidth < 700 || (matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) < 800);

function webglPossible() {
  try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); }
  catch (_) { return false; }
}
function preparer() {
  if (!chargement) {
    chargement = Promise.all([
      import("./lib/three.module.min.js" + Q),
      fetch("assets/spheres/manifeste.json" + Q).then((r) => (r.ok ? r.json() : null))
    ]).then(([m, man]) => { THREE = m; manifeste = man && man.bulles ? man.bulles : null; if (!manifeste) horsService = true; })
      .catch(() => { horsService = true; });
  }
  return chargement;
}

/* ---------- Ressources partagées par couche ---------- */
function geometrie() {
  // Projection orthographique de l’hémisphère avant : titre et motif vus de face sans distorsion.
  const geo = new THREE.SphereGeometry(1, 96, 72), p = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), l = Math.hypot(x, y) || 1;
    const r = z >= 0 ? 0.45 * Math.hypot(x, y) : 0.45 + 0.05 * (Math.acos(Math.max(-1, Math.min(1, z))) - Math.PI / 2) / (Math.PI / 2);
    uv.setXY(i, 0.5 + r * x / l, 0.5 + r * y / l);
  }
  uv.needsUpdate = true;
  return geo;
}
function studio() {
  // Dôme dégradé (ciel clair, horizon gris-bleu, sol gris) et boîtes à lumière : reflets francs et lisibles.
  const env = new THREE.Scene();
  const dome = new THREE.SphereGeometry(10, 48, 24), col = [], pos = dome.attributes.position;
  const ciel = new THREE.Color("#dfe6ee"), hor = new THREE.Color("#8a97a6"), sol = new THREE.Color("#454e58"), tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 10;
    if (y > 0) tmp.copy(hor).lerp(ciel, Math.pow(y, 0.6)); else tmp.copy(hor).lerp(sol, Math.min(1, -y * 2));
    col.push(tmp.r, tmp.g, tmp.b);
  }
  dome.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  env.add(new THREE.Mesh(dome, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
  const boite = (w, h, x, y, z, c, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  boite(5, 3.2, -5, 5.5, 4, "#fff6ea", 6);
  boite(1.2, 7, 7, 0.5, 1.5, "#e8f2ff", 4);
  boite(6, 1.2, 0, 1.2, 8, "#ffffff", 2.4);
  boite(7, 1.6, 0, -4.5, 6, "#d8e2ec", 1.8);
  boite(3, 2, 2, 6, -6, "#ffe2c4", 3);
  boite(2.4, 1.4, -6, -1, -4, "#bcd7ff", 2.5);
  return env;
}
async function cartes(url) {
  const img = new Image(); img.decoding = "async"; img.src = url; await img.decode();
  const N = img.naturalHeight, c = document.createElement("canvas"); c.width = 3 * N; c.height = N;
  const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const tuile = (k) => { const t = document.createElement("canvas"); t.width = t.height = N; t.getContext("2d").drawImage(c, k * N, 0, N, N, 0, 0, N, N); return t; };
  const h = g.getImageData(0, 0, N, N).data, nc = document.createElement("canvas"); nc.width = nc.height = N;
  const gn = nc.getContext("2d"), im = gn.createImageData(N, N), d = im.data, k = 26 * N / 2048 / 255;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = y * N + x, xm = x ? i - 1 : i, xp = x < N - 1 ? i + 1 : i, ym = y ? i - N : i, yp = y < N - 1 ? i + N : i;
    let nx = -(h[4 * xp] - h[4 * xm]) * k, ny = (h[4 * yp] - h[4 * ym]) * k, l = Math.hypot(nx, ny, 1);
    d[4 * i] = (nx / l * 0.5 + 0.5) * 255; d[4 * i + 1] = (ny / l * 0.5 + 0.5) * 255; d[4 * i + 2] = (1 / l * 0.5 + 0.5) * 255; d[4 * i + 3] = 255;
  }
  gn.putImageData(im, 0, 0);
  const tex = (cv, srgb) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 4; return t; };
  return { normale: tex(nc, false), patine: tex(tuile(1), true), rugosite: tex(tuile(2), false) };
}

/* ---------- Une couche WebGL par zone de billard ---------- */
class Couche {
  constructor(api) { this.api = api; this.zone = api.zone; this.etat = "attente"; this.spheres = new Map(); this.dernier = 0; }
  demarrer() {
    const zone = this.zone;
    const canvas = this.canvas = document.createElement("canvas");
    canvas.className = "bi-spheres"; canvas.setAttribute("aria-hidden", "true");
    const r = this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    r.setPixelRatio(Math.min(devicePixelRatio || 1, petit() ? 1.5 : 2));
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
    r.setClearColor(0x000000, 0); r.autoClear = false;
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); this.echec(); });
    zone.insertBefore(canvas, zone.firstChild);
    this.scene = new THREE.Scene();
    this.pmrem = new THREE.PMREMGenerator(r);
    const st = studio();
    this.envTex = this.pmrem.fromScene(st, 0.02).texture;
    st.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    this.scene.environment = this.envTex;
    const cle = new THREE.DirectionalLight(0xfff4e8, 3.0); cle.position.set(-3, 4, 4); this.scene.add(cle);
    const face = new THREE.DirectionalLight(0xffffff, 0.8); face.position.set(1, 0.5, 6); this.scene.add(face);
    const contre = new THREE.DirectionalLight(0xbfe0ff, 1.2); contre.position.set(4, -1, -2); this.scene.add(contre);
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); this.camera.position.set(0, 0, 5);
    this.geo = geometrie();
    this.etat = "actif";
    const grand = !petit();
    this.attendues = 0;
    this.api.bulles.forEach((b, i) => {
      const m = manifeste[b.d.id];
      if (!m || m.titre !== b.d.titre || (m.sous || "") !== (b.d.sous || "")) return;   // carte périmée : bulle 2D
      this.attendues++;
      const N = grand && b.d.vedette && m.tailles.indexOf(1024) !== -1 ? 1024 : 512;
      cartes("assets/spheres/" + b.d.id + "-" + N + ".webp" + Q).then((t) => {
        if (this.etat !== "actif") { Object.values(t).forEach((x) => x.dispose()); return; }
        const def = METAUX[metalDe(this.api.page, b.d)];
        const opts = { color: def.couleur, metalness: 1, roughness: def.rug, map: t.patine, normalMap: t.normale,
          normalScale: new THREE.Vector2(1.25, 1.25), roughnessMap: t.rugosite };
        const mat = def.vernis ? new THREE.MeshPhysicalMaterial(Object.assign(opts, { clearcoat: def.vernis, clearcoatRoughness: 0.22, clearcoatNormalMap: t.normale, clearcoatNormalScale: new THREE.Vector2(0.8, 0.8) }))
          : new THREE.MeshStandardMaterial(opts);
        const mesh = new THREE.Mesh(this.geo, mat); mesh.visible = false; this.scene.add(mesh);
        this.spheres.set(b, { mesh, mat, t, rx: 0, ry: 0, phase: i * 1.7, marquee: false });
        this.rendu();
      }).catch(() => { this.attendues--; this.verifierAttente(); /* carte illisible : bulle 2D */ });
    });
    this.verifierAttente();
  }
  // 2.41 : les bulles 2D restent invisibles pendant le chargement des sphères (plus de flash) ;
  // l’attente cesse quand toutes les sphères attendues sont dessinées, ou en cas d’échec (bulles 2D de repli).
  verifierAttente() {
    if (!this.zone.classList.contains("bi-spheres-attente")) return;
    let marquees = 0; for (const s of this.spheres.values()) if (s.marquee) marquees++;
    if (marquees >= this.attendues) finAttente(this.zone);
  }
  rendu() {
    if (this.etat === "attente") {
      if (!THREE || !this.zone.isConnected) return;
      try { this.demarrer(); } catch (_) { this.echec(); return; }
    }
    if (this.etat !== "actif") return;
    if (!this.zone.isConnected) { this.detruire(); return; }
    try { this.dessiner(); } catch (_) { this.echec(); }
  }
  dessiner() {
    const zone = this.zone, r = this.renderer, W = zone.clientWidth, H = zone.clientHeight;
    if (!W || !H) return;
    const taille = r.getSize(new THREE.Vector2());
    if (taille.x !== W || taille.y !== H) r.setSize(W, H, false);
    const now = performance.now(), dt = this.dernier ? Math.min(0.05, (now - this.dernier) / 1000) : 0.016; this.dernier = now;
    const calme = reduit.matches, t = now / 1000, lisse = calme ? 1 : 1 - Math.exp(-dt * 6);
    r.setScissorTest(false); r.clear(); r.setScissorTest(true);
    const nouvelles = [];
    for (const [b, s] of this.spheres) {
      const d = 2 * b.r;
      if (b.x + b.r < 0 || b.x - b.r > W || b.y + b.r < 0 || b.y - b.r > H) continue;
      // Bille qui roule : inclinaison dans le sens de la vitesse, bornée à ±22° pour garder le titre lisible ; légère oscillation.
      const k = 0.0009, max = 0.38;
      let tx = Math.max(-max, Math.min(max, b.vy * k)), ty = Math.max(-max, Math.min(max, b.vx * k));
      if (!calme) { tx += 0.06 * Math.sin(t * 0.43 + s.phase * 1.3); ty += 0.12 * Math.sin(t * 0.55 + s.phase); }
      s.rx += (tx - s.rx) * lisse; s.ry += (ty - s.ry) * lisse;
      s.mesh.rotation.set(s.rx - 0.05, s.ry, 0);
      for (const o of this.spheres.values()) o.mesh.visible = o === s;
      const x = b.x - b.r, y = H - b.y - b.r;
      r.setViewport(x, y, d, d); r.setScissor(x, y, d, d);
      r.clearDepth();
      r.render(this.scene, this.camera);
      if (!s.marquee) nouvelles.push([b, s]);
    }
    // Bulle 2D masquée seulement après le premier dessin réussi de sa sphère.
    nouvelles.forEach(([b, s]) => { s.marquee = true; b.n.classList.add("bi-sphere"); });
    if (nouvelles.length) this.verifierAttente();
  }
  demarquer() { this.api.bulles.forEach((b) => b.n.classList.remove("bi-sphere")); }
  echec() {
    if (this.etat === "mort") return;
    this.etat = "mort";
    this.demarquer();
    finAttente(this.zone);
    this.liberer();
  }
  detruire() { this.etat = "mort"; this.liberer(); couches.delete(this); if (this.api.rendu === this.peindre) this.api.rendu = null; }
  liberer() {
    for (const s of this.spheres.values()) { s.mat.dispose(); Object.values(s.t).forEach((x) => x.dispose()); }
    this.spheres.clear();
    if (this.geo) this.geo.dispose();
    if (this.envTex) this.envTex.dispose();
    if (this.pmrem) this.pmrem.dispose();
    if (this.renderer) { this.renderer.dispose(); try { this.renderer.forceContextLoss(); } catch (_) { /* déjà perdu */ } }
    if (this.canvas) this.canvas.remove();
  }
}

function finAttente(zone) { zone.classList.remove("bi-spheres-attente"); }

// Zones quittées (changement de page) : contexte WebGL libéré, pour ne jamais en accumuler.
function balayer() { for (const c of couches) if (!c.zone.isConnected && c.etat === "actif") c.detruire(); }
function attacher(api) {
  if (!api || api.biSpheres) return;
  if (horsService) { finAttente(api.zone); return; }
  const c = new Couche(api);
  api.biSpheres = c;
  c.peindre = () => c.rendu();
  api.rendu = c.peindre;
  couches.add(c);
  balayer();
  preparer().then(() => { if (horsService) { api.rendu = null; couches.delete(c); finAttente(api.zone); return; } c.rendu(); api.relancer(); });
}

if (!webglPossible()) document.querySelectorAll(".bi-zone").forEach(finAttente);
else {
  document.addEventListener("billard:zone", (e) => attacher(e.detail));
  document.querySelectorAll(".bi-zone").forEach((z) => attacher(z.biApi));
  window.addEventListener("hashchange", () => setTimeout(balayer, 50));
}
