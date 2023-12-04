class Gun {
  constructor(name, ammo, maxAmmo) {
    this.name = name;

    this.ammo = ammo;
    this.maxAmmo = maxAmmo;

    this.isReloading = false;
  }

  reload() {
    const ammo = document.getElementById("ammo");
    if (this.ammo === 0) {
      this.isReloading = true;
      this.ammo = this.maxAmmo;
      const reload = new Audio(`./sound/${this.name}-reload.mp3`);
      reload.volume = 0.04;
      reload.play();

      reload.addEventListener("ended", () => {
        ammo.innerHTML = this.ammo;
        this.isReloading = false;
      });
    }
  }
}
