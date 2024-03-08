import Utils from "../../core/utils";
import { LevelData } from "../interface/level-conditions.interface";
import CheckButton from "../shared/buttons/check-button";
import ButtonEventsType from "../shared/buttons/enum/button-events-type.enum";
import ConditionsText from "./conditions-text";
import UIEventsType from "./enum/ui_signals.enum";
import StepDots from "./step-dots";

export default class BottomPanel extends Phaser.GameObjects.Container {
  private conditionsText: ConditionsText;
  private stepDots: StepDots;
  private checkBtn: CheckButton;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setConditions(levelData: LevelData[]) {
    const index = levelData.findIndex((data) => data.results == null);

    this.conditionsText.setConditions(levelData[index]);
    this.stepDots.setStep(index)
    this.checkBtn.enableInput();
  }

  private init() {
    this.initBg();
    this.initConditions();
    this.initStepDots();
    this.initNextButton();
  }

  private initBg() {
    const sprite = Utils.spriteMake(0, 0, "assets/ui/bottom_panel.png");
    this.add(sprite);

    this.setSize(sprite.width, sprite.height);
  }

  private initConditions() {
    const conditions = this.conditionsText = new ConditionsText(this.scene);
    this.add(conditions);
  }

  private initStepDots() {
    const dots = this.stepDots = new StepDots(this.scene);
    dots.y = -100;
    this.add(dots);
  }

  private initNextButton() {
    const {WIDTH} = Utils;
    
    const btn = this.checkBtn = new CheckButton(this.scene);
    btn.x = WIDTH * 0.5 - 180;
    this.add(btn);

    btn.on(ButtonEventsType.onClick, () => {
      btn.disableInput();
      let outerResolve, outerReject;

      const promise = new Promise((resolve, reject) => {
        outerReject = reject;
        outerResolve = resolve;
      });

      this.emit(UIEventsType.onCheckTask, [promise, outerResolve, outerReject]);

      promise
      .then()
      .catch((attempt) => {
        btn.shake()
        .on("complete", () => {
          if (attempt === 0) {
            btn.disableInput();
          } else {
            btn.enableInput();
          }
        })
      });
    });
  }
}