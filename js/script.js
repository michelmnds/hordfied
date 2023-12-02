const startBtn = document.getElementById("start-btn");
const mainMenuBtn = document.getElementById("menu-btn");

const deathMenuBtn = document.getElementById("death-menu-btn");

const easterEgg = document.querySelector(".r");

let game;

easterEgg.addEventListener("click", () => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
