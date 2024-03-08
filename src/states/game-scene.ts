import AudioManager from "../core/audio-manager";
import Utils from "../core/utils";
import GameContainer from "../game/game-container";

export default class GameScene extends Phaser.Scene {
  private view: Phaser.GameObjects.Container;
  private gameContainer: GameContainer;

  constructor() {
    super({ key: 'Game' });
  }

  public create(): void {
    Utils.registerGame(this);
    this.view = this.add.container();

    new AudioManager(this);
    const game: Phaser.GameObjects.Container = this.gameContainer = new GameContainer(this);
    this.view.add(game);
    this.resize();

    this.addUpdateToContainers();

    window.addEventListener("resize", () => {
      this.resize();
    })
  }

  private addUpdateToContainers(): void {
    function update(gameObj: any, delta: number, time: number): void {
      if (gameObj.list) {
        gameObj.onUpdate?.(delta, time);

        for (let i = 0; i < gameObj.list.length; i++) {
          update(gameObj.list[i], delta, time);
        }
      }
    }

    this.events.on('update', (time: number, delta: number) => {
      update(this.view, delta, time);
    });
  }

  private resize(): void {
    const dpi = Utils.getDPI();
    const width: number = window.innerWidth * dpi;
    const height: number = window.innerHeight * dpi;

    this.game.scale.resize(width, height);

    Utils.fitScale(this.view);

    this.gameContainer?.resize();
  }
}
