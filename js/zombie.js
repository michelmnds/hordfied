class Zombie {
  constructor(gameScreen, imgSrc) {
    this.gameScreen = gameScreen;

    this.x = Math.round(Math.random() * this.gameScreen.offsetWidth + 70);
    this.speed = 3;
    this.y = Math.round(Math.random() * -this.gameScreen.offsetHeight - 65);

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.height = 60;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.transform = `rotate(${180}deg)`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  move() {
    this.y += 3;

    this.updatePosition();
  }
}
