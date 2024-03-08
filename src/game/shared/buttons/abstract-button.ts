import Utils from "../../../core/utils";
import ButtonEventsType from "./enum/button-events-type.enum";

export default abstract class AbstractButton extends Phaser.GameObjects.Container {
  private view: Sprite;
  private frameName: string;
  private isBtnClicked: boolean;

  constructor(scene: Scene, frameName: string) {
    super(scene);

    this.frameName = frameName;

    this.initView();
    this.listenSignals();
  }

  public enableInput(): void {
    this.view.setInteractive();
  }

  public disableInput(): void {
    this.view.disableInteractive();
  }

  public addText(x: number, y: number, value: string, style?: any) {
    const text = Utils.textMake(x, y, value, style);
    text.setOrigin(0.5);
    this.add(text);
  }

  public show() {
    const tween = this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 200,
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
      duration: 200,
      onComplete: () => {
        this.visible = false;
      }
    });

    return tween;
  }

  private initView() {
    const view = this.view = Utils.spriteMake(0, 0, this.frameName);
    this.add(view);
  }

  private listenSignals(): void {
    const { view } = this;
    this.isBtnClicked = false;

    view.on('pointerdown', (pointer: Pointer) => {
      if (this.isBtnClicked) {
        return;
      }

      this.isBtnClicked = true;

      this.onPointerDown();
    });
  }

  private onPointerDown() {
    this.animateClickDown();
  }

  private animateClickDown() {
    const tween = this.scene.tweens.add({
      targets: this,
      scale: 0.85,
      duration: 150,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.Out,
      onComplete: () => {
        this.isBtnClicked = false;
        this.emit(ButtonEventsType.onClick);
      }
    });

    return tween;
  }
}