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
  document.querySelector(".choices").style.display = "flex";
  showMatchup();
}

function showMatchup() {
  if (currentRound.length === 1) {
    document.querySelector(".choices").style.display = "none";
    document.getElementById("round-info").textContent = "¡Ganadora!";
    
    document.getElementById("winner-name").textContent = `🍕 ${currentRound[0]} 🍕`;
    document.getElementById("winner-image").innerHTML = `
      <img src="${currentRound[0]}.jpg" alt="${currentRound[0]}" class="pizza-img">
    `;
    document.getElementById("winner").classList.remove("hidden");
    return;
  }

  const pizza1 = currentRound[roundIndex];
  const pizza2 = currentRound[roundIndex + 1];

  if (!pizza2) return; // Evita errores si hay número impar

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
