const pizzas = [
  "Muzzarella", "Napolitana", "Fugazzeta", "Calabresa",
  "CuatroQuesos", "Roquefort", "Rucula", "JamonMorrones"
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

  document.getElementById("pizza1").innerHTML = `
    <img src="${pizza1}.jpg" alt="${pizza1}" class="pizza-img">
    <div>${pizza1}</div>
  `;

  document.getElementById("pizza2").innerHTML = `
    <img src="${pizza2}.jpg" alt="${pizza2}" class="pizza-img">
    <div>${pizza2}</div>
  `;


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
