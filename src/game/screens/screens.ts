import EndScreen from "./end-screen/end-screen";
import ScreenType from "./enum/screen-type.enum";
import ScreensData from "./interface/screens-data.interface";
import ScreenController from "./screen-controller";
import StartScreen from "./start-screen/start-screen";

export default class Screens extends Phaser.GameObjects.Container {
  private screens: ScreensData;
  private screenController: ScreenController;

  constructor(scene: Scene) {
    super(scene);

    this.initScreens();
    this.initScreenController();
  }

  public getScreenController() {
    return this.screenController;
  }

  public getScreen(screenType: ScreenType) {
    return this.screens[screenType];
  }

  private initScreens() {
    this.screens = {};

    const startScreen = new StartScreen(this.scene);
    this.screens[ScreenType.StartScreen] = startScreen;

    const endScreen = new EndScreen(this.scene);
    this.screens[ScreenType.EndScreen] = endScreen;
    
    this.add([startScreen, endScreen]);
  }

  private initScreenController() {
    this.screenController = new ScreenController(this.scene, this, this.screens);
  }
}