/* ========== 1. DONNÉES DES PLANÈTES ========== */
const planetes = [
  { nom: "Mercure", couleur: "#b5a79a", taille: 5, vitesse: 0.020, type: "Planète tellurique",
    resume: "La plus proche du Soleil.",
    stats: ["Diamètre|4 879 km", "Distance au Soleil|58 millions de km", "Rotation|59 jours terrestres", "Année|88 jours", "Température|de -180 °C à 430 °C", "Lunes|0"],
    faits: ["Ses écarts de température sont parmi les plus extrêmes du système solaire.", "Elle est couverte de cratères, comme la Lune.", "Un « jour » solaire y dure 176 jours terrestres."],
    savoir: "Mercure est la plus petite planète du système solaire, à peine plus grande que notre Lune." },
  { nom: "Vénus", couleur: "#e6c27a", taille: 8, vitesse: 0.015, type: "Planète tellurique",
    resume: "La plus chaude de toutes.",
    stats: ["Diamètre|12 104 km", "Distance au Soleil|108 millions de km", "Rotation|243 jours terrestres", "Année|225 jours", "Température|environ 465 °C", "Lunes|0"],
    faits: ["Son atmosphère de CO₂ crée un effet de serre extrême.", "Elle tourne à l'envers : le Soleil s'y lève à l'ouest.", "La pression au sol équivaut à celle de 900 m sous l'eau sur Terre."],
    savoir: "Sur Vénus, un jour dure plus longtemps qu'une année !" },
  { nom: "Terre", couleur: "#3b82f6", taille: 9, vitesse: 0.012, type: "Planète tellurique",
    resume: "Notre maison bleue.",
    stats: ["Diamètre|12 742 km", "Distance au Soleil|150 millions de km", "Rotation|24 heures", "Année|365,25 jours", "Température|15 °C en moyenne", "Lunes|1"],
    faits: ["Environ 71 % de sa surface est couverte d'eau.", "C'est la seule planète connue abritant la vie.", "Son champ magnétique nous protège du vent solaire."],
    savoir: "La Lune s'éloigne de la Terre d'environ 3,8 cm chaque année." },
  { nom: "Mars", couleur: "#d1583a", taille: 6, vitesse: 0.009, type: "Planète tellurique",
    resume: "La planète rouge.",
    stats: ["Diamètre|6 779 km", "Distance au Soleil|228 millions de km", "Rotation|24 h 37", "Année|687 jours", "Température|-63 °C en moyenne", "Lunes|2 (Phobos, Déimos)"],
    faits: ["Sa couleur vient de l'oxyde de fer (la rouille) dans son sol.", "Olympus Mons, un volcan d'environ 22 km de haut, est le plus grand connu du système solaire.", "Des robots comme Curiosity et Perseverance l'explorent aujourd'hui."],
    savoir: "Mars a eu de l'eau liquide en surface il y a des milliards d'années." },
  { nom: "Jupiter", couleur: "#d9a066", taille: 20, vitesse: 0.005, type: "Géante gazeuse",
    resume: "La reine des planètes.",
    stats: ["Diamètre|139 820 km", "Distance au Soleil|778 millions de km", "Rotation|environ 10 heures", "Année|11,9 ans", "Température|-110 °C (haut des nuages)", "Lunes|plus de 90"],
    faits: ["Elle est plus de 2 fois plus massive que toutes les autres planètes réunies.", "La Grande Tache rouge est une tempête active depuis des siècles.", "Sa lune Ganymède est plus grosse que Mercure."],
    savoir: "On pourrait faire tenir environ 1 300 Terres à l'intérieur de Jupiter." },
  { nom: "Saturne", couleur: "#e3cf9a", taille: 17, vitesse: 0.004, type: "Géante gazeuse", anneaux: true,
    resume: "Célèbre pour ses anneaux.",
    stats: ["Diamètre|116 460 km", "Distance au Soleil|1,43 milliard de km", "Rotation|10 h 33", "Année|29,4 ans", "Température|-140 °C", "Lunes|plus de 200"],
    faits: ["Ses anneaux sont faits de glace et de roche, de la poussière à des blocs géants.", "Elle est moins dense que l'eau.", "Sa lune Titan possède une atmosphère épaisse et des lacs de méthane."],
    savoir: "Les anneaux font des centaines de milliers de km de large, mais souvent à peine quelques dizaines de mètres d'épaisseur." },
  { nom: "Uranus", couleur: "#7fd6e0", taille: 12, vitesse: 0.003, type: "Géante de glaces",
    resume: "La planète couchée.",
    stats: ["Diamètre|50 724 km", "Distance au Soleil|2,87 milliards de km", "Rotation|17 heures", "Année|84 ans", "Température|-195 °C", "Lunes|28"],
    faits: ["Son axe est incliné de 98° : elle roule presque sur son orbite.", "Sa couleur bleu-vert vient du méthane dans son atmosphère.", "Elle possède des anneaux fins, découverts en 1977."],
    savoir: "Chaque pôle d'Uranus connaît environ 42 ans de jour, puis 42 ans de nuit." },
  { nom: "Neptune", couleur: "#4466e0", taille: 12, vitesse: 0.0024, type: "Géante de glaces",
    resume: "La plus lointaine.",
    stats: ["Diamètre|49 244 km", "Distance au Soleil|4,5 milliards de km", "Rotation|16 heures", "Année|165 ans", "Température|-200 °C", "Lunes|16"],
    faits: ["Les vents y dépassent 2 000 km/h, les plus rapides du système solaire.", "Elle a été repérée par le calcul avant d'être observée, en 1846.", "Sa lune Triton tourne dans le sens inverse de la planète."],
    savoir: "Depuis sa découverte, Neptune n'a fait qu'un seul tour complet autour du Soleil." }
];

/* ========== 2. CARTES ET FENÊTRE ========== */
const grille = document.getElementById("grille");
const voile = document.getElementById("voile");
const fiche = document.getElementById("fiche");
let survol = -1; // numéro de la planète survolée

planetes.forEach((p, i) => {
  const carte = document.createElement("article");
  carte.className = "carte";
  carte.innerHTML = `
    <div class="pastille" style="background: radial-gradient(circle at 30% 30%, ${p.couleur}, #111)"></div>
    <h3>${p.nom}</h3>
    <p>${p.resume}</p>`;
  carte.addEventListener("mouseenter", () => (survol = i));
  carte.addEventListener("mouseleave", () => (survol = -1));
  carte.addEventListener("click", () => ouvrir(i));
  grille.appendChild(carte);
});

function ouvrir(i) {
  const p = planetes[i];
  fiche.innerHTML = `
    <button class="fermer" aria-label="Fermer">&times;</button>
    <div class="pastille" style="background: radial-gradient(circle at 30% 30%, ${p.couleur}, #111)"></div>
    <h2>${p.nom}</h2>
    <p class="type">${p.type}</p>
    <div class="stats">
      ${p.stats.map(s => { const [t, v] = s.split("|"); return `<div class="stat"><b>${t}</b>${v}</div>`; }).join("")}
    </div>
    <h3>À retenir</h3>
    <ul>${p.faits.map(f => `<li>${f}</li>`).join("")}</ul>
    <div class="savoir">💡 <b>Le saviez-vous ?</b> ${p.savoir}</div>
    ${p.nom !== "Terre" ? `<a class="bouton" href="planete.html?p=${i}" target="_blank">🚀 Lancer le voyage depuis la Terre</a>` : ""}`;
  voile.classList.add("ouvert");
  fiche.querySelector(".fermer").addEventListener("click", fermer);
}

function fermer() { voile.classList.remove("ouvert"); }
voile.addEventListener("click", e => { if (e.target === voile) fermer(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") fermer(); });

/* ========== 3. ANIMATION DU FOND ========== */
const canvas = document.getElementById("fond");
const ctx = canvas.getContext("2d");
let L, H, etoiles = [], filantes = [];

function redimensionner() {
  L = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  etoiles = Array.from({ length: Math.floor((L * H) / 6000) }, () => ({
    x: Math.random() * L,
    y: Math.random() * H,
    r: Math.random() * 1.4 + 0.3,
    phase: Math.random() * Math.PI * 2,
    vitesse: Math.random() * 0.03 + 0.01
  }));
}
window.addEventListener("resize", redimensionner);
redimensionner();

function nouvelleFilante() {
  filantes.push({
    x: Math.random() * L * 1.2,
    y: -20,
    vx: -(Math.random() * 5 + 6),
    vy: Math.random() * 3 + 5,
    vie: 0,
    duree: 70 + Math.random() * 40
  });
}

function dessinerPlanete(p, x, y, fort) {
  if (fort) { ctx.shadowColor = p.couleur; ctx.shadowBlur = 35; }
  if (p.anneaux) { // arrière des anneaux
    ctx.strokeStyle = "rgba(227,207,154,0.6)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x, y, p.taille * 1.9, p.taille * 0.5, -0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
  const g = ctx.createRadialGradient(x - p.taille / 3, y - p.taille / 3, 1, x, y, p.taille);
  g.addColorStop(0, "#fff");
  g.addColorStop(0.25, p.couleur);
  g.addColorStop(1, "#05070f");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, p.taille, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

let temps = 0;
function animer() {
  temps++;
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

  // Étoiles filantes
  if (Math.random() < 0.025) nouvelleFilante();
  filantes = filantes.filter(s => s.vie < s.duree);
  filantes.forEach(s => {
    s.x += s.vx; s.y += s.vy; s.vie++;
    const a = 1 - s.vie / s.duree;
    const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
    ctx.stroke();
  });

  // Soleil, orbites et planètes
    ctx.globalAlpha = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
  const cx = L / 2, cy = H * 0.55;
  const grosSoleil = Math.min(L, H) * 0.05 + 10;
  const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, grosSoleil * 2.5);
  sg.addColorStop(0, "#fff7c2");
  sg.addColorStop(0.3, "#ffb703");
  sg.addColorStop(1, "rgba(255,120,0,0)");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(cx, cy, grosSoleil * 2.5, 0, Math.PI * 2);
  ctx.fill();

  planetes.forEach((p, i) => {
    const rx = L * 0.5 * (0.14 + i * 0.12);
    const ry = rx * 0.35;
    ctx.strokeStyle = i === survol ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    const angle = temps * p.vitesse + i * 1.7;
    const x = cx + Math.cos(angle) * rx;
    const y = cy + Math.sin(angle) * ry;
    dessinerPlanete(p, x, y, i === survol);

    if (i === survol) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(p.nom, x, y - p.taille - 12);
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animer);
}
animer();
 