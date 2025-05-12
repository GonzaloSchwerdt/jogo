const pizzas = [
  "Muzzarella", "Napolitana", "Fugazzeta", "Calabresa",
  "Cuatro Quesos", "Roquefort", "Rúcula", "Jamón y Morrones"
];

let currentRound = [];
let nextRound = [];
let roundIndex = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTournament() {
  currentRound = shuffle([...pizzas]);
  nextRound = [];
  roundIndex = 0;
  document.getElementById("winner").classList.add("hidden");
  showMatchup();
}

function showMatchup() {
  if (currentRound.length === 1) {
    document.querySelector(".choices").style.display = "none";
    document.getElementById("round-info").textContent = "¡Ganadora!";
    document.getElementById("winner").textContent = `🍕 ${currentRound[0]} 🍕`;
    document.getElementById("winner").classList.remove("hidden");
    return;
  }

  const pizza1 = currentRound[roundIndex];
  const pizza2 = currentRound[roundIndex + 1];

  document.getElementById("pizza1").textContent = pizza1;
  document.getElementById("pizza2").textContent = pizza2;
  document.getElementById("round-info").textContent =
    `Ronda de ${currentRound.length} - Elegí una`;

  document.querySelector(".choices").style.display = "flex";
}

function selectPizza(choice) {
  const winner = currentRound[roundIndex + choice];
  nextRound.push(winner);

  roundIndex += 2;

  if (roundIndex >= currentRound.length) {
    currentRound = nextRound;
    nextRound = [];
    roundIndex = 0;
  }

  showMatchup();
}

startTournament();
