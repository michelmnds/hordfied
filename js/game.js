class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");

    this.player = new Player(this.gameScreen, "./img/player.png");
    this.zombies = [];

    this.kills = 0;
    this.lives = 1;
    this.level = 1;

    this.gameOver = false;
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    const animation = window.requestAnimationFrame(() => this.gameLoop());

    if (this.level === 1) {
      if (animation % 100 === 0) {
        this.zombies.push(new Zombie(this.gameScreen, "./img/zombie.png"));
      }
    }
  }
  update() {
    console.log(this.zombies);
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
}
