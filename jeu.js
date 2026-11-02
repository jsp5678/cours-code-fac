/* ========== 1. DONNÉES ========== */
const objets = [
  { emoji: "🧑‍🚀", nom: "Combinaison de pressurisation", prendre: true,
    expl: "Portée au décollage et au retour, elle protège l'équipage si la cabine perd sa pression." },
  { emoji: "🪖", nom: "Casque à visière dorée", prendre: true,
    expl: "Utilisé en sortie dans l'espace : la couche d'or filtre la lumière du Soleil, qui n'est pas atténuée par une atmosphère." },
  { emoji: "💧", nom: "Sous-vêtement refroidi par eau", prendre: true,
    expl: "Dans le vide, la chaleur du corps s'évacue mal. Des tuyaux d'eau fraîche cousus dans le tissu évitent la surchauffe." },
  { emoji: "🧤", nom: "Gants pressurisés", prendre: true,
    expl: "Ils protègent du vide et des écarts de température. Ils sont rigides, donc les astronautes s'entraînent longtemps pour bien les utiliser." },
  { emoji: "🎒", nom: "Sac à dos de survie", prendre: true,
    expl: "En sortie, il fournit l'oxygène, retire le CO₂ expiré et alimente la combinaison en énergie." },
  { emoji: "🎧", nom: "Casque radio", prendre: true,
    expl: "Dans le vide, le son ne se propage pas : on communique par radio, même à quelques mètres de distance." },
  { emoji: "☂️", nom: "Parapluie", prendre: false,
    expl: "Il n'y a ni pluie, ni vent, ni air dans l'espace. Il ne servirait strictement à rien." },
  { emoji: "🕯️", nom: "Bougie", prendre: false,
    expl: "Le feu est l'un des plus grands dangers à bord : sans pesanteur, la flamme se comporte étrangement et la fumée ne monte pas." },
  { emoji: "🥤", nom: "Canette de boisson gazeuse", prendre: false,
    expl: "Sans pesanteur, les bulles de gaz ne remontent pas à la surface du liquide. Boire gazeux provoque de l'inconfort." },
  { emoji: "🩴", nom: "Sandales de plage", prendre: false,
    expl: "Elles n'offrent aucune protection contre le vide ou le froid. À l'intérieur de la station, on porte plutôt des chaussettes." }
];

const questions = [
  { q: "Pourquoi les astronautes flottent-ils dans la station spatiale ?",
    choix: ["Il n'y a aucune gravité là-haut", "Ils sont en chute libre autour de la Terre", "L'air les pousse vers le haut", "La station tourne sur elle-même très vite"],
    bonne: 1,
    expl: "À 400 km d'altitude, la gravité vaut encore environ 90 % de celle du sol. La station et l'équipage tombent en permanence autour de la Terre : c'est ce qui crée l'impression de flotter." },
  { q: "Quelle force ressentent les astronautes au décollage ?",
    choix: ["Ils ne sentent rien", "Environ 3 à 4 fois leur poids", "Ils deviennent plus légers", "Ils sont collés au plafond"],
    bonne: 1,
    expl: "La fusée accélère fort : l'équipage est plaqué dans son siège avec une force de 3 à 4 g. D'où les sièges allongés, qui aident le corps à l'encaisser." },
  { q: "Quelle est la température à l'extérieur de la station ?",
    choix: ["Toujours -273 °C", "Toujours 20 °C", "Elle varie d'environ -150 °C à +120 °C", "Toujours 1 000 °C"],
    bonne: 2,
    expl: "Tout dépend d'être au soleil ou à l'ombre. La station fait le tour de la Terre en environ 90 minutes, donc ces écarts se répètent sans cesse." },
  { q: "Que se passe-t-il si vous criez dans le vide spatial ?",
    choix: ["On vous entend à des kilomètres", "On vous entend, mais en grave", "Personne ne vous entend", "Le son devient lumineux"],
    bonne: 2,
    expl: "Le son a besoin d'air (ou d'un autre milieu) pour voyager. Dans le vide, il n'y a rien pour le transporter." },
  { q: "Pourquoi les astronautes font-ils du sport chaque jour ?",
    choix: ["Pour se divertir uniquement", "Pour éviter de perdre muscles et os", "Pour se réchauffer", "Pour produire de l'électricité"],
    bonne: 1,
    expl: "Sans pesanteur, le corps travaille beaucoup moins et s'affaiblit. Environ 2 heures d'exercice par jour limitent la perte de muscle et de densité osseuse." },
  { q: "Comment dort-on dans la station spatiale ?",
    choix: ["Dans un lit classique", "Attaché dans un sac de couchage fixé au mur", "Accroché au plafond par les pieds", "On ne dort jamais"],
    bonne: 1,
    expl: "Si on ne s'attache pas, on dérive pendant le sommeil et on peut se cogner ou aspirer l'air chargé de CO₂ autour de sa tête." },
  { q: "Qu'est-ce qui nous protège des radiations sur Terre, et pas dans l'espace ?",
    choix: ["Les nuages", "L'atmosphère et le champ magnétique", "Les océans uniquement", "Les montagnes"],
    bonne: 1,
    expl: "Ces deux boucliers arrêtent une grande partie du rayonnement cosmique et solaire. Hors de la Terre, les astronautes y sont plus exposés, ce qui est surveillé de près." },
  { q: "Que fait-on de l'eau à bord ?",
    choix: ["On la jette après usage", "Elle est recyclée en grande partie, urine comprise", "On la fait venir tous les jours de la Terre", "On la fabrique avec la poussière lunaire"],
    bonne: 1,
    expl: "L'eau coûte très cher à envoyer dans l'espace. La station en recycle la grande majorité (sueur, humidité de l'air et urine) pour la rendre potable." }
];

/* ========== 2. ÉTAT DU JEU ========== */
const zone = document.getElementById("jeu");
let phase, index, score, sac;

function demarrer() {
  phase = "intro"; index = 0; score = 0; sac = [];
  afficher();
}

function melanger(tab) {
  return tab.map(v => ({ v, r: Math.random() })).sort((a, b) => a.r - b.r).map(o => o.v);
}
let objetsMelanges = melanger(objets);

/* ========== 3. AFFICHAGE ========== */
function afficher() {
  if (phase === "intro") return ecranIntro();
  if (phase === "sac") return ecranObjet();
  if (phase === "quiz") return ecranQuestion();
  if (phase === "fin") return ecranFin();
}

function barre(actuel, total, titre) {
  return `<p class="etape">${titre} · ${actuel + 1} / ${total}</p>
    <div class="barre"><div style="width:${(actuel / total) * 100}%"></div></div>`;
}

function ecranIntro() {
  zone.innerHTML = `
    <section class="panneau-jeu">
      <p class="gros-emoji">🚀</p>
      <h1>Mission : prépare ton astronaute</h1>
      <p>Le décollage est dans quelques minutes. Saurez-vous choisir le bon équipement, puis répondre aux questions sur le voyage ?</p>
      <ul class="regles">
        <li>🎒 <b>Étape 1 :</b> 10 objets, à emporter ou à laisser au sol</li>
        <li>🧠 <b>Étape 2 :</b> 8 questions sur les conditions dans l'espace</li>
      </ul>
      <button class="bouton gros" id="go">Commencer la mission</button>
    </section>`;
  document.getElementById("go").onclick = () => { phase = "sac"; index = 0; objetsMelanges = melanger(objets); afficher(); };
}

function ecranObjet() {
  const o = objetsMelanges[index];
  zone.innerHTML = `
    <section class="panneau-jeu">
      ${barre(index, objetsMelanges.length, "Étape 1 · Le sac de mission")}
      <p class="gros-emoji">${o.emoji}</p>
      <h2>${o.nom}</h2>
      <p>Faut-il l'emporter dans la fusée ?</p>
      <div class="deux">
        <button class="choix" id="oui">✅ Emporter</button>
        <button class="choix" id="non">❌ Laisser</button>
      </div>
      <div id="retour"></div>
      <div class="sac"><b>🎒 Dans le sac :</b> <span>${sac.length ? sac.join(" ") : "vide pour l'instant"}</span></div>
    </section>`;
  document.getElementById("oui").onclick = () => repondreObjet(true);
  document.getElementById("non").onclick = () => repondreObjet(false);
}

function repondreObjet(emporte) {
  const o = objetsMelanges[index];
  const juste = emporte === o.prendre;
  if (juste) score++;
  if (emporte) sac.push(o.emoji);
  document.getElementById("oui").disabled = true;
  document.getElementById("non").disabled = true;
  document.getElementById("retour").innerHTML = `
    <div class="verdict ${juste ? "bon" : "mauvais"}">
      <b>${juste ? "Bien joué !" : "Raté !"}</b>
      ${o.prendre ? "Cet objet est utile." : "Cet objet n'a rien à faire dans la fusée."}<br>${o.expl}
    </div>
    <button class="bouton" id="suite">Suivant →</button>`;
  document.getElementById("suite").onclick = () => {
    index++;
    if (index >= objetsMelanges.length) { phase = "quiz"; index = 0; }
    afficher();
  };
}

function ecranQuestion() {
  const q = questions[index];
  const ordre = melanger(q.choix.map((texte, i) => ({ texte, bonne: i === q.bonne })));
  zone.innerHTML = `
    <section class="panneau-jeu">
      ${barre(index, questions.length, "Étape 2 · Le quiz du voyage")}
      <h2>${q.q}</h2>
      <div class="colonne" id="choix"></div>
      <div id="retour"></div>
    </section>`;
  const conteneur = document.getElementById("choix");
  ordre.forEach(c => {
    const b = document.createElement("button");
    b.className = "choix";
    b.textContent = c.texte;
    b.onclick = () => repondreQuestion(b, c.bonne, q, conteneur);
    b.dataset.bonne = c.bonne;
    conteneur.appendChild(b);
  });
}

function repondreQuestion(bouton, juste, q, conteneur) {
  if (juste) score++;
  conteneur.querySelectorAll("button").forEach(b => {
    b.disabled = true;
    if (b.dataset.bonne === "true") b.classList.add("vrai");
  });
  if (!juste) bouton.classList.add("faux");
  document.getElementById("retour").innerHTML = `
    <div class="verdict ${juste ? "bon" : "mauvais"}">
      <b>${juste ? "Exact !" : "Pas tout à fait."}</b> ${q.expl}
    </div>
    <button class="bouton" id="suite">${index === questions.length - 1 ? "Voir mon résultat" : "Suivant →"}</button>`;
  document.getElementById("suite").onclick = () => {
    index++;
    if (index >= questions.length) phase = "fin";
    afficher();
  };
}

function ecranFin() {
  const total = objets.length + questions.length;
  let grade, emoji;
  if (score >= total - 2) { grade = "Commandant de bord"; emoji = "🏅"; }
  else if (score >= total * 0.65) { grade = "Astronaute confirmé"; emoji = "🧑‍🚀"; }
  else if (score >= total * 0.4) { grade = "Recrue prometteuse"; emoji = "🛰️"; }
  else { grade = "Stagiaire au sol"; emoji = "🌱"; }
  zone.innerHTML = `
    <section class="panneau-jeu">
      <p class="gros-emoji">${emoji}</p>
      <h1>Mission terminée !</h1>
      <p class="score">${score} / ${total}</p>
      <h2>${grade}</h2>
      <p>${score >= total * 0.65
        ? "Vous êtes prêt pour le décollage. Direction l'orbite !"
        : "Encore un peu d'entraînement et vous serez prêt. Retentez votre chance !"}</p>
      <button class="bouton gros" id="rejouer">🔁 Rejouer</button>
      <a class="bouton gros" href="index.html">🪐 Explorer les planètes</a>
    </section>`;
  document.getElementById("rejouer").onclick = demarrer;
}

/* ========== 4. FOND ÉTOILÉ ========== */
const canvas = document.getElementById("fond");
const ctx = canvas.getContext("2d");
let L, H, etoiles = [], filantes = [];

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

function animer() {
  ctx.clearRect(0, 0, L, H);
  etoiles.forEach(e => {
    e.phase += e.vitesse;
    ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(e.phase));
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  if (Math.random() < 0.02) {
    filantes.push({ x: Math.random() * L * 1.2, y: -20, vx: -(Math.random() * 5 + 6), vy: Math.random() * 3 + 5, vie: 0, duree: 70 + Math.random() * 40 });
  }
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
  requestAnimationFrame(animer);
}
animer();

demarrer();