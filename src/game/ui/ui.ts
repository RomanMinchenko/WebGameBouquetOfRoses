import Utils from "../../core/utils";
import { LevelData } from "../interface/level-conditions.interface";
import BottomPanel from "./bottom-panel";
import UIEventsType from "./enum/ui_signals.enum";

export default class UI extends Phaser.GameObjects.Container {
  private bottomPanel: BottomPanel;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public resize() {
  }

  public startNewLevel(levelData: LevelData[]) {
    this.bottomPanel.setConditions(levelData);
  }

  private init() {
    this.initBottomPanel();
    this.initButtons();
  }

  private initBottomPanel() {
    const bottomPanel = this.bottomPanel = new BottomPanel(this.scene);
    bottomPanel.y = Utils.HEIGHT * 0.5 - bottomPanel.height * 0.5;
    this.add(bottomPanel);

    bottomPanel.on(UIEventsType.onCheckTask, (args: any[]) => {
      this.emit(UIEventsType.onCheckTask, args);
    });
  }

  private initButtons() {

  }
}