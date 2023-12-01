class Player {
  constructor(gameScreen, imgSrc) {
    this.gameScreen = gameScreen;

    this.x = this.gameScreen.offsetWidth / 2;
    this.y = this.gameScreen.offsetHeight / 2;
    this.speed = 3;

    this.keys = {}; // To keep track of pressed keys

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.height = 70;

    this.gameScreen.appendChild(this.element);

    this.gameScreen.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));

    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(event) {
    this.aimAt(event.clientX, event.clientY);
  }

  handleKeyDown(event) {
    this.keys[event.code] = true;
  }

  handleKeyUp(event) {
    this.keys[event.code] = false;
  }

  aimAt(targetX, targetY) {
    const deltaX = targetX - this.x;
    const deltaY = targetY - this.y;
    const angle = Math.atan2(deltaY, deltaX);

    const angleInDegrees = (angle * 180) / Math.PI;
    this.element.style.transform = `rotate(${angleInDegrees + 90}deg)`;
  }

  move() {
    if (this.keys["KeyW"]) {
      this.y -= this.speed;
    }
    if (this.keys["KeyS"]) {
      this.y += this.speed;
    }
    if (this.keys["KeyA"]) {
      this.x -= this.speed;
    }
    if (this.keys["KeyD"]) {
      this.x += this.speed;
    }

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.gameScreen.offsetWidth - this.element.width) {
      this.x = this.gameScreen.offsetWidth - this.element.width;
    }
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > this.gameScreen.offsetHeight - this.element.height) {
      this.y = this.gameScreen.offsetHeight - this.element.height;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
