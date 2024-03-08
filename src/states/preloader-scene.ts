import Utils from '../core/utils';
import SOUNDS_LIST from '../data/sounds-list';

export default class PreloaderScene extends Phaser.Scene {
  private isGameStart: boolean = false;

  constructor() {
    super({ key: 'Preloader' });
  }

  public preload(): void {
    const sounds = SOUNDS_LIST;

    this.load.setPath('textures/');
    this.load.multiatlas("assets", "assets.json");

    Utils.FONT = "Inter-Regular";

    for (const key in sounds) {
      const sound = (<any>sounds)[key];

      this.load.setPath('audio/');
      this.load.audio(sound, [`${sound}.wav`]);
    }

    this.load.on('complete', () => {
      this.loadComplete();
    });
  }

  private loadComplete(): void {
    if (this.isGameStart) {
      return;
    }

    this.isGameStart = true;

    this.startGame();
  }

  private startGame(): void {
    window.dispatchEvent(new CustomEvent('ON_START_GAME'));
    this.scene.start('Game');
  }
}
