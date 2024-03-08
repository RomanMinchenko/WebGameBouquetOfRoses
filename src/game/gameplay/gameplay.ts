import Utils from "../../core/utils";
import { LevelData } from "../interface/level-conditions.interface";
import GameplayEventsType from "./enum/gameplay-events-type.enum";
import InteractiveElements from "./interactive-elements/interactive-elements";

export default class GamePlay extends Phaser.GameObjects.Container  {
  private interactiveElements: InteractiveElements;

  constructor(scene: Scene) {
    super(scene);
    this.init();
  }

  public resize() {
  }

  public startNewLevel(levelData: LevelData[]) {
    const index = levelData.findIndex(data => data.results == null);

    this.interactiveElements.setLevelConditions(levelData[index]);
  }

  public checkTaskResult(args: any) {
    this.interactiveElements.checkTaskResult(args);
  }

  private init() {
    this.initGameBg();
    this.initInteractiveElements();
    this.initStaticElements();
  }

  private initGameBg(): void {
    const sprite = Utils.spriteMake(0, 0, "assets/gameplay/bg.png");
    this.add(sprite);
  }

  private initInteractiveElements() {
    const interactiveElements = this.interactiveElements = new InteractiveElements(this.scene);
    interactiveElements.y = -150;
    this.add(interactiveElements);

    interactiveElements.on(GameplayEventsType.LevelCompleted, (args: any) => {
      this.emit(GameplayEventsType.LevelCompleted, args);
    })
  }

  private initStaticElements() {
    const sprite = Utils.spriteMake(0,0,"assets/gameplay/fg.png");
    sprite.y = 73;
    this.add(sprite);
  }
}