const startBtn = document.getElementById("start-btn");
const htpBtn = document.getElementById("htp-btn");

const mainMenuBtn = document.getElementById("menu-btn");
const deathMenuBtn = document.getElementById("death-menu-btn");

const startScreen = document.getElementById("start-screen");
const htpScreen = document.getElementById("htp-screen");

const easterEgg = document.querySelector(".r");

let game;

easterEgg.addEventListener("click", () => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

htpBtn.addEventListener("click", (e) => {
  startScreen.style.display = "none";
  htpScreen.style.display = "flex";
});

const startGame = () => {
  game = new Game();
  game.start();
};

startBtn.addEventListener("click", () => {
  startGame();
});

mainMenuBtn.addEventListener("click", () => {
  location.reload();
});

deathMenuBtn.addEventListener("click", () => {
  location.reload();
});
