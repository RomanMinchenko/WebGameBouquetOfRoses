import Utils from "../core/utils";
import GameplayEventsType from "./gameplay/enum/gameplay-events-type.enum";
import GamePlay from "./gameplay/gameplay";
import RoseType from "./gameplay/interactive-elements/enum/rose-type.enum";
import { LevelData } from "./interface/level-conditions.interface";
import ScreenSignals from "./screens/enum/screen-signals";
import ScreenType from "./screens/enum/screen-type.enum";
import ScreenController from "./screens/screen-controller";
import Screens from "./screens/screens";
import Overlay from "./shared/overlay";
import UIEventsType from "./ui/enum/ui_signals.enum";
import UI from "./ui/ui";

export default class GameContainer extends Phaser.GameObjects.Container {
  private gamePlay: GamePlay;
  private ui: UI;
  private screens: Screens;
  private screensController: ScreenController;
  private levelData: LevelData[];
  private overlay: Overlay; 

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.scene = scene;

    this.init();
    this.listenSignals();

    this.screensController.startGame();
  }

  public resize() {
    const { WIDTH, HEIGHT } = Utils;

    this.x = WIDTH * 0.5;
    this.y = HEIGHT * 0.5;

    this.gamePlay.resize();
    this.ui.resize();
    this.overlay.resize();
  }

  private start() {
    const levelData = this.levelData = this.generateLevelConditions(5);
    this.ui.startNewLevel(levelData);
    this.gamePlay.startNewLevel(levelData);
  }

  private nextStep() {
    const isMoreStepsExist = this.levelData.some(data => data.results === null);

    if (isMoreStepsExist) {
      this.ui.startNewLevel(this.levelData);
      this.gamePlay.startNewLevel(this.levelData);
    } else {
      this.screensController.setParameters(ScreenType.EndScreen, this.levelData);
      this.screensController.show(ScreenType.EndScreen);
    }
  }

  private generateLevelConditions(levelNumber: number) {
    const levelData = [];

    for(let i = 0; i < levelNumber; ++i) {
      const whiteRosesNumber = Math.floor(1 + Math.random() * 4);
      const redRosesNumber = 5 - whiteRosesNumber;
      
      const data: LevelData = {
        level: i,
        conditions: {[RoseType.White]: whiteRosesNumber, [RoseType.Red]: redRosesNumber},
        results: null,
      }

      levelData.push(data);
    }

    return levelData;
  }

  private init(): void {
    this.initGamePlay();
    this.initUi();
    this.initScreens();
    this.initOverlay();
  }

  private initGamePlay() {
    const gamePlay = this.gamePlay = new GamePlay(this.scene);
    gamePlay.visible = false;
    this.add(gamePlay);
  }

  private initUi() {
    const ui = this.ui = new UI(this.scene);
    ui.visible = false;
    this.add(ui);
  }

  private initScreens() {
    const screens = this.screens = new Screens(this.scene);
    this.add(screens);

    this.screensController = screens.getScreenController();
  }

  private initOverlay() {
    const overlay = this.overlay = new Overlay(this.scene);
    this.add(overlay);
  }

  private listenSignals() {
    const {screensController, screens, ui, gamePlay, overlay} = this;

    screens.on(ScreenSignals.StartGame, ([screenType]: any | any[]) => {
      gamePlay.visible = true;
      ui.visible = true;
      screensController.hide(screenType);
      this.start();
    });

    ui.on(UIEventsType.onCheckTask, (args: any) => {
      gamePlay.checkTaskResult(args)
    });

    gamePlay.on(GameplayEventsType.LevelCompleted, ([promise, resolve, reject]: any) => {
      overlay.show()
      .on("complete", () => {
        resolve();
        this.nextStep();
        overlay.hide();
      });
    });
  }
}