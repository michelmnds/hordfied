class Player {
  constructor(gameScreen, imgSrc, gun) {
    this.gameScreen = gameScreen;

    this.gun = gun;
    this.x = 400;
    this.y = 400;
    this.speed = 3;

    this.keys = {};

    this.element = document.createElement("img");

    this.element.style.position = "absolute";
    this.element.src = imgSrc;
    this.element.height = 70;

    this.gameScreen.appendChild(this.element);

    this.gameScreen.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
    this.gameScreen.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this)
    );

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));

    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseDown(event) {
    if (event.button === 0) {
      if (this.gun.isReloading === false) {
        this.shoot();
        this.gun.ammo--;

        const ammo = document.getElementById(
          `ammo-${this.gun.maxAmmo - this.gun.ammo - 1}`
        );
        ammo.style.filter = `brightness(${0}%)`;
      }
    }
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

  shoot() {
    const shotSound = new Audio(`./sound/${this.gun.name}-sound.mp3`);
    shotSound.volume = 0.02;

    shotSound.play();
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
