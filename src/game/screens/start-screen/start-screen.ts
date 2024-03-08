import Utils from "../../../core/utils";
import ButtonEventsType from "../../shared/buttons/enum/button-events-type.enum";
import TextButton from "../../shared/buttons/text-button";
import AbstractScreen from "../abstract-screen";
import ScreenSignals from "../enum/screen-signals";
import ScreenType from "../enum/screen-type.enum";

export default class StartScreen extends AbstractScreen {
  private startBtn: TextButton;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setParameters(parameters: any | any[]) {
    console.log(parameters);
  }

  public show() {
    const tween = super.show();
    tween.on("complete", () => {
      this.startBtn.enableInput();
    });

    return tween;
  }

  private init() {
    this.initBg();
    this.initStartBtn();
  }

  private initBg() {
    const bg = Utils.spriteMake(0, 0, "assets/gameplay/bg.png");
    this.add(bg);
  }

  private initStartBtn() {
    const btn = this.startBtn = new TextButton(this.scene, "Почати");
    this.add(btn);

    btn.on(ButtonEventsType.onClick, () => {
      this.emit(ScreenSignals.StartGame, [ScreenType.StartScreen]);
      btn.disableInput();
    })
  }
}