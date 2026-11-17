/* Globe terrestre animé derrière le portrait de Présentation (2.60.0).
   Sphère rendue en WebGL : rotation sur l'axe incliné de 23,4°, éclairage, reflet du soleil
   sur les océans et deux couches de nuages qui dérivent à des vitesses différentes.
   Aucune bibliothèque ni service externe. Repli : la photo fixe Apollo 17 reste affichée
   (mouvement réduit, impression, WebGL absent ou refusé, fichier ouvert sans serveur).
   Pause automatique onglet masqué ou globe hors de l'écran ; contexte libéré si retiré. */
(function () {
  "use strict";
  var TERRE = "assets/presentation/terre-jour-1024.jpg?v=2.60.0";
  var NUAGES = "assets/presentation/nuages-1024.jpg?v=2.60.0";
  var PERIODE = 60;          // secondes par tour complet
  var IMAGE_MAX = 30;        // images par seconde au plus
  var VS = "attribute vec2 a;varying vec2 p;void main(){p=a;gl_Position=vec4(a,0.,1.);}";
  var FS = [
    "precision mediump float;",
    "varying vec2 p;uniform sampler2D t,n;uniform float r,r1,r2,px;",
    "const float PI=3.14159265;",
    "void main(){",
    " float d2=dot(p,p);if(d2>1.)discard;",
    " float z=sqrt(1.-d2);vec3 no=vec3(p,z);",
    // Axe des pôles incliné vers la droite, comme un globe de bureau.
    " const float c=.9177,s=.3971;",
    " vec3 q=vec3(p.x*c-p.y*s,p.x*s+p.y*c,z);",
    " float lon=atan(q.x,q.z)/(2.*PI),lat=asin(clamp(q.y,-1.,1.))/PI;",
    " vec2 uv=vec2(lon+.5+.0417-r,.5-lat);",
    " vec3 sol=texture2D(t,uv).rgb;",
    " vec2 un=vec2(lon+.5-r1,.5-lat);",
    " float n1=texture2D(n,un).r;",
    " float n2=texture2D(n,vec2(lon+.87-r2,.5+lat)).r;",
    " float nu=1.-(1.-n1)*(1.-.55*n2);",
    " float om=texture2D(n,un-vec2(.006,.004)).r;",   // ombre portée des nuages (soleil en haut à gauche)
    " vec3 L=normalize(vec3(-.5,.55,.67));",
    " float dif=max(dot(no,L),0.);",
    " float mer=smoothstep(.04,.16,sol.b-sol.r)*(1.-nu);",
    " float spec=pow(max(dot(reflect(-L,no),vec3(0.,0.,1.)),0.),36.)*mer*.45;",
    " vec3 col=sol*(1.-.38*om);",
    " col=mix(col,vec3(.97,.98,1.),nu*.93);",
    " col=col*(.34+.82*dif)+spec;",
    " float bord=pow(1.-z,2.6);",
    " col=mix(col,vec3(.55,.76,.95),bord*.38*(.25+.75*dif));",
    " float al=clamp((1.-sqrt(d2))*px,0.,1.);",
    " gl_FragColor=vec4(col*al,al);",
    "}"].join("\n");

  var reduit = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function demarrer(boite, canvas) {
    if (!canvas.getContext || reduit.matches) return;
    var gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true }) ||
             canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;
    function shader(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    var prog, u = {}, textures = [], prets = 0, enCours = false, visible = true, raf = 0, dernier = 0, ecoule = 0, io = null, perdu = false, ro = null;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (e) { return; }
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var a = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    ["t", "n", "r", "r1", "r2", "px"].forEach(function (k) { u[k] = gl.getUniformLocation(prog, k); });
    gl.uniform1i(u.t, 0); gl.uniform1i(u.n, 1);
    gl.clearColor(0, 0, 0, 0);

    function charger(src, unite) {
      var img = new Image();
      img.onload = function () {
        if (perdu) return;
        var tex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + unite); gl.bindTexture(gl.TEXTURE_2D, tex);
        try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); }
        catch (e) { arreter(true); return; }   // file:// ou image refusée : la photo fixe reste
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textures.push(tex);
        if (++prets === 2) { dimensionner(); dessiner(0); boite.classList.add("pr-terre-anime"); relancer(); }
      };
      img.onerror = function () { arreter(true); };
      img.src = src;
    }

    function dimensionner() {
      var l = canvas.getBoundingClientRect().width || 452;
      var cible = Math.round(Math.min(l * Math.min(window.devicePixelRatio || 1, 2), 720));
      if (canvas.width !== cible) { canvas.width = canvas.height = cible; gl.viewport(0, 0, cible, cible); }
      gl.uniform1f(u.px, cible / 2 / 1.2);   // bord adouci d'environ un pixel
    }

    function dessiner(t) {
      var tour = t / PERIODE;
      gl.uniform1f(u.r, tour % 1);
      gl.uniform1f(u.r1, (tour + t / 170) % 1);      // nuages un peu plus rapides que le sol
      gl.uniform1f(u.r2, (tour - t / 260) % 1);      // seconde couche à contre-courant : masses qui évoluent
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      boite.dataset.globeImage = String((+boite.dataset.globeImage || 0) + 1);
    }

    function boucle(now) {
      raf = 0;
      if (!boite.isConnected) { arreter(false); return; }
      if (!enCours) return;
      if (dernier && now - dernier < 1000 / IMAGE_MAX - 2) { raf = requestAnimationFrame(boucle); return; }
      if (dernier) ecoule += Math.min(now - dernier, 100) / 1000;
      dernier = now;
      dessiner(ecoule);
      raf = requestAnimationFrame(boucle);
    }

    function relancer() {
      var doit = prets === 2 && !perdu && visible && !document.hidden && !reduit.matches;
      if (doit && !enCours) { enCours = true; dernier = 0; if (!raf) raf = requestAnimationFrame(boucle); }
      else if (!doit && enCours) { enCours = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
      boite.dataset.globe = perdu ? "repli" : enCours ? "anime" : prets === 2 ? "pause" : "chargement";
      if (reduit.matches) boite.classList.remove("pr-terre-anime");
      else if (prets === 2 && !perdu) boite.classList.add("pr-terre-anime");
    }

    function arreter(repli) {
      perdu = true; enCours = false;
      if (raf) cancelAnimationFrame(raf); raf = 0;
      boite.classList.remove("pr-terre-anime"); boite.dataset.globe = "repli";
      document.removeEventListener("visibilitychange", relancer);
      if (reduit.removeEventListener) reduit.removeEventListener("change", relancer);
      if (io) io.disconnect(); if (ro) ro.disconnect();
      var ext = gl.getExtension("WEBGL_lose_context"); if (ext && !gl.isContextLost()) ext.loseContext();
      if (!repli && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }

    canvas.addEventListener("webglcontextlost", function (e) { e.preventDefault(); arreter(true); });
    document.addEventListener("visibilitychange", relancer);
    if (reduit.addEventListener) reduit.addEventListener("change", relancer);
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(function (e) {
        visible = e[e.length - 1].isIntersecting;
        if (!boite.isConnected) { arreter(false); return; }
        relancer();
      });
      io.observe(boite);
    }
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { if (prets === 2 && !perdu) { dimensionner(); if (!enCours) dessiner(ecoule); } }); ro.observe(canvas); }
    boite.dataset.globe = "chargement";
    charger(TERRE, 0); charger(NUAGES, 1);
  }

  window.GlobeTerre = {
    /* Entoure le SVG d'identité ; le canevas passe sous les voiles, le portrait et les textes. */
    envelopper: function (svg) {
      var boite = document.createElement("div");
      boite.className = "pr-terre-boite";
      var canvas = document.createElement("canvas");
      canvas.className = "pr-terre-globe";
      canvas.setAttribute("aria-hidden", "true");
      canvas.width = canvas.height = 2;
      boite.appendChild(canvas); boite.appendChild(svg);
      // Démarrage après insertion dans la page, pour connaître la taille réelle.
      requestAnimationFrame(function () { if (boite.isConnected) demarrer(boite, canvas); else requestAnimationFrame(function () { demarrer(boite, canvas); }); });
      return boite;
    }
  };
})();
