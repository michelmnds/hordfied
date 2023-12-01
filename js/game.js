class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");
    this.gameInfos = document.getElementById("infos");
    this.hord = document.getElementById("hord");

    this.player = new Player(this.gameScreen, "./img/player.png");
    this.zombies = [];

    this.lives = 1;
    this.level = 1;
    this.kills = 0;

    this.gameOver = false;
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameInfos.style.display = "flex";

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    const animation = window.requestAnimationFrame(() => this.gameLoop());

    if (this.level === 1) {
      if (animation % 300 === 0) {
        this.zombies.push(
          new Zombie(this.gameScreen, "./img/zombie.png", 1, game, this.player)
        );
      }
    }
    if (this.kills === 1) {
      const zombiesOnScreen = document.querySelectorAll("#zombie");
      zombiesOnScreen.forEach((zombie) => {
        zombie.remove();
      });
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
        this.gameInfos.style.display = "flex";
        this.levelTitle.style.display = "none";

        if (this.level === 2) {
          setInterval(() => {
            this.zombies.push(
              new Zombie(
                this.gameScreen,
                "./img/zombie.png",
                2,
                game,
                this.player
              )
            );
          }, 2000);
        } else if (this.level === 3) {
          setInterval(() => {
            this.zombies.push(
              new Zombie(
                this.gameScreen,
                "./img/zombie.png",
                3,
                game,
                this.player
              )
            );
          }, 2000);
        } else if (this.level === 4) {
          setInterval(() => {
            this.zombies.push(
              new Zombie(
                this.gameScreen,
                "./img/zombie.png",
                4,
                game,
                this.player
              )
            );
          }, 2000);
        } else if (this.level === 5) {
          setInterval(() => {
            this.zombies.push(
              new Zombie(
                this.gameScreen,
                "./img/zombie.png",
                4,
                game,
                this.player
              )
            );
          }, 2000);
        } else if (this.level >= 6) {
          console.log("you won!");
        }
      }, 3000);
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
    console.log("touch");
  }
}
