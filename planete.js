/* ========== 1. DONNÉES ORBITALES (modèle simplifié) ========== */
// a = distance au Soleil en UA, periode en jours, L0 = position sur l'orbite au 1er janvier 2000
const UA = 149597870.7;               // 1 UA en km
const J2000 = Date.UTC(2000, 0, 1, 12);
const corps = [
  { nom: "Mercure", couleur: "#b5a79a", a: 0.387,  periode: 87.969,   L0: 252.25, rayon: 16 },
  { nom: "Vénus",   couleur: "#e6c27a", a: 0.723,  periode: 224.701,  L0: 181.98, rayon: 26 },
  { nom: "Terre",   couleur: "#3b82f6", a: 1.000,  periode: 365.256,  L0: 100.46, rayon: 28 },
  { nom: "Mars",    couleur: "#d1583a", a: 1.524,  periode: 686.980,  L0: 355.45, rayon: 22 },
  { nom: "Jupiter", couleur: "#d9a066", a: 5.203,  periode: 4332.59,  L0: 34.40,  rayon: 60 },
  { nom: "Saturne", couleur: "#e3cf9a", a: 9.537,  periode: 10759.22, L0: 49.94,  rayon: 48, anneaux: true },
  { nom: "Uranus",  couleur: "#7fd6e0", a: 19.19,  periode: 30688.5,  L0: 313.23, rayon: 38 },
  { nom: "Neptune", couleur: "#4466e0", a: 30.07,  periode: 60182,    L0: 304.88, rayon: 36 }
];

// Quelle planète ? Lue dans l'adresse : planete.html?p=3
let i = parseInt(new URLSearchParams(location.search).get("p"));
if (!(i >= 0 && i < corps.length) || i === 2) i = 3; // par défaut : Mars
const terre = corps[2];
const cible = corps[i];

document.title = "Terre → " + cible.nom;
document.getElementById("titre").textContent = "Terre → " + cible.nom;
document.getElementById("nomPlanete").textContent = cible.nom;

/* ========== 2. CALCUL DE LA DISTANCE EN DIRECT ========== */
function position(c, jours) {
  const angle = ((c.L0 + 360 * jours / c.periode) * Math.PI) / 180;
  return { x: c.a * Math.cos(angle), y: c.a * Math.sin(angle) };
}

function distanceKm() {
  const jours = (Date.now() - J2000) / 86400000;
  const t = position(terre, jours);
  const p = position(cible, jours);
  return Math.hypot(t.x - p.x, t.y - p.y) * UA;
}

function duree(s) {
  if (s < 60) return s.toFixed(1) + " s";
  if (s < 3600) return Math.floor(s / 60) + " min " + Math.floor(s % 60) + " s";
  if (s < 86400) return Math.floor(s / 3600) + " h " + Math.floor((s % 3600) / 60) + " min";
  if (s < 86400 * 730) return Math.round(s / 86400).toLocaleString("fr-FR") + " jours";
  return (s / 31557600).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " ans";
}

const el = id => document.getElementById(id);
function majTextes() {
  const d = distanceKm();
  el("km").textContent = Math.round(d).toLocaleString("fr-FR");
  el("ua").textContent = (d / UA).toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + " UA";
  el("lumiere").textContent = duree(d / 299792.458);
  el("voyager").textContent = duree(d / 17);
  el("avion").textContent = duree((d / 900) * 3600);
}

/* ========== 3. ANIMATION ========== */
const canvas = el("fond");
const ctx = canvas.getContext("2d");
let L, H, etoiles = [];

function redimensionner() {
  L = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  etoiles = Array.from({ length: Math.floor((L * H) / 6000) }, () => ({
    x: Math.random() * L, y: Math.random() * H,
    r: Math.random() * 1.4 + 0.3,
    phase: Math.random() * 6.28, vitesse: Math.random() * 0.03 + 0.01
  }));
}
window.addEventListener("resize", redimensionner);
redimensionner();

function dessinerPlanete(c, x, y, rayon, lueur) {
  ctx.save();
  ctx.shadowColor = c.couleur;
  ctx.shadowBlur = lueur;
  if (c.anneaux) {
    ctx.strokeStyle = "rgba(227,207,154,0.6)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(x, y, rayon * 1.9, rayon * 0.5, -0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
  const g = ctx.createRadialGradient(x - rayon / 3, y - rayon / 3, 1, x, y, rayon);
  g.addColorStop(0, "#fff");
  g.addColorStop(0.25, c.couleur);
  g.addColorStop(1, "#05070f");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, rayon, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const DUREE_TIR = 1100;   // le trait traverse l'écran en 1,1 seconde
const DUREE_IMPACT = 900;
const PAUSE = 1600;
let debut = performance.now();
el("relancer").addEventListener("click", () => (debut = performance.now()));

function animer(maintenant) {
  ctx.clearRect(0, 0, L, H);

  // Étoiles qui scintillent
  etoiles.forEach(e => {
    e.phase += e.vitesse;
    ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(e.phase));
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Positions à l'écran
  const echelle = Math.min(1, L / 900);
  const ex = L * 0.15, ey = H * 0.42;
  const px = L * 0.82, py = H * 0.30;
  const rT = terre.rayon * echelle, rP = cible.rayon * echelle;

  // Ligne pointillée discrète entre les deux + distance au milieu
  ctx.save();
  ctx.setLineDash([6, 10]);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(px, py);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "bold 15px Arial";
  ctx.textAlign = "center";
  ctx.fillText(el("km").textContent + " km", (ex + px) / 2, (ey + py) / 2 - 14);

  // Le tir
  const t = maintenant - debut;
  let lueurCible = 15;

  if (t < DUREE_TIR) {
    const avance = Math.pow(t / DUREE_TIR, 2.2); // accélère de plus en plus
    const tete = Math.min(1, avance);
    const queue = Math.max(0, tete - 0.35);
    const hx = ex + (px - ex) * tete, hy = ey + (py - ey) * tete;
    const qx = ex + (px - ex) * queue, qy = ey + (py - ey) * queue;

    ctx.save();
    const g = ctx.createLinearGradient(qx, qy, hx, hy);
    g.addColorStop(0, "rgba(34,211,238,0)");
    g.addColorStop(1, "rgba(255,255,255,1)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.moveTo(qx, qy);
    ctx.lineTo(hx, hy);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(hx, hy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (t < DUREE_TIR + DUREE_IMPACT) {
    // Onde de choc à l'arrivée
    const k = (t - DUREE_TIR) / DUREE_IMPACT;
    ctx.save();
    ctx.strokeStyle = `rgba(255,255,255,${1 - k})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(px, py, rP + k * rP * 2.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    lueurCible = 15 + 60 * (1 - k);
  }

  dessinerPlanete(terre, ex, ey, rT, 25);
  dessinerPlanete(cible, px, py, rP, lueurCible);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Terre", ex, ey + rT + 28);
  ctx.fillText(cible.nom, px, py + rP * (cible.anneaux ? 1.2 : 1) + 28);

  // Relance automatique du tir
  if (t > DUREE_TIR + DUREE_IMPACT + PAUSE) debut = maintenant;

  majTextes(); // la distance se met à jour à chaque image
  requestAnimationFrame(animer);
}
requestAnimationFrame(animer);
