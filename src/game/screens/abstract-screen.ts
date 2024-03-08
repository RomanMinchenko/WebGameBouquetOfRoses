export default abstract class AbstractScreen extends Phaser.GameObjects.Container {
  constructor(scene: Scene) {
    super(scene);

    this.visible = false;
  }

  public show() {
    const tween = this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 200,
      onStart: () => {
        this.alpha = 0;
        this.visible = true;
      }
    });

    return tween;
  }

  public hide() {
    const tween = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.visible = false;
      }
    });

    return tween;
  }

  public abstract setParameters(parameters: any | any[]): void;
}