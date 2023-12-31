class Game {
  constructor(plyaerName, gunName, gunAmmo, gunMaxAmmo, gunDamage) {
    this.startScreen = document.getElementById("start-screen");
    this.selectScreen = document.getElementById("select-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");
    this.gameDeathScreen = document.getElementById("death-screen");
    this.gameInfos = document.getElementById("infos");
    this.hord = document.getElementById("hord");
    this.gun = new Gun(gunName, gunAmmo, gunMaxAmmo, gunDamage);
    this.player = new Player(plyaerName, this.gameScreen, this.gun);
    this.zombies = [];
    this.specialZombies = [];
    this.bossZombie = [];

    this.lives = 1;
    this.level = 1;
    this.kills = 0;
    this.maxKillsPerLevel = 8;

    this.gameOver = false;

    this.isLive = true;

    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyR") {
        this.gun.reloadManually();
      }
    });
  }

  start() {
    const gunContainer = document.getElementById("gun-container");
    gunContainer.style.display = "none";

    this.selectScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.isLive = false;
    this.hord.innerHTML = `Hord: ${this.level}`;

    this.levelTitle = document.createElement("h2");
    this.levelTitle.innerHTML = `Hord ${this.level} is coming!`;
    this.levelTitle.style.display = "flex";

    this.levelTitle.style.width = "auto";
    this.levelTitle.style.height = `${100}vh`;
    this.levelTitle.style.fontSize = `${3}rem`;
    this.levelTitle.style.fontWeight = "bolder";
    this.levelTitle.style.color = "red";
    this.levelTitle.style.alignItems = "center";
    this.levelTitle.style.justifyContent = "center";

    this.gameScreen.append(this.levelTitle);

    const ammoContainer = document.getElementById("ammo-container");

    const gun = document.getElementById("gun");
    gun.src = `./img/${this.gun.name}.png`;
    gun.classList = "gun";

    const gunName = document.getElementById("gun-name");
    gunName.innerHTML = this.gun.name.toUpperCase();

    for (let i = 0; i < this.gun.maxAmmo; i++) {
      const ammo = document.createElement("img");
      ammo.src = `./img/pistol-bullet.png`;
      ammo.id = `ammo-${i}`;
      ammo.style.width = `${15}px`;
      ammo.style.filter = `brightness(${120}%)`;
      ammoContainer.append(ammo);
    }

    const newRound = new Audio("./sound/next-round.mp3");
    setTimeout(() => {
      newRound.play();
    }, 1000);

    setTimeout(() => {
      this.gameInfos.style.display = "flex";
      this.levelTitle.style.display = "none";
      gunContainer.style.display = "flex";

      this.isLive = true;
    }, 5000);

    this.gameLoop();
  }

  handleZombieSounds() {
    const randomNumber = Math.floor(Math.random() * 6);

    if (randomNumber > 0) {
      const zombieSound = new Audio(
        `./sound/zombies/zombie-audio-${randomNumber}.mp3`
      );
      zombieSound.volume = 0.02;

      zombieSound.play();
    }
  }
  handleBossSounds() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber > 0) {
      const bossSound = new Audio(
        `./sound/zombies/boss-audio-${randomNumber}.mp3`
      );
      bossSound.volume = 0.02;
      bossSound.play();
    }
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    const animation = window.requestAnimationFrame(() => this.gameLoop());

    this.gun.reload();
    this.update();
    this.handleLevelUpdate();
    this.spawnZombies(animation);
  }

  handleLevelUpdate() {
    if (this.kills === this.maxKillsPerLevel * this.level) {
      const gunContainer = document.getElementById("gun-container");
      gunContainer.style.display = "none";

      const zombiesOnScreen = document.querySelectorAll("#zombie");
      const newRound = new Audio("./sound/next-round.mp3");
      const bossRound = new Audio("./sound/zombies/zombie-boss-round.mp3");
      bossRound.volume = 0.04;
      const winSound = new Audio("./sound/win-sound.mp3");

      zombiesOnScreen.forEach((zombie) => {
        zombie.remove();
      });
      this.isLive = false;
      this.level += 1;
      this.hord.innerHTML = `Hord: ${this.level}`;
      this.kills = 0;
      this.gameInfos.style.display = "none";
      this.zombies = [];

      this.levelTitle = document.createElement("h2");
      if (this.level < 5) {
        this.levelTitle.innerHTML = `Hord ${this.level} is coming!`;
      } else {
        this.levelTitle.innerHTML = `Something is coming!`;
      }

      this.levelTitle.style.display = "flex";
      this.levelTitle.style.width = "auto";
      this.levelTitle.style.height = `${100}vh`;
      this.levelTitle.style.fontSize = `${3}rem`;
      this.levelTitle.style.fontWeight = "bolder";
      this.levelTitle.style.color = "red";
      this.levelTitle.style.alignItems = "center";
      this.levelTitle.style.justifyContent = "center";

      this.gameScreen.append(this.levelTitle);

      if (this.level < 5) {
        setTimeout(() => {
          newRound.play();
        }, 1000);
      } else if (this.level === 5) {
        setTimeout(() => {
          bossRound.play();
        }, 1000);
      } else {
        winSound.play();
      }
      setTimeout(() => {
        this.gameInfos.style.display = "flex";
        this.levelTitle.style.display = "none";
        gunContainer.style.display = "flex";
        this.isLive = true;
      }, 5000);
    }
  }

  spawnZombies(animation) {
    if (this.level === 1 && this.isLive) {
      if (animation % 250 === 0) {
        this.handleZombieSounds();
        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            50
          )
        );
      }
    } else if (this.level === 2 && this.isLive) {
      if (animation % 250 === 0 && this.isLive) {
        this.handleZombieSounds();

        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            100
          )
        );
      }
    } else if (this.level >= 3 && this.level < 5) {
      if (animation % 250 === 0 && this.isLive) {
        this.handleZombieSounds();

        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            100
          )
        );
        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie2.png",
            3,
            game,
            this.player,
            50
          )
        );
      }
    } else if (this.level === 5) {
      if (animation % 250 === 0) {
        this.handleBossSounds();
      }
      if (this.isLive) {
        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/boss1.png",
            2.6,
            game,
            this.player,
            1500
          )
        );
      }
      this.kills = this.level * this.maxKillsPerLevel - 1;
      this.isLive = false;
    } else if (this.level === 6) {
      this.isLive = false;
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "flex";
    }
  }

  update() {
    this.player.move();

    this.zombies = this.zombies.filter((zombie) => {
      const zombieRect = zombie.element.getBoundingClientRect();
      return (
        zombieRect.right > 0 &&
        zombieRect.left < this.gameScreen.offsetWidth &&
        zombieRect.top < this.gameScreen.offsetHeight
      );
    });
    this.zombies.forEach((zombie) => {
      zombie.move();
    });
  }

  handleCollision() {
    this.zombies = [];
    this.gameDeathScreen.style.display = "flex";
    this.gameScreen.style.display = "none";
    this.isLive = false;
    const endGameAudio = new Audio("./sound/end-game.mp3");
    endGameAudio.volume = 0.04;
    endGameAudio.play();
  }
}
