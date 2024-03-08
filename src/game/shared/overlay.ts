import Utils from "../../core/utils";

export default class Overlay extends Phaser.GameObjects.Container {
  private view: Sprite;

  constructor(scene: Scene) {
    super(scene);
    this.visible = false;

    this.init();
  }

  public show() {
    if (this.visible) {
      return;
    }

    const tween = this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 400,
      ease: Phaser.Math.Easing.Sine.Out,
      onStart: () => {
        this.alpha = 0;
        this.visible = true;
      },
    });

    return tween;
  }

  public hide() {
    const tween = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 400,
      ease: Phaser.Math.Easing.Sine.In,
      onStart: () => {
        this.alpha = 1;
        this.visible = true;
      },
      onComplete: () => {
        this.visible = false;
        this.alpha = 0;
      },
    });

    return tween;
  }

  public resize(): void {
    const { view } = this;

    view.scaleX = Utils.WIDTH + Utils.leftOffset / view.width;
    view.scaleY = Utils.HEIGHT + Utils.topOffset / view.height;
  }

  private init(): void {
    const view = this.view = Utils.spriteMake(0, 0, 'assets/overlay-black.png');
    view.setOrigin(0.5);

    this.add(view);
  }
}