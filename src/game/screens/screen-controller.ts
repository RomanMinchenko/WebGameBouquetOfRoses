import ScreenSignals from "./enum/screen-signals";
import ScreenType from "./enum/screen-type.enum";
import ScreensData from "./interface/screens-data.interface";
import Screens from "./screens";

export default class ScreenController extends Phaser.GameObjects.Container {
  private screens: Screens;
  private screensData: ScreensData;

  constructor(scene: Scene, screens: Screens, screensData: ScreensData) {
    super(scene);

    this.screens = screens;
    this.screensData = screensData;

    this.listenStartGameSignals();
  }

  public startGame() {
    this.screensData[ScreenType.StartScreen].show();
  }

  public hide(screenType: ScreenType) {
    this.screensData[screenType].hide();
  }

  public show(screenType: ScreenType) {
    this.screensData[screenType].show();
  }

  public setParameters(screenType: ScreenType, parameters: any | any[]) {
    this.screensData[screenType].setParameters(parameters);
  }

  private listenStartGameSignals() {
    for (const key in this.screensData) {
      const screen = this.screensData[key];
      screen.on(ScreenSignals.StartGame, (args: any | any[]) => {
        this.screens.emit(ScreenSignals.StartGame, args);
      })
    }
  }
}