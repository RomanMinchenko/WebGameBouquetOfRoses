import Utils from "../../../core/utils";
import { LevelData } from "../../interface/level-conditions.interface";
import ButtonEventsType from "../../shared/buttons/enum/button-events-type.enum";
import TextButton from "../../shared/buttons/text-button";
import AbstractScreen from "../abstract-screen";
import ScreenSignals from "../enum/screen-signals";
import ScreenType from "../enum/screen-type.enum";
import ProgressBar from "./progress-bar";
import TableResult from "./table-results";

export default class EndScreen extends AbstractScreen {
  private table: TableResult;
  private progressBar: ProgressBar;
  private levelData: LevelData
  private retryBtn: TextButton;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setParameters(parameters: any | any[]) {
    this.levelData = parameters;
    this.table.setResult(parameters);
  }

  public show() {
    let total = 0;
    let totalSuccess = 0;

    for (const key in this.levelData) {
      const data = (<any>this.levelData)[key];

      total += data.results.all;
      totalSuccess += data.results.success;
    }

    const tween = super.show();
    this.table.show()
    this.progressBar.show(totalSuccess / total);

    this.scene.time.delayedCall(5000, () => {
      this.retryBtn.show()
      .on("complete", () => {
        this.retryBtn.enableInput();
      });
    });

    return tween;
  }

  private init() {
    this.initBg();
    this.initTable();
    this.initProgressBar()
    this.initRestartButton();
  }

  private initBg() {
    const bg = Utils.spriteMake(0, 0, "assets/gameplay/bg.png");
    this.add(bg);
  }

  private initTable() {
    const table = this.table = new TableResult(this.scene);
    this.add(table);
  }

  private initProgressBar() {
    const progressBar = this.progressBar = new ProgressBar(this.scene);
    progressBar.y = -270;
    this.add(progressBar);
  }

  private initRestartButton() {
    const retryBtn = this.retryBtn = new TextButton(this.scene, "Знову");
    retryBtn.y = 450;
    retryBtn.visible = false;
    this.add(retryBtn);

    retryBtn.on(ButtonEventsType.onClick, () => {
      this.emit(ScreenSignals.StartGame, [ScreenType.EndScreen]);
    });
  }
}