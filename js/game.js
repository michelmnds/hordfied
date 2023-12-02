class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");
    this.gameDeathScreen = document.getElementById("death-screen");
    this.gameInfos = document.getElementById("infos");
    this.hord = document.getElementById("hord");

    this.player = new Player(this.gameScreen, "./img/player.png");
    this.zombies = [];
    this.specialZombies = [];
    this.bossZombie = [];

    this.lives = 1;
    this.level = 1;
    this.kills = 0;
    this.maxKillsPerLevel = 1;

    this.gameOver = false;

    this.isLive = true;
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameInfos.style.display = "flex";

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

  restart() {
    this.level = 1;
    this.kills = 0;
    this.isLive = true;

    const zombiesOnScreen = document.querySelectorAll("#zombie");
    zombiesOnScreen.forEach((zombie) => {
      zombie.remove();
    });

    this.gameScreen.style.display = "block";
    this.gameInfos.style.display = "flex";
    this.player.x = 400;
    this.player.y = 400;
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    const animation = window.requestAnimationFrame(() => this.gameLoop());

    this.update();
    this.handleLevelUpdate();
    this.spawnZombies(animation);
  }

  handleLevelUpdate() {
    if (this.kills === this.maxKillsPerLevel * this.level) {
      const zombiesOnScreen = document.querySelectorAll("#zombie");
      const newRound = new Audio("./sound/next-round.mp3");

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

      setTimeout(() => {
        newRound.play();
      }, 1000);

      setTimeout(() => {
        this.gameInfos.style.display = "flex";
        this.levelTitle.style.display = "none";
        this.isLive = true;
      }, 5000);
    }
  }

  spawnZombies(animation) {
    if (this.level === 1 && this.isLive) {
      if (animation % 300 === 0) {
        this.handleZombieSounds();
        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            50,
            50
          )
        );
      }
    } else if (this.level === 2 && this.isLive) {
      if (animation % 300 === 0) {
        this.handleZombieSounds();

        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            50,
            100
          )
        );
      }
    } else if (this.level >= 3 && this.level < 5) {
      if (animation % 300 === 0 && this.isLive) {
        this.handleZombieSounds();

        this.zombies.push(
          new Zombie(
            this.gameScreen,
            "./img/zombie.png",
            2,
            game,
            this.player,
            50,
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
            50,
            50
          )
        );
      }
    } else if (this.level === 5 && this.isLive) {
      this.zombies.push(
        new Zombie(
          this.gameScreen,
          "./img/boss1.png",
          2,
          game,
          this.player,
          50,
          1000
        )
      );
      this.kills = this.level - 1;
      this.isLive = false;
    } else if (this.level === 6) {
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
