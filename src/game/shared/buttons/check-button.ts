import AbstractButton from "./abstract-button";

export default class CheckButton extends AbstractButton {
  constructor(scene: Scene) {
    super(scene, "assets/ui/check_button_blue.png");
  }

  public shake() {
    const target = {
      x: 0,
    };
    const posX = this.x;
    let direction = 1;

    const tween = this.scene.tweens.add({
      targets: target,
      x: 5,
      repeat: 2,
      yoyo: true,
      duration: 50,
      onUpdate: () => {
        this.x = posX + target.x * direction;
      },
      onRepeat: () => {
        direction *= -1;
      },
    });

    return tween;
  }
}