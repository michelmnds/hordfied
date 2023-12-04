class Gun {
  constructor(name, ammo, maxAmmo, damage) {
    this.name = name;

    this.ammo = ammo;
    this.maxAmmo = maxAmmo;

    this.damage = damage;

    this.isReloading = false;
    this.counter = this.ammo;
  }

  reload() {
    if (this.ammo === 0) {
      this.isReloading = true;
      this.ammo = this.maxAmmo;
      const reload = new Audio(`./sound/${this.name}-reload.mp3`);
      reload.volume = 0.04;
      reload.play();

      reload.addEventListener("ended", () => {
        this.isReloading = false;

        for (let i = 0; i < this.maxAmmo; i++) {
          const ammo = document.getElementById(`ammo-${i}`);
          ammo.style.filter = `brightness(${120}%)`;
        }
      });
    }
  }

  reloadManually() {
    if (this.ammo < this.maxAmmo) {
      this.isReloading = true;
      this.ammo = this.maxAmmo;
      const reload = new Audio(`./sound/${this.name}-reload.mp3`);
      reload.volume = 0.04;
      reload.play();

      reload.addEventListener("ended", () => {
        this.isReloading = false;

        for (let i = 0; i < this.maxAmmo; i++) {
          const ammo = document.getElementById(`ammo-${i}`);

          if ((ammo.style.filter = `brightness(${0}%)`)) {
            ammo.style.filter = `brightness(${120}%)`;
          }
        }
      });
    }
  }
}
