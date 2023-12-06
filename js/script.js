const players = [
  {
    name: "mike",
    img: "mike",
    gun: "pistol",
    gunImg: "./img/pistol.png",
    gunStats: {
      name: gun,
      damage: 50,
      ammo: 8,
    },
  },
  {
    name: "eric",
    img: "eric",
    gun: "portugal",
    gunImg: "./img/portugal.png",
    gunStats: {
      name: gun,
      damage: 50,
      ammo: 8,
    },
  },
  {
    name: "joshua",
    img: "joshua",
    gun: "surfboard",
    gunImg: "./img/surfboard.png",
    gunStats: {
      name: gun,
      damage: 50,
      ammo: 8,
    },
  },
  {
    name: "mat",
    img: "mat",
    gun: "baguete",
    gunImg: "./img/baguete.png",
    gunStats: {
      name: gun,
      damage: 50,
      ammo: 8,
    },
  },
];

const unlockedPlayers = [
  {
    name: "mike",
    img: "mike",
    gun: "pistol",
    gunImg: "./img/pistol.png",
    gunStats: {
      name: gun,
      damage: 50,
      ammo: 8,
    },
  },
  {
    name: "?",
    img: "eric-black",
    gun: "?",
    gunImg: "./img/portugal-black.png",
    gunStats: {
      name: gun,
      damage: "?",
      ammo: "?",
    },
  },
  {
    name: "?",
    img: "joshua-black",
    gun: "?",
    gunImg: "./img/surfboard-black.png",
    gunStats: {
      name: gun,
      damage: "?",
      ammo: "?",
    },
  },
  {
    name: "?",
    img: "mat-black",
    gun: "?",
    gunImg: "./img/baguete-black.png",
    gunStats: {
      name: gun,
      damage: "?",
      ammo: "?",
    },
  },
];

const startBtn = document.getElementById("start-btn");
const htpBtn = document.getElementById("htp-btn");

const menuBtn = document.getElementById("menu-btn");
const deathMenuBtn = document.getElementById("death-menu-btn");
const victoryMenuBtn = document.getElementById("victory-menu-btn");

const startScreen = document.getElementById("start-screen");
const htpScreen = document.getElementById("htp-screen");
const charContainer = document.getElementById("char-container");
const selectScreen = document.getElementById("select-screen");

const leftArw = document.getElementById("arrow-left");
const rightArw = document.getElementById("arrow-right");

const easterEggContainer = document.getElementById("easteregg-container");
const eastereggInput = document.getElementById("easteregg-input");
const eastereggButton = document.getElementById("easteregg-button");

const playBtn = document.getElementById("play-btn");

window.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    easterEggContainer.style.display = "flex";
    selectScreen.style.zIndex = -1;
    selectScreen.style.position = "relative";
    eastereggInput.focus();
    eastereggInput.value = "";
  }
  if (e.code === "Escape") {
    easterEggContainer.style.display = "none";
    selectScreen.style.zIndex = 0;
    selectScreen.style.position = "relative";
  }
});
eastereggButton.addEventListener("click", (e) => {
  const value = eastereggInput.value;
  value.toLowerCase();

  if (value === "baguete") {
    unlockedPlayers[3] = players[3];
    clearRenderedPlayer();
    renderPlayer(unlockedPlayers[count]);
  } else if (value === "ragnar") {
    unlockedPlayers[2] = players[2];
    clearRenderedPlayer();
    renderPlayer(unlockedPlayers[count]);
  } else if (value === "portugal") {
    unlockedPlayers[1] = players[1];
    clearRenderedPlayer();
    renderPlayer(unlockedPlayers[count]);
  }
  easterEggContainer.style.display = "none";
  selectScreen.style.zIndex = 0;
  selectScreen.style.position = "relative";
});

let count = 0;
let player = unlockedPlayers[count];

const renderPlayer = (player) => {
  const charName = document.createElement("span");
  charName.id = "char-name";
  charName.innerHTML = player.name.toUpperCase();

  const img = document.createElement("img");
  img.id = "char-img";
  img.src = `./img/${player.img}.png`;

  const charInfos = document.createElement("div");
  charInfos.id = "char-infos";
  const gunImg = document.createElement("img");
  gunImg.id = "char-gun";
  gunImg.src = player.gunImg;
  const gunInfos = document.createElement("div");
  gunInfos.id = "gun-infos";
  const gunName = document.createElement("span");
  gunName.innerHTML = `Name: ${player.gun.toUpperCase()}`;
  const gunDamage = document.createElement("span");
  gunDamage.innerHTML = `Damage: ${player.gunStats.damage}`;
  const gunAmmo = document.createElement("span");
  gunAmmo.innerHTML = `Ammo: ${player.gunStats.ammo}`;

  charContainer.append(charName, img, charInfos);
  charInfos.append(gunImg, gunInfos);
  gunInfos.append(gunName, gunDamage, gunAmmo);
};
renderPlayer(unlockedPlayers[count]);

const clearRenderedPlayer = () => {
  const charName = document.getElementById("char-name");
  const img = document.getElementById("char-img");
  const charInfos = document.getElementById("char-infos");
  charName.remove();
  img.remove();
  charInfos.remove();
};

const easterEgg = document.querySelector(".r");

let game;

leftArw.addEventListener("click", (e) => {
  if (count >= 1) {
    count--;
    clearRenderedPlayer();
    renderPlayer(unlockedPlayers[count]);
  }
});
rightArw.addEventListener("click", (e) => {
  if (count < unlockedPlayers.length - 1) {
    count++;
    clearRenderedPlayer();
    renderPlayer(unlockedPlayers[count]);
  }
});

easterEgg.addEventListener("click", () => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

htpBtn.addEventListener("click", (e) => {
  startScreen.style.display = "none";
  htpScreen.style.display = "flex";
});

const startGame = () => {
  game = new Game(
    unlockedPlayers[count].name,
    unlockedPlayers[count].gun,
    unlockedPlayers[count].gunStats.ammo,
    unlockedPlayers[count].gunStats.ammo,
    unlockedPlayers[count].gunStats.damage
  );
  game.start();
};

playBtn.addEventListener("click", () => {
  startGame();
});

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  selectScreen.style.display = "flex";
});

menuBtn.addEventListener("click", () => {
  location.reload();
});
deathMenuBtn.addEventListener("click", () => {
  location.reload();
});
victoryMenuBtn.addEventListener("click", () => {
  location.reload();
});
