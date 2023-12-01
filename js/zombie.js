class Zombie {
  constructor(gameScreen, imgSrc, speed) {
    this.gameScreen = gameScreen;

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
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  move() {
    this.y += this.speed;

    this.updatePosition();
  }
}
