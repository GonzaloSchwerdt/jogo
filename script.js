const levelPalettes = [
  { name: 'Pastel', colors: ['#ffd6e0', '#d0f4de', '#fef9c7', '#c9f0ff', '#fbc4ab', '#ffdac1', '#b5ead7', '#e0bbf9'] },
  { name: 'Neón', colors: ['#ff00ff', '#00ffff', '#39ff14', '#ff0000', '#ffff00', '#00ff00', '#ff6ec7', '#ff9900'] },
  { name: 'Modo Noche', colors: ['#FF4B5C', '#FFEB3B', '#8BC34A', '#FF9800', '#2196F3', '#9C27B0', '#F44336', '#FFEB3B'] }
];

let currentLevel = 0;
let cards = [], firstCard = null, secondCard = null, lockBoard = false;
let matchedPairs = 0, timer = 0, interval = null, inPractice = false;

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const practiceButton = document.getElementById('practice-button');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const recordDisplay = document.getElementById('record');
const levelDisplay = document.getElementById('level');
const replayBtn = document.getElementById('replay-level');
const nextLevelBtn = document.getElementById('next-level');
const levelBtns = document.getElementById('level-buttons');

const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');
const winSound = document.getElementById('win-sound');
const confettiContainer = document.getElementById('confetti-container');

function startTimer() {
  clearInterval(interval);
  timer = 0;
  timerDisplay.textContent = `⏱️ ${timer}s`;
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `⏱️ ${timer}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function loadRecord() {
  const record = localStorage.getItem('memotest-record');
  if (record) recordDisplay.textContent = `🏆 Récord: ${record}s`;
}

function saveRecordIfBetter() {
  const record = parseInt(localStorage.getItem('memotest-record')) || Infinity;
  if (timer < record) {
    localStorage.setItem('memotest-record', timer);
    recordDisplay.textContent = `🏆 Récord: ${timer}s`;
  }
}

function showConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.background = levelPalettes[currentLevel].colors[Math.floor(Math.random() * 8)];
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function createCards() {
  const palette = levelPalettes[currentLevel].colors;
  levelDisplay.textContent = `🌈 Nivel: ${levelPalettes[currentLevel].name}`;
  const shuffled = [...palette, ...palette].sort(() => 0.5 - Math.random());
  gameBoard.innerHTML = '';
  cards = [];
  matchedPairs = 0;
  message.textContent = '';
  levelBtns.classList.add('hidden');

  shuffled.forEach(color => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="inner-card">
        <div class="front"></div>
        <div class="back" style="background-color:${color}"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, color));
    gameBoard.appendChild(card);
    cards.push({ card, color });
  });
}

function flipCard(card, color) {
  if (lockBoard || card.classList.contains('flipped')) return;
  flipSound.play();
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = { card, color };
  } else {
    secondCard = { card, color };
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  if (firstCard.color === secondCard.color) {
    firstCard.card.classList.add('matched');
    secondCard.card.classList.add('matched');
    matchSound.play();
    matchedPairs++;
    resetFlips();

    if (matchedPairs === levelPalettes[currentLevel].colors.length) {
      winSound.play();
      stopTimer();
      saveRecordIfBetter();
      message.innerHTML = '🎉 ¡Ganaste el nivel!';
      showConfetti();
      levelBtns.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
      resetFlips();
    }, 1000);
  }
}

function resetFlips() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

resetButton.addEventListener('click', () => {
  inPractice = false;
  startTimer();
  createCards();
});

practiceButton.addEventListener('click', () => {
  inPractice = true;
  createCards();
  cards.forEach(({ card }) => card.classList.add('flipped'));
  setTimeout(() => cards.forEach(({ card }) => card.classList.remove('flipped')), 3000);
});

replayBtn.addEventListener('click', () => {
  startTimer();
  createCards();
});

nextLevelBtn.addEventListener('click', () => {
  currentLevel = (currentLevel + 1) % levelPalettes.length;
  startTimer();
  createCards();
});

loadRecord();
startTimer();
createCards();
