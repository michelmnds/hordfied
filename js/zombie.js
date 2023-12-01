class Zombie {
  constructor(gameScreen, imgSrc, speed, game, player) {
    this.player = player;
    this.game = game;
    this.gameScreen = gameScreen;

    this.killCount = document.getElementById("kills");

    this.x = Math.round(Math.random() * this.gameScreen.offsetWidth + 70);
    this.speed = speed;
    this.y = Math.round(Math.random() * -this.gameScreen.offsetHeight - 65);

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.height = 60;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.transform = `rotate(${180}deg)`;
    this.element.id = "zombie";

    this.gameScreen.appendChild(this.element);

    this.element.addEventListener("click", () => this.handleDeath());
  }

  handleDeath() {
    this.element.remove();

    this.game.kills++;

    this.killCount.innerHTML = this.game.kills;
  }

  followPlayer() {
    const playerRect = this.player.element.getBoundingClientRect();
    const zombieRect = this.element.getBoundingClientRect();

    const deltaX = playerRect.left - zombieRect.left;
    const deltaY = playerRect.top - zombieRect.top;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const directionX = deltaX / distance;
    const directionY = deltaY / distance;

    this.x += directionX * this.speed;
    this.y += directionY * this.speed;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  move() {
    this.followPlayer();
  }
}
