const express = require(‘express’);
const http = require(‘http’);
const { Server } = require(‘socket.io’);
const path = require(‘path’);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, ‘public’)));

// ── Questions (5 manches × 10 questions) ──────────────────────────────────────
const questions = {
1: [
{ q: “Quelle est la capitale de l’Australie ?”, choices: [“Sydney”, “Melbourne”, “Canberra”, “Brisbane”], answer: 2 },
{ q: “Combien d’os y a-t-il dans le corps humain adulte ?”, choices: [“186”, “206”, “226”, “246”], answer: 1 },
{ q: “Qui a peint la Joconde ?”, choices: [“Michel-Ange”, “Raphaël”, “Léonard de Vinci”, “Botticelli”], answer: 2 },
{ q: “En quelle année a eu lieu la Révolution française ?”, choices: [“1789”, “1776”, “1804”, “1815”], answer: 0 },
{ q: “Quel est le plus grand océan du monde ?”, choices: [“Atlantique”, “Indien”, “Arctique”, “Pacifique”], answer: 3 },
{ q: “Combien de planètes composent notre système solaire ?”, choices: [“7”, “8”, “9”, “10”], answer: 1 },
{ q: “Quelle langue est la plus parlée au monde ?”, choices: [“Anglais”, “Espagnol”, “Mandarin”, “Hindi”], answer: 2 },
{ q: “Quel pays a la plus grande superficie ?”, choices: [“Canada”, “Chine”, “États-Unis”, “Russie”], answer: 3 },
{ q: “Qui a écrit ‘Les Misérables’ ?”, choices: [“Zola”, “Flaubert”, “Victor Hugo”, “Balzac”], answer: 2 },
{ q: “Quelle est la formule chimique de l’eau ?”, choices: [“HO”, “H2O”, “H3O”, “OH2”], answer: 1 },
],
2: [
{ q: “Quel est le plus long fleuve du monde ?”, choices: [“Amazone”, “Nil”, “Yangtsé”, “Mississippi”], answer: 1 },
{ q: “En quelle année l’homme a-t-il marché sur la Lune ?”, choices: [“1965”, “1967”, “1969”, “1971”], answer: 2 },
{ q: “Quel animal est le plus rapide du monde ?”, choices: [“Lion”, “Guépard”, “Faucon pèlerin”, “Espadon”], answer: 1 },
{ q: “Combien de côtés a un hexagone ?”, choices: [“5”, “6”, “7”, “8”], answer: 1 },
{ q: “Qui a inventé le téléphone ?”, choices: [“Edison”, “Tesla”, “Graham Bell”, “Marconi”], answer: 2 },
{ q: “Quelle est la monnaie du Japon ?”, choices: [“Yuan”, “Won”, “Yen”, “Ringgit”], answer: 2 },
{ q: “Quel pays a inventé le papier ?”, choices: [“Égypte”, “Inde”, “Chine”, “Grèce”], answer: 2 },
{ q: “Combien de cordes a une guitare classique ?”, choices: [“4”, “5”, “6”, “7”], answer: 2 },
{ q: “Quel est le symbole chimique de l’or ?”, choices: [“Ag”, “Fe”, “Au”, “Cu”], answer: 2 },
{ q: “Quelle planète est surnommée la ‘planète rouge’ ?”, choices: [“Venus”, “Jupiter”, “Saturne”, “Mars”], answer: 3 },
],
3: [
{ q: “Qui a écrit ‘Romeo et Juliette’ ?”, choices: [“Molière”, “Shakespeare”, “Racine”, “Corneille”], answer: 1 },
{ q: “Quelle est la capitale du Brésil ?”, choices: [“São Paulo”, “Rio de Janeiro”, “Brasília”, “Salvador”], answer: 2 },
{ q: “En combien de jours la Terre tourne-t-elle autour du Soleil ?”, choices: [“354”, “365”, “366”, “370”], answer: 1 },
{ q: “Quel est le plus petit pays du monde ?”, choices: [“Monaco”, “Liechtenstein”, “Saint-Marin”, “Vatican”], answer: 3 },
{ q: “Quelle couleur obtient-on en mélangeant bleu et jaune ?”, choices: [“Orange”, “Violet”, “Vert”, “Marron”], answer: 2 },
{ q: “Combien y a-t-il de minutes dans une journée ?”, choices: [“1200”, “1440”, “1600”, “720”], answer: 1 },
{ q: “Qui a composé la 5e Symphonie ?”, choices: [“Mozart”, “Bach”, “Beethoven”, “Vivaldi”], answer: 2 },
{ q: “Quel sport se joue à Wimbledon ?”, choices: [“Golf”, “Cricket”, “Tennis”, “Rugby”], answer: 2 },
{ q: “Quelle est la capitale de l’Argentine ?”, choices: [“Lima”, “Santiago”, “Montevideo”, “Buenos Aires”], answer: 3 },
{ q: “Quel élément a pour symbole ‘O’ ?”, choices: [“Or”, “Osmium”, “Oxygène”, “Ozone”], answer: 2 },
],
4: [
{ q: “Quel pays a remporté la Coupe du Monde 2018 ?”, choices: [“Brésil”, “Allemagne”, “France”, “Croatie”], answer: 2 },
{ q: “Combien de continents y a-t-il sur Terre ?”, choices: [“5”, “6”, “7”, “8”], answer: 2 },
{ q: “Quelle est la montagne la plus haute du monde ?”, choices: [“K2”, “Mont Blanc”, “Kilimandjaro”, “Everest”], answer: 3 },
{ q: “Qui a théorisé la relativité générale ?”, choices: [“Newton”, “Einstein”, “Bohr”, “Planck”], answer: 1 },
{ q: “En quelle année a été construit la Tour Eiffel ?”, choices: [“1879”, “1889”, “1899”, “1909”], answer: 1 },
{ q: “Quel est le plus grand mammifère terrestre ?”, choices: [“Hippopotame”, “Rhinocéros”, “Éléphant”, “Girafe”], answer: 2 },
{ q: “Combien de joueurs composent une équipe de football ?”, choices: [“10”, “11”, “12”, “9”], answer: 1 },
{ q: “Quelle mer borde Israël à l’ouest ?”, choices: [“Mer Rouge”, “Mer Morte”, “Méditerranée”, “Mer Noire”], answer: 2 },
{ q: “Quel artiste a peint ‘La Nuit étoilée’ ?”, choices: [“Monet”, “Picasso”, “Van Gogh”, “Gauguin”], answer: 2 },
{ q: “Quelle est la vitesse de la lumière (en km/s) ?”, choices: [“150 000”, “200 000”, “250 000”, “300 000”], answer: 3 },
],
5: [
{ q: “Quel pays a la plus grande population au monde ?”, choices: [“Inde”, “Chine”, “États-Unis”, “Indonésie”], answer: 0 },
{ q: “Qui a écrit ‘L’Odyssée’ ?”, choices: [“Virgile”, “Ovide”, “Homère”, “Sophocle”], answer: 2 },
{ q: “Quelle est la devise de la France ?”, choices: [“Paix, Force, Unité”, “Travail, Justice, Solidarité”, “Liberté, Égalité, Fraternité”, “Honneur, Patrie, Valeur”], answer: 2 },
{ q: “Combien de dents a un adulte (avec dents de sagesse) ?”, choices: [“28”, “30”, “32”, “34”], answer: 2 },
{ q: “Quel est le pays le plus peuplé d’Afrique ?”, choices: [“Éthiopie”, “Égypte”, “RDC”, “Nigeria”], answer: 3 },
{ q: “Qui a inventé l’ampoule électrique ?”, choices: [“Tesla”, “Franklin”, “Edison”, “Faraday”], answer: 2 },
{ q: “Quel est le deuxième plus grand continent ?”, choices: [“Asie”, “Amérique”, “Afrique”, “Europe”], answer: 2 },
{ q: “En quelle année a été fondée l’ONU ?”, choices: [“1940”, “1945”, “1950”, “1955”], answer: 1 },
{ q: “Quelle est la capitale de la Corée du Sud ?”, choices: [“Busan”, “Séoul”, “Incheon”, “Daegu”], answer: 1 },
{ q: “Quel métal est liquide à température ambiante ?”, choices: [“Plomb”, “Bismuth”, “Mercure”, “Gallium”], answer: 2 },
]
};

// ── State ──────────────────────────────────────────────────────────────────────
let players = {};      // socketId -> { name, score, answers: [] }
let gameState = {
phase: ‘lobby’,      // lobby | question | result | intermission | final
round: 1,
questionIndex: 0,
questionActive: false,
timer: null,
currentAnswers: {},  // socketId -> answerIndex
};

function getRoundScoreboard() {
return Object.values(players)
.sort((a, b) => b.score - a.score)
.map((p, i) => ({ name: p.name, score: p.score, rank: i + 1 }));
}

function broadcastLobby() {
io.emit(‘lobby_update’, { players: Object.values(players).map(p => p.name) });
}

function startQuestion() {
const q = questions[gameState.round][gameState.questionIndex];
gameState.currentAnswers = {};
gameState.questionActive = true;

io.emit(‘question’, {
round: gameState.round,
questionIndex: gameState.questionIndex,
total: 10,
question: q.q,
choices: q.choices,
timeLimit: 30,
});

let timeLeft = 30;
gameState.timer = setInterval(() => {
timeLeft–;
io.emit(‘timer’, { timeLeft });
if (timeLeft <= 0) {
clearInterval(gameState.timer);
revealAnswer();
}
}, 1000);
}

function revealAnswer() {
gameState.questionActive = false;
const q = questions[gameState.round][gameState.questionIndex];

// Calcul scores
const results = {};
Object.entries(gameState.currentAnswers).forEach(([sid, ans]) => {
const correct = ans === q.answer;
if (correct && players[sid]) players[sid].score += 100;
results[sid] = { correct, answer: ans };
});

io.emit(‘answer_reveal’, {
correctAnswer: q.answer,
results,
scoreboard: getRoundScoreboard(),
playerAnswers: Object.fromEntries(
Object.entries(gameState.currentAnswers).map(([sid, ans]) => [
players[sid]?.name || ‘?’, ans
])
)
});
}

// ── Socket events ──────────────────────────────────────────────────────────────
io.on(‘connection’, (socket) => {

// Joueur rejoint
socket.on(‘join’, ({ name }) => {
if (!name || name.trim().length < 1) return;
players[socket.id] = { name: name.trim(), score: 0 };
socket.emit(‘joined’, { name: name.trim() });
broadcastLobby();
// Si partie en cours, envoyer l’état courant
if (gameState.phase !== ‘lobby’) {
socket.emit(‘game_already_started’);
}
});

// Master: démarrer la partie
socket.on(‘master_start_game’, () => {
gameState.round = 1;
gameState.questionIndex = 0;
gameState.phase = ‘question’;
io.emit(‘game_start’, { round: 1 });
setTimeout(() => startQuestion(), 1000);
});

// Master: question suivante
socket.on(‘master_next_question’, () => {
if (!gameState.questionActive) {
gameState.questionIndex++;
if (gameState.questionIndex >= 10) {
// Fin de manche
if (gameState.round >= 5) {
gameState.phase = ‘final’;
io.emit(‘game_over’, { scoreboard: getRoundScoreboard() });
} else {
gameState.phase = ‘intermission’;
io.emit(‘round_end’, {
round: gameState.round,
scoreboard: getRoundScoreboard(),
});
}
} else {
startQuestion();
}
}
});

// Master: manche suivante (après intermission)
socket.on(‘master_next_round’, () => {
gameState.round++;
gameState.questionIndex = 0;
gameState.phase = ‘question’;
io.emit(‘round_start’, { round: gameState.round });
setTimeout(() => startQuestion(), 3500);
});

// Joueur répond
socket.on(‘answer’, ({ answerIndex }) => {
if (!gameState.questionActive) return;
if (gameState.currentAnswers[socket.id] !== undefined) return; // déjà répondu
gameState.currentAnswers[socket.id] = answerIndex;

```
// Notifier master
io.emit('player_answered', {
  name: players[socket.id]?.name,
  count: Object.keys(gameState.currentAnswers).length,
  total: Object.keys(players).length,
});
```

});

socket.on(‘disconnect’, () => {
delete players[socket.id];
broadcastLobby();
});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✨ Imperium Quiz live on port ${PORT}`));