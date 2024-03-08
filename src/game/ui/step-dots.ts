import Utils from "../../core/utils";

export default class StepDots extends Phaser.GameObjects.Container {
  private view: Sprite;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setStep(step: number) {
    this.view.setFrame(`assets/ui/step_${step}.png`);
  }

  private init() {
    const view = this.view = Utils.spriteMake(0,0,"assets/ui/step_0.png");
    this.add(view);
  }
}