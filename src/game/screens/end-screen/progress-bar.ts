import Utils from "../../../core/utils";

export default class ProgressBar extends Phaser.GameObjects.Container {
  private fullBar: Sprite;
  private emptyBar: Sprite;

  constructor(scene: Scene) {
    super(scene);

    this.visible = false;
    this.init();
  }

  public show(progressPercent: number) {
    const {width, height} = this.emptyBar;
    const progress = width * progressPercent;

    const targetObj = {
      t: 0,
    }

    const tweenAppear = this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 400,
      delay: 400,
      onStart: () => {
        this.alpha = 0;
        this.visible = true;
      },
    });

    const tweenProgress = this.scene.tweens.add({
      targets: targetObj,
      t: 1,
      duration: 1000,
      ease: Phaser.Math.Easing.Expo.InOut,
      paused: true,
      onStart: () => {
        this.fullBar.setCrop(0, 0, 0, height);
        this.fullBar.visible = true;
      },
      onUpdate: () => {
        this.fullBar.setCrop(0, 0, progress * targetObj.t, height);
      }
    });

    tweenAppear.on("complete", () => {
      tweenProgress.paused = false;
    });
  }

  private init(): void {
    const emptyBar = this.emptyBar = this.createSprite('assets/screens/ebdScreen/bar_empty.png');
    this.add(emptyBar);

    const fullBar = this.fullBar = this.createSprite('assets/screens/ebdScreen/bar_full.png');
    fullBar.visible = false;
    fullBar.y = -1;
    this.add(fullBar);
  }

  private createSprite(frameName: string): Sprite {
    const sprite: Sprite = Utils.spriteMake(0, 0, frameName);
    sprite.setOrigin(0.5);

    return sprite;
  }
}